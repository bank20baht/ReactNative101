export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

export const formatDateFromDB = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

  return `${day}/${month}/${year}`;
};
