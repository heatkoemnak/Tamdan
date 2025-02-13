import { TaskType, ColumnType } from '../types';

export const COLUMNS: ColumnType[] = [
  {
    id: 1,
    title: 'To Do',
    column: 'todo',
    icon: 'todo',
  },
  {
    id: 2,
    title: 'In Progress',
    column: 'in-progress',
    icon: 'in-progress',
  },
  {
    id: 3,
    title: 'Done',
    column: 'done',
    icon: 'done',
  },
];

export const TaskList: TaskType[] = [
  {
    id: 1,
    title: 'Design homepage',
    status: 'done',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'Fix login bug',

    status: 'in-progress',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'Design boarding page',

    status: 'done',
    time: '3 hours ago',
  },
  {
    id: 4,
    title: 'Refactor database schema',

    status: 'in-progress',
    time: '4 hours ago',
  },
  {
    id: 5,
    title: 'Optimize image loading',

    status: 'todo',
    time: '5 hours ago',
  },
  {
    id: 6,
    title: 'Deploy project to production',

    status: 'todo',
    time: '6 hours ago',
  },
  {
    id: 7,
    title: 'Code review for PR #34',
    status: 'done',
    time: '7 hours ago',
  },
  {
    id: 8,
    title: 'Implement dark mode',
    status: 'in-progress',
    time: '8 hours ago',
  },
  {
    id: 9,
    title: 'Build RESTful API',
    status: 'todo',
    time: '9 hours ago',
  },
  {
    id: 10,
    title: 'Implement backend for authentication',
    status: 'todo',
    time: '10 hours ago',
  },
];
