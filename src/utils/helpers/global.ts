// Validation function to check for unique names
import { AdminTableFilterInputType } from '@/utils/ts/types/admin-table.types';

export const validateUniqueFilterInputNames = (
  filterInputs: Array<AdminTableFilterInputType>,
): boolean => {
  const names = filterInputs.map(input => input.name);
  const uniqueNames = new Set(names);
  return names.length === uniqueNames.size;
};
