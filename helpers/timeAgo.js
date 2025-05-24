const timeAgo = (dateString) => {
  const currentDate = new Date();
  const pastDate = new Date(dateString);

  const timeDifference = currentDate - pastDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
};

export default timeAgo;
