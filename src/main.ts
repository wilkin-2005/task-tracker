// "pending" | "completed"
type Status = "pågående" | "slutförd";

// "low" | "medium" | "high"
type PriorityLevels = "låg" | "medel" | "hög";

type Task = {
    id: number;
    name: string;
    status: Status;
    priority: PriorityLevels;
    description?: string;
    notes?: string;
};

let tasks: Task[] = [];
let nextId = 0;

let lastSaved: string = "30 juni 2026 13:37";


// DOM variabler
const form = document.querySelector("#task-form") as HTMLFormElement;
form.addEventListener("submit", handleSubmit);
const nameInput = document.querySelector("#task-name") as HTMLInputElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
// const descriptionInput = document.querySelector("#description-input") as HTMLTextAreaElement;

const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;

const appElement = document.querySelector("#app");
const gridContainer = document.createElement("div");
gridContainer.classList.add("card-grid-container");

const taskCounter = document.querySelector("#task-counter");
const lastSavedCounter = document.querySelector("#last-saved");
const clearBtn = document.querySelector("#clear-button") as HTMLButtonElement;
clearBtn.addEventListener("click", clearTasks);


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



// Skapa en funktion som lägger till en ny uppgift i vår lista.
function addTask(taskName: string, taskPriority: PriorityLevels): void
{
    //, taskDescription: string = ""
    tasks.push({
        id: nextId,
        name: taskName,
        status: "pågående",
        priority: taskPriority,
        // description: taskDescription,
    });

    nextId++;
    saveTasks();
    renderAllTasks();
}



// Raderar vald uppgift
function deleteTask(taskId: number): void
{
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderAllTasks();
}



// Uppdaterar statusen på vald task. Togglar som default
function updateTaskStatus(taskId: number, toggle: boolean = true, updateTo?: Status): void
{
    tasks.forEach(task => {
        // Destructuring av task
        const {
            id,
            status,
        } = task;

        if (id === taskId && toggle) {
            // Växlar statusen för uppgiften
            task.status = (status === "pågående") ? "slutförd" : "pågående";
        }
        else if (id === taskId && updateTo !== undefined) {
            // Ändrar uppgiftens status till det bestämda värdet
            task.status = updateTo;
        }
    });

    saveTasks();
    renderAllTasks();
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



// En funktion som renderar ut alla tasks på sidan
function renderAllTasks(): void
{
    gridContainer.innerHTML = "";
    appElement?.append(gridContainer);

    tasks.forEach(task => {
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

        gridContainer.append(card);
    });

    renderTaskCounter();
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



// Sparar alla tasks och annan information i Local Storage
function saveTasks(): void
{
    updateLastSaved();

    if (lastSavedCounter) {
        lastSavedCounter.textContent = "Senast sparad: " + lastSaved;
    }

    const lastSaved_json: string = JSON.stringify(lastSaved);
    localStorage.setItem("lastSaved", lastSaved_json);

    const nextId_json: string = JSON.stringify(nextId);
    localStorage.setItem("nextId", nextId_json);

    const tasks_json: string = JSON.stringify(tasks);
    localStorage.setItem("savedTasks", tasks_json);
}



// Sparar när task-listan uppdaterades senast.
function updateLastSaved(): void
{
    lastSaved = formatCurrentDate();

    if (lastSavedCounter) {
        lastSavedCounter.textContent = "Senast sparad: " + lastSaved;
    }
}



// Returnar en string med det nuvarande datumet och klockslaget formaterat som jag vill
function formatCurrentDate(): string
{
    const d = new Date();
    const allMonths: string[] = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

    const date: string = String(d.getDate());
    const month: string = allMonths[d.getMonth()]!;
    const year: string = String(d.getFullYear());

    const hours: string = (d.getHours() < 10) ? `0${d.getHours()}`: `${d.getHours()}`;
    const minutes: string = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
    const seconds: string = (d.getSeconds() < 10) ? `0${d.getSeconds()}`: `${d.getSeconds()}`;

    return `${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}



// Läser in sparade tasks från Local Storage
function loadTasks(): void
{
    const tasks_json = localStorage.getItem("savedTasks");
    const nextId_json = localStorage.getItem("nextId")
    const lastSaved_json = localStorage.getItem("lastSaved");

    if (tasks_json === null || nextId_json === null || lastSaved_json === null) {
        return;
    }

    tasks = JSON.parse(tasks_json);
    nextId = JSON.parse(nextId_json);
    lastSaved = JSON.parse(lastSaved_json);

    if (lastSavedCounter) {
        console.log(lastSaved);
        lastSavedCounter.textContent = "Senast sparad: " + lastSaved;
    }
}



// Raderar alla tasks från Local Storage
function clearTasks(): void
{
    if (tasks.length === 0 || !confirm("Är du säker på att du vill radera alla dina uppgifter permanent?") ) {
        return;
    }

    tasks = [];
    // localStorage.setItem("savedTasks", "");
    localStorage.removeItem("savedTasks");
    renderAllTasks();
}


loadTasks();
renderAllTasks();