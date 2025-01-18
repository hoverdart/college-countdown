import {allData} from "./api/crons/fetchData";
export type RawData = {
    Name: string;
    Tag: string;
    Confirmed: string;
    "Decision Date": string;
    Notes: string;
  }[];
  
  export type Data = {
    name: string;
    tag: string;
    decisionDate: string;
    notes: string;
    /** Name + tag */
    id: string;
  }[];
const { data } = allData
export { data };