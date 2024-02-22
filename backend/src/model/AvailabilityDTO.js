
class AvailabilityDTO {

    /**
     * Constructs a new Availability object.
     *
     * @param {number} id - Unique identifier for the availability entry.
     * @param {number} person_id - Identifier of the person associated with this availability.
     * @param {Date} from_date - The start date of availability.
     * @param {Date} to_date - The end date of availability.
     */
    constructor(id, person_id, from_date, to_date) {
        this.id = id;
        this.person_id = person_id;
        this.from_date = from_date;
        this.to_date = to_date;
    }
} module.exports = AvailabilityDTO;