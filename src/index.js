import "../styles/reset.css";
import "../styles/global.css";
import "../styles/sidebar/sidebar.css";
import "../styles/sidebar/logo.css";
import "../styles/dialog.css";
import "../styles/content/content.css";
import "../styles/content/task.css";
import { initProjectController, loadProjects } from "./controllers/projectController";
import { initTaskController } from "./controllers/taskController";
import { initDefaultProject } from "./services/projectService";

initDefaultProject();
initTaskController();
initProjectController();
loadProjects();
