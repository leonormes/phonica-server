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
        description: 'The name of the scheme',
      },
      uuid: {
        type: GraphQLID,
      },
      description: {
        type: GraphQLString,
      },
      cardSets: {
        type: new GraphQLList(CardSetType),
        resolve(phonicScheme) {
          return phonicScheme.getCard_sets();
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
        description: 'the letter',
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
      },
      order: {
        type: GraphQLInt,
      },
      flashcards: {
        type: new GraphQLList(FlashcardType),
        resolve(cardSet) {
          return cardSet.getFlashcards();
        },
      },
      uuid: {
        type: GraphQLID,
      },
      phonicScheme: {
        type: PhonicSchemeType,
        resolve(cardSet) {
          return cardSet.getPhonic_scheme();
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
      },
      uuid: {
        type: GraphQLID,
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
          return flashcard.getCard_set();
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
      },
      uuid: {
        type: GraphQLID,
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
        resolve(root, args) {
          return db.flashcards.findAll({
            where: args,
          });
        },
      },
    };
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
