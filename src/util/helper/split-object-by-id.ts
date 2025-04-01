type SplitItemsById = {
  itemsToUpdate: any[];
  itemsToCreate: any[];
};

export const splitItemsById = (items: any[]): SplitItemsById => {
  return items.reduce<SplitItemsById>(
    (acc, item) => {
      if (item._id) {
        acc.itemsToUpdate.push(item);
      } else {
        acc.itemsToCreate.push(item);
      }
      return acc;
    },
    { itemsToUpdate: [], itemsToCreate: [] },
  );
};
