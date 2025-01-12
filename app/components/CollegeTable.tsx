"use client";
import EachCountdown from "./EachCountdown";
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedCols } from "../atoms"

function formatDate(isoDate: string | number | Date) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Jan" instead of "January"
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // 24-hour format
      }).replace(',', '');
}
export type Data = {
    name: string;
    tag: string;
    decisionDate: string;
    notes: string;
    /** Name + tag */
    id: string;
  }[];

export default function CollegeTable({colDecisions, colPastDecisions}:{colDecisions:Data, colPastDecisions:Data}) {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [cols, setSelectedCols] = useAtom(selectedCols);
  const handleDoubleClick = (colID: string) => {
    setSelectedCols((prevCols) => {
      if (prevCols.includes(colID)) {
        return prevCols.filter((id) => id !== colID);
      }
      return [...prevCols, colID];
    });
  };
  const selectedCSS = "bg-sky-100 border-b dark:bg-sky-800 dark:border-sky-700 hover:bg-sky-200 dark:hover:bg-sky-600";
  const unselectedCSS = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";
  return (
    <>
    <div className= "relative rounded-xl overflow-auto pb-2 shadow-lg">
    <table className="border-collapse table-fixed w-full text-md">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className = "border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                <th className="">College Name</th>
                <th className="">Decision Type</th>
                <th className="">Release Date</th>
                <th className="text-red-500">Countdown</th>
            </tr>
        </thead>
        <tbody className = "bg-white dark:bg-slate-800">
            {colDecisions.map((eachElement, index) => (
                <tr key={index} className={cols.includes(eachElement.id) ? selectedCSS : unselectedCSS} onDoubleClick={()=>handleDoubleClick(eachElement.id)}>
                    <td>{eachElement.name}</td>
                    <td>
                    {eachElement.tag} {eachElement.notes !== "" && ` (${eachElement.notes})`}</td>
                    <td>{formatDate(eachElement.decisionDate)} </td>
                    <td> 
                        <EachCountdown tilThisDate={eachElement.decisionDate} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    <h5 className="text-lg font-bold text-red-400 hover:text-gray-400 pt-4 transition-all hover:underline" onClick={() => {setIsTableVisible(!isTableVisible)}}>Click to See Past College Deadlines</h5>
    {isTableVisible ? 
    <div className= "relative rounded-xl overflow-auto py-4 shadow-lg">
    <table className="border-collapse table-fixed w-full text-md">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className = "border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                <th className="">College Name</th>
                <th className="">Decision Type</th>
                <th className="">Release Date</th>
            </tr>
        </thead>
        <tbody className = "bg-white dark:bg-slate-800">
            {colPastDecisions.map((eachElement, index) => (
                <tr key={index} className={cols.includes(eachElement.id) ? selectedCSS : unselectedCSS} onDoubleClick={()=>handleDoubleClick(eachElement.id)}>
                    <td>{eachElement.name}</td>
                    <td>
                    {eachElement.tag} {eachElement.notes !== "" && ` (${eachElement.notes})`}</td>
                    <td>{formatDate(eachElement.decisionDate)} </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div> : <></>}
    </>
      );
}
