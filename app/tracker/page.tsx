'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
// import Header from "../components/Header";
import TaskDisplay from "../components/TaskDisplay";
import { Task } from "@/types";
import { closestCorners, DndContext, DragEndEvent, UniqueIdentifier} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const taskDisplayLabelClass = 'font-bold text-2xl underline mb-1'

const TrackerPage = () => {
    const [task, setTask] = useState<string>("")
    const [message, setMessage] = useState<string>('');

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Set up development environment',
            team: ['Alice', 'Bob'],
            status: 'completed',
        },
        {
            id: 2,
            title: 'Design database schema',
            team: ['Charlie'],
            status: 'in-progress',
        },
        {
            id: 3,
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ad dolorem exercitationem voluptates molestiae, magnam, nisi excepturi aspernatur fugit dignissimos, reprehenderit tenetur? Molestiae ullam ea sint incidunt earum amet omnis!',
            team: ['Alice', 'David'],
            status: 'in-progress',
        },
        {
            id: 4,
            title: 'Write API documentation',
            team: [],
            status: 'pending',
        },
        {
            id: 5,
            title: 'Review pull requests',
            team: [],
            status: 'pending',
        },
        {
            id: 6,
            title: 'Deploy to staging server',
            team: ['Bob'],
            status: 'completed',
        },
    ])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (task.trim() === '') {
            setMessage('Please enter a task!');
        } else {
            setMessage(`Your task has been added.`);
            setTask('');
        }
    };

    const getTaskPos = (id: UniqueIdentifier) => tasks.findIndex(task => task.id === id)

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event

        if (!over) {return}

        if (active.id === over.id) return;

        setTasks(tasks => {
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)

            return arrayMove( tasks, originalPos, newPos)
        })
    }

    return (
        <div className="w-full h-full p-20 flex flex-col bg-rose-950">
            <h1 className="text-3xl font-bold mb-5">Task Tracker</h1>
            <form onSubmit={handleSubmit}>
                <div className="text-xl bg-rose-800 py-3 px-5 mb-3 w-1/2 rounded-2xl">
                    <input
                        type="text"
                        value={task}
                        onChange={handleInputChange}
                        placeholder="Enter a task"
                        className="focus:outline-none w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="p-3 px-5 bg-rose-500 rounded-4xl cursor-pointer hover:scale-110 transtion duration-300 ease-in-out font-semibold mb-5">
                    Add Task
                </button>
            </form>
            {message && (
                <p className="mb-5 text-center text-lg font-medium text-lime-300">
                    {message}
                </p>
            )}

            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="flex flex-wrap justify-between">
                    <div>
                        <h1 className={taskDisplayLabelClass}>Pending</h1>
                        <TaskDisplay tasks={tasks.filter(task => task.status === "pending")}></TaskDisplay>
                    </div>
                    <div>
                        <h1 className={taskDisplayLabelClass}>In-Progress</h1>
                        <TaskDisplay tasks={tasks.filter(task => task.status === "in-progress")}></TaskDisplay>
                    </div>
                    <div>
                        <h1 className={taskDisplayLabelClass}>Completed</h1>
                        <TaskDisplay tasks={tasks.filter(task => task.status === "completed")}></TaskDisplay>
                    </div>
                </div>
            </DndContext>
        </div>
    );
};

export default TrackerPage;
