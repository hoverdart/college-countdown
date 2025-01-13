import NavBar from "../components/nav"
import {data} from "../dataArrs"
import MyColleges from "../components/MyColleges"

export default function Home() { //quote is gray-400
  return (
    <>
    <NavBar />
    <h5 className="text-sm font-bold text-gray-400 gap-2 px-6 font-[family-name:var(--font-geist-sans)] underline decoration-sky-500">Hover and Double-click on the Top-Right Corner to Deselect Any of Your Colleges.</h5>
    <div className="flex flex-row flex-wrap items-start p-6 gap-4 font-[family-name:var(--font-geist-sans)]">
      <MyColleges allColleges={data}/>
    </div>

    </>
    
  );
}
