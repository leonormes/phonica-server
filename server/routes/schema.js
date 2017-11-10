const db = require('../../db');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

// GraphQL Type  schemes
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
        type: PhonemeType,
        resolve(grapheme) {
          return grapheme.getPhoneme();
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
      grapheme: {
        type: new GraphQLList(GraphemeType),
        args: {
          id: {
            type: GraphQLInt,
          },
          grapheme: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.graphemes.findAll({where: args});
        },
      },
      phonemes: {
        type: new GraphQLList(PhonemeType),
        args: {
          id: {
            type: GraphQLInt,
          },
          phoneme: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.phonemes.findAll({where: args});
        },
      },
    };
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
