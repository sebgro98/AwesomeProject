const CompetenceProfileDTO = require("./CompetenceProfileDTO");
const AvailabilityDTO = require("./AvailabilityDTO");

class ApplicationDTO {

    /**
     * Creates an instance of ApplicationDTO.
     *
     * @param {String} username - The username of the person applying.
     * @param {Array} competences - The competences of the person e.g { id: 3, experience: 3 }.
     * @param {Array} availabilities - The work periods the person is available.
     */
    constructor(username, competences, availabilities) {
        this.username = username;
        this.competences = this.mapCompetences(competences);
        this.availabilities = this.mapAvailabilities(availabilities);
    }

    /**
     * Maps competence data to CompetenceProfileDTO objects.
     *
     * @param {Array} competences - The array of competence data.
     * @returns {Array} - An array of CompetenceProfileDTO objects.
     */
    mapCompetences(competences) {
        return competences.map(competence => new CompetenceProfileDTO(competence.id, competence.experience));
    }

    /**
     * Maps availability data to AvailabilityDTO objects.
     *
     * @param {Array} availabilities - The array of availability data.
     * @returns {Array} - An array of AvailabilityDTO objects.
     */
    mapAvailabilities(availabilities) {
        return availabilities.map(availability => new AvailabilityDTO(availability.from, availability.to));
    }


}

module.exports = ApplicationDTO;
