/*
  Kasus latihan Mini OSCE Semester 4.
  Diadaptasi dari M.NOTES MINI OSCE SEM 4 (1).pdf.
  Dosis dan keputusan klinis tetap harus mengikuti kondisi pasien serta
  pedoman lokal terbaru.
*/
(function () {
  'use strict';

  const c = (id, title, diagnosis, prompt, patient, examiner) => ({
    id, title, diagnosis, prompt, patient, examiner
  });

  window.OSCE_CASES = {
    'abo-blood-grouping': [
      c('abo-a', 'Persiapan transfusi pasien anemia', 'Golongan darah A',
        'Perempuan 28 tahun dengan anemia direncanakan transfusi. Lakukan pemeriksaan golongan darah ABO metode slide dan interpretasikan hasilnya.',
        {
          'Identitas dan pembuka': 'Ny. Rina, 28 tahun. "Saya diminta periksa golongan darah sebelum transfusi, Dok."',
          'Sikap aktor': 'Kooperatif tetapi takut jarum. Bersedia setelah tujuan, prosedur, risiko tidak nyaman, dan persetujuan dijelaskan.',
          'Jika ditanya': ['Belum pernah mengetahui golongan darah.', 'Belum pernah transfusi atau mengalami reaksi transfusi.', 'Tidak memiliki riwayat pingsan saat melihat darah.']
        },
        {
          'Hasil simulasi': ['Anti-A: aglutinasi positif.', 'Anti-B: tidak ada aglutinasi.', 'Anti-AB: aglutinasi positif.', 'Kesimpulan: golongan darah A.'],
          'Kunci penilaian': ['Konfirmasi identitas dan label sampel.', 'Pakai APD dan teknik aman.', 'Uji kompatibilitas tetap diperlukan sebelum transfusi.']
        })
    ],

    'apusan-darah': [
      c('malaria-smear', 'Demam setelah perjalanan ke Papua', 'Malaria falciparum',
        'Pasien mengalami demam, menggigil, berkeringat, dan baru kembali dari daerah endemis. Buat apusan darah tebal dan tipis untuk memastikan malaria.',
        {
          'Identitas dan pembuka': 'Tn. Andi, 27 tahun. "Saya demam menggigil sejak pulang dari Papua."',
          'Riwayat penyakit sekarang': ['Demam hilang timbul 4 hari, menggigil lalu berkeringat.', 'Sakit kepala, pegal, dan mual ringan.', 'Tidak ada batuk lama atau perdarahan.'],
          'Faktor risiko': ['Pulang dari Papua 10 hari lalu.', 'Sering bekerja malam tanpa kelambu.'],
          'Sikap aktor': 'Lemah tetapi kooperatif dan bersedia diambil darah setelah informed consent.'
        },
        {
          'Diagnosis dan DD': ['Malaria falciparum.', 'DD: dengue, demam tifoid, leptospirosis.'],
          'Hasil apusan': ['Apusan tipis: eritrosit normal, ring form halus, dapat multipel.', 'Gametosit sabit/pisang mendukung P. falciparum.', 'Apusan tebal lebih sensitif untuk menemukan parasit.'],
          'Kunci prosedur': ['Apusan tebal tidak difiksasi metanol.', 'Apusan tipis difiksasi metanol.', 'Pewarnaan Giemsa dan pembacaan dengan minyak imersi.'],
          'Catatan terapi': ['Tentukan spesies dan tanda malaria berat.', 'Regimen mengikuti berat badan, kehamilan, G6PD, dan pedoman program malaria.']
        })
    ],

    'abdomen-anak': [
      c('dengue-child', 'Anak demam hari ke-4 dengan petekie', 'Demam dengue / DBD tanpa syok',
        'Anak 9 tahun dibawa ibunya karena demam tinggi mendadak selama 4 hari, nyeri kepala, mual, dan bintik merah.',
        {
          'Identitas dan pembuka': 'An. Bima, 9 tahun, BB 28 kg. Ibu berkata, "Demamnya empat hari dan tadi pagi muncul bintik merah."',
          'Riwayat penyakit sekarang': ['Demam terus-menerus, nyeri belakang mata, pegal, mual.', 'Petekie dan gusi sedikit berdarah.', 'Masih bisa minum dan BAK; tidak ada muntah persisten atau penurunan kesadaran.'],
          'Faktor risiko': ['Ada genangan air di sekitar rumah.', 'Tetangga baru dirawat karena DBD.'],
          'Sikap aktor': 'Anak lemas; ibu cemas dan menjadi sumber anamnesis.'
        },
        {
          'Diagnosis dan DD': ['Demam dengue; nilai kebocoran plasma untuk menentukan DBD.', 'DD: tifoid, chikungunya/infeksi virus, ITP.'],
          'Pemeriksaan fisik': ['T 38,8 C, nadi 104/menit, perfusi baik.', 'Petekie dan uji torniket positif.', 'Cari hepatomegali, efusi/asites, perdarahan, dan syok.'],
          'Penunjang': ['Darah lengkap serial: trombosit, leukosit, dan hematokrit.', 'NS1 fase awal; IgM/IgG sesuai hari sakit.'],
          'Farmakologi': ['Parasetamol 10-15 mg/kgBB/kali bila demam.', 'Hindari aspirin dan NSAID.', 'Cairan oral bila mampu; IV sesuai status hidrasi dan derajat dengue.'],
          'Red flags': ['Demam turun tetapi memburuk, nyeri perut, muntah persisten, letargi, perdarahan, oliguria, atau syok.']
        }),
      c('typhoid-child', 'Anak demam bertahap dan gangguan cerna', 'Demam tifoid',
        'Anak 10 tahun mengalami demam yang makin tinggi terutama sore-malam selama 7 hari, mual, dan konstipasi.',
        {
          'Identitas dan pembuka': 'An. Sari, 10 tahun, BB 30 kg. "Demamnya makin tinggi tiap sore, Dok."',
          'Riwayat penyakit sekarang': ['Demam bertahap 7 hari, sakit kepala frontal dan pegal.', 'Mual, konstipasi, nyeri ulu hati, nafsu makan turun.', 'Tidak ada petekie, nyeri betis, atau menggigil periodik.'],
          'Faktor risiko': ['Sering jajan dan jarang cuci tangan sebelum makan.'],
          'Sikap aktor': 'Lemas; ibu membantu menjawab.'
        },
        {
          'Diagnosis dan DD': ['Demam tifoid tanpa komplikasi.', 'DD: dengue, malaria, leptospirosis, ISK.'],
          'Pemeriksaan fisik': ['Demam, dapat ada bradikardi relatif.', 'Coated tongue, bibir kering, nyeri epigastrium, hepatosplenomegali.'],
          'Penunjang': ['Kultur darah terutama awal penyakit.', 'Darah lengkap; tes serologi tidak menggantikan kultur dan klinis.'],
          'Farmakologi': ['Antibiotik berdasarkan pedoman lokal, resistensi, alergi, dan berat badan.', 'Parasetamol berbasis berat badan serta rehidrasi.'],
          'Red flags': ['Toksik, perdarahan/perforasi, penurunan kesadaran, dehidrasi berat, atau gagal terapi.']
        })
    ],

    'abdomen-dewasa': [
      c('typhoid-adult', 'Demam tifoid pada dewasa', 'Demam tifoid',
        'Pasien dewasa mengalami demam bertahap selama 8 hari, sakit kepala, nyeri epigastrium, dan konstipasi.',
        {
          'Identitas dan pembuka': 'Tn. Damar, 24 tahun. "Demam lebih tinggi sore dan malam sudah delapan hari."',
          'Riwayat penyakit sekarang': ['Demam step-ladder, sakit kepala frontal, pegal.', 'Mual, konstipasi, nyeri epigastrium.', 'Tidak ada petekie, nyeri betis, atau menggigil periodik.'],
          'Faktor risiko': ['Sering makan di warung dengan higiene kurang baik.'],
          'Sikap aktor': 'Tampak sakit sedang dan lemah.'
        },
        {
          'Diagnosis dan DD': ['Demam tifoid.', 'DD: dengue, malaria, leptospirosis, hepatitis A.'],
          'Pemeriksaan fisik': ['Demam, bradikardi relatif, coated tongue.', 'Nyeri epigastrium; cari hepatosplenomegali dan peritonitis.'],
          'Penunjang': ['Kultur darah sebelum antibiotik bila tersedia.', 'Darah lengkap dan fungsi hati sesuai indikasi.'],
          'Farmakologi': ['Antibiotik mengikuti pola resistensi dan pedoman lokal.', 'Parasetamol, cairan, dan nutrisi.']
        }),
      c('malaria-adult', 'Demam periodik setelah perjalanan endemis', 'Malaria',
        'Pasien mengalami demam periodik, menggigil, berkeringat, dan baru kembali dari NTT.',
        {
          'Identitas dan pembuka': 'Ny. Maya, 31 tahun. "Demam datang seperti serangan, menggigil lalu berkeringat."',
          'Riwayat penyakit sekarang': ['Demam 5 hari, sakit kepala, nyeri otot, mual.', 'Tidak ada perdarahan atau batuk lama.', 'Tanyakan kejang, sesak, urine gelap, dan penurunan kesadaran.'],
          'Faktor risiko': ['Pulang dari NTT 2 minggu lalu tanpa kelambu.'],
          'Sikap aktor': 'Pucat dan lemah.'
        },
        {
          'Diagnosis dan DD': ['Malaria; tentukan spesies dan derajat berat.', 'DD: dengue, tifoid, leptospirosis.'],
          'Pemeriksaan fisik': ['Demam, takikardi, pucat, ikterus, hepatosplenomegali.', 'Cari syok, GCS turun, sesak, oliguria, perdarahan.'],
          'Penunjang': ['Apusan darah tebal-tipis atau RDT.', 'Darah lengkap, glukosa, fungsi ginjal/hati bila berat.'],
          'Farmakologi': ['Regimen sesuai spesies, berat badan, kehamilan, dan derajat berat.', 'Primaquine perlu perhatian G6PD dan kehamilan.']
        }),
      c('leptospirosis', 'Demam dan nyeri betis setelah banjir', 'Leptospirosis',
        'Petani 42 tahun mengalami demam, mata merah, dan nyeri betis setelah bekerja di sawah tergenang.',
        {
          'Identitas dan pembuka': 'Tn. Joko, 42 tahun. "Sejak membersihkan sawah banjir saya demam dan betis sakit."',
          'Riwayat penyakit sekarang': ['Demam menggigil 5 hari, sakit kepala, mual.', 'Nyeri betis/paha, mata merah, urine berkurang.', 'Tanyakan ikterus, sesak, perdarahan, dan kesadaran.'],
          'Faktor risiko': ['Kontak air banjir tanpa alas kaki dan banyak tikus.'],
          'Sikap aktor': 'Mengeluh saat betis ditekan.'
        },
        {
          'Diagnosis dan DD': ['Leptospirosis.', 'DD: dengue, malaria, hepatitis virus, rickettsiosis.'],
          'Pemeriksaan fisik': ['Conjunctival suffusion, ikterus, gastrocnemius squeeze pain.', 'Cari meningismus, edema, perdarahan, gagal ginjal.'],
          'Penunjang': ['Darah lengkap, fungsi ginjal/hati, elektrolit, urinalisis.', 'PCR awal atau serologi/MAT sesuai fase.'],
          'Farmakologi': ['Antibiotik oral untuk kasus ringan atau parenteral untuk kasus berat sesuai pedoman.', 'Terapi suportif dan pemantauan organ.'],
          'Red flags': ['Oliguria, ikterus berat, perdarahan, meningitis, sesak, atau hipotensi.']
        }),
      c('gerd', 'Heartburn dan regurgitasi malam hari', 'GERD',
        'Pasien mengalami panas retrosternal dan rasa asam di mulut yang memburuk setelah makan serta saat berbaring.',
        {
          'Identitas dan pembuka': 'Ny. Lestari, 38 tahun. "Dada terasa panas dan asam naik ke mulut kalau berbaring."',
          'Riwayat penyakit sekarang': ['Heartburn dan regurgitasi 2 bulan, terutama malam.', 'Memburuk setelah makanan berlemak/pedas dan langsung tidur.', 'Tidak ada nyeri saat aktivitas, keringat dingin, disfagia, melena, atau BB turun.'],
          'Faktor risiko': ['IMT berlebih, kopi, makan malam larut.'],
          'Sikap aktor': 'Khawatir sakit jantung.'
        },
        {
          'Diagnosis dan DD': ['GERD tanpa alarm symptom.', 'DD: gastritis/dispepsia, ulkus peptikum, angina/ACS, akalasia.'],
          'Pemeriksaan dan penunjang': ['TTV normal, nyeri epigastrium ringan.', 'Uji terapi PPI; endoskopi bila alarm/gagal terapi.', 'EKG bila nyeri dada meragukan.'],
          'Farmakologi': ['PPI dosis standar sebelum makan untuk periode uji terapi.', 'Antasida/alginat untuk gejala sesekali.'],
          'Edukasi': ['Turunkan BB, porsi kecil, hindari pemicu.', 'Jangan berbaring 2-3 jam setelah makan.']
        }),
      c('gastritis', 'Nyeri epigastrium terkait NSAID', 'Gastritis / dispepsia',
        'Pasien mengalami nyeri terbakar di epigastrium, mual, dan sering memakai ibuprofen.',
        {
          'Identitas dan pembuka': 'Tn. Arif, 45 tahun. "Ulu hati terasa perih, terutama setelah makan."',
          'Riwayat penyakit sekarang': ['Nyeri dan mual 1 minggu.', 'Sering telat makan, minum kopi, dan memakai ibuprofen.', 'Tidak ada hematemesis, melena, disfagia, atau BB turun.'],
          'Sikap aktor': 'Tampak tidak nyaman tetapi stabil.'
        },
        {
          'Diagnosis dan DD': ['Gastritis/dispepsia terkait NSAID.', 'DD: ulkus peptikum, GERD, pankreatitis, penyakit bilier.'],
          'Pemeriksaan dan penunjang': ['Nyeri tekan epigastrium tanpa peritonitis.', 'Tes H. pylori, darah lengkap, endoskopi bila alarm.'],
          'Farmakologi': ['Hentikan NSAID bila memungkinkan dan pertimbangkan PPI.', 'Eradikasi H. pylori hanya bila terbukti dan sesuai pedoman resistensi.'],
          'Red flags': ['Muntah darah, BAB hitam, nyeri hebat, sinkop, anemia, atau penurunan BB.']
        })
    ],

    'cardio': [
      c('heart-failure', 'Sesak, orthopnea, dan edema tungkai', 'Gagal jantung kongestif',
        'Pasien 58 tahun mengalami sesak progresif, sulit tidur telentang, dan kedua tungkai bengkak.',
        {
          'Identitas dan pembuka': 'Tn. Surya, 58 tahun. "Saya harus tidur pakai tiga bantal karena sesak."',
          'Riwayat penyakit sekarang': ['Sesak aktivitas, orthopnea, PND, batuk malam.', 'Cepat lelah dan edema kedua tungkai.', 'Tidak ada demam atau nyeri pleuritik.'],
          'Faktor risiko': ['Hipertensi, diabetes, merokok, riwayat infark.', 'Obat tidak diminum teratur.'],
          'Sikap aktor': 'Tampak sesak ringan.'
        },
        {
          'Diagnosis dan DD': ['Gagal jantung kronik dekompensasi.', 'DD: PPOK, pneumonia, emboli paru, gagal ginjal, sirosis.'],
          'Pemeriksaan fisik': ['JVP meningkat, ronki basal, S3, edema, hepatomegali/asites.'],
          'Penunjang': ['EKG, CXR, darah lengkap, elektrolit, fungsi ginjal/hati, BNP.', 'Ekokardiografi untuk struktur dan fraksi ejeksi.'],
          'Farmakologi': ['Diuretik untuk kongesti; terapi lain sesuai hemodinamik, fungsi ginjal, kalium, dan fraksi ejeksi.', 'Jangan menaikkan beta blocker saat dekompensasi akut tidak stabil.'],
          'Red flags': ['Sesak istirahat, hipotensi, nyeri dada, sinkop, atau edema paru.']
        })
    ],

    'dv': [
      c('leprosy-pb', 'Bercak hipopigmentasi mati rasa', 'Lepra pausibasiler',
        'Pasien memiliki tiga bercak putih kemerahan pada lengan yang tidak terasa saat disentuh.',
        {
          'Identitas dan pembuka': 'Tn. Rudi, 34 tahun. "Bercak ini sudah lama dan rasanya kebas."',
          'Riwayat penyakit sekarang': ['Tiga bercak selama 8 bulan, tidak gatal.', 'Sensasi sentuh, nyeri, dan suhu berkurang.', 'Tidak ada kelemahan atau ulkus telapak.'],
          'Faktor risiko': ['Kontak serumah lama dengan penderita kusta.', 'Pernah tinggal di daerah endemis.'],
          'Sikap aktor': 'Malu dan takut dikucilkan; respons baik pada komunikasi tanpa stigma.'
        },
        {
          'Diagnosis dan DD': ['Lepra berdasarkan cardinal sign; klasifikasi PB bila sesuai.', 'DD: panu, vitiligo, pitiriasis alba, tinea corporis.'],
          'Pemeriksaan fisik': ['Inspeksi seluruh kulit dengan privasi.', 'Uji sensibilitas dan palpasi saraf tepi.', 'Nilai motorik, sensorik, mata, tangan, dan kaki.'],
          'Penunjang': ['Slit skin smear bila tersedia.', 'KOH untuk menyingkirkan jamur.'],
          'Farmakologi': ['MDT mengikuti klasifikasi dan program nasional terkini.', 'WHO kini menggunakan rifampisin, dapson, dan klofazimin; durasi PB dan MB berbeda.'],
          'Edukasi': ['Dapat disembuhkan dan penularan turun setelah terapi efektif.', 'Lindungi area baal; neuritis/kelemahan baru perlu rujukan cepat.']
        })
    ],

    'lung-exam': [
      c('pneumonia', 'Batuk purulen, demam, dan konsolidasi', 'Pneumonia komunitas',
        'Pasien 46 tahun mengalami batuk berdahak kuning, demam, sesak, dan nyeri dada kanan saat inspirasi.',
        {
          'Identitas dan pembuka': 'Ny. Wati, 46 tahun. "Batuk berdahak dan sesak sejak tiga hari."',
          'Riwayat penyakit sekarang': ['Demam, dahak purulen, nyeri pleuritik kanan.', 'Tidak ada batuk lebih 2 minggu, keringat malam, orthopnea, atau edema.'],
          'Sikap aktor': 'Tampak sakit sedang dan batuk sesekali.'
        },
        {
          'Diagnosis dan DD': ['Pneumonia komunitas lobus bawah kanan.', 'DD: TB, bronkitis, PPOK eksaserbasi, emboli paru.'],
          'Pemeriksaan fisik': ['Demam, takipnea, takikardi, cek saturasi.', 'Fremitus naik, perkusi redup, ronki/napas bronkial.'],
          'Penunjang': ['CXR infiltrat/konsolidasi.', 'Darah lengkap; kultur bila berat.', 'Nilai derajat berat CRB-65/CURB-65.'],
          'Farmakologi': ['Antibiotik sesuai derajat, komorbid, alergi, dan resistensi lokal.', 'Antipiretik, hidrasi, oksigen bila hipoksemia.']
        }),
      c('tb', 'Batuk lebih dari 2 minggu dan BB turun', 'Tuberkulosis paru',
        'Pasien 39 tahun mengalami batuk produktif 4 minggu, keringat malam, dan berat badan turun.',
        {
          'Identitas dan pembuka': 'Tn. Fajar, 39 tahun. "Batuk hampir sebulan dan berat badan turun."',
          'Riwayat penyakit sekarang': ['Batuk 4 minggu, sesekali bercak darah.', 'Demam sore, keringat malam, nafsu makan turun.', 'Tanyakan terapi TB sebelumnya dan komorbid HIV/DM.'],
          'Faktor risiko': ['Kontak serumah TB dan ventilasi rumah buruk.'],
          'Sikap aktor': 'Kurus dan lemah.'
        },
        {
          'Diagnosis dan DD': ['Suspek TB paru.', 'DD: pneumonia, kanker paru, bronkiektasis, PPOK.'],
          'Pemeriksaan fisik': ['Dapat ada limfadenopati dan temuan dominan apeks; pemeriksaan juga bisa minimal.'],
          'Penunjang': ['TCM/Xpert sesuai algoritme program TB.', 'CXR mendukung tetapi bukan konfirmasi tunggal.', 'Skrining HIV dan diabetes.'],
          'Farmakologi': ['KDT berdasarkan kelompok berat badan dan hasil resistensi.', 'Pantau efek samping dan kepatuhan melalui program TB.'],
          'Edukasi': ['Etika batuk, ventilasi, evaluasi kontak, dan jangan putus obat.']
        }),
      c('copd', 'Sesak kronik pada perokok', 'PPOK',
        'Perokok 62 tahun mengalami sesak progresif dan batuk berdahak kronik.',
        {
          'Identitas dan pembuka': 'Tn. Hasan, 62 tahun. "Saya makin gampang sesak dan batuk sudah bertahun-tahun."',
          'Riwayat penyakit sekarang': ['Sesak aktivitas dan batuk berdahak kronik.', 'Dahak sedikit bertambah tetapi tidak purulen; tidak demam.', 'Tanyakan eksaserbasi, rawat inap, inhaler, mMRC/CAT.'],
          'Faktor risiko': ['Merokok 40 pack-years dan paparan asap biomassa.'],
          'Sikap aktor': 'Tripod ringan dan pursed-lip breathing.'
        },
        {
          'Diagnosis dan DD': ['PPOK; konfirmasi dengan spirometri.', 'DD: asma, gagal jantung, TB, pneumonia, kanker paru.'],
          'Pemeriksaan fisik': ['Barrel chest, ekspirasi memanjang, hipersonor, wheezing/suara napas turun.'],
          'Penunjang': ['Spirometri pascabronkodilator.', 'CXR untuk DD/komplikasi; AGD bila berat.'],
          'Farmakologi': ['Bronkodilator inhalasi berdasar gejala dan eksaserbasi.', 'Eksaserbasi: SABA/SAMA, steroid singkat, antibiotik bila indikasi, oksigen terkontrol.'],
          'Edukasi': ['Berhenti merokok, teknik inhaler, vaksinasi, rehabilitasi paru.']
        }),
      c('pneumothorax', 'Nyeri dada mendadak pada pria tinggi kurus', 'Pneumotoraks spontan primer',
        'Laki-laki 22 tahun mengalami nyeri dada kanan tajam dan sesak mendadak saat istirahat.',
        {
          'Identitas dan pembuka': 'Tn. Reza, 22 tahun. "Tiba-tiba dada kanan sakit dan saya sesak."',
          'Riwayat penyakit sekarang': ['Onset mendadak, nyeri pleuritik, sesak.', 'Tidak ada demam, dahak purulen, atau edema.'],
          'Faktor risiko': ['Tinggi, kurus, dan perokok.'],
          'Sikap aktor': 'Cemas dan bernapas cepat.'
        },
        {
          'Diagnosis dan DD': ['Pneumotoraks; nilai tension.', 'DD: emboli paru, pneumonia/pleuritis, ACS, asma.'],
          'Pemeriksaan fisik': ['Hemitoraks tertinggal, fremitus turun, hipersonor, suara napas turun.', 'Tension: hipotensi, JVP, deviasi trakea, hipoksia.'],
          'Penunjang': ['CXR/USG bila stabil.', 'Jangan menunda dekompresi bila tension secara klinis.'],
          'Tatalaksana': ['Oksigen dan monitoring.', 'Tension memerlukan dekompresi segera, drainase definitif, dan rujukan.']
        })
    ],

    'mata': [
      c('hordeolum', 'Benjolan nyeri pada kelopak mata', 'Hordeolum eksternum',
        'Pasien 25 tahun mengalami benjolan merah nyeri pada tepi kelopak mata kanan.',
        {
          'Identitas dan pembuka': 'Ny. Nina, 25 tahun. "Kelopak mata bengkak dan sakit kalau berkedip."',
          'Riwayat penyakit sekarang': ['Benjolan lokal 3 hari, nyeri tekan dan mengganjal.', 'Tidak ada visus turun atau nyeri gerak bola mata.'],
          'Faktor risiko': ['Tidur tanpa membersihkan kosmetik mata.'],
          'Sikap aktor': 'Sering ingin menyentuh mata.'
        },
        {
          'Diagnosis dan DD': ['Hordeolum eksternum.', 'DD: kalazion, selulitis preseptal, granuloma piogenik.'],
          'Pemeriksaan fisik': ['Visus normal.', 'Nodul merah nyeri di pangkal bulu mata.', 'Cari proptosis dan nyeri gerak bola mata.'],
          'Tatalaksana': ['Kompres hangat dan higiene kelopak.', 'Antibiotik topikal bila ada indikasi klinis.', 'Jangan memencet lesi.'],
          'Red flags': ['Demam, proptosis, visus turun, nyeri gerak bola mata, edema meluas.']
        }),
      c('conjunctivitis', 'Mata merah dengan sekret', 'Konjungtivitis bakterial',
        'Pasien mengalami mata merah, rasa mengganjal, dan sekret mukopurulen tanpa penurunan visus.',
        {
          'Identitas dan pembuka': 'Tn. Bayu, 29 tahun. "Mata kiri merah dan banyak kotoran."',
          'Riwayat penyakit sekarang': ['Kelopak lengket saat bangun.', 'Tidak ada nyeri berat, fotofobia, atau visus turun.', 'Anak di rumah juga mata merah.'],
          'Faktor risiko': ['Berbagi handuk.'],
          'Sikap aktor': 'Sering mengusap mata.'
        },
        {
          'Diagnosis dan DD': ['Konjungtivitis bakterial.', 'DD: viral/alergi, keratitis, uveitis, glaukoma akut.'],
          'Pemeriksaan fisik': ['Visus normal, injeksi konjungtiva, sekret, kornea jernih.', 'Nilai pupil dan kelenjar preaurikular.'],
          'Farmakologi': ['Antibiotik topikal dapat dipertimbangkan sesuai protokol.', 'Hindari steroid mata tanpa dokter mata.'],
          'Edukasi': ['Cuci tangan, jangan berbagi handuk, hentikan lensa kontak.', 'Rujuk bila nyeri, fotofobia, visus turun, kornea keruh, sekret hiperpurulen.']
        }),
      c('keratitis', 'Mata merah nyeri dengan visus turun', 'Keratitis infeksius',
        'Pengguna lensa kontak mengalami mata merah, nyeri, fotofobia, dan penurunan penglihatan.',
        {
          'Identitas dan pembuka': 'Ny. Citra, 23 tahun. "Mata kanan sangat sakit, silau, dan kabur."',
          'Riwayat penyakit sekarang': ['Nyeri, fotofobia, berair, visus turun sejak 1 hari.', 'Tidur memakai lensa kontak dan perawatannya buruk.', 'Tanyakan steroid mata, trauma organik, herpes, dan imun.'],
          'Sikap aktor': 'Sulit membuka mata dan menghindari cahaya.'
        },
        {
          'Diagnosis dan DD': ['Keratitis infeksius.', 'DD: uveitis, abrasi/ulkus kornea, glaukoma akut.'],
          'Pemeriksaan fisik': ['Ukur visus dulu.', 'Injeksi siliar, kornea keruh/defek, fluorescein bila tersedia.'],
          'Tatalaksana': ['Hentikan lensa kontak dan rujuk segera ke dokter mata.', 'Antimikroba intensif ditentukan berdasarkan etiologi.', 'Jangan beri anestetik untuk dibawa pulang atau steroid tanpa supervisi.'],
          'Red flags': ['Penurunan visus, infiltrat/ulkus, hipopion, nyeri berat, lensa kontak.']
        })
    ],

    'muskuloskeletal': [
      c('oa-knee', 'Nyeri lutut mekanik pada usia lanjut', 'Osteoartritis lutut',
        'Perempuan 64 tahun mengalami nyeri lutut saat berjalan yang membaik dengan istirahat.',
        {
          'Identitas dan pembuka': 'Ny. Sri, 64 tahun. "Lutut sakit kalau jalan atau naik tangga."',
          'Riwayat penyakit sekarang': ['Nyeri 1 tahun, kaku pagi kurang 30 menit.', 'Krepitasi dan gerak terbatas.', 'Tidak ada serangan merah-panas mendadak atau demam.'],
          'Faktor risiko': ['Obesitas dan pekerjaan banyak berdiri.'],
          'Sikap aktor': 'Berjalan perlahan dengan antalgic gait.'
        },
        {
          'Diagnosis dan DD': ['OA lutut.', 'DD: gout, rheumatoid arthritis, cedera meniskus.'],
          'Pemeriksaan fisik': ['Look-feel-move: deformitas, nyeri garis sendi, krepitasi, ROM turun.'],
          'Penunjang': ['X-ray: penyempitan celah, osteofit, sklerosis subkondral.', 'Lab untuk DD bila perlu.'],
          'Farmakologi': ['Analgesik topikal/oral sesuai risiko.', 'NSAID perlu skrining risiko GI, ginjal, dan kardiovaskular.'],
          'Non-farmakologi': ['Turunkan BB, latihan penguatan, aktivitas low-impact, fisioterapi.']
        }),
      c('acute-gout', 'Podagra akut setelah makanan tinggi purin', 'Gout arthritis akut',
        'Laki-laki 51 tahun mengalami nyeri sangat hebat, merah, dan bengkak pada pangkal ibu jari kaki sejak malam.',
        {
          'Identitas dan pembuka': 'Tn. Eko, 51 tahun. "Selimut menyentuh kaki saja sakit sekali."',
          'Riwayat penyakit sekarang': ['Onset mendadak malam, monoartritis MTP-1.', 'Merah, panas, bengkak, pernah serangan serupa.'],
          'Faktor risiko': ['Obesitas, hipertensi, jeroan/alkohol, diuretik tiazid.'],
          'Sikap aktor': 'Meringis dan menolak sendi digerakkan.'
        },
        {
          'Diagnosis dan DD': ['Gout akut.', 'DD: septic arthritis, pseudogout, RA, trauma.'],
          'Pemeriksaan fisik': ['Monoartritis inflamasi; cari demam dan sumber infeksi.'],
          'Penunjang': ['Cairan sendi: kristal jarum birefringence negatif.', 'Asam urat dapat normal saat serangan.', 'Kultur bila infeksi mungkin.'],
          'Farmakologi': ['Pilih NSAID, kolkisin dosis rendah, atau steroid sesuai komorbid.', 'Terapi penurun urat jangka panjang berdasarkan indikasi.'],
          'Red flags': ['Curiga septic arthritis memerlukan aspirasi dan rujukan segera.']
        })
    ],

    'neuro': [
      c('tth', 'Nyeri kepala seperti diikat saat stres', 'Tension-type headache',
        'Pasien mengalami nyeri kepala bilateral seperti diikat setelah beberapa minggu banyak pekerjaan.',
        {
          'Identitas dan pembuka': 'Ny. Dina, 30 tahun. "Kepala terasa kencang seperti diikat."',
          'Riwayat penyakit sekarang': ['Bilateral, menekan, ringan-sedang.', 'Tidak memburuk dengan aktivitas dan tanpa mual muntah.', 'Terkait stres dan kurang tidur.'],
          'Red flags': ['Tidak ada thunderclap, demam, trauma, defisit neurologis, kanker, atau kehamilan.'],
          'Sikap aktor': 'Lelah tetapi kooperatif.'
        },
        {
          'Diagnosis dan DD': ['TTH episodik.', 'DD: migrain, cluster, nyeri kepala sekunder.'],
          'Pemeriksaan fisik': ['TTV dan neurologis normal.', 'Nilai red flags SNNOOP10.'],
          'Penunjang': ['Tidak perlu imaging bila tipikal tanpa red flags.'],
          'Farmakologi': ['Analgesik sederhana/NSAID sesekali sesuai kontraindikasi.', 'Hindari medication-overuse.'],
          'Edukasi': ['Tidur teratur, hidrasi, relaksasi, ergonomi, kelola stres.']
        }),
      c('migraine', 'Nyeri kepala berdenyut dengan aura', 'Migrain dengan aura',
        'Perempuan 26 tahun mengalami nyeri unilateral berdenyut, mual, fotofobia, dan kilatan cahaya sebelum serangan.',
        {
          'Identitas dan pembuka': 'Ny. Ayu, 26 tahun. "Kepala kiri berdenyut dan cahaya membuat tambah sakit."',
          'Riwayat penyakit sekarang': ['Sedang-berat, memburuk dengan aktivitas, 12 jam.', 'Mual, fotofobia, fonofobia.', 'Aura zig-zag 20 menit sebelum nyeri; 2-3 serangan/bulan.'],
          'Faktor pemicu': ['Kurang tidur, telat makan, menstruasi.'],
          'Sikap aktor': 'Meminta ruangan redup.'
        },
        {
          'Diagnosis dan DD': ['Migrain dengan aura.', 'DD: TTH, cluster, TIA bila aura atipikal.'],
          'Pemeriksaan fisik': ['Neurologis dan funduskopi normal; nilai red flags.'],
          'Farmakologi': ['Analgesik/NSAID dini untuk ringan-sedang.', 'Triptan bila sedang-berat dan tidak ada kontraindikasi vaskular.', 'Profilaksis berdasarkan frekuensi/disabilitas.'],
          'Edukasi': ['Catat pemicu, tidur/makan teratur, batasi obat akut.']
        }),
      c('cluster', 'Nyeri orbital malam dengan lakrimasi', 'Cluster headache',
        'Laki-laki 35 tahun mengalami nyeri orbital kiri sangat hebat pada waktu yang sama setiap malam dengan mata berair.',
        {
          'Identitas dan pembuka': 'Tn. Rio, 35 tahun. "Setiap tengah malam mata kiri seperti ditusuk."',
          'Riwayat penyakit sekarang': ['Unilateral orbital/temporal, 45-90 menit.', 'Tiap malam 2 minggu, lakrimasi, hidung tersumbat, ptosis ringan.', 'Tidak ingin berbaring diam.'],
          'Faktor risiko': ['Merokok dan alkohol.'],
          'Sikap aktor': 'Gelisah dan mondar-mandir.'
        },
        {
          'Diagnosis dan DD': ['Cluster headache.', 'DD: migrain, neuralgia trigeminal, glaukoma akut.'],
          'Pemeriksaan fisik': ['Lakrimasi, kongesti nasal, miosis/ptosis ipsilateral.', 'Neurologis lain normal; periksa mata.'],
          'Farmakologi': ['Oksigen aliran tinggi non-rebreather dan/atau triptan kerja cepat.', 'Profilaksis seperti verapamil perlu monitoring ECG.'],
          'Edukasi': ['Hindari alkohol saat cluster bout dan rujuk untuk pencegahan.']
        }),
      c('bppv', 'Vertigo singkat dipicu posisi', 'BPPV kanal posterior',
        'Perempuan 52 tahun mengalami sensasi berputar 10-30 detik saat bangun atau menoleh ke kanan.',
        {
          'Identitas dan pembuka': 'Ny. Ratna, 52 tahun. "Kalau bangun atau menoleh, kamar berputar sebentar."',
          'Riwayat penyakit sekarang': ['Vertigo singkat berulang dipicu posisi, mual ringan.', 'Tidak ada gangguan dengar, diplopia, disartria, kelemahan, atau sakit kepala baru.'],
          'Faktor risiko': ['Benturan kepala ringan sebulan lalu.'],
          'Sikap aktor': 'Bergerak hati-hati dan takut jatuh.'
        },
        {
          'Diagnosis dan DD': ['BPPV posterior.', 'DD: neuritis vestibular, Meniere, migrain vestibular, stroke posterior.'],
          'Pemeriksaan fisik': ['Dix-Hallpike positif dengan nistagmus torsional-upbeating, laten, fatigable.', 'Neurologis dan gait dinilai.'],
          'Tatalaksana': ['Epley/canalith repositioning adalah terapi utama.', 'Vestibular suppressant hanya singkat bila mual berat.'],
          'Red flags': ['Nistagmus vertikal/persisten, defisit neurologis, sakit kepala berat, tidak mampu berjalan.']
        })
    ],

    'tht': [
      c('aom', 'Anak demam dan nyeri telinga setelah ISPA', 'Otitis media akut stadium supurasi',
        'Anak 7 tahun mengalami demam dan nyeri telinga kanan hebat setelah lima hari batuk pilek.',
        {
          'Identitas dan pembuka': 'An. Raka, 7 tahun. "Telinga kanan sakit sekali." Ibu membantu menjawab.',
          'Riwayat penyakit sekarang': ['ISPA 5 hari, lalu otalgia, demam, pendengaran turun.', 'Belum ada otore, bengkak mastoid, vertigo, atau wajah mencong.'],
          'Faktor risiko': ['Paparan asap rokok dan ISPA berulang.'],
          'Sikap aktor': 'Rewel dan memegang telinga.'
        },
        {
          'Diagnosis dan DD': ['OMA stadium supurasi.', 'DD: otitis eksterna, OME, mastoiditis.'],
          'Pemeriksaan fisik': ['Membran timpani bulging/hiperemis dan mobilitas turun.', 'Nilai tragus, mastoid, nervus fasialis.'],
          'Farmakologi': ['Analgesik berbasis berat badan.', 'Antibiotik berdasarkan usia, berat gejala, bilateral/otore, dan pedoman lokal.'],
          'Red flags': ['Bengkak mastoid, paresis wajah, meningismus, vertigo berat, atau tidak membaik.']
        }),
      c('epistaxis', 'Mimisan anterior setelah mengorek hidung', 'Epistaksis anterior',
        'Remaja 16 tahun mengalami perdarahan dari lubang hidung kiri setelah mengorek hidung.',
        {
          'Identitas dan pembuka': 'An. Aldi, 16 tahun. "Hidung berdarah setelah saya korek."',
          'Riwayat penyakit sekarang': ['Darah keluar dari depan selama 10 menit.', 'Tidak dominan ke tenggorok dan tanpa trauma kepala.', 'Tidak ada antikoagulan, mudah memar, atau hipertensi.'],
          'Faktor risiko': ['Udara kering dan kebiasaan mengorek hidung.'],
          'Sikap aktor': 'Cemas sambil memegang hidung.'
        },
        {
          'Diagnosis dan DD': ['Epistaksis anterior pleksus Kiesselbach.', 'DD: posterior, koagulopati, trauma/tumor.'],
          'Pemeriksaan fisik': ['Nilai ABC, TTV, jumlah perdarahan, syok.', 'Rinoskopi anterior setelah terkontrol.'],
          'Tatalaksana': ['Duduk condong ke depan dan tekan bagian lunak 10-15 menit.', 'Vasokonstriktor/kauter/tampon bila tetap berdarah dan kompeten.', 'Jangan menengadahkan kepala.'],
          'Red flags': ['Perdarahan masif/posterior, syok, antikoagulan, atau tidak terkontrol.']
        })
    ],

    'radiologi': [
      c('cxr-pneumonia', 'CXR konsolidasi pneumonia', 'Pneumonia lobaris',
        'Pasien demam, batuk produktif, dan sesak. Interpretasikan foto toraks PA-lateral secara sistematis.',
        {'Peran pasien': 'Tidak ada aktor aktif. Bila ditanya: demam 3 hari, dahak purulen, nyeri pleuritik kanan.'},
        {
          'Kualitas': ['Identitas, proyeksi, rotasi, inspirasi, penetrasi, angulasi.'],
          'Temuan': ['Opasitas air-space lobus bawah kanan dengan air bronchogram.', 'Nilai efusi dan pneumotoraks.'],
          'Kesimpulan dan DD': ['Konsolidasi sesuai pneumonia.', 'DD: atelektasis, infark paru, massa.']
        }),
      c('cxr-tb', 'CXR kavitas apeks suspek TB', 'Tuberkulosis paru',
        'Pasien batuk lebih dari dua minggu, keringat malam, dan BB turun. Interpretasikan foto toraks.',
        {'Peran pasien': 'Tidak ada aktor aktif. Bila ditanya: batuk 4 minggu, demam sore, keringat malam.'},
        {
          'Temuan': ['Infiltrat dominan apeks/lobus atas.', 'Kavitas, volume loss/fibrosis, efusi dinilai.'],
          'Kesimpulan dan DD': ['Mendukung TB aktif tetapi tidak diagnostik sendiri.', 'DD: abses, kanker kavitas, jamur.'],
          'Tindak lanjut': ['Konfirmasi TCM/Xpert atau pemeriksaan sputum sesuai algoritme.']
        }),
      c('cxr-pneumothorax', 'CXR pneumotoraks', 'Pneumotoraks',
        'Pasien mengalami nyeri dada dan sesak mendadak. Interpretasikan foto toraks.',
        {'Peran pasien': 'Tidak ada aktor aktif. Bila ditanya: nyeri pleuritik, sesak, suara napas satu sisi turun.'},
        {
          'Temuan': ['Garis pleura viseral dan tidak ada marking vaskular di perifer.', 'Tension: deviasi mediastinum dan depresi diafragma.'],
          'Kesimpulan': ['Sebutkan sisi, ukuran perkiraan, dan tanda tension.'],
          'Keselamatan': ['Tension adalah diagnosis klinis; jangan menunggu foto untuk dekompresi.']
        }),
      c('cxr-hf', 'CXR edema paru kardiogenik', 'Gagal jantung dengan edema paru',
        'Pasien sesak, orthopnea, dan edema tungkai. Interpretasikan foto toraks.',
        {'Peran pasien': 'Tidak ada aktor aktif. Bila ditanya: orthopnea, PND, edema, hipertensi.'},
        {
          'Temuan': ['CTR >50% pada PA, redistribusi vaskular, Kerley B.', 'Opasitas perihiler bat-wing dan efusi dapat terlihat.'],
          'Kesimpulan dan DD': ['Kongesti/edema paru kardiogenik.', 'DD: ARDS dan pneumonia bilateral.']
        })
    ],

    'airway-management': [
      c('polytrauma', 'Politrauma dengan obstruksi jalan napas', 'Indikasi intubasi pada trauma kepala',
        'Laki-laki 23 tahun pascakecelakaan tidak sadar, helm retak, napas gasping, gurgling, dan darah keluar dari mulut serta hidung. TD 90/40, nadi 130, RR 30.',
        {
          'Peran pasien/manikin': 'Tidak sadar, GCS <8, tidak merespons perintah.',
          'Temuan awal': ['Gurgling dan darah di orofaring.', 'Napas cepat dangkal, hipotensi, takikardi.', 'Kemungkinan cedera servikal.'],
          'Respons simulasi': ['Saturasi membaik setelah suction dan ventilasi BVM efektif.']
        },
        {
          'Prioritas': ['Panggil bantuan dan trauma ABCDE.', 'Manual in-line stabilization; jangan head tilt.', 'Suction, preoksigenasi, monitoring, dan rencana rescue airway.'],
          'Indikasi intubasi': ['Tidak mampu melindungi jalan napas, GCS rendah, obstruksi, ventilasi/oksigenasi tidak adekuat.'],
          'Persiapan': ['Suction, BVM, laringoskop, ETT, stylet/bougie, cuff syringe, capnography.', 'Obat RSI disesuaikan hemodinamik oleh operator kompeten.'],
          'Konfirmasi': ['Waveform capnography utama.', 'Ekspansi dada, auskultasi, kedalaman tabung, dan CXR setelah stabil.'],
          'Kesalahan kritis': ['Tidak menjaga servikal.', 'Tidak suction/preoksigenasi.', 'Percobaan terlalu lama.', 'Tidak mengenali intubasi esofagus.']
        })
    ]
  };
})();
