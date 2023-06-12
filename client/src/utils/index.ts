export const checkIfImageUrlIsValid = (
  url: string,
  callback: (url: string, isValid: boolean) => Promise<void>,
  timeout?: number
) => {
  timeout = timeout || 5000;
  var timedOut = false,
    timer: NodeJS.Timeout;
  var img = new Image();
  img.onerror = img.onabort = function () {
    if (!timedOut) {
      clearTimeout(timer);
      callback(url, false);
    }
  };
  img.onload = function () {
    if (!timedOut) {
      clearTimeout(timer);
      callback(url, true);
    }
  };
  img.src = url;
  timer = setTimeout(function () {
    timedOut = true;
    // reset .src to invalid URL so it stops previous
    // loading, but doesn't trigger new load
    img.src = "//!!!!/test.jpg";
    callback(url, false);
  }, timeout);
};
// export const checkIfImageUrlIsValid = (
//   url: string,
//   callback: (isValid: boolean) => void
// ) => {
//   // console.log("check: ", url);
//   // const img = new Image();
//   // img.src = url;

//   // img.onload = () => callback(true);
//   // img.onerror = () => callback(false);
// };

export const daysLeft = (deadline: string) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};
