export const formatDateAs11thMonth = (t) => {
  const currentDate = new Date(t);
  const day = currentDate.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = monthNames[currentDate.getMonth()];
  const dayName = daysOfWeek[currentDate.getDay()];

  // Function to add the ordinal suffix to the day (e.g., 1st, 2nd, 3rd)
  const getOrdinalSuffix = (number) => {
    if (number >= 11 && number <= 13) {
      return `${number}th`;
    }
    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return `${number}st`;
      case 2:
        return `${number}nd`;
      case 3:
        return `${number}rd`;
      default:
        return `${number}th`;
    }
  };

  const formattedDate = `${dayName}, ${month} ${getOrdinalSuffix(
    day
  )} ${currentDate.getFullYear()}`;
  return formattedDate;
};

export const formatTimeFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "PM" : "AM";

  const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;
  return formattedTime;
};

function formatTimeUnit(value, unit) {
  return `${value} ${unit}${value !== 1 ? "s" : ""}`;
}

export const calculateTimeElapsed = (elapsedTime) => {
  // Calculate elapsed time in milliseconds

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  return `${hours ? formatTimeUnit(hours, "hour") : " "} ${
    minutes ? formatTimeUnit(minutes, "minute") : ""
  } ${seconds ? formatTimeUnit(seconds, "second") : ""}`;
};
