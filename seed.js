const db = require('./server/models/index');
// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
const Phoneme = require('./server/models/phoneme');
const Grapheme = require('./server/models/grapheme');

const GraphemeData = [
  {
    grapheme: 's',
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'a',
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 't',
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'p',
    id: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'i',
    id: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'n',
    id: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'm',
    id: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'd',
    id: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'g',
    id: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'c',
    id: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'k',
    id: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'ck',
    id: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'e',
    id: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'u',
    id: 14,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'r',
    id: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'h',
    id: 16,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'b',
    id: 17,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'f',
    id: 18,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'ff',
    id: 19,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'l',
    id: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'll',
    id: 21,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'ss',
    id: 22,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'j',
    id: 23,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'v',
    id: 24,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'w',
    id: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'x',
    id: 26,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'y',
    id: 27,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'z',
    id: 28,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    grapheme: 'zz',
    id: 29,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// We will go through the Models one by one and create an instance
// for each element in the array. Look below for a commented out
// version of how to do this in one slick nested Promise.

// Sync and restart db before seeding
db
  .sync({ force: true })
  .then(() => {
    console.log('synced DB and dropped old data');
  })
  // here, we go through all the models one by one, create each
  // element from the seed arrays above, and log how many are created
  .then(() => {
    return Promise.map(GraphemeData, function(grapheme) {
      return Grapheme.create(grapheme);
    });
  })
  .then(createdGraphemes => {
    console.log(`${createdGraphemes.length} graphemes created`);
  })
  .catch(err => {
    console.error('Error!', err, err.stack);
  })
  .finally(() => {
    db.close();
    console.log('Finished!');
    return null;
  });
