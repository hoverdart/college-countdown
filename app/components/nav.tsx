"use client";
import Link from 'next/link';
import { IoHomeOutline, IoSchoolOutline } from "react-icons/io5";
import { FaRegCircleQuestion } from "react-icons/fa6";
import RandomQuote from "./RandomQuote"

export default function NavBar() {
    return (
        <div className="flex flex-row items-start tracking-tight justify-between gap-2 px-6 pt-6 font-[family-name:var(--font-geist-sans)]">
            <div>
                <h1 className="text-2xl/7 font-bold text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    College Countdown
                </h1>
                <RandomQuote />
            </div>
            <div className="flex flex-row gap-5">
                <Link key="About the Site" href="/about">
                    <div className="group relative flex flex-col items-center">
                        <FaRegCircleQuestion className="text-2xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-yellow-300" />
                        <span className="absolute top-8 text-xs bg-gray-800 text-white text-center px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            About
                        </span>
                    </div>
                </Link>
                <Link key="My Colleges" href="/myColleges">
                    <div className="group relative flex flex-col items-center">
                        <IoSchoolOutline className="text-2xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-sky-300" />
                        <span className="absolute top-8 text-xs bg-gray-800 text-white px-2 py-1 text-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            My Colleges
                        </span>
                    </div>
                </Link>
                <Link key="Home" href="/">
                    <div className="group relative flex flex-col items-center">
                        <IoHomeOutline className="text-2xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-yellow-800" />
                        <span className="absolute top-8 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Home
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
