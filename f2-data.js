// ==========================================================================
// FIA Formula 2 — данни за сезон 2026
//
// За разлика от F1 (Jolpica/Ergast API — безплатен, автоматичен), за
// Формула 2 няма безплатен public API с класирания/резултати в реално
// време. Затова тези данни се поддържат РЪЧНО и трябва да се обновяват
// след всеки уикенд (или поне веднъж седмично).
//
// Как да обновиш:
// 1. Отвори https://www.fiaformula2.com/Standings/Driver и .../Standings/Team
// 2. Обнови точките в F2_DRIVERS / F2_TEAMS по-долу
// 3. Смени F2_META.lastUpdated
//
// Източници при последното обновяване:
//  - Състав/номера: fiaformula2.com/Teams-and-Drivers
//  - Календар:      en.wikipedia.org/wiki/2026_Formula_2_Championship
//  - Класиране:     coffeecornermotorsport.com (официална FIA класация, Кръг 6)
// ==========================================================================

const F2_META = {
    lastUpdated: "28 юни 2026 (след Кръг 6 — Шпилберг)",
    source: "fiaformula2.com"
};

// Цветова тема по отбори (индикативна, не официални лога — F2 няма
// вградени графики в проекта както F1 отборите).
const f2TeamTheme = {
    invicta:        { color: "#0ea5e9", dark: "#075985", bright: "#7dd3fc" },
    hitech:         { color: "#64748b", dark: "#1e293b", bright: "#cbd5e1" },
    campos:         { color: "#ff3b3b", dark: "#7a0000", bright: "#ff8080" },
    dams:           { color: "#f43f5e", dark: "#7f1d2b", bright: "#fb7185" },
    mp_motorsport:  { color: "#ff8a00", dark: "#7a3d00", bright: "#ffb057" },
    prema:          { color: "#b91c1c", dark: "#450a0a", bright: "#f87171" },
    rodin:          { color: "#7c3aed", dark: "#3b1370", bright: "#a78bfa" },
    art:            { color: "#22c55e", dark: "#14532d", bright: "#86efac" },
    aix:            { color: "#ec4899", dark: "#831843", bright: "#f9a8d4" },
    van_amersfoort: { color: "#14b8a6", dark: "#134e4a", bright: "#5eead4" },
    trident:        { color: "#eab308", dark: "#713f12", bright: "#fde047" }
};

const F2_TEAM_NAMES = {
    invicta: "Invicta Racing",
    hitech: "Hitech",
    campos: "Campos Racing",
    dams: "DAMS Lucas Oil",
    mp_motorsport: "MP Motorsport",
    prema: "PREMA Racing",
    rodin: "Rodin Motorsport",
    art: "ART Grand Prix",
    aix: "AIX Racing",
    van_amersfoort: "Van Amersfoort Racing",
    trident: "TRIDENT"
};

// Класиране на пилотите (точки към Кръг 6 — Шпилберг)
const F2_DRIVERS = [
    { pos: 1,  name: "Gabriele Minì",             nationality: "Italian",    teamId: "mp_motorsport",  number: 9,  points: 108 },
    { pos: 2,  name: "Nikola Tsolov",              nationality: "Bulgarian",  teamId: "campos",         number: 6,  points: 106 },
    { pos: 3,  name: "Rafael Câmara",              nationality: "Brazilian",  teamId: "invicta",        number: 1,  points: 82 },
    { pos: 4,  name: "Alexander Dunne",            nationality: "Irish",      teamId: "rodin",          number: 15, points: 80 },
    { pos: 5,  name: "Noel León",                  nationality: "Mexican",    teamId: "campos",         number: 5,  points: 62 },
    { pos: 6,  name: "Dino Beganovic",             nationality: "Swedish",    teamId: "dams",           number: 7,  points: 53 },
    { pos: 7,  name: "Martinius Stenshorne",       nationality: "Norwegian",  teamId: "rodin",          number: 14, points: 48 },
    { pos: 8,  name: "Laurens van Hoepen",         nationality: "Dutch",      teamId: "trident",        number: 24, points: 47 },
    { pos: 9,  name: "Kush Maini",                 nationality: "Indian",     teamId: "art",            number: 16, points: 43 },
    { pos: 10, name: "Ritomo Miyata",              nationality: "Japanese",   teamId: "hitech",         number: 3,  points: 30 },
    { pos: 11, name: "Sebastián Montoya",          nationality: "Colombian",  teamId: "prema",          number: 11, points: 28 },
    { pos: 12, name: "Oliver Goethe",              nationality: "German",     teamId: "mp_motorsport",  number: 10, points: 28 },
    { pos: 13, name: "Joshua Dürksen",             nationality: "Paraguayan", teamId: "invicta",        number: 2,  points: 23 },
    { pos: 14, name: "Tasanapol Inthraphuvasak",   nationality: "Thai",       teamId: "art",            number: 17, points: 23 },
    { pos: 15, name: "Colton Herta",               nationality: "American",   teamId: "hitech",         number: 4,  points: 20 },
    { pos: 16, name: "John Bennett",               nationality: "British",    teamId: "trident",        number: 25, points: 17 },
    { pos: 17, name: "Roman Bilinski",             nationality: "Polish",     teamId: "dams",           number: 8,  points: 16 },
    { pos: 18, name: "Nico Varrone",               nationality: "Argentine",  teamId: "van_amersfoort", number: 22, points: 14 },
    { pos: 19, name: "Emerson Fittipaldi",         nationality: "Brazilian",  teamId: "aix",            number: 20, points: 10 },
    { pos: 20, name: "Cian Shields",                nationality: "British",   teamId: "aix",            number: 21, points: 10 },
    { pos: 21, name: "Mari Boya",                  nationality: "Spanish",    teamId: "prema",          number: 12, points: 10 },
    { pos: 22, name: "Rafael Villagómez",          nationality: "Mexican",    teamId: "van_amersfoort", number: 23, points: 6 }
].map(d => ({ ...d, team: F2_TEAM_NAMES[d.teamId] }));

// Класиране на отборите
const F2_TEAMS = [
    { pos: 1,  teamId: "campos",         points: 168 },
    { pos: 2,  teamId: "mp_motorsport",  points: 136 },
    { pos: 3,  teamId: "rodin",          points: 128 },
    { pos: 4,  teamId: "invicta",        points: 105 },
    { pos: 5,  teamId: "dams",           points: 69 },
    { pos: 6,  teamId: "art",            points: 66 },
    { pos: 7,  teamId: "trident",        points: 64 },
    { pos: 8,  teamId: "hitech",         points: 50 },
    { pos: 9,  teamId: "prema",          points: 38 },
    { pos: 10, teamId: "van_amersfoort", points: 20 },
    { pos: 11, teamId: "aix",            points: 20 }
].map(t => ({ ...t, name: F2_TEAM_NAMES[t.teamId] }));

// Календар 2026 (14 кръга). F2 уикендите следват стандартния формат:
// петък = тренировки + квалификация, събота = спринт, неделя = състезание (feature race).
// circuitId съвпада с F1 circuitId, за да се преизползват съществуващите писти/часови зони.
const F2_CALENDAR = [
    { round: 1,  name: "Австралия",       circuitName: "Albert Park Circuit",             locality: "Мелбърн",   country: "Australia",   circuitId: "albert_park",   sprintDate: "2026-03-07", featureDate: "2026-03-08" },
    { round: 2,  name: "Маями",           circuitName: "Miami International Autodrome",   locality: "Маями",     country: "USA",          circuitId: "miami",         sprintDate: "2026-05-02", featureDate: "2026-05-03" },
    { round: 3,  name: "Канада",          circuitName: "Circuit Gilles Villeneuve",        locality: "Монреал",   country: "Canada",       circuitId: "villeneuve",    sprintDate: "2026-05-23", featureDate: "2026-05-24" },
    { round: 4,  name: "Монако",          circuitName: "Circuit de Monaco",                locality: "Монако",    country: "Monaco",       circuitId: "monaco",        sprintDate: "2026-06-06", featureDate: "2026-06-07" },
    { round: 5,  name: "Испания",         circuitName: "Circuit de Barcelona-Catalunya",   locality: "Монтмело",  country: "Spain",        circuitId: "catalunya",     sprintDate: "2026-06-13", featureDate: "2026-06-14" },
    { round: 6,  name: "Австрия",         circuitName: "Red Bull Ring",                    locality: "Шпилберг",  country: "Austria",      circuitId: "red_bull_ring", sprintDate: "2026-06-27", featureDate: "2026-06-28" },
    { round: 7,  name: "Великобритания",  circuitName: "Silverstone Circuit",              locality: "Силвърстоун", country: "UK",         circuitId: "silverstone",   sprintDate: "2026-07-04", featureDate: "2026-07-05" },
    { round: 8,  name: "Белгия",          circuitName: "Circuit de Spa-Francorchamps",     locality: "Ставло",    country: "Belgium",      circuitId: "spa",           sprintDate: "2026-07-18", featureDate: "2026-07-19" },
    { round: 9,  name: "Унгария",         circuitName: "Hungaroring",                      locality: "Мойород",   country: "Hungary",      circuitId: "hungaroring",   sprintDate: "2026-07-25", featureDate: "2026-07-26" },
    { round: 10, name: "Италия",          circuitName: "Monza Circuit",                    locality: "Монца",     country: "Italy",        circuitId: "monza",         sprintDate: "2026-09-05", featureDate: "2026-09-06" },
    { round: 11, name: "Мадрид",          circuitName: "Madring",                          locality: "Мадрид",    country: "Spain",        circuitId: "madring",       sprintDate: "2026-09-12", featureDate: "2026-09-13" },
    { round: 12, name: "Азербайджан",     circuitName: "Baku City Circuit",                locality: "Баку",      country: "Azerbaijan",   circuitId: "baku",          sprintDate: "2026-09-25", featureDate: "2026-09-26" },
    { round: 13, name: "Катар",           circuitName: "Lusail International Circuit",     locality: "Лусаил",    country: "Qatar",        circuitId: "losail",        sprintDate: "2026-11-28", featureDate: "2026-11-29" },
    { round: 14, name: "Абу Даби",        circuitName: "Yas Marina Circuit",               locality: "Абу Даби",  country: "UAE",          circuitId: "yas_marina",    sprintDate: "2026-12-05", featureDate: "2026-12-06" }
];
