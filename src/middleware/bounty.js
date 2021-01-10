const isBounty = (req, res, next) => {
    console.log(typeof req.body.issue)
    if (typeof req.body.issue == "string") {
        next();
    } else {
        res.status(400).send('Not a bounty');
    }
}
module.exports = isBounty