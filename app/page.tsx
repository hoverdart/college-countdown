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
      continue;
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
      id,
    });
  }
  const data = preData.sort((a, b) => {
    const dateA = new Date(a.decisionDate).getTime(); // Fallback to 0 for invalid dates
    const dateB = new Date(b.decisionDate).getTime();
    return dateA - dateB;
  });
  return data;
}

function rawDateToDateString(rawDate: string): string {
  const standardOffsets = {
    EST: "-0500",
    CST: "-0600",
    MST: "-0700",
    PST: "-0800",
    AKST: "-0900",
    HST: "-1000", // Hawaii doesn't observe DST
  };

  function isDST(date: Date, timezone: string) {
    if (timezone !== "EST" && timezone !== "EDT") {
      return false; // DST check only for EST/EDT
    }

    // Get year from date
    const year = date.getFullYear();

    // DST starts second Sunday in March
    const dstStart = new Date(year, 2, 1); // March 1
    dstStart.setDate(1 + ((14 - dstStart.getDay()) % 7) + 7); // Second Sunday

    // DST ends first Sunday in November
    const dstEnd = new Date(year, 10, 1); // November 1
    dstEnd.setDate(1 + ((7 - dstEnd.getDay()) % 7)); // First Sunday

    // Check if date is within DST period
    return date >= dstStart && date < dstEnd;
  }

  function getTimezoneOffset(
    timezone: keyof typeof standardOffsets,
    date: Date
  ) {
    if (timezone === "HST") return standardOffsets.HST; // Hawaii doesn't do DST

    const standardOffset = standardOffsets[timezone];
    if (!standardOffset) return null;

    // During DST, move forward one hour (subtract 1 from offset)
    return isDST(date, timezone)
      ? `${standardOffset.slice(0, 1)}${String(
          parseInt(standardOffset.slice(1)) - 100
        ).padStart(4, "0")}`
      : standardOffset;
  }

  try {
    // Assume PST if no timezone is provided
    const tzMatch = rawDate.match(/\(([A-Z]+)\)/);
    const timezone = tzMatch ? tzMatch[1] : "PST"; // Default to PST if no timezone info
    const cleanDateStr = rawDate.replace(/\s*\([A-Z]+\)/, "");

    // First create a date object without timezone to get the date
    const tempDate = new Date(cleanDateStr);

    // Now get the correct offset based on the date
    const offset = getTimezoneOffset(
      timezone as keyof typeof standardOffsets,
      tempDate
    );
    if (!offset) {
      console.error(`Unknown timezone: ${timezone}`);
      return new Date(cleanDateStr).toISOString(); // Return a fallback ISO string
    }

    // Adjust the date string by adding the correct time zone offset (PST assumed)
    return new Date(`${cleanDateStr} GMT${offset}`).toISOString();
  } catch (error) {
    console.error(`Error parsing date: ${rawDate}`, error);
    return rawDate; // Return the raw input if it cannot be parsed
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
      `https://applyingto.college/decision-calendar/class-of-${CLASS_YEAR}`, {next:{revalidate:86400}}
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
      <div className="p-6 font-[family-name:var(--font-geist-sans)]">
          <CollegeTable decisions = {data} />
        </div>
      </>
    );
};
