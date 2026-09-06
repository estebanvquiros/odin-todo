export default class Task {
  constructor(id, title, description, dueDate, priority, projectID, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectID = projectID;
    this.completed = completed;
  }
}
