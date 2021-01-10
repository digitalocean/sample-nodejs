module.exports = function(app, client) {
    app.get("/init", async(req, res) => {
        try {

            let query = 'CREATE TABLE bounties (issue Text, bounty_amount real, Github Text);'

            let response = await client.query(query, (err, resp) => {
                console.log(err, resp)
                res.send(resp)

                client.end()
            })

        } catch (error) {
            res.status(420).send("This table already exists my manz")
        }
    })

    app.get("/destroy", async(req, res) => {
        try {
            let query = 'DROP TABLE bounties';
            let response = await client.query(query, (err, resp) => {
                console.log(err, resp)
                res.send(resp)

                client.end()
            });
            res.send(response)
        } catch (error) {
            res.status(420).send("This table already doesn't exist")
        }

    })
}