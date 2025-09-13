import { FaClock, FaUniversity, FaSearch, FaEye } from "react-icons/fa";
import { IoHomeOutline, IoSchoolOutline } from "react-icons/io5";
import { FaRegCircleQuestion } from "react-icons/fa6";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="w-full min-h-screen text-gray-900 dark:text-white p-6 bg-gradient-to-b from-neutral-50 dark:from-gray-900 to-white dark:to-gray-950">

        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to <span className="text-sky-500">College Countdown</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Track every second ticking closer to your decision day. Stay
            vigilant and stay prepared, because the wait will end, and your journey will
            begin.
          </p>

          {/* Quick Navigation Icons */}
          <div className="flex flex-row justify-center gap-8 mt-4">
            <Link key="About the Site" href="/about">
              <div className="group relative flex flex-col items-center">
                <FaRegCircleQuestion className="text-3xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-yellow-300" />
                <span className="absolute top-10 text-xs bg-gray-800 text-white text-center px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  About
                </span>
              </div>
            </Link>

            <Link key="My Colleges" href="/myColleges">
              <div className="group relative flex flex-col items-center">
                <IoSchoolOutline className="text-3xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-sky-300" />
                <span className="absolute top-10 text-xs bg-gray-800 text-white px-2 py-1 text-center rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  My Colleges
                </span>
              </div>
            </Link>

            <Link key="Home" href="/">
              <div className="group relative flex flex-col items-center">
                <IoHomeOutline className="text-3xl text-gray-900 dark:text-white transition-all hover:scale-125 hover:text-yellow-800" />
                <span className="absolute top-10 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Home
                </span>
              </div>
            </Link>
          </div>
        </section>


        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <FaClock className="text-4xl text-sky-500 mb-3" />,
                title: "Live Countdown",
                desc: "Never miss a deadline; track every decision, updated in real time."
              },
              {
                icon: <FaUniversity className="text-4xl text-yellow-500 mb-3" />,
                title: "Comprehensive Database",
                desc: <>Latest release dates, updated from the{" "}
                  <a href="https://applyingto.college/decision-calendar" className="text-blue-400 hover:underline font-semibold">
                    A2C College Database
                  </a>.
                </>
              },
              {
                icon: <FaSearch className="text-4xl text-red-500 mb-3" />,
                title: "Search & Filter",
                desc: "Find your colleges quickly with an intuitive search."
              },
              {
                icon: <FaEye className="text-4xl text-violet-500 mb-3" />,
                title: "Personalized Tracking",
                desc: "Double-click any college to add or remove from your list."
              }
            ].map(({ icon, title, desc }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-5 bg-neutral-100 dark:bg-gray-800 rounded-2xl shadow transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {icon}
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">How to Use</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/" className="group">
              <div className="flex flex-col items-center text-center p-6 bg-neutral-100 dark:bg-gray-800 rounded-2xl shadow transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                <IoHomeOutline className="text-4xl text-gray-900 dark:text-white mb-4 group-hover:text-yellow-600 transition-colors" />
                <h3 className="text-xl font-semibold">Home Page</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  View the full college table in chronological order. Use the{" "}
                  <strong>Search Bar</strong> and minimize with the{" "}
                  <strong>Arrow</strong>. Double-click to add/remove colleges.
                </p>
              </div>
            </Link>

            <Link href="/myColleges" className="group">
              <div className="flex flex-col items-center text-center p-6 bg-neutral-100 dark:bg-gray-800 rounded-2xl shadow transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                <IoSchoolOutline className="text-4xl text-gray-900 dark:text-white mb-4 group-hover:text-sky-400 transition-colors" />
                <h3 className="text-xl font-semibold">My Colleges</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Track your selected colleges with countdowns. Add custom
                  colleges and easily remove entries with the{" "}
                  <strong>&quot;-&quot; icon</strong>.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center mt-12">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
            Select your Colleges. Await your Decisions. Prepare for the Inevitable.
          </h4>
        </section>
      </div>
    </>
  );
}
