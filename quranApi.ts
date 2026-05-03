// AlQuran Cloud API integration
const BASE = "https://api.alquran.cloud/v1";
const SURAH_COUNT = 114;

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

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

interface ApiAyah {
  number: number;
  numberInSurah: number;
  text: string;
}

interface ApiSurah extends SurahMeta {
  ayahs?: ApiAyah[];
}

async function fetchJson<T>(url: string, retries = 2): Promise<T> {
  let lastErr: unknown;

  for (let i = 0; i <= retries; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);

      const j = (await r.json()) as ApiResponse<T>;
      if (j.code !== 200) throw new Error(j.status || "API error");

      return j.data;
    } catch (e) {
      lastErr = e;
      if (i < retries) {
        await new Promise((resolve) => setTimeout(resolve, 400 * (i + 1)));
      }
    }
  }

  throw lastErr;
}

function assertValidSurahNumber(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > SURAH_COUNT) {
    throw new Error("Invalid Surah number");
  }
}

export async function fetchSurahList(): Promise<SurahMeta[]> {
  const surahs = await fetchJson<SurahMeta[]>(`${BASE}/surah`);

  if (!Array.isArray(surahs) || surahs.length !== SURAH_COUNT) {
    throw new Error("Failed to load all Surahs");
  }

  return [...surahs].sort((a, b) => a.number - b.number);
}

export async function fetchSurah(n: number): Promise<{ meta: SurahMeta; ayahs: AyahFull[] }> {
  assertValidSurahNumber(n);

  const data = await fetchJson<ApiSurah[]>(
    `${BASE}/surah/${n}/editions/quran-uthmani,ur.jalandhry`,
  );

  if (!Array.isArray(data) || data.length < 2) {
    throw new Error("Failed to load Surah editions");
  }

  const [arabicEd, urduEd] = data;
  if (!Array.isArray(arabicEd.ayahs) || arabicEd.ayahs.length === 0) {
    throw new Error("Failed to load Ayahs");
  }

  const urduByAyah = new Map(
    (urduEd.ayahs ?? []).map((ayah) => [ayah.numberInSurah, ayah.text]),
  );

  const meta: SurahMeta = {
    number: arabicEd.number,
    name: arabicEd.name,
    englishName: arabicEd.englishName,
    englishNameTranslation: arabicEd.englishNameTranslation,
    numberOfAyahs: arabicEd.numberOfAyahs,
    revelationType: arabicEd.revelationType,
  };

  const ayahs: AyahFull[] = arabicEd.ayahs.map((a) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    arabic: a.text,
    urdu: urduByAyah.get(a.numberInSurah) ?? "",
    romanUrdu: undefined, // Roman Urdu not provided by AlQuran Cloud - placeholder shown in UI
  }));

  return { meta, ayahs };
}
