const index = (req, res, next) => {

    if (req.useragent.isIE == true || req.useragent.isEdge == true) {

        const i = req.useragent.version;
        const browserVersion = i.substr(0, i.indexOf('.'));

        if (browserVersion < 80) {
            const data = { title: "Error 422" }
            return res.status(422).render('errors/422', { data });
        }
    }

    next();
}

module.exports = {
    index
}