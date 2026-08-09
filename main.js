// WINNERS CHAPEL INTERNATIONAL MIDDLESBROUGH INTERACTIVE SCRIPT

document.addEventListener('DOMContentLoaded', () => {

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


  // --- 7. WSF Cell Area Filter ---
  const wsfSelect = document.getElementById('wsfLocationSelect');
  const wsfCards = document.querySelectorAll('.wsf-card');

  if (wsfSelect) {
    wsfSelect.addEventListener('change', () => {
      const area = wsfSelect.value;
      wsfCards.forEach(card => {
        if (area === 'all' || card.dataset.area === area) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
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
