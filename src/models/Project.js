class Project {
	id;
	name;

	constructor(name) {
		this.id = crypto.randomUUID();
		this.name = name;
	}
}

export default Project;