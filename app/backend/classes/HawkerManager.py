import numpy as np
from firebase_admin import firestore
from utils.functions import haversine
from utils.functions import format_hawker_response
from utils.functions import get_carpark_availability

class HawkerManager:
    """Manage operations related to hawker centres, stalls, and associated data.

    Args:
        db (Firestore, optional): Firestore database instance. Defaults to None.
        gmaps (GoogleMaps, optional): Google Maps API instance. Defaults to None.
    """

    def __init__(self, db=None, gmaps=None):
        """Initialize the HawkerManager instance.

        Args:
            db (Firestore, optional): Firestore database instance. Defaults to None.
            gmaps (GoogleMaps, optional): Google Maps API instance. Defaults to None.
        """
        self.db = db
        self.gmaps = gmaps
    
    def getAllHawkerCentres(self):
        """Retrieve information about all hawker centres.

        Returns:
            list: List of dictionaries containing hawker centre information.
        """
        hawker_centre_response = []
        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre_documents = hawkerCentresColl.stream()
        
        for hawker_centre_document in hawker_centre_documents:
            hawker_centre = hawker_centre_document.to_dict()
            hawker_centre['place_id'] = hawker_centre_document.id
            hawker_centre_response.append(hawker_centre)
        
        return hawker_centre_response
    
    def getFilteredHawkerCentres(self, vegetarian, minrating):
        """Filter hawker centres based on vegetarian options and minimum rating.

        Args:
            vegetarian (bool): Flag indicating whether to filter vegetarian options.
            minrating (float): Minimum rating threshold.

        Returns:
            list: List of dictionaries containing filtered hawker centre information.
        """
        hawker_centre_response = []
        hawkerCentresColl = self.db.collection('hawkercentres')
        if vegetarian == True:
            hawker_centre_documents = hawkerCentresColl.where('vegetarian', '==', True).stream()
        else:
            hawker_centre_documents = hawkerCentresColl.stream()

        for hawker_centre_document in hawker_centre_documents:
            hawker_centre = hawker_centre_document.to_dict()
            hawker_centre['place_id'] = hawker_centre_document.id

            user_rating = self.getHawkerCentreRating(hawker_centre['place_id'])
            if user_rating != None:
                if user_rating >= minrating:
                    hawker_centre['user_rating'] = user_rating
                    hawker_centre_response.append(hawker_centre)

        return hawker_centre_response


    def getNearbyHawkerCentres(self, place_id, distance, format):
        """Retrieve information about nearby hawker centres.

        Args:
            place_id (str): Place ID of the reference location.
            distance (float): Maximum distance in kilometers.
            format (bool): Flag indicating whether to format the response.

        Returns:
            list: List of dictionaries containing nearby hawker centre information.
        """
        nearby_hawker_centre_details = []
        distance_list = []

        hawkerCentresColl = self.db.collection('hawkercentres')
        user_location = hawkerCentresColl.document(place_id).get().to_dict()
        hawker_centre_locations_documents = hawkerCentresColl.stream()
        hawker_centre_locations_documents_list = [doc for doc in hawker_centre_locations_documents]

        found = 0

        # Get the list of Hawker Centre IDs within specified radius
        for document in hawker_centre_locations_documents_list:
            place_data = document.to_dict()
            lat1, long1 = float(place_data['latitude']), float(place_data['longitude'])
            lat2, long2 = float(user_location['latitude']), float(user_location['longitude'])
            dist = haversine(lat1, long1, lat2, long2)
            distance_list.append(dist)
            
            # If the distance is lower than specified, increase the found count by 1
            if dist <= float(distance):
                found += 1

        if found <= 4:
            nearby_place_index_list = np.argsort(distance_list)[:found]

        else:
            nearby_place_index_list = np.argsort(distance_list)[:4]

        for index in nearby_place_index_list:
            nearby_place_document = hawker_centre_locations_documents_list[index]
            place_id = nearby_place_document.id
            nearby_hawker_centre_details.append(self.getHawkerCentreInfo(place_id, format))      

        return nearby_hawker_centre_details
    
    def getHawkerCentreInfo(self, centreID, format):
        """Retrieve detailed information about a hawker centre.

        Args:
            centreID (str): Unique identifier of the hawker centre.
            format (bool): Flag indicating whether to format the response.

        Returns:
            dict: Dictionary containing hawker centre information, including user ratings,
                review count, report count, and crowdedness.
        """
       
        response = self.gmaps.place(place_id=centreID)['result']
        if format:
            response = format_hawker_response(response)

        carparksColl = self.db.collection('carparks')
        carparks_documents = carparksColl.stream()

        carparks_list  = [carpark_document.to_dict() for carpark_document in carparks_documents]
        carparks_dict = {carpark['CarParkID']: carpark for carpark in carparks_list}


        response['user_rating'] = self.getHawkerCentreRating(centreID)
        response['user_review_count'] = self.getHawkerCentreReviewCount(centreID)
        response['user_report_count'] = self.getHawkerCentreReportCount(centreID)
        response['crowdedness'] = self.getHawkerCentreCrowdedness(centreID, carparks_dict)
        return response

    
    def updateHawkerCentreStalls(self, centreID, format):
        """Update and retrieve information about hawker stalls near a hawker centre.

        Args:
            centreID (str): Unique identifier of the hawker centre.
            format (bool): Flag indicating whether to format the response.

        Returns:
            List[dict] or None: List of dictionaries containing information about hawker stalls
                                near the specified hawker centre, including user ratings,
                                review count, report count, and crowdedness. Returns None if no
                                hawker stalls are found.
        """

        hawker_stalls_list = []
        hawkerCentresColl = self.db.collection('hawkercentres')
        location = hawkerCentresColl.document(centreID).get().to_dict()

        response = self.gmaps.places_nearby(location=f"{location['latitude']}, {location['longitude']}", keyword='hawker', radius=20)['results']
        if len(response) == 0:
            return None
        for hawker_stall in response:
            hawker_stall_response = self.getStallInfo(hawker_stall['place_id'], format)
            hawker_stalls_list.append(hawker_stall_response)

        return hawker_stalls_list
    
    def getHawkerCentreStalls(self, centreID, format):
        """Retrieve information about hawker stalls associated with a hawker centre.

        Args:
            centreID (str): Unique identifier of the hawker centre.
            format (bool): Flag indicating whether to format the response.

        Returns:
            Union[List[dict], str]: List of dictionaries containing information about hawker stalls
                                    associated with the specified hawker centre, including user ratings,
                                    review count, report count, and crowdedness. Returns 'not available'
                                    if no hawker stalls are associated with the hawker centre.
        """

        hawker_stalls_list = []
        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre = hawkerCentresColl.document(centreID).get().to_dict()

        if ("hawker_stalls" in hawker_centre):
            for hawker_stall_id in hawker_centre['hawker_stalls']:
                hawker_stall_response = self.getStallInfo(hawker_stall_id, format)
                hawker_stalls_list.append(hawker_stall_response)
        else:
            return 'not available'

        return hawker_stalls_list

    def getStallInfo(self, stallID, format):
        """Retrieve information about a hawker stall.

        Args:
            stallID (str): Unique identifier of the hawker stall.
            format (bool): Flag indicating whether to format the response.

        Returns:
            dict: Dictionary containing information about the specified hawker stall,
                including user rating, review count, and report count. The 'format'
                parameter determines whether the response is formatted.
        """
        from ReviewManager import ReviewManager
        from ReportManager import ReportManager

        response = self.gmaps.place(place_id = stallID)['result']
        if format:
            response = format_hawker_response(response)

        response['user_rating'] = ReviewManager.getAvgReviewRating(stallID, self.db.collection('reviews'))
        response['user_review_count'] = ReviewManager.getReviewCount(stallID, self.db.collection('reviews'))
        response['user_report_count'] = ReportManager.getReportCount(stallID, self.db.collection('reports'))
        return response

    def getHawkerCentreLocation(self, placeID):
        """Retrieve the location information of a hawker centre.

        Args:
            placeID (str): Unique identifier of the hawker centre.

        Returns:
            google.cloud.firestore_v1.document.DocumentSnapshot: A document snapshot representing the location
            information of the specified hawker centre.
        """
        hawkerCentresColl = self.db.collection('hawkercentres')
        location = hawkerCentresColl.document(placeID).get()
        return location
    
    def getPlaceIDFromLatLong(self, lat, long):
        """Retrieve the unique identifier (placeID) of the nearest hawker centre based on latitude and longitude.

        Args:
            lat (float): Latitude of the target location.
            long (float): Longitude of the target location.

        Returns:
            str: Unique identifier (placeID) of the nearest hawker centre based on the specified latitude and longitude.
        """
        distance_list = []

        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre_locations_documents = hawkerCentresColl.stream()
        hawker_centre_locations_documents_list = [doc for doc in hawker_centre_locations_documents]

        # Get the list of Hawker Centre IDs within specified radius
        for document in hawker_centre_locations_documents_list:
            place_data = document.to_dict()

            lat1, long1 = float(place_data['latitude']), float(place_data['longitude'])
            lat2, long2 = float(lat), float(long)
            dist = haversine(lat1, long1, lat2, long2)
            
            # If the distance is lower than specified, query the information and append to list
            distance_list.append(dist)

        place_id = hawker_centre_locations_documents_list[np.argmin(distance_list)].id
        return place_id

    def getHawkerCentreReviewCount(self, placeID):
        """Retrieve the number of reviews for a specific hawker centre.

        Args:
            placeID (str): Unique identifier of the hawker centre.

        Returns:
            int: Number of reviews associated with the specified hawker centre.
        """
        
        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre =  hawkerCentresColl.document(placeID).get().to_dict()
        if 'reviews' in hawker_centre:
            count = len(hawker_centre['reviews'])
        else:
            count = 0

        return count

    def getHawkerCentreReportCount(self, placeID):
        """Retrieve the number of reports for a specific hawker centre.

        Args:
            placeID (str): Unique identifier of the hawker centre.

        Returns:
            int: Number of reports associated with the specified hawker centre.
        """

        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre = hawkerCentresColl.document(placeID).get().to_dict()
        if 'reports' in hawker_centre:
            count = len(hawker_centre['reports'])
        else:
            count = 0

        return count

    def getHawkerCentreRating(self, placeID):
        """Retrieve the average rating of a hawker centre based on user reviews.

        Args:
            placeID (str): Unique identifier of the hawker centre.

        Returns:
            Union[float, None]: Average rating of the hawker centre or None if there are no reviews.
        """

        hawkerCentresColl = self.db.collection('hawkercentres')
        reviewsColl = self.db.collection('reviews')
        hawker_centre = hawkerCentresColl.document(placeID).get().to_dict()
        if 'reviews' in hawker_centre:
            review_id_list = hawker_centre['reviews']
            total_rating = 0
            for review_id in review_id_list:
                review = reviewsColl.document(review_id).get().to_dict()
                total_rating += review['rating']
            return round(total_rating / len(review_id_list), 2)
        else:
            return None

        
    def getHawkerCentreCrowdedness(self, placeID, carpark_dict):
        """Retrieve the crowdedness of a hawker centre based on nearby carpark data.

        Args:
            placeID (str): Unique identifier of the hawker centre.
            carpark_dict (Dict): Dictionary containing carpark information.

        Returns:
            Union[str, float]: Crowdedness of the hawker centre (as a ratio of available lots to total lots)
                            or 'not available' if no carpark data is found.
        """

        hawker_centre = self.db.collection('hawkercentres').document(placeID).get().to_dict()
        live_carpark_data = get_carpark_availability(self.db.collection('admin').document('lta_carpark_key').get().to_dict()['key'])['value']

        live_nearby_carparks = []
        # Get live carpark data for nearby carparks
        for live_carpark in live_carpark_data:
            carpark_coords = live_carpark['Location'].split()
            carpark_lat = float(carpark_coords[0])
            carpark_long = float(carpark_coords[1])
            distance = haversine(carpark_lat, carpark_long, hawker_centre['latitude'], hawker_centre['longitude'])
            if distance < 300:
                live_nearby_carparks.append(live_carpark)

        # Calculate the crowdedness
        total_lots = 0
        available_lots = 0
        for live_nearby_carpark in live_nearby_carparks:
            carpark_total = carpark_dict[live_nearby_carpark["CarParkID"]]
            if(carpark_total):
                total_lots += carpark_total['TotalLots']
                available_lots += live_nearby_carpark['AvailableLots']
        if total_lots == 0:
            return 'not available'
        else:
            return available_lots / total_lots
        
    def updateHawkerCentreCollection(self):
        """Update the crowdedness and user rating for all hawker centres in the collection.

        This method iterates through all hawker centres in the collection, retrieves
        the crowdedness and user rating based on nearby carpark data and its respective reviews, 
        and updates the corresponding fields in the hawker centre documents.

        Note:
            This method assumes the existence of 'carparks' and 'admin' collections
            in the Firestore database.

        Returns:
            None
        """

        print("Updating Hawker Centres Crowdedness...")
        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre_documents = hawkerCentresColl.stream()
        
        carparksColl = self.db.collection('carparks')
        carparks_documents = carparksColl.stream()

        carparks_list  = [carpark_document.to_dict() for carpark_document in carparks_documents]
        carparks_dict = {carpark['CarParkID']: carpark for carpark in carparks_list}

        for hawker_centre_document in hawker_centre_documents:

            hawker_centre = hawker_centre_document.to_dict()
            place_id = hawker_centre_document.id
            
            crowdedness = self.getHawkerCentreCrowdedness(place_id, carparks_dict)
            hawker_centre['crowdedness'] = crowdedness
            
            user_rating = self.getHawkerCentreRating(place_id)
            hawker_centre['user_rating'] = user_rating

            hawkerCentresColl.document(place_id).update(hawker_centre) 
        
    def addHawkerReview(self, centreID,reviewID):
        """Add a review to a specific hawker centre.

        This method updates the 'reviews' field in the hawker centre document by adding
        the specified review ID to the array of reviews.

        Args:
            centreID (str): The unique identifier of the hawker centre.
            reviewID (str): The unique identifier of the review to be added.

        Returns:
            None
        """

        self.db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayUnion([reviewID])})
        return

    def deleteHawkerReview(self,centreID,reviewID):
        """Remove a review from a specific hawker centre.

        This method updates the 'reviews' field in the hawker centre document by removing
        the specified review ID from the array of reviews.

        Args:
            centreID (str): The unique identifier of the hawker centre.
            reviewID (str): The unique identifier of the review to be removed.

        Returns:
            None
        """

        self.db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayRemove([reviewID])})
        return

    def addHawkerReport(self, centreID,reportID):
        """Add a report to a specific hawker centre.

        This method updates the 'reports' field in the hawker centre document by adding
        the specified report ID to the array of reports.

        Args:
            centreID (str): The unique identifier of the hawker centre.
            reportID (str): The unique identifier of the report to be added.

        Returns:
            None
        """

        self.db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayUnion([reportID])})
        return

    def deleteHawkerReport(self, centreID,reportID):
        """Delete a report from a specific hawker centre.

        This method updates the 'reports' field in the hawker centre document by removing
        the specified report ID from the array of reports.

        Args:
            centreID (str): The unique identifier of the hawker centre.
            reportID (str): The unique identifier of the report to be removed.

        Returns:
            None
        """
        
        self.db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayRemove([reportID])})
        return