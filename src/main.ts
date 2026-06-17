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

console.log(`
///==============================\\\\\\
|||         TASK TRACKER         |||
\\\\\\==============================///
 `);


if (tasks.length > 0){

    for (let i = 0; i < tasks.length; i++) {
        console.log(`Uppgift ${i+1}: ${tasks[i]}`);
    }

    console.log(`\nAntal uppgifter: ${tasks.length}`);
}
else {
    console.log(`Alla uppgifter är avklarade!`);
}

/*
    // Andel avklarade
    const completedTasks: number = 1;
    const totalTasks: number = 3;
    const comletionRate:number = completedTasks / totalTasks * 100;

    console.log(`
    Completion rate:
    ${completedTasks}/${totalTasks}
    ${comletionRate.toFixed(2)}%`);
*/