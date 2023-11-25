// src/hooks/useItineraryDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useItineraryDetails = (itineraryId) => {
  const [itineraryHeader, setItineraryHeader] = useState();
  const [itineraryItems, setItineraryItems] = useState([]);
  // Other state declarations...

  useEffect(() => {
    let isMounted = true; // Flag to track if component is still mounted

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}`);
        if (isMounted) {
          const { mainDetails, items } = response.data;
          setItineraryHeader(mainDetails);
          setItineraryItems(items);
        }
      } catch (error) {
        if (isMounted) {
          // Handle error
        }
      }
    };

    const initializeNewItinerary = () => {
      if (isMounted) {
        // Initialize new itinerary here
      }
    };

    if (itineraryId !== 'new') {
      fetchData();
    } else {
      initializeNewItinerary();
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [itineraryId]);

  // Other functions and logic...

  return { itineraryHeader, itineraryItems, isDirty, setItineraryHeader, setItineraryItems, setIsDirty };
};

// export default useItineraryDetails;
