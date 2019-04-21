import {compose} from './helpers';

const DAY_MILI_SECONDS = 86400000;

const getDate = timestamp => new Date(timestamp);

const modifyOneCharTime = time => String(time).length < 2 ? `0${time}` : time;

export const formatDepartureTime = compose(
  departureDate => [
    departureDate.getHours(),
    departureDate.getMinutes()
  ].map(modifyOneCharTime).join(':'),
  getDate
);

export const getDateForApi = compose(
  date => [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
  ].map(modifyOneCharTime).join('-'),
  getDate
);

export const formatFilterDate = compose(
  date => [
    date.getDate(),
    date.getMonth() + 1
  ].map(modifyOneCharTime).join('/'),
  getDate
);

export const getTomorrowTimestamp = () => (Date.now() + DAY_MILI_SECONDS);

export const getYesterdayTimestamp = () => (Date.now() - DAY_MILI_SECONDS);

export const compareDates = (a, b) => new Date(a).getDate() - new Date(b).getDate();