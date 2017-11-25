const db = require('../../db');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} = require('graphql');

// GraphQL Type  schemes
// PhonicScheme type
const PhonicSchemeType = new GraphQLObjectType({
  name: 'PhonicScheme',
  description: 'This represents a phonics scheme',
  fields: () => {
    return {
      name: {
        type: GraphQLString,
        resolve(phonicScheme) {
          return phonicScheme.name;
        },
      },
      id: {
        type: GraphQLID,
        resolve(phonicScheme) {
          return phonicScheme.uuid;
        },
      },
      description: {
        type: GraphQLString,
        resolve(phonicScheme) {
          return phonicScheme.description;
        },
      },
      cardSets: {
        type: GraphQLString,
        resolve(phonicScheme) {
          return phonicScheme.getCardSets();
        },
      },
    };
  },
});

// GraphemeType
const GraphemeType = new GraphQLObjectType({
  name: 'Grapheme',
  description: 'This represents a grapheme',
  fields: () => {
    return {
      grapheme: {
        type: GraphQLString,
        resolve(grapheme) {
          return grapheme.grapheme;
        },
      },
      phonemes: {
        type: new GraphQLList(PhonemeType),
        resolve(grapheme) {
          return grapheme.getPhonemes();
        },
      },
      words: {
        type: new GraphQLList(WordType),
        resolve(grapheme) {
          return grapheme.getWords();
        },
      },
    };
  },
});

// WordType
const WordType = new GraphQLObjectType({
  name: 'Word',
  description: 'This represents a word',
  fields: () => {
    return {
      word: {
        type: GraphQLString,
        resolve(word) {
          return word.word;
        },
      },
      graphemes: {
        type: new GraphQLList(GraphemeType),
        resolve(word) {
          return word.getGraphemes();
        },
      },
    };
  },
});

// CardSetType
const CardSetType = new GraphQLObjectType({
  name: 'CardSet',
  description: 'This represents a set of cards',
  fields: () => {
    return {
      name: {
        type: GraphQLString,
        resolve(cardSet) {
          return cardSet.name;
        },
      },
      order: {
        type: GraphQLInt,
        resolve(cardSet) {
          return cardSet.order;
        },
      },
      flashcards: {
        type: new GraphQLList(FlashcardType),
        resolve(cardSet) {
          return cardSet.getFlashcards();
        },
      },
      id: {
        type: GraphQLID,
        resolve(cardSet) {
          return cardSet.uuid;
        },
      },
      phonicScheme: {
        type: PhonicSchemeType,
        resolve(cardSet) {
          return cardSet.getPhonicSchemes();
        },
      },
    };
  },
});

// Flashcard Type
const FlashcardType = new GraphQLObjectType({
  name: 'Flashcard',
  description: 'This represents a flashcard',
  fields: () => {
    return {
      order: {
        type: GraphQLInt,
        resolve(flashcard) {
          return flashcard.order;
        },
      },
      id: {
        type: GraphQLID,
        resolve(flashcard) {
          return flashcard.uuid;
        },
      },
      grapheme: {
        type: GraphemeType,
        resolve(flashcard) {
          return flashcard.getGrapheme();
        },
      },
      cardSet: {
        type: CardSetType,
        resolve(flashcard) {
          return flashcard.getCardset();
        },
      },
    };
  },
});
// PhonemeType
const PhonemeType = new GraphQLObjectType({
  name: 'Phoneme',
  description: 'This represents a phoneme',
  fields: () => {
    return {
      phoneme: {
        type: GraphQLString,
        resolve(phoneme) {
          return phoneme.phoneme;
        },
      },
      id: {
        type: GraphQLID,
        resolve(phoneme) {
          return phoneme.uuid;
        },
      },
      graphemes: {
        type: new GraphQLList(GraphemeType),
        resolve(phoneme) {
          return phoneme.getGraphemes();
        },
      },
    };
  },
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'This is the root query',
  fields: () => {
    return {
      graphemes: {
        type: new GraphQLList(GraphemeType),
        args: {
          uuid: {
            type: GraphQLID,
          },
          grapheme: {
            type: GraphQLString,
          },
        },
        orderBy: {
          order: 'asc',
        },
        resolve(root, args) {
          return db.graphemes.findAll({
            where: args,
          });
        },
      },
      phonemes: {
        type: new GraphQLList(PhonemeType),
        args: {
          uuid: {
            type: GraphQLID,
          },
          phoneme: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.phonemes.findAll({where: args});
        },
      },
      words: {
        type: new GraphQLList(WordType),
        args: {
          uuid: {
            type: GraphQLID,
          },
          word: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.words.findAll({where: args});
        },
      },
      phonicSchemes: {
        type: new GraphQLList(PhonicSchemeType),
        args: {
          uuid: {
            type: GraphQLID,
          },
          name: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.phonicSchemes.findAll({where: args});
        },
      },
      cardSets: {
        type: new GraphQLList(CardSetType),
        args: {
          uuid: {
            type: GraphQLID,
          },
          phonicSchemeUuid: {
            type: GraphQLID,
          },
          name: {
            type: GraphQLString,
          },
        },
        orderBy: {
          order: 'asc',
        },
        resolve(root, args) {
          return db.cardSets.findAll({
            where: args,
            order: [['order', 'asc']],
          });
        },
      },
      flashcards: {
        type: new GraphQLList(FlashcardType),
        args: {
          uuid: {
            type: GraphQLID,
          },
          order: {
            type: GraphQLInt,
          },
        },
        orderBy: {
          order: 'asc',
        },
        resolve(root, args) {
          return db.flashcards.findAll({
            where: args,
            order: [[db.flashcards, 'order']],
          });
        },
      },
    };
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
