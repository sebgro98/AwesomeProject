
class CompetenceTranslatorDTO {

    /**
     * Constructs a new CompetenceTranslator object.
     *
     * @param {number} id - Unique identifier for the competence translator entry.
     * @param {string} lang - Identifies the specific language
     * @param {string} name - Name of the translated competence.
     */
    constructor(id,lang, name) {
        this.competence_id = id;
        this.lang = lang;
        this.translated_name = name;
    }
} module.exports = CompetenceTranslatorDTO;