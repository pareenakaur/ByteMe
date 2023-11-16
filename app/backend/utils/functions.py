import math
import requests

def delete_collection(coll_ref, batch_size):
    """Deletes all documents in a Firestore collection recursively

    This function iterates through all documents in the specified Firestore
    collection reference (`coll_ref`) and deletes them in batches of the given
    `batch_size`. It continues to delete documents until all documents in the
    collection are deleted.

    Args:
        coll_ref (google.cloud.firestore_v1.collection.CollectionReference): 
            A reference to the Firestore collection to be deleted.
        batch_size (int): 
            The number of documents to delete in each batch.
    """
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
    """Calculate the difference between boolean values.

    This function takes two boolean values, `value1` and `value2`, and maps them to 
    numerical values: True is mapped to 1, False is mapped to -1, and None is mapped to 0. 
    It then calculates the difference between the mapped values of `value1` and `value2`.

    Args:
        value1 (bool or None): The first boolean value to be compared.
        value2 (bool or None): The second boolean value to be compared.

    Returns:
        int: The numerical difference between the mapped values of `value1` and `value2`.
            - Returns 0 if both values are None.
            - Returns 1 if `value1` is True and `value2` is either None or False.
            - Returns -1 if `value1` is False and `value2` is either None or True.
            - Returns the difference in mapping values otherwise.
    """

    # Convert boolean values to the specified mapping
    value1_mapped = 1 if value1 is True else (-1 if value1 is False else 0)
    value2_mapped = 1 if value2 is True else (-1 if value2 is False else 0)
    
    # Calculate the difference
    difference = value1_mapped - value2_mapped
    
    return difference

def haversine(lat1, lon1, lat2, lon2):
    """Calculate the Haversine distance between two geographical coordinates.

    The Haversine formula is used to calculate the distance between two points
    on the surface of a sphere, given their latitude and longitude.

    Args:
        lat1 (float): Latitude of the first point in degrees.
        lon1 (float): Longitude of the first point in degrees.
        lat2 (float): Latitude of the second point in degrees.
        lon2 (float): Longitude of the second point in degrees.

    Returns:
        float: The Haversine distance between the two points in meters.
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
    """Format a Google Places API response for a hawker center.

    This function takes a response from the Google Places API for a hawker center
    and extracts relevant information, organizing it into a formatted dictionary.

    Args:
        response (dict): The raw response from the Google Places API for a hawker center.

    Returns:
        dict: A formatted dictionary containing information about the hawker center.
            The dictionary includes the following keys:
            - 'place_id': Place ID of the hawker center.
            - 'name': Name of the hawker center.
            - 'formatted_address': Formatted address of the hawker center.
            - 'longitude': Longitude coordinate of the hawker center.
            - 'latitude': Latitude coordinate of the hawker center.
            - 'location': Vicinity or neighborhood information.
            - 'photo_data': List of photo information, or 'not available' if no photos.
            - 'google_rating': Google rating of the hawker center, or 'not available'.
            - 'google_review_count': Number of Google reviews, or 'not available'.
            - 'filter_tags': Dictionary of filter tags, including:
                - 'vegetarian': Availability of vegetarian food, or 'not available'.
            - 'open_now': Whether the hawker center is open now, or 'not available'.
            - 'opening_hours': List of opening hours, or 'not available'.

    Example:
        >>> response = {
        ...     'place_id': 'ChIJxxxxxx',
        ...     'name': 'Maxwell Food Centre',
        ...     'formatted_address': '1 Kadayanallur St, Singapore',
        ...     'geometry': {'location': {'lng': 103.8432, 'lat': 1.2804}},
        ...     'vicinity': 'Chinatown',
        ...     'photos': [...],
        ...     'rating': 4.5,
        ...     'user_ratings_total': 1200,
        ...     'serves_vegetarian_food': True,
        ...     'opening_hours': {'open_now': True, 'weekday_text': [...]}
        ... }
        >>> formatted_response = format_hawker_response(response)
    """

    formatted_response = {}

    formatted_response['place_id'] = response['place_id']
    formatted_response['name'] = response['name']
    formatted_response['formatted_address'] = response['formatted_address']
    formatted_response['longitude'] = response['geometry']['location']['lng']
    formatted_response['latitude'] = response['geometry']['location']['lat']
    formatted_response['location'] = response['vicinity']
    
    if 'photos' in response:
        formatted_response['photo_data'] = response['photos']
    else:
        formatted_response['photo_data'] = 'not available'
    
    if 'rating' in response:
        formatted_response['google_rating'] = response['rating']
    else:
        formatted_response['google_rating'] = 'not available'
   
    if 'user_ratings_total' in response:
        formatted_response['google_review_count'] = response['user_ratings_total']
    else:
        formatted_response['google_review_count'] = 'not available'
   
    formatted_response['filter_tags'] = {}
  
    if 'serves_vegetarian_food' in response:
        formatted_response['filter_tags']['vegetarian'] = response['serves_vegetarian_food']
    else:
        formatted_response['filter_tags']['vegetarian'] = 'not available'
  
    if 'opening_hours' in response:
        formatted_response['open_now'] = response['opening_hours']['open_now']
        formatted_response['opening_hours'] = response['opening_hours']['weekday_text']
    else:
        formatted_response['open_now'] = 'not available'
        formatted_response['opening_hours'] = 'not available'
 
    return formatted_response

def get_carpark_availability(LTA_APIKEY):
    """Retrieve carpark availability data from the LTA DataMall API.

    This function makes a request to the LTA DataMall API to retrieve real-time
    carpark availability information. The LTA_APIKEY parameter is required for
    authentication.

    Args:
        LTA_APIKEY (str): The API key for authentication with the LTA DataMall API.

    Returns:
        dict or None: A dictionary containing the carpark availability data if the
            request is successful. Returns None if there is an error or the request
            is unsuccessful.
    """

    LTA_CARPARK_DATA_ENDPOINT = "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2"
    headers = {"AccountKey": LTA_APIKEY, "accept": "application/json"}

    response = requests.get(LTA_CARPARK_DATA_ENDPOINT,  headers=headers)
    if (response.status_code != 200):
        print(f"Response Status: {response.status_code}")
        print(f"Carpark API call error: {response}")
        return None

    response = response.json()
    return response

def update_carpark_information(db, carparkAvailabilities):
    """Update carpark information in the Firestore database.

    This function updates or adds carpark information to a Firestore database based on
    the provided carpark availability data. The `db` parameter is the Firestore client,
    and `carparkAvailabilities` is a dictionary containing carpark availability data.

    Args:
        db (google.cloud.firestore_v1.client.Client): The Firestore client.
        carparkAvailabilities (dict): A dictionary containing carpark availability data.
            The keys are identifiers, and the values are lists of dictionaries representing
            carpark availability information.
    """
    carparksColl = db.collection('carparks')
    
    for key in carparkAvailabilities:
        carparks_list = carparkAvailabilities[key]
        for carpark in carparks_list:
            if carparksColl.document(carpark['CarParkID']).get().exists:
                carparksColl.document(carpark['CarParkID']).update(carpark)
            else:
                carparksColl.document(carpark['CarParkID']).set(carpark)

def update_hawker_centre_locations(db, hawkerCentreLocations, gmaps):
    """Update hawker centre locations in the Firestore database based on Google Places API.

    This function takes a dictionary of hawker centre locations, queries the Google Places API
    for additional information, and updates or adds the information to a Firestore database.

    Args:
        db (google.cloud.firestore_v1.client.Client): The Firestore client.
        hawkerCentreLocations (dict): A dictionary containing hawker centre locations.
            Each location is represented as a dictionary with keys like 'longitude' and 'latitude'.
        gmaps (googlemaps.Client): The Google Maps client for API queries.
    """
    locations = hawkerCentreLocations['hawkerCentreLocations']
    for location in locations:
        longitude = location['longitude']
        latitude = location['latitude']
        results = gmaps.places_nearby(location=f"{latitude}, {longitude}", keyword='hawker centre', radius=20)
        
        if len(results['results']) != 0:
            hawker_centre = results['results'][0]
            
            if 'Centre' in hawker_centre['name']:
                location['name'] = hawker_centre['name']
                hawker_centre_response = gmaps.place(place_id=hawker_centre['place_id'])['result']
                location['formatted_address'] = hawker_centre_response['formatted_address']
                if 'serves_vegetarian_food' in hawker_centre_response:
                    location['vegetarian'] = hawker_centre_response['serves_vegetarian_food']
                else:
                    location['vegetarian'] = 'not available'

                doc = db.collection('hawkercentres').document(hawker_centre['place_id']).get()
                if doc.exists:
                    db.collection('hawkercentres').document(hawker_centre['place_id']).update(location)
                else:
                    db.collection('hawkercentres').document(hawker_centre['place_id']).set(location)

def update_hawker_centre_stalls(db,hawkerManager):
    """Update hawker centre stalls information in the Firestore database.

    This function retrieves hawker centres from the Firestore database, uses the provided
    `hawkerManager` to update stall information, and then updates the hawker centre documents
    with the list of stall place IDs.

    Args:
        db (google.cloud.firestore_v1.client.Client): The Firestore client.
        hawkerManager (HawkerManager): An instance of the HawkerManager class for managing hawker data.
    """
    docs = db.collection('hawkercentres').stream()
    for doc in docs:
        hawker_stall_ids = []
        hawker_centre_id = doc.id
        hawker_stalls = hawkerManager.updateHawkerCentreStalls(hawker_centre_id, True)
        for hawker_stall in hawker_stalls:
            hawker_stall_ids.append(hawker_stall['place_id'])

        doc_ref = db.collection('hawkercentres').document(hawker_centre_id)  
        doc_ref.update({
            'hawker_stalls' : hawker_stall_ids
        })