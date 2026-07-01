
// "pending" | "completed"
export type Status = "pågående" | "slutförd";

// "low" | "medium" | "high"
export type PriorityLevels = "låg" | "medel" | "hög";

export type Task = {
    id: number;
    name: string;
    status: Status;
    priority: PriorityLevels;
    description?: string;
};