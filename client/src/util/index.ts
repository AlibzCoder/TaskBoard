export const IsRegEx = (o: any) =>
  o && {}.toString.call(o) === "[object RegExp]";
export const IsArray = (o: any) =>
  o && {}.toString.call(o) === "[object Array]";
export const IsFunction = (o: any) =>
  o && {}.toString.call(o) === "[object Function]";
export const IsObj = (o: any) =>
  o !== null && typeof o === "object" && !(o instanceof Array);
export const IsNumber = (o: any) =>
  typeof o == "number" || (typeof o == "object" && o.constructor === Number);
export const IsValidDate = (o: any) => !isNaN(o) && o instanceof Date;
export const Truncate = (input: string, limit: number) =>
  typeof input === "string" && IsNumber(limit) && input.length > limit
    ? `${input.substring(0, limit)}...`
    : input;
export const IsDomElement = (el: any) =>
  el instanceof Element || el instanceof HTMLElement;

export function getRelativeDate(targetDate : string | Date) {
  if (typeof targetDate == "string") targetDate = new Date(targetDate);
  if (!IsValidDate(targetDate)) return;

  const timeDifference = Math.round((new Date().getTime() - targetDate.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;

  if (timeDifference < minute) {
    return "just now";
  } else if (timeDifference < hour) {
    return (
      Math.floor(timeDifference / minute) +
      ` minute${timeDifference < 2 * minute ? "" : "s"} ago`
    );
  } else if (Math.floor(timeDifference / hour) == 1) {
    return "an hour ago";
  } else if (timeDifference < day) {
    return Math.floor(timeDifference / hour) + " hours ago";
  } else if (timeDifference < day * 2) {
    return "yesterday";
  } else if (timeDifference < week) {
    return Math.floor(timeDifference / day) + " days ago";
  } else if (Math.floor(timeDifference / week) == 1) {
    return "1 week ago";
  } else if (timeDifference < month) {
    return Math.floor(timeDifference / week) + " weeks ago";
  } else if (Math.floor(timeDifference / month) == 1) {
    return "1 month ago";
  } else if (timeDifference < year) {
    return Math.floor(timeDifference / month) + " months ago";
  } else {
    return formatDate(targetDate, "mm/dd/yyyy");
  }
}

export function formatDate(targetDate: string | Date, dateFormat: string) {
  if (typeof targetDate == "string") targetDate = new Date(targetDate);
  if (!IsValidDate(targetDate)) return;

  let options = {};
  switch (dateFormat) {
    case "mm/dd/yyyy":
      options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return toDate(targetDate, options, "@m/@d/@y");
    case "m d, y":
      options = { day: "2-digit", month: "long", year: "numeric" };
      return toDate(targetDate, options, "@m @d, @y");
    default:
      return;
  }
}

export function toDate(
  date: string | Date | undefined,
  options: Intl.DateTimeFormatPartTypesRegistry | object,
  datePattern: string
) {
  if (typeof date == "string") date = new Date(date);
  if (!IsValidDate(date)) return;

  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  const dateValue = dateTimeFormat.formatToParts(date);
  const formattedDate = dateValue.reduce((newDateString, i) => {
    return newDateString.replace(`@${i.type[0]}`, i.value);
  }, datePattern);
  return formattedDate;
}
export function capitalizeFirstLetter(str : string) {
  if(typeof str === 'string' && str.length > 1) return str[0].toUpperCase() + str.slice(1);
  return str;
}