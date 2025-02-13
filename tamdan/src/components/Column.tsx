import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import React, { useEffect } from 'react';
import Task from './Task';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskType } from '../types';
import { SortableContext } from '@dnd-kit/sortable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { timeAgo } from '../time';

dayjs.extend(relativeTime);
const Droppable = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    color: isOver ? 'green' : 'undefined',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

const Column = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string>('');
  const taskId = Math.floor(Math.random() * 1000000);
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const storedItems = localStorage.getItem('taskList');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [openID, setOpenID] = useState<string | null>(null);
  const currentDateTime: string = new Date().toISOString();
  console.log(dayjs(currentDateTime).fromNow()); // Example: "2025-02-10T12:30:00Z"
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }, [tasks]);
  const fadeInHeader = {
    hidden: { opacity: 0, scale: 0, y: 5 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id as string; // Droppable ID

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === activeId
          ? { ...task, status: overId as TaskType['status'] }
          : task
      )
    );
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id as string;

    // Update status if dropped in a new category
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === activeId
          ? { ...task, status: overId as TaskType['status'] }
          : task
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title can't be empty!");
      return;
    }

    if (editTaskId !== null) {
      // Update existing task

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId
            ? { ...task, title, time: currentDateTime }
            : task
        )
      );
    } else {
      // Add new task
      const newTask: TaskType = {
        id: taskId,
        title: title,
        status: openID as TaskType['status'],
        time: currentDateTime,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTitle('');
    setEditTaskId(null);
    setVisible(false);
  };
  let editedTask;
  const handleEdit = (id: number) => {
    console.log('Id:', id);
    editedTask = tasks.find((task) => task.id === id);
    console.log('edittaskId:', editTaskId);
    if (editedTask) {
      setEditTaskId(id);
      setTitle(editedTask.title);
    }
  };
  const handleDelete = (id: number) => {
    return setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const openForm = (id: string, editId: number | null) => {
    setOpenID(id);
    if (editId === null) {
      setVisible(true);
    }
    handleEdit(editId as number);
    setVisible(true);
  };

  return (
    <div className="rounded-xl lg:mx-0">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={tasks}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1 },
            }}
            className="flex gap-4 "
          >
            {[
              { id: 'todo', colTitle: 'To Do', status: 'todo', icon: '✅' },
              {
                id: 'in-progress',
                colTitle: 'In Progress',
                status: 'in-progress',
                icon: '🚧',
              },
              { id: 'done', colTitle: 'Done', status: 'done', icon: '🎯' },
            ].map(({ id, status, colTitle, icon }, index) => (
              <Droppable key={index} id={status}>
                <motion.div
                  variants={fadeInHeader}
                  className="flex gap-1 border border-slate-700 rounded-lg p-2 min-w-80"
                >
                  {icon}
                  <h1 className="text-slate-100 font-bold">{colTitle}</h1>
                </motion.div>
                <AnimatePresence>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 1 },
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        className=" bg-slate-200 group-hover:shadow rounded-md group mt-1 border border-slate-700 "
                      >
                        <Task key={task.id} task={task} />

                        <div className=" relative flex group-hover:rounded-lg gap-1 px-2 items-center justify-between pt-1 pb-1 ">
                          <div className="flex items-center gap-1 mx-2">
                            <svg
                              className="w-4 h-4 text-slate-500 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <p className="text-xs text-slate-500 text-center">
                              {timeAgo({ timestamp: task.time })}
                            </p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              aria-label="btn"
                              type="button"
                              onClick={() => openForm(id, task.id)}
                              className="flex items-center bg-violet-400/20 group-hover:bg-violet-700/30 gap-1  rounded p-1"
                            >
                              <svg
                                className="w-3 h-3 text-gray-800 group-hover:text-blue-900 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                />
                              </svg>
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              aria-label="btn-delete"
                              onClick={() => handleDelete(task.id)}
                              className="flex items-center bg-red-500/20 group-hover:bg-red-700 gap-1  p-1 rounded"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-[13px] h-[13px] group-hover:text-white text-slate-500 hover:text-slate-700 hover:cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                  {visible && id === openID ? (
                    <motion.form
                      key="box"
                      initial={{ opacity: 0, y: 0, scale: 0 }}
                      animate={{ opacity: 1, y: 1, scale: 1 }}
                      exit={{ opacity: 0, y: 0, scale: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-2  rounded-md group  cursor-pointer"
                    >
                      {/* Task Title Input */}
                      <textarea
                        id="title"
                        value={title}
                        className="shadow bg-violet-400/20 border border-violet-400 rounded-lg w-full p-3 mt-1 text-neutral-50 placeholder-violet-300"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                      />

                      {/* Submit Button */}
                      <div className="w-full flex items-center justify-end gap-2">
                        <Button
                          size="xs"
                          color="dark"
                          type="button"
                          onClick={() => {
                            setVisible(false);
                            setEditTaskId(null);
                          }}
                        >
                          Close
                        </Button>
                        {editTaskId ? (
                          <Button size="xs" color="light" type="submit">
                            Update
                          </Button>
                        ) : (
                          <Button size="xs" color="light" type="submit">
                            Add
                          </Button>
                        )}
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 1 }}
                      exit={{ opacity: 0, y: 0 }}
                      key="box"
                      onClick={() => openForm(id, null)}
                      className="rounded-md group mx-2 relative cursor-pointer mt-1 "
                    >
                      <button
                        className="flex items-center gap-2 py-1 text-sm group-hover:text-violet-400 font-semibold text-violet-400 "
                        aria-label="Add Task"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>

                        <span className="text-violet-400">Add task</span>
                      </button>
                    </motion.div>
                  )}
                  <div className="m-4">
                    <p className="text-xs text-slate-500 text-center">
                      Last updated 12 minutes ago
                    </p>
                  </div>
                </AnimatePresence>
              </Droppable>
            ))}
          </motion.div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Column;
