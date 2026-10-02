// 語言辭典設定
const translations = {
  'zh-TW': {
    pageTitle: "Hello, World! - 語言與色彩切換",
    themeLabel: "主題色彩:",
    badge: "第一支網頁程式",
    title: "你好，世界！",
    desc: "歡迎來到網頁開發的世界！這是一個支援多國語言與即時變換色彩風格的互動頁面。",
    greetBtn: "打個招呼",
    randomColorBtn: "隨機風格",
    toast: "✨ 很高興遇見你！祝你有美好的一天。",
    footer: "HTML5 + Tailwind CSS • 支援語言與豐富色彩切換"
  },
  'en': {
    pageTitle: "Hello, World! - Language & Color Switcher",
    themeLabel: "Theme:",
    badge: "First Webpage",
    title: "Hello, World!",
    desc: "Welcome to the world of web development! An interactive page supporting multi-language and live theme switching.",
    greetBtn: "Say Hello",
    randomColorBtn: "Random Style",
    toast: "✨ Nice to meet you! Hope you have a wonderful day.",
    footer: "HTML5 + Tailwind CSS • Multi-language & Color Palette Ready"
  },
  'ja': {
    pageTitle: "Hello, World! - 言語とカラーの切り替え",
    themeLabel: "テーマカラー:",
    badge: "最初のウェブページ",
    title: "こんにちは、世界！",
    desc: "ウェブ開発の世界へようこそ！多言語対応とリアルタイムのテーマカラー切り替えが可能なページです。",
    greetBtn: "挨拶する",
    randomColorBtn: "ランダム色",
    toast: "✨ はじめまして！素晴らしい一日になりますように。",
    footer: "HTML5 + Tailwind CSS • 多言語とカラーパレット切り替えに対応"
  },
  'fr': {
    pageTitle: "Hello, World! - Sélecteur de Langue & Couleur",
    themeLabel: "Thème :",
    badge: "Première Page Web",
    title: "Bonjour le monde !",
    desc: "Bienvenue dans le monde du développement web ! Une interface interactive avec choix de langue et de couleur.",
    greetBtn: "Dire Bonjour",
    randomColorBtn: "Aléatoire",
    toast: "✨ Ravi de vous rencontrer ! Passez une excellente journée.",
    footer: "HTML5 + Tailwind CSS • Multi-langue & Palette de couleurs"
  },
  'es': {
    pageTitle: "Hello, World! - Selector de Idioma y Color",
    themeLabel: "Tema:",
// 色彩風格清單
const themes = [
  {
    id: "indigo",
    name: "經典靛藍",
    dotColor: "bg-indigo-500",
    bgClasses: ["from-indigo-50", "via-white", "to-sky-100"],
    primaryBtnClasses: ["bg-indigo-600", "hover:bg-indigo-700", "shadow-indigo-200"],
    badgeClasses: ["bg-indigo-50", "border-indigo-100/80", "text-indigo-600"],
    badgeDotClass: "bg-indigo-500"
  },
  {
    id: "rose",
    name: "浪漫玫瑰",
    dotColor: "bg-rose-500",
    bgClasses: ["from-rose-50", "via-white", "to-orange-100"],
    primaryBtnClasses: ["bg-rose-600", "hover:bg-rose-700", "shadow-rose-200"],
    badgeClasses: ["bg-rose-50", "border-rose-100/80", "text-rose-600"],
    badgeDotClass: "bg-rose-500"
  },
  {
    id: "emerald",
    name: "清新薄荷",
    dotColor: "bg-emerald-500",
    bgClasses: ["from-emerald-50", "via-white", "to-teal-100"],
    primaryBtnClasses: ["bg-emerald-600", "hover:bg-emerald-700", "shadow-emerald-200"],
    badgeClasses: ["bg-emerald-50", "border-emerald-100/80", "text-emerald-600"],
    badgeDotClass: "bg-emerald-500"
  },
  {
    id: "purple",
    name: "夢幻紫丁香",
    dotColor: "bg-purple-500",
    bgClasses: ["from-purple-50", "via-white", "to-pink-100"],
    primaryBtnClasses: ["bg-purple-600", "hover:bg-purple-700", "shadow-purple-200"],
    badgeClasses: ["bg-purple-50", "border-purple-100/80", "text-purple-600"],
    badgeDotClass: "bg-purple-500"
  },
  {
    id: "amber",
    name: "溫暖琥珀",
    dotColor: "bg-amber-500",
    bgClasses: ["from-amber-50", "via-white", "to-yellow-100"],
    primaryBtnClasses: ["bg-amber-600", "hover:bg-amber-700", "shadow-amber-200"],
    badgeClasses: ["bg-amber-50", "border-amber-100/80", "text-amber-600"],
    badgeDotClass: "bg-amber-500"
  }
];

let currentThemeIndex = 0;
let currentLang = 'zh-TW';
let toastTimer = null;

// DOM 元素
const bgContainer = document.getElementById('bgContainer');
const langSelect = document.getElementById('langSelect');
const paletteContainer = document.getElementById('paletteContainer');
const themeLabel = document.getElementById('themeLabel');
const badgeContainer = document.getElementById('badgeContainer');
const badgeDot = document.getElementById('badgeDot');
const badgeText = document.getElementById('badgeText');
const mainTitle = document.getElementById('mainTitle');
const subText = document.getElementById('subText');
const greetBtn = document.getElementById('greetBtn');
const greetBtnText = document.getElementById('greetBtnText');
const randomColorBtn = document.getElementById('randomColorBtn');
const randomColorBtnText = document.getElementById('randomColorBtnText');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
const footerText = document.getElementById('footerText');

// 動態建立色票按鈕
function createPaletteButtons() {
  paletteContainer.innerHTML = '';
  themes.forEach((theme, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `w-5 h-5 rounded-full ${theme.dotColor} transition-transform hover:scale-125 focus:outline-none cursor-pointer ${index === currentThemeIndex ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : ''}`;
    btn.title = theme.name;
    btn.setAttribute('aria-label', theme.name);
    btn.addEventListener('click', () => applyTheme(index));
    paletteContainer.appendChild(btn);
  });
}

// 切換色彩主題
function applyTheme(index) {
  const prevTheme = themes[currentThemeIndex];
  const nextTheme = themes[index];

  bgContainer.classList.remove(...prevTheme.bgClasses);
  greetBtn.classList.remove(...prevTheme.primaryBtnClasses);
  badgeContainer.classList.remove(...prevTheme.badgeClasses);
  badgeDot.classList.remove(prevTheme.badgeDotClass);

  bgContainer.classList.add(...nextTheme.bgClasses);
  greetBtn.classList.add(...nextTheme.primaryBtnClasses);
  badgeContainer.classList.add(...nextTheme.badgeClasses);
  badgeDot.classList.add(nextTheme.badgeDotClass);

  currentThemeIndex = index;

  Array.from(paletteContainer.children).forEach((btn, i) => {
    if (i === index) {
      btn.classList.add('ring-2', 'ring-offset-2', 'ring-slate-400', 'scale-110');
    } else {
      btn.classList.remove('ring-2', 'ring-offset-2', 'ring-slate-400', 'scale-110');
    }
  });
}

// 切換語言
function applyLanguage(lang) {
  const data = translations[lang] || translations['zh-TW'];
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = data.pageTitle;
  themeLabel.textContent = data.themeLabel;
  badgeText.textContent = data.badge;
  mainTitle.textContent = data.title;
  subText.textContent = data.desc;
  greetBtnText.textContent = data.greetBtn;
  randomColorBtnText.textContent = data.randomColorBtn;
  toastText.textContent = data.toast;
  footerText.innerHTML = data.footer;
}

// 提示通知
function showToast(customMessage) {
  if (customMessage) {
    toastText.textContent = customMessage;
  } else {
    toastText.textContent = translations[currentLang].toast;
  }
  
  toast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 2500);
}

// 事件綁定
langSelect.addEventListener('change', (e) => {
  applyLanguage(e.target.value);
  showToast();
});

greetBtn.addEventListener('click', () => {
  greetBtn.classList.add('scale-95');
  setTimeout(() => greetBtn.classList.remove('scale-95'), 150);
  showToast();
});

randomColorBtn.addEventListener('click', () => {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * themes.length);
  } while (nextIndex === currentThemeIndex && themes.length > 1);
  applyTheme(nextIndex);
});

// 初始化
createPaletteButtons();
applyLanguage('zh-TW');

    badge: "Primera Página Web",
    title: "¡Hola, Mundo!",
    desc: "¡Bienvenido al desarrollo web! Una página interactiva compatible con múltiples idiomas y cambio de color.",
    greetBtn: "Saludar",
    randomColorBtn: "Aleatorio",
    toast: "✨ ¡Un placer conocerte! Que tengas un día maravilloso.",
    footer: "HTML5 + Tailwind CSS • Listo para múltiples idiomas y colores"
  }
};
