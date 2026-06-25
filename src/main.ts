// Kompilera en gång: "npx tsc"
// Automatisk kompilering: "npm run watch"


// "pending" | "completed"
type Status = "pågående" | "slutförd";

// "low" | "medium" | "high"
type PriorityLevels = "låg" | "medel" | "hög";

type Task = {
    name: string;
    status: Status;
    priority: PriorityLevels;
    description?: string;
    notes?: string;
};

// En array med flertalet objekt av typen Task
const tasks: Task[] = [
    {
        name: "Lära mig Typescript",
        status: "pågående",
        priority: "hög",
        description: "Var med på föreläsningar och gör uppgifterna läraren ger dig.",
    },
    {
        name: "Vattna blommorna",
        status: "pågående",
        priority: "hög"
    },
    {
        name: "Fira midsommar",
        status: "slutförd",
        priority: "medel",
        description: "Äta tårta, grilla och spela sällskapsspel med vänner."
    },
    {
        name: "Träna",
        status: "slutförd",
        priority: "medel"
    },
    {
        name: "Handla",
        status: "slutförd",
        priority: "låg"
    },
    {
        name: "Tvätta",
        status: "slutförd",
        priority: "låg"
    },
    {
        name: "Plugga",
        status: "pågående",
        priority: "hög"
    }
];


// DOM variabler
const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
const addTaskButton = document.querySelector("#add-task-button") as HTMLButtonElement;

addTaskButton.addEventListener("click", () => {
    const taskName: string = taskInput.value.trim();
    const taskPriority = priorityInput.value as PriorityLevels;

    if (taskName === "") {
        console.log("Ogiltigt nam");
        return;
    }

    addTask(taskName, taskPriority);
    taskInput.value = "";
});

const taskCounter = document.querySelector("#task-counter");
const appElement = document.querySelector("#app");

const gridContainer = document.createElement("div");
gridContainer.classList.add("card-grid-container");


// Skapa en funktion som lägger till en ny uppgift i vår lista.
function addTask(taskName: string, taskPriority: PriorityLevels): void
{
    tasks.push({
        name: taskName,
        status: "pågående",
        priority: taskPriority,
    });
    
    renderAllTasks();
}

// Sätt en task som klar
function updateTaskStatus(taskName: string, toogle: boolean, updateTo?: Status): void
{
    tasks.forEach(task => {
        if (task.name === taskName && toogle)
        {
            // Växlar statusen för uppgiften
            task.status = (task.status === "pågående") ? "slutförd" : "pågående";
        }
        else if (task.name === taskName && updateTo !== undefined)
        {
            // Ändrar uppgiftens status till det bestämda värdet
            task.status = updateTo;
        }
    });

    renderAllTasks();
}

// En funktion som renderar ut alla tasks på sidan
function renderAllTasks(): void
{
    gridContainer.innerHTML = "";
    appElement?.append(gridContainer);

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("task-card");

        // Ge olika styling beroende på status
        (task.status === "pågående") ? card.classList.add("pending") : card.classList.add("completed");

        // Ge olika styling beroende på prioritet
        switch (task.priority) {
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

        const taskName = document.createElement("h3");
        taskName.textContent = task.name;

        const taskStatus = document.createElement("p");
        taskStatus.textContent = `Status: ${task.status}`;

        const taskPriority = document.createElement("p");
        taskPriority.textContent = `Prioritet: ${task.priority}`;

        const completeBtn = document.createElement("button");

        (task.status === "pågående") ? completeBtn.textContent = "Markera som slutförd" : completeBtn.textContent = "Markera som ej slutförd";
        
        completeBtn.addEventListener("click", () => {
            updateTaskStatus(task.name, true);
            renderAllTasks();
        });

        card.append(
            taskName,
            taskStatus,
            taskPriority,
            completeBtn
        );
        gridContainer.append(card);
    });
}

// Visar en task efter sitt namn
function renderTask(taskName: string, clearApp: boolean = false): void
{
    tasks.forEach(task => {
        if (task.name === taskName)
        {
            if (appElement && clearApp) {
                appElement.innerHTML = "";
            }

            const card = document.createElement("div");
            card.classList.add("task-card");

            // Ge olika styling beroende på status
            (task.status === "pågående") ? card.classList.add("pending") : card.classList.add("completed");

            // Ge olika styling beroende på prioritet
            switch (task.priority) {
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

            const taskName = document.createElement("h3");
            taskName.textContent = task.name;

            const taskStatus = document.createElement("p");
            taskStatus.textContent = `Status: ${task.status}`;

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Prioritet: ${task.priority}`;

            card.append(
                taskName,
                taskStatus,
                taskPriority
            );

            // Lägger till tasken i gridcontainern om en sådan finns. Annars läggs den direkt i appen.
            (gridContainer) ? gridContainer.append(card) : appElement?.append(card);
        }
    });
}

// Visa antal tasks högst upp
function renderTaskCounter ()
{
    if (taskCounter) {
        taskCounter.textContent = `Totalt antal uppgifter: ${tasks.length}`;
    }
}

renderTaskCounter();
renderAllTasks();
// renderTask("Handla");















///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

// Visar upp alla tasks som är antingen "pågående" eller "slutförd"
function showTaskByStatus(status: Status): void
{
    let output: string = "";

    tasks.forEach(task => {
        if (task.status === status) {
            output += `• ${task.name}\n`;
        }
    });

    if (status === "pågående") {
        console.log(`\t====================
     PÅGÅENDE UPPGIFTER
    ====================`);
    }
    else {
        console.log(`\t=====================
     SLUTFÖRDA UPPGIFTER
    =====================`);
    }

    console.log(output);
}

// Visa tasks med viss prioritet
function showTaskOfPriority(priorityLvl: PriorityLevels): void
{
    let output: string = "";

    tasks.forEach(task => {
        if (task.priority === priorityLvl) {
            output += `• ${task.name}\n`;
        }
    });

    if (priorityLvl === "hög") {
        console.log(`\t===============
     HÖG PRIORITET
    ===============`);
    }
    else if (priorityLvl === "medel") {
        console.log(`\t====================
     MEDELHÖG PRIORITET
    ====================`);
    }
    else {
        console.log(`\t===============
     LÅG PRIORITET
    ===============`);
    }

    console.log(output);
}

// visa tasks sorterat efter priority
function showPrioritySortedTasks(highToLow: boolean = true): void
{
    const highPriorityTasks: string[] = [];
    const mediumPriorityTasks: string[] = [];
    const lowPriorityTasks: string[] = [];

    tasks.forEach(task => {
        switch (task.priority) {
            case "hög":
                highPriorityTasks.push(task.name);
            break;

            case "medel":
                mediumPriorityTasks.push(task.name);
            break;

            case "låg":
                lowPriorityTasks.push(task.name);
            break;
        }
    });

    console.log(`\t===================
     PRIORITETSORDNING
    ===================`);

    console.log(highPriorityTasks);
    console.log(mediumPriorityTasks);
    console.log(lowPriorityTasks);

    if (highToLow)
    {
        console.log(``);
    }
}

// Visa statistik på antal tasks, hur många avklarade, hur många ej avklarade tasks
function showStatistics(): void
{
    let completedTasks: number = 0;
    let pendingTasks: number = 0;
    let output: string = "";

    tasks.forEach(task => {
        (task.status === "slutförd") ? completedTasks++ : pendingTasks++;
    });

    const comletionRate: number = completedTasks / tasks.length * 100;
    output += `Totalt antal uppgifter: ${tasks.length}\n`
           + `Slutförda uppgifter: ${completedTasks}\n`
           + `Pågående uppgifter: ${pendingTasks}\n`
           + `Andel avklarade: ${comletionRate.toFixed(1)}%`;
    
    console.log(`\t===========
     STATISTIK
    ===========`);
    console.log(output);
}