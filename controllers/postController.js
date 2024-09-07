const PocketBase = require('pocketbase/cjs')
const pb = new PocketBase('https://blog.larsgerber.ch/pb');

const post_index = (req, res) => {

    pb.collection('posts').getFullList({
        sort: '-created',
        fields: 'created,id,title'

    }).then((result) => {
        result.forEach(post => {
            post.created_local = (new Date(post.created).toLocaleString());
        })
        res.render('home', { data: result });

    }).catch((error) => {
        const data = { title: "Error 504" }
        return res.status(504).render('errors/504', { data });
    });
}

const post_details = (req, res) => {
    const id = req.params.id

    pb.collection('posts').getOne(id, {
        fields: 'author,content,tag,title,updated,expand.tag.name',
        expand: 'tag'

    }).then((result) => {
        result.updated_local = (new Date(result.updated).toLocaleString());
        res.render('details', { data: result });

    }).catch((error) => {
        try {
            if (error.response.code == 404) {
                const data = { title: "Error 404" }
                return res.status(404).render('errors/404', { data });
            }

        } catch (error) {
            console.error("App panicked!")
            console.log(error)
            const data = { title: "Error 503" }
            return res.status(503).render('errors/503', { data })
        }

        const data = { title: "Error 504" }
        return res.status(504).render('errors/504', { data });
    });
}

const sitemap = (req, res) => {

    pb.collection('posts').getFullList({
        sort: '-created',

    }).then((result) => {
        res.set('Content-Type', 'text/xml');
        res.render('sitemap', { data: result });

    }).catch((error) => {
        const data = { title: "Error 404" }
        return res.status(404).render('errors/404', { data });
    });
}

module.exports = {
    post_index,
    post_details,
    sitemap,
}