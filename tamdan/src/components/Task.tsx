import { useDraggable } from '@dnd-kit/core';
import { TaskType } from '../types';
import { motion } from 'framer-motion';

interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  const { id, title, status } = task;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  console.log(id);
  // const truncateText = (text: string, limit: number) => {
  //   return text.length > limit ? text.substring(0, limit) + '...' : text;
  // };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: transform ? 0.5 : 1,
      }}
      className='bg-slate-50 rounded-lg'
    >
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 1 }}
    
        className=" group min-w-80  rounded-lg  cursor-pointer  "
      >
        <div
          className={`flex justify-between rounded-lg  text-slate-900   p-4  transition ease-linear duration-150 `}
        >
          <div className="flex gap-1  ">
            {status === 'done' && (
              <div className="group-hover:text-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mt-[2px] text-green-500 hover:text-green-600 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}

            <div className="group-hover:text-slate-950 font-md">
              {/* {truncateText(title, 25)} */}
              {title}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Task;
