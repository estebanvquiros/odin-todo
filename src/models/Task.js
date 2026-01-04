class Task {
	id;
	title;
	description;
	dueDate;
	priority;
	projectId;

	constructor(title, description, dueDate, priority, projectId, id = crypto.randomUUID()) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.projectId = projectId;
	}
}

export default Task;