class Project {
	id;
	name;

	constructor(name, id = crypto.randomUUID()) {
		this.id = id;
		this.name = name;
	}
}

export default Project;