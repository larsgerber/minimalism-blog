// pb_hooks/main.pb.js

// the slugify function is a combination of the following two examples
// https://www.30secondsofcode.org/js/s/string-to-slug/
// https://gist.github.com/max10rogerio/c67c5d2d7a3ce714c4bc0c114a3ddc6e

onRecordBeforeCreateRequest((e) => {

    const slugify = str =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, 'e')
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

    const url = e.record.getString("title")
    e.record.set("url", slugify(url))

}, "posts")

onRecordBeforeUpdateRequest((e) => {

    const slugify = str =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, 'e')
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

    const url = e.record.getString("title")
    e.record.set("url", slugify(url))

}, "posts")
