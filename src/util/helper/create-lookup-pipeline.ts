export const createLookupPipeline = (
  localField: string,
  refName: string,
  foreignField: string = '_id',
) => {
  return [
    {
      $addFields: {
        [localField]: { $toObjectId: `$${localField}` },
      },
    },
    {
      $lookup: {
        from: refName,
        localField,
        foreignField,
        as: `${localField}s`,
      },
    },
    {
      $addFields: {
        [localField]: {
          $mergeObjects: [{ $arrayElemAt: [`$${localField}s`, 0] }],
        },
      },
    },
    {
      $project: {
        [`${localField}s`]: 0,
      },
    },
  ];
};

// Example usage:
// const supplierLookupPipeline = createLookupPipeline('supplierId', 'users');
// console.log(supplierLookupPipeline);
