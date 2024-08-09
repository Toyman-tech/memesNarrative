import Display from "@/components/Display";
import Prompt from "@/components/Prompt";
import Image from "next/image";

export default function Home() {
  return (
   <main className="flex flex-col xs:justify-center md:justify-between align-center bg-[#f5f5fa]">
     <Prompt/>
     <Display/>
   </main>
  );
}
