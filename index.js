const express = require('express')
const _ = require("lodash");
const app = express()
const port = process.env.PORT || 3000

var LoremIpsum = require('lorem-ipsum').LoremIpsum;

let obj = { 'cpp': [{ 'java': { 'python': 2012 } }] };

_.set(obj, 'cpp[0].java.python', 2020);
-.set();

var lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

app.get('/', (req, res) => res.send(lorem.generateParagraphs(7)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
