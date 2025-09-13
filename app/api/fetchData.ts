//FetchData Code Moved Here!!
import { RawData, Data } from "@/app/api/dummyData";

export function tableToJson(table: HTMLTableElement) {
  const rows = table.querySelectorAll("tr");
  const headers = Array.from(rows[0].querySelectorAll("th")).map(
    (header) => header.textContent || ""
  );

  const jsonData: Record<string, string>[] = [];
  for (let i = 2; i < rows.length; i++) {
    const cells = Array.from(rows[i].querySelectorAll("td"));
    const rowData: Record<string, string> = {};
    cells.forEach((cell, index) => {
      const content = getTextWithSpaces(cell);
      rowData[headers[index]] = content || "";
    });
    jsonData.push(rowData);
  }
  return jsonData;
}

export function getTextWithSpaces(node: Node): string {
  const textArray: string[] = [];

  node.childNodes.forEach((child) => {
    if (child.nodeType === 3) {
      if (child.textContent) {
        const text = child.textContent.trim();
        textArray.push(text);
      }
    } else if (child.nodeType === 1) {
      textArray.push(getTextWithSpaces(child));
    }
  });

  return textArray.join(" ");
}

export function rawDataToData(rawData: RawData): Data {
  const preData: Data = [];
  const ids: string[] = [];
  const timesDuplicateIdOccurred: { [id: string]: number } = {};

  for (const college of rawData) {
    const name = college.Name.startsWith("🎓 ")
      ? college.Name.substring("🎓 ".length)
      : college.Name;

    const dateStr = rawDateToDateString(college["Decision Date"]);
    const date = new Date(dateStr);

    if (!(date instanceof Date && isFinite(+date))) {
      console.warn(`${name} has no valid decision date. Skipping...`);
    }

    let id = name + " " + college.Tag;
    id = id.toLowerCase().replaceAll(" ", "-");

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
      confirmed: college.Status, // updated
      id,
    });
  }

  const data = preData.sort((a, b) => {
    let aD = a.decisionDate;
    let bD = b.decisionDate;
    if (aD.toString().includes(" → ")) aD = aD.split(" → ")[1];
    if (bD.toString().includes(" → ")) bD = bD.split(" → ")[1];
    return new Date(aD).getTime() - new Date(bD).getTime();
  });

  return data;
}

export function rawDateToDateString(rawDate: string): string {
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
    HST: "-1000",
  };

  function getTimezoneOffset(timezone: string): string | null {
    return standardOffsets[timezone] || null;
  }

  try {
    const tzMatch = rawDate.match(/\(([A-Z]+)\)/);
    const timezone = tzMatch ? tzMatch[1] : "PST";
    const cleanDateStr = rawDate.replace(/\s*\([A-Z]+\)/, "");
    const tempDate = new Date(cleanDateStr);

    const offset = getTimezoneOffset(timezone);
    if (!offset) {
      console.error(`Unknown timezone: ${timezone}`);
      return tempDate.toISOString();
    }

    const utcDate = new Date(
      tempDate.getTime() - (parseInt(offset) / 100) * 3600000
    );

    return utcDate.toISOString();
  } catch (error) {
    console.error(`Error parsing date: ${rawDate}`, error);
    return rawDate;
  }
}
