import "../styles/reset.css";
import "../styles/global.css";
import "../styles/sidebar/sidebar.css";
import "../styles/sidebar/logo.css";
import "../styles/dialog.css";
import "../styles/content/content.css";
import { loadProjects } from "./controllers/projectController";
import { loadTasks } from "./controllers/taskController";

loadProjects();
console.log(loadTasks()); // TODO: Load default project tasks.
