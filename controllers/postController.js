"use strict";

const PocketBase = require('pocketbase/cjs')
const pb = new PocketBase((process.env.POCKETBASE_ADRESS || 'http://localhost:8090'));

function slug(title) {
    title = title.toLowerCase();
    return (title.replace(/ /g, "-"));
}

function error503(error, req, res) {
    console.error("App crashed!")
    console.log("URL: " + req.url)
    console.log(error)
    const data = { title: "Error 503" }
    return res.status(503).render('errors/503', { data })
}

function convertDate(date) {
    return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        timeZone: 'Europe/Zurich',
    }).format(new Date(date))
}

const post_index = (req, res) => {

    pb.collection('posts').getFullList({
        sort: '-created',
        fields: 'created,id,title'

    }).then((result) => {
        result.forEach(post => {
            post.created_local = convertDate(post.created);
            post.url = slug(post.title);
        })
        res.render('home', { data: result });

    }).catch((error) => {
        return error503(error, req, res);
    });
}

const post_details = (req, res) => {
    const reqURL = slug(req.params.id);
    let matchID;

    pb.collection('posts').getFullList({
        fields: 'id,title',

    }).then((result) => {

        result.forEach(post => {
            if (slug(post.title) == reqURL) {
                matchID = post.id
            }
        })

        pb.collection('posts').getOne(matchID, {
            fields: 'content,title,updated,expand.author.name,expand.tag.name',
            expand: 'author,tag'

        }).then((result) => {

            result.updated_local = convertDate(result.updated);
            res.render('details', { data: result });

        }).catch((error) => {
            try {

                if (error.response.code == 404) {
                    const data = { title: "Error 404" }
                    return res.status(404).render('errors/404', { data });
                }

            } catch (error) {
                return error503(error, req, res);
            }
        });

    }).catch((error) => {
        return error503(error, req, res);
    });
}

const sitemap = (req, res) => {

    pb.collection('posts').getFullList({
        sort: '-created',
        fields: 'title,updated'

    }).then((result) => {
        result.forEach(post => { post.url = slug(post.title); })
        res.set('Content-Type', 'text/xml');
        res.render('sitemap', { data: result });

    }).catch((error) => {
        return error503(error, req, res);
    });
}

module.exports = {
    post_index,
    post_details,
    sitemap,
}
