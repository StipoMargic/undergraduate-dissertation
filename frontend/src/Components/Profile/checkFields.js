// eslint-disable-next-line import/prefer-default-export
export const checkFields = (fields) => {
  if (fields.address === ""){
    return false;
  }

  if (fields.phone === ""){
    return false;
  }

  if (fields.city === ""){
    return false;
  }

  if (fields.email === ""){
    return false;
  }
  return true;
}
