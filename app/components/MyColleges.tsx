"use client";
import { selectedCols } from "../atoms"
import { useAtom } from 'jotai';
import {Data} from "../dataArrs";
import Image from 'next/image';
import EachCountdown from "./EachCountdown";

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

export default function MyColleges({allColleges}:{allColleges:Data}){
    const [cols, setSelectedCols] = useAtom(selectedCols);
    const selectedColleges = cols.map((col) =>
        allColleges.find((college) => college.id === col)
    ).filter(Boolean);
    const handleDoubleClick = (colID: string) => {
        setSelectedCols((prevCols) => {
            if (prevCols.includes(colID)) {
                return prevCols.filter((id) => id !== colID);
            }
        return [...prevCols, colID];
        });
    };
    return( //src={`/get-favicon/${encodeURIComponent(college.name + " Website")}`}
        <>
        {selectedColleges.map((eachElement, index) => (
        <div className="w-64 p-4 bg-white transition-all border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600" key={index} onDoubleClick={()=>handleDoubleClick(eachElement!.id)}>
            <Image src={`/get-favicon/${encodeURIComponent(eachElement!.name + " Website")}`} alt="College Name" className="w-full h-40 object-contain max-w-xs max-h-xs rounded-md mb-4" width="40" height="40" /> 

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {eachElement!.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="font-bold">Decision Type:</span> {eachElement!.tag}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="font-bold">Decision Date:</span> {formatDate(eachElement!.decisionDate)}
            </p>

            <div className="text-sm font-medium text-red-600 font-bold">
                <span className="font-bold text-gray-600 dark:text-gray-400">Countdown:</span> <EachCountdown tilThisDate={eachElement!.decisionDate} />
            </div>
        </div>
        ))}
        {selectedColleges.length === 0 && (<h5 className="text-5xl/7 font-bold text-red-400">No Colleges Yet! Add a College from the &quot;Home&quot; Tab.</h5>)}
        </>
    );
}