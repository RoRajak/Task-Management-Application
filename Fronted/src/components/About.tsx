import React from "react";
import Image from "next/image";

type ImageTag={
  source:string;
  heading:string;
  para:string;

}
function About({source,heading,para}:ImageTag) {
  return (
    <div className="flex justify-center items-center gap-x-5 bg-white w-[27rem] h-36 rounded-lg">
      <Image src={source} alt="sourcr" className="ml-3"/>
      <div className="flex flex-col gap-y-2 flex-wrap">
        <h4 className="text-base font-semibold text-gray-600">{heading}</h4>
        <h6 className="text-sm font-normal text-gray-500">{para}</h6>
      </div>
    </div>
  );
}

export default About;
