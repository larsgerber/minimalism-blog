const index = (req, res, next) => {

    if (req.useragent.isIE == true || req.useragent.isEdge == true) {

        const i = req.useragent.version;
        const browserVersion = i.substr(0, i.indexOf('.'));

        if (browserVersion < 80) {
            const data = { title: "Error 403" }
            return res.status(403).render('errors/403', { data });
        }
    }

    next();
}

module.exports = {
    index
}
