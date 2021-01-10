
module.exports = function(app, isLoggedIn){


    app.get('/hello', (req, res) => {
        res.send(`Hello world ${req.user.displayName}`)
    })
    app.get('/', (req, res) => {
        res.send(`Welcome to <a href="https://gitbid.com">api.gitbid.com</a>`)
    })
    app.get('/status', (req, res) => {
        res.send("Operational🚀");
    })

    app.get('/check/login', isLoggedIn, (req, res) => {
        res.send(req.user);
    });
    //other routes..
}
