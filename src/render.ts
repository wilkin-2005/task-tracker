
// Importerar från andra .ts-filer
import type { Task } from "./types.js";
import { tasks, deleteTask, updateTaskStatus } from "./tasks.js";


// Variabler
const appElement = document.querySelector("#app");

const gridContainer = document.createElement("div");
gridContainer.classList.add("card-grid-container");

const taskCounter = document.querySelector("#task-counter");



// En funktion som renderar ut alla tasks på sidan
export function renderTaskList(): void
{
    gridContainer.innerHTML = "";
    appElement?.append(gridContainer);

    tasks.forEach(task => {
        const card = renderTaskCard(task);
        gridContainer.append(card);
    });

    renderTaskCounter();
}



// Skapar ett task-kort i ett div-element som sedan returneras.
function renderTaskCard(task: Task): HTMLDivElement
{
    // Destructuring av task
    const {
        id,
        name,
        status,
        priority
    } = task;

    const card = document.createElement("div");
    card.classList.add("task-card");
    card.ariaLabel = "Uppgiftskort";

    taskCardStyling(task, card);

    const taskName = document.createElement("h3");
    taskName.textContent = name;

    const taskStatus = document.createElement("p");
    taskStatus.textContent = `Status: ${status}`;

    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Prioritet: ${priority}`;

    // Knappar för statusändring och radering
    const completeBtn = document.createElement("button");
    (status === "pågående") ? completeBtn.textContent = "Markera som slutförd" : completeBtn.textContent = "Markera som ej slutförd";
    
    completeBtn.addEventListener("click", () => {
        updateTaskStatus(id, true);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Radera uppgift";
    deleteBtn
    .addEventListener("click", () => {
        deleteTask(id);
    });

    // Placerar elementen i kortet
    card.append(
        taskName,
        taskStatus,
        taskPriority,
        completeBtn,
        deleteBtn
    );

    return card;
}



// Ger task-korten olika styling beroende på deras status och prioritet
function taskCardStyling(task: Task, card: HTMLDivElement): void
{
    // Destructuring av task
    const {
        status,
        priority
    } = task;

    (status === "pågående") ? card.classList.add("pending") : card.classList.add("completed");

    switch (priority) {
        case "hög":
            card.classList.add("prio-high");
        break;

        case "medel":
            card.classList.add("prio-medium");
        break;

        case "låg":
            card.classList.add("prio-low");
        break;
    }
}



// Visa antal tasks högst upp
function renderTaskCounter(): void
{
    if (!taskCounter) {
        return;
    }

    if (tasks.length === 0) {
        taskCounter.textContent = "Ännu inga uppgifter."
    }
    else {
        taskCounter.textContent = `Totalt antal uppgifter: ${tasks.length}`;
    }
}