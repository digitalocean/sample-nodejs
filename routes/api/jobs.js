const router = require('express').Router();
let Job = require('../../models/job.model');

var Twit = require('twit')

var T = new Twit({
    consumer_key: 'hQqaqenAXlL1ZZ9BMiKwX4jzp',
    consumer_secret: 'DWSSqistFaHMHBDOsNm9aH3xfVMuzVRVAbmkQNbJMWPGGyG9fN',
    access_token: '559084458-Id2ddm9SrMEQlLT5l1YQdqPt2boN2YQhooBphPA1',
    access_token_secret: 'ulTSbCFBE5uk7ubcgkL5PqiKuhxzpSkVUs1ekyZakHw73',
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})

router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err))
})


router.route('/search').post(async (req, res, next) => {
    const query = req.body.query;
    const user = req.body.user;
    const jobs = [];

    const results = await T.get('search/tweets', { q: query, count: 1 });
    const data = results.data
    data.statuses.map(d => {
        if (d.text.includes("RT")) {
            jobs.push({
                tweet: d.retweeted_status.text,
                tweep_username: d.retweeted_status.user.name,
                tweep_screenname: d.retweeted_status.user.screen_name,
                status_id: d.retweeted_status.id_str,
                date: d.retweeted_status.created_at,
                deadline: '2020-12-27T20:07:43.000+00:00',
                important: false,
                notes: '',
                user_id: user.sub.split('|')[1]
            })
        } else {
            jobs.push({
                tweet: d.text,
                tweep_username: d.user.name,
                tweep_screenname: d.user.screen_name,
                status_id: d.id_str,
                date: d.created_at,
                deadline: '2020-12-27T20:07:43.000+00:00',
                important: false,
                notes: '',
                user_id: user.sub.split('|')[1]
            })
        }
    })

    jobs.map(job => {
        const jobTweet = new Job(job);
        jobTweet.save()
            .then(() => res.json('Jobs added'))
            .catch(err => res.status(400).json('Error: ' + err.response))
    })
})

router.route('/:id').delete((req, res) => {
    Job.findByIdAndDelete(req.params.id)
        .then(() => res.json('Job deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Job.findById(req.params.id)
        .then((job) => {
            job.tweet = req.body.tweet;
            job.tweep_username = req.body.tweep_username;
            job.tweep_screenname = req.body.tweep_screenname;
            job.status_id = req.body.status_id;
            job.date = req.body.date;
            job.deadline = req.body.deadline;
            job.important = req.body.important;
            job.notes = req.body.notes;

            job.save()
                .then(() => res.json('Job updated.'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router;
