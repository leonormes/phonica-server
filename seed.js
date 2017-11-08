const db = require('./db');
const Rx = require('rxjs/Rx');
// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
const Phoneme = require('./db').phonemes;
const Grapheme = require('./db').graphemes;
const Word = require('./db').words;

// an array of grapheme entries
const GraphemeData = [
  {
    grapheme: 's',
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 1,
  },
  {
    grapheme: 'a',
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 28,
  },
  {
    grapheme: 't',
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 4,
  },
  {
    grapheme: 'p',
    id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 2,
  },
  {
    grapheme: 'i',
    id: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 26,
  },
  {
    grapheme: 'n',
    id: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 19,
  },
  {
    grapheme: 'm',
    id: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 18,
  },
  {
    grapheme: 'd',
    id: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 5,
  },
  {
    grapheme: 'g',
    id: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 7,
  },
  {
    grapheme: 'c',
    id: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 6,
  },
  {
    grapheme: 'k',
    id: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 6,
  },
  {
    grapheme: 'ck',
    id: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 6,
  },
  {
    grapheme: 'e',
    id: 13,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 27,
  },
  {
    grapheme: 'u',
    id: 14,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 30,
  },
  {
    grapheme: 'r',
    id: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 22,
  },
  {
    grapheme: 'h',
    id: 16,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 17,
  },
  {
    grapheme: 'b',
    id: 17,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 3,
  },
  {
    grapheme: 'f',
    id: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 10,
  },
  {
    grapheme: 'ff',
    id: 19,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 10,
  },
  {
    grapheme: 'l',
    id: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 21,
  },
  {
    grapheme: 'll',
    id: 21,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 21,
  },
  {
    grapheme: 'ss',
    id: 22,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 1,
  },
  {
    grapheme: 'j',
    id: 23,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 9,
  },
  {
    grapheme: 'w',
    id: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 24,
  },
  {
    grapheme: 'x',
    id: 26,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 1,
  },
  {
    grapheme: 'y',
    id: 27,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 23,
  },
  {
    grapheme: 'z',
    id: 28,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 14,
  },
  {
    grapheme: 'zz',
    id: 29,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 14,
  },
  {
    grapheme: 'ai',
    id: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 33,
  },
  {
    grapheme: 'oa',
    id: 31,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 37,
  },
  {
    grapheme: 'ie',
    id: 32,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 34,
  },
  {
    grapheme: 'ee',
    id: 33,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 32,
  },
  {
    grapheme: 'or',
    id: 34,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 43,
  },
  {
    grapheme: 'ng',
    id: 35,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 20,
  },
  {
    grapheme: 'v',
    id: 36,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 11,
  },
  {
    grapheme: 'oo',
    id: 37,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 36,
  },
  {
    grapheme: 'oo',
    id: 38,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 31,
  },
  {
    grapheme: 'ch',
    id: 39,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 8,
  },
  {
    grapheme: 'sh',
    id: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 15,
  },
  {
    grapheme: 'th',
    id: 41,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 12,
  },
  {
    grapheme: 'th',
    id: 42,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 13,
  },
  {
    grapheme: 'oi',
    id: 43,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 35,
  },
  {
    grapheme: 'ue',
    id: 44,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 36,
  },
  {
    grapheme: 'er',
    id: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 44,
  },
  {
    grapheme: 'ar',
    id: 46,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneme: 41,
  },
];

// an array of Phoneme entries

const PhonemeData = [
  {
    phoneme: 's',
    id: 1,
    description: 'see, set, sit',
    uniCode: 's',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'p',
    id: 2,
    description: 'pen, copy, happen',
    uniCode: 'p',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'b',
    id: 3,
    description: 'back, baby, job',
    uniCode: 'b',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 't',
    id: 4,
    description: 'tea, tight, button',
    uniCode: 't',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'd',
    id: 5,
    description: 'day, ladder, odd',
    uniCode: 'd',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'k',
    id: 6,
    description: 'key, clock, school',
    uniCode: 'k',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'g',
    id: 7,
    description: 'get, giggle, ghost',
    uniCode: '&#609;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ch',
    id: 8,
    description: 'church, match, nature',
    uniCode: 't &#643;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'j',
    id: 9,
    description: 'judge, age, soldier',
    uniCode: 'd &#658;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'f',
    id: 10,
    description: 'fat, coffee, rough, photo',
    uniCode: 'f',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'v',
    id: 11,
    description: 'view, heavy, move',
    uniCode: 'v',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'th',
    id: 12,
    description: 'thing, author, path',
    uniCode: '&#952;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'th',
    id: 13,
    description: 'this, other, smooth',
    uniCode: '&#240;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'z',
    id: 14,
    description: 'zero, music, roses, buzz',
    uniCode: 'z',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'sh',
    id: 15,
    description: 'ship, sure, national',
    uniCode: '&#643;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'zh',
    id: 16,
    description: 'pleasure, vision',
    uniCode: '&#658;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'h',
    id: 17,
    description: 'hot, whole, ahead',
    uniCode: 'h',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'm',
    id: 18,
    description: 'more, hammer, sum',
    uniCode: 'm',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'n',
    id: 19,
    description: 'nice, know, funny, sun',
    uniCode: 'n',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ng',
    id: 20,
    description: 'ring, anger, thanks, sung',
    uniCode: '&#331;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'l',
    id: 21,
    description: 'light, valley, feel',
    uniCode: 'l',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'r',
    id: 22,
    description: 'right, wrong, sorry, arrange',
    uniCode: 'r',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'j',
    id: 23,
    description: 'yet, use, beauty, few',
    uniCode: 'j',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'w',
    id: 24,
    description: 'wet, one, when, queen',
    uniCode: 'w',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 't',
    id: 25,
    description: 'department, football',
    uniCode: '&#660;',
    vowel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'i',
    id: 26,
    description: 'kit, bid, hymn, minute',
    uniCode: '&#618;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'e',
    id: 27,
    description: 'dress, bed, head, many',
    uniCode: 'e',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'a',
    id: 28,
    description: 'trap, bad',
    uniCode: '&#230;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'o',
    id: 29,
    description: 'lot, odd, wash',
    uniCode: '&#594;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'u',
    id: 30,
    description: 'strut, mud, love, blood',
    uniCode: '&#652;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'oo',
    id: 31,
    description: 'foot, good, put',
    uniCode: '&#650;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ee',
    id: 32,
    description: 'fleece, sea, machine',
    uniCode: 'i &#720;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ai',
    id: 33,
    description: 'face, day, break',
    uniCode: 'e &#618;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ie',
    id: 34,
    description: 'price, high, try',
    uniCode: 'a &#618;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'oi',
    id: 35,
    description: 'choice, boy',
    uniCode: '&#596; &#618;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'oo',
    id: 36,
    description: 'goose, two, blue, group',
    uniCode: 'u &#720;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'oa',
    id: 37,
    description: 'goat, show, no',
    uniCode: '&#601; &#650;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ou',
    id: 38,
    description: 'mouth, now',
    uniCode: 'a &#650;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ea',
    id: 39,
    description: 'near, here, weary',
    uniCode: '&618; &#601;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ai',
    id: 40,
    description: 'square, fair, various',
    uniCode: 'e &#601;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ar',
    id: 41,
    description: 'start, father',
    uniCode: '&#593; &#720;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'or',
    id: 42,
    description: 'thought, law, north, war',
    uniCode: '&#596; &#720;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ur',
    id: 43,
    description: 'poor, jury, cure',
    uniCode: '&#650; &#601;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'er',
    id: 44,
    description: 'nurse, stir, learn, refer',
    uniCode: '&#604; &#720;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'a',
    id: 45,
    description: 'about, common, standard',
    uniCode: '&#601;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'i',
    id: 46,
    description: 'happy, radiate. glorious',
    uniCode: 'i',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ou',
    id: 47,
    description: 'you, influence, situation',
    uniCode: 'u',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'en',
    id: 48,
    description: 'suddenly, cotton',
    uniCode: 'n &#809;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'le',
    id: 49,
    description: 'middle, metal',
    uniCode: 'l &#809;',
    vowel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const WordData = [
  {
    word: 'crab',
    graphemes: [
      {grapheme: 'c'},
      {grapheme: 'r'},
      {grapheme: 'a'},
      {grapheme: 'b'},
    ],
  },
  {
    word: 'tin',
    graphemes: [{grapheme: 't'}, {grapheme: 'i'}, {grapheme: 'n'}],
  },
  {
    word: 'sit',
    graphemes: [{grapheme: 's'}, {grapheme: 'i'}, {grapheme: 't'}],
  },
];
// Sync and restart db before seeding
db.sequelize
  .sync({force: true})
  .then(() => {
    console.log('synced DB and dropped old data');
  })
  .then(() => {
    return Promise.map(PhonemeData, function(phoneme) {
      return Phoneme.create(phoneme);
    });
  })
  .then((createdPhoneme) => {
    console.log(`${createdPhoneme.length} phonemes created`);
  })
  .catch((err) => {
    console.error('Error!', err, err.stack);
  })
  .then(() => {
    return Promise.map(GraphemeData, function(grapheme) {
      Grapheme.create(grapheme).then((newGrapheme) => {
        return Phoneme.findAll({
          where: {
            id: grapheme.phoneme,
          },
        }).then((ph) => {
          console.log(ph[0].dataValues);
          newGrapheme.setPhoneme(ph[0].dataValues.uuid);
        });
      });
    });
  })
  .then((createdGraphemes) => {
    console.log(`${createdGraphemes.length} graphemes created`);
  })
  .then(() => {
    return Promise.map(WordData, function(word) {
      Word.create(word).then((newWord) => {
        return Promise.map(word.graphemes, (grapheme) => {
          Grapheme.findAll({
            where: {
              grapheme: grapheme.grapheme,
            },
          }).then((gr) => {
            newWord.setGraphemes([gr[0].dataValues.uuid]);
          });
        });
      });
    });
  });
