const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://localhost:9200',
  ssl: {
    rejectUnauthorized: false,
  },
});

exports.addReviewToElastic = async (reviewText, embedding) => {
  await client.index({
    index: 'reviews',
    document: {
      review: reviewText,
      embedding: embedding,
    },
  });
};

exports.searchReviewsInElastic = async (queryEmbedding) => {
  const response = await client.search({
    index: 'reviews',
    knn: {
      field: 'embedding',
      query_vector: queryEmbedding,
      k: 5, 
      num_candidates: 10, 
    },
  });

  return response.hits.hits.map(hit => hit._source.review);
};
