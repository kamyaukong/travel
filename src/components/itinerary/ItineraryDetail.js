// /src/components/itinerary/TripDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { formatDateOnly } from '../common/Helper';
import { getSortDateForItem } from '../common/Helper';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { ToastModal } from '../common/ToastModal';
import  FormGenerator from '../common/FormGenerator';
import { AddItemModal } from './AddItemModal';
import { EditItineraryModal } from './EditItineraryModal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routers/Authentication';
import callApi from '../../routers/api';

import './ItineraryDetail.css';

export const TripDetail = () => {
  const { id } = useParams(); // itinerary id pass from TripList.js
  const { userID } = useContext(AuthContext);
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
        // const config = {'Authorization': `Bearer ${token}`};
        //        callApi(`/itinerary/${id}`, 'GET', null, config)
        callApi(`/itinerary/${id}`, 'GET', null)
          .then(data => {
            const { mainDetails, items } = data;
            setItineraryHeader(mainDetails);
            setItineraryItems(items);
          })
          .catch(error => {
            displayToast('An error has occurred when fetching itinerary details: ' + error.message, "warning");
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
        userID: userID,
      });
      setItineraryItems([]);
      const temp = setIsModalEditItineraryOpen(true);
    }
  }, [id]);

  // Modal for Delete Confirmation Message Box
  const openDelModal = (itemType, index) => {
    setItemToDelete({ type: itemType, index });
    setIsModalDelOpen(true);
  };

  // Delete itinerary item using index number from the list
  const handleDeleteItem = () => {
    const { type, index } = itemToDelete;
    const item = itineraryItems[index];

    if(item && item._id) {
      try {
        // const token = localStorage.getItem('token');
        // const config = {'Authorization': `Bearer ${token}`};
        // callApi(`/itinerary/${id}/item/${type}/${item._id}`, 'DELETE', null, config);
        callApi(`/itinerary/${id}/item/${type}/${item._id}`, 'DELETE', null);
        // remove the item from the list
        const updatedItems = itineraryItems.filter((_, itemIndex) => itemIndex !== index);
        setItineraryItems(updatedItems);
        // setIsDirty(true);

      } catch (error) {
        displayToast('Error deleting the item: ' + error.message, ' error.');
      }
    }

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
      const updateData = { ...itineraryHeader, items: itineraryItems };
      // const token = localStorage.getItem('token');
      // const config = {'Authorization': `Bearer ${token}`}
      if (id === 'new') {
        //await axios.post(`${process.env.REACT_APP_API_URL}/itinerary`, updateData, config);
        // await callApi('/itinerary', 'POST', updateData, config);
        await callApi('/itinerary', 'POST', updateData);
      } else {
        // await axios.put(`${process.env.REACT_APP_API_URL}/itinerary/${id}`, updateData, config);
        //await callApi(`/itinerary/${id}`, 'PUT', updateData, config);
        await callApi(`/itinerary/${id}`, 'PUT', updateData);
      }
      setIsDirty(false);
      displayToast('Record has been saved', 'warning');
      handleBackClick();
    } catch (error) {
      // Handle error
      displayToast('Error saving the changes' + error, 'warning');
    }
  };

  if (!itineraryHeader) {
    return <div>Seems system hit an issue when loading itinerary ...</div>;
  }

  // start render the whole page
  return (
    <div className="itinerary-detail">
      {/* Make the header clickable for user to edit itinerary details */}
      <div className="function-button">
        <button className="button-style" onClick={handleBackClick}>Back</button>
      </div>
      <div className="itinerary-header" onClick={() => {setIsModalEditItineraryOpen(true)}}>
        <h2>{itineraryHeader.name}</h2>
        <h3>From: {formatDateOnly(itineraryHeader.startDate)} to {formatDateOnly(itineraryHeader.endDate)}</h3>
        <h3>Adult: {itineraryHeader.adults} &nbsp;&nbsp;&nbsp;Child: {itineraryHeader.children}</h3>
        <h3>Budget: {itineraryHeader.budget}</h3>
      </div>
      {/* Menu Areas: 3 buttons to add new item and [Save] button to save editing changes*/}
      <div className="menu-bar">
        <button className="button-style" onClick={() => { setAddItemType('flight'); setIsModalAddItemOpen(true); }}>✈️</button>
        <button className="button-style" onClick={() => { setAddItemType('hotel'); setIsModalAddItemOpen(true); }}>🏨</button>
        <button className="button-style" onClick={() => { setAddItemType('activity'); setIsModalAddItemOpen(true); }}>🎉</button>
        {isDirty && <button className="button-style" onClick={saveChanges} style={{float: 'right'}}>Save and Close</button>}
      </div>
      {/* Loop all itinerary items and use reuseable component 'ItemFormController' to render details */}
      <div className="itinerary-items-container">
        {itineraryItems.length === 0 ? (
          <div>
              <p>No items yet. Use icon above to add flights, hotels, or activities to your trip.</p>
          </div>
          ) : (itineraryItems.map((item, index) => (<>
                <FormGenerator
                  item={item}
                  schemaIdentifier={item.type}
                  handleChange={(e) => handleInputChange(e, index)}
                  onDelete={() => openDelModal(item.type, index)}
                  deleteIconClassName="delete-icon"
                />
          </>)))
        }
      </div>
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
        onConfirm={handleDeleteItem}
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