"use client";
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedCols } from "../api/atoms";
import EachCountdown from "./EachCountdown";
import { FaAngleDown } from "react-icons/fa6";

function formatDate(isoDate: string | number | Date) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '');
}

export type Data = {
  name: string;
  tag: string;
  decisionDate: string;
  notes: string;
  id: string;
}[];

export default function CollegeTable({ decisions }: { decisions: Data }) {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isTableVisibleTwo, setIsTableVisibleTwo] = useState(false);
  const [cols, setSelectedCols] = useAtom(selectedCols);
  const [searchQuery, setSearchQuery] = useState("");

  const easternTimeInMS = Date.now();
  const colPastDecisions: Data = [];
  const colDecisions: Data = [];

  decisions.forEach(decision => {
    const decisionTime = new Date(decision.decisionDate).getTime();
    if (decisionTime - easternTimeInMS < -259200000) {
      colPastDecisions.push(decision);
    } else {
      colDecisions.push(decision);
    }
  });

  const filteredDecisions = colDecisions.filter(({ name, tag }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPastDecisions = colPastDecisions.filter(({ name, tag }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoubleClick = (colID: string) => {
    setSelectedCols((prevCols) =>
      prevCols.includes(colID)
        ? prevCols.filter((id) => id !== colID)
        : [...prevCols, colID]
    );
  };

  const selectedCSS =
    "bg-sky-100 border-b dark:bg-sky-800 dark:border-sky-700 hover:bg-sky-200 dark:hover:bg-sky-600";
  const unselectedCSS =
    "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";

  return (
    <div className = "p-6">
      <div className="relative mt-0">
        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pb-4 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input type="text" placeholder="Search For A College..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-2 pt-2 ps-10 mb-4 border rounded-md dark:bg-gray-800 dark:text-gray-300"/>
      </div>

      <div className="relative rounded-xl w-full overflow-x-auto shadow-xl bg-white dark:bg-slate-900 p-4">
        <table className="min-w-full table-auto text-md text-gray-700 dark:text-gray-300">
          <caption className="p-3 text-xl font-bold text-gray-50 transition-all bg-white dark:bg-gray-800">
          <div className="flex flex-row justify-between items-center">
            <span>Ongoing Decisions</span>
            <FaAngleDown className="hover:text-gray-400 transition-transform duration-200 hover:-translate-y-1 hover:translate-y-1" onClick={()=>{setIsTableVisible(!isTableVisible)}}/>
          </div>
          </caption>
          <thead className="text-xs text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr className="border-b dark:border-gray-600">
              <th className="px-6 py-3 text-left font-semibold">College Name</th>
              <th className="px-6 py-3 text-left font-semibold">Decision Type</th>
              <th className="px-6 py-3 text-left font-semibold">Release Date</th>
              <th className="px-6 py-3 text-left text-red-500 font-semibold">Countdown</th>
            </tr>
          </thead> 
          <tbody className={`${!isTableVisible && "hidden"} bg-white dark:bg-slate-800`}>
            {filteredDecisions.map((eachElement, index) => (
              <tr
                key={index}
                className={`${
                  cols.includes(eachElement.id) ? selectedCSS : unselectedCSS
                } transition-all duration-300 ease-in-out relative hover:z-10`}
                onDoubleClick={() => handleDoubleClick(eachElement.id)}>
                <td className="px-6 py-4 font-medium">{eachElement.name}</td>
                <td className="px-6 py-4">
                  {eachElement.tag}
                  {eachElement.notes && ` (${eachElement.notes})`}
                </td>
                <td className="px-6 py-4">{formatDate(eachElement.decisionDate)}</td>
                <td className="px-6 py-4 w-64">
                  <EachCountdown tilThisDate={eachElement.decisionDate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className="relative rounded-xl overflow-x-auto shadow-xl bg-white dark:bg-slate-900 p-4 py-4 mt-4">
          <table className="min-w-full table-auto text-md text-gray-700 dark:text-gray-300">
          <caption className="p-3 text-xl font-bold text-red-500 transition-all text-left rtl:text-right bg-white dark:bg-gray-800">
          <div className="flex flex-row justify-between items-center">
            <span>Past Decisions</span>
            <FaAngleDown className="hover:text-gray-400 transition-transform duration-200 hover:-translate-y-1 hover:translate-y-1" onClick={()=>{setIsTableVisibleTwo(!isTableVisibleTwo)}}/>
          </div>
            </caption>
            <thead className="text-xs text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr className="border-b dark:border-gray-600">
                <th className="px-6 py-3 text-left font-semibold">College Name</th>
                <th className="px-6 py-3 text-left font-semibold">Decision Type</th>
                <th className="px-6 py-3 text-left font-semibold">Release Date</th>
              </tr>
            </thead>
            <tbody className={`${!isTableVisibleTwo && "hidden"} bg-white dark:bg-slate-800`}>
              {filteredPastDecisions.map((eachElement, index) => (
                <tr
                  key={index}
                  className={`${
                    cols.includes(eachElement.id) ? selectedCSS : unselectedCSS
                  } transition-all duration-300 ease-in-out relative`}
                  onDoubleClick={() => handleDoubleClick(eachElement.id)}>
                  <td className="px-6 py-4 font-medium">{eachElement.name}</td>
                  <td className="px-6 py-4">
                    {eachElement.tag}
                    {eachElement.notes && ` (${eachElement.notes})`}
                  </td>
                  <td className="px-6 py-4">{formatDate(eachElement.decisionDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
