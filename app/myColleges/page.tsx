import NavBar from "../components/nav"
import {data} from "../dataArrs"

export default function Home() { //quote is gray-400
  console.log(data);
  return (
    <>
    <NavBar />
    <div className="flex flex-row items-start p-6 font-[family-name:var(--font-geist-sans)]">
        <p>This page is in the Works! Be a Patient Paul.</p>
    </div>

    </>
    
  );
}