import React from 'react';
import Image from 'next/image';
import { timerIcon } from '@/utils';
import {createdConverter} from '@/hooks/useCreated'
import { TaskInterface } from '@/utils/types';


 

const Task: React.FC<TaskInterface & {onClick:()=>void}> = ({ _id, title, description, priority, deadline, status, createdAt,onClick }) => {
  const created=createdConverter(createdAt)

  return (
    <div onClick={onClick} className='flex flex-col p-2 flex-wrap gap-y-3 bg-[#F9F9F9] rounded-lg m-2  '>
      <p className='text-sm flex font-medium text-gray-700'>{title}</p>
      <p className='text-xs font-normal text-gray-500'>{description}</p>
      <div className={`${priority === 'Urgent' ? 'bg-[#FF6B6B]' : priority === 'Medium' ? 'bg-[#FFA235]' : 'bg-[#0ECC5A]'} w-min h-min text-white p-1 rounded-md text-center text-sm`}>
        {priority}
      </div>
      <div className='flex gap-x-1 items-center'>
        <Image src={timerIcon} alt="icon" className='w- h-4' />
        <p className='text-sm'>{deadline}</p>
      </div>
      <p className='text-xs'>{created}</p>
    </div>
  );
};

export default Task;
