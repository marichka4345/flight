const THREE_HOURS_MILI_SECONDS = 3 * 60 * 60 * 1000;

const calculateDateDiff = time => {
  const now = Date.now();
  const timeToSend = new Date(time) - THREE_HOURS_MILI_SECONDS;
  return timeToSend - now;
};

const sendNotification = (status, time) => {
  const timeDiff = calculateDateDiff(time);

  if (status === 'DP') {
    new Notification('Sorry, this plane has already departured');
    return;
  }


  if (timeDiff > 0) {
    setTimeout(() => {
      new Notification('Your flight is in 3 hours!');
    }, timeDiff);
  } else {
    new Notification('You need to hurry! This flight is in less than 3 hours!');
  }
};

export const notifyMe = ({timeDepShedule, status}) => {
  if (!('Notification' in window)) {
    return;
  }

  else if (Notification.permission === 'granted') {
    sendNotification(status, timeDepShedule);
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        sendNotification(status, timeDepShedule);
      }
    });
  }
};