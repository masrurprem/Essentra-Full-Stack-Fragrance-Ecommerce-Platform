// function filtering user account relevant data
export const filterObj = (mainObj, ...allowedFields) => {
  const newObj = {};
  Object.keys(mainObj).forEach((currentField) => {
    if (allowedFields.includes(currentField)) {
      newObj[currentField] = mainObj[currentField];
    }
  });
  return newObj;
};
