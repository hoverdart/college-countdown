import CollegeTable from "./components/CollegeTable";
import NavBar from "./components/nav"

//FetchData Code Starts Here
import { JSDOM } from "jsdom";
import {RawData} from "./api/dummyData";
import { tableToJson, rawDataToData } from "./api/fetchData";


export default async function Home() {
    //FetchData Function Code
    if (process.env.NODE_ENV === 'development') {
      console.log("dev mode");
    }
    /*
    const currentDate = new Date();
    const CLASS_YEAR =
      0 <= currentDate.getMonth() && currentDate.getMonth() <= 6
        ? currentDate.getFullYear() + 4
        : currentDate.getFullYear() + 5;
    */
    const res = await fetch( //changed link to having the table omg
      `https://calendar.applyingto.college/table_only`, {next:{revalidate:21600}}
    );
    const html = await res.text();
    const dom = new JSDOM(html);
    const table = dom.window.document.querySelector("table");
    if (!table) {
      throw new Error("No table!");
    }
    const rawData = tableToJson(table);
    const data = rawDataToData(rawData as RawData);
    //End FetchData Function Code

    //Regular Home Returning Code
    return (
      <>
      <NavBar />
      <h5 className="text-sm font-bold text-gray-400 gap-2 px-6 font-[family-name:var(--font-geist-sans)] underline decoration-sky-500">Double-Click Any College to Select and Deselect.</h5>
      <div className="font-[family-name:var(--font-geist-sans)]">
          <CollegeTable decisions = {data} />
        </div>
      </>
    );
};
