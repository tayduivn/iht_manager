export const convertDateTime = (DateTime) => {
  var a = DateTime;
  var b = a
    ? [a.slice(0, 4), "-", a.slice(4, 6), "-", a.slice(6, 8)].join("")
    : null;
  return b;
};
