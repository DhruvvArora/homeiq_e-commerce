import openai
from elasticsearch import Elasticsearch
import random
import psycopg2
from psycopg2.extras import RealDictCursor


openai.api_key = "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"


es = Elasticsearch("http://localhost:9200") 
INDEX_NAME = "reviews"


def create_index():
    if not es.indices.exists(index=INDEX_NAME):
        index_mapping = {
            "mappings": {
                "properties": {
                    "product_name": {"type": "text"},
                    "review_text": {"type": "text"},
                    "sentiment": {"type": "keyword"},
                    "aspect": {"type": "keyword"},
                    "price": {"type": "float"},
                    "rating": {"type": "integer"},
                    "embedding": {"type": "dense_vector", "dims": 1536},  
                }
            }
        }
        es.indices.create(index=INDEX_NAME, body=index_mapping)
        print(f"Index '{INDEX_NAME}' created.")
    else:
        print(f"Index '{INDEX_NAME}' already exists.")


def get_products_from_db():
    try:
        conn = psycopg2.connect(
            dbname="auth_db",
            user="postgres",
            password="cooked",
            host="localhost",
            port="5432"
        )
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT name, price FROM products")
            products = cur.fetchall()
            
        conn.close()
        return products
    except Exception as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return []


def store_reviews_in_elasticsearch():
    products = get_products_from_db()
    if not products:
        print("No products found in database")
        return
        
    review_types = [
        {
            "sentiment": "positive",
            "aspect": "quality",
            "rating_range": (4, 5),
            "focus": "material quality, craftsmanship, and premium feel"
        },
        {
            "sentiment": "positive",
            "aspect": "usability",
            "rating_range": (4, 5),
            "focus": "ease of use, user-friendly features, and convenience"
        },
        {
            "sentiment": "neutral",
            "aspect": "price",
            "rating_range": (3, 4),
            "focus": "value for money, price comparison, and market positioning"
        },
        {
            "sentiment": "negative",
            "aspect": "durability",
            "rating_range": (1, 2),
            "focus": "longevity issues, wear and tear, and build quality concerns"
        },
        {
            "sentiment": "negative",
            "aspect": "delivery",
            "rating_range": (1, 2),
            "focus": "shipping experience, packaging, and delivery timeline"
        }
    ]
    
    for product in products:
        for review_type in review_types:
            rating = random.randint(*review_type["rating_range"])
            
            prompt = (
                f"Write a unique {review_type['sentiment']} product review for a {product['name']} "
                f"priced at ${product['price']}. Focus specifically on {review_type['focus']}. "
                f"The rating is {rating} out of 5 stars. Make it personal and specific, "
                f"mentioning concrete examples and experiences. Keep it to 2-3 sentences. "
                f"Use a different writing style for each review. "
                f"Start directly with the review content, in just 100 words, without mentioning the product name or rating."
            )

            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[{
                    "role": "user", 
                    "content": prompt
                }],
                temperature=0.9,  
            )
            review_text = response.choices[0].message["content"].strip()
            
            embedding_response = openai.Embedding.create(
                model="text-embedding-3-small",
                input=review_text
            )
            embedding = embedding_response['data'][0]['embedding']
            
            review = {
                "review_text": review_text,
                "product_name": product["name"],
                "sentiment": review_type["sentiment"],
                "aspect": review_type["aspect"],
                "price": product["price"],
                "rating": rating,
                "embedding": embedding,
            }
            
            es.index(index=INDEX_NAME, document=review)
            print(f"Stored review for {product['name']}.")


if __name__ == "__main__":
    create_index() 
    store_reviews_in_elasticsearch()  
