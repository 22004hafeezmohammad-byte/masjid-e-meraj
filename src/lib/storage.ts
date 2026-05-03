export const storage = {
  get: (k: string, d = "") => (typeof window === "undefined" ? d : localStorage.getItem(k) ?? d),
  set: (k: string, v: string) => typeof window !== "undefined" && localStorage.setItem(k, v),
  getBool: (k: string, d = false) => {
    if (typeof window === "undefined") return d;
    const v = localStorage.getItem(k);
    return v === null ? d : v === "true";
  },
  setBool: (k: string, v: boolean) => typeof window !== "undefined" && localStorage.setItem(k, String(v)),
};
