import math
from firebase_admin import firestore

def delete_collection(coll_ref, batch_size):
    docs = coll_ref.list_documents(page_size=batch_size)
    deleted = 0

    for doc in docs:
        print(f"Deleting doc {doc.id} => {doc.get().to_dict()}")
        doc.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)

# Calculate difference of bools, true = 1,none = 0, false = -1
def boolDiff(value1, value2):
    # Convert boolean values to the specified mapping
        value1_mapped = 1 if value1 is True else (-1 if value1 is False else 0)
        value2_mapped = 1 if value2 is True else (-1 if value2 is False else 0)
        
        # Calculate the difference
        difference = value1_mapped - value2_mapped
        
        return difference

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance (in meters) between two points
    on the Earth's surface specified in latitude and longitude.
    """
    # Radius of the Earth in meters
    R = 6371000  # Approximately 6,371 kilometers

    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance

def format_hawker_response(response):
    formatted_response = {}

    formatted_response['name'] = response['name']
    formatted_response['formatted_address'] = response['formatted_address']
    formatted_response['longitude'] = response['geometry']['location']['lng']
    formatted_response['latitude'] = response['geometry']['location']['lat']
    formatted_response['location'] = response['vicinity']
    formatted_response['photo_data'] = response['photos']
    formatted_response['google_rating'] = response['rating']
    formatted_response['google_review_count'] = response['user_ratings_total']
    formatted_response['filter_tags'] = {}
    formatted_response['filter_tags']['breakfast'] = response['serves_breakfast']
    formatted_response['filter_tags']['brunch'] = response['serves_brunch']
    formatted_response['filter_tags']['lunch'] = response['serves_lunch']
    formatted_response['filter_tags']['dinner'] = response['serves_dinner']
    if (response['serves_wine'] == True) | (response['serves_beer'] == True):
        formatted_response['filter_tags']['alcohol'] = True
    else:
        formatted_response['filter_tags']['alcohol'] = False
    formatted_response['filter_tags']['wheelchair_accessibility'] = response['wheelchair_accessible_entrance']
    formatted_response['filter_tags']['vegetarian'] = response['serves_vegetarian_food']
    if 'opening_hours' in response:
        formatted_response['open_now'] = response['opening_hours']['open_now']
        formatted_response['opening_hours'] = response['opening_hours']['weekday_text']
    else:
        formatted_response['open_now'] = 'not available'
        formatted_response['opening_hours'] = 'not available'
    return formatted_response