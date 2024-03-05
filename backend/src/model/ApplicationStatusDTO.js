
class ApplicationStatusDTO {

    /**
     * Constructs a new ApplicationStatus object.
     *
     * @param {number} id - Unique identifier for the application status entry.
     * @param {number} name - Name of the application status.
     */
    constructor(id, name) {
        this.application_status_id = id;
        this.name = name;
    }
} module.exports = ApplicationStatusDTO;