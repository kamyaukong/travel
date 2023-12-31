export const flightSchema = {
    classname: 'itinerary-info',
    fields: [{ name: 'airline', label: 'Airline', type: 'text' },
    { name: 'flightNumber', label: 'Flight Number', type: 'text' },
    { name: 'departureDate', label: 'Departure Date', type: 'date' },
    { name: 'departureTime', label: 'Departure Time', type: 'time' },
    { name: 'confirmationNumber', label: 'Confirmation Number', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'notes', label: 'Notes', type: 'text' },
]};
  
export const hotelSchema = {
    classname: 'itinerary-info',
    fields: [{ name: 'name', label: 'Hotel Name', type: 'text' },
    { name: 'addressLine1', label: 'Address', type: 'text' },
    { name: 'checkInDate', label: 'Check-in Date', type: 'date' },
    { name: 'checkInTime', label: 'Check-in Time', type: 'time' },
    { name: 'confirmationNumber', label: 'Confirmation Number', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'notes', label: 'Notes', type: 'text' },  
]};
  
export const activitySchema = {
    classname: 'itinerary-info',
    fields: [{ name: 'name', label: 'Activity', type: 'text' },
    { name: 'addressLine1', label: 'Address Line 1', type: 'text' },
    { name: 'addressLine2', label: 'Address Line 2', type: 'text' },
    { name: 'activityDate', label: 'Activity Date', type: 'date' },
    { name: 'activityTime', label: 'Activity Time', type: 'time' },
    { name: 'confirmationNumber', label: 'COnfirmation Number', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'notes', label: 'Notes', type: 'text' },  
]};

export const itinerarySchema = {
    classname: 'editItinerary-info',
    fields: [{ name: 'name', label: 'Name of the Trip', type: 'text' },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
    { name: 'adults', label: 'Adult', type: 'number' },
    { name: 'children', label: 'Children/Child', type: 'number' },
    { name: 'budget', label: 'Overall Budget', type: 'number' },  
]};

export const logonSchema = {
    classname: 'logon-info',
    fields: [{ name: 'userID', label: 'UserID', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
]};