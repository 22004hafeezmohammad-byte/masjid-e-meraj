export const AYAHS = [
  {
    arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
    roman: "Inna ma'al usri yusra",
    english: "Indeed, with hardship comes ease.",
    ref: "Surah Ash-Sharh 94:6",
  },
  {
    arabic: "وَٱللَّهُ خَيْرُ ٱلرَّٰزِقِينَ",
    roman: "Wallahu khairur raaziqeen",
    english: "And Allah is the best of providers.",
    ref: "Surah Al-Jumu'ah 62:11",
  },
  {
    arabic: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ",
    roman: "Fadhkuruni adhkurkum",
    english: "So remember Me; I will remember you.",
    ref: "Surah Al-Baqarah 2:152",
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    roman: "Wa huwa ma'akum aynama kuntum",
    english: "And He is with you wherever you are.",
    ref: "Surah Al-Hadid 57:4",
  },
  {
    arabic: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ",
    roman: "Hasbunallahu wa ni'mal wakeel",
    english: "Allah is sufficient for us, and He is the best Disposer of affairs.",
    ref: "Surah Al-Imran 3:173",
  },
];

export function ayahOfDay() {
  const day = Math.floor(Date.now() / 86400000);
  return AYAHS[day % AYAHS.length];
}

export const SURAHS = [
  { n: 1, name: "Al-Fatihah", arabic: "ٱلْفَاتِحَة", verses: 7, meaning: "The Opening" },
  { n: 2, name: "Al-Baqarah", arabic: "ٱلْبَقَرَة", verses: 286, meaning: "The Cow" },
  { n: 3, name: "Al-Imran", arabic: "آل عِمْرَان", verses: 200, meaning: "Family of Imran" },
  { n: 4, name: "An-Nisa", arabic: "ٱلنِّسَاء", verses: 176, meaning: "The Women" },
  { n: 36, name: "Ya-Sin", arabic: "يس", verses: 83, meaning: "Ya Sin" },
  { n: 55, name: "Ar-Rahman", arabic: "ٱلرَّحْمٰن", verses: 78, meaning: "The Most Merciful" },
  { n: 67, name: "Al-Mulk", arabic: "ٱلْمُلْك", verses: 30, meaning: "The Sovereignty" },
  { n: 94, name: "Ash-Sharh", arabic: "ٱلشَّرْح", verses: 8, meaning: "The Relief" },
  { n: 112, name: "Al-Ikhlas", arabic: "ٱلْإِخْلَاص", verses: 4, meaning: "The Sincerity" },
  { n: 113, name: "Al-Falaq", arabic: "ٱلْفَلَق", verses: 5, meaning: "The Daybreak" },
  { n: 114, name: "An-Nas", arabic: "ٱلنَّاس", verses: 6, meaning: "Mankind" },
];

export const SURAH_CONTENT: Record<number, { arabic: string; roman: string; english: string }[]> = {
  1: [
    { arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", roman: "Bismillahir Rahmanir Raheem", english: "In the name of Allah, the Most Gracious, the Most Merciful." },
    { arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ", roman: "Alhamdu lillahi Rabbil 'aalameen", english: "All praise is for Allah, Lord of all worlds." },
    { arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", roman: "Ar-Rahmanir Raheem", english: "The Most Gracious, the Most Merciful." },
    { arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ", roman: "Maaliki yawmid Deen", english: "Master of the Day of Judgment." },
    { arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", roman: "Iyyaaka na'budu wa iyyaaka nasta'een", english: "You alone we worship, and You alone we ask for help." },
    { arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", roman: "Ihdinas siraatal mustaqeem", english: "Guide us to the straight path." },
    { arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", roman: "Siraatal lazeena an'amta alaihim ghayril maghdoobi alaihim walad daalleen", english: "The path of those You have blessed—not of those who earned wrath, nor of those who went astray." },
  ],
  112: [
    { arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", roman: "Qul huwallahu Ahad", english: "Say, He is Allah, the One." },
    { arabic: "ٱللَّهُ ٱلصَّمَدُ", roman: "Allahus Samad", english: "Allah, the Eternal Refuge." },
    { arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", roman: "Lam yalid walam yoolad", english: "He neither begets nor is born." },
    { arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", roman: "Walam yakul lahu kufuwan ahad", english: "Nor is there to Him any equivalent." },
  ],
};

export const KALIMAS = [
  { n: 1, name: "Kalima Tayyibah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ", english: "There is no god but Allah, Muhammad is the Messenger of Allah." },
  { n: 2, name: "Kalima Shahadat", arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", english: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger." },
  { n: 3, name: "Kalima Tamjeed", arabic: "سُبْحَانَ ٱللَّٰهِ وَٱلْحَمْدُ لِلَّٰهِ وَلَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَٱللَّٰهُ أَكْبَرُ", english: "Glory be to Allah, all praise to Allah, there is no god but Allah, and Allah is the Greatest." },
];

export const WUDU_STEPS = [
  "Begin with the intention (Niyyah) and say Bismillah.",
  "Wash both hands up to the wrists three times.",
  "Rinse the mouth three times.",
  "Sniff water into the nostrils and blow it out three times.",
  "Wash the face three times from forehead to chin.",
  "Wash both arms up to the elbows three times (right first).",
  "Wipe the head and ears with wet hands once.",
  "Wash both feet up to the ankles three times (right first).",
];

export const NAMAZ_STEPS = [
  "Make intention (Niyyah) for the specific prayer.",
  "Raise both hands and say Allahu Akbar (Takbir).",
  "Recite Surah Al-Fatihah followed by another Surah.",
  "Bow down (Ruku) saying Subhana Rabbiyal Adheem.",
  "Stand back up saying Sami'allahu liman hamidah.",
  "Prostrate (Sujood) saying Subhana Rabbiyal A'la.",
  "Sit briefly, then prostrate again.",
  "After final rakah, recite Tashahhud and end with Salaam.",
];
