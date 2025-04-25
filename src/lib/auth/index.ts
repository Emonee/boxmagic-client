const sessionStorageKeys = {
  jsonbinMasterKey: "jsonbin-master-key",
  jsonbinAccessKey: "jsonbin-access-key",
};

export function setAuth() {
  const searchString = window.location.search;
  const urlParams = new URLSearchParams(searchString);
  const masterKey = urlParams.get(sessionStorageKeys.jsonbinMasterKey);
  const accessKey = urlParams.get(sessionStorageKeys.jsonbinAccessKey);

  if (!masterKey || !accessKey) return;

  window.sessionStorage.setItem(sessionStorageKeys.jsonbinMasterKey, masterKey);
  window.sessionStorage.setItem(sessionStorageKeys.jsonbinAccessKey, accessKey);
}
