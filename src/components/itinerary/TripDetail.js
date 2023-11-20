// TripDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utilities/Helper';
import ConfirmationModel from '../utilities/ConfirmationModal';
import { FlightItem } from './FlightItem';
import { HotelItem } from './HotelItem';
import { ActivityItem } from './ActivityItem';

import './TripDetail.css';

const TripDetail = () => {
  const [itineraryHeader, setitineraryHeader] = useState(null); // State for main details
  const [itineraryItems, setItineraryItems] = useState(); // State for combined, sorted items
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: '', index: -1 });
  const [isDirty, setIsDirty] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/itinerary/${id}`)
      .then(response => {
        const { mainDetails, items } = response.data;
        setitineraryHeader(mainDetails); // State for itinerary header fields
        setItineraryItems(items); // State for combined, sorted itinerary items
      })
      .catch(error => {
        console.error('There was an error fetching the itinerary details', error);
      });
  }, [id]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    // Create a new array with updated item
    const updatedItems = itineraryItems.map((item, idx) => {
      console.log(item, idx);
      if (index === idx) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItineraryItems(updatedItems);
    setIsDirty(true);
  };

  const openModal = (type, index) => {
    setItemToDelete({ type, index });
    setModalIsOpen(true);
  };

  const confirmDeletion = () => {
    // Perform deletion using itemToDelete state
    deleteItem(itemToDelete.type, itemToDelete.index);
    closeModal();
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteItem = (type, index) => {
    const updatedItems = itineraryItems.filter((_, itemIndex) => itemIndex !== index);
    setItineraryItems(updatedItems);
    setIsDirty(true);
    closeModal(); // Close modal after deletion
  };

  const saveChanges = async () => {
    try {
      const updateData = { ...itineraryHeader, items: itineraryItems };
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/itinerary/${id}`, updateData);
      // Handle success
      //alert('Record has been saved');
      setIsDirty(false);
    } catch (error) {
      // Handle error
      console.error('Error saving the changes', error);
    }
  };

  if (!itineraryHeader || !itineraryItems.length) {
    return <div>Loading...</div>;
  }

  const renderItem = (item, index) => {
    switch (item.type) {
      case 'flight':
        return <FlightItem 
          key={item._id} 
          item={item} 
          handleInputChange={handleInputChange} 
          openModal={openModal} 
          index={index} 
        />;
      case 'hotel':
        return <HotelItem 
          key={item._id} 
          item={item} 
          handleInputChange={handleInputChange} 
          openModal={openModal} 
          index={index} 
        />;
      case 'activity':
        return <ActivityItem 
          key={item._id} 
          item={item} 
          handleInputChange={handleInputChange} 
          openModal={openModal} 
          index={index} 
        />;      
      default:
        return null;
    }
  };
  
  return (
    <div className="trip-detail">
      <h2>{itineraryHeader.name}</h2>
      <div className="date-range">
        <h3>From: {formatDate(itineraryHeader.startDate)} to {formatDate(itineraryHeader.endDate)}</h3>
        <h3>Budget: {itineraryHeader.budget}</h3>
      </div>
      {itineraryItems.map((item, index) => (renderItem(item, index)))}
      <ConfirmationModel 
              isOpen={modalIsOpen} 
              onRequestClose={closeModal} 
              onConfirm={() => deleteItem(itemToDelete.type, itemToDelete.index)}
              message="Are you sure you want to delete this item?"
            />
      {isDirty && <button onClick={saveChanges}>Save</button>}
    </div>
  );
};

export default TripDetail;
