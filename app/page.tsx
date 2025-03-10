import CollegeTable from "./components/CollegeTable";
import NavBar from "./components/nav"

//FetchData Code Starts Here
import { JSDOM } from "jsdom";
import {RawData, Data} from "./api/dummyData";

// ChatGPT
function tableToJson(table: HTMLTableElement) {
  const rows = table.querySelectorAll("tr");
  const headers = Array.from(rows[0].querySelectorAll("th")).map(
    (header) => header.textContent || ""
  );

  const jsonData = [];
  for (let i = 1; i < rows.length; i++) {
    // Skip the header row
    const cells = Array.from(rows[i].querySelectorAll("td"));
    const rowData = {};
    cells.forEach((cell, index) => {
      const content = getTextWithSpaces(cell);
      // @ts-expect-error string explicitly has an any type
      rowData[headers[index]] = content || "";
    });
    jsonData.push(rowData);
  }

  return jsonData;
}

// ChatGPT
function getTextWithSpaces(node: Node) {
  // Initialize an empty array to hold the text
  const textArray: string[] = [];

  // Iterate over the child nodes
  node.childNodes.forEach((child) => {
    // Node.TEXT_NODE
    if (child.nodeType === 3) {
      // Add text nodes directly, trimming whitespace
      if (child.textContent) {
        const text = child.textContent.trim();
        textArray.push(text);
      }
    }

    // Node.ELEMENT_NODE
    else if (child.nodeType === 1) {
      // Recursively handle element nodes
      textArray.push(getTextWithSpaces(child));
    }
  });

  // Join the collected text with a space
  return textArray.join(" ");
}

function rawDataToData(rawData: RawData): Data {
  const preData: Data = [];

  const ids: string[] = [];
  const timesDuplicateIdOccurred: { [id: string]: number } = {};

  for (const college of rawData) {
    const name = college.Name.startsWith("🎓 ")
      ? college.Name.substring("🎓 ".length)
      : college.Name;

    const dateStr = rawDateToDateString(college["Decision Date"]);

    // If invalid date
    const date = new Date(dateStr);
    if (!(date instanceof Date && isFinite(+date))) {
      console.warn(`${name} has no valid decision date. Skipping...`);
      //continue;
    }

    // Generate a stable id
    let id = name + " " + college.Tag;
    id = id.toLowerCase().replaceAll(" ", "-");

    // If duplicate id, add a number prefix to it
    if (ids.includes(id)) {
      if (!Object.keys(timesDuplicateIdOccurred).includes(id)) {
        timesDuplicateIdOccurred[id] = 0;
      }
      timesDuplicateIdOccurred[id] += 1;
      id += "-" + timesDuplicateIdOccurred[id];
    }

    ids.push(id);
    preData.push({
      name,
      tag: college.Tag,
      decisionDate: dateStr,
      notes: college.Notes,
      confirmed: college.Confirmed,
      id,
    });
  }
  const data = preData.sort((a, b) => {
    let aD = a.decisionDate;
    let bD = b.decisionDate;
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
  return data;
}

function rawDateToDateString(rawDate: string): string {
  const standardOffsets: { [key: string]: string } = {
    EST: "-0500",
    EDT: "-0400",
    CST: "-0600",
    CDT: "-0500",
    MST: "-0700",
    MDT: "-0600",
    PST: "-0800",
    PDT: "-0700",
    AKST: "-0900",
    HST: "-1000", // Hawaii doesn't observe DST
  };

  function getTimezoneOffset(timezone: string): string | null {
    return standardOffsets[timezone] || null;
  }

  try {
    // Extract timezone from the string (default to PST if missing)
    const tzMatch = rawDate.match(/\(([A-Z]+)\)/);
    const timezone = tzMatch ? tzMatch[1] : "PST"; // Default to PST

    // Remove timezone from the raw date string
    const cleanDateStr = rawDate.replace(/\s*\([A-Z]+\)/, "");

    // Parse the date without the timezone
    const tempDate = new Date(cleanDateStr);

    // Get correct timezone offset
    const offset = getTimezoneOffset(timezone);
    if (!offset) {
      console.error(`Unknown timezone: ${timezone}`);
      return tempDate.toISOString(); // Return a fallback ISO string
    }

    // Convert to UTC by adjusting with the offset
    const utcDate = new Date(
      tempDate.getTime() - parseInt(offset) / 100 * 3600000
    );

    return utcDate.toISOString();
  } catch (error) {
    console.error(`Error parsing date: ${rawDate}`, error);
    return rawDate; // Return raw input if parsing fails
  }
}





export default async function Home() {
    //FetchData Function Code
    if (process.env.NODE_ENV === 'development') {
      console.log("dev mode");
      //return { data: rawDataToData(dummyData)};
    }
    const currentDate = new Date();
    const CLASS_YEAR =
      0 <= currentDate.getMonth() && currentDate.getMonth() <= 6
        ? currentDate.getFullYear() + 4
        : currentDate.getFullYear() + 5;
    const res = await fetch(
      `https://applyingto.college/decision-calendar/class-of-${CLASS_YEAR}`, {next:{revalidate:21600}}
    );
    const html = await res.text();
    const dom = new JSDOM(html);
    const table = dom.window.document.querySelector("table");
    if (!table) {
      throw new Error("No table!");
    }
    const rawData = tableToJson(table);
    const data = rawDataToData(rawData as RawData);

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
