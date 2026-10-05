(function (app) {

  'use strict';

  const closeOrderForm = (...args) => app.closeOrderForm(...args);

  const formatDateID = (...args) => app.formatDateID(...args);

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const getHargaItem = (...args) => app.getHargaItem(...args);

  const getSubtotalItem = (...args) => app.getSubtotalItem(...args);

  const normalizeNote = (...args) => app.normalizeNote(...args);

  const renderCart = (...args) => app.renderCart(...args);

  const sanitizeNoteForWhatsApp = (...args) => app.sanitizeNoteForWhatsApp(...args);

  const saveCart = (...args) => app.saveCart(...args);

  function buildWhatsAppMessage(formData) {
    const isAntar = formData.metode === 'antar';

    let text = `Halo kak, saya mau pesan buket dari ${CONFIG.namaUsaha} ya.\n\n`;

    // Deteksi apakah ada item buket-uang di keranjang (untuk keterangan jasa)
    const hasUang = app.cart.some(item => item.skema === 'buket-uang');

    let total = 0;
    const daftarLines = [];

    app.cart.forEach((item, index) => {
      const nomor = index + 1;
      const itemUnitPrice = getHargaItem(item) || item.harga || 0;
      const subtotal = getSubtotalItem(item) !== null ? getSubtotalItem(item) : (itemUnitPrice * item.qty);
      total += subtotal;

      const sanitizedNote = normalizeNote(item.note || '') ? sanitizeNoteForWhatsApp(item.note) : '';

      if (item.skema === 'satin-glitter') {
        // Baris 1: nomor, nama, deskripsi model+tangkai, qty, subtotal
        const modelLabel = item.model === 'kriwil' ? 'Model Kriwil' : 'Model Biasa';
        const tangkai = item.tangkai || 0;
        const descSatin = `(${modelLabel}, ${tangkai} tangkai)`;
        daftarLines.push(`${nomor}. ${item.namaProduk} ${descSatin} x${item.qty} = Rp ${formatRupiah(subtotal)}`);

        // Baris tambahan — hanya jika ada tambahan > 0 (FR-P10)
        if (item.tambahan && typeof item.tambahan === 'object') {
          const defs = (typeof HARGA !== 'undefined' && HARGA['satin-glitter'] && Array.isArray(HARGA['satin-glitter'].tambahan))
            ? HARGA['satin-glitter'].tambahan : [];
          const tambahanParts = Object.keys(item.tambahan).sort().reduce((acc, id) => {
            const qty = item.tambahan[id];
            if (qty > 0) {
              const def = defs.find(t => t.id === id);
              const nama = def ? def.nama : id;
              acc.push(`${nama} x${qty}`);
            }
            return acc;
          }, []);
          if (tambahanParts.length > 0) {
            daftarLines.push(`   Tambahan per buket: ${tambahanParts.join(', ')}`);
          }
        }

        // Baris harga per buket
        daftarLines.push(`   Harga per buket: Rp ${formatRupiah(itemUnitPrice)}`);

        // Catatan per item
        if (sanitizedNote) {
          daftarLines.push(`   Catatan: ${sanitizedNote}`);
        }

      } else if (item.skema === 'buket-uang') {
        // Baris 1: nomor, nama, kapasitas paket, qty, subtotal
        const descUang = `(paket maks. ${item.paket} lembar)`;
        const namaUang = item.kategori === 'Buket Uang' ? item.kategori : item.namaProduk;
        daftarLines.push(`${nomor}. ${namaUang} ${descUang} x${item.qty} = Rp ${formatRupiah(subtotal)}`);

        // Baris tambahan — hanya jika ada tambahan > 0
        if (item.tambahan && typeof item.tambahan === 'object') {
          const defs = (typeof HARGA !== 'undefined' && HARGA['buket-uang'] && Array.isArray(HARGA['buket-uang'].tambahan))
            ? HARGA['buket-uang'].tambahan : [];
          const tambahanParts = Object.keys(item.tambahan).sort().reduce((acc, id) => {
            const qty = item.tambahan[id];
            if (qty > 0) {
              const def = defs.find(t => t.id === id);
              const nama = def ? def.nama : id;
              // satuan "tangkai" khusus untuk Bunga di buket uang
              const unitSuffix = (def && def.satuan === 'tangkai') ? ` x${qty} tangkai` : ` x${qty}`;
              acc.push(`${nama}${unitSuffix}`);
            }
            return acc;
          }, []);
          if (tambahanParts.length > 0) {
            daftarLines.push(`   Tambahan per buket: ${tambahanParts.join(', ')}`);
          }
        }

        // Baris harga per buket
        daftarLines.push(`   Harga per buket: Rp ${formatRupiah(itemUnitPrice)}`);

        // Catatan per item
        if (sanitizedNote) {
          daftarLines.push(`   Catatan: ${sanitizedNote}`);
        }

      } else {
        // Skema tetap — FORMAT LAMA DIPERTAHANKAN PERSIS (Fase 2)
        let line = `${nomor}. ${item.namaProduk} (Rp ${formatRupiah(subtotal)})`;
        if (sanitizedNote) {
          line += `\n   Catatan: ${sanitizedNote}`;
        }
        daftarLines.push(line);
      }
    });

    text += `*DAFTAR PESANAN*\n`;
    text += daftarLines.join('\n') + '\n';
    text += `\n*Total perkiraan: Rp ${formatRupiah(total)}*\n`;

    // Keterangan buket uang (hanya jika ada item buket-uang)
    if (hasUang) {
      text += `Keterangan: harga buket uang adalah jasa rangkai sesuai kapasitas paket yang dipilih (belum termasuk uang). Harga final dan ongkos kirim mohon dikonfirmasi ya.\n`;
    } else {
      text += `Harga final dan biaya tambahan untuk permintaan khusus mohon dikonfirmasi ya.\n`;
    }

    text += '\n';

    // Info pemesan & penerima
    if (formData.pemesan === formData.penerima) {
      text += `Atas nama ${formData.pemesan}, untuk tanggal ${formatDateID(formData.tanggal)}.\n`;
    } else {
      text += `Atas nama ${formData.pemesan}, buketnya untuk ${formData.penerima}, tanggal ${formatDateID(formData.tanggal)}.\n`;
    }

    // Metode pengambilan
    if (isAntar) {
      text += `Mohon diantar ke ${formData.alamat}.\n`;
    } else {
      text += `Nanti saya ambil sendiri ya kak.\n`;
    }

    // Opsional: ucapan kartu
    if (formData.ucapan) {
      text += `\nUcapan di kartunya: "${formData.ucapan}"\n`;
    }

    // Catatan umum pesanan formulir — terpisah dari catatan per item (FR-H).
    if (formData.catatan) {
      text += `\nCatatan umum: ${formData.catatan}\n`;
    }

    // Tautan foto per item — FORMAT LAMA DIPERTAHANKAN PERSIS (FR-G)
    const imageLinks = app.cart.map((item, index) => {
      const imageUrl = new URL(item.gambarUtama, document.baseURI).href;
      if (app.cart.length > 1) {
        return `Foto pesanan #${index + 1} (${item.namaProduk}): ${imageUrl}`;
      }
      return `${item.namaProduk}: ${imageUrl}`;
    });
    text += `\nFoto buket:\n${imageLinks.join('\n')}\n`;

    return text.replace(/\uFFFD/g, '');
  }

  function confirmCartReset() {
    const confirmReset = window.confirm('Apakah pesananmu sudah terkirim?');
    if (confirmReset) {
      app.cart = [];
      saveCart();
      renderCart();
      closeOrderForm();
    }
  }

  Object.assign(app, { buildWhatsAppMessage, confirmCartReset });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
