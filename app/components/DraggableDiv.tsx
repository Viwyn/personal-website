'use client'

import React, { useState, useRef, useEffect, ReactNode } from "react";

interface DraggableFloatingDivProps {
    children?: ReactNode;
    initialX?: number;
    initialY?: number;
    isVisible?: boolean;
    icon?: ReactNode;
    title?: string;
}

const DraggableFloatingDiv: React.FC<DraggableFloatingDivProps> = ({ children, initialX = 50, initialY = 50, isVisible, icon, title}) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY })
    const [isDragging, setIsDragging] = useState(false)
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
    const [isHidden, setIsHidden] = useState(isVisible)

    const divRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isHidden) return //do nothing if not visible

        e.preventDefault()
        setIsDragging(true)

        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect()
            setInitialMousePosition({
                x: e.clientX - rect.left, //displacement of mouse x value from left of div
                y: e.clientY - rect.top, //same but with y value from top of div
            })
        }
    }

    const toggleInvisibility = () => {
        setIsHidden(isHidden => !isHidden)
    }

    useEffect(() => {
        let animationFrameId: number

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return

            // Cancel any pending animation frame
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }

            animationFrameId = requestAnimationFrame(() => {
                setPosition({
                    x: e.clientX - initialMousePosition.x,
                    y: e.clientY - initialMousePosition.y,
                })
            })
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [isDragging, initialMousePosition])

    return (
        <div>
            <button onClick={toggleInvisibility} className="bg-pink-200 dark:bg-sky-400 text-slate-600 dark:text-slate-800 p-4 rounded-full shadow-xl transition-transform duration-150 hover:scale-110 cursor-pointer hover:bg-pink-300 dark:hover:bg-sky-300">
                {icon}
                </button>
            <div ref={divRef} className={`${isDragging ? 'cursor-grabbing' : 'cursor-default'} max-w-3xl max-h-[600px] overflow-hidden  fixed z-99 bg-white dark:bg-slate-800 border-2 border-pink-300 dark:border-slate-400 text-slate-700 dark:text-sky-200 rounded-lg shadow-xl select-none ${isDragging ? '' : 'transition-all duration-150'} flex flex-col ${!isHidden ? 'opacity-0 scale-0 pointer-events-none z-0' : 'opacity-100 scale-100 pointer-events-auto z-10'} max-w-1/2 custom-scrollbar font-comfortaa`} style={{ left: position.x, top: position.y }} onMouseDown={handleMouseDown}>
                <div className="flex justify-between items-center bg-pink-100 dark:bg-slate-700 rounded-t-lg p-3">
                    <p className="ml-3 text-slate-600 dark:text-sky-200 font-comfortaa font-medium text-xl">{title}</p>
                    <button onClick={toggleInvisibility} className="py-1 px-3 cursor-pointer text-pink-500 dark:text-sky-300 text-xl hover:scale-110 transition-transform duration-150 hover:text-pink-600 dark:hover:text-sky-200">
                        X
                    </button>
                </div>
                <div className="overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default DraggableFloatingDiv;

