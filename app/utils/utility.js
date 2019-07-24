const checkTime = (i: number) => {
  let result = i;
  if (i < 10) {
    result = `0${result}`;
  } // add zero in front of numbers < 10
  return result;
};

const startTime = () => {
  const today = new Date();
  const y = today.getFullYear();
  let mon = today.getMonth();
  mon += 1;
  mon = checkTime(mon);
  let d = today.getDate();
  d = checkTime(d);
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  return `${y}-${mon}-${d} ${h}:${m}:${s}`;
};

const userIdToName = (userId: string, officers: Array) => {
  let name = '';
  officers.forEach(element => {
    if (element.userId === userId) {
      name = element.name;
    }
  });
  if (name === '') {
    name = userId;
  }
  return name;
};

const validateZipCode = (zipCode: string) => {
  const zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
  return zipCodePattern.test(zipCode);
};

const getRandomInt = () => {
  const d = new Date();
  return d.getTime();
};

export default {
  startTime,
  userIdToName,
  validateZipCode,
  getRandomInt,
  checkTime
};
