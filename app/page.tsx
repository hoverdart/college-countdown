import RandomQuote from "./components/RandomQuote"
import CollegeTable from "./components/CollegeTable"

export default function Home() {

  return (
    <div className="items-center min-h-screen p-8 pb-8 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl/7 font-bold text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">College Countdown</h1>
      <RandomQuote />
      <CollegeTable />

    </div>
  );
}
