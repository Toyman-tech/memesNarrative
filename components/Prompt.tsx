"use client"
import {useRef, useState} from 'react';
import { BsClipboard2Check } from "react-icons/bs";
import React from "react";
import Random from "./Random";
const Prompt: React.FC = () => {
    const [narative, setNarative] = useState('Click one of the button above to generate a nice Narrative....');
    const [loading, setLoading] = useState(false);

    const handleGenerateNarative = async ()=>{
      setLoading(true)
      const coin = '$Moon';
      try {
        const response = await fetch('http://localhost:3000/api', {
          method : 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({coin}),
        });

        if(response.ok){
          const data = await response.json();
          console.log(data.data)
          setNarative(data.data);
        } else {
          console.error('failed to fetch narrative')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    }

    const contentRef = useRef<HTMLDivElement>(null);

    const handleCopy = () =>{
        if (contentRef.current){
            const content = contentRef.current.innerText;

            navigator.clipboard.writeText(content)
            .then(()=>{
                alert('Content copied to clipboard!');
            })
            .catch(err=>{
               console.error('Could not copy text: ', err);
            })
        }
    }
  return (
    <div className="p-[40px]">
    <div className="flex flex-col md:flex-row gap-7 md:justify-between">
      <div className="flex flex-col gap-3">
        <div>
          Moon Tools by <span className="text-[#9ca3af]">Toyman</span>
        </div>
        <div className="flex flex-row gap-3 text-[12px]">
          <div className=" hover:text-cyan-900  rounded-md p-[5px] text-white bg-[#9ca3af]">
            <button onClick={handleGenerateNarative}
            disabled={loading}>
              {loading? 'Generating..' : 'Crypto-verse'}
            </button>
          </div>
          <div className=" hover:text-cyan-900  rounded-md p-[5px] text-white bg-[#9ca3af]">
            <button disabled={loading} onClick={handleGenerateNarative}>
            {loading? 'Generating..' : 'Shillers'}
              </button>
          </div>
          <div className=" hover:text-cyan-900  rounded-md p-[5px] text-white bg-[#9ca3af]">
            <button onClick={handleCopy} className='px-[5px]'>
            <BsClipboard2Check />
            </button>
          </div>
        </div>
        <div className=" shadow-lg min-w-[70vw] md:min-w-[30vw] md:max-w-[30vw] min-h-[30vh] rounded-lg bg-[#ffff]" ref={contentRef}>
           <p className="p-3 text-[13px]  ">
           {narative}
           
            </p> 
        </div>
      </div>
      {/* images display */}
      <div>
        <Random/>
      </div>
    </div>
    </div>
  );
};

export default Prompt;
