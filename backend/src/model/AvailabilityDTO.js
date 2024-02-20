//Define a class for representing an availability data transfer object and Export the PersonDTO class to make it available for other modules
class AvailabilityDTO {
    // Constructor to initialize the properties of the object
    constructor(id, person_id, from_date, to_date) {
        this.id = id;
        this.person_id = person_id;
        this.from_date = from_date;
        this.to_date = to_date;
    }
} module.exports = AvailabilityDTO;