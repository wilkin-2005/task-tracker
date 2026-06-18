// Kompilera en gång: "npx tsc"
// Automatisk kompilering: "npm run watch"

const tasks: string[] = [
    "Lära mig Typescript",
    "Vattna blommorna",
    "Fira midsommar",
    "Träna",
    "Handla",
    "Tvätta",
    "Plugga"
];

// Skapa en funktion som skriver ut vår "header" i konsolen.
function writeHeader() {
    console.log(`
    ///==============================\\\\\\
    |||         TASK TRACKER         |||
    \\\\\\==============================///
    `);
}

// Skapa en funktion som skriver ut alla våra tasks i en lista i konsolen.
function writeTaskList() {
    if (tasks.length > 0){
        for (let i = 0; i < tasks.length; i++) {
            console.log(`Uppgift ${i+1}: ${tasks[i]}`);
        }
    }
    else {
        console.log("!! Inga aktiva uppgifter !!");
    }
}

// Skapa en funktion som skriver ut statistiken för hur många tasks vi har i vår lista:
function writeStatistics() {
    console.log(`\n Antal uppgifter: ${tasks.length}
====================`);
}

function writeAll() {
    writeHeader();
    writeTaskList();
    writeStatistics();
}

// Skapa en funktion som lägger till en ny uppgift i vår lista.
function addTask(newTask: string) {
    tasks.push(newTask);
}


// Kör funktionerna i följande ordning i programmet för att se att det stämmer:
writeAll();

addTask("Tömma och fylla diskmaskinen");

writeTaskList();
writeStatistics();