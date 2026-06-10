export interface Task {
    id: number;
    title: string;
    team: string[];
    status: 'pending' | 'in-progress' | 'completed';
}