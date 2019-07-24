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

const ping = (machineId: string) =>
  apiFetch(`/serv/electron602/insertPing.php?&deviceId=${machineId}`);

const getLoader = () => apiFetch('/serv/electron602/loader.php');

const getLastTimeClockEntry = () =>
  apiFetch(`/serv/electron602/getLastTimeclockEntry.php`);

const uploadTimeClock = (formData: Object) =>
  apiFetch(`/serv/electron602/uploadTimeclock.php`, {
    method: 'POST',
    body: formData
  });

const sendGps = (lat: number, lon: number, speed: number) =>
  apiFetch(
    `/serv/electron602/insertPosition.php?lat=${lat}&lon=${lon}&speed=${speed}`
  );

const getPassdownLogs = (
  districtId: number,
  accountId: number,
  status: string,
  daysAgo: number
) =>
  apiFetch(
    `/serv/electron602/getPassdown.php?districtId=${districtId}&status=${status}&accountId=${accountId}&daysAgo=${daysAgo}`
  );

const savePassdownLog = (
  excerpt: string,
  districtId: number,
  accountId: number,
  status: string,
  priority: string,
  recordId: string
) => {
  const formData = new URLSearchParams();
  formData.append('accountId', accountId);
  formData.append('status', status);
  formData.append('priority', priority);
  formData.append('excerpt', excerpt);
  formData.append('recordId', recordId);

  const endpoint = recordId ? 'updatePassdown' : 'insertPassdown';

  return apiFetch(`/serv/electron602/${endpoint}.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  });
};

const requestSuperVisor = (callbackNumber: string) => {
  const formData = new URLSearchParams();
  formData.append('callbackNumber', callbackNumber);

  return apiFetch(`/serv/electron602/insertSupervisorRequest.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  });
};

const setStatus = (status: string, lat: string, lon: string) => {
  const formData = new URLSearchParams();
  formData.append('status', status);
  formData.append('lat', lat);
  formData.append('lon', lon);

  return apiFetch(`/serv/electron602/insertStatus.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  });
};

const getChatHistory = (userId: string) =>
  apiFetch(
    `/serv/electron602/getChatHistory.php?command=chatHistory&chatId=${userId}`
  );

const getTowStatus = (plate: string, accountId: number) =>
  apiFetch(
    `/serv/electron602/getTowStatus.php?plate=${plate}&accountId=${accountId}`
  );

const getPostOrders = (
  district: string,
  accountId: string,
  address: string,
  city: string
) =>
  apiFetch(
    `/serv/electron602/getPostOrders.php?district=${district}&accountId=${accountId}&address=${address}&city=${city}`
  );

const searchProfiles = (
  firstName: string,
  lastName: string,
  dlNumber: string,
  propertyCardId: string
) =>
  apiFetch(
    `/serv/electron602/searchProfiles.php?fname=${firstName}&lname=${lastName}&dlnumber=${dlNumber}&propertyCardId=${propertyCardId}`
  );

const getProfileInfos = (profileId: string) =>
  apiFetch(`/serv/electron602/getProfile.php?profileId=${profileId}`);

const getProfileImage = (profileId: string) =>
  apiFetch(`/serv/electron602/getProfileImage.php?profileId=${profileId}`);

const getPostOrderDetails = (accountId: string) =>
  apiFetch(`/serv/electron602/getPostOrderDetails.php?accountId=${accountId}`);

export default {
  getLoader,
  getSetting,
  login,
  ping,
  getLastTimeClockEntry,
  uploadTimeClock,
  sendGps,
  getPassdownLogs,
  savePassdownLog,
  requestSuperVisor,
  setStatus,
  getChatHistory,
  getTowStatus,
  getPostOrders,
  searchProfiles,
  getProfileInfos,
  getProfileImage,
  getPostOrderDetails
};
