export type ArizaHolati = "Yangi" | "Ko'rib chiqilmoqda" | "Tasdiqlangan" | "Rad etilgan";

export type ShaxsiyMalumot = {
  toliqIsm: string;
  rasm: string;
  tugilganSana: string;
  jinsi: string;
  telefon: string;
  jshshir: string;
  lavozim: string;
  tajriba: string;
};

export type OilaAzosi = {
  ism: string;
  qarindoshlik: string;
  holati: "Tirik" | "Vafot etgan";
  faoliyatTuri: string;
  tashkilot: string;
  bolimYokiSinf: string;
  lavozimYokiDaraja: string;
};

export type IshLavozimi = {
  lavozim: string;
  boshlangan: string;
  tugagan: string;
  davomiylik: string;
  ortachaOylikDaromad: number;
};

export type IshTarixi = {
  tashkilot: string;
  logotipRangi: string;
  soha: string;
  bandlikTuri: string;
  umumiyDavomiylik: string;
  joylashuv: string;
  lavozimlar: IshLavozimi[];
  konikmalar?: string;
};

export type DaromadAnalitika = {
  engBalandDaromad: number;
  ortachaDaromad: number;
};

export type TalimBosqichi = {
  tur: string;
  muassasa: string;
  yonalish: string;
  daraja: string;
  boshlangan: string;
  tugagan: string;
  holati: string;
};

export type TalimMalumoti = {
  hozirgiDaraja: string;
  tarix: TalimBosqichi[];
};

export type ArizaInput = {
  toliqIsm: string;
  jshshir: string;
  telefon: string;
  lavozim: string;
  tajriba: string;
};

export type ArizaRecord = {
  id: string;
  yuborilganSana: string;
  holat: ArizaHolati;
  shaxsiyMalumot: ShaxsiyMalumot;
  oilaAzolari: OilaAzosi[];
  ishTarixi: IshTarixi[];
  talimMalumoti: TalimMalumoti;
};

export type AnalyticsSnapshot = {
  jami: number;
  yangi: number;
  koribChiqilmoqda: number;
  tasdiqlangan: number;
};

const seededApplications: ArizaRecord[] = [
  {
    id: "AR-1001",
    yuborilganSana: "2026-04-08",
    holat: "Ko'rib chiqilmoqda",
    shaxsiyMalumot: {
      toliqIsm: "Aziza Karimova",
      rasm: "/person-woman.png",
      tugilganSana: "1997-05-14",
      jinsi: "Ayol",
      telefon: "+998901112233",
      jshshir: "39705141234567",
      lavozim: "Frontend dasturchi",
      tajriba: "React, TypeScript, Next.js bo'yicha 4 yillik tajriba",
    },
    oilaAzolari: [
      {
        ism: "Karimov Sherzod",
        qarindoshlik: "Otasi",
        holati: "Tirik",
        faoliyatTuri: "Ishlaydi",
        tashkilot: "Orient Construction",
        bolimYokiSinf: "Ta'minot bo'limi",
        lavozimYokiDaraja: "Bo'lim boshlig'i",
      },
      {
        ism: "Karimova Dilfuza",
        qarindoshlik: "Onasi",
        holati: "Tirik",
        faoliyatTuri: "Ishlaydi",
        tashkilot: "234-maktab",
        bolimYokiSinf: "Boshlang'ich ta'lim kafedrasi",
        lavozimYokiDaraja: "O'qituvchi",
      },
    ],
    ishTarixi: [
      {
        tashkilot: "Softline Group",
        logotipRangi: "#dbeafe",
        soha: "Mahsulot ishlab chiqish kompaniyasi",
        bandlikTuri: "To'liq stavka",
        umumiyDavomiylik: "3 yil 2 oy",
        joylashuv: "Toshkent, O'zbekiston",
        lavozimlar: [
          {
            lavozim: "Frontend dasturchi",
            boshlangan: "Fev 2023",
            tugagan: "Hozirgacha",
            davomiylik: "2 yil 2 oy",
            ortachaOylikDaromad: 18000000,
          },
          {
            lavozim: "Junior frontend dasturchi",
            boshlangan: "Mar 2022",
            tugagan: "Yan 2023",
            davomiylik: "11 oy",
            ortachaOylikDaromad: 14000000,
          },
        ],
        konikmalar: "React, Next.js, TypeScript, Design system",
      },
      {
        tashkilot: "Pixel Studio",
        logotipRangi: "#f3f4f6",
        soha: "Raqamli agentlik",
        bandlikTuri: "To'liq stavka",
        umumiyDavomiylik: "1 yil 8 oy",
        joylashuv: "Toshkent, O'zbekiston",
        lavozimlar: [
          {
            lavozim: "Stajyor frontend dasturchi",
            boshlangan: "Iyl 2020",
            tugagan: "Fev 2022",
            davomiylik: "1 yil 8 oy",
            ortachaOylikDaromad: 9000000,
          },
        ],
      },
    ],
    talimMalumoti: {
      hozirgiDaraja: "Oliy ma'lumotli",
      tarix: [
        {
          tur: "Oliy ta'lim",
          muassasa: "Toshkent axborot texnologiyalari universiteti",
          yonalish: "Dasturiy injiniring",
          daraja: "Bakalavr",
          boshlangan: "2015",
          tugagan: "2019",
          holati: "Tamomlagan",
        },
        {
          tur: "O'rta maxsus ta'lim",
          muassasa: "Toshkent axborot texnologiyalari kolleji",
          yonalish: "Axborot texnologiyalari",
          daraja: "Diplom",
          boshlangan: "2012",
          tugagan: "2015",
          holati: "Tamomlagan",
        },
        {
          tur: "O'rta ta'lim",
          muassasa: "190-maktab",
          yonalish: "Umumiy o'rta ta'lim",
          daraja: "Attestat",
          boshlangan: "2003",
          tugagan: "2012",
          holati: "Tamomlagan",
        },
      ],
    },
  },
  {
    id: "AR-1002",
    yuborilganSana: "2026-04-07",
    holat: "Yangi",
    shaxsiyMalumot: {
      toliqIsm: "Javohir Tursunov",
      rasm: "/person-man.png",
      tugilganSana: "2000-09-02",
      jinsi: "Erkak",
      telefon: "+998935556677",
      jshshir: "30009021234567",
      lavozim: "Backend dasturchi",
      tajriba: "Node.js va PostgreSQL bilan 2 yillik tajriba",
    },
    oilaAzolari: [
      {
        ism: "Tursunov Ulug'bek",
        qarindoshlik: "Otasi",
        holati: "Tirik",
        faoliyatTuri: "Ishlaydi",
        tashkilot: "Samarqand Qurilish Servis",
        bolimYokiSinf: "Loyiha bo'limi",
        lavozimYokiDaraja: "Muhandis",
      },
      {
        ism: "Tursunova Mohira",
        qarindoshlik: "Singlisi",
        holati: "Tirik",
        faoliyatTuri: "O'quvchi",
        tashkilot: "42-maktab",
        bolimYokiSinf: "10-sinf",
        lavozimYokiDaraja: "O'quvchi",
      },
    ],
    ishTarixi: [
      {
        tashkilot: "DevHouse",
        logotipRangi: "#e0f2fe",
        soha: "Dasturiy ta'minot ishlab chiqish",
        bandlikTuri: "To'liq stavka",
        umumiyDavomiylik: "1 yil 3 oy",
        joylashuv: "Samarqand, O'zbekiston",
        lavozimlar: [
          {
            lavozim: "Junior backend dasturchi",
            boshlangan: "Yan 2024",
            tugagan: "Hozirgacha",
            davomiylik: "1 yil 3 oy",
            ortachaOylikDaromad: 12000000,
          },
        ],
        konikmalar: "Node.js, PostgreSQL, Docker",
      },
    ],
    talimMalumoti: {
      hozirgiDaraja: "Oliy ma'lumotli",
      tarix: [
        {
          tur: "Oliy ta'lim",
          muassasa: "Samarqand davlat universiteti",
          yonalish: "Amaliy matematika va informatika",
          daraja: "Bakalavr",
          boshlangan: "2019",
          tugagan: "2023",
          holati: "Tamomlagan",
        },
        {
          tur: "O'rta ta'lim",
          muassasa: "15-maktab",
          yonalish: "Umumiy o'rta ta'lim",
          daraja: "Attestat",
          boshlangan: "2008",
          tugagan: "2019",
          holati: "Tamomlagan",
        },
      ],
    },
  },
  {
    id: "AR-1003",
    yuborilganSana: "2026-04-06",
    holat: "Tasdiqlangan",
    shaxsiyMalumot: {
      toliqIsm: "Malika Sobirova",
      rasm: "/person-woman.png",
      tugilganSana: "1995-12-21",
      jinsi: "Ayol",
      telefon: "+998998887766",
      jshshir: "29512211234567",
      lavozim: "QA avtomatlashtirish muhandisi",
      tajriba: "QA automation va API test bo'yicha 6 yillik tajriba",
    },
    oilaAzolari: [
      {
        ism: "Sobirov Akmal",
        qarindoshlik: "Turmush o'rtog'i",
        holati: "Tirik",
        faoliyatTuri: "Ishlaydi",
        tashkilot: "Agrobank",
        bolimYokiSinf: "Risklarni boshqarish bo'limi",
        lavozimYokiDaraja: "Yetakchi mutaxassis",
      },
      {
        ism: "Sobirova Muslima",
        qarindoshlik: "Qizi",
        holati: "Tirik",
        faoliyatTuri: "O'quvchi",
        tashkilot: "3-maktab",
        bolimYokiSinf: "2-sinf",
        lavozimYokiDaraja: "O'quvchi",
      },
    ],
    ishTarixi: [
      {
        tashkilot: "Quality Lab",
        logotipRangi: "#dcfce7",
        soha: "QA va test avtomatlashtirish",
        bandlikTuri: "To'liq stavka",
        umumiyDavomiylik: "4 yil 1 oy",
        joylashuv: "Buxoro, O'zbekiston",
        lavozimlar: [
          {
            lavozim: "Senior QA avtomatlashtirish muhandisi",
            boshlangan: "Mar 2022",
            tugagan: "Hozirgacha",
            davomiylik: "3 yil 1 oy",
            ortachaOylikDaromad: 22000000,
          },
          {
            lavozim: "QA avtomatlashtirish muhandisi",
            boshlangan: "Mar 2021",
            tugagan: "Fev 2022",
            davomiylik: "1 yil",
            ortachaOylikDaromad: 19000000,
          },
        ],
        konikmalar: "Playwright, Cypress, API testing, CI/CD",
      },
      {
        tashkilot: "Global Apps",
        logotipRangi: "#f3f4f6",
        soha: "Outsource kompaniya",
        bandlikTuri: "To'liq stavka",
        umumiyDavomiylik: "2 yil 2 oy",
        joylashuv: "Toshkent, O'zbekiston",
        lavozimlar: [
          {
            lavozim: "QA muhandis",
            boshlangan: "Yan 2019",
            tugagan: "Fev 2021",
            davomiylik: "2 yil 2 oy",
            ortachaOylikDaromad: 15000000,
          },
        ],
      },
    ],
    talimMalumoti: {
      hozirgiDaraja: "Magistr",
      tarix: [
        {
          tur: "Oliy ta'lim",
          muassasa: "Buxoro davlat universiteti",
          yonalish: "Axborot texnologiyalari",
          daraja: "Magistr",
          boshlangan: "2017",
          tugagan: "2019",
          holati: "Tamomlagan",
        },
        {
          tur: "Oliy ta'lim",
          muassasa: "TATU Buxoro filiali",
          yonalish: "Kompyuter injiniringi",
          daraja: "Bakalavr",
          boshlangan: "2013",
          tugagan: "2017",
          holati: "Tamomlagan",
        },
        {
          tur: "O'rta maxsus ta'lim",
          muassasa: "Buxoro axborot texnologiyalari kolleji",
          yonalish: "Axborot tizimlari",
          daraja: "Diplom",
          boshlangan: "2010",
          tugagan: "2013",
          holati: "Tamomlagan",
        },
        {
          tur: "O'rta ta'lim",
          muassasa: "8-maktab",
          yonalish: "Umumiy o'rta ta'lim",
          daraja: "Attestat",
          boshlangan: "2001",
          tugagan: "2010",
          holati: "Tamomlagan",
        },
      ],
    },
  },
];

export function getSeededApplications() {
  return seededApplications;
}

export function createCandidateRecord(input: ArizaInput): ArizaRecord {
  return {
    id: `AR-${Math.floor(1000 + Math.random() * 9000)}`,
    yuborilganSana: new Date().toISOString().slice(0, 10),
    holat: "Yangi",
    shaxsiyMalumot: {
      toliqIsm: input.toliqIsm,
      rasm: "/person-man.png",
      tugilganSana: "",
      jinsi: "",
      telefon: input.telefon,
      jshshir: input.jshshir,
      lavozim: input.lavozim,
      tajriba: input.tajriba,
    },
    oilaAzolari: [],
    ishTarixi: [],
    talimMalumoti: {
      hozirgiDaraja: "",
      tarix: [],
    },
  };
}

export function buildAnalytics(records: ArizaRecord[]): AnalyticsSnapshot {
  return {
    jami: records.length,
    yangi: records.filter((item) => item.holat === "Yangi").length,
    koribChiqilmoqda: records.filter((item) => item.holat === "Ko'rib chiqilmoqda").length,
    tasdiqlangan: records.filter((item) => item.holat === "Tasdiqlangan").length,
  };
}

export function buildDaromadAnalitika(record: ArizaRecord): DaromadAnalitika {
  const daromadlar = record.ishTarixi.flatMap((item) =>
    item.lavozimlar.map((role) => role.ortachaOylikDaromad),
  );

  if (daromadlar.length === 0) {
    return {
      engBalandDaromad: 0,
      ortachaDaromad: 0,
    };
  }

  const engBalandDaromad = Math.max(...daromadlar);
  const ortachaDaromad = Math.round(
    daromadlar.reduce((sum, value) => sum + value, 0) / daromadlar.length,
  );

  return {
    engBalandDaromad,
    ortachaDaromad,
  };
}
