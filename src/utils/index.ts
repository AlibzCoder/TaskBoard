export const IsFunction = (o: any) =>
  o && {}.toString.call(o) === "[object Function]";

export const cleanString = (input: string, onlyTrim = false) => {
  if (typeof input === "string") {
    return onlyTrim ? input.trim() : input.trim().replace(/\s+/g, " ");
  }
  return input;
};
export const fullName = (firstName: string, lastName: string) => `${cleanString(firstName)} ${cleanString(lastName)}`
