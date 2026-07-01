
// Importerar från andra .ts-filer
import type { PriorityLevels } from "./types.js";
import { renderAllTasks } from "./render.js";
import { addTask, tasks } from "./tasks.js";
import { loadTasks } from "./storage.js";


// DOM variabler
const form = document.querySelector("#task-form") as HTMLFormElement;
form.addEventListener("submit", handleSubmit);
const nameInput = document.querySelector("#task-name") as HTMLInputElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
// const descriptionInput = document.querySelector("#description-input") as HTMLTextAreaElement;

const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;


// Hanterar submits från formuläret för att lägga till nya uppgifter
function handleSubmit(event: SubmitEvent): void
{
    event.preventDefault();

    const taskName: string = nameInput.value.trim();
    const priority = priorityInput.value as PriorityLevels;
    // const description: string = descriptionInput.value;

    if (!validTask(taskName, priority) ) {
        return;
    }

    clearForm();
    addTask(taskName, priority);
}



// Rensar formuläret
function clearForm(): void
{
    errorMessage.textContent = "";
    nameInput.value = "";
    priorityInput.selectedIndex = 0;
}



// Kollar om en submitad ny task är godkänd
function validTask(taskName: string, priority: PriorityLevels): boolean
{
    // Kontrollerar namn
    if (taskName === "") {
        errorMessage.textContent = "Ogiltigt namn";
        return false;
    }
    else if (taskName.length < 3 || taskName.length > 40) {
        errorMessage.textContent = "Namnet måste vara mellan 3 till 40 tecken långt";
        return false;
    }

    // Kontrollerar namndubletter
    let doNameExist: boolean = false;

    tasks.forEach(task => {
        if ( task.name.toUpperCase() === taskName.toUpperCase() ) {
            doNameExist = true;
        }
    });

    if (doNameExist) {
        errorMessage.textContent = "Finns redan uppgift med detta namn";
        return false;
    }
    
    // Kontrollerar prioritet
    if (priority !== "hög" && priority !== "medel" && priority !== "låg") {
        errorMessage.textContent = "Du måste välja en prioritetsnivå";
        return false;
    }

    return true;
}


loadTasks();
renderAllTasks();