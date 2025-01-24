from elasticsearch import Elasticsearch
import openai
import psycopg2
from psycopg2.extras import RealDictCursor
import random


openai.api_key = "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"
es = Elasticsearch("http://localhost:9200")  

EMBEDDING_MODEL = "text-embedding-3-small"


def get_products_from_db():
    """
    Fetch products from PostgreSQL database
    """
    conn = psycopg2.connect(
        dbname="auth_db",
        user="postgres",
        password="cooked",
        host="localhost",
        port="5432"
    )
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT name as \"Product Name\", price as \"Product Price\" FROM products")
            products = cur.fetchall()
            return list(products)
    finally:
        conn.close()

def generate_description(product_name, index):
    """
    Generate a short description for a product using OpenAI GPT (chat model).
    Now includes an index parameter to create varied descriptions.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a product description generator."},
            {"role": "user", "content": f"Write description #{index} for a product called '{product_name}' in 100 words. Make it different from other descriptions, don't repeat the same words or start with the same sentence."}
        ],
        temperature=0.7 
    )
    return response['choices'][0]['message']['content'].strip()

def generate_embedding(text):
    """
    Generate embedding for a given text using OpenAI embedding model.
    """
    embedding_response = openai.Embedding.create(
        input=text,
        model=EMBEDDING_MODEL
    )
    return embedding_response["data"][0]["embedding"]

def generate_category(product_name):
    """
    Generate a suitable category for a product using OpenAI GPT.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a product categorization expert for smart home products."},
            {"role": "user", "content": f"Provide a specific category (1-2 words only) for a product named '{product_name}'."}
        ],
        temperature=0.7  
    )
    return response['choices'][0]['message']['content'].strip()

def generate_price_variation(base_price):
    """Generate a varied price that ends in .00, .49, or .99"""
    variation = 0.9 + (random.random() * 0.2)  
    varied_price = base_price * variation

    endings = [0.00, 0.49, 0.99]
    chosen_ending = random.choice(endings)
    
    return int(varied_price) + chosen_ending

def generate_company_name(product_name, index):
    """
    Generate a creative company name using OpenAI GPT.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a creative branding expert specializing in smart home technology companies."},
            {"role": "user", "content": f"Generate unique company name #{index} (2-3 words) for a product like '{product_name}'. Make it sound modern and tech-focused. Each name should be completely different from other versions. Return only the company name, nothing else."}
        ],
        temperature=0.9  
    )
    return response['choices'][0]['message']['content'].strip()

def index_products_in_elasticsearch():
    """
    Generate product records with different descriptions, categories, price variations, and company names.
    """
    products = get_products_from_db()
    for product in products:
        base_price = float(product["Product Price"])
        category = generate_category(product["Product Name"])
        
        for i in range(10):  
            company_name = generate_company_name(product["Product Name"], i + 1)
            branded_name = f"{company_name} {product['Product Name']}"
            description = generate_description(branded_name, i + 1)
            varied_price = generate_price_variation(base_price)
            embedding = generate_embedding(description)
            
            doc = {
                "Product Name": branded_name,
                "Original Product Name": product["Product Name"],
                "Company Name": company_name,
                "Product Price": varied_price,
                "Category": category,
                "Description": description,
                "Embedding": embedding,
                "Description_Version": i + 1,
                "Original_Price": base_price
            }
            
            response = es.index(index="products", document=doc)
            print(f"Indexed product: {product}")

if __name__ == "__main__":
    es.indices.create(
        index="products",
        ignore=400,  
        body={
            "mappings": {
                "properties": {
                    "Embedding": {"type": "dense_vector", "dims": 1536},
                    "Product Name": {"type": "text"},
                    "Original Product Name": {"type": "keyword"},
                    "Company Name": {"type": "keyword"},  
                    "Product Price": {"type": "float"},
                    "Original_Price": {"type": "float"},
                    "Category": {"type": "keyword"},
                    "Description": {"type": "text"},
                    "Description_Version": {"type": "integer"}
                }
            }
        }
    )

    
    index_products_in_elasticsearch()
