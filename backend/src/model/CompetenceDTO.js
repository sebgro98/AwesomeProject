
class CompetenceDTO {

    /**
     * Constructs a new Competence object.
     *
     * @param {number} id - Unique identifier for the competence entry.
     * @param {number} name - Name of the competence.
     */
    constructor(id, name) {
        this.competence_id = id;
        this.name = name;
    }
} module.exports = CompetenceDTO;