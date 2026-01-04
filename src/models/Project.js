class Project {
	id;
	name;
	tasks;

	constructor(name, id = crypto.randomUUID(), tasks = []) {
		this.id = id;
		this.name = name;
		this.tasks = tasks;
	}
}

export default Project;