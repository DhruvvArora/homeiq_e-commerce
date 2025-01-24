from flask import Flask, request, jsonify
from flask_cors import CORS
from elasticsearch import Elasticsearch
import openai

app = Flask(__name__)
CORS(app)


openai.api_key = ""
es = Elasticsearch("http://localhost:9200")

@app.route('/search_reviews', methods=['POST'])
def search_reviews():
    data = request.json
    query_text = data.get("query", "")

    if not query_text:
        return jsonify({"error": "Query text is required"}), 400

    # Generate embedding for the query
    embedding_response = openai.Embedding.create(
        model="text-embedding-3-small",
        input=query_text
    )
    query_embedding = embedding_response["data"][0]["embedding"]

    search_query = {
        "script_score": {
            "query": {"match_all": {}},
            "script": {
                "source": "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
                "params": {"query_vector": query_embedding}
            }
        }
    }

    response = es.search(
        index="reviews",
        body={
            "size": 5,  
            "query": search_query
        }
    )

    reviews = [
        {
            "product_name": hit["_source"]["product_name"],
            "rating": hit["_source"]["rating"],
            "review_text": hit["_source"]["review_text"]
        }
        for hit in response["hits"]["hits"]
    ]

    print("Reviews being sent:", reviews)
    return jsonify(reviews)

@app.route('/products', methods=['POST'])
def search_products():
    data = request.json
    query_text = data.get("query", "")
    
    if not query_text:
        return jsonify({"error": "Query text is required"}), 400

    embedding_response = openai.Embedding.create(
        input=query_text,
        model="text-embedding-3-small"
    )
    query_embedding = embedding_response["data"][0]["embedding"]

    search_query = {
        "script_score": {
            "query": {"match_all": {}},
            "script": {
                "source": "cosineSimilarity(params.query_vector, 'Embedding') + 1.0",
                "params": {"query_vector": query_embedding}
            }
        }
    }

    response = es.search(
        index="products", 
        body= {
            "size": 5,
            "query": search_query
        }
    )
    
    products = [
        {
            "product_name": hit["_source"]["Product Name"],
            "product_price": hit["_source"]["Product Price"],
            "category": hit["_source"]["Category"],
            "description": hit["_source"]["Description"]
        }
        for hit in response["hits"]["hits"]
    ]
    
    print("Products being sent:", products)
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, port=5001) 