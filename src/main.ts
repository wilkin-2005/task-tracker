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
const appElement = document.querySelector("#app");




// Skapa en funktion som lägger till en ny uppgift i vår lista.
function addTask(taskName: string, taskPriority: PriorityLevels): void
{
    tasks.push({
        name: taskName,
        status: "pågående",
        priority: taskPriority,
    });
    console.log(`Lade till ny uppgift: "${taskName}"`);
}

// Sätt en task som klar
function completeTask(taskName: string, updateTo: "pågående" | "slutförd" | "toggle"): void
{
    tasks.forEach(task => {
        if (task.name === taskName && updateTo === "toggle")
        {
            task.status = (task.status === "pågående") ? "slutförd" : "pågående";
            console.log(`Växlade statusen för uppgiften: ${task.name}`)
        }
        else if (task.name === taskName && (updateTo === "pågående" || updateTo === "slutförd") )
        {
            task.status = updateTo;
            console.log(`Ändrade statusen till "${updateTo}" för uppgiften: ${task.name}`);
        }
    });
}

// En funktion som renderar ut alla tasks på sidan
function renderAllTasks(): void
{
    if (appElement) {
        appElement.innerHTML = "";
    }

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("task-card");

        const taskName = document.createElement("h3");
        taskName.textContent = task.name;

        const taskStatus = document.createElement("p");
        taskStatus.textContent = `Status: ${task.status}`;

        const taskPriority = document.createElement("p");
        taskPriority.textContent = `Prioritet: ${task.priority}`;

        card.append(taskName);
        card.append(taskStatus);
        card.append(taskPriority);

        appElement?.append(card);
    });
}

// Visar en task efter sitt namn
function renderTask(taskName: string)
{
    tasks.forEach(task => {
        if (task.name === taskName)
        {
            if (appElement) {
                appElement.innerHTML = "";
            }

            const card = document.createElement("div");
            card.classList.add("task-card");

            const taskName = document.createElement("h3");
            taskName.textContent = task.name;

            const taskStatus = document.createElement("p");
            taskStatus.textContent = `Status: ${task.status}`;

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Prioritet: ${task.priority}`;

            card.append(taskName);
            card.append(taskStatus);
            card.append(taskPriority);

            appElement?.append(card);
        }
    });
}

renderAllTasks();
// renderTask("Handla");















////////////////////////////////////////////////////////////////////////////


// Skapa en funktion som skriver ut vår "header" i konsolen.
function showHeader(): void
{
    console.log(`
    ///==============================\\\\\\
    |||         TASK TRACKER         |||
    \\\\\\==============================///
    `);
}

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

// showHeader();
// showAllTasks();