  // /src/components/itinerary/Helper/Modal.js

  // Helper function to format dates
  export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to sort items by date
  export const getSortDateForItem = (type, itemData) => {
    switch (type) {
      case 'flight':
        return itemData.departureDate;
      case 'hotel':
        return itemData.checkInDate;
      case 'activity':
        return itemData.activityDate;
      default:
        return new Date();
    }
  };