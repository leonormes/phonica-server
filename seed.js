const db = require('./db');
const Rx = require('rxjs/Rx');
// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
const Phoneme = require('./db').phonemes;
const CardSet = require('./db').cardSets;
const Flashcard = require('./db').flashcards;
const Grapheme = require('./db').graphemes;
const Word = require('./db').words;
const PhonicScheme = require('./db').phonicSchemes;
const GraphemeData = require('./seedData/graphemeData');
const PhonemeData = require('./seedData/phonemeData');
const flashcardData = require('./seedData/flashcardData');

// an array of grapheme entries
// an array of Phoneme entries

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

const SchemeData = [
  {
    name: 'Jolly Phonics',
    description: 'A very Jolly way to learn Phonics',
  },
  {
    name: 'Letter and Sounds',
    description: 'The govs offical Phonics scheme',
  },
  {
    name: 'Read, Write Inc',
    description: 'An alternative scheme',
  },
];

const cardSetData = [
  {
    name: 'jp1',
    order: 1,
    phonicScheme: 'Jolly Phonics',
  },
  {
    name: 'jp2',
    order: 2,
    phonicScheme: 'Jolly Phonics',
  },
  {
    name: 'jp3',
    phonicScheme: 'Jolly Phonics',
  },
  {
    name: 'jp4',
    phonicScheme: 'Jolly Phonics',
  },
  {
    name: 'jp5',
    phonicScheme: 'Jolly Phonics',
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
  .then(() => {
    // Create Graphemes
    return Promise.map(GraphemeData, function(grapheme) {
      Grapheme.create(grapheme).then((newGrapheme) => {
        return Phoneme.findAll({
          where: {
            id: grapheme.phoneme,
          },
        }).then((ph) => {
          newGrapheme.setPhoneme(ph[0].dataValues.uuid);
        });
      });
    });
  })
  .then((createdGraphemes) => {
    console.log(`${createdGraphemes.length} graphemes created`);
  })
  .then(() => {
    // create Words
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
  })
  .then(() => {
    return Promise.map(SchemeData, function(scheme) {
      return PhonicScheme.create(scheme);
    });
  })
  .then((createdScheme) => {
    console.log(`${createdScheme.length} schemes created`);
  })
  .then(() => {
    // create a cardSet
    return Promise.map(cardSetData, function(set) {
      CardSet.create(set).then((newSet) => {
        return PhonicScheme.findAll({
          where: {
            name: set.phonicScheme,
          },
        }).then((scheme) => {
          newSet.setPhonic_scheme(scheme[0].dataValues.uuid);
        });
      });
    });
  })
  .then((createdSets) => {
    console.log(`${createdSets.length} Sets created`);
  })
  .then(() => {
    return Promise.map(flashcardData, function(card) {
      Flashcard.create(card).then((newCard) => {
        return Grapheme.findAll({
          where: {
            grapheme: card.grapheme,
          },
        })
          .then((grapheme) => {
            newCard.setGrapheme(grapheme[0].dataValues.uuid);
          })
          .then(() => {
            return CardSet.findAll({
              where: {
                name: card.cardSet,
              },
            }).then((set) => {
              newCard.setCard_set(set[0].dataValues.uuid);
            });
          });
      });
    });
  })
  .then((createdSets) => {
    console.log(`${createdSets.length} Sets created`);
  });
