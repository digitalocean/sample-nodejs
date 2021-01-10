const passport = require('passport');
require('./passport')


module.exports = function(app){
    app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/auth/error' }),
    function(req, res) {
        res.redirect('/check/login');
    });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

}

