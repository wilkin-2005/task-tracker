// Kompilera en gång: "npx tsc"
// Automatisk kompilering: "npm run watch"


type Task = {
    name: string;
    completed: boolean;
    priority: number;
    description?: string;
};

// En array med flertalet objekt av typen Task
const tasks: Task[] = [
    {
        name: "Lära mig Typescript",
        completed: false,
        priority: 4,
        description: "Var med på föreläsningar och gör uppgifterna läraren ger dig."
    },
    {
        name: "Vattna blommorna",
        completed: true,
        priority: 3
    },
    {
        name: "Fira midsommar",
        completed: true,
        priority: 4,
        description: "Äta tårta, grilla och spela sällskapsspel med vänner."
    },
    {
        name: "Träna",
        completed: false,
        priority: 3
    },
    {
        name: "Handla",
        completed: true,
        priority: 2
    },
    {
        name: "Tvätta",
        completed: true,
        priority: 2
    },
    {
        name: "Plugga",
        completed: true,
        priority: 4
    }
];


// Skapa en funktion som lägger till en ny uppgift i vår lista.
function addTask(taskName: string, isCompleted: boolean = false, taskPriority: number = 1) {
    tasks.push({
        name: taskName,
        completed: isCompleted,
        priority: taskPriority,
    });
    console.log(`Lade till ny uppgift: "${taskName}"`);
}

// Sätt en task som klar
function completeTask(taskName: string) {
    tasks.forEach(task => {
        if (task.name == taskName && !task.completed) {
            task.completed = true;
            console.log(`Markerade uppgift som avklarad: ${task.name}`);
        }
        else if (task.name == taskName && task.completed) {
            console.log(`Uppgift redan avklarad: ${task.name}`);
        }
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
    if (tasks.length > 0){
        console.log("\t[Uppgifter]");

        for (let i = 0; i < tasks.length; i++) {
            console.log(`${i+1}) ${tasks[i]?.name}`);
        }
        /* forEach som skriver ut i punktlista istället för numrerad lista
        tasks.forEach(element => {
            console.log(`• ${element.name}`);
        });
        */
    }
    else {
        console.log("!! Inga aktiva uppgifter !!");
    }
}

// Visa en lista med avklarade tasks
function showCompletedTasks () {
    console.log("\t[Avklarade uppgifter]");
    
    tasks.forEach(task => {
        if (task.completed) {
            console.log(`• ${task.name}`);
        }
    });
}

// Visa en lista med ej avklarade tasks
function showPendingTasks() {
    console.log("\t[Ej avklarade uppgifter]");
    
    tasks.forEach(task => {
        if (! task.completed) {
            console.log(`• ${task.name}`);
        }
    });
}

// Visa statistik på antal tasks, hur många avklarade, hur många ej avklarade tasks
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

    console.log("\t[Statistik]");
    console.log(`Totalt antal uppgifter: ${tasks.length}`);
    console.log(`Antal avklarade uppgifter: ${completedTasks}`);
    console.log(`Antal ej avklarade uppgifter: ${pendingTasks}`);
    console.log(`Andel avklarade uppgifter: ${comletionRate.toFixed(1)}%`);
}

// Skriver ut alla delar av sidan. Tömmer konsolen innan om så önskas.
function writeAll(doClear: boolean = false) {
    if (doClear)
        console.clear();

    showHeader();
    showAllTasks();
    showStatistics();
    showCompletedTasks();
    showPendingTasks();
}

showHeader();
addTask("Tömma och fylla diskmaskinen", true,);
showAllTasks();
showStatistics();