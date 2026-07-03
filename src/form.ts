
// Importerar från andra .ts-filer
import type { PriorityLevels } from "./types.js";
import { addTask, tasks } from "./tasks.js";

// Variabler
const nameInput = document.querySelector("#task-name") as HTMLInputElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;


// Hanterar submits från formuläret för att lägga till nya uppgifter
export function handleSubmit(event: SubmitEvent): void
{
    event.preventDefault();

    const taskName: string = nameInput.value.trim();
    const priority = priorityInput.value as PriorityLevels;

    if (!validTask(taskName, priority) ) {
        return;
    }

    clearForm();
    addTask(taskName, priority);
}


// Kollar om en submitad ny task är godkänd
function validTask(taskName: string, priority: PriorityLevels): boolean
{
    // Kontrollerar namn
    if (taskName === "") {
        errorMessage.textContent = "Ogiltigt namn";
        return false;
    }
    else if (taskName.length < 3 || taskName.length > 32) {
        errorMessage.textContent = "Namnet måste vara mellan 3 till 32 tecken långt";
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


// Rensar formuläret
function clearForm(): void
{
    errorMessage.textContent = "";
    nameInput.value = "";
    priorityInput.selectedIndex = 0;
}