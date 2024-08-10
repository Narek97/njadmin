// Validation function to check for unique names
import { AdminTableInputType } from '@/utils/ts/types/admin-table.types';

export const validateUniqueFilterInputNames = (
  filterInputs: Array<AdminTableInputType>,
): boolean => {
  const names = filterInputs.map(input => input.name);
  const uniqueNames = new Set(names);
  return names.length === uniqueNames.size;
};
