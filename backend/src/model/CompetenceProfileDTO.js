
class CompetenceProfileDTO {

    /**
     * Constructs a new Competence object.
     *
     * @param {number} id - Unique identifier for the competence entry.
     * @param {number} person_id - Identifier of the person associated with this competence.
     * @param {number} competence_id - Identifier for the specific type of competence.
     * @param {number} years_of_experience - The number of years of experience in this competence.
     */
    constructor(id, person_id, competence_id, years_of_experience) {
        this.id = id;
        this.person_id = person_id;
        this.competence_id = competence_id;
        this.years_of_experience = years_of_experience;
    }
} module.exports = CompetenceProfileDTO;