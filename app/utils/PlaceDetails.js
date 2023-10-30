import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Profile from '../components/hawker-stall-profile/HawkerStallProfile';

const apiKey = '';

const getHawkerStallDetails = ({ placeId }) => {
  const [place, setPlace] = useState(null);

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

    // Initialize the map and make the API requests
    function initMap() {
      const map = new google.maps.Map(document.createElement('div')); // Dummy map element

      const request = {
        placeId: placeId,
        fields: ['name', 'photos', 'formatted_address', 'formatted_phone_number', 'opening_hours', 'rating'] //MAY NEED TO REMOVE OPENING HOURS RATING AND PHONE NUMBER CUZ THEY ARE PAID, MAY NEED TO HARDCODE THESE STUFF
      };

      const service = new google.maps.places.PlacesService(map);
      service.getDetails(request, callback);
    }

    // Callback function to handle Place Details response
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const place = results;
        setPlace(place);
      }
    }
  }, [placeId]);

  if (!place) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Profile place={place} />
    </View>
  );
};

export default getHawkerStallDetails;
