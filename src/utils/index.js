// export const getDateDifferenceFromNow = (fromDate) => {
//   let difference = new Date().getTime() - new Date(fromDate).getTime();

//   difference = difference / 1000;
//   let hourDifference = Math.floor(difference / 3600);
//   difference -= hourDifference * 3600;
//   let minuteDifference = Math.floor(difference / 60);
//   difference -= minuteDifference * 60;

//   let message;

//   if (hourDifference > 0) {
//     message = `${hourDifference} hour`;
//   }

//   if (minuteDifference > 0) {
//     message = message
//       ? `${message} ${minuteDifference} minutes`
//       : `${minuteDifference} minutes`;
//   }

//   if (difference) {
//     message = message
//       ? `${message} ${Math.round(difference)} seconds`
//       : `${Math.round(difference)} seconds`;
//   }

//   return message;
// };

export const getDateDifferenceFromNow = (fromDate) => {
  const now = new Date();
  const then = new Date(fromDate);

  let diffInSeconds = Math.floor((now - then) / 1000);

  const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
  diffInSeconds %= 365 * 24 * 60 * 60;

  const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
  diffInSeconds %= 30 * 24 * 60 * 60;

  const days = Math.floor(diffInSeconds / (24 * 60 * 60));
  diffInSeconds %= 24 * 60 * 60;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  diffInSeconds %= 60 * 60;

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;

  const parts = [];

  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0 || parts.length === 0)
    parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

  return parts.join(" ");
};
