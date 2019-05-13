exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: '404', 
        path: null,
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.get500 = (req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error', 
        path: null,
        isAuthenticated: req.session.isLoggedIn
    })
}