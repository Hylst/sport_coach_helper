export const removeDuplicates = <T extends Record<string, any>>(
  newItems: T[],
  existingItems: T[],
  compareFields: Array<keyof T>
): T[] => {
  return newItems.filter((newItem) => {
    return !existingItems.some((existingItem) => {
      return compareFields.every(
        (field) => {
          const newValue = newItem[field];
          const existingValue = existingItem[field];
          
          if (newValue === null || newValue === undefined) {
            return existingValue === null || existingValue === undefined;
          }
          
          if (Array.isArray(newValue) && Array.isArray(existingValue)) {
            return JSON.stringify(newValue.sort()) === JSON.stringify(existingValue.sort());
          }
          
          if (typeof newValue === 'object' && typeof existingValue === 'object') {
            return JSON.stringify(newValue) === JSON.stringify(existingValue);
          }
          
          return newValue === existingValue;
        }
      );
    });
  });
};

export const prepareItemsForImport = <T extends Record<string, any>>(
  items: T[],
  userId: string
): Array<Omit<T, 'id' | 'created_at' | 'updated_at'> & { coach_id: string }> => {
  return items.map(item => {
    const { id, created_at, updated_at, ...rest } = item;
    return {
      ...rest,
      coach_id: userId,
    };
  });
};

export const deduplicationCriteria = {
  clients: ['first_name', 'last_name', 'email'],
  sessions: ['title', 'start_time', 'end_time'],
  workshops: ['title', 'category', 'difficulty'],
  payments: ['client_id', 'payment_date', 'amount'],
} as const;