import NavBar from "../components/nav"
import {data} from "../dataArrs"
import MyColleges from "../components/MyColleges"

export default function Home() { //quote is gray-400
  console.log(data)
  return (
    <>
    <NavBar />
    <h5 className="text-sm font-bold text-gray-400 gap-2 sm:px-6 font-[family-name:var(--font-geist-sans)] underline decoration-sky-500">Double-click on Any of Your Colleges to Deselect Them.</h5>
    <div className="flex flex-row flex-wrap items-start p-6 gap-4 font-[family-name:var(--font-geist-sans)]">
      <MyColleges allColleges={data}/>
    </div>

    </>
    
  );
}
