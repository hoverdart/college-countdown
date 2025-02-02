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
          
            <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FaClock className="text-4xl text-sky-500 mb-4" />
              <h3 className="text-xl font-semibold">Live Countdown</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Track every decision deadline with real-time countdown timers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FaUniversity className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold">Comprehensive Database</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Access release dates for top colleges, updated regularly from the <a href="https://applyingto.college/decision-calendar" className="text-blue-400 hover:underline font-semibold">A2C College Database.</a>
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FaSearch className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold">Search & Filter</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Quickly find your colleges with an intuitive search feature.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FaEye className="text-4xl text-violet-500 mb-4" />
              <h3 className="text-xl font-semibold">Select your Own</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Select and view any colleges you&apos;d like, by double-clicking any college from the home page.
              </p>
            </div>
          </div>

        {/* How to Use */}
        <section className="mt-6 text-center">
          <h2 className="text-2xl font-bold">How to Use</h2>
          <div className="grid grid-cols-2 gap-8 mt-6">
            
            <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Link key="Home" href="/">
                    <IoHomeOutline className="text-4xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-yellow-800 mb-4"/>
            </Link>
              <h3 className="text-xl font-semibold">Home Page</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Here, you can view a table of all colleges in chronological order. Use the Search Bar to find any college within the table, the &quot;Arrow&quot; button on the table to minimize it, and Double-Click any table element to add or remove it it from &quot;My Colleges.&quot;
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Link key="My Colleges" href="/myColleges">
                    <IoSchoolOutline className="text-4xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-sky-300 mb-4"/>
                </Link>
              <h3 className="text-xl font-semibold">My Colleges</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Here, you can view any colleges you&apos;ve selected and their countdowns. Add your own custom college with the &quot;Add a Custom College&quot; box. Remove any college by simply clicking on the &quot;-&quot; Icon, on the top-right corner of any college you&apos;ve selected.
              </p>
            </div>
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
