import CollegeTable from "./components/CollegeTable";
import NavBar from "./components/nav"
import {data} from "./api/dataArrs"

export type Data = {
  name: string;
  tag: string;
  decisionDate: string;
  notes: string;
  /** Name + tag */
  id: string;
}[];


export default function Home() {
  return (
    <>
    <NavBar />
    <h5 className="text-sm font-bold text-gray-400 gap-2 px-6 font-[family-name:var(--font-geist-sans)] underline decoration-sky-500">Double-Click Any College to Select and Deselect.</h5>
    <div className="p-6 font-[family-name:var(--font-geist-sans)]">
        <CollegeTable decisions = {data} />
      </div>
    </>
      
    
  );
}
