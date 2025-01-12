"use client";
import Link from 'next/link';
import { IoHomeOutline, IoSchoolOutline } from "react-icons/io5";
import RandomQuote from "./RandomQuote"

export default function NavBar() {
    return (
        <div className="flex flex-row items-start mx-auto justify-between gap-2 sm:px-6 sm:pt-6 font-[family-name:var(--font-geist-sans)]">
                <div>
                <h1 className="text-2xl/7 font-bold text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">College Countdown</h1>
                <RandomQuote />
                </div>
                <div className="flex flex-row gap-8">
                <Link key="My Colleges" href="/myColleges">
                    <IoSchoolOutline className="text-2xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-sky-300"/>
                </Link>
                <Link key="Home" href="/">
                    <IoHomeOutline className="text-2xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-yellow-800"/>
                </Link>
                </div>
        </div>
    )
}