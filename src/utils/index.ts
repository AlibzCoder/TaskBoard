export const IsFunction = (o: any) =>
  o && {}.toString.call(o) === "[object Function]";

export const cleanString = (input : string, onlyTrim = false) => {
  if(typeof input === 'string'){
    return onlyTrim ? input.trim() : input.trim().replace(/\s+/g, ' ');
  }
  return input;
}
