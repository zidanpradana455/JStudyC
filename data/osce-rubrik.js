/* ═══════════════════════════════════════════
   JStudyC — OSCE Rubrik Data
   Mini OSCE Semester 4 (2026)
   ═══════════════════════════════════════════ */
window.OSCE_DATA = {
  stations: [
    // ══════════════════════════════════════
    // STATION 1 — Lab Skills
    // ══════════════════════════════════════
    {
      id: 1,
      name: 'Station 1',
      title: 'Thick and Thin Blood Film Preparation / ABO Blood Type Examination',
      rubrics: [
        {
          id: 'abo-blood-grouping',
          name: 'ABO Blood Grouping',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Pemeriksaan golongan darah ABO pada pasien untuk keperluan diagnostik atau persiapan transfusi darah.',
          tasks: [
            'Lakukan informed consent dan persiapan alat!',
            'Lakukan pemeriksaan golongan darah ABO dengan metode slide!',
            'Interpretasikan hasil pemeriksaan golongan darah!',
            'Sampaikan hasil kepada penguji!'
          ],
          hasGlobalRating: true,
          items: [
            {
              name: 'Informed Consent & Persiapan',
              langkah: 'Menyampaikan informasi terkait prosedur dan meminta persetujuan tindakan secara lisan',
              bobot: 2,
              scores: {
                0: 'Peserta ujian tidak menyampaikan informasi terkait prosedur maupun meminta persetujuan tindakan secara lisan.',
                1: 'Peserta ujian menyampaikan satu dari informasi berikut: tujuan pemeriksaan, lokasi dan tata cara pengambilan sampel, risiko ketidaknyamanan, permohonan persetujuan tindakan.',
                2: 'Peserta ujian menyampaikan dua sampai tiga dari informasi berikut: tujuan pemeriksaan, lokasi dan tata cara pengambilan sampel, risiko ketidaknyamanan, permohonan persetujuan tindakan.',
                3: 'Peserta ujian menyampaikan semua informasi berikut secara lengkap: tujuan pemeriksaan, lokasi dan tata cara pengambilan sampel, risiko ketidaknyamanan, permohonan persetujuan tindakan secara lisan.'
              }
            },
            {
              name: 'Persiapan Alat dan Bahan',
              langkah: 'Menyiapkan alat dan bahan yang diperlukan',
              bobot: 2,
              scores: {
                0: 'Peserta ujian tidak menyiapkan alat dan bahan.',
                1: 'Peserta ujian menyiapkan sebagian kecil alat dan bahan yang diperlukan.',
                2: 'Peserta ujian menyiapkan sebagian besar alat dan bahan yang diperlukan.',
                3: 'Peserta ujian menyiapkan semua alat dan bahan yang diperlukan secara lengkap: slide/object glass, reagen anti-A, anti-B, anti-AB, lancet, kapas alkohol, sarung tangan.'
              }
            },
            {
              name: 'Prosedur Pemeriksaan ABO',
              langkah: 'Melakukan pemeriksaan golongan darah ABO',
              bobot: 3,
              scores: {
                0: 'Peserta ujian tidak melakukan prosedur pemeriksaan atau melakukan dengan teknik yang sangat tidak tepat.',
                1: 'Peserta ujian melakukan prosedur pemeriksaan namun tidak urut dan tidak lengkap.',
                2: 'Peserta ujian melakukan prosedur pemeriksaan dengan urut namun tidak lengkap atau teknik kurang tepat.',
                3: 'Peserta ujian melakukan prosedur pemeriksaan dengan urut, lengkap, dan teknik tepat: meneteskan darah pada slide, menambahkan reagen anti-A, anti-B, anti-AB, mencampur dengan pengaduk, mengamati aglutinasi.'
              }
            },
            {
              name: 'Interpretasi Hasil',
              langkah: 'Menginterpretasikan hasil pemeriksaan golongan darah',
              bobot: 2,
              scores: {
                0: 'Peserta ujian tidak dapat menginterpretasikan hasil pemeriksaan.',
                1: 'Peserta ujian menginterpretasikan hasil pemeriksaan namun tidak tepat.',
                2: 'Peserta ujian menginterpretasikan hasil pemeriksaan dengan benar tetapi penjelasan tidak lengkap.',
                3: 'Peserta ujian menginterpretasikan hasil pemeriksaan dengan benar dan penjelasan lengkap sesuai pola aglutinasi.'
              }
            },
            {
              name: 'Perilaku Profesional',
              langkah: '',
              bobot: 1,
              scores: {
                0: 'Peserta ujian tidak meminta izin dan tidak menunjukkan perilaku profesional.',
                1: 'Peserta ujian meminta izin namun hanya menunjukkan 1-2 aspek perilaku profesional.',
                2: 'Peserta ujian meminta izin dan menunjukkan 3 aspek perilaku profesional.',
                3: 'Peserta ujian meminta izin dan menunjukkan semua aspek perilaku profesional: berhati-hati, memperhatikan kenyamanan pasien, tindakan sesuai prioritas, menunjukkan rasa hormat, mengetahui keterbatasan.'
              }
            }
          ]
        },
        {
          id: 'apusan-darah',
          name: 'Pemeriksaan Lab Apusan Darah',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Pemeriksaan apusan darah (blood film) untuk evaluasi morfologi sel darah pada pasien.',
          tasks: [
            'Lakukan informed consent dan siapkan alat!',
            'Lakukan pengambilan sampel darah!',
            'Buat sediaan apusan darah tipis!',
            'Lakukan pewarnaan sediaan!',
            'Interpretasikan hasil apusan darah!'
          ],
          hasGlobalRating: true,
          items: [
            {
              name: 'Informed Consent',
              langkah: 'Menyampaikan informasi terkait prosedur dan meminta persetujuan tindakan secara lisan',
              bobot: 1,
              scores: {
                0: 'Peserta ujian tidak menyampaikan informasi terkait prosedur maupun meminta persetujuan tindakan secara lisan.',
                1: 'Peserta ujian menyampaikan satu dari empat hal informasi berikut: tujuan pemeriksaan apusan darah, lokasi dan tata cara pengambilan sampel darah, risiko ketidaknyamanan yang mungkin dirasakan selama prosedur tindakan, permohonan persetujuan tindakan secara lisan pada penguji.',
                2: 'Peserta ujian menyampaikan dua sampai tiga dari empat hal informasi.',
                3: 'Peserta ujian menyampaikan semua informasi secara lengkap dan jelas.'
              }
            },
            {
              name: 'Pengambilan Sampel Darah',
              langkah: 'Melakukan pengambilan sampel darah perifer',
              bobot: 2,
              scores: {
                0: 'Peserta ujian tidak melakukan pengambilan sampel darah.',
                1: 'Peserta ujian melakukan pengambilan sampel darah dengan teknik tidak tepat dan tidak urut.',
                2: 'Peserta ujian melakukan pengambilan sampel darah dengan urut namun teknik kurang tepat.',
                3: 'Peserta ujian melakukan pengambilan sampel darah dengan urut, lengkap, dan teknik tepat: desinfeksi area, penusukan dengan lancet, pengambilan tetesan darah pertama dibuang, tetesan kedua digunakan.'
              }
            },
            {
              name: 'Pembuatan Sediaan Apusan',
              langkah: 'Membuat sediaan apusan darah tipis (thin blood film)',
              bobot: 3,
              scores: {
                0: 'Peserta ujian tidak membuat sediaan apusan darah.',
                1: 'Peserta ujian membuat sediaan apusan darah namun teknik tidak tepat: sudut spreader tidak tepat, gerakan tidak rata.',
                2: 'Peserta ujian membuat sediaan apusan darah dengan teknik cukup baik namun hasil kurang optimal.',
                3: 'Peserta ujian membuat sediaan apusan darah dengan teknik tepat: meneteskan darah di ujung slide, menggunakan spreader dengan sudut 30-45°, menarik spreader dengan gerakan cepat dan rata, menghasilkan apusan dengan zona yang tepat (tebal, tipis, ekor).'
              }
            },
            {
              name: 'Pewarnaan Sediaan',
              langkah: 'Melakukan pewarnaan sediaan apusan darah',
              bobot: 2,
              scores: {
                0: 'Peserta ujian tidak melakukan pewarnaan sediaan.',
                1: 'Peserta ujian melakukan pewarnaan sediaan namun prosedur sangat tidak tepat.',
                2: 'Peserta ujian melakukan pewarnaan sediaan dengan prosedur yang benar namun waktu pewarnaan kurang tepat.',
                3: 'Peserta ujian melakukan pewarnaan sediaan dengan prosedur yang benar dan tepat: fiksasi dengan metanol, pewarnaan Giemsa/Wright, waktu pewarnaan sesuai, pencucian dan pengeringan.'
              }
            },
            {
              name: 'Interpretasi Hasil',
              langkah: 'Menginterpretasikan hasil apusan darah',
              bobot: 2,
              scores: {
                0: 'Peserta ujian tidak dapat menginterpretasikan hasil apusan darah.',
                1: 'Peserta ujian menginterpretasikan hasil apusan darah namun sangat tidak tepat.',
                2: 'Peserta ujian menginterpretasikan hasil apusan darah dengan benar namun tidak lengkap.',
                3: 'Peserta ujian menginterpretasikan hasil apusan darah dengan benar dan lengkap: mengevaluasi morfologi eritrosit, leukosit, trombosit, dan menyimpulkan diagnosis.'
              }
            },
            {
              name: 'Perilaku Profesional',
              langkah: '',
              bobot: 1,
              scores: {
                0: 'Peserta ujian tidak menunjukkan perilaku profesional.',
                1: 'Peserta ujian menunjukkan 1-2 aspek perilaku profesional.',
                2: 'Peserta ujian menunjukkan 3 aspek perilaku profesional.',
                3: 'Peserta ujian menunjukkan semua aspek perilaku profesional secara lengkap.'
              }
            }
          ]
        }
      ]
    },
    // ══════════════════════════════════════
    // STATION 2 — IPM (Integrated Patient Management)
    // ══════════════════════════════════════
    {
      id: 2,
      name: 'Station 2',
      title: 'Integrated Patient Management (Infection & Pain)',
      rubrics: [
        {
          id: 'abdomen-anak',
          name: 'Abdomen Anak',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga di klinik dokter keluarga</strong>. Seorang anak datang ke klinik Anda dengan keluhan nyeri perut.',
          tasks: [
            'Lakukan <strong>anamnesis</strong> untuk kasus ini!',
            'Lakukan <strong>pemeriksaan tanda vital dan pemeriksaan fisik yang relevan</strong> untuk kasus ini pada manikin!',
            'Usulkan <strong>pemeriksaan penunjang yang relevan</strong>, sampaikan kepada penguji, dan interpretasikan hasilnya!',
            'Tentukan <strong>diagnosis dan dua diagnosis banding</strong> untuk kasus ini, sampaikan kepada penguji!',
            'Tentukan <strong>tatalaksana farmakoterapi dalam bentuk resep</strong>, dan sampaikan kepada penguji!',
            'Sampaikan <strong>edukasi</strong> kepada pasien!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian tidak memfasilitasi pasien untuk menceritakan kesakitannya.', 1: 'Peserta ujian memfasilitasi pasien untuk menceritakan kesakitannya namun sebagian besar pertanyaan tidak mengarah pada informasi yang relevan, akurat dan adekuat.', 2: 'Peserta ujian memfasilitasi pasien untuk menceritakan kesakitannya, namun sebagian kecil pertanyaan tidak mengarah pada informasi yang relevan, akurat dan adekuat.', 3: 'Peserta ujian memfasilitasi pasien untuk menceritakan kesakitannya dengan pertanyaan-pertanyaan yang sesuai untuk mendapatkan informasi yang relevan, akurat dan adekuat.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian tidak melakukan pemeriksaan fisik.', 1: 'Peserta ujian melakukan pemeriksaan fisik namun tidak lengkap dan teknik tidak tepat.', 2: 'Peserta ujian melakukan pemeriksaan fisik dengan teknik tepat namun tidak lengkap.', 3: 'Peserta ujian melakukan pemeriksaan fisik dengan teknik tepat dan lengkap sesuai kasus.' } },
            { name: 'Pemeriksaan Penunjang', langkah: '', bobot: 1, scores: { 0: 'Peserta ujian tidak mengusulkan pemeriksaan penunjang.', 1: 'Peserta ujian mengusulkan pemeriksaan penunjang yang tidak relevan.', 2: 'Peserta ujian mengusulkan pemeriksaan penunjang yang relevan namun interpretasi tidak tepat.', 3: 'Peserta ujian mengusulkan pemeriksaan penunjang yang relevan dan menginterpretasikan hasilnya dengan tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian tidak dapat menentukan diagnosis dan diagnosis banding.', 1: 'Peserta ujian dapat menetapkan diagnosis klinis tidak lengkap.', 2: 'Peserta ujian dapat menetapkan diagnosis klinis dan salah satu diagnosis banding dengan benar.', 3: 'Peserta ujian menetapkan diagnosis dan diagnosis banding yang lengkap, sesuai dengan masalah klinik pasien.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian sama sekali tidak memberikan tatalaksana farmakoterapi.', 1: 'Peserta ujian memberikan salah satu tatalaksana farmakoterapi dengan dosis tidak benar.', 2: 'Peserta ujian memberikan salah satu tatalaksana farmakoterapi dengan dosis yang benar.', 3: 'Peserta ujian memberikan tatalaksana farmakoterapi secara lengkap dan dosis yang benar.' } },
            { name: 'Komunikasi dan Edukasi Pasien', langkah: '', bobot: 1, scores: { 0: 'Peserta ujian sama sekali tidak melakukan prinsip komunikasi.', 1: 'Peserta ujian menunjukkan kemampuan berkomunikasi dengan menerapkan salah satu prinsip komunikasi.', 2: 'Peserta ujian menunjukkan kemampuan berkomunikasi dengan menerapkan 2-3 dari 4 prinsip komunikasi.', 3: 'Peserta ujian menunjukkan kemampuan berkomunikasi dengan menerapkan seluruh prinsip komunikasi.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Peserta ujian tidak meminta izin dan tidak menunjukkan perilaku profesional.', 1: 'Meminta izin secara lisan dan 1-2 poin perilaku profesional.', 2: 'Meminta izin secara lisan dan 3 poin perilaku profesional.', 3: 'Meminta izin secara lisan dan melakukan semua aspek perilaku profesional secara lengkap.' } }
          ]
        },
        {
          id: 'abdomen-dewasa',
          name: 'Abdomen Dewasa',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga di klinik dokter keluarga</strong>. Seorang pasien dewasa datang ke klinik Anda dengan keluhan nyeri perut.',
          tasks: [
            'Lakukan <strong>anamnesis</strong> untuk kasus ini!',
            'Lakukan <strong>pemeriksaan tanda vital dan pemeriksaan fisik yang relevan</strong>!',
            'Usulkan <strong>pemeriksaan penunjang yang relevan</strong>, sampaikan kepada penguji, dan interpretasikan hasilnya!',
            'Tentukan <strong>diagnosis dan dua diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana farmakoterapi dalam bentuk resep</strong>!',
            'Sampaikan <strong>edukasi</strong> kepada pasien!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian tidak memfasilitasi pasien untuk menceritakan kesakitannya.', 1: 'Peserta ujian memfasilitasi pasien untuk menceritakan kesakitannya namun sebagian besar pertanyaan tidak relevan.', 2: 'Peserta ujian memfasilitasi pasien namun sebagian kecil pertanyaan tidak relevan.', 3: 'Peserta ujian memfasilitasi pasien dengan pertanyaan yang relevan, akurat dan adekuat.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian tidak melakukan pemeriksaan fisik.', 1: 'Peserta ujian melakukan pemeriksaan fisik namun tidak lengkap dan teknik tidak tepat.', 2: 'Peserta ujian melakukan pemeriksaan fisik dengan teknik tepat namun tidak lengkap.', 3: 'Peserta ujian melakukan pemeriksaan fisik lengkap dan teknik tepat.' } },
            { name: 'Pemeriksaan Penunjang', langkah: '', bobot: 1, scores: { 0: 'Tidak mengusulkan pemeriksaan penunjang.', 1: 'Mengusulkan pemeriksaan yang tidak relevan.', 2: 'Mengusulkan pemeriksaan yang relevan namun interpretasi kurang tepat.', 3: 'Mengusulkan pemeriksaan yang relevan dengan interpretasi tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menentukan diagnosis.', 1: 'Diagnosis klinis tidak lengkap.', 2: 'Diagnosis klinis dan salah satu diagnosis banding benar.', 3: 'Diagnosis dan diagnosis banding lengkap sesuai masalah klinik.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 2, scores: { 0: 'Tidak memberikan tatalaksana farmakoterapi.', 1: 'Memberikan tatalaksana dengan dosis tidak benar.', 2: 'Memberikan salah satu tatalaksana dengan dosis benar.', 3: 'Memberikan tatalaksana lengkap dengan dosis benar.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan prinsip komunikasi.', 1: 'Menerapkan salah satu prinsip komunikasi.', 2: 'Menerapkan 2-3 dari 4 prinsip komunikasi.', 3: 'Menerapkan seluruh prinsip komunikasi.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak meminta izin dan tidak profesional.', 1: 'Meminta izin dan 1-2 poin perilaku profesional.', 2: 'Meminta izin dan 3 poin perilaku profesional.', 3: 'Meminta izin dan semua aspek perilaku profesional lengkap.' } }
          ]
        },
        {
          id: 'cardio',
          name: 'Cardiology Examination',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga di klinik</strong>. Seorang pasien datang dengan keluhan nyeri dada.',
          tasks: [
            'Lakukan <strong>anamnesis</strong> untuk kasus ini!',
            'Lakukan <strong>pemeriksaan fisik kardiovaskular yang relevan</strong>!',
            'Usulkan <strong>pemeriksaan penunjang</strong> dan interpretasikan hasilnya!',
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana farmakoterapi</strong>!',
            'Sampaikan <strong>edukasi</strong> kepada pasien!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian tidak memfasilitasi pasien untuk menceritakan kesakitannya.', 1: 'Memfasilitasi pasien namun sebagian besar pertanyaan tidak relevan. Hanya 3-4 hal relevan: keluhan utama, onset/durasi/frekuensi, lokasi, karakteristik nyeri.', 2: 'Memfasilitasi pasien dengan 5-6 pertanyaan relevan termasuk faktor risiko dan riwayat pengobatan.', 3: 'Memfasilitasi pasien dengan pertanyaan lengkap: keluhan utama, onset/durasi/frekuensi, lokasi, karakteristik nyeri, keluhan penyerta, faktor memperberat/memperingan, faktor risiko (hipertensi, dislipidemia, diabetes, merokok, riwayat keluarga), riwayat pengobatan.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Tidak melakukan pemeriksaan fisik.', 1: 'Melakukan pemeriksaan fisik tidak lengkap dan teknik tidak tepat.', 2: 'Melakukan pemeriksaan fisik dengan teknik tepat namun tidak lengkap.', 3: 'Melakukan pemeriksaan fisik kardiovaskular lengkap dengan teknik tepat: inspeksi, palpasi, perkusi, auskultasi jantung.' } },
            { name: 'Pemeriksaan Penunjang', langkah: '', bobot: 1, scores: { 0: 'Tidak mengusulkan pemeriksaan penunjang.', 1: 'Mengusulkan pemeriksaan yang tidak relevan.', 2: 'Mengusulkan pemeriksaan relevan namun interpretasi kurang tepat.', 3: 'Mengusulkan pemeriksaan relevan (EKG, enzim jantung) dan interpretasi tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menentukan diagnosis.', 1: 'Diagnosis klinis tidak lengkap.', 2: 'Diagnosis klinis dan salah satu diagnosis banding benar.', 3: 'Diagnosis dan diagnosis banding lengkap.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 2, scores: { 0: 'Tidak memberikan tatalaksana.', 1: 'Memberikan tatalaksana dengan dosis tidak benar.', 2: 'Memberikan salah satu tatalaksana dengan dosis benar.', 3: 'Memberikan tatalaksana lengkap dengan dosis benar.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan komunikasi.', 1: 'Menerapkan salah satu prinsip komunikasi.', 2: 'Menerapkan 2-3 prinsip komunikasi.', 3: 'Menerapkan seluruh prinsip komunikasi.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek profesional.', 2: '3 aspek profesional.', 3: 'Semua aspek profesional lengkap.' } }
          ]
        },
        {
          id: 'dv',
          name: 'Dermatovenerologi (DV)',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga di klinik dokter keluarga</strong>. Seorang pasien datang dengan keluhan kulit.',
          tasks: [
            'Lakukan <strong>anamnesis</strong> untuk kasus ini!',
            'Lakukan <strong>pemeriksaan fisik dermatologi yang relevan</strong>!',
            'Usulkan <strong>pemeriksaan penunjang</strong> dan interpretasikan!',
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana farmakoterapi</strong>!',
            'Sampaikan <strong>edukasi</strong> kepada pasien!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Tidak memfasilitasi pasien.', 1: 'Pertanyaan tidak relevan atau hanya 1-2 jenis pertanyaan.', 2: 'Memfasilitasi dengan 3-5 jenis pertanyaan relevan.', 3: 'Memfasilitasi dengan pertanyaan lengkap: keluhan utama, onset, gejala penyerta, riwayat penyakit, pengobatan, faktor risiko, riwayat keluarga, gaya hidup.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Tidak melakukan pemeriksaan fisik.', 1: 'Pemeriksaan fisik tidak tepat dan tidak lengkap.', 2: 'Pemeriksaan fisik tepat namun tidak lengkap.', 3: 'Pemeriksaan fisik dermatologi lengkap dan tepat.' } },
            { name: 'Pemeriksaan Penunjang', langkah: '', bobot: 1, scores: { 0: 'Tidak mengusulkan.', 1: 'Mengusulkan yang tidak relevan.', 2: 'Mengusulkan relevan, interpretasi kurang tepat.', 3: 'Mengusulkan relevan dengan interpretasi tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menentukan.', 1: 'Diagnosis tidak lengkap.', 2: 'Diagnosis dan salah satu DD benar.', 3: 'Diagnosis dan DD lengkap.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 2, scores: { 0: 'Tidak memberikan.', 1: 'Dosis tidak benar.', 2: 'Salah satu tatalaksana dengan dosis benar.', 3: 'Tatalaksana lengkap dan dosis benar.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan.', 1: '1 prinsip komunikasi.', 2: '2-3 prinsip.', 3: 'Seluruh prinsip.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek.', 2: '3 aspek.', 3: 'Lengkap.' } }
          ]
        },
        {
          id: 'lung-exam',
          name: 'Lung Examination',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga</strong>. Seorang pasien datang dengan keluhan sesak napas dan/atau batuk.',
          tasks: [
            'Lakukan <strong>anamnesis</strong>!',
            'Lakukan <strong>pemeriksaan fisik paru yang relevan</strong>!',
            'Usulkan <strong>pemeriksaan penunjang</strong> dan interpretasikan!',
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana farmakoterapi</strong>!',
            'Sampaikan <strong>edukasi</strong>!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Tidak memfasilitasi pasien.', 1: 'Hanya 1-2 item anamnesis.', 2: 'Melakukan 3-4 item anamnesis.', 3: 'Anamnesis lengkap: identitas, keluhan utama (onset, lokasi, durasi, sifat nyeri), keluhan penyerta (batuk, demam, sesak), ringkasan.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Tidak melakukan.', 1: 'Tidak lengkap dan teknik tidak tepat.', 2: 'Teknik tepat namun tidak lengkap.', 3: 'Pemeriksaan fisik paru lengkap: inspeksi, palpasi, perkusi, auskultasi.' } },
            { name: 'Pemeriksaan Penunjang', langkah: '', bobot: 1, scores: { 0: 'Tidak mengusulkan.', 1: 'Tidak relevan.', 2: 'Relevan, interpretasi kurang.', 3: 'Relevan, interpretasi tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menentukan.', 1: 'Tidak lengkap.', 2: 'Diagnosis dan salah satu DD benar.', 3: 'Lengkap.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 2, scores: { 0: 'Tidak memberikan.', 1: 'Dosis tidak benar.', 2: 'Salah satu benar.', 3: 'Lengkap dan benar.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan.', 1: '1 prinsip.', 2: '2-3 prinsip.', 3: 'Seluruh prinsip.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek.', 2: '3 aspek.', 3: 'Lengkap.' } }
          ]
        },
        {
          id: 'mata',
          name: 'Mata (Ophthalmology)',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga di klinik</strong>. Seorang pasien datang dengan keluhan pada mata.',
          tasks: [
            'Lakukan <strong>anamnesis</strong>!',
            'Lakukan <strong>pemeriksaan fisik mata yang relevan</strong>!',
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana</strong>!',
            'Sampaikan <strong>edukasi</strong>!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Tidak memfasilitasi pasien.', 1: 'Sebagian besar pertanyaan tidak relevan.', 2: 'Sebagian kecil pertanyaan tidak relevan.', 3: 'Pertanyaan relevan, akurat dan adekuat.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Tidak melakukan.', 1: 'Tidak lengkap dan teknik tidak tepat.', 2: 'Teknik tepat namun tidak lengkap.', 3: 'Pemeriksaan mata lengkap dan teknik tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menentukan.', 1: 'Tidak lengkap.', 2: 'Diagnosis dan salah satu DD benar.', 3: 'Lengkap sesuai masalah klinik.' } },
            { name: 'Tatalaksana', langkah: '', bobot: 2, scores: { 0: 'Tidak memberikan.', 1: 'Tatalaksana tidak tepat.', 2: 'Tatalaksana tepat namun tidak lengkap.', 3: 'Tatalaksana tepat dan lengkap.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan.', 1: '1 prinsip.', 2: '2-3 prinsip.', 3: 'Seluruh prinsip.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek.', 2: '3 aspek.', 3: 'Lengkap.' } }
          ]
        },
        {
          id: 'muskuloskeletal',
          name: 'Muskuloskeletal',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga di klinik</strong>. Seorang pasien datang dengan keluhan nyeri pada sendi/otot/tulang.',
          tasks: [
            'Lakukan <strong>anamnesis</strong>!',
            'Lakukan <strong>pemeriksaan fisik muskuloskeletal yang relevan</strong>!',
            'Usulkan <strong>pemeriksaan penunjang</strong> dan interpretasikan!',
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana farmakoterapi</strong>!',
            'Sampaikan <strong>edukasi</strong>!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'TIDAK memfasilitasi pasien.', 1: 'Pertanyaan TIDAK relevan atau hanya 1-2 jenis pertanyaan.', 2: 'Memfasilitasi dengan 3-5 jenis pertanyaan relevan.', 3: 'Pertanyaan lengkap: keluhan utama, onset, gejala penyerta, riwayat penyakit, pengobatan, faktor risiko, riwayat keluarga, gaya hidup.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Tidak melakukan.', 1: 'Tidak lengkap dan teknik tidak tepat.', 2: 'Teknik tepat namun tidak lengkap.', 3: 'Lengkap dan teknik tepat: Look, Feel, Move.' } },
            { name: 'Pemeriksaan Penunjang', langkah: '', bobot: 1, scores: { 0: 'Tidak mengusulkan.', 1: 'Tidak relevan.', 2: 'Relevan, interpretasi kurang.', 3: 'Relevan, interpretasi tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menentukan.', 1: 'Tidak lengkap.', 2: 'Diagnosis dan salah satu DD benar.', 3: 'Lengkap.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 2, scores: { 0: 'Tidak memberikan.', 1: 'Dosis tidak benar.', 2: 'Salah satu benar.', 3: 'Lengkap dan benar.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan.', 1: '1 prinsip.', 2: '2-3 prinsip.', 3: 'Seluruh prinsip.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek.', 2: '3 aspek.', 3: 'Lengkap.' } }
          ]
        },
        {
          id: 'neuro',
          name: 'Neurology',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga</strong>. Seorang pasien datang dengan keluhan neurologis.',
          tasks: [
            'Lakukan <strong>anamnesis</strong>!',
            'Lakukan <strong>pemeriksaan fisik neurologis yang relevan</strong>!',
            'Usulkan <strong>pemeriksaan penunjang</strong> dan interpretasikan!',
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana farmakoterapi</strong>!',
            'Sampaikan <strong>edukasi</strong>!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Mahasiswa tidak melakukan anamnesis.', 1: 'Melakukan anamnesis hanya mengenai keluhan utama dan riwayat penyakit sekarang.', 2: 'Melakukan anamnesis terinci minimal 2 poin: keluhan utama, perjalanan penyakit, riwayat dahulu, riwayat keluarga, faktor risiko.', 3: 'Melakukan anamnesis minimal 4 dari 5 poin: keluhan utama dan riwayat penyakit sekarang, perjalanan penyakit, riwayat penyakit dahulu, riwayat penyakit keluarga, faktor risiko dan pola hidup.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Tidak melakukan.', 1: 'Tidak lengkap dan teknik tidak tepat.', 2: 'Teknik tepat namun tidak lengkap.', 3: 'Pemeriksaan neurologis lengkap dan tepat.' } },
            { name: 'Pemeriksaan Penunjang', langkah: '', bobot: 1, scores: { 0: 'Tidak mengusulkan.', 1: 'Tidak relevan.', 2: 'Relevan, interpretasi kurang.', 3: 'Relevan, interpretasi tepat.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menentukan.', 1: 'Tidak lengkap.', 2: 'Diagnosis dan salah satu DD benar.', 3: 'Lengkap.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 2, scores: { 0: 'Tidak memberikan.', 1: 'Dosis tidak benar.', 2: 'Salah satu benar.', 3: 'Lengkap dan benar.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan.', 1: '1 prinsip.', 2: '2-3 prinsip.', 3: 'Seluruh prinsip.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek.', 2: '3 aspek.', 3: 'Lengkap.' } }
          ]
        },
        {
          id: 'tht',
          name: 'THT (Telinga Hidung Tenggorok)',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Anda adalah seorang <strong>dokter jaga di klinik</strong>. Seorang pasien datang dengan keluhan pada telinga/hidung/tenggorokan.',
          tasks: [
            'Lakukan <strong>anamnesis</strong>!',
            'Lakukan <strong>pemeriksaan fisik THT yang relevan</strong>!',
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>tatalaksana non-farmakoterapi</strong>!',
            'Tentukan <strong>tatalaksana farmakoterapi</strong>!',
            'Sampaikan <strong>edukasi</strong>!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Anamnesis', langkah: '', bobot: 2, scores: { 0: 'Tidak menanyakan keluhan utama.', 1: 'Menanyakan keluhan utama dan 1-2 POIN: riwayat penyakit sekarang, pengobatan sebelumnya, riwayat dahulu, riwayat keluarga, faktor sosial.', 2: 'Menanyakan keluhan utama dan 3-4 POIN.', 3: 'Menanyakan keluhan utama dan semua 5 POIN secara lengkap.' } },
            { name: 'Pemeriksaan Fisik', langkah: '', bobot: 2, scores: { 0: 'Tidak melakukan.', 1: 'Tidak lengkap dan teknik tidak tepat.', 2: 'Sebagian besar tepat dan lengkap.', 3: 'Pemeriksaan THT lengkap: telinga/otoskopi, hidung/rinoskopi, tenggorok/orofaring.' } },
            { name: 'Diagnosis & Diagnosis Banding', langkah: '', bobot: 1, scores: { 0: 'Tidak dapat menentukan.', 1: 'Diagnosis klinis tidak lengkap.', 2: 'Diagnosis klinis dan salah satu DD benar.', 3: 'Diagnosis dan DD lengkap.' } },
            { name: 'Tatalaksana Non-Farmakoterapi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan.', 1: 'Memilih tatalaksana tetapi teknik tidak tepat.', 2: 'Memilih tatalaksana tepat dan salah satu langkah benar.', 3: 'Memilih tatalaksana tepat, teknik benar, lengkap dan runut.' } },
            { name: 'Tatalaksana Farmakoterapi', langkah: '', bobot: 1, scores: { 0: 'Tidak memberikan.', 1: 'Dosis tidak benar.', 2: 'Salah satu benar.', 3: 'Lengkap dan benar.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan.', 1: '1 prinsip.', 2: '2-3 prinsip.', 3: 'Seluruh prinsip.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek.', 2: '3 aspek.', 3: 'Lengkap.' } }
          ]
        }
      ]
    },
    // ══════════════════════════════════════
    // STATION 3 — Radiology
    // ══════════════════════════════════════
    {
      id: 3,
      name: 'Station 3',
      title: 'Intermediate Radiology Interpretation Skills',
      rubrics: [
        {
          id: 'radiologi',
          name: 'Radiologi',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Interpretasi hasil pemeriksaan radiologi untuk menegakkan diagnosis pasien.',
          tasks: [
            'Tentukan <strong>diagnosis dan diagnosis banding</strong>!',
            'Tentukan <strong>jenis pemeriksaan radiologi yang tepat</strong>!',
            'Tentukan <strong>persiapan pasien</strong> untuk pemeriksaan radiologi!',
            'Lakukan <strong>interpretasi hasil</strong> pemeriksaan radiologi secara sistematis!',
            'Sampaikan <strong>edukasi</strong> kepada pasien!'
          ],
          hasGlobalRating: true,
          items: [
            { name: 'Menentukan Diagnosis dan Diagnosis Banding', langkah: '', bobot: 2, scores: { 0: 'Peserta ujian tidak dapat menentukan diagnosis dan diagnosis banding.', 1: 'Peserta ujian dapat menetapkan satu diagnosis banding.', 2: 'Peserta ujian dapat menetapkan beberapa diagnosis banding secara tidak lengkap.', 3: 'Peserta ujian menetapkan diagnosis dan diagnosis banding yang lengkap, sesuai dengan masalah klinik pasien.' } },
            { name: 'Menentukan Jenis Pemeriksaan Radiologi', langkah: '', bobot: 2, scores: { 0: 'Tidak dapat menyebutkan jenis pemeriksaan radiologi yang tepat.', 1: 'Dapat menyebutkan jenis pemeriksaan radiologi yang tepat namun tidak lengkap.', 2: '-', 3: 'Dapat menyebutkan jenis pemeriksaan radiologi yang tepat secara lengkap.' } },
            { name: 'Persiapan Pasien', langkah: '', bobot: 1, scores: { 0: 'Tidak dapat menjelaskan persiapan pasien.', 1: 'Menjelaskan persiapan pasien tidak lengkap.', 2: '-', 3: 'Menjelaskan persiapan pasien secara lengkap.' } },
            { name: 'Interpretasi Hasil Radiologi', langkah: '', bobot: 3, scores: { 0: 'Tidak dapat menginterpretasikan hasil radiologi.', 1: 'Interpretasi tidak sistematis dan tidak tepat.', 2: 'Interpretasi sistematis namun tidak lengkap.', 3: 'Interpretasi sistematis, tepat, dan lengkap.' } },
            { name: 'Komunikasi dan Edukasi', langkah: '', bobot: 1, scores: { 0: 'Tidak melakukan komunikasi.', 1: '1 prinsip komunikasi.', 2: '2-3 prinsip.', 3: 'Seluruh prinsip.' } },
            { name: 'Perilaku Profesional', langkah: '', bobot: 1, scores: { 0: 'Tidak profesional.', 1: '1-2 aspek.', 2: '3 aspek.', 3: 'Lengkap.' } }
          ]
        }
      ]
    },
    // ══════════════════════════════════════
    // STATION 4 — Advanced Life Support
    // ══════════════════════════════════════
    {
      id: 4,
      name: 'Station 4',
      title: 'Advanced Life Support (Procedural Skills)',
      rubrics: [
        {
          id: 'airway-management',
          name: 'Advance Airway Management (ET Tube)',
          scenario: '<strong>SKENARIO KLINIK:</strong><br>Pasien memerlukan penanganan jalan napas lanjut dengan intubasi endotrakeal (ET Tube).',
          tasks: [
            'Periksa semua peralatan tata laksana jalan napas lanjut!',
            'Lakukan persiapan pasien!',
            'Lakukan intubasi pipa endotrakeal dengan teknik yang tepat!',
            'Konfirmasi posisi pipa endotrakeal!'
          ],
          hasGlobalRating: true,
          items: [
            {
              name: 'Tindakan Klinis Dasar',
              langkah: 'Intubasi Pipa Endotrakeal',
              bobot: 3,
              scores: {
                0: 'Peserta ujian melakukan langkah intubasi pipa ET dengan tidak urut, tidak lengkap, dan teknik tidak tepat ATAU peserta ujian tidak berhasil memasang ET sama sekali.',
                1: 'Peserta ujian melakukan langkah intubasi pipa ET dengan urut tetapi tidak lengkap dan teknik tidak tepat.',
                2: 'Peserta ujian melakukan langkah berikut dengan urut, lengkap, tetapi teknik tidak tepat:\n1) Memeriksa semua peralatan\n2) Menghubungkan bilah laringoskop dengan gagang dan memastikan lampu menyala\n3) Mengembangkan cuff pipa ET dan memastikan balon tidak bocor\n4) Memilih ukuran pipa ET yang sesuai\n5) Memeriksa kemungkinan fraktur tulang belakang servikal\n6) Membuka jalan napas menggunakan triple airway maneuver\n7) Melakukan pengambilan benda asing/penyedotan cairan\n8) Memberikan ventilasi dengan oksigen 100% menggunakan BVM selama 2-3 menit\n9) Menempatkan kepala pasien di posisi yang tepat',
                3: 'Peserta ujian melakukan langkah berikut dengan urut, lengkap, dan teknik tepat:\n1) Memeriksa semua peralatan tata laksana jalan napas lanjut\n2) Menghubungkan bilah laringoskop dan memastikan lampu menyala\n3) Mengembangkan cuff pipa ET, memastikan tidak bocor, kempiskan kembali\n4) Memilih ukuran pipa ET yang sesuai\n5) Memeriksa kemungkinan fraktur tulang belakang servikal\n6) Membuka jalan napas dengan triple airway maneuver\n7) Pengambilan benda asing atau penyedotan cairan\n8) Ventilasi dengan O2 100% menggunakan BVM 2-3 menit\n9) Posisi kepala yang tepat\n10) Laringoskopi dengan teknik yang benar\n11) Memasukkan pipa ET melewati pita suara\n12) Mengembangkan cuff\n13) Konfirmasi posisi pipa ET'
              }
            },
            {
              name: 'Konfirmasi Posisi ET',
              langkah: 'Memastikan pipa ET berada di posisi yang benar',
              bobot: 2,
              scores: {
                0: 'Tidak melakukan konfirmasi posisi pipa ET.',
                1: 'Melakukan konfirmasi namun tidak lengkap: hanya melakukan salah satu metode.',
                2: 'Melakukan konfirmasi dengan 2 metode namun tidak semuanya tepat.',
                3: 'Melakukan konfirmasi posisi pipa ET secara lengkap dan tepat: auskultasi epigastrium, auskultasi paru kanan dan kiri, mengamati pengembangan dada bilateral, fiksasi pipa ET.'
              }
            },
            {
              name: 'Perilaku Profesional',
              langkah: '',
              bobot: 1,
              scores: {
                0: 'Tidak menunjukkan perilaku profesional.',
                1: '1-2 aspek perilaku profesional.',
                2: '3 aspek perilaku profesional.',
                3: 'Semua aspek perilaku profesional secara lengkap: berhati-hati dan teliti, memperhatikan kenyamanan pasien, tindakan sesuai prioritas, menunjukkan rasa hormat, mengetahui keterbatasan.'
              }
            }
          ]
        }
      ]
    }
  ]
};
