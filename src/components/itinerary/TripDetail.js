// /src/components/itinerary/TripDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatDateOnly } from '../utilities/Helper';
import ItemFormController from './ItemFormController';
import { flightSchema } from './ItemFormView';
import { hotelSchema } from './ItemFormView';
import { activitySchema } from './ItemFormView';
import { AddItemModal } from './AddItemModal';
import { getSortDateForItem } from '../utilities/Helper';
import { ConfirmationModal } from '../utilities/ConfirmationModal';
import { EditItineraryModal } from './EditItineraryModal';

import './TripDetail.css';

const TripDetail = () => {
  const { id } = useParams();
  const [itineraryHeader, setItineraryHeader] = useState();
  const [itineraryItems, setItineraryItems] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: '', index: -1 });
  const [addItemType, setAddItemType] = useState(null);
  const [isModalAddItemOpen, setIsModalAddItemOpen] = useState(false);
  const [isModalEditItineraryOpen, setIsModalEditItineraryOpen] = useState(false);

  // Fetch itinerary details from the Node.JS API
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/itinerary/${id}`)
      .then(response => {
        const { mainDetails, items } = response.data;
        setItineraryHeader(mainDetails);
        setItineraryItems(items);
      })
      .catch(error => {
        console.error('There was an error fetching the itinerary details', error);
      });
  }, [id]);

  // Modal process for Delete Confirmation Message Box
  const openDelModal = (index) => {
    setItemToDelete({ index });
    setIsModalDelOpen(true);
  };

  const deleteItem = (index) => {
    const updatedItems = itineraryItems.filter((_, itemIndex) => itemIndex !== index);
    setItineraryItems(updatedItems);
    setIsDirty(true);
    setIsModalDelOpen(false);
  };

  const handleEditItinerary = (item) => {
    setItineraryHeader(item);
    setIsDirty(true);
    // closeEditHeaderModal();
    setIsModalEditItineraryOpen(false);
  }

  const handleAddItem = (type, itemData) => {
    const newItem = { ...itemData, type, sortDate: getSortDateForItem(type, itemData) };
    setItineraryItems([...itineraryItems, newItem]);
    setIsDirty(true);
  };

  // A state (flag) to indicate if the user has made any changes to any itinerary fields
  // If the user has made any changes, the [Save] button will be enabled
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    // Create a new array with updated item
    const updatedItems = itineraryItems.map((item, idx) => {
      //console.log(item, idx);
      if (index === idx) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItineraryItems(updatedItems);
    setIsDirty(true);
  };

  const saveChanges = async () => {
    try {
      const updateData = { ...itineraryHeader, items: itineraryItems };
      await axios.put(`${process.env.REACT_APP_API_URL}/itinerary/${id}`, updateData);
      // Handle success
      //alert('Record has been saved');
      setIsDirty(false);
    } catch (error) {
      // Handle error
      console.error('Error saving the changes', error);
    }
  };

  if (!itineraryHeader) {
    return <div>Loading itinerary ...</div>;
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
      openModal={openDelModal}
      isEditing={true}
    />)
  }

  return (
    <div className="trip-detail">
      <div className="itinerary-header" onClick={() => setIsModalEditItineraryOpen(true)}>
        <h2>{itineraryHeader.name} {'show:' + isModalEditItineraryOpen} {'Dirty:' + isDirty}</h2>
        <h3 className="date-range">From: {formatDateOnly(itineraryHeader.startDate)} to {formatDateOnly(itineraryHeader.endDate)}</h3>
        <h3>Adult: {itineraryHeader.adults}</h3><h3>Child: {itineraryHeader.children}</h3>
        <h3>Budget: {itineraryHeader.budget}</h3>
      </div>
      {/* Menu Areas: 3 buttons to add new item and [Save] button to save editing changes*/}
      <div className="menu-bar">
        <span onClick={() => { setAddItemType('flight'); setIsModalAddItemOpen(true); }}>✈️</span>
        <span onClick={() => { setAddItemType('hotel'); setIsModalAddItemOpen(true); }}>🏨</span>
        <span onClick={() => { setAddItemType('activity'); setIsModalAddItemOpen(true); }}>🎉</span>
        {isDirty && <button onClick={saveChanges} style={{float: 'right'}}>Save</button>}
      </div>
      {/* Loop all itinerary items and reuse ItemFormController to render details */}
      {itineraryItems.length === 0 ? (
        <div>
            <p>No items yet. Use icon above to add flights, hotels, or activities to your itinerary.</p>
        </div>
        ) : (itineraryItems.map((item, index) => (renderItem(item, index))))
      }
      {/* Modals - popup windows*/}
      <EditItineraryModal
        isOpen={isModalEditItineraryOpen}
        item={itineraryHeader}
        onSave={handleEditItinerary}
        onRequestClose={() => setIsModalEditItineraryOpen(false)}
        />
      <AddItemModal
        isOpen={isModalAddItemOpen}
        itemType={addItemType} 
        onAddItem={handleAddItem} 
        onRequestClose={() => setIsModalAddItemOpen(false)}
      />  
      <ConfirmationModal 
        isOpen={isModalDelOpen} 
        onRequestClose={() => setIsModalDelOpen(false)} 
        onConfirm={() => deleteItem(itemToDelete.index)}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default TripDetail;