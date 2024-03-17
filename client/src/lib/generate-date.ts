const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1 and pad with leading zero if necessary
  const day = today.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default getCurrentDate;
