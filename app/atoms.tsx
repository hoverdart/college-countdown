import { atomWithStorage } from 'jotai/utils';
import {Data} from "./dataArrs"

export const selectedCols = atomWithStorage<string[]>("selectedColleges", []);
export const customCols = atomWithStorage<Data>("customCols", []);
