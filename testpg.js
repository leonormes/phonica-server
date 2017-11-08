const {Pool, Client} = require('pg');
const connectionString =
  'postgres://ihufzfrmqglnsz:ceb4da2c5c56ede293b02c8e84b3cb041ef8519deb3f6f3b1d6f56ade171263d@ec2-54-225-88-199.compute-1.amazonaws.com:5432/d2nor2dlleas32';

const pool = new Pool({
  connectionString: connectionString,
});
pool.query(
  'INSERT INTO public.word_graphemes(wordUuid, graphemeUuid) VALUES($1, $2) RETURNING id',
  [
    '94753db0-c487-11e7-b2b2-bd0d27fc987a',
    '93e9eda3-c487-11e7-b2b2-bd0d27fc987a',
  ],
  (err, res) => {
    console.log(err, res);
    pool.end();
  }
);
