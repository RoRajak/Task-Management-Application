import React from "react";
import Image from "next/image";
type props={
    content:string;
    icon:string;
    width:string;
    flexDirection?:string;
}

function HandyComp({ content, icon, width,flexDirection }:props) {
  return (
    <button>
      <div className={`w-[${width}] flex m-1 items-center justify-center gap-x-2 ${flexDirection}`}>
        <h5 className="text-sm font-normal text-gray-500" >{content}</h5>
        <Image src={icon} alt="icon"/>
      </div>
    </button>
  );
}

export default HandyComp;
