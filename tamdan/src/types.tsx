export type TaskType = {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  time: string;
};

export type ColumnType = {
  id: number;
  title: string;
  column: string;
  icon: string;
};
export type TimeType = {
  timestamp: string;
};
