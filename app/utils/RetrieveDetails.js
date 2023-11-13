import { useEffect, useState } from 'react';

export const getHawkerStalls = async() => {
  try {
      const requestOptions = { 
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({
              "id": 'ChIJv4Mk4QYa2jERx51-KDobWrA'
          })
      };
      const response = await fetch('http://127.0.0.1:5000/hawkers/getStallInfo', requestOptions);
      const data = await response.json();
      console.log(data.result);
      
  } catch (error) {
      console.error(error);
      return 
  }
};
export const getHawkerStallDetails = ({placeId}) => {
  const [hawkerStallDetails, setHawkerStallDetails] = useState(null);

  useEffect(() => {
    const fetchHawkerStallDetails = async () => {
      const requestOptions = { 
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
            "id": 'ChIJv4Mk4QYa2jERx51-KDobWrA'
        })
    };
      const response = await fetch('http://127.0.0.1:5000/hawkers/getStallInfo', requestOptions);
      const hawkerStallData = await response.json(); 
      
      const hawkerStallDetails = {};

      
      for (const key in hawkerStallData) {
        hawkerStallDetails[key] = hawkerStallData[key];
        console.log(key);
        console.log(hawkerStallDetails[key]);
      }

      
      setHawkerStallDetails(hawkerStallDetails);
      
    };

    fetchHawkerStallDetails();
  }, [placeId]);

  return hawkerStallDetails;
};

export const getHawkerStallReports = ({ stallId }) => {
  const [hawkerStallReports, setHawkerStallReports] = useState(null);

  useEffect(() => {
    const fetchHawkerStallReports = async () => {
      const response = await fetch(`http://127.0.0.1:5000/reports/getStallReports?id=${stallId}`);
      const reportsData = await response.json(); 
      
      const reportsDetails = {};

      
      for (const key in reportsData) {
        reportsDetails[key] = reportsData[key];
        console.log(key);
        console.log(reportsDetails[key]);
      }

      
      setHawkerStallReports(reportsDetails);
      
    };

    fetchHawkerStallReports();
  }, [stallId]);

  return hawkerStallReports;
};

export const getHawkerStallReviews = ({ stallId }) => {
  const [hawkerStallReviews, setHawkerStallReviews] = useState(null);

  useEffect(() => {
    const fetchHawkerStallReviews = async () => {
      const response = await fetch(`http://127.0.0.1:5000/reports/getStallReviews?id={stallID}`);
      const reviewsData = await response.json(); 
      
      const reviewsDetails = {};

      
      for (const key in reviewsData) {
        reviewsDetails[key] = reviewsData[key];
        console.log(key);
        console.log(reviewsDetails[key]);
      }

      
      setHawkerStallReviews(reviewsDetails);
      
    };

    fetchHawkerStallReviews();
  }, [stallId]);

  return hawkerStallReviews;
};



export const getNearbyHawkerCenters = ({distance, longitude, latitude}) => {
  const [nearbyHawkerCenters, setNearbyHawkerCenters] = useState([]);

  useEffect(() => {
    const fetchNearbyHawkerCenters = async () => {
      const response = await fetch(`http://127.0.0.1:5000/hawkers/getNearbyHawkers?id={distance,latitude,longitude}`); //need to confirm url
      const nearbyHawkerCentersData = await response.json();

      const nearbyHawkerDetails = {};

      
      for (const key in nearbyHawkerCentersData) {
        nearbyHawkerDetails[key] = nearbyHawkerCentersData[key];
        console.log(key);
        console.log(nearbyHawkerDetails[key])
      }


      setNearbyHawkerCenters(nearbyHawkerDetails);
    };

    fetchNearbyHawkerCenters();
  }, [placeId]);

  return nearbyHawkerCenters;
};



