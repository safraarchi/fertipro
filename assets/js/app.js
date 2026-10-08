/**
 * Fertipro Sawit - Official Landing Page JavaScript Logic
 * Handling: Farm Acreage Calculator, COD WhatsApp Order Generator, Package Selector Sync, & Interactive Elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Config
  const WA_NUMBER = '6285704221717'; // +62 857-0422-1717

  // --- 1. Acreage & Palm Calculator ---
  const haSlider = document.getElementById('calc-ha-slider');
  const haInput = document.getElementById('calc-ha-input');
  const calcPokokVal = document.getElementById('calc-pokok-val');
  const calcDrumVal = document.getElementById('calc-drum-val');
  const calcRecPackage = document.getElementById('calc-rec-package');
  const calcTotalPrice = document.getElementById('calc-total-price');
  const calcCostPerTree = document.getElementById('calc-cost-per-tree');
  const calcBtnApply = document.getElementById('calc-btn-apply');

  function calculateNeeds(ha) {
    const pokok = Math.round(ha * 133);
    const drum = Math.round(ha * 1);
    let packageName = '';
    let totalPrice = 0;
    let packageValueForForm = 'paket-1ha';

    if (ha === 1) {
      packageName = '1 Paket Standar 1 Ha (5L POC + 1 Kg Bio Humat Pasta)';
      totalPrice = 395000;
      packageValueForForm = 'paket-1ha';
    } else if (ha === 2) {
      packageName = '2 Paket Standar (10L POC + 2 Kg Bio Humat Pasta)';
      totalPrice = 790000;
      packageValueForForm = 'paket-2ha';
    } else if (ha === 3) {
      packageName = '3 Paket Standar (15L POC + 3 Kg Bio Humat Pasta)';
      totalPrice = 1185000;
      packageValueForForm = 'paket-3ha';
    } else if (ha === 4) {
      packageName = '4 Paket Standar (20L POC + 4 Kg Bio Humat Pasta)';
      totalPrice = 1580000;
      packageValueForForm = 'paket-4ha';
    } else if (ha === 5) {
      packageName = '⭐ 1 Paket Jumbo 25L untuk 5 Ha (1 Jerigen 25L + 5 Kg Pasta) - PALING PRAKTIS!';
      totalPrice = 1975000;
      packageValueForForm = 'paket-jumbo-25l';
    } else if (ha < 10) {
      const extraHa = ha - 5;
      packageName = `1 Paket Jumbo 25L + ${extraHa} Paket Standar (Total untuk ${ha} Ha)`;
      totalPrice = 1975000 + (extraHa * 395000);
      packageValueForForm = 'paket-custom';
    } else if (ha === 10) {
      packageName = '⭐ 2 Paket Jumbo 25L untuk 10 Ha (50L POC + 10 Kg Pasta) - EKSTRA EFISIEN!';
      totalPrice = 3950000;
      packageValueForForm = 'paket-2x-jumbo-25l';
    } else {
      const jumboCount = Math.floor(ha / 5);
      const remainHa = ha % 5;
      packageName = `${jumboCount} Paket Jumbo 25L ${remainHa > 0 ? '+ ' + remainHa + ' Paket Standar' : ''} (${ha} Ha)`;
      totalPrice = (jumboCount * 1975000) + (remainHa * 395000);
      packageValueForForm = 'paket-custom';
    }

    const costPerTree = Math.round(totalPrice / pokok);

    if (calcPokokVal) calcPokokVal.innerText = `± ${pokok.toLocaleString('id-ID')} Batang Pokok`;
    if (calcDrumVal) calcDrumVal.innerText = `${drum} Drum (200L Air) / ${(ha * 200).toLocaleString('id-ID')} Liter`;
    if (calcRecPackage) calcRecPackage.innerText = packageName;
    if (calcTotalPrice) calcTotalPrice.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    if (calcCostPerTree) calcCostPerTree.innerText = `± Rp ${costPerTree.toLocaleString('id-ID')} / Pokok`;

    return { ha, packageValueForForm, packageName, totalPrice };
  }

  if (haSlider && haInput) {
    haSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 1;
      haInput.value = val;
      calculateNeeds(val);
    });

    haInput.addEventListener('input', (e) => {
      let val = parseInt(e.target.value) || 1;
      if (val < 1) val = 1;
      if (val > 50) val = 50;
      haSlider.value = Math.min(val, 20);
      calculateNeeds(val);
    });

    // Initial calculation
    calculateNeeds(parseInt(haSlider.value) || 1);
  }

  if (calcBtnApply) {
    calcBtnApply.addEventListener('click', () => {
      const ha = parseInt(haInput.value) || 1;
      const res = calculateNeeds(ha);
      const packageSelect = document.getElementById('order-package');
      if (packageSelect) {
        // Find matching option or set custom
        let found = false;
        for (let i = 0; i < packageSelect.options.length; i++) {
          if (packageSelect.options[i].value === res.packageValueForForm) {
            packageSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          packageSelect.value = 'paket-custom';
          const notesField = document.getElementById('order-notes');
          if (notesField) {
            notesField.value = `Permintaan khusus untuk kebun seluas ${res.ha} Hektar (${res.packageName})`;
          }
        }
      }

      // Scroll to order form
      const orderSection = document.getElementById('order-section');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- 2. Quick Package Select Buttons from Pricing Cards ---
  window.selectPackageAndOrder = function(packageValue) {
    const packageSelect = document.getElementById('order-package');
    if (packageSelect) {
      packageSelect.value = packageValue;
    }
    const orderSection = document.getElementById('order-section');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 3. COD WhatsApp Order Form Handler ---
  const orderForm = document.getElementById('cod-order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('order-name').value.trim();
      const phone = document.getElementById('order-phone').value.trim();
      const packageSelect = document.getElementById('order-package');
      const packageText = packageSelect ? packageSelect.options[packageSelect.selectedIndex].text : '';
      const address = document.getElementById('order-address').value.trim();
      const kecamatan = document.getElementById('order-kecamatan').value.trim();
      const kota = document.getElementById('order-kota').value.trim();
      const provinsi = document.getElementById('order-provinsi').value.trim();
      const patokan = document.getElementById('order-patokan').value.trim();
      const notes = document.getElementById('order-notes').value.trim();

      if (!name || !phone || !address || !kecamatan || !kota || !provinsi) {
        alert('Mohon lengkapi formulir alamat dan nomor WhatsApp Anda agar kurir COD dapat mengantar paket dengan lancar.');
        return;
      }

      const waMessage = 
`*FORMAT PEMESANAN FERTIPRO SAWIT (COD - BAYAR DI TEMPAT)*
----------------------------------------------
👤 *Nama Lengkap*: ${name}
📱 *No. WhatsApp*: ${phone}
📦 *Pilihan Paket*: ${packageText}

📍 *Alamat Pengiriman Lengkap*:
${address}
- *Kecamatan*: ${kecamatan}
- *Kabupaten/Kota*: ${kota}
- *Provinsi*: ${provinsi}
- *Patokan Lokasi*: ${patokan || '-'}

📝 *Catatan*: ${notes || 'Tolong proses dengan pengemasan aman & garansi ganti baru jika rusak di ekspedisi.'}
----------------------------------------------
Saya siap membayar secara COD (Bayar di Tempat) saat paket tiba di alamat. Terima kasih CS Fertipro!`;

      const encodedUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;
      window.open(encodedUrl, '_blank');
    });
  }

  // --- 4. B2B / Maklon WhatsApp Handler ---
  window.openMaklonWhatsApp = function() {
    const msg = `Halo Tim Manajemen Maklon & Kemitraan Fertipro Indonesia, saya tertarik untuk mendiskusikan peluang kerjasama:
- Pembuatan Merk Pupuk Organik Sendiri (Maklon) / Keagenan Distributor Kebun Sawit.
Mohon informasi persyaratan teknis, legalitas Kementan, pilihan formulasi, dan MOQ. Terima kasih.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // --- 5. Quick Consultation WhatsApp Handler ---
  window.openConsultationWhatsApp = function(topic) {
    let msg = `Halo CS Fertipro, saya ingin konsultasi perawatan kebun kelapa sawit saya.`;
    if (topic) {
      msg = `Halo CS Fertipro, saya ingin konsultasi mengenai ${topic} di kebun sawit saya. Mohon dibantu saran takaran dan pengaplikasiannya.`;
    }
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // --- 6. Live Rolling Countdown Timer ---
  function initCountdown() {
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!hoursEl || !minutesEl || !secondsEl) return;

    // Set end of today as initial target
    let targetTime = new Date();
    targetTime.setHours(23, 59, 59, 999);

    function update() {
      const now = new Date();
      let diff = targetTime - now;

      if (diff <= 0) {
        // Reset 24 hours rolling
        targetTime = new Date();
        targetTime.setHours(23, 59, 59, 999);
        diff = targetTime - now;
      }

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      hoursEl.innerText = h.toString().padStart(2, '0');
      minutesEl.innerText = m.toString().padStart(2, '0');
      secondsEl.innerText = s.toString().padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }
  initCountdown();

  // --- 7. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close when clicking nav links
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
});
