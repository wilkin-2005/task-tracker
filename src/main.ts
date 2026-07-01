
// Importerar från andra .ts-filer
import { renderAllTasks } from "./render.js";
import { handleSubmit } from "./form.js";
import { loadTasks } from "./storage.js";

// DOM variabler
const form = document.querySelector("#task-form") as HTMLFormElement;
form.addEventListener("submit", handleSubmit);

loadTasks();
renderAllTasks();