let currentQuestion = 0;
let score = 0;
let bgMusic = document.getElementById("bg-music");

function startGame() {
  document.getElementById("menu").classList.add("hide");
  document.getElementById("quiz").classList.remove("hide");
  showQuestion();
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}

function showQuestion() {
  const q = questions[currentQuestion];
  const questionBox = document.getElementById("question-box");
  const optionsBox = document.getElementById("options-box");

  questionBox.innerHTML = "<h2>" + q.question + "</h2>";
  optionsBox.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(index);
    optionsBox.appendChild(btn);
  });
}

function playSound(correct) {
  const audio = document.getElementById(correct ? "sound-correct" : "sound-wrong");
  audio.currentTime = 0;
  audio.play();
}

function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];
  for (let i = 0; i < 20; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 30 + 10,
      speed: Math.random() * 2 + 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      ctx.font = h.size + "px Arial";
      ctx.fillText("💖", h.x, h.y);
      h.y += h.speed;
      if (h.y > canvas.height) h.y = 0;
    });
  }

  let interval = setInterval(draw, 30);
  setTimeout(() => clearInterval(interval), 2000);
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const correct = q.answer;
  const options = document.querySelectorAll(".option");

  options.forEach((btn, idx) => {
    btn.onclick = null;
    if (idx === correct) btn.classList.add("correct");
    if (idx === selected && idx !== correct) btn.classList.add("wrong");
  });

  if (selected === correct) {
    score++;
    playSound(true);
    triggerConfetti();
  } else {
    playSound(false);
  }

  const explanation = document.createElement("div");
  explanation.style.marginTop = "1rem";
  explanation.style.fontStyle = "italic";
  explanation.textContent = "💡 " + q.explanation;
  document.getElementById("options-box").appendChild(explanation);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 3000);
}

function showResult() {
  document.getElementById("quiz").classList.add("hide");
  document.getElementById("result").classList.remove("hide");
  document.getElementById("score").textContent = score + " dari " + questions.length;
}

function downloadLoveCard() {
  const link = document.createElement("a");
  link.href = "assets/love-card.png";
  link.download = "kartu_cinta_dari_game.png";
  link.click();
}

// 🔔 Kirim ke WhatsApp
function sendToWhatsApp() {
  const number = "6281234567890"; // Ganti dengan nomor kamu
  const scoreText = document.getElementById("score").textContent;
  const userQuestion = document.getElementById("custom-question").value;
  const message = `Haii, aku barusan main kuis romantis lucu kamu! 🥰\nSkorku: ${scoreText}\nDan ini pertanyaanku buat kamu: ${userQuestion}`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
