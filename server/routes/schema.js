const db = require('../../db');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
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
    };
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
