
class RoleDTO {

    /**
     * Constructs a new Role object.
     *
     * @param {number} id - Unique identifier for the role entry.
     * @param {number} name - Name of the competence.
     */
    constructor(id, name) {
        this.role_id = id;
        this.name = name;
    }
} module.exports = RoleDTO;