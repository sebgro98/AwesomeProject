
class PersonDTO {

    /**
     * Constructs a new Person object.
     *
     * @param {number} person_id - Unique identifier for the person.
     * @param {string} name - The first name of the person.
     * @param {string} surname - The surname of the person.
     * @param {string} pnr - Personal number or identification number of the person.
     * @param {string} email - Email address of the person.
     * @param {string} password - Password for the person's account.
     * @param {number} role_id - Identifier for the role of the person.
     * @param {string} username - Username for the person's account.
     * @param {number} application_status_id - Identifier for the application status of the person.
     */
    constructor(person_id, name, surname, pnr, email, password, role_id, username, application_status_id) {
        this.person_id = person_id;
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
        this.password = password
        this.role_id = role_id;
        this.username = username;
        this.application_status_id = application_status_id;
    }
}
module.exports = PersonDTO;