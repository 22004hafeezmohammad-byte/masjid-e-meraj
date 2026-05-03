// AlQuran Cloud API integration
const BASE = "https://api.alquran.cloud/v1";

export interface SurahMeta {
  number: number;
  name: string; // arabic
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface AyahFull {
  number: number;
  numberInSurah: number;
  arabic: string;
  urdu: string;
  romanUrdu?: string;
}

async function fetchJson(url: string, retries = 2): Promise<any> {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      if (j.code !== 200) throw new Error(j.status || "API error");
      return j.data;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  throw lastErr;
}

export async function fetchSurahList(): Promise<SurahMeta[]> {
  return fetchJson(`${BASE}/surah`);
}

export async function fetchSurah(n: number): Promise<{ meta: SurahMeta; ayahs: AyahFull[] }> {
  const data = await fetchJson(
    `${BASE}/surah/${n}/editions/quran-uthmani,ur.jalandhry`,
  );
  const [arabicEd, urduEd] = data;
  const meta: SurahMeta = {
    number: arabicEd.number,
    name: arabicEd.name,
    englishName: arabicEd.englishName,
    englishNameTranslation: arabicEd.englishNameTranslation,
    numberOfAyahs: arabicEd.numberOfAyahs,
    revelationType: arabicEd.revelationType,
  };
  const ayahs: AyahFull[] = arabicEd.ayahs.map((a: any, i: number) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    arabic: a.text,
    urdu: urduEd.ayahs[i]?.text ?? "",
    romanUrdu: undefined, // Roman Urdu not provided by AlQuran Cloud — placeholder shown in UI
  }));
  return { meta, ayahs };
}
