const PocketBase = require('pocketbase/cjs')
const pb = new PocketBase('https://blog.larsgerber.ch/pb');

const post_index = (req, res) => {

    pb.collection('posts').getFullList({
        sort: '-created',
        filter: 'active = true',
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
        // filter: 'active = true',
    }).then((result) => {
        if (!result.active == true) {
            const data = { title: "Error 404" }
            return res.status(404).render('errors/404', { data });
        }
        result.updated_local = (new Date(result.updated).toLocaleString());
        res.render('details', { data: result });
    }).catch((error) => {
        const data = { title: "Error 504" }
        return res.status(504).render('errors/504', { data });
    });
}

const sitemap = (req, res) => {

    pb.collection('posts').getFullList({
        sort: '-created',
        filter: 'active = true',
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