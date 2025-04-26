import type { BoxMagixConfig } from "../../types/jsonBin";
import type { Class } from "../../types/jsonBin";

const headers = {
  accept: "application/json",
  "accept-language": "en",
  "camo-app": "boxmagic",
  "camo-dispositivo": "web",
  "camo-version": "5.19.2",
  "content-type": "application/json",
  priority: "u=1, i",
  "sec-ch-ua": '"Not:A-Brand";v="24", "Chromium";v="134"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  referer: "https://go.boxmagic.app/",
};

export async function bookClass({
  claseId,
  fecha,
  membresiaID,
  pagoID,
  token,
}: {
  claseId: Class["id"];
  fecha: string;
  membresiaID: BoxMagixConfig["membresiaID"];
  pagoID: BoxMagixConfig["pagoID"];
  token: BoxMagixConfig["token"];
}) {
  return fetch("https://mapi.boxmagic.app/api/clase/reservarMultimembresia", {
    method: "POST",
    body: JSON.stringify({
      claseId,
      fecha,
      membresiaID,
      pagoID,
    }),
    headers: { ...headers, authorization: "Bearer " + token },
    referrer: "https://go.boxmagic.app/",
    // referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (data.exito !== undefined && !data.exito)
        throw new Error(JSON.stringify(data));
    });
}
