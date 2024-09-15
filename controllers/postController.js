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

const post_index = (req, res) => {

    const query = `
    query {
        posts(sort: "created_at:desc") {
          id,
          title,
          created_at,
          link,
        }
      }
    `;

    fetch("http://backend:1337/graphql", {
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

            data.data.posts.forEach(post => {
                post.createdAt_local = (new Date(post.created_at).toLocaleString());
            })

            res.render('home', { data: data.data });
        }).catch(function () {
            const data = { title: "Error 504" }
            res.status(504).render('errors/504', { data });
        });
}

const post_details = (req, res) => {
    const id = req.params.id

    const query = `
    query {
        posts(where: { link: "${id}" } ) {
          id,
          title,
          body,
          updated_at,
          link,
          author
        }
      }
    `;

    fetch("http://backend:1337/graphql", {
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

            if (0 === data.data.posts.length) {
                const data = { title: "Error 404" }
                res.status(404).render('errors/404', { data });
            } else {
                data.data.posts[0].updatedAt_local = (new Date(data.data.posts[0].updated_at).toLocaleString());

                var body = data.data.posts[0].body

                // data.data.posts[0].image.forEach(image => {
                //     body = body.replace(image.image.filename, image.image.publicUrlTransformed + "#thumbnail");
                // })

                data.data.posts[0].body = (converter.makeHtml(body));
                res.render('details', { data: data.data.posts[0] });
            }

        }).catch(function () {
            const data = { title: "Error 504" }
            res.status(504).render('errors/504', { data });
        });
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

    fetch("http://backend:1337/graphql", {
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