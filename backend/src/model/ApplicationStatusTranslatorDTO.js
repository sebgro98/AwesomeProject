
class ApplicationStatusTranslatorDTO {

    /**
     * Constructs a new ApplicationStatusTranslator object.
     *
     * @param {number} id - Unique identifier for the application status translator entry.
     * @param {string} lang - Identifies the specific language
     * @param {string} name - Name of the application status translator.
     */
    constructor(id,lang, name) {
        this.application_status_id = id;
        this.lang = lang
        this.translated_name = name;
    }
} module.exports = ApplicationStatusTranslatorDTO;