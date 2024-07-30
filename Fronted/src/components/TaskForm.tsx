"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  calenderIcon,
  crossIcon,
  editIcon,
  expendIcon,
  favouriteIcon,
  plusBlackIcon,
  priorityIcon,
  shareIconM,
  statusIcon,
} from "@/utils";
import HandyComp from "./HandyComp";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "@/Data/store/features/Task/taskSlice";
import { AppDispatch } from "@/Data/store/store";
import { TaskInterface } from "@/utils/types";

type TaskFormProps = {
  isVisible: boolean;
  onClose: () => void;
  task: TaskInterface | null;
  defaultStatus?:string | null
};

const initialState: TaskInterface = {
  title: "",
  description: "",
  priority: "Not selected",
  status: "Not selected",
  deadline: " ",
  _id: "",
  createdAt: "",
};


const TaskForm: React.FC<TaskFormProps> = ({ isVisible, onClose, task,defaultStatus }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formState, setFormState] = useState(initialState);
  useEffect(() => {
    if (task) {
      setFormState(task);
    } else {
      setFormState((prev) => ({
        ...prev,
        status: defaultStatus || "Not selected",
        priority:"Not selected"

      }));
    }
    
  }, [task,defaultStatus]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    if (task) {
      try {
        await fetch(`https://task-management-application-vj6i.onrender.com/todo/delete-todo/${task._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormState(initialState)
        onClose();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const closeEvent=()=>{
    setFormState(initialState)
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task && task._id) {
        dispatch(updateTask({...formState}));
      } else {
        dispatch(addTask({ ...formState }));
      }
      setFormState(initialState);
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "40%" }}
    >
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <button onClick={closeEvent}>
              <Image src={crossIcon} alt="cross" />
            </button>
            <button>
              <Image src={expendIcon} alt="expend" />
            </button>
          </div>
          <div className="flex gap-x-5">
            <HandyComp content="Share" icon={shareIconM} width="98px" />
            <HandyComp content="Favourite" icon={favouriteIcon} width="116px" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-12 ">
            <input
              type="text"
              placeholder="Title"
              required
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="text-5xl font-semibold text-gray-500 outline-none"
            />
            <div className="mt-8 flex flex-col gap-y-10">
              <div className="flex gap-x-36">
                <HandyComp
                  content="Status"
                  icon={statusIcon}
                  width="97px"
                  flexDirection="flex-row-reverse"
                />
                <select
                  required
                  
                  name="status"
                  value={formState.status}
                  onChange={handleChange}
                  className="font-normal text-base w-32 h-6  rounded-md  ml-12"
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Under review">Under review</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>
              <div className="flex gap-x-36">
                <HandyComp
                  content="Priority"
                  icon={priorityIcon}
                  width="136px"
                  flexDirection="flex-row-reverse"
                />
                <select
                  
                  value={formState.priority}
                  onChange={handleChange}
                  name="priority"
                  className="font-normal text-base w-32 h-6  rounded-md ml-11"
                >
                  <option value="Not selected" disabled>
                    Not selected
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="flex gap-x-36">
                <HandyComp
                  content="Date"
                  icon={calenderIcon}
                  width="136px"
                  flexDirection="flex-row-reverse"
                />
                <input
                  type="date"
                  value={formState.deadline}
                  onChange={handleChange}
                  name="deadline"
                  placeholder="Not selected"
                  className="font-normal text-base w-32 h-6  rounded-md  ml-16"
                />
              </div>
              <div className="flex gap-x-36">
                <HandyComp
                  content="Description"
                  icon={editIcon}
                  width="136px"
                  flexDirection="flex-row-reverse"
                />
                <textarea
                  value={formState.description}
                  onChange={handleChange}
                  name="description"
                  rows={3}
                  placeholder="Not selected"
                  className="font-normal text-base rounded-md text-gray-400 outline-none ml-5 "
                />
              </div>
            </div>
          </div>
          <div className='flex justify-around space-x-4 mt-12'>
           
          {task && task._id && (
              <button
                type='button'
                onClick={handleDelete}
                className='bg-red-500 text-white p-2 rounded'
              >
                Delete
              </button>
            )}
            
            <button
              type='button'
              onClick={closeEvent}
              className='bg-gray-500 text-white p-2 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white p-2 rounded'
            >
              Save
            </button>
          </div>

        </form>
        <div className="flex mt-10 gap-x-8">
          <Image src={plusBlackIcon} alt="plus" />
          <h4 className="text-base font-normal text-black">
            Add custom property
          </h4>
        </div>
        <span className="mt-8 w-full bg-[#DEDEDE] h-[1px] block"></span>
        <h3 className="text-base font-normal text-gray-500 mt-12">
          Start writing, or drag your own files here.
          <br />
          After creation or updation of task, please refresh the page
          
        </h3>
      </div>
    </div>
  );
};

export default TaskForm;
