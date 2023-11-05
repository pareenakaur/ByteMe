import { useEffect, useState } from 'react';

export const getHawkerStallDetails = ({ placeId }) => {
  const [hawkerStallDetails, setHawkerStallDetails] = useState(null);

  useEffect(() => {
    const fetchHawkerStallDetails = async () => {
      const response = await fetch(`http://127.0.0.1:5000/hawkers/getStallInfo?id={placeID}`);
      const hawkerStallData = await response.json(); 
      
      const hawkerStallDetails = {};

      
      for (const key in hawkerStallData) {
        hawkerStallDetails[key] = hawkerStallData[key];
      }

      
      setHawkerStallDetails(hawkerStallDetails);
      
    };

    fetchHawkerStallDetails();
  }, [placeId]);

  return hawkerStallDetails;
};

export const getNearbyHawkerCenters = ({placeId}) => {
  const [nearbyHawkerCenters, setNearbyHawkerCenters] = useState([]);

  useEffect(() => {
    const fetchNearbyHawkerCenters = async () => {
      const response = await fetch(`http://127.0.0.1:5000/hawkers/getNearbyHawkers?id={placeID}`); //need to confirm url
      const nearbyHawkerCentersData = await response.json();

      const nearbyHawkerDetails = {};

      
      for (const key in nearbyHawkerCentersData) {
        nearbyHawkerDetails[key] = nearbyHawkerCentersData[key];
      }


      setNearbyHawkerCenters(nearbyHawkerDetails);
    };

    fetchNearbyHawkerCenters();
  }, [placeId]);

  return nearbyHawkerCenters;
};



