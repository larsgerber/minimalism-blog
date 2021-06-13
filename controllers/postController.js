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
        allPosts(sortBy: createdAt_DESC,where: { publish: true }) {
        id,
        title,
        createdAt,
        link,
      }
    }
    `;

    fetch("http://localhost:"+ process.env.KEYSTONE_PORT + "/admin/api", {
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

            data.data.allPosts.forEach(post => {
                post.createdAt = (new Date(post.createdAt).toLocaleString());
            })

            res.render('home', { data: data.data });
        }).catch(function () {
            res.status(504).render('errors/504');
        });
}

const post_details = (req, res) => {
    const id = req.params.id

    const query = `
    query {
        allPosts(where: { AND: [{ link: "${id}" }, { publish: true }] }) {
        title,
        body,
        updatedAt,
        image {
            image {
              filename
              publicUrlTransformed(transformation: { height: "500", crop: "limit" })
            }
        }
      }
    }
    `;

    fetch("http://localhost:"+ process.env.KEYSTONE_PORT + "/admin/api", {
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

            if (0 === data.data.allPosts.length) {
                res.status(404).render('errors/404');
            } else {
                data.data.allPosts[0].updatedAt = (new Date(data.data.allPosts[0].updatedAt).toLocaleString());

                var body = data.data.allPosts[0].body

                data.data.allPosts[0].image.forEach(image => {
                    body = body.replace(image.image.filename, image.image.publicUrlTransformed + "#thumbnail");
                })

                data.data.allPosts[0].body = (converter.makeHtml(body));
                res.render('details', { data: data.data.allPosts[0] });
            }

        }).catch(function () {
            res.status(504).render('errors/504');
        });
}

module.exports = {
    post_index,
    post_details,
}