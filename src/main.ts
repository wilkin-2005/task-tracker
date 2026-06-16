
// Kompilera en gång: "npx tsc"
// Automatisk kompilering: "npm run watch"

// TASKS
const taskName1: string = "Lära mig Typescript";
const priority1: number = 5;
const isCompleted1: boolean = false;

const taskName2: string = "Vattna blommorna";
const priority2: number = 2;
const isCompleted2: boolean = true;

const taskName3: string = "Fira midsommar";
const priority3: number = 3;
const isCompleted3: boolean = false;

// Andel avklarade
const completedTasks: number = 1;
const totalTasks: number = 3;
const comletionRate:number = completedTasks / totalTasks * 100;

console.log(`
///==============================\\\\\\
|||         TASK TRACKER         |||
\\\\\\==============================///
 `);

console.log(`
TASK 1
Task: ${taskName1}
Priority: ${priority1}
Completed: ${isCompleted1}
 `);

console.log(`
TASK 2
Task: ${taskName2}
Priority: ${priority2}
Completed: ${isCompleted2}
 `);

console.log(`
TASK 3
Task: ${taskName3}
Priority: ${priority3}
Completed: ${isCompleted3}
 `);

console.log(`
Completion rate:
${completedTasks}/${totalTasks}
${comletionRate.toFixed(2)}%`);