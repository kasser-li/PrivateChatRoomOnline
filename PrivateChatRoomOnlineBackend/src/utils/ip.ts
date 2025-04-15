export const getRealIp = (
    headers: any,
    ipHeaders: string[] = [
      "x-true-ip",
      "x-client-ip",
      "wl-proxy-client-ip",
      "remoteip",
      "x-real-ip",
      "x-forwarded-for",
    ]
  ): string | undefined => {
    for (const header of ipHeaders) {
      if (headers[header]) {
        let ip = headers[header];
        if (header === "x-forwarded-for") {
          // x-forwarded-for may contain multiple IPs, we need the first one
          ip = ip.split(",")[0].trim();
        }
        return ip;
      }
    }
    return undefined;
  };
  