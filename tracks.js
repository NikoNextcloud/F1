// Опростени схематични чертежи на писти (силуети), генерирани като SVG.
// Всеки запис е готов SVG markup (viewBox 200x130), стилизиран, не до мащаб.
const trackLayouts = {

"australia": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M40,95 C20,95 15,75 25,60 C32,50 30,40 40,35 C50,30 55,40 65,38 C75,36 78,25 90,22 C105,18 120,22 130,32 C140,42 135,55 145,60 C158,66 165,78 155,88 C148,95 135,90 128,95 C118,102 105,100 95,92 C85,84 78,90 68,92 C58,94 50,95 40,95 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="40" cy="95" r="3" fill="#E10600"/>
  <line x1="34" y1="95" x2="46" y2="95" stroke="#E10600" stroke-width="2"/>
</svg>`,

"china": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M100,20 C120,20 130,30 125,42 C120,52 105,50 100,58 C95,66 105,72 118,72 C135,72 145,85 138,98 C132,108 115,108 105,100 C95,92 90,100 78,102 C60,105 42,98 38,82 C35,70 45,62 42,50 C38,36 50,22 68,20 C80,18 90,20 100,20 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="100" cy="20" r="3" fill="#E10600"/>
  <line x1="94" y1="20" x2="106" y2="20" stroke="#E10600" stroke-width="2"/>
</svg>`,

"japan": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M55,30 C75,25 95,28 105,40 C112,48 122,42 130,48 C140,55 138,68 125,72 C112,76 105,68 95,72 C85,76 88,88 75,92 C60,96 45,88 42,72 C40,60 48,55 45,45 C42,36 48,32 55,30 Z M105,40 C113,32 125,30 130,38"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="55" cy="30" r="3" fill="#E10600"/>
  <line x1="49" y1="30" x2="61" y2="30" stroke="#E10600" stroke-width="2"/>
</svg>`,

"bahrain": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M35,70 C30,55 40,42 55,40 C62,39 65,32 75,30 C90,27 105,30 112,40 C118,48 130,45 140,52 C152,60 152,75 140,82 C132,87 120,84 112,90 C100,98 85,98 75,90 C68,85 58,88 48,84 C36,80 38,76 35,70 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="35" cy="70" r="3" fill="#E10600"/>
  <line x1="35" y1="64" x2="35" y2="76" stroke="#E10600" stroke-width="2"/>
</svg>`,

"monaco": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M50,90 C42,82 44,70 55,65 C65,60 62,50 70,44 C78,38 90,40 95,48 C100,56 112,52 118,42 C124,32 138,30 145,38 C152,46 148,58 138,62 C128,66 130,76 120,80 C108,85 98,78 88,82 C76,87 80,96 68,98 C58,100 56,96 50,90 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="90" r="3" fill="#E10600"/>
  <line x1="44" y1="90" x2="56" y2="90" stroke="#E10600" stroke-width="2"/>
</svg>`,

"canada": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M60,25 C90,22 120,25 130,40 C136,49 130,58 138,66 C146,74 144,86 132,90 C120,94 112,86 102,88 C92,90 90,98 78,98 C64,98 56,88 58,76 C60,66 50,62 48,50 C46,38 50,28 60,25 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="60" cy="25" r="3" fill="#E10600"/>
  <line x1="54" y1="25" x2="66" y2="25" stroke="#E10600" stroke-width="2"/>
</svg>`,

"spain": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M45,75 C40,62 48,50 62,48 C70,47 72,38 82,35 C95,31 110,35 115,46 C119,54 130,52 138,58 C148,65 146,78 135,82 C126,85 122,76 112,78 C100,80 98,90 85,92 C68,94 56,86 50,82 C46,80 47,78 45,75 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="45" cy="75" r="3" fill="#E10600"/>
  <line x1="45" y1="69" x2="45" y2="81" stroke="#E10600" stroke-width="2"/>
</svg>`,

"austria": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M50,80 C42,68 48,54 62,50 C72,47 74,36 86,33 C100,30 112,38 110,50 C108,60 120,62 128,70 C137,79 132,92 118,92 C106,92 102,82 90,84 C76,86 70,96 58,94 C50,92 50,86 50,80 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="80" r="3" fill="#E10600"/>
  <line x1="44" y1="80" x2="56" y2="80" stroke="#E10600" stroke-width="2"/>
</svg>`,

"uk": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M70,30 C90,28 105,35 105,46 C105,55 95,56 92,64 C89,73 98,78 112,76 C128,74 140,82 138,93 C136,102 122,104 112,98 C102,92 95,98 84,96 C70,93 62,84 65,72 C67,63 58,60 55,50 C52,40 58,32 70,30 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="70" cy="30" r="3" fill="#E10600"/>
  <line x1="64" y1="30" x2="76" y2="30" stroke="#E10600" stroke-width="2"/>
</svg>`,

"belgium": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M55,95 C45,90 44,78 54,72 C62,67 60,58 68,52 C78,45 92,46 96,56 C99,64 110,60 116,50 C123,38 138,34 148,44 C158,54 152,68 140,70 C130,72 128,80 118,84 C106,89 96,84 88,90 C76,98 64,99 55,95 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="55" cy="95" r="3" fill="#E10600"/>
  <line x1="49" y1="95" x2="61" y2="95" stroke="#E10600" stroke-width="2"/>
</svg>`,

"italy": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M50,60 L120,60 C132,60 138,52 132,44 C127,37 116,38 112,46 C108,53 96,53 92,46 C88,38 78,37 73,45 C68,53 56,53 52,45 C48,38 38,38 34,46 C30,54 36,60 50,60 Z M50,60 C38,60 30,68 35,76 C39,83 50,82 53,75 C56,68 65,68 68,75 C71,82 82,83 86,76 C90,68 99,68 102,75 C105,82 116,83 120,76 C124,68 132,68 132,60"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="60" r="3" fill="#E10600"/>
  <line x1="50" y1="54" x2="50" y2="66" stroke="#E10600" stroke-width="2"/>
</svg>`,

"abudhabi": `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M45,70 C38,58 44,46 58,44 C68,43 70,33 82,30 C98,26 115,32 118,45 C120,54 132,52 142,60 C152,68 150,82 137,86 C127,89 120,80 108,82 C94,84 90,94 76,94 C62,94 50,86 48,78 C47,75 46,73 45,70 Z"
    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="45" cy="70" r="3" fill="#E10600"/>
  <line x1="39" y1="70" x2="51" y2="70" stroke="#E10600" stroke-width="2"/>
</svg>`

};
