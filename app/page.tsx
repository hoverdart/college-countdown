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
  //const easternTime = new Date().toLocaleString("en-US", {timeZone: 'America/New_York'});
  const easternTimeInMS = Date.now(); //.parse(easternTime)
  const passedDecisions: Data = [];
  const decisions: Data = [];
  for(let i=0; i<data.length; i++){
    const dater = new Date(data[i].decisionDate);
    if(dater.getTime() - easternTimeInMS < -259200000){
      passedDecisions.push(data[i]);
    }else{
      decisions.push(data[i]);
    }
  }
  passedDecisions.reverse();
  return (
    <>
    <NavBar />
    <h5 className="text-sm font-bold text-gray-400 gap-2 px-6 font-[family-name:var(--font-geist-sans)] underline decoration-sky-500">Double-Click Any College to Select and Deselect.</h5>
    <div className="p-6 font-[family-name:var(--font-geist-sans)]">
        <CollegeTable colDecisions={decisions} colPastDecisions={passedDecisions} />
      </div>
    </>
      
    
  );
}
