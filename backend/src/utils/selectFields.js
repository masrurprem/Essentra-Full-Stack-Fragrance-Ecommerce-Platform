export const createFieldsObj = (fieldStr) => {
  const fArray = fieldStr.split(",").map((el) => el.trim());
  let fieldsObj = {};
  fArray.forEach((field) => {
    fieldsObj[field] = true;
  });
  return fieldsObj;
};

//
