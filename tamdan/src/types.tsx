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
export type User = {
  id: string;
  name: string;
  email: string;
};

export type AppContextType = {
  user: User | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type FormDataType = {
  email: string;
  password: string;
};

export type AsideProps = {
  user: null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
