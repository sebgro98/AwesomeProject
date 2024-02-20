//Define a class for representing a competence profile data transfer object and Export the CompetenceProfileDTO class to make it available for other modules
class CompetenceProfileDTO {
    // Constructor to initialize the properties of the object
    constructor(id, person_id, competence_id, years_of_experience) {
        this.id = id;
        this.person_id = person_id;
        this.competence_id = competence_id;
        this.years_of_experience = years_of_experience;
    }
} module.exports = CompetenceProfileDTO;