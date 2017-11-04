const db = require('./db');
console.log(db);
// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
const Phoneme = require('./server/models/phoneme');
const Grapheme = require('./server/models/grapheme');

// an array of grapheme entries
const GraphemeData = [
  {
    grapheme: 's',
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'a',
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 't',
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'p',
    id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'i',
    id: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'n',
    id: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'm',
    id: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'd',
    id: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'g',
    id: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'c',
    id: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'k',
    id: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'ck',
    id: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'e',
    id: 13,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'u',
    id: 14,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'r',
    id: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'h',
    id: 16,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'b',
    id: 17,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'f',
    id: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'ff',
    id: 19,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'l',
    id: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'll',
    id: 21,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'ss',
    id: 22,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'j',
    id: 23,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'w',
    id: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'x',
    id: 26,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'y',
    id: 27,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'z',
    id: 28,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    grapheme: 'zz',
    id: 29,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// an array of Phoneme entries

const PhonemeData = [
  {
    phoneme: 's',
    id: 1,
    description: 'see, set, sit',
    uniCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'p',
    id: 2,
    description: 'pen, copy, happen',
    uniCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'b',
    id: 3,
    description: 'back, baby, job',
    uniCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 't',
    id: 4,
    description: 'tea, tight, button',
    uniCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'd',
    id: 5,
    description: 'day, ladder, odd',
    uniCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'k',
    id: 6,
    description: 'key, clock, school',
    uniCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'g',
    id: 7,
    description: 'get, giggle, ghost',
    uniCode: '&#609;',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'ch',
    id: 8,
    description: 'church, match, nature',
    uniCode: 't &#643;',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    phoneme: 'j',
    id: 9,
    description: 'judge, age, soldier',
    uniCode: 'd &#658;',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Sync and restart db before seeding
db
  .sync({force: true})
  .then(() => {
    console.log('synced DB and dropped old data');
  })
  .then(() => {
    return Promise.map(GraphemeData, function(grapheme) {
      return Grapheme.create(grapheme);
    });
  })
  .then((createdGraphemes) => {
    console.log(`${createdGraphemes.length} graphemes created`);
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
  .finally(() => {
    db.close();
    console.log('Finished!');
    return null;
  });