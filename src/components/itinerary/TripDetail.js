// TripDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utilities/Helper';
import ItemFormController from './ItemFormController';
import { flightSchema } from './ItemFormModel';
import { hotelSchema } from './ItemFormModel';
import { activitySchema } from './ItemFormModel';
import { AddItemModal } from './AddItemModal';
import { Modal } from '../utilities/Modal';
import { ConfirmationModal } from '../utilities/ConfirmationModal';
import { getSortDateForItem } from '../utilities/Helper';

import './TripDetail.css';

const TripDetail = () => {
  const [itineraryHeader, setitineraryHeader] = useState(null);
  const [itineraryItems, setItineraryItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: '', index: -1 });
  const [isDirty, setIsDirty] = useState(false);
  const { id } = useParams();
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [addItemType, setAddItemType] = useState(null); // Add this line

  // Fetch itinerary details from the Node.JS API
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/itinerary/${id}`)
      .then(response => {
        const { mainDetails, items } = response.data;
        setitineraryHeader(mainDetails);
        setItineraryItems(items);
      })
      .catch(error => {
        console.error('There was an error fetching the itinerary details', error);
      });
  }, [id]);

  /*
  // Define Modal for Add Item, and Confirma Delete Item
  const openAddItemModal = (type) => {
    setAddItemType(type);
    setShowAddItemModal(true);
  };
  */
  const openModal = (type, index) => {
    setItemToDelete({ type, index });
    setModalIsOpen(true);
  };

  const deleteItem = (type, index) => {
    const updatedItems = itineraryItems.filter((_, itemIndex) => itemIndex !== index);
    setItineraryItems(updatedItems);
    setIsDirty(true);
    closeModal(); // Close modal after deletion
  };

  const handleAddItem = (type, itemData) => {
    const newItem = { ...itemData, type, sortDate: getSortDateForItem(type, itemData) };
    setItineraryItems([...itineraryItems, newItem]);
    setIsDirty(true);
  };
/*
  const closeAddItemModal = () => {
    setShowAddItemModal(false);
    setAddItemType(null);
  };
*/
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // A state (flag) to indicate if the user has made any changes to any itinerary fields
  // If the user has made any changes, the [Save] button will be enabled
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

  /*
  const confirmDeletion = () => {
    deleteItem(itemToDelete.type, itemToDelete.index);
    closeModal();
  };
  */

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

  // Triggered ItemFormController to render details on the main return statement below
  const renderItem = (item, index) => {
    let schemaType;

    if (item.type === 'flight') {
      schemaType = flightSchema;
    } else if (item.type === 'hotel') {
      schemaType = hotelSchema;
    } else if (item.type === 'activity') {
      schemaType = activitySchema;
    } else { schemaType = null}

    return (<ItemFormController
      key={item._id || index}
      index={index}
      item={item}
      schema={schemaType}
      handleChange={(e) => handleInputChange(e, index)}
      openModal={openModal}
      isEditing={true}
    />)
  }

  return (
    <div className="trip-detail">
      <h2>{itineraryHeader.name}</h2>
      <div className="date-range">
        <h3>From: {formatDate(itineraryHeader.startDate)} to {formatDate(itineraryHeader.endDate)}</h3>
        <h3>Budget: {itineraryHeader.budget}</h3>
      </div>
      {/* Menu Areas: 3 buttons to add new item and [Save] button to save editing changes*/}
      <div className="menu-bar">
        <span onClick={() => { setAddItemType('flight'); setShowAddItemModal(true); }}>✈️</span>
        <span onClick={() => { setAddItemType('hotel'); setShowAddItemModal(true); }}>🏨</span>
        <span onClick={() => { setAddItemType('activity'); setShowAddItemModal(true); }}>🎉</span>
        {isDirty && <button onClick={saveChanges} style={{float: 'right'}}>Save</button>}
      </div>
      <Modal isOpen={showAddItemModal} handleClose={() => setShowAddItemModal(false)}>
        <AddItemModal 
          isOpen={showAddItemModal}
          itemType={addItemType} 
          onAddItem={handleAddItem} 
          onClose={() => setShowAddItemModal(false)}
          />
      </Modal>
      {/* Loop all itinerary items and reuse ItemFormController to render details */}
      {itineraryItems.map((item, index) => (renderItem(item, index)))}
      {/* Modal: Delete Item Confirmation Message Box */}
      <ConfirmationModal 
              isOpen={modalIsOpen} 
              onRequestClose={closeModal} 
              onConfirm={() => deleteItem(itemToDelete.type, itemToDelete.index)}
              message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default TripDetail;