import type { BoxMagixConfig } from "../../types/jsonBin";

const mainRoute = "https://api.jsonbin.io/v3";
const configHeaders = {
  "Content-Type": "application/json",
  "X-Bin-Meta": "false",
};

export const boxMagicJsonBinId = "6808da2d8a456b79668f9095";

export async function getBoxMagicJsonBinId(binId = boxMagicJsonBinId) {
  const response = await fetch(`${mainRoute}/b/${binId}`, {
    headers: getHeaders(),
  });
  if (!response.ok)
    throw new Error(`Failed fetching to jsonbin: ${response.status}`);
  return response.json() as Promise<BoxMagixConfig>;
}

export async function putBoxMagicJsonBinId(
  data: BoxMagixConfig,
  binId = boxMagicJsonBinId
) {
  const response = await fetch(`${mainRoute}/b/${binId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error(`Failed fetching to jsonbin: ${response.status}`);
  return response.json() as Promise<BoxMagixConfig>;
}

function getHeaders() {
  return {
    ...getAuthHeaders(),
    ...configHeaders,
  };
}

function getAuthHeaders() {
  const masterKey = window.sessionStorage.getItem("jsonbin-master-key");
  const accessKey = window.sessionStorage.getItem("jsonbin-access-key");

  if (!masterKey || !accessKey)
    throw new Error("No master key or access key found for jsonbin auth");

  return {
    "X-Master-Key": masterKey,
    "X-Access-Key": accessKey,
  };
}
