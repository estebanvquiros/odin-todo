import {subscribe} from "./pubsub";

subscribe("state-change", writeData);

function writeData(data) {
	localStorage.setItem("local-data", data);
}

function readData() {
	return localStorage.getItem("local-data");
}

export { writeData, readData };