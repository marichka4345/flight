const modifyOneCharTime = time => String(time).length < 2 ? `0${time}` : time;

export const formatDepartureTime = time => {
  const departureTime = new Date(time);
  const hours = departureTime.getHours();
  const minutes = departureTime.getMinutes();
  return [hours, minutes].map(modifyOneCharTime).join(':');
};

export const getDateForApi = () => {
  const todayDate = new Date();
  const day = todayDate.getDate();
  const month = todayDate.getMonth() + 1;
  const year = todayDate.getFullYear();
  return [day, month, year].map(modifyOneCharTime).join('-');
};