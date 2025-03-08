import NavBar from "../components/nav";
import { FaClock, FaUniversity, FaSearch, FaEye } from "react-icons/fa";
import { IoHomeOutline, IoSchoolOutline } from "react-icons/io5";
import Link from 'next/link';

export default function About() {
  return (
    <>
      <NavBar />
      <div className="w-full h-auto text-gray-900 dark:text-white p-6">

        {/* Overview */}
        <section className="text-center mb-6">
          <h4 className="text-2xl font-semibold">
            Welcome to the <span className="font-bold text-sky-500">College Countdown</span>, where you can watch every second tick closer and closer to the answer that will shape your future. Stay vigilant, because the wait will end, and your journey will begin.
          </h4>
        </section>

        {/* Features  */}
          <div className="grid md:grid-cols-4 gap-8 mt-6">
          
            <div className="flex flex-col items-center text-center p-3 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md">
              <FaClock className="text-4xl text-sky-500 mb-4" />
              <h3 className="text-xl font-semibold">Live Countdown</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Never miss a deadline—track every decision in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md">
              <FaUniversity className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold">Comprehensive Database</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Get the latest decision release dates, updated regularly from the <a href="https://applyingto.college/decision-calendar" className="text-blue-400 hover:underline font-semibold">A2C College Database.</a>
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md">
              <FaSearch className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold">Search & Filter</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Quickly find your colleges with an intuitive search feature.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md">
              <FaEye className="text-4xl text-violet-500 mb-4" />
              <h3 className="text-xl font-semibold">Personalized Tracking</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Easily track your top choices—just double-click any college on the home page to add or remove it from your list.
              </p>
            </div>
          </div>

        {/* How to Use */}
        <section className="mt-6 text-center">
          <h2 className="text-2xl font-bold">How to Use</h2>

          <div className="grid grid-cols-2 gap-8 mt-6">
          <Link key="Home" href="/">
            <div className="flex flex-col items-center text-center p-3 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md transition-all hover:scale-105">
              <IoHomeOutline className="text-4xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-yellow-800 mb-4"/>
              <h3 className="text-xl font-semibold">Home Page</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                <strong>View a table of all colleges in chronological order.</strong> Use the <strong>Search Bar</strong> to find any college within the table. Use the <strong>&quot;Arrow&quot; button</strong> on the table to minimize it. Double-click <strong>any table element</strong> to add or remove it from <strong>My Colleges.</strong>
              </p>
            </div>
            </Link>

            <Link key="My Colleges" href="/myColleges">
            <div className="flex flex-col items-center text-center p-3 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md transition-all hover:scale-105">
              <IoSchoolOutline className="text-4xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-sky-300 mb-4"/> 
              <h3 className="text-xl font-semibold">My Colleges</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                <strong>View any colleges you&apos;ve selected and their countdowns.</strong> Add your own custom college with the <strong>&quot;Add a Custom College&quot; box.</strong> Easily remove colleges with the <strong>&quot;-&quot; icon</strong> in the top-right corner of any selected entry.
              </p>
            </div>
            </Link>

          </div>

        </section>

        <section className="text-center mt-6">
        <h4 className="text-2xl font-bold text-sky-500">
            Select your Colleges. Await your decisions. And Prepare for the Inevitable.
        </h4>
        </section>
        
      </div>
    </>
  );
}
