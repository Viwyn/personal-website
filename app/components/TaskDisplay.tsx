import React from "react";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const headers = [
    { key: "task", value: "Task" },
    { key: "team", value: "Team" },
    { key: "status", value: "Status" },
];

const TaskDisplay = ({ tasks }: { tasks: Task[] }) => {
    return (
        <table className="border-rose-700 border-5 mb-5 max-w-[1000px] min-w-[700px]">
            <thead>
                <tr className="divide-x-4 divide-rose-700 border-b-rose-700 border-b-4 bg-rose-900">
                    {headers.map((header) => (
                        <th key={header.key} className={`py-2 ${header.key === "task" ? "w-full" : ""} ${header.key === "team" ? "min-w-60" : ""} ${header.key === "status" ? "min-w-40" : ""}`}>
                            {header.value}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    {tasks.map((row: Task) => (
                        <TaskCard id={row.id} title={row.title} team={row.team} status={row.status} key={row.id}></TaskCard>
                    ))}
                </SortableContext>
            </tbody>
        </table>
    );
};

export default TaskDisplay;
