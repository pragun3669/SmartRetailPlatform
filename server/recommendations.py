from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

def recommend_products(products, query_product):
    # Combine tags and category into a single string for vectorization
    products_data = [' '.join([product['category']] + product['tags']) for product in products]
    query_data = ' '.join([query_product['category']] + query_product['tags'])

    # Vectorize the data
    vectorizer = CountVectorizer().fit_transform(products_data + [query_data])
    vectors = vectorizer.toarray()

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(vectors[-1:], vectors[:-1])

    # Get indices of most similar products
    similar_indices = cosine_sim.argsort()[0][::-1]
    
    # Create a list of similar products with images
    similar_products = [products[i] for i in similar_indices[:5]]  # top 5 recommendations

    return similar_products

if __name__ == "__main__":
    # Example input
    input_data = json.loads(input())
    products = input_data['products']
    query_product = input_data['query_product']
    
    recommendations = recommend_products(products, query_product)
    print(json.dumps(recommendations))
