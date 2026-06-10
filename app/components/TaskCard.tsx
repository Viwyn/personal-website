import { Task } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const rowClass = 'py-2 px-1 text-left border-2 border-rose-400';

const TaskCard = ({ id, title, team, status }: Task) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    return (
        <tr key={id} ref={setNodeRef} {...attributes} {...listeners} style={style} className='task'>
            <td className={rowClass}>
                {title}
            </td>
            <td className={rowClass}>
                {team.length > 0 ? team.join(', ') : 'N/A'}
            </td>
            <td className={rowClass}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </td>
        </tr>
    );
};

export default TaskCard ;