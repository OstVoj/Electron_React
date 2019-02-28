const getSetting = (userId: string, companyId: string) =>
  fetch(`${process.env.API_BASE_URL}?username=${userId}&cid=${companyId}`);

const login = (
  userId: string,
  password: string,
  companyId: string,
  machineId: string,
  httpHost: void
) =>
  fetch(
    `https://${httpHost}/serv/electron602/authenticate.php?userId=${userId}&password=${password}&cid=${companyId}&version=VERSION6&fingerprint=${machineId}`
  );

const ping = (
  httpHost: string,
  userId: string,
  password: string,
  companyId: string,
  machineId: string
) =>
  fetch(
    `https://${httpHost}/serv/electron602/insertPing.php?userId=${userId}&password=${password}&cid=${companyId}&deviceId=${machineId}`
  );

const getLoader = (
  httpHost: string,
  userId: string,
  password: string,
  companyId: string
) =>
  fetch(
    `https://${httpHost}/serv/electron602/loader.php?userId=${userId}&password=${password}&cid=${companyId}`
  );

const getLastTimeClockEntry = (
  httpHost: string,
  userId: string,
  password: string,
  companyId: string
) =>
  fetch(
    `https://${httpHost}/serv/electron602/getLastTimeclockEntry.php?userId=${userId}&password=${password}&cid=${companyId}`
  );

const uploadTimeClock = (httpHost: string, formData: Object) =>
  fetch(`https://${httpHost}/serv/electron602/uploadTimeclock.php`, {
    method: 'POST',
    body: formData
  });

export default {
  getLoader,
  getSetting,
  login,
  ping,
  getLastTimeClockEntry,
  uploadTimeClock
};
