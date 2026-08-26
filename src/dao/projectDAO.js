import Project from "../models/Project";
import { read, write } from "./storageDAO"

const STORAGE_KEY = "odinTodo:projects";

function writeProjects(projects) {
  write(STORAGE_KEY, projects);
}

function readProjects() {
  const rawProjects = read(STORAGE_KEY);
  
  if (!rawProjects || Object.keys(rawProjects).length === 0) {
    const defaultProject = new Project(crypto.randomUUID(), "Index");
    const projects = {[defaultProject.id]: defaultProject}
    writeProjects(projects);
    return projects; 
  }

  return Object.fromEntries(
    Object.values(rawProjects).map((project) => [project.id, new Project(project.id, project.name)])
  );
}

export { writeProjects, readProjects }