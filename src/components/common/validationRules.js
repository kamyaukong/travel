// /src/components/utilities/validationRules.js

const flightValidationRules = (item) => {
    let errors = [];
    if (!item.airline) errors.push("Airline is required");
    // Add other flight-specific validation checks here
    return errors;
};

const hotelValidationRules = (item) => {
    let errors = [];
    if (!item.name) errors.push("Hotel name is required");
    // Add other hotel-specific validation checks here
    return errors;
};

const activityValidationRules = (item) => {
    let errors = [];
    if (!item.name) errors.push("Activity name is required");
    // Add other activity-specific validation checks here
    return errors;
};

const itineraryValidationRules = (itinerary) => {
    let errors = [];
    if (!itinerary.name) errors.push("Itinerary name is required");
    //if (!itinerary.startDate) errors.push("Start date is required");
    //if (!itinerary.endDate) errors.push("End date is required");
    // Add other itinerary-specific validation checks here
    return errors;
};

export default {
    flight: flightValidationRules,
    hotel: hotelValidationRules,
    activity: activityValidationRules,
    itinerary: itineraryValidationRules,
};