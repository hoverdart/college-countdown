"use client";
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedCols } from "../api/atoms";
import EachCountdown from "./EachCountdown";

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
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [cols, setSelectedCols] = useAtom(selectedCols);

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

  const handleDoubleClick = (colID: string) => {
    setSelectedCols((prevCols) => prevCols.includes(colID)
      ? prevCols.filter((id) => id !== colID)
      : [...prevCols, colID]
    );
  };

  const selectedCSS = "bg-sky-100 border-b dark:bg-sky-800 dark:border-sky-700 hover:bg-sky-200 dark:hover:bg-sky-600";
  const unselectedCSS = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";

  return (
    <>
      <div className="relative rounded-xl overflow-visible shadow-xl bg-white dark:bg-slate-900">
        <table className="min-w-full table-auto text-md text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr className="border-b dark:border-gray-600">
              <th className="px-6 py-3 text-left font-semibold">College Name</th>
              <th className="px-6 py-3 text-left font-semibold">Decision Type</th>
              <th className="px-6 py-3 text-left font-semibold">Release Date</th>
              <th className="px-6 py-3 text-left text-red-500 font-semibold">Countdown</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {colDecisions.map((eachElement, index) => (
              <tr key={index} className={`${cols.includes(eachElement.id) ? selectedCSS : unselectedCSS} transition-all duration-300 ease-in-out relative hover:z-10`} onDoubleClick={() => handleDoubleClick(eachElement.id)}>
                <td className="px-6 py-4 font-medium">{eachElement.name}</td>
                <td className="px-6 py-4">{eachElement.tag}{eachElement.notes && ` (${eachElement.notes})`}</td>
                <td className="px-6 py-4">{formatDate(eachElement.decisionDate)}</td>
                <td className="px-6 py-4 w-64"><EachCountdown tilThisDate={eachElement.decisionDate} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h5 className="text-lg font-bold text-red-400 hover:text-gray-400 pt-4 transition-all hover:underline cursor-pointer" onClick={() => setIsTableVisible(!isTableVisible)}>Click to See Past College Deadlines</h5>
      {isTableVisible && (
        <div className="relative rounded-xl overflow-visible py-4 shadow-lg bg-white dark:bg-slate-900 mt-4">
          <table className="min-w-full table-auto text-md text-gray-700 dark:text-gray-300">
            <thead className="text-xs text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr className="border-b dark:border-gray-600">
                <th className="px-6 py-3 text-left font-semibold">College Name</th>
                <th className="px-6 py-3 text-left font-semibold">Decision Type</th>
                <th className="px-6 py-3 text-left font-semibold">Release Date</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {colPastDecisions.map((eachElement, index) => (
                <tr key={index} className={`${cols.includes(eachElement.id) ? selectedCSS : unselectedCSS} transition-all duration-300 ease-in-out relative`} onDoubleClick={() => handleDoubleClick(eachElement.id)}>
                  <td className="px-6 py-4 font-medium">{eachElement.name}</td>
                  <td className="px-6 py-4">{eachElement.tag}{eachElement.notes && ` (${eachElement.notes})`}</td>
                  <td className="px-6 py-4">{formatDate(eachElement.decisionDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
