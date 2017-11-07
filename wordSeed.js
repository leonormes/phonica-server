const db = require('./db');
const Rx = require('rxjs/Rx');
// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
const Phoneme = require('./db').phonemes;
const Grapheme = require('./db').graphemes;
const Word = require('./db').words;

const WordData = [
  {
    word: 'crab',
    graphemes: [{grapheme: 'c'}, {grapheme: 'r'}],
  },
  {
    word: 'tin',
    graphemes: [{grapheme: 'c'}, {grapheme: 'r'}],
  },
];

Rx.Observable.from(WordData).subscribe((word) => {
  console.log(word.word);
  Word.create(word);
  Rx.Observable.from(word.graphemes).subscribe((gr) => {
    console.log(gr);
  });
});
