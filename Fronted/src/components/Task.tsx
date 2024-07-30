import React from 'react';
import Image from 'next/image';
import { timerIcon } from '@/utils';
import {createdConverter} from '@/hooks/useCreated'
import { TaskInterface } from '@/utils/types';


 

const Task: React.FC<TaskInterface & {onClick:()=>void}> = ({ _id, title, description, priority, deadline, status, createdAt,onClick }) => {
  const created=createdConverter(createdAt)

  return (
    <div onClick={onClick} className='flex flex-col p-4 flex-wrap gap-y-4 bg-[#F9F9F9] rounded-lg m-2'>
      <h4 className='text-base flex font-medium text-gray-700'>{title}</h4>
      <p className='text-sm font-normal text-gray-500'>{description}</p>
      <div className={`${priority === 'Urgent' ? 'bg-[#FF6B6B]' : priority === 'Medium' ? 'bg-[#FFA235]' : 'bg-[#0ECC5A]'} w-[70px] h-8 text-white p-1 rounded-md text-center`}>
        {priority}
      </div>
      <div className='flex gap-x-2 0'>
        <Image src={timerIcon} alt="icon" />
        <p>{deadline}</p>
      </div>
      <p>{created}</p>
    </div>
  );
};

export default Task;
