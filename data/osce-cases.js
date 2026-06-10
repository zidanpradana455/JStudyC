/* Skenario pasien simulasi Mini OSCE Semester 4. */
window.OSCE_CASES = {
  "abo-blood-grouping": [
    {
      "id": "abo-a",
      "title": "Persiapan transfusi pasien anemia",
      "diagnosis": "Golongan darah A",
      "prompt": "Perempuan 28 tahun dengan anemia direncanakan transfusi. Lakukan pemeriksaan golongan darah ABO metode slide dan interpretasikan hasilnya.",
      "patient": {
        "Identitas dan pembuka": "Ny. Rina, 28 tahun. \"Saya diminta periksa golongan darah sebelum transfusi, Dok.\"",
        "Sikap aktor": "Kooperatif tetapi takut jarum. Bersedia setelah tujuan, prosedur, risiko tidak nyaman, dan persetujuan dijelaskan.",
        "Jika ditanya": [
          "Belum pernah mengetahui golongan darah.",
          "Belum pernah transfusi atau mengalami reaksi transfusi.",
          "Tidak memiliki riwayat pingsan saat melihat darah."
        ]
      }
    }
  ],
  "apusan-darah": [
    {
      "id": "malaria-smear",
      "title": "Demam setelah perjalanan ke Papua",
      "diagnosis": "Malaria falciparum",
      "prompt": "Pasien mengalami demam, menggigil, berkeringat, dan baru kembali dari daerah endemis. Buat apusan darah tebal dan tipis untuk memastikan malaria.",
      "patient": {
        "Identitas dan pembuka": "Tn. Andi, 27 tahun. \"Saya demam menggigil sejak pulang dari Papua.\"",
        "Riwayat penyakit sekarang": [
          "Demam hilang timbul 4 hari, menggigil lalu berkeringat.",
          "Sakit kepala, pegal, dan mual ringan.",
          "Tidak ada batuk lama atau perdarahan."
        ],
        "Faktor risiko": [
          "Pulang dari Papua 10 hari lalu.",
          "Sering bekerja malam tanpa kelambu."
        ],
        "Sikap aktor": "Lemah tetapi kooperatif dan bersedia diambil darah setelah informed consent."
      }
    }
  ],
  "abdomen-anak": [
    {
      "id": "dengue-child",
      "title": "Anak demam hari ke-4 dengan petekie",
      "diagnosis": "Demam dengue / DBD tanpa syok",
      "prompt": "Anak 9 tahun dibawa ibunya karena demam tinggi mendadak selama 4 hari, nyeri kepala, mual, dan bintik merah.",
      "patient": {
        "Identitas dan pembuka": "An. Bima, 9 tahun, BB 28 kg. Ibu berkata, \"Demamnya empat hari dan tadi pagi muncul bintik merah.\"",
        "Riwayat penyakit sekarang": [
          "Demam terus-menerus, nyeri belakang mata, pegal, mual.",
          "Petekie dan gusi sedikit berdarah.",
          "Masih bisa minum dan BAK; tidak ada muntah persisten atau penurunan kesadaran."
        ],
        "Faktor risiko": [
          "Ada genangan air di sekitar rumah.",
          "Tetangga baru dirawat karena DBD."
        ],
        "Sikap aktor": "Anak lemas; ibu cemas dan menjadi sumber anamnesis."
      }
    },
    {
      "id": "typhoid-child",
      "title": "Anak demam bertahap dan gangguan cerna",
      "diagnosis": "Demam tifoid",
      "prompt": "Anak 10 tahun mengalami demam yang makin tinggi terutama sore-malam selama 7 hari, mual, dan konstipasi.",
      "patient": {
        "Identitas dan pembuka": "An. Sari, 10 tahun, BB 30 kg. \"Demamnya makin tinggi tiap sore, Dok.\"",
        "Riwayat penyakit sekarang": [
          "Demam bertahap 7 hari, sakit kepala frontal dan pegal.",
          "Mual, konstipasi, nyeri ulu hati, nafsu makan turun.",
          "Tidak ada petekie, nyeri betis, atau menggigil periodik."
        ],
        "Faktor risiko": [
          "Sering jajan dan jarang cuci tangan sebelum makan."
        ],
        "Sikap aktor": "Lemas; ibu membantu menjawab."
      }
    }
  ],
  "abdomen-dewasa": [
    {
      "id": "typhoid-adult",
      "title": "Demam tifoid pada dewasa",
      "diagnosis": "Demam tifoid",
      "prompt": "Pasien dewasa mengalami demam bertahap selama 8 hari, sakit kepala, nyeri epigastrium, dan konstipasi.",
      "patient": {
        "Identitas dan pembuka": "Tn. Damar, 24 tahun. \"Demam lebih tinggi sore dan malam sudah delapan hari.\"",
        "Riwayat penyakit sekarang": [
          "Demam step-ladder, sakit kepala frontal, pegal.",
          "Mual, konstipasi, nyeri epigastrium.",
          "Tidak ada petekie, nyeri betis, atau menggigil periodik."
        ],
        "Faktor risiko": [
          "Sering makan di warung dengan higiene kurang baik."
        ],
        "Sikap aktor": "Tampak sakit sedang dan lemah."
      }
    },
    {
      "id": "malaria-adult",
      "title": "Demam periodik setelah perjalanan endemis",
      "diagnosis": "Malaria",
      "prompt": "Pasien mengalami demam periodik, menggigil, berkeringat, dan baru kembali dari NTT.",
      "patient": {
        "Identitas dan pembuka": "Ny. Maya, 31 tahun. \"Demam datang seperti serangan, menggigil lalu berkeringat.\"",
        "Riwayat penyakit sekarang": [
          "Demam 5 hari, sakit kepala, nyeri otot, mual.",
          "Tidak ada perdarahan atau batuk lama.",
          "Tanyakan kejang, sesak, urine gelap, dan penurunan kesadaran."
        ],
        "Faktor risiko": [
          "Pulang dari NTT 2 minggu lalu tanpa kelambu."
        ],
        "Sikap aktor": "Pucat dan lemah."
      }
    },
    {
      "id": "leptospirosis",
      "title": "Demam dan nyeri betis setelah banjir",
      "diagnosis": "Leptospirosis",
      "prompt": "Petani 42 tahun mengalami demam, mata merah, dan nyeri betis setelah bekerja di sawah tergenang.",
      "patient": {
        "Identitas dan pembuka": "Tn. Joko, 42 tahun. \"Sejak membersihkan sawah banjir saya demam dan betis sakit.\"",
        "Riwayat penyakit sekarang": [
          "Demam menggigil 5 hari, sakit kepala, mual.",
          "Nyeri betis/paha, mata merah, urine berkurang.",
          "Tanyakan ikterus, sesak, perdarahan, dan kesadaran."
        ],
        "Faktor risiko": [
          "Kontak air banjir tanpa alas kaki dan banyak tikus."
        ],
        "Sikap aktor": "Mengeluh saat betis ditekan."
      }
    },
    {
      "id": "gerd",
      "title": "Heartburn dan regurgitasi malam hari",
      "diagnosis": "GERD",
      "prompt": "Pasien mengalami panas retrosternal dan rasa asam di mulut yang memburuk setelah makan serta saat berbaring.",
      "patient": {
        "Identitas dan pembuka": "Ny. Lestari, 38 tahun. \"Dada terasa panas dan asam naik ke mulut kalau berbaring.\"",
        "Riwayat penyakit sekarang": [
          "Heartburn dan regurgitasi 2 bulan, terutama malam.",
          "Memburuk setelah makanan berlemak/pedas dan langsung tidur.",
          "Tidak ada nyeri saat aktivitas, keringat dingin, disfagia, melena, atau BB turun."
        ],
        "Faktor risiko": [
          "IMT berlebih, kopi, makan malam larut."
        ],
        "Sikap aktor": "Khawatir sakit jantung."
      }
    },
    {
      "id": "gastritis",
      "title": "Nyeri epigastrium terkait NSAID",
      "diagnosis": "Gastritis / dispepsia",
      "prompt": "Pasien mengalami nyeri terbakar di epigastrium, mual, dan sering memakai ibuprofen.",
      "patient": {
        "Identitas dan pembuka": "Tn. Arif, 45 tahun. \"Ulu hati terasa perih, terutama setelah makan.\"",
        "Riwayat penyakit sekarang": [
          "Nyeri dan mual 1 minggu.",
          "Sering telat makan, minum kopi, dan memakai ibuprofen.",
          "Tidak ada hematemesis, melena, disfagia, atau BB turun."
        ],
        "Sikap aktor": "Tampak tidak nyaman tetapi stabil."
      }
    }
  ],
  "cardio": [
    {
      "id": "heart-failure",
      "title": "Sesak, orthopnea, dan edema tungkai",
      "diagnosis": "Gagal jantung kongestif",
      "prompt": "Pasien 58 tahun mengalami sesak progresif, sulit tidur telentang, dan kedua tungkai bengkak.",
      "patient": {
        "Identitas dan pembuka": "Tn. Surya, 58 tahun. \"Saya harus tidur pakai tiga bantal karena sesak.\"",
        "Riwayat penyakit sekarang": [
          "Sesak aktivitas, orthopnea, PND, batuk malam.",
          "Cepat lelah dan edema kedua tungkai.",
          "Tidak ada demam atau nyeri pleuritik."
        ],
        "Faktor risiko": [
          "Hipertensi, diabetes, merokok, riwayat infark.",
          "Obat tidak diminum teratur."
        ],
        "Sikap aktor": "Tampak sesak ringan."
      }
    }
  ],
  "dv": [
    {
      "id": "leprosy-pb",
      "title": "Bercak hipopigmentasi mati rasa",
      "diagnosis": "Lepra pausibasiler",
      "prompt": "Pasien memiliki tiga bercak putih kemerahan pada lengan yang tidak terasa saat disentuh.",
      "patient": {
        "Identitas dan pembuka": "Tn. Rudi, 34 tahun. \"Bercak ini sudah lama dan rasanya kebas.\"",
        "Riwayat penyakit sekarang": [
          "Tiga bercak selama 8 bulan, tidak gatal.",
          "Sensasi sentuh, nyeri, dan suhu berkurang.",
          "Tidak ada kelemahan atau ulkus telapak."
        ],
        "Faktor risiko": [
          "Kontak serumah lama dengan penderita kusta.",
          "Pernah tinggal di daerah endemis."
        ],
        "Sikap aktor": "Malu dan takut dikucilkan; respons baik pada komunikasi tanpa stigma."
      }
    }
  ],
  "lung-exam": [
    {
      "id": "pneumonia",
      "title": "Batuk purulen, demam, dan konsolidasi",
      "diagnosis": "Pneumonia komunitas",
      "prompt": "Pasien 46 tahun mengalami batuk berdahak kuning, demam, sesak, dan nyeri dada kanan saat inspirasi.",
      "patient": {
        "Identitas dan pembuka": "Ny. Wati, 46 tahun. \"Batuk berdahak dan sesak sejak tiga hari.\"",
        "Riwayat penyakit sekarang": [
          "Demam, dahak purulen, nyeri pleuritik kanan.",
          "Tidak ada batuk lebih 2 minggu, keringat malam, orthopnea, atau edema."
        ],
        "Sikap aktor": "Tampak sakit sedang dan batuk sesekali."
      }
    },
    {
      "id": "tb",
      "title": "Batuk lebih dari 2 minggu dan BB turun",
      "diagnosis": "Tuberkulosis paru",
      "prompt": "Pasien 39 tahun mengalami batuk produktif 4 minggu, keringat malam, dan berat badan turun.",
      "patient": {
        "Identitas dan pembuka": "Tn. Fajar, 39 tahun. \"Batuk hampir sebulan dan berat badan turun.\"",
        "Riwayat penyakit sekarang": [
          "Batuk 4 minggu, sesekali bercak darah.",
          "Demam sore, keringat malam, nafsu makan turun.",
          "Tanyakan terapi TB sebelumnya dan komorbid HIV/DM."
        ],
        "Faktor risiko": [
          "Kontak serumah TB dan ventilasi rumah buruk."
        ],
        "Sikap aktor": "Kurus dan lemah."
      }
    },
    {
      "id": "copd",
      "title": "Sesak kronik pada perokok",
      "diagnosis": "PPOK",
      "prompt": "Perokok 62 tahun mengalami sesak progresif dan batuk berdahak kronik.",
      "patient": {
        "Identitas dan pembuka": "Tn. Hasan, 62 tahun. \"Saya makin gampang sesak dan batuk sudah bertahun-tahun.\"",
        "Riwayat penyakit sekarang": [
          "Sesak aktivitas dan batuk berdahak kronik.",
          "Dahak sedikit bertambah tetapi tidak purulen; tidak demam.",
          "Tanyakan eksaserbasi, rawat inap, inhaler, mMRC/CAT."
        ],
        "Faktor risiko": [
          "Merokok 40 pack-years dan paparan asap biomassa."
        ],
        "Sikap aktor": "Tripod ringan dan pursed-lip breathing."
      }
    },
    {
      "id": "pneumothorax",
      "title": "Nyeri dada mendadak pada pria tinggi kurus",
      "diagnosis": "Pneumotoraks spontan primer",
      "prompt": "Laki-laki 22 tahun mengalami nyeri dada kanan tajam dan sesak mendadak saat istirahat.",
      "patient": {
        "Identitas dan pembuka": "Tn. Reza, 22 tahun. \"Tiba-tiba dada kanan sakit dan saya sesak.\"",
        "Riwayat penyakit sekarang": [
          "Onset mendadak, nyeri pleuritik, sesak.",
          "Tidak ada demam, dahak purulen, atau edema."
        ],
        "Faktor risiko": [
          "Tinggi, kurus, dan perokok."
        ],
        "Sikap aktor": "Cemas dan bernapas cepat."
      }
    }
  ],
  "mata": [
    {
      "id": "hordeolum",
      "title": "Benjolan nyeri pada kelopak mata",
      "diagnosis": "Hordeolum eksternum",
      "prompt": "Pasien 25 tahun mengalami benjolan merah nyeri pada tepi kelopak mata kanan.",
      "patient": {
        "Identitas dan pembuka": "Ny. Nina, 25 tahun. \"Kelopak mata bengkak dan sakit kalau berkedip.\"",
        "Riwayat penyakit sekarang": [
          "Benjolan lokal 3 hari, nyeri tekan dan mengganjal.",
          "Tidak ada visus turun atau nyeri gerak bola mata."
        ],
        "Faktor risiko": [
          "Tidur tanpa membersihkan kosmetik mata."
        ],
        "Sikap aktor": "Sering ingin menyentuh mata."
      }
    },
    {
      "id": "conjunctivitis",
      "title": "Mata merah dengan sekret",
      "diagnosis": "Konjungtivitis bakterial",
      "prompt": "Pasien mengalami mata merah, rasa mengganjal, dan sekret mukopurulen tanpa penurunan visus.",
      "patient": {
        "Identitas dan pembuka": "Tn. Bayu, 29 tahun. \"Mata kiri merah dan banyak kotoran.\"",
        "Riwayat penyakit sekarang": [
          "Kelopak lengket saat bangun.",
          "Tidak ada nyeri berat, fotofobia, atau visus turun.",
          "Anak di rumah juga mata merah."
        ],
        "Faktor risiko": [
          "Berbagi handuk."
        ],
        "Sikap aktor": "Sering mengusap mata."
      }
    },
    {
      "id": "keratitis",
      "title": "Mata merah nyeri dengan visus turun",
      "diagnosis": "Keratitis infeksius",
      "prompt": "Pengguna lensa kontak mengalami mata merah, nyeri, fotofobia, dan penurunan penglihatan.",
      "patient": {
        "Identitas dan pembuka": "Ny. Citra, 23 tahun. \"Mata kanan sangat sakit, silau, dan kabur.\"",
        "Riwayat penyakit sekarang": [
          "Nyeri, fotofobia, berair, visus turun sejak 1 hari.",
          "Tidur memakai lensa kontak dan perawatannya buruk.",
          "Tanyakan steroid mata, trauma organik, herpes, dan imun."
        ],
        "Sikap aktor": "Sulit membuka mata dan menghindari cahaya."
      }
    }
  ],
  "muskuloskeletal": [
    {
      "id": "oa-knee",
      "title": "Nyeri lutut mekanik pada usia lanjut",
      "diagnosis": "Osteoartritis lutut",
      "prompt": "Perempuan 64 tahun mengalami nyeri lutut saat berjalan yang membaik dengan istirahat.",
      "patient": {
        "Identitas dan pembuka": "Ny. Sri, 64 tahun. \"Lutut sakit kalau jalan atau naik tangga.\"",
        "Riwayat penyakit sekarang": [
          "Nyeri 1 tahun, kaku pagi kurang 30 menit.",
          "Krepitasi dan gerak terbatas.",
          "Tidak ada serangan merah-panas mendadak atau demam."
        ],
        "Faktor risiko": [
          "Obesitas dan pekerjaan banyak berdiri."
        ],
        "Sikap aktor": "Berjalan perlahan dengan antalgic gait."
      }
    },
    {
      "id": "acute-gout",
      "title": "Podagra akut setelah makanan tinggi purin",
      "diagnosis": "Gout arthritis akut",
      "prompt": "Laki-laki 51 tahun mengalami nyeri sangat hebat, merah, dan bengkak pada pangkal ibu jari kaki sejak malam.",
      "patient": {
        "Identitas dan pembuka": "Tn. Eko, 51 tahun. \"Selimut menyentuh kaki saja sakit sekali.\"",
        "Riwayat penyakit sekarang": [
          "Onset mendadak malam, monoartritis MTP-1.",
          "Merah, panas, bengkak, pernah serangan serupa."
        ],
        "Faktor risiko": [
          "Obesitas, hipertensi, jeroan/alkohol, diuretik tiazid."
        ],
        "Sikap aktor": "Meringis dan menolak sendi digerakkan."
      }
    }
  ],
  "neuro": [
    {
      "id": "tth",
      "title": "Nyeri kepala seperti diikat saat stres",
      "diagnosis": "Tension-type headache",
      "prompt": "Pasien mengalami nyeri kepala bilateral seperti diikat setelah beberapa minggu banyak pekerjaan.",
      "patient": {
        "Identitas dan pembuka": "Ny. Dina, 30 tahun. \"Kepala terasa kencang seperti diikat.\"",
        "Riwayat penyakit sekarang": [
          "Bilateral, menekan, ringan-sedang.",
          "Tidak memburuk dengan aktivitas dan tanpa mual muntah.",
          "Terkait stres dan kurang tidur."
        ],
        "Red flags": [
          "Tidak ada thunderclap, demam, trauma, defisit neurologis, kanker, atau kehamilan."
        ],
        "Sikap aktor": "Lelah tetapi kooperatif."
      }
    },
    {
      "id": "migraine",
      "title": "Nyeri kepala berdenyut dengan aura",
      "diagnosis": "Migrain dengan aura",
      "prompt": "Perempuan 26 tahun mengalami nyeri unilateral berdenyut, mual, fotofobia, dan kilatan cahaya sebelum serangan.",
      "patient": {
        "Identitas dan pembuka": "Ny. Ayu, 26 tahun. \"Kepala kiri berdenyut dan cahaya membuat tambah sakit.\"",
        "Riwayat penyakit sekarang": [
          "Sedang-berat, memburuk dengan aktivitas, 12 jam.",
          "Mual, fotofobia, fonofobia.",
          "Aura zig-zag 20 menit sebelum nyeri; 2-3 serangan/bulan."
        ],
        "Faktor pemicu": [
          "Kurang tidur, telat makan, menstruasi."
        ],
        "Sikap aktor": "Meminta ruangan redup."
      }
    },
    {
      "id": "cluster",
      "title": "Nyeri orbital malam dengan lakrimasi",
      "diagnosis": "Cluster headache",
      "prompt": "Laki-laki 35 tahun mengalami nyeri orbital kiri sangat hebat pada waktu yang sama setiap malam dengan mata berair.",
      "patient": {
        "Identitas dan pembuka": "Tn. Rio, 35 tahun. \"Setiap tengah malam mata kiri seperti ditusuk.\"",
        "Riwayat penyakit sekarang": [
          "Unilateral orbital/temporal, 45-90 menit.",
          "Tiap malam 2 minggu, lakrimasi, hidung tersumbat, ptosis ringan.",
          "Tidak ingin berbaring diam."
        ],
        "Faktor risiko": [
          "Merokok dan alkohol."
        ],
        "Sikap aktor": "Gelisah dan mondar-mandir."
      }
    },
    {
      "id": "bppv",
      "title": "Vertigo singkat dipicu posisi",
      "diagnosis": "BPPV kanal posterior",
      "prompt": "Perempuan 52 tahun mengalami sensasi berputar 10-30 detik saat bangun atau menoleh ke kanan.",
      "patient": {
        "Identitas dan pembuka": "Ny. Ratna, 52 tahun. \"Kalau bangun atau menoleh, kamar berputar sebentar.\"",
        "Riwayat penyakit sekarang": [
          "Vertigo singkat berulang dipicu posisi, mual ringan.",
          "Tidak ada gangguan dengar, diplopia, disartria, kelemahan, atau sakit kepala baru."
        ],
        "Faktor risiko": [
          "Benturan kepala ringan sebulan lalu."
        ],
        "Sikap aktor": "Bergerak hati-hati dan takut jatuh."
      }
    }
  ],
  "tht": [
    {
      "id": "aom",
      "title": "Anak demam dan nyeri telinga setelah ISPA",
      "diagnosis": "Otitis media akut stadium supurasi",
      "prompt": "Anak 7 tahun mengalami demam dan nyeri telinga kanan hebat setelah lima hari batuk pilek.",
      "patient": {
        "Identitas dan pembuka": "An. Raka, 7 tahun. \"Telinga kanan sakit sekali.\" Ibu membantu menjawab.",
        "Riwayat penyakit sekarang": [
          "ISPA 5 hari, lalu otalgia, demam, pendengaran turun.",
          "Belum ada otore, bengkak mastoid, vertigo, atau wajah mencong."
        ],
        "Faktor risiko": [
          "Paparan asap rokok dan ISPA berulang."
        ],
        "Sikap aktor": "Rewel dan memegang telinga."
      }
    },
    {
      "id": "epistaxis",
      "title": "Mimisan anterior setelah mengorek hidung",
      "diagnosis": "Epistaksis anterior",
      "prompt": "Remaja 16 tahun mengalami perdarahan dari lubang hidung kiri setelah mengorek hidung.",
      "patient": {
        "Identitas dan pembuka": "An. Aldi, 16 tahun. \"Hidung berdarah setelah saya korek.\"",
        "Riwayat penyakit sekarang": [
          "Darah keluar dari depan selama 10 menit.",
          "Tidak dominan ke tenggorok dan tanpa trauma kepala.",
          "Tidak ada antikoagulan, mudah memar, atau hipertensi."
        ],
        "Faktor risiko": [
          "Udara kering dan kebiasaan mengorek hidung."
        ],
        "Sikap aktor": "Cemas sambil memegang hidung."
      }
    }
  ],
  "radiologi": [
    {
      "id": "cxr-pneumonia",
      "title": "CXR konsolidasi pneumonia",
      "diagnosis": "Pneumonia lobaris",
      "prompt": "Pasien demam, batuk produktif, dan sesak. Interpretasikan foto toraks PA-lateral secara sistematis.",
      "patient": {
        "Peran pasien": "Tidak ada aktor aktif. Bila ditanya: demam 3 hari, dahak purulen, nyeri pleuritik kanan."
      }
    },
    {
      "id": "cxr-tb",
      "title": "CXR kavitas apeks suspek TB",
      "diagnosis": "Tuberkulosis paru",
      "prompt": "Pasien batuk lebih dari dua minggu, keringat malam, dan BB turun. Interpretasikan foto toraks.",
      "patient": {
        "Peran pasien": "Tidak ada aktor aktif. Bila ditanya: batuk 4 minggu, demam sore, keringat malam."
      }
    },
    {
      "id": "cxr-pneumothorax",
      "title": "CXR pneumotoraks",
      "diagnosis": "Pneumotoraks",
      "prompt": "Pasien mengalami nyeri dada dan sesak mendadak. Interpretasikan foto toraks.",
      "patient": {
        "Peran pasien": "Tidak ada aktor aktif. Bila ditanya: nyeri pleuritik, sesak, suara napas satu sisi turun."
      }
    },
    {
      "id": "cxr-hf",
      "title": "CXR edema paru kardiogenik",
      "diagnosis": "Gagal jantung dengan edema paru",
      "prompt": "Pasien sesak, orthopnea, dan edema tungkai. Interpretasikan foto toraks.",
      "patient": {
        "Peran pasien": "Tidak ada aktor aktif. Bila ditanya: orthopnea, PND, edema, hipertensi."
      }
    }
  ],
  "airway-management": [
    {
      "id": "polytrauma",
      "title": "Politrauma dengan obstruksi jalan napas",
      "diagnosis": "Indikasi intubasi pada trauma kepala",
      "prompt": "Laki-laki 23 tahun pascakecelakaan tidak sadar, helm retak, napas gasping, gurgling, dan darah keluar dari mulut serta hidung. TD 90/40, nadi 130, RR 30.",
      "patient": {
        "Peran pasien/manikin": "Tidak sadar, GCS <8, tidak merespons perintah.",
        "Temuan awal": [
          "Gurgling dan darah di orofaring.",
          "Napas cepat dangkal, hipotensi, takikardi.",
          "Kemungkinan cedera servikal."
        ],
        "Respons simulasi": [
          "Saturasi membaik setelah suction dan ventilasi BVM efektif."
        ]
      }
    }
  ]
};
