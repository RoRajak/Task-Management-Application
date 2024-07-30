export function createdConverter(createdAt: string) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference = now.getTime() - createdDate.getTime();

  let message = "";
  if (timeDifference < 60 * 1000) {
    message += "just now";
  } else if (timeDifference < 60 * 60 * 1000) {
    message += `${Math.floor(timeDifference / (60 * 1000))} min ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    message += `${Math.floor(timeDifference / (60 * 60 * 1000))} hr ago`;
  } else {
    message += `${Math.floor(timeDifference / (24 * 60 * 60 * 1000))} days ago`;
  }

  return message
}
