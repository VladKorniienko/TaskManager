import { Task } from './task.model';
import { User } from './user.model';

export interface UserTask{
    userId: string;
    taskId: string;
    task: Task;
    user: User;
}