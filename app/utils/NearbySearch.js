import React, { useEffect, useState } from 'react';
import MainPage from '../components/other-hawker-recommendations/MainPage';

const apiKey = ''; // Initialize your API key here
const placeId = ''; 

const getNearbyHawkerCenters = () => {
  const [nearbyHawkers, setNearbyHawkers] = useState([]);

  useEffect(() => {
    function initializeGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // The Google Maps JavaScript API has loaded, and the initMap callback will be called automatically.
      initMap();
    };

      document.head.appendChild(script);
    }

    // Call the initialization function when your component mounts
    initializeGoogleMaps();

    function centerMapAtPlaceId(placeId) {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
      });

      const service = new google.maps.places.PlacesService(map);

      // Use the Place Details request to get the location (lat and lng) for the specified Place ID.
      service.getDetails(
        { placeId: placeId },
        function (place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Center the map at the location retrieved from the Place Details request.
            map.setCenter(place.geometry.location);
          }
        }
      );

      return map;
    }

    // Call the centerMapAtPlaceId function with the desired Place ID.
    
    // Initialize the map and make the API requests
    function initMap() {
      const map = centerMapAtPlaceId(placeId);
      const request = {
        location: map.getCenter(),
        radius: '1000', // 1 km (adjust as needed)
        type: ['restaurant'] // only relevant type was restaurant
      };
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }

    // Callback function to handle Place Details response
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const top3Results = results.slice(0, 3); // Get the top 3 results
  
        const nearbyHawkerCenters = top3Results.map((place) => {
          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            place.geometry.location,
            map.getCenter()
          );
  
          return {
            name: place.name,
            image: place.photos ? place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 }) : null,
            distance: distance
          };
        });
  
        setNearbyHawkers(nearbyHawkerCenters);
      }
    }
  }, [placeId]);


    


  return (

    {nearbyHawkers}

  );
}

export default getNearbyHawkerCenters;
