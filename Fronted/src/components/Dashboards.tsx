"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  addIcons,
  auomationIcon,
  calenderIcon,
  filterIcon,
  menuIcon,
  plusIcon,
  questionIcon,
  searchIcon,
  shareIconM,
} from "@/utils";
import { aboutContent } from "@/Data";
import About from "./About";
import HandyComp from "./HandyComp";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Data/store/store";
import {
  hideForm,
  showForm,
} from "@/Data/store/features/Task-Form/taskFormSLice";
import { getGreeting } from "@/utils/greeting";
import axios from "axios";
import { TaskInterface } from "@/utils/types";
import { updateTask } from "@/Data/store/features/Task/taskSlice";

type Columns = {
  "To do": TaskInterface[];
  "In progress": TaskInterface[];
  "Under review": TaskInterface[];
  Finished: TaskInterface[];
};

/* const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implement User Authentication",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Urgent",
    dueDate: "2024-08-15",
    status: "To do",
    createdAt: "1 hr ago",
  },
  {
    id: "2",
    title: "Design Home Page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Medium",
    dueDate: "2024-08-15",
    status: "In progress",
    createdAt: "1 hr ago",
  },
  {
    id: "3",
    title: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    priority: "Low",
    dueDate: "2024-08-05",
    status: "In progress",
    createdAt: "3 hr ago",
  },
  {
    id: "4",
    title: "Integrate Cloud Storage",
    description: "Enable cloud storage for note backup and synchronization.",
    priority: "Urgent",
    dueDate: "2024-08-20",
    status: "Under review",
    createdAt: "2 days ago",
  },
  {
    id: "5",
    title: "Test Cross-browser Compatibility",
    description:
      "Ensure the app works seamlessly across different web browsers.",
    priority: "Medium",
    dueDate: "2024-07-30",
    status: "Finished",
    createdAt: "4 days ago",
  },
]; */

const Dashboards: React.FC = () => {
  const dispatchServer = useDispatch<AppDispatch>();
  const isFormVisible = useSelector(
    (state: RootState) => state.taskForm.isVisible
  );
  const [greeting, setGreeting] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);
  const [newTaskColumn, setNewTaskColumn] = useState<string | null>(null);
  const [columns, setColumns] = useState<Columns>({
    "To do": [],
    "In progress": [],
    "Under review": [],
    Finished: [],
  });

  useEffect(() => {
    const greetingMessage = getGreeting();
    setGreeting(greetingMessage);
  }, []);
  useEffect(() => {
    const name = localStorage.getItem("name")?.split(" ")[0];
    if (name) {
      setFirstName(name)
    }else{
      setFirstName("Guest")
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("https://task-management-application-vj6i.onrender.com/todo/all-todo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);

      const tasks: TaskInterface[] = response.data;

      setColumns({
        "To do": tasks.filter((task) => task.status === "To do"),
        "In progress": tasks.filter((task) => task.status === "In progress"),
        "Under review": tasks.filter((task) => task.status === "Under review"),
        Finished: tasks.filter((task) => task.status === "Finished"),
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /*  const [columns, setColumns] = useState<Columns>({
    "To do": initialTasks.filter((task) => task.status === "To do"),
    "In progress": initialTasks.filter((task) => task.status === "In progress"),
    "Under review": initialTasks.filter(
      (task) => task.status === "Under review"
    ),
    Finished: initialTasks.filter((task) => task.status === "Finished"),
  }); */

  

  const onDragEnd = (result: {
    destination: any;
    source: any;
    draggableId: any;
  }) => {
    const { destination, source } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId as keyof Columns];
    const destColumn = columns[destination.droppableId as keyof Columns];
    const sourceItems = Array.from(sourceColumn);
    const destItems = Array.from(destColumn);
    const [removed] = sourceItems.splice(source.index, 1);

    removed.status = destination.droppableId as keyof Columns;
    dispatchServer(updateTask(removed));

    destItems.splice(destination.index, 0, removed);

    setColumns((prev) => ({
      ...prev,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems,
    }));
  };
  const handleTaskClick = (task: TaskInterface) => {
    setSelectedTask(task);
    dispatchServer(showForm());
  };

  const handleAddNewClick = (column: string) => {
    setNewTaskColumn(column);
    dispatchServer(showForm());
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-screen  flex flex-col bg-gray-100 p-1 gap-y-6">
        <div className="flex justify-between items-center ml-2 pt-2 ">
          <h1 className="text-4xl font-semibold">
            {greeting},{firstName}!
          </h1>
          <div className="flex gap-x-3 items-center mr-4">
            <h5 className="text-base font-normal text-zinc-900">
              Help & feedback
            </h5>
            <Image src={questionIcon} alt="question mark" />
          </div>
        </div>
        <div className="grid grid-cols-3 ml-2 ">
          {aboutContent.map((value, i) => (
            <About
              key={i}
              source={value[0]}
              heading={value[1]}
              para={value[2]}
            />
          ))}
        </div>
        <div className="flex justify-between ml-2 ">
          <div className="flex items-center h-10 rounded-lg bg-white border-solid">
            <input
              placeholder="Search"
              className="outline-none text-gray-500 w-36 p-1"
            />
            <Image src={searchIcon} alt="search" className="p-2 w-10" />
          </div>
          <div className="flex space-x-2 items-center mr-8">
            <HandyComp
              content="Calendar view"
              icon={calenderIcon}
              width="155px"
            />
            <HandyComp
              content="Automation"
              icon={auomationIcon}
              width="140px"
            />
            <HandyComp content="Filter" icon={filterIcon} width="92px" />
            <HandyComp content="Share" icon={shareIconM} width="98px" />
            <button
              onClick={() => dispatchServer(showForm())}
              className="linear-btn-color2 p-1 text-white rounded-md flex items-center justify-center font-medium "
            >
              Create new
              <Image src={addIcons} alt="add icons" className="ml-2" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto h-[570px] mt-6  mr-4">
          <div className="grid grid-cols-4 gap-4 bg-white ">
            {Object.entries(columns).map(([columnId, tasks], columnIndex) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col  gap-x-4"
                  >
                    <div className="flex justify-between m-2">
                      <h4 className="text-xl font-normal text-gray-500">
                        {columnId}
                      </h4>
                      <Image src={menuIcon} alt="menu" />
                    </div>
                    {tasks.length === 0 ? (
                      <div className="text-center text-gray-500">
                        Please create a task
                      </div>
                    ) : (
                      tasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Task
                                {...task}
                                onClick={() => handleTaskClick(task)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                    <button
                      onClick={() => handleAddNewClick(columnId)}
                      className="bg-black text-white p-2 rounded-md w-full flex justify-between mt-2 "
                    >
                      Add new
                      <Image src={plusIcon} alt="icons" />
                    </button>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
        <TaskForm
          isVisible={isFormVisible}
          onClose={() => {
            dispatchServer(hideForm());
            fetchTasks();
          }}
          task={selectedTask}
          defaultStatus={newTaskColumn}
        />
      </div>
    </DragDropContext>
  );
};

export default Dashboards;
