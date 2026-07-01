
// Importerar från andra .ts-filer
import { renderTaskList } from "./render.js";
import { tasks, nextId, setTasksArray, setNextId } from "./tasks.js";
import { STORAGE_KEYS } from "./config.js";

// Variabler
let lastSaved: string = "aldrig";

const lastSavedCounter = document.querySelector("#last-saved");
const clearBtn = document.querySelector("#clear-button") as HTMLButtonElement;
clearBtn.addEventListener("click", clearTasks);



// Sparar alla tasks och annan information i Local Storage
export function saveTasks(): void
{
    updateLastSaved();

    if (lastSavedCounter) {
        lastSavedCounter.textContent = "Senast sparad: " + lastSaved;
    }

    localStorage.setItem( STORAGE_KEYS.LASTSAVED, JSON.stringify(lastSaved) );

    localStorage.setItem( STORAGE_KEYS.NEXTID, JSON.stringify(nextId) );

    localStorage.setItem( STORAGE_KEYS.TASKS, JSON.stringify(tasks) );
}



// Läser in sparade tasks från Local Storage
export function loadTasks(): void
{
    const tasks_json = localStorage.getItem(STORAGE_KEYS.TASKS);
    const nextId_json = localStorage.getItem(STORAGE_KEYS.NEXTID);
    const lastSaved_json = localStorage.getItem(STORAGE_KEYS.LASTSAVED);

    if (tasks_json !== null) {
        setTasksArray( JSON.parse(tasks_json) );
    }
    if (nextId_json !== null) {
        setNextId( JSON.parse(nextId_json) );
        
    }
    if (lastSaved_json !== null) {
        lastSaved = JSON.parse(lastSaved_json);
    }

    if (lastSavedCounter) {
        lastSavedCounter.textContent = "Senast sparad: " + lastSaved;
    }
}



// Raderar alla tasks från Local Storage
function clearTasks(): void
{
    if (tasks.length === 0 || !confirm("Är du säker på att du vill radera alla dina uppgifter permanent?") ) {
        return;
    }

    // tasks = [];
    setTasksArray( [] );
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    updateLastSaved();
    renderTaskList();
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