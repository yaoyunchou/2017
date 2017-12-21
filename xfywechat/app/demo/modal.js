'use strict';

/**
 * Created by yao on 2017/6/14.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('open');
});

var kittySchema = mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    var greeting = this.name ? "Meow name is" + this.name : 'I dont have name!';
    console.log(greeting);
};

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({
    name: 'silence'
});

console.log(silence.name);

var fluffy = new Kitten({
    name: 'fluffy'
});
fluffy.speak();

fluffy.save(function (err, fluffy) {
    if (err) {
        return console.error(err);
    }
    fluffy.speak();
});