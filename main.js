// WINNERS CHAPEL INTERNATIONAL MIDDLESBROUGH INTERACTIVE SCRIPT

document.addEventListener('DOMContentLoaded', () => {

  // --- 0. Hero Background Slideshow System ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('#heroSlideDots .dot');
  const btnHeroPrev = document.getElementById('btnHeroPrev');
  const btnHeroNext = document.getElementById('btnHeroNext');
  const heroSection = document.getElementById('home');

  let currentSlide = 0;
  let slideInterval = null;
  const SLIDE_DURATION = 5000; // 5 seconds

  function goToSlide(index) {
    if (!heroSlides.length) return;
    
    currentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    heroDots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (heroSlides.length) {
    startSlideTimer();

    if (btnHeroNext) {
      btnHeroNext.addEventListener('click', () => {
        nextSlide();
        startSlideTimer();
      });
    }

    if (btnHeroPrev) {
      btnHeroPrev.addEventListener('click', () => {
        prevSlide();
        startSlideTimer();
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startSlideTimer();
      });
    });

    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopSlideTimer);
      heroSection.addEventListener('mouseleave', startSlideTimer);
    }
  }

  // --- 1. Service Countdown System ---
  function updateServiceCountdown() {
    const now = new Date();
    
    // Determine next service
    // Services:
    // Sunday Celebration: Sun @ 10:00 AM
    // Midweek Service: Wed @ 18:00 PM
    // Covenant Hour of Prayer: Mon-Sat @ 06:00 AM
    
    let target = new Date();
    let serviceName = "Sunday Celebration Service";
    let serviceDesc = "Join us for a glorious time in God's presence, praise, and the Word.";

    const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Simple logic for next target date
    if (day === 0 && hours < 10) {
      // Today Sunday before 10 AM
      target.setHours(10, 0, 0, 0);
      serviceName = "Sunday Celebration Service";
    } else if (day === 3 && hours < 18) {
      // Today Wed before 6 PM
      target.setHours(18, 0, 0, 0);
      serviceName = "Midweek Communion Service";
      serviceDesc = "Spiritual midweek tune-up with Word teaching and Holy Communion.";
    } else if (hours < 6 && day !== 0) {
      // Today morning before 6 AM CHOP
      target.setHours(6, 0, 0, 0);
      serviceName = "Covenant Hour of Prayer (CHOP)";
      serviceDesc = "Start your morning in spiritual fire and intercession.";
    } else {
      // Find next upcoming service
      let daysUntilSunday = (7 - day) % 7;
      if (daysUntilSunday === 0 && hours >= 10) daysUntilSunday = 7;
      
      target.setDate(now.getDate() + (daysUntilSunday || 7));
      target.setHours(10, 0, 0, 0);
      serviceName = "Sunday Celebration Service";
    }

    const diff = target - now;

    if (diff > 0) {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      // Main Clock
      const cdDays = document.getElementById('cdDays');
      const cdHours = document.getElementById('cdHours');
      const cdMins = document.getElementById('cdMins');
      const cdSecs = document.getElementById('cdSecs');
      
      if (cdDays) cdDays.textContent = String(d).padStart(2, '0');
      if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
      if (cdMins) cdMins.textContent = String(m).padStart(2, '0');
      if (cdSecs) cdSecs.textContent = String(s).padStart(2, '0');

      // Header top bar
      const headerTimer = document.getElementById('headerTimer');
      if (headerTimer) {
        headerTimer.textContent = `${d}d ${h}h ${m}m ${s}s`;
      }

      // Next Service Banner Text
      const nextName = document.getElementById('nextServiceName');
      const nextDetail = document.getElementById('nextServiceDetail');
      if (nextName) nextName.textContent = serviceName;
      if (nextDetail) nextDetail.textContent = serviceDesc;
    }
  }

  setInterval(updateServiceCountdown, 1000);
  updateServiceCountdown();


  // --- 2. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }


  // --- 3. Media Center Tabs ---
  const mediaTabs = document.querySelectorAll('.media-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  mediaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `tab-${tab.dataset.tab}`;
      
      mediaTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.add('active');
    });
  });


  // --- 4. Interactive Live Chat ---
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');

  if (chatForm && chatInput && chatBox) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = chatInput.value.trim();
      if (msg) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg';
        msgDiv.innerHTML = `<strong>You:</strong> ${escapeHtml(msg)}`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        chatInput.value = '';
      }
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }


  // --- 5. Sermon Notes Downloader ---
  const btnSaveNotes = document.getElementById('btnSaveNotes');
  const btnClearNotes = document.getElementById('btnClearNotes');

  if (btnSaveNotes) {
    btnSaveNotes.addEventListener('click', () => {
      const title = document.getElementById('noteTitle').value || 'Sermon Notes';
      const preacher = document.getElementById('notePreacher').value || 'Winners Chapel';
      const content = document.getElementById('noteContent').value || '';

      const fileContent = `=========================================\nWINNERS CHAPEL INTERNATIONAL MIDDLESBROUGH\nSERMON NOTES\n=========================================\nTitle: ${title}\nPreacher: ${preacher}\nDate: ${new Date().toLocaleDateString()}\n-----------------------------------------\n\n${content}\n\n=========================================\nLiving Faith Church Worldwide - Middlesbrough\nhttps://winnerschapel.org.uk\n`;

      const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_notes.txt`;
      link.click();

      showToast('Sermon notes downloaded to your device!');
    });
  }

  if (btnClearNotes) {
    btnClearNotes.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your notes?')) {
        document.getElementById('noteContent').value = '';
        showToast('Notepad cleared.');
      }
    });
  }


  // --- 6. Testimonies Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const testimonyCards = document.querySelectorAll('.testimony-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      testimonyCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // --- 7. WSF Postcode & Cell Area Filter System ---
  const wsfPostcodeForm = document.getElementById('wsfPostcodeForm');
  const wsfPostcodeInput = document.getElementById('wsfPostcodeInput');
  const wsfSelect = document.getElementById('wsfLocationSelect');
  const wsfCards = document.querySelectorAll('.wsf-card');
  const wsfResultBanner = document.getElementById('wsfSearchResultBanner');
  const wsfResultText = document.getElementById('wsfResultText');
  const btnResetPostcode = document.getElementById('btnResetPostcode');

  // Outcode Lat/Lon map for Teesside and UK regions
  const postcodeCoords = {
    'TS1': { lat: 54.576, lon: -1.234 },
    'TS2': { lat: 54.582, lon: -1.220 },
    'TS3': { lat: 54.568, lon: -1.205 },
    'TS4': { lat: 54.553, lon: -1.215 },
    'TS5': { lat: 54.548, lon: -1.246 },
    'TS6': { lat: 54.565, lon: -1.162 },
    'TS7': { lat: 54.530, lon: -1.190 },
    'TS8': { lat: 54.520, lon: -1.220 },
    'TS9': { lat: 54.470, lon: -1.190 },
    'TS10': { lat: 54.615, lon: -1.068 },
    'TS11': { lat: 54.590, lon: -1.020 },
    'TS12': { lat: 54.580, lon: -0.970 },
    'TS13': { lat: 54.550, lon: -0.890 },
    'TS14': { lat: 54.535, lon: -1.050 },
    'TS15': { lat: 54.510, lon: -1.350 },
    'TS16': { lat: 54.525, lon: -1.355 },
    'TS17': { lat: 54.542, lon: -1.300 },
    'TS18': { lat: 54.565, lon: -1.315 },
    'TS19': { lat: 54.580, lon: -1.332 },
    'TS20': { lat: 54.588, lon: -1.318 },
    'TS21': { lat: 54.650, lon: -1.440 },
    'TS22': { lat: 54.625, lon: -1.275 },
    'TS23': { lat: 54.608, lon: -1.285 },
    'TS24': { lat: 54.685, lon: -1.215 },
    'TS25': { lat: 54.665, lon: -1.210 },
    'TS26': { lat: 54.690, lon: -1.225 },
    'TS27': { lat: 54.720, lon: -1.270 },
    'TS28': { lat: 54.735, lon: -1.330 },
    'TS29': { lat: 54.715, lon: -1.380 },
    'DL1': { lat: 54.527, lon: -1.555 },
    'DL2': { lat: 54.535, lon: -1.630 },
    'DL3': { lat: 54.532, lon: -1.570 },
    'DL4': { lat: 54.605, lon: -1.635 },
    'DL5': { lat: 54.620, lon: -1.575 },
    'DL14': { lat: 54.660, lon: -1.680 },
    'DL15': { lat: 54.700, lon: -1.770 },
    'DL16': { lat: 54.700, lon: -1.570 },
    'DL17': { lat: 54.680, lon: -1.510 },
    'DH1': { lat: 54.775, lon: -1.575 },
    'SR1': { lat: 54.905, lon: -1.380 },
    'NE1': { lat: 54.978, lon: -1.617 },
    'YO1': { lat: 53.958, lon: -1.082 }
  };

  function calculateDistanceMiles(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 999;
    const R = 3958.8; // Earth radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function performPostcodeSearch(query) {
    if (!query) {
      resetWsfFilter();
      return;
    }

    const cleanedQuery = query.trim().toUpperCase().replace(/\s+/g, '');
    let userOutcode = '';

    const outcodeMatch = cleanedQuery.match(/^([A-Z]{1,2}\d+[A-Z]?)/);
    if (outcodeMatch) {
      userOutcode = outcodeMatch[1];
    }

    // Determine user coordinates (from lookup table or default to Middlesbrough center)
    const userCoords = postcodeCoords[userOutcode] || { lat: 54.576, lon: -1.234 };

    // Calculate distance to each cell
    const cellDistances = [];

    wsfCards.forEach(card => {
      card.querySelectorAll('.badge-nearest').forEach(b => b.remove());
      const cardPostcode = (card.dataset.postcode || '').replace(/\s+/g, '');
      const cardOutcode = card.dataset.outcode || '';
      const isOnline = cardOutcode === 'ONLINE';

      if (isOnline) {
        cellDistances.push({ card, dist: 999, isOnline: true, isExact: false, isOutcodeMatch: false });
        return;
      }

      const cardLat = parseFloat(card.dataset.lat);
      const cardLon = parseFloat(card.dataset.lon);

      const isExact = cardPostcode && cleanedQuery.length >= 5 && cardPostcode === cleanedQuery;
      const isOutcodeMatch = userOutcode && cardOutcode === userOutcode;
      const dist = calculateDistanceMiles(userCoords.lat, userCoords.lon, cardLat, cardLon);

      cellDistances.push({ card, dist, isOnline: false, isExact, isOutcodeMatch });
    });

    // Sort physical cells by distance (ascending)
    cellDistances.sort((a, b) => {
      if (a.isOnline) return 1;
      if (b.isOnline) return -1;
      if (a.isExact) return -1;
      if (b.isExact) return 1;
      return a.dist - b.dist;
    });

    // Determine nearest distance and render badges
    let closestPhysicalCell = cellDistances.find(item => !item.isOnline);
    let hasExactMatch = cellDistances.some(item => item.isExact);
    let hasOutcodeMatch = cellDistances.some(item => item.isOutcodeMatch);

    cellDistances.forEach((item, index) => {
      const { card, dist, isOnline, isExact, isOutcodeMatch } = item;
      card.style.display = 'block';
      card.style.order = String(index);

      if (isExact) {
        const badge = document.createElement('span');
        badge.className = 'badge-nearest badge-exact';
        badge.innerHTML = `<i class="fa-solid fa-location-dot"></i> Exact Match (${card.dataset.postcode})`;
        card.prepend(badge);
      } else if (isOutcodeMatch) {
        const badge = document.createElement('span');
        badge.className = 'badge-nearest';
        badge.innerHTML = `<i class="fa-solid fa-location-dot"></i> Matched Area (${card.dataset.outcode} • ~${dist.toFixed(1)} mi)`;
        card.prepend(badge);
      } else if (!isOnline && item === closestPhysicalCell) {
        // If not exact/outcode match, mark the absolute closest cell!
        const badge = document.createElement('span');
        badge.className = 'badge-nearest badge-closest';
        badge.innerHTML = `<i class="fa-solid fa-location-arrow"></i> Closest Home Cell (~${dist.toFixed(1)} miles away)`;
        card.prepend(badge);
      }
    });

    if (wsfResultBanner && wsfResultText) {
      wsfResultBanner.style.display = 'block';
      const nearestDist = closestPhysicalCell ? closestPhysicalCell.dist.toFixed(1) : '0.0';

      if (hasExactMatch) {
        wsfResultText.innerHTML = `Found exact Home Cell match for <strong>"${escapeHtml(query.toUpperCase())}"</strong>!`;
      } else if (hasOutcodeMatch) {
        wsfResultText.innerHTML = `Found Home Cells in area <strong>"${escapeHtml(userOutcode)}"</strong> (Nearest is ~${nearestDist} miles away).`;
      } else {
        wsfResultText.innerHTML = `Postcode <strong>"${escapeHtml(query.toUpperCase())}"</strong> is not directly in the list — displaying closest home cells ordered by distance (Nearest is approx <strong>${nearestDist} miles away</strong>).`;
      }
    }
  }

  function resetWsfFilter() {
    if (wsfPostcodeInput) wsfPostcodeInput.value = '';
    if (wsfSelect) wsfSelect.value = 'all';
    if (wsfResultBanner) wsfResultBanner.style.display = 'none';
    
    wsfCards.forEach(card => {
      card.style.display = 'block';
      card.style.order = '0';
      card.querySelectorAll('.badge-nearest').forEach(b => b.remove());
    });
  }

  if (wsfPostcodeForm) {
    wsfPostcodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      performPostcodeSearch(wsfPostcodeInput.value);
    });

    if (wsfPostcodeInput) {
      wsfPostcodeInput.addEventListener('input', () => {
        if (!wsfPostcodeInput.value.trim()) {
          resetWsfFilter();
        } else {
          performPostcodeSearch(wsfPostcodeInput.value);
        }
      });
    }
  }

  if (wsfSelect) {
    wsfSelect.addEventListener('change', () => {
      const area = wsfSelect.value;
      if (wsfResultBanner) wsfResultBanner.style.display = 'none';
      if (wsfPostcodeInput) wsfPostcodeInput.value = '';

      wsfCards.forEach(card => {
        card.querySelectorAll('.badge-nearest').forEach(b => b.remove());
        card.style.order = '0';
        if (area === 'all' || card.dataset.area === area) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  if (btnResetPostcode) {
    btnResetPostcode.addEventListener('click', resetWsfFilter);
  }


  // --- 8. Bank Transfer Details Copy Tool ---
  const btnCopySort = document.getElementById('btnCopySortCode');
  const btnCopyAcc = document.getElementById('btnCopyAccNo');

  if (btnCopySort) {
    btnCopySort.addEventListener('click', () => {
      navigator.clipboard.writeText('40-33-01');
      showToast('Sort Code (40-33-01) copied to clipboard!');
    });
  }

  if (btnCopyAcc) {
    btnCopyAcc.addEventListener('click', () => {
      navigator.clipboard.writeText('81234567');
      showToast('Account Number (81234567) copied to clipboard!');
    });
  }


  // --- 9. Giving Tab Selection ---
  const givingTabs = document.querySelectorAll('.giving-tab-btn');
  const givingRefText = document.getElementById('givingRefText');

  givingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      givingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const givingType = tab.dataset.giving;
      if (givingRefText) {
        givingRefText.innerHTML = `<em>Use Reference: "${givingType.toUpperCase()}"</em>`;
      }
    });
  });


  // --- 10. Modal Window System ---
  const firstTimerModal = document.getElementById('firstTimerModal');
  const prayerModal = document.getElementById('prayerModal');
  const givingModal = document.getElementById('givingModal');
  const testimonyModal = document.getElementById('testimonyModal');

  function openModal(modal) {
    if (modal) modal.classList.add('active');
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('active');
  }

  // Trigger buttons
  document.getElementById('btnFirstTimerNav')?.addEventListener('click', () => openModal(firstTimerModal));
  document.getElementById('btnFirstTimerAbout')?.addEventListener('click', () => openModal(firstTimerModal));
  
  document.getElementById('btnPrayerHero')?.addEventListener('click', () => openModal(prayerModal));
  
  document.getElementById('btnGivingNav')?.addEventListener('click', () => openModal(givingModal));
  document.getElementById('btnOpenGivingModal')?.addEventListener('click', () => openModal(givingModal));
  document.getElementById('btnOpenGivingModalMain')?.addEventListener('click', () => openModal(givingModal));
  
  document.getElementById('btnSubmitTestimony')?.addEventListener('click', () => openModal(testimonyModal));
  document.getElementById('btnWatchLiveHero')?.addEventListener('click', () => {
    document.getElementById('media')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll('.btnConnectCell').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(firstTimerModal);
    });
  });

  document.querySelectorAll('.btnServiceReminder').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.dataset.service;
      showToast(`Reminder set for ${serviceName}! We look forward to seeing you.`);
    });
  });

  document.querySelectorAll('.btnWatchSermon').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Streaming audio message... Glory to God!');
    });
  });

  // Close modals on X click or backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close') || e.target.classList.contains('btnCloseModal')) {
        closeModal(modal);
      }
    });
  });

  // Modal Forms Submissions
  document.getElementById('firstTimerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal(firstTimerModal);
    showToast('Welcome! Your details have been received. Our hospitality team will be in touch!');
  });

  document.getElementById('prayerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal(prayerModal);
    showToast('Your prayer request has been sent to our Prayer Tower. God will answer you!');
  });

  document.getElementById('onlineGivingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal(givingModal);
    showToast('Thank you for your seed! God bless your generous heart abundantly.');
  });

  document.getElementById('testimonyForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal(testimonyModal);
    showToast('Praise God! Your testimony has been submitted for review.');
  });

  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you for contacting Winners Chapel Middlesbrough. We will respond promptly.');
    e.target.reset();
  });

  // --- 11. Toast Helper ---
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

});
