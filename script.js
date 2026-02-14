/* ===== Valentine's for Jaan — "Unlock My Heart" ===== */

// ----- Star generation (intro + main) -----
function createStars(containerId, count = 100) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const sizes = ['small', 'medium', 'large'];
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star ' + sizes[Math.floor(Math.random() * sizes.length)];
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(star);
  }
}
createStars('introStars', 80);
createStars('starsContainer', 140);

// ----- Intro: Unlock heart -----
const introScreen = document.getElementById('introScreen');
const mainScreen = document.getElementById('mainScreen');
const heartLock = document.getElementById('heartLock');

heartLock.addEventListener('click', () => {
  heartLock.style.transform = 'scale(0.9)';
  heartLock.style.opacity = '0.8';
  setTimeout(() => {
    introScreen.classList.add('hidden');
    mainScreen.classList.add('visible');
    document.body.style.overflow = 'auto';
  }, 400);
});

// ----- Typing animation -----
const messages = [
  "Jaan, you make every moment magical.",
  "With you, every day feels like Valentine's.",
  "You're not just my love — you're my forever.",
  "My heart belongs to you, Jaan. Always.",
  "Every star reminds me of you.",
  "You're my favorite hello and my hardest goodbye.",
  "I fall for you more every day."
];
let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const current = messages[msgIndex];
  const typedEl = document.getElementById('typed');
  if (!typedEl) return;

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 35;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 75;
  }

  if (!isDeleting && charIndex === current.length) {
    typingSpeed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    msgIndex = (msgIndex + 1) % messages.length;
    typingSpeed = 400;
  }
  setTimeout(typeEffect, typingSpeed);
}
setTimeout(typeEffect, 1200);

// ----- Love letter: Envelope -----
const letterOverlay = document.getElementById('letterOverlay');
const btnLetter = document.getElementById('btnLetter');
const closeLetter = document.getElementById('closeLetter');
const envelopeWrap = document.getElementById('envelopeWrap');
const surpriseMsg = document.getElementById('surpriseMsg');

btnLetter.addEventListener('click', () => {
  letterOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => letterOverlay.classList.add('open'), 100);
});

function closeLetterModal() {
  letterOverlay.classList.remove('open');
  setTimeout(() => {
    letterOverlay.classList.remove('active');
    document.body.style.overflow = '';
    surpriseMsg.textContent = 'I love you, Jaan.';
    surpriseMsg.classList.add('visible');
    setTimeout(() => surpriseMsg.classList.remove('visible'), 3200);
  }, 400);
}

closeLetter.addEventListener('click', (e) => {
  e.stopPropagation();
  closeLetterModal();
});

letterOverlay.addEventListener('click', (e) => {
  if (e.target === letterOverlay) closeLetterModal();
});

// ----- Moon -----
const moonBtn = document.getElementById('moonBtn');
moonBtn.addEventListener('click', () => {
  moonBtn.classList.add('revealed');
  createConfetti();
});

// ----- 404 -----
const modal404 = document.getElementById('modal404');
const btn404 = document.getElementById('btn404');
const close404 = document.getElementById('close404');

btn404.addEventListener('click', () => {
  modal404.classList.add('active');
  document.body.style.overflow = 'hidden';
});

close404.addEventListener('click', () => {
  modal404.classList.remove('active');
  document.body.style.overflow = '';
});

modal404.addEventListener('click', (e) => {
  if (e.target === modal404) {
    modal404.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ----- Accept: fill constellation, confetti, success -----
const btnAccept = document.getElementById('btnAccept');
const confettiContainer = document.getElementById('confettiContainer');
const successOverlay = document.getElementById('successOverlay');
const constellation = document.querySelector('.constellation-heart');

const hearts = ['❤️', '💕', '💗', '💖', '💝'];
const colors = ['#ec4899', '#f472b6', '#fbcfe8', '#fde047', '#a78bfa'];

function createConfetti() {
  if (!confettiContainer) return;
  confettiContainer.innerHTML = '';
  for (let i = 0; i < 55; i++) {
    const c = document.createElement('div');
    c.className = Math.random() > 0.5 ? 'confetti heart' : 'confetti';
    c.textContent = Math.random() > 0.5 ? hearts[Math.floor(Math.random() * hearts.length)] : '';
    if (!c.textContent) {
      c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    }
    c.style.left = Math.random() * 100 + '%';
    c.style.animationDelay = Math.random() * 0.5 + 's';
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    confettiContainer.appendChild(c);
  }
  setTimeout(() => { confettiContainer.innerHTML = ''; }, 4000);
}

btnAccept.addEventListener('click', () => {
  btnAccept.classList.add('clicked');
  btnAccept.textContent = 'Accepted! 💕';
  if (constellation) constellation.classList.add('filled');
  createConfetti();
  successOverlay.classList.add('show');
  setTimeout(() => {
    surpriseMsg.textContent = "You're the best thing that ever happened to me, Jaan.";
    surpriseMsg.classList.add('visible');
  }, 1500);
  setTimeout(() => successOverlay.classList.remove('show'), 5200);
});

// ----- Scroll surprise -----
window.addEventListener('scroll', () => {
  if (window.scrollY > 180 && !btnAccept.classList.contains('clicked')) {
    surpriseMsg.textContent = "There's more love for you up here, Jaan.";
    surpriseMsg.classList.add('visible');
  }
});

// ----- Tap anywhere to spawn a heart (mobile-friendly) -----
const tapHeartsPool = document.getElementById('tapHeartsPool');

function spawnTapHeart(clientX, clientY) {
  if (!tapHeartsPool) return;
  const hearts = ['❤️', '💕', '💗', '💖'];
  const el = document.createElement('span');
  el.className = 'tap-heart';
  el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  el.style.left = clientX + 'px';
  el.style.top = clientY + 'px';
  tapHeartsPool.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function getEventCoords(e) {
  if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  if (e.changedTouches && e.changedTouches.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

mainScreen.addEventListener('click', (e) => {
  if (e.target.closest('button') || e.target.closest('.letter-overlay') || e.target.closest('.modal-overlay') || e.target.closest('.reasons-overlay')) return;
  const { x, y } = getEventCoords(e);
  spawnTapHeart(x, y);
});
mainScreen.addEventListener('touchend', (e) => {
  if (e.target.closest('button') || e.target.closest('.letter-overlay') || e.target.closest('.modal-overlay') || e.target.closest('.reasons-overlay')) return;
  const { x, y } = getEventCoords(e);
  spawnTapHeart(x, y);
}, { passive: true });

// ----- Double-tap title = secret message; single tap = confetti -----
let lastTitleTap = 0;
let titleTapTimeout = null;
const secretPopup = document.getElementById('secretPopup');
if (mainTitle) {
  mainTitle.addEventListener('click', (e) => {
    const now = Date.now();
    if (now - lastTitleTap < 400 && now - lastTitleTap > 50) {
      if (titleTapTimeout) clearTimeout(titleTapTimeout);
      if (secretPopup) {
        secretPopup.classList.add('show');
        setTimeout(() => secretPopup.classList.remove('show'), 2800);
      }
      createConfetti();
      mainTitle.style.animation = 'none';
      mainTitle.offsetHeight;
      mainTitle.style.animation = 'titleIn 0.5s ease-out';
      lastTitleTap = 0;
      return;
    }
    lastTitleTap = now;
    titleTapTimeout = setTimeout(() => {
      mainTitle.style.animation = 'none';
      mainTitle.offsetHeight;
      mainTitle.style.animation = 'titleIn 0.5s ease-out';
      createConfetti();
    }, 350);
  });
  mainTitle.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTitleTap < 500 && now - lastTitleTap > 80) {
      if (titleTapTimeout) clearTimeout(titleTapTimeout);
      if (secretPopup) {
        secretPopup.classList.add('show');
        setTimeout(() => secretPopup.classList.remove('show'), 2800);
      }
      createConfetti();
      lastTitleTap = 0;
    } else {
      lastTitleTap = now;
      titleTapTimeout = setTimeout(() => {
        createConfetti();
      }, 400);
    }
  }, { passive: true });
}

// ----- Thinking of you bubble (after 12s) -----
const thinkingBubble = document.getElementById('thinkingBubble');
let thinkingShown = false;
setTimeout(() => {
  if (thinkingBubble && !thinkingShown && !btnAccept.classList.contains('clicked')) {
    thinkingShown = true;
    thinkingBubble.classList.add('show');
    setTimeout(() => thinkingBubble.classList.remove('show'), 4000);
  }
}, 12000);

// ----- Constellation tap = pulse -----
const constellationWrap = document.getElementById('constellationWrap');
if (constellationWrap) {
  constellationWrap.addEventListener('click', (e) => {
    e.stopPropagation();
    constellationWrap.classList.add('pulse-once');
    setTimeout(() => constellationWrap.classList.remove('pulse-once'), 700);
  });
  constellationWrap.addEventListener('touchend', (e) => {
    e.preventDefault();
    constellationWrap.classList.add('pulse-once');
    setTimeout(() => constellationWrap.classList.remove('pulse-once'), 700);
  }, { passive: false });
}

// ----- Triple-tap moon = extra confetti -----
let moonTapCount = 0;
let moonTapTimer = null;
moonBtn.addEventListener('click', () => {
  moonTapCount++;
  if (moonTapTimer) clearTimeout(moonTapTimer);
  if (moonTapCount >= 3) {
    moonTapCount = 0;
    createConfetti();
    createConfetti();
  }
  moonTapTimer = setTimeout(() => { moonTapCount = 0; }, 600);
});
moonBtn.addEventListener('touchend', () => {
  moonTapCount++;
  if (moonTapTimer) clearTimeout(moonTapTimer);
  if (moonTapCount >= 3) {
    moonTapCount = 0;
    createConfetti();
    createConfetti();
  }
  moonTapTimer = setTimeout(() => { moonTapCount = 0; }, 600);
}, { passive: true });

// ----- Tap hint 3x = "Reasons I love you" -----
const hint = document.getElementById('hint');
const reasonsOverlay = document.getElementById('reasonsOverlay');
const reasonsText = document.getElementById('reasonsText');
const reasonsClose = document.getElementById('reasonsClose');

const reasonsList = [
  "Your smile is my favorite view.",
  "You make ordinary moments feel magical.",
  "You listen like no one else.",
  "You're the reason I believe in love.",
  "You make me want to be a better person.",
  "Your laugh is my favorite sound.",
  "You see the best in me when I can't.",
  "With you, I'm home.",
  "You're my safe place.",
  "You turned my life into a love story."
];

let hintTapCount = 0;
let hintTapTimer = null;
if (hint) {
  hint.addEventListener('click', () => {
    hintTapCount++;
    if (hintTapTimer) clearTimeout(hintTapTimer);
    if (hintTapCount >= 3) {
      hintTapCount = 0;
      if (reasonsOverlay && reasonsText) {
        reasonsText.textContent = reasonsList[Math.floor(Math.random() * reasonsList.length)];
        reasonsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
    hintTapTimer = setTimeout(() => { hintTapCount = 0; }, 800);
  });
  hint.addEventListener('touchend', (e) => {
    hintTapCount++;
    if (hintTapTimer) clearTimeout(hintTapTimer);
    if (hintTapCount >= 3) {
      hintTapCount = 0;
      if (reasonsOverlay && reasonsText) {
        reasonsText.textContent = reasonsList[Math.floor(Math.random() * reasonsList.length)];
        reasonsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
    hintTapTimer = setTimeout(() => { hintTapCount = 0; }, 800);
  }, { passive: true });
}

if (reasonsClose && reasonsOverlay) {
  reasonsClose.addEventListener('click', () => {
    reasonsOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  reasonsOverlay.addEventListener('click', (e) => {
    if (e.target === reasonsOverlay) {
      reasonsOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
