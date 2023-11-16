import os
import googlemaps
import json
from api import create_app
from firebase_admin import firestore
from classes.HawkerManager import HawkerManager
from utils.functions import update_hawker_centre_locations
from utils.functions import update_hawker_centre_stalls
from utils.functions import update_carpark_information

app = create_app()

if __name__ == '__main__':

    current_dir = os.path.dirname(__file__)
    db = firestore.client()
    gmaps = googlemaps.Client(db.collection('admin').document('google_api_key').get().to_dict()['key'])
    
    with open(fr'{current_dir}\config\config.json', 'r') as config_json_file:
        config = json.load(config_json_file)

    with open(fr'{current_dir}\config\hawkerCentreLocations.json', 'r') as hawker_locations_json_file:
        hawkerCentreLocations = json.load(hawker_locations_json_file)

    with open(fr'{current_dir}\config\hawkerCarparkAvailability.json', 'r') as carpark_availability_json_file:
        carparkAvailabilities = json.load(carpark_availability_json_file)

    # On initialization of backend, hawker centre locations, stalls & carparks data are updated
    # The config.json folder can be updated accordingly if the data needs to be updated
    if config['update_hawker_centre_location']:
        print("Updating Hawker Centre Locations...")
        update_hawker_centre_locations(db, hawkerCentreLocations, gmaps)
        config['update_hawker_centre_location'] = False

    if config['update_hawker_centre_stalls']:
        print("Fetching Hawker Stalls...")
        update_hawker_centre_stalls(db, HawkerManager(db, gmaps))
        config['update_hawker_centre_stalls'] = False

    if config['update_carpark_collection']:
        print("Updating Carpark Collection...")
        update_carpark_information(db, carparkAvailabilities)
        config['update_carpark_collection'] = False

    with open(fr'{current_dir}\config\config.json', 'w') as config_json_file:
        json.dump(config, config_json_file, indent = 2)

    app = create_app()
    app.run(debug = True)