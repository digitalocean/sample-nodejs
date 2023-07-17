var names = require('./names.json');

function r(names) {
  return function() {
    return names[~~(Math.random() * names.length)];
  };
}

var random = (module.exports = function() {
  return r(names) + ' ' + r(names);
});

random.first = random.middle = random.place = random.last = r(names);
