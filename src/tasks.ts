
// Importerar från andra .ts-filer
import type { Task, PriorityLevels, Status } from "./types";
import { renderAllTasks } from "./render";
import { saveTasks } from "./storage";


// Variabler
export let nextId = 0;
export let tasks: Task[] = [];

export function setTasksArray(newArray: Task[]): void
{
    // Används för att skriva över tasks från en annan fil där den har importerats
    tasks = newArray;
}



// Skapa en funktion som lägger till en ny uppgift i vår lista.
export function addTask(taskName: string, taskPriority: PriorityLevels): void
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
export function deleteTask(taskId: number): void
{
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderAllTasks();
}



// Uppdaterar statusen på vald task. Togglar som default
export function updateTaskStatus(taskId: number, toggle: boolean = true, updateTo?: Status): void
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