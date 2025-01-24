from flask import Flask, request, jsonify
from flask_cors import CORS
from elasticsearch import Elasticsearch
import openai

app = Flask(__name__)
CORS(app)


openai.api_key = "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"
es = Elasticsearch("http://localhost:9200")  
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
            "size": 2,  
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
