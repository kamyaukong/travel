// /src/components/itinerary/TripDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatDateOnly } from '../utilities/Helper';
import { getSortDateForItem } from '../utilities/Helper';
import { ConfirmationModal } from '../utilities/ConfirmationModal';
import { ToastModal } from '../utilities/ToastModal';
import ItemFormController from './ItemFormController';
import { flightSchema, hotelSchema, activitySchema } from './ItemFormView';
import { AddItemModal } from './AddItemModal';
import { EditItineraryModal } from './EditItineraryModal';
import { useNavigate } from 'react-router-dom';

import './TripDetail.css';

export const TripDetail = () => {
  const { id } = useParams(); // itinerary id pass from TripList.js
  const [itineraryHeader, setItineraryHeader] = useState(); // itinerary header
  const [itineraryItems, setItineraryItems] = useState([]); // itinerary items
  const [isDirty, setIsDirty] = useState(false);  // control visibility of save button 
  const [isModalDelOpen, setIsModalDelOpen] = useState(false); // control visibility of delete confirmation message box
  const [itemToDelete, setItemToDelete] = useState({ type: '', index: -1 });  // itinerary item to delete
  const [addItemType, setAddItemType] = useState(null); // control visibility of add item modal
  const [isModalAddItemOpen, setIsModalAddItemOpen] = useState(false); // control visibility of add item modal
  const [isModalEditItineraryOpen, setIsModalEditItineraryOpen] = useState(false);  // control visibility of edit itinerary modal
  const [showToast, setShowToast] = useState(false); // control visibility of general message box (toast message)
  const [toastMessage, setToastMessage] = useState(''); // message to show on toast message box
  const [toastType, setToastType] = useState('standard'); // message type either standard or error for now. show different bg color
  const navigate = useNavigate(); // hadle back button

  // Fetch itinerary details from the Node.JS API
  useEffect(() => {
    if(id !== 'new') {
      const token = localStorage.getItem('token');
      // Check if the token exists
      if (token) {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        axios.get(`${process.env.REACT_APP_API_URL}/itinerary/${id}`, config)
          .then(response => {
            const { mainDetails, items } = response.data;
            setItineraryHeader(mainDetails);
            setItineraryItems(items);
          })
          .catch(error => {
            displayToast('There was an error fetching the itinerary details: ' + error.message, "warning");
          });
      } else {
        displayToast('Authorization token not found, please login.', "warning");
      }
    } else {
      // new itinerary - create blank header and items
      setItineraryHeader({
        name: '',
        startDate: '',
        endDate: '',
        adults: 0,
        children: 0,
        budget: 0,
        userID: 'testing',
      });
      setItineraryItems([]);
      const temp = setIsModalEditItineraryOpen(true);
    }
  }, [id]);

  // Modal for Delete Confirmation Message Box
  const openDelModal = (index) => {
    setItemToDelete({ index });
    setIsModalDelOpen(true);
  };

  // Delete itinerary item using index number from the list
  const deleteItem = (index) => {
    const updatedItems = itineraryItems.filter((_, itemIndex) => itemIndex !== index);
    setItineraryItems(updatedItems);
    setIsDirty(true);
    setIsModalDelOpen(false);
  };

  // Edit Itinerary Header
  const handleEditItinerary = (item) => {
    setItineraryHeader(item);
    setIsDirty(true);
    setIsModalEditItineraryOpen(false);
  }

  // Add new item to the itinerary item list
  const handleAddItem = (type, itemData) => {
    const newItem = { ...itemData, type, sortDate: getSortDateForItem(type, itemData) };
    setItineraryItems([...itineraryItems, newItem]);
    setIsDirty(true);
  };

  // Generic modal window to show a message
  const displayToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Back button
  const handleBackClick = () => {
    navigate('/');
  };

  // A state (flag) to indicate if the user has made any changes to any itinerary fields
  // If the form is dirty, the [Save] button will shown
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

  // Post to API
  const saveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const updateData = { ...itineraryHeader, items: itineraryItems };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      if (id === 'new') {
        await axios.post(`${process.env.REACT_APP_API_URL}/itinerary`, updateData, config);
      } else {
        await axios.put(`${process.env.REACT_APP_API_URL}/itinerary/${id}`, updateData, config);
      }
      setIsDirty(false);
      displayToast('Record has been saved', 'warning');
    } catch (error) {
      // Handle error
      displayToast('Error saving the changes' + error, 'warning');
    }
  };

  if (!itineraryHeader) {
    return <div>Seems system hit an issue when loading itinerary ...</div>;
  }

  // Triggered reuseable component 'ItemFormController' to render item details
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
  // console.log(itineraryItems);
  // start render the whole page
  return (
    <div className="trip-detail">
      {/* Make the header clickable for user to edit itinerary details */}
      <div className="itinerary-header" onClick={() => setIsModalEditItineraryOpen(true)}>
        <h2>{itineraryHeader.name}</h2>
        <h3 className="date-range">From: {formatDateOnly(itineraryHeader.startDate)} to {formatDateOnly(itineraryHeader.endDate)}</h3>
        <h3>Adult: {itineraryHeader.adults}</h3><h3>Child: {itineraryHeader.children}</h3>
        <h3>Budget: {itineraryHeader.budget}</h3>
      </div>
      {/* Menu Areas: 3 buttons to add new item and [Save] button to save editing changes*/}
      <div className="menu-bar">
        <button onClick={handleBackClick}>Back</button>
        <span onClick={() => { setAddItemType('flight'); setIsModalAddItemOpen(true); }}>✈️</span>
        <span onClick={() => { setAddItemType('hotel'); setIsModalAddItemOpen(true); }}>🏨</span>
        <span onClick={() => { setAddItemType('activity'); setIsModalAddItemOpen(true); }}>🎉</span>
        {isDirty && <button onClick={saveChanges} style={{float: 'right'}}>Save</button>}
      </div>
      {/* Loop all itinerary items and use reuseable component 'ItemFormController' to render details */}
      {itineraryItems.length === 0 ? (
        <div>
            <p>No items yet. Use icon above to add flights, hotels, or activities to your trip.</p>
        </div>
        ) : (itineraryItems.map((item, index) => (renderItem(item, index))))
      }
      {/* Modals - define popup windows*/}
      {/*   Edit Itinerary Header */}
      <EditItineraryModal
        isOpen={isModalEditItineraryOpen}
        item={itineraryHeader}
        onSave={handleEditItinerary}
        onRequestClose={() => setIsModalEditItineraryOpen(false)}
        />
      {/*   Add new item */}
      <AddItemModal
        isOpen={isModalAddItemOpen}
        itemType={addItemType} 
        onAddItem={handleAddItem} 
        onRequestClose={() => setIsModalAddItemOpen(false)}
      />  
      {/*   Confirm delete message box */}
      <ConfirmationModal 
        isOpen={isModalDelOpen} 
        onRequestClose={() => setIsModalDelOpen(false)} 
        onConfirm={() => deleteItem(itemToDelete.index)}
        message="Are you sure you want to delete this item?"
      />
      {/*   General message box to display a message for 3 seconds */}
      <ToastModal 
        message={toastMessage} 
        isVisible={showToast} 
        type={toastType}
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default TripDetail;