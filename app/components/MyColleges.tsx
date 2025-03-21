"use client";
import { selectedCols, customCols } from "../api/atoms";
import { useState } from "react";
import { useAtom } from 'jotai';
import { Data } from "../api/dummyData";
import EachCountdown from "./EachCountdown";
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";

function formatDate(isoDate: string | number | Date) {
    if(typeof isoDate === "string"){
        if(isoDate.toString().includes(" → ")){ //One of the weird arrow ones
        return isoDate;
        }
    }
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
function generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export default function MyColleges({ allColleges }: { allColleges: Data }) {
    const [cols, setSelectedCols] = useAtom(selectedCols);
    const [customs, setCustoms] = useAtom(customCols);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const selected = [
        ...cols.map((col) => allColleges.find((college) => college.id === col)).filter(Boolean),
        ...customs
    ];
    const selectedColleges = selected.sort((a, b) => {
        let aD = a!.decisionDate;
        let bD = b!.decisionDate;
        if(aD.toString().includes(" → ")){ //One of the weird arrow ones
            aD = aD.split(" → ")[1]
        }
        if(bD.toString().includes(" → ")){ //One of the weird arrow ones
            bD = bD.split(" → ")[1]
        }
        const dateA = new Date(aD).getTime(); // Fallback to 0 for invalid dates
        const dateB = new Date(bD).getTime();
        return dateA - dateB;
    });
    const handleAddCol = () => {
        const formattedId = generateRandomString();
        setCustoms((prevCustoms) => [
            ...prevCustoms,
            { name, tag: type, decisionDate: date, notes: "", confirmed:"", id: formattedId }
        ]);
        setName('');
        setType('');
        setDate('');
    };
    const handleDoubleClick = (colID: string) => {
        setSelectedCols((prevCols) => prevCols.includes(colID) ? prevCols.filter((id) => id !== colID) : [...prevCols, colID]);
        setCustoms((prevCustoms) => prevCustoms.some((custom) => custom.id === colID) ? prevCustoms.filter((custom) => custom.id !== colID) : [...prevCustoms]);
    };
    return (
        <>
            {selectedColleges.map((eachElement, index) => (
                <div className="w-auto p-4 bg-white transition-all border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 group relative" key={index}>
                    <div className="opacity-0 group-hover:opacity-100 transition-all">
                        <IoRemoveCircleOutline className="absolute top-2 right-2 text-red-700 hover:text-red-900 text-3xl transition-all hover:scale-125 active:scale-100" onDoubleClick={() => handleDoubleClick(eachElement!.id)} />
                    </div>
                    <img src={`/api/getImage/${encodeURIComponent(eachElement!.name + " official logo site:wikipedia.org OR site:.edu OR site:commons.wikimedia.org filetype:png")}`} alt="College Name" width={128} height={128} className="h-[128px] w-[128px] object-contain item-center rounded-md mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {eachElement!.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-bold">Decision Type:</span> {eachElement!.tag}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-bold">Decision Date:</span> {formatDate(eachElement!.decisionDate)}
                    </p>
                    <div className="text-sm font-medium text-red-600 font-bold">
                        <span className="font-bold text-gray-600 dark:text-gray-400">Countdown:</span> <EachCountdown tilThisDate={eachElement!.decisionDate} />
                    </div>

                    <div className="text-xs text-gray-400 mt-1 text-left justify-left font-semibold">
                        {eachElement!.confirmed !== "" && <span>Decision: <span className={eachElement!.confirmed === "Confirmed" ? `text-green-600` : eachElement!.confirmed === "Approximate" ? `text-yellow-400` :`text-red-600`}>{eachElement!.confirmed}</span></span>}
                    </div>
                    
                </div>
            ))}
            <form>
                <div className="w-72 p-4 bg-white transition-all border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 group relative" key="999">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Add a Custom College!</h3>
                    <div className="transition-all">
                        <IoAddCircleOutline className="absolute top-2 right-2 text-green-700 hover:text-green-900 text-3xl transition-all hover:scale-125 active:scale-100" onClick={handleAddCol} />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400 font-bold">College Name</label>
                        <input type="text" id="name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={75} placeholder="Diablo Valley College" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400 font-bold">Decision Type</label>
                        <input type="text" id="type" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ED" maxLength={20} required value={type} onChange={(e) => setType(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400 font-bold">Decision Date</label>
                        <input type="datetime-local" id="date" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                </div>
            </form>
        </>
    );
}
