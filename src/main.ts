// Kompilera en gång: "npx tsc"
// Automatisk kompilering: "npm run watch"



// "pending" | "completed"
type Status = "Pågående" | "Slutförd";

// "low" | "medium" | "high"
type PriorityLevels = "Låg" | "Medel" | "Hög";

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
        status: "Pågående",
        priority: "Hög",
        description: "Var med på föreläsningar och gör uppgifterna läraren ger dig."
    },
    {
        name: "Vattna blommorna",
        status: "Pågående",
        priority: "Hög"
    },
    {
        name: "Fira midsommar",
        status: "Slutförd",
        priority: "Medel",
        description: "Äta tårta, grilla och spela sällskapsspel med vänner."
    },
    {
        name: "Träna",
        status: "Slutförd",
        priority: "Medel"
    },
    {
        name: "Handla",
        status: "Slutförd",
        priority: "Låg"
    },
    {
        name: "Tvätta",
        status: "Slutförd",
        priority: "Låg"
    },
    {
        name: "Plugga",
        status: "Pågående",
        priority: "Hög"
    }
];


// Skapa en funktion som lägger till en ny uppgift i vår lista.
function addTask(taskName: string, taskPriority: PriorityLevels) {
    tasks.push({
        name: taskName,
        status: "Pågående",
        priority: taskPriority,
    });
    console.log(`Lade till ny uppgift: "${taskName}"`);
}

// Sätt en task som klar
function completeTask(taskName: string, updateTo: Status = "Slutförd", toggle?: boolean) {
    tasks.forEach(task => {
        if (task.name === taskName && toggle) {
            // kod för att toggla status här
            task.status = (task.status === "Pågående") ? "Slutförd" : "Pågående";
            console.log(`Växlade statusen för uppgiften ${task.name}`)
        }
        else if (task.name === taskName) {
            task.status = updateTo;
            console.log(`Ändrade statusen till ${updateTo} för uppgiften ${task.name}`);
        }
        
        /*/
        if (task.name == taskName && task.status) {
            task.completed = true;
            console.log(`Markerade uppgift som avklarad: ${task.name}`);
        }
        else if (task.name == taskName && task.completed) {
            console.log(`Uppgift redan avklarad: ${task.name}`);
        }
        //*/
    });
}



// Skapa en funktion som skriver ut vår "header" i konsolen.
function showHeader() {
    console.log(`
    ///==============================\\\\\\
    |||         TASK TRACKER         |||
    \\\\\\==============================///
    `);
}

// Skapa en funktion som skriver ut alla våra tasks i en lista i konsolen.
function showAllTasks() {
    if (tasks.length > 0)
    {
        console.log(`\t===========
     UPPGIFTER
    ===========`);

        for (let i = 0; i < tasks.length; i++) {
            let output: string = "";

            output += `${i+1}) ${tasks[i]?.name}\n`;
            output += `   Status: ${tasks[i]?.status}\n`;
            output += `   Prioritet: ${tasks[i]?.priority}`;

            console.log(output);
        }
    }
    else {
        console.log("!! Inga aktiva uppgifter !!");
    }
}

// Visar upp alla tasks som är antingen "Pågående" eller "Slutförd"
function showTaskByStatus(status: Status)
{
    let output: string = "";

    tasks.forEach(task => {
        if (task.status === status) {
            output += `• ${task.name}\n`;
        }
    });

    if (status === "Pågående") {
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
function showTaskByPriority(priorityLvl: PriorityLevels)
{
    let output: string = "";

    tasks.forEach(task => {
        if (task.priority === priorityLvl) {
            output += `• ${task.name}\n`;
        }
    });

    if (priorityLvl === "Hög") {
        console.log(`\t===============
     HÖG PRIORITET
    ===============`);
    }
    else if (priorityLvl === "Medel") {
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

// Visa statistik på antal tasks, hur många avklarade, hur många ej avklarade tasks
/*/
function showStatistics() {
    let completedTasks: number = 0;
    let pendingTasks: number = 0;

    tasks.forEach(task => {
        if (task.completed == true) {
            completedTasks++;
        }
        if (task.completed == false) {
            pendingTasks++;
        }
    });

    const comletionRate: number = completedTasks / tasks.length * 100;
    console.log(`\t===========
     STATISTIK
    ===========`);
    console.log(`Totalt antal uppgifter: ${tasks.length}
Antal avklarade uppgifter: ${completedTasks}
Antal ej avklarade uppgifter: ${pendingTasks}
Andel avklarade uppgifter: ${comletionRate.toFixed(1)}%`);
}
//*/

showHeader();

showTaskByStatus("Pågående");
showTaskByStatus("Slutförd");

completeTask("Plugga");
completeTask("Tvätta");