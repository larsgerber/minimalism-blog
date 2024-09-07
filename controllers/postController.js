const showdown = require('showdown');
const converter = new showdown.Converter();
converter.setOption('tables', 'true');
converter.setOption('tablesHeaderId', 'true');
converter.setOption('emoji', 'true');
converter.setOption('noHeaderId', 'true');
converter.setOption('strikethrough', 'true');
converter.setOption('tasklists', 'true');
converter.setOption('ghMentions', 'true');
converter.setOption('openLinksInNewWindow', 'true');
const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

const PocketBase = require('pocketbase/cjs')

const pb = new PocketBase('https://blog.larsgerber.ch/pb');

const post_index = (req, res) => {

    async function asyncCall() {
        try {
            const result = await pb.collection('posts').getFullList({
                sort: '-created',
                filter: 'active = true',
            });
            // console.log('Result:', result);
            result.forEach(post => {
                post.created_local = (new Date(post.created).toLocaleString());
            })
            res.render('home', { data: result });
        } catch (error) {
            // console.log('Error:', error);
            const data = { title: "Error 504" }
            res.status(504).render('errors/504', { data });
        }
    }

    asyncCall();
}

const post_details = (req, res) => {
    const id = req.params.id

    async function asyncCall() {
        try {
            const result = await pb.collection('posts').getOne(id, {
                // filter: 'active = true',
            });
            // const data = { title: "Error 404" }
            // res.status(404).render('errors/404', { data });
            console.log('Result:', result);
            result.updated_local = (new Date(result.updated).toLocaleString());
            res.render('details', { data: result });
        } catch (error) {
            console.log('Error:', error);
            const data = { title: "Error 504" }
            res.status(504).render('errors/504', { data });
        }
    }

    asyncCall();
}

const sitemap = (req, res) => {

    const query = `
    query {
        posts(sort: "created_at:desc") {
          updated_at,
          link,
        }
      }
    `;

    fetch("https://strapi.larsgerber.ch/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query })
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            res.set('Content-Type', 'text/xml');
            res.render('partials/sitemap', { data: data.data });
        }).catch(function () {
            const data = { title: "Error 504" }
            res.status(504).render('errors/504', { data });
        });
}

module.exports = {
    post_index,
    post_details,
    sitemap,
}