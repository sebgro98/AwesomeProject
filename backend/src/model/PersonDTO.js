//Define a class for representing a person data transfer object and Export the PersonDTO class to make it available for other modules
class PersonDTO {
    // Constructor to initialize the properties of the object
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
} module.exports = PersonDTO;