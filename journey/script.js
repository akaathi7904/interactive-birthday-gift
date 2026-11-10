/**
 * PAKKI'S JOURNEY - LUXURY ROMANTIC BIRTHDAY SURPRISE
 * For: Nilaathi (Pattu Maa)
 * From: Aathi
 * Special Symbol: 11:11 ∞
 * Relationship Start: 14 May 2025
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CONFIGURATION & PHOTO REGISTRY
  // ==========================================================================
  const CONFIG = {
    // Memory photos (Excluding first couple photo couple.jpg)
    // Easily add more photos here (e.g. 'assets/photos/memory-10.jpg')
    memoryPhotos: [
      'assets/photos/memory-1.jpg',
      'assets/photos/memory-2.jpg',
      'assets/photos/memory-3.jpg',
      'assets/photos/memory-4.jpg',
      'assets/photos/memory-5.jpg',
      'assets/photos/memory-6.jpg',
      'assets/photos/memory-7.jpg',
      'assets/photos/memory-8.jpg',
      'assets/photos/memory-9.jpg'
    ],
    bgMusicVolume: 0.35,
    slideshowInterval: 4200, // 4.2 seconds
    petalCount: 36
  };

  // State object
  const state = {
    currentPage: 1,
    isBgMusicPlaying: false,
    wasBgMusicPlayingBeforeVoice: false,
    isVoicePlaying: false,
    currentSlideIndex: 0,
    isSlideshowAuto: true,
    slideshowTimer: null,
    hasVoiceFinished: false
  };

  // DOM Elements
  const DOM = {
    pages: document.querySelectorAll('.story-page'),
    stepDots: document.querySelectorAll('.step-dot'),
    bgMusic: document.getElementById('bgMusic'),
    musicToggleBtn: document.getElementById('musicToggleBtn'),
    voiceAudio: document.getElementById('voiceAudio'),
    headphoneBtn: document.getElementById('headphoneBtn'),
    playSvgIcon: document.getElementById('playSvgIcon'),
    pauseSvgIcon: document.getElementById('pauseSvgIcon'),
    playerTapHint: document.getElementById('playerTapHint'),
    soundVisualizer: document.getElementById('soundVisualizer'),
    voiceCurrentTime: document.getElementById('voiceCurrentTime'),
    voiceDuration: document.getElementById('voiceDuration'),
    voiceProgressTrack: document.getElementById('voiceProgressTrack'),
    voiceProgressFill: document.getElementById('voiceProgressFill'),
    voiceFinishedCard: document.getElementById('voiceFinishedCard'),
    voiceNextAction: document.getElementById('voiceNextAction'),
    slidesViewport: document.getElementById('slidesViewport'),
    slidesStrip: document.getElementById('slidesStrip'),
    thumbnailsRail: document.getElementById('thumbnailsRail'),
    prevSlideBtn: document.getElementById('prevSlideBtn'),
    nextSlideBtn: document.getElementById('nextSlideBtn'),
    slideCounterBadge: document.getElementById('slideCounterBadge'),
    autoplayToggleBtn: document.getElementById('autoplayToggleBtn'),
    photoLightbox: document.getElementById('photoLightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxOverlay: document.getElementById('lightboxOverlay'),
    lightboxCloseBtn: document.getElementById('lightboxCloseBtn'),
    celebrateBtn: document.getElementById('celebrateBtn'),
    petalsCanvas: document.getElementById('petalsCanvas'),
    interactiveEffects: document.getElementById('interactiveEffects')
  };

  // ==========================================================================
  // 2. PAGE NAVIGATION
  // ==========================================================================
  function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > 4) return;
    state.currentPage = pageNumber;

    // Update active page class
    DOM.pages.forEach((page) => {
      const idx = parseInt(page.getAttribute('data-page-index'), 10);
      if (idx === pageNumber) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    // Update step dots
    DOM.stepDots.forEach((dot) => {
      const dotPage = parseInt(dot.getAttribute('data-page'), 10);
      if (dotPage === pageNumber) {
        dot.classList.add('active');
        dot.classList.remove('completed');
      } else if (dotPage < pageNumber) {
        dot.classList.remove('active');
        dot.classList.add('completed');
      } else {
        dot.classList.remove('active', 'completed');
      }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page-specific triggers
    if (pageNumber === 3) {
      startSlideshow();
    } else {
      pauseSlideshow();
    }

    if (pageNumber === 4) {
      triggerCelebrationBurst(50);
    }
  }

  // Bind step dot clicks
  DOM.stepDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const page = parseInt(dot.getAttribute('data-page'), 10);
      goToPage(page);
    });
  });

  // Expose to window for inline onclick handlers
  window.PakkiApp = {
    goToPage: goToPage
  };

  // ==========================================================================
  // 3. BACKGROUND MUSIC MANAGEMENT
  // ==========================================================================
  function initBackgroundMusic() {
    if (!DOM.bgMusic) return;
    DOM.bgMusic.volume = CONFIG.bgMusicVolume;

    // Autoplay attempt
    const playPromise = DOM.bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setMusicUIState(true);
        })
        .catch(() => {
          // Browser blocked autoplay without user gesture.
          // Listen for first interaction anywhere to unlock audio.
          setMusicUIState(false);
          addFirstInteractionListener();
        });
    }

    if (DOM.musicToggleBtn) {
      DOM.musicToggleBtn.addEventListener('click', toggleBackgroundMusic);
    }
  }

  function addFirstInteractionListener() {
    const unlockAudio = () => {
      if (!state.isBgMusicPlaying && !state.isVoicePlaying) {
        DOM.bgMusic.play().then(() => {
          setMusicUIState(true);
        }).catch(() => {});
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
  }

  function setMusicUIState(isPlaying) {
    state.isBgMusicPlaying = isPlaying;
    if (DOM.musicToggleBtn) {
      if (isPlaying) {
        DOM.musicToggleBtn.classList.add('playing');
        const text = DOM.musicToggleBtn.querySelector('.music-status-text');
        if (text) text.textContent = 'Song Playing';
      } else {
        DOM.musicToggleBtn.classList.remove('playing');
        const text = DOM.musicToggleBtn.querySelector('.music-status-text');
        if (text) text.textContent = 'Song Muted';
      }
    }
  }

  function toggleBackgroundMusic(e) {
    if (e) e.stopPropagation();
    if (!DOM.bgMusic) return;

    if (DOM.bgMusic.paused) {
      DOM.bgMusic.play().then(() => {
        setMusicUIState(true);
      }).catch((err) => console.log('Audio playback prevented:', err));
    } else {
      DOM.bgMusic.pause();
      setMusicUIState(false);
    }
  }

  function pauseBgMusicForVoice() {
    if (!DOM.bgMusic) return;
    state.wasBgMusicPlayingBeforeVoice = !DOM.bgMusic.paused;
    if (!DOM.bgMusic.paused) {
      DOM.bgMusic.pause();
      setMusicUIState(false);
    }
  }

  function resumeBgMusicAfterVoice() {
    if (!DOM.bgMusic) return;
    if (state.wasBgMusicPlayingBeforeVoice) {
      DOM.bgMusic.play().then(() => {
        setMusicUIState(true);
      }).catch(() => {});
    }
  }

  // ==========================================================================
  // 4. VOICE RECORDING PLAYER (PAGE 2)
  // ==========================================================================
  function initVoicePlayer() {
    if (!DOM.voiceAudio || !DOM.headphoneBtn) return;

    DOM.headphoneBtn.addEventListener('click', toggleVoicePlayback);

    // Audio event listeners
    DOM.voiceAudio.addEventListener('loadedmetadata', () => {
      DOM.voiceDuration.textContent = formatTime(DOM.voiceAudio.duration);
    });

    DOM.voiceAudio.addEventListener('timeupdate', () => {
      const cur = DOM.voiceAudio.currentTime;
      const dur = DOM.voiceAudio.duration || 1;
      DOM.voiceCurrentTime.textContent = formatTime(cur);
      const progressPercent = (cur / dur) * 100;
      DOM.voiceProgressFill.style.width = `${progressPercent}%`;
    });

    // Click track to scrub
    if (DOM.voiceProgressTrack) {
      DOM.voiceProgressTrack.addEventListener('click', (e) => {
        const rect = DOM.voiceProgressTrack.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        if (DOM.voiceAudio.duration) {
          DOM.voiceAudio.currentTime = pos * DOM.voiceAudio.duration;
        }
      });
    }

    // Audio finished event
    DOM.voiceAudio.addEventListener('ended', onVoicePlaybackEnded);
  }

  function toggleVoicePlayback() {
    if (!DOM.voiceAudio) return;

    if (DOM.voiceAudio.paused) {
      // Pause background music
      pauseBgMusicForVoice();

      DOM.voiceAudio.play().then(() => {
        state.isVoicePlaying = true;
        updateVoiceUI(true);
      }).catch((err) => console.log('Voice audio play blocked:', err));
    } else {
      DOM.voiceAudio.pause();
      state.isVoicePlaying = false;
      updateVoiceUI(false);
      resumeBgMusicAfterVoice();
    }
  }

  function updateVoiceUI(isPlaying) {
    if (isPlaying) {
      DOM.headphoneBtn.classList.add('playing');
      DOM.playSvgIcon.style.display = 'none';
      DOM.pauseSvgIcon.style.display = 'block';
      DOM.soundVisualizer.classList.add('active');
      if (DOM.playerTapHint) {
        DOM.playerTapHint.querySelector('.hint-text').textContent = 'Listening... (Tap to Pause)';
      }
    } else {
      DOM.headphoneBtn.classList.remove('playing');
      DOM.playSvgIcon.style.display = 'block';
      DOM.pauseSvgIcon.style.display = 'none';
      DOM.soundVisualizer.classList.remove('active');
      if (DOM.playerTapHint) {
        DOM.playerTapHint.querySelector('.hint-text').textContent = 'Tap to Play';
      }
    }
  }

  function onVoicePlaybackEnded() {
    state.isVoicePlaying = false;
    updateVoiceUI(false);
    resumeBgMusicAfterVoice();

    // Show required message:
    // "manasu laa thoonutha pesunen thoonuchu pattu maa"
    if (DOM.voiceFinishedCard) {
      DOM.voiceFinishedCard.classList.remove('hidden-reveal');
      DOM.voiceFinishedCard.classList.add('revealed');
    }

    // Reveal next button
    if (DOM.voiceNextAction) {
      DOM.voiceNextAction.classList.remove('hidden-reveal');
      DOM.voiceNextAction.classList.add('revealed');
    }

    state.hasVoiceFinished = true;
    triggerCelebrationBurst(25);
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // ==========================================================================
  // 5. OUR MEMORIES SLIDESHOW & GALLERY (PAGE 3)
  // ==========================================================================
  function initMemoriesGallery() {
    if (!DOM.slidesStrip || !CONFIG.memoryPhotos.length) return;

    DOM.slidesStrip.innerHTML = '';
    DOM.thumbnailsRail.innerHTML = '';

    // Create Slides & Thumbnails
    CONFIG.memoryPhotos.forEach((src, index) => {
      // Main Slide
      const slide = document.createElement('div');
      slide.className = `slide-item ${index === 0 ? 'active' : ''}`;
      slide.setAttribute('data-index', index);

      const img = document.createElement('img');
      img.src = src;
      img.alt = `Memory ${index + 1}`;
      img.className = 'slide-image';
      img.loading = index < 2 ? 'eager' : 'lazy';

      slide.appendChild(img);
      DOM.slidesStrip.appendChild(slide);

      // Slide click opens Lightbox
      slide.addEventListener('click', () => {
        openLightbox(src);
      });

      // Thumbnail
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${index === 0 ? 'active' : ''}`;
      thumb.setAttribute('data-index', index);

      const thumbImg = document.createElement('img');
      thumbImg.src = src;
      thumbImg.alt = `Thumb ${index + 1}`;
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => {
        goToSlide(index);
      });

      DOM.thumbnailsRail.appendChild(thumb);
    });

    updateSlideCounter();

    // Controls
    if (DOM.prevSlideBtn) {
      DOM.prevSlideBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToPrevSlide();
      });
    }

    if (DOM.nextSlideBtn) {
      DOM.nextSlideBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToNextSlide();
      });
    }

    // Autoplay toggle button
    if (DOM.autoplayToggleBtn) {
      DOM.autoplayToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.isSlideshowAuto = !state.isSlideshowAuto;
        if (state.isSlideshowAuto) {
          DOM.autoplayToggleBtn.classList.remove('paused');
          startSlideshow();
        } else {
          DOM.autoplayToggleBtn.classList.add('paused');
          pauseSlideshow();
        }
      });
    }

    // Touch Swipe Gestures for Mobile
    initSwipeGestures();
  }

  function goToSlide(index) {
    const total = CONFIG.memoryPhotos.length;
    if (total === 0) return;

    state.currentSlideIndex = (index + total) % total;

    // Update slide classes
    const slides = DOM.slidesStrip.querySelectorAll('.slide-item');
    slides.forEach((slide, idx) => {
      if (idx === state.currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update thumbnail classes
    const thumbs = DOM.thumbnailsRail.querySelectorAll('.thumb-item');
    thumbs.forEach((thumb, idx) => {
      if (idx === state.currentSlideIndex) {
        thumb.classList.add('active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('active');
      }
    });

    updateSlideCounter();
  }

  function goToNextSlide() {
    goToSlide(state.currentSlideIndex + 1);
  }

  function goToPrevSlide() {
    goToSlide(state.currentSlideIndex - 1);
  }

  function updateSlideCounter() {
    if (DOM.slideCounterBadge) {
      DOM.slideCounterBadge.textContent = `${state.currentSlideIndex + 1} / ${CONFIG.memoryPhotos.length}`;
    }
  }

  function startSlideshow() {
    pauseSlideshow();
    if (!state.isSlideshowAuto) return;
    state.slideshowTimer = setInterval(() => {
      goToNextSlide();
    }, CONFIG.slideshowInterval);
  }

  function pauseSlideshow() {
    if (state.slideshowTimer) {
      clearInterval(state.slideshowTimer);
      state.slideshowTimer = null;
    }
  }

  // Touch Swipe for Mobile Gallery
  function initSwipeGestures() {
    if (!DOM.slidesViewport) return;
    let touchStartX = 0;
    let touchEndX = 0;

    DOM.slidesViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    DOM.slidesViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40;
      if (touchEndX < touchStartX - threshold) {
        goToNextSlide();
      } else if (touchEndX > touchStartX + threshold) {
        goToPrevSlide();
      }
    }
  }

  // ==========================================================================
  // 6. LIGHTBOX MODAL
  // ==========================================================================
  function initLightbox() {
    if (!DOM.photoLightbox) return;

    if (DOM.lightboxOverlay) {
      DOM.lightboxOverlay.addEventListener('click', closeLightbox);
    }
    if (DOM.lightboxCloseBtn) {
      DOM.lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.photoLightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  function openLightbox(src) {
    if (!DOM.photoLightbox || !DOM.lightboxImg) return;
    DOM.lightboxImg.src = src;
    DOM.photoLightbox.classList.add('open');
    DOM.photoLightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!DOM.photoLightbox) return;
    DOM.photoLightbox.classList.remove('open');
    DOM.photoLightbox.setAttribute('aria-hidden', 'true');
  }

  // ==========================================================================
  // 7. REALISTIC FALLING RED HIBISCUS PETALS (CANVAS)
  // ==========================================================================
  class PetalSystem {
    constructor(canvas, count) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.count = count;
      this.petals = [];
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.wind = 0;
      this.windTarget = 0;

      this.resize();
      this.initPetals();
      this.bindEvents();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());

      // Wind responds gently to mouse/touch movement
      window.addEventListener('mousemove', (e) => {
        const norm = (e.clientX / this.width) - 0.5;
        this.windTarget = norm * 1.5;
      });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const norm = (e.touches[0].clientX / this.width) - 0.5;
          this.windTarget = norm * 1.5;
        }
      }, { passive: true });
    }

    createPetal(randomY = true) {
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : -30 - Math.random() * 40,
        size: 14 + Math.random() * 20, // petal size
        speedY: 1.0 + Math.random() * 1.8,
        speedX: -0.6 + Math.random() * 1.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.2,
        flipAngle: Math.random() * 360,
        flipSpeed: 1.5 + Math.random() * 2.5,
        opacity: 0.65 + Math.random() * 0.35,
        colorVariant: Math.random() // blend deep red and rose gold hues
      };
    }

    initPetals() {
      this.petals = [];
      for (let i = 0; i < this.count; i++) {
        this.petals.push(this.createPetal(true));
      }
    }

    drawHibiscusPetal(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      // 3D flip effect around Y axis
      const flipScale = Math.cos((p.flipAngle * Math.PI) / 180);
      ctx.scale(flipScale, 1);

      ctx.globalAlpha = p.opacity;

      const w = p.size;
      const h = p.size * 1.35;

      // Hibiscus Petal Organic Curve Gradient
      const grad = ctx.createRadialGradient(-w * 0.1, -h * 0.3, 2, 0, 0, h);
      if (p.colorVariant > 0.4) {
        // Velvety Deep Red Hibiscus
        grad.addColorStop(0, '#B72436');
        grad.addColorStop(0.5, '#8B0000');
        grad.addColorStop(0.85, '#680512');
        grad.addColorStop(1, '#4A0510');
      } else {
        // Romantic Rose-Crimson Hibiscus Petal
        grad.addColorStop(0, '#D45B6C');
        grad.addColorStop(0.5, '#A3152B');
        grad.addColorStop(0.9, '#750B1B');
        grad.addColorStop(1, '#530612');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Organic teardrop petal curve
      ctx.moveTo(0, h * 0.5);
      ctx.bezierCurveTo(-w * 0.7, h * 0.2, -w * 0.8, -h * 0.4, 0, -h * 0.5);
      ctx.bezierCurveTo(w * 0.8, -h * 0.4, w * 0.7, h * 0.2, 0, h * 0.5);
      ctx.closePath();
      ctx.fill();

      // Delicate Central Vein Accent
      ctx.strokeStyle = 'rgba(255, 200, 210, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.45);
      ctx.quadraticCurveTo(w * 0.05, 0, 0, -h * 0.35);
      ctx.stroke();

      ctx.restore();
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Smooth wind transition
      this.wind += (this.windTarget - this.wind) * 0.04;

      for (let i = 0; i < this.petals.length; i++) {
        const p = this.petals[i];

        p.y += p.speedY;
        p.x += p.speedX + this.wind;
        p.rotation += p.rotationSpeed;
        p.flipAngle += p.flipSpeed;

        // Reset if offscreen
        if (p.y > this.height + 40) {
          this.petals[i] = this.createPetal(false);
        } else if (p.x < -50) {
          p.x = this.width + 40;
        } else if (p.x > this.width + 50) {
          p.x = -40;
        }

        this.drawHibiscusPetal(this.ctx, p);
      }

      requestAnimationFrame(this.animate);
    }
  }

  // ==========================================================================
  // 8. INTERACTIVE FLOATING HEARTS & CELEBRATION BURST
  // ==========================================================================
  function initInteractiveHearts() {
    window.addEventListener('click', (e) => {
      // Don't spawn on button clicks to avoid interference
      if (e.target.closest('button') || e.target.closest('.thumb-item')) return;
      spawnFloatingHeart(e.clientX, e.clientY);
    });
  }

  function spawnFloatingHeart(x, y) {
    if (!DOM.interactiveEffects) return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart';

    const symbols = ['❤️', '🌺', '💖', '✨', '🌹'];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const offsetX = (Math.random() - 0.5) * 40;
    heart.style.left = `${x + offsetX}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${1.1 + Math.random() * 0.7}rem`;

    DOM.interactiveEffects.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }

  function triggerCelebrationBurst(count = 35) {
    if (!DOM.interactiveEffects) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.6;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const x = centerX + (Math.random() - 0.5) * window.innerWidth * 0.75;
        const y = centerY + (Math.random() - 0.5) * window.innerHeight * 0.45;
        spawnFloatingHeart(x, y);
      }, i * 65);
    }
  }

  // ==========================================================================
  // 9. INITIALIZATION
  // ==========================================================================
  function init() {
    // 1. Hibiscus Petals falling canvas
    if (DOM.petalsCanvas) {
      new PetalSystem(DOM.petalsCanvas, CONFIG.petalCount);
    }

    // 2. Audio systems
    initBackgroundMusic();
    initVoicePlayer();

    // 3. Memories Slideshow Gallery
    initMemoriesGallery();
    initLightbox();

    // 4. Interactive hearts
    initInteractiveHearts();

    // 5. Celebrate Button
    if (DOM.celebrateBtn) {
      DOM.celebrateBtn.addEventListener('click', () => {
        triggerCelebrationBurst(40);
      });
    }

    // Direct start with Pakki's Journey (Page 1)
    goToPage(1);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
