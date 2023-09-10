export const formatDate = ( now:Date ) => {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
}

export const calculateTimeDifference = (startDate:Date, endDate: Date) => {
  const initialTime = startDate.getTime();
  const finalTime = endDate.getTime();
  
  if (isNaN(initialTime) || isNaN(finalTime)) {
    return "Error: Dates are not valid";
  }

  const timeDifferenceInMilliseconds = finalTime - initialTime;

  const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  let result = "";

  if (days > 0) {
    result += `${days} day(s), `;
  }

  if (hours > 0) {
    result += `${remainingHours} hour(s), `;
  }

  if (minutes > 0) {
    result += `${remainingMinutes} minute(s) and `;
  }

  result += `${remainingSeconds} second(s)`;

  return result;
}
