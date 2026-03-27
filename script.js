// --- ДАННЫЕ ИГРЫ ---
const facts = [
    "В 1922 году образован СССР.",
    "ГОЭЛРО — план электрификации всей страны.",
    "Первый спутник был запущен в 1957 году.",
    "Хрущевская оттепель принесла свободу в искусство."
];

const levels = [
    { year: 1922, enemy: "Разруха", hp: 30, text: "Нужно восстановить экономику!" },
    { year: 1941, enemy: "Интервенция", hp: 100, text: "Защити границы!" },
    { year: 1955, enemy: "Застой в идеях", hp: 50, text: "Время Оттепели!" }
];

let currentLevel = 0;
let playerPower = 10;
let enemyCurrentHp = 30;

// --- ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ---
const startBtn = document.getElementById('start-btn');
const introVideo = document.getElementById('intro-video');

startBtn.onclick = () => {
    document.getElementById('screen-intro').classList.add('hidden');
    document.getElementById('screen-video').classList.remove('hidden');
    introVideo.play();
};

// Когда видео закончилось — идем в загрузку
introVideo.onended = () => {
    document.getElementById('screen-video').classList.add('hidden');
    document.getElementById('screen-loading').classList.remove('hidden');
    startLoading();
};

function startLoading() {
    let progress = 0;
    const fill = document.getElementById('load-fill');
    const factText = document.getElementById('fact-text');
    
    const interval = setInterval(() => {
        progress += 2;
        fill.style.width = progress + "%";
        
        // Меняем факты каждые 30% загрузки
        if (progress % 30 === 0) {
            factText.innerText = facts[Math.floor(Math.random() * facts.length)];
        }

        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('screen-loading').classList.add('hidden');
            document.getElementById('screen-game').classList.remove('hidden');
        }
    }, 50);
}

// --- БОЕВАЯ СИСТЕМА ---
function attack() {
    enemyCurrentHp -= playerPower;
    if (enemyCurrentHp <= 0) {
        alert("Победа в " + levels[currentLevel].year + " году!");
        nextLevel();
    }
    updateUI();
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        enemyCurrentHp = levels[currentLevel].hp;
        document.getElementById('year-tag').innerText = levels[currentLevel].year;
        document.getElementById('enemy-name').innerText = levels[currentLevel].enemy;
    } else {
        alert("Вы прошли историю от создания до Оттепели!");
        location.reload();
    }
}

function upgrade(amount) {
    playerPower += amount;
    document.getElementById('power').innerText = playerPower;
    alert("Мощь государства выросла!");
}

function updateUI() {
    const hpPercent = (enemyCurrentHp / levels[currentLevel].hp) * 100;
    document.getElementById('enemy-hp').style.width = Math.max(0, hpPercent) + "%";
}
