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

export const formatMonthYeartoDB = (dateString: any) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Get the current month (1-indexed)
  const year = date.getFullYear();
  const monthFormatted = month < 10 ? `0${month}` : `${month}`;

  return `${year}-${monthFormatted}`;
};

export const readableDate = (dateString: any) => {
  const now = new Date(dateString);
  const month = now.toLocaleString('default', {month: 'long'});
  const year = now.getFullYear();
  return `${month} ${year}`;
};
