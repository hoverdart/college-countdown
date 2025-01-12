import { atomWithStorage } from 'jotai/utils';
export const selectedCols = atomWithStorage<string[]>("selectedColleges", []);
