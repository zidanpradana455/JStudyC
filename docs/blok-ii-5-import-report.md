# Hasil penerbitan Blok II.5 — 29 Oktober 2026

397 soal baru telah masuk ke bank soal proyek; total 476 soal. Deployment hosting terpisah dari verifikasi lokal ini.
Acromion = Reguler 2023; Lakrawiyasa = IUP 2023, berdasarkan konfirmasi pengguna. Nama dokumen sumber tidak diubah.
Cumex 1: 79 soal lama tidak berubah. Cumex 2: 215 soal baru. UAS: 182 soal baru.
Tambahan terakhir: 81 rekonstruksi dan 19 soal pengganti berlabel. Tersisa 0 soal ditahan.
Terdapat 352 kunci yang ditentukan AI dan 45 adaptasi dengan penanda kunci eksplisit di sumber.
Seluruh adaptasi AI dan penambahan rincian klinis tercatat; hasil ini tidak dinyatakan sudah ditelaah pakar.

## Verifikasi

- Dua belas uji integrasi lulus: hitung sumber, idempotensi, perlindungan isi soal lama, lecture, gambar, konflik, metadata rekonstruksi, dan migrasi angkatan.
- Uji browser lulus pada 12 paket, sembilan gambar, 81 rekonstruksi, 19 pengganti, pemetaan progres lama, penyimpanan ulang progres, dan tampilan lebar 390 piksel. Hasil tersimpan di tmp/blok2.5/browser/result.json.
- Autentikasi dan progres dimock pada uji browser; tidak ada penulisan ke Supabase saat pengujian.
- Nomor sumber dipertahankan, termasuk nomor kosong yang kini diberi soal pengganti berlabel; tidak ada klaim bahwa redaksi aslinya telah dipulihkan.
- Penambahan soal tidak menggeser jawaban lama: progres rilis 297 soal dipetakan ke identitas sumber dan jumlah soal dashboard diperbarui.
- Empat tautan arsip lama diarahkan ke paket 2023; progres lama dibaca sebagai fallback, urutan opsi tetap sama, dan dashboard menghindari hitungan ganda.
- Enam gambar yang sudah hilang pada bank lama tetap belum tersedia karena 79 soal lama dipertahankan.

## Perintah untuk mengulang

Jalankan dari folder JStudyC:

```powershell
node scripts/import-soal-blok2.5.mjs --dry-run
node scripts/import-soal-blok2.5.mjs --apply
node scripts/import-soal-blok2.5.mjs --verify --write-report
node scripts/test-import-soal-blok2.5.mjs
node scripts/smoke-blok-ii-5.cjs
```
PyMuPDF dan Pillow diperlukan hanya untuk ekstraksi ulang. Corpus, staging, backup bank lama, dan dependensi sementara ada di tmp/blok2.5 dan diabaikan Git.
Python bawaan tersedia di $env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe.

---
# Blok II.5 — laporan impor

Status: 397 siap; 0 ditahan; 79 soal lama dipertahankan.
Posisi nomor sumber: 477. Jumlah termasuk #20 kosong dan dua #1 pada source_04.
Semua file merupakan rekap ujian; tidak ada materi kuliah terpisah dalam ZIP. Overview berisi 48 judul.
Pemetaan dikonfirmasi pengguna: Acromion = Reguler 2023; Lakrawiyasa = IUP 2023. Nama dokumen asli tetap tersimpan sebagai sumber.
Tautan dan progres dengan nama arsip lama tetap dikenali melalui alias paket; kartu dashboard memakai kelas dan tahun yang benar.

| Sumber | Ujian | Posisi | Siap | Cakupan lama | Ditahan |
|---|---|---:|---:|---:|---:|
| source_01:cumex-1: Cumulative Exam 1 II.5 | cumex-1 | 18 | 0 | 18 | 0 |
| source_02:uas: Final Examination II.5 | uas | 47 | 47 | 0 | 0 |
| source_03:cumex-2: Cumulative Exam 2 II.5 | cumex-2 | 48 | 48 | 0 | 0 |
| source_04:cumex-1: Rekap cumex 1 blok II.5 PD IUP 2022.pdf | cumex-1 | 21 | 0 | 21 | 0 |
| source_05:uas: REKAP UAS II.5 LAKRAWIYASA.pdf | uas | 46 | 46 | 0 | 0 |
| source_06:cumex-2: Recap Cumex 2 blok II.5  PD IUP 2022.pdf | cumex-2 | 55 | 55 | 0 | 0 |
| source_07:uas: Recap uas ii.5.pdf | uas | 47 | 47 | 0 | 0 |
| source_08:cumex-1: Recap cumex 1 & 2 (B2.5 & B2.4) 2021.pdf | cumex-1 | 21 | 0 | 21 | 0 |
| source_08:cumex-2: Recap cumex 1 & 2 (B2.5 & B2.4) 2021.pdf | cumex-2 | 38 | 38 | 0 | 0 |
| source_08:uas: Recap cumex 1 & 2 (B2.5 & B2.4) 2021.pdf | uas | 42 | 42 | 0 | 0 |
| source_09:cumex-1: REKAP CUMEX 1 BII.5 IUP 23.pdf | cumex-1 | 20 | 0 | 20 | 0 |
| source_10:cumex-2: REKAP CUMEX 2 BII.5 LAKRAWIYASA.pdf | cumex-2 | 74 | 74 | 0 | 0 |

## Paket setelah koreksi angkatan

| Ujian | Kelas | Tahun | Soal tambahan |
|---|---|---|---:|
| UAS | Reguler | 2023 | 47 |
| Cumex 2 | Reguler | 2023 | 48 |
| UAS | IUP | 2023 | 46 |
| Cumex 2 | IUP | 2022 | 55 |
| UAS | IUP | 2022 | 47 |
| Cumex 2 | IUP | 2021 | 38 |
| UAS | IUP | 2021 | 42 |
| Cumex 2 | IUP | 2023 | 74 |

## Distribusi lecture baru

- Diabetes mellitus and dyslipidemia medications: 19
- Urine Albumin: 3
- Isolation and identification of anaerobic bacteria (gas gangrene, botulism). Flipped class (video & expert lecture): 16
- Differential diagnose, working diagnose and management of Incontinence (including neurological urinary problems): 12
- Pathophysiology, Differential diagnosis, working diagnosis and management of Filariasis: 9
- Filarial nematodes (Non-lymphatic filariasis): 12
- Pathophysiology, differential diagnose, working diagnosis and management of vascular disease and mechanism of cardiac dysfunction: 13
- Diabetes insipidus/ SIADH: 11
- Pathophysiology, differential diagnosis, working diagnosis and management of hypertension in children (including hypertensive crisis): 8
- Epidemiology and health policy on metabolic disorders: 10
- Respiratory Failure 1: 11
- Uro Genital Tract Infection in pregnancy (include STD/PID during pregnancy): 9
- Pathology of kidney and urinary tract disorders: 10
- Upper and lower urinary tract infection: 8
- Differential diagnosis, working diagnosis and management of diabetes mellitus & hypoglycemia in adult: 8
- Cushing Syndrome: 14
- Pathophysiology of glomerulonephritis and nephrotic syndrome in children and adult: 8
- Differential diagnosis, working diagnosis and management of hyperglycemia (diabetic ketoacidosis included) & hypoglycemia in children: 12
- Congenital hypothyroidism and neonatal mass screening: 12
- Metabolic syndrome in children and adult: 5
- Differential diagnose, working diagnose and management of Polyuria: 6
- Physiology, Pathophysiology, differential diagnose, working diagnose and management of oedema in children and adult: 6
- Type 1 diabetes mellitus and diabetic ketoacidosis: 10
- Fluid Resuscitation: 7
- Pathophysiology, Differential diagnosis, working diagnosis and management in hypothyroid and hyperthyroid: 10
- Disorder of Calcium, Vitamin D and Parathyroid Hormone Metabolism: 12
- Laboratory Examination And Interpretation For Acute and Chronic Renal failure: 4
- Oxidative stress biomarkers in metabolic syndrome (Malondialdehyde): 10
- Micronutrient deficiency: 9
- Management of Metabolic Disease Emergency (uremic syndrome, uremic encephalopathy): 10
- Complication of Diabetes (including ulcer): 8
- Microbiological Examination of Urinary Tract Infections: 8
- Cold Pressure Test for hypertension prediction: 10
- Management Oedema in Emergency: 3
- Pathophysiology, differential diagnosis, working diagnosis and management of hypertension in adult (including hypertensive crisis): 6
- Etio-pathogenesis, differential diagnose, working diagnose and management of urinary stone disease: 8
- Acid Base Disorders: 10
- Pathophysiology, differential diagnosis, working diagnosis and management of atherosclerosis: 6
- Hyperglycaemic hyperosmolar non-ketotic syndrome (HHNS): 5
- Obesity in children and adult: 7
- Glucose Test (GOD-PAP Method), Glucose Challenge Test, Oral Glucose Tolerance Test, Ketone Bodies –Rothera’s Test, HbA1c Test: 7
- Differential diagnose, working diagnose and management of Renal Disorders in childhood: 5
- Iodine Deficiency Disorders (Gangguan akibat kekurangan Iodium, GAKY): 5
- Differential diagnose, working diagnose and management of micturition problem, prostatic disease and lower urinary tract symptoms: 5
- Differential diagnose, working diagnose and management of Acute and Chronic renal failure: 9
- Kidney, ovary and thyroid: 1

## Catatan sumber dan adaptasi

- Seluruh adaptasi baru ditulis/diperiksa AI, bukan dinyatakan telah ditelaah pakar medis.
- Audit JSON menyimpan nomor dan halaman, batang sumber, opsi terbaca, asal kunci, serta catatan perubahan setiap soal.
- Source_04 memakai #1 dua kali dan #20 kosong. Seluruh bank lama 2022 dipertahankan; nomor tidak diam-diam direkonsiliasi.
- Source_10 #16 memuat jawaban tersalin tentang sintesis tiroid; adaptasi memakai latihan dasar panggul.
- Source_10 #30 memberi kunci paru untuk ensefalopati uremik; adaptasi memakai otak.
- Source_10 #33 memberi fibrat pada TG 450 dan LDL 160; adaptasi menilai prioritas risiko ASCVD/statin.
- Source_10 #52 menyebut ACR 256 sebagai makroalbuminuria; adaptasi memakai A2.
- Foto ulkus tidak membuktikan perfusi; skenario adaptasi menyatakan temuan perfusi sebagai informasi tambahan.
- Soal gagal napas, PTH, dan glukosa yang tumpang tindih ditelusuri per nomor; duplikasi konsep pada sumber tidak menghapus nomor.
- Rincian kasus dan opsi adaptasi dapat berbeda dari redaksi asli; batang asli tetap tersedia dalam audit.json.
- Rekonstruksi disetujui pengguna: 81 adaptasi dan 19 soal pengganti; bukan klaim pemulihan redaksi asli. Label terlihat di halaman kuis.
- Source_07 #4 membedakan analog kerja cepat lispro dari insulin regular kerja pendek.

## Enam rujukan gambar lama yang tetap belum tersedia

- Cumex 1 Blok II.5 Reguler 2023 #3: cumex1_blok2.5_2023reg_q3.jpg
- Cumex 1 Blok II.5 Reguler 2023 #14: cumex1_blok2.5_2023reg_q14.jpg
- Cumex 1 Blok II.5 IUP 2021 #9: cumex1_blok2.5_2021_q9.jpg
- Cumex 1 Blok II.5 IUP 2022 #30: cumex1_blok2.5_2022_q30.jpg
- Cumex 1 Blok II.5 IUP 2023 #44: cumex1_blok2.5_2023_q44.jpg
- Cumex 1 Blok II.5 IUP 2023 #58: cumex1_blok2.5_2023_q58.jpg

## Gambar siap

- source_02:uas:8:1: assets/questions/blok2.5-import/final_examination_ii.5_q8.jpg
- source_02:uas:12:1: assets/questions/blok2.5-import/final_examination_ii.5_q12.jpg
- source_03:cumex-2:14:1: assets/questions/blok2.5-import/cumulative_exam2_ii.5_q14.jpg
- source_03:cumex-2:15:1: assets/questions/blok2.5-import/cumulative_exam2_ii.5_q15.jpg
- source_06:cumex-2:20:1: assets/questions/blok2.5-import/recap_cumex2_ii.5_iup_2022_q20.jpg
- source_06:cumex-2:35:1: assets/questions/blok2.5-import/recap_cumex2_ii.5_iup_2022_q35.jpg
- source_06:cumex-2:52:1: assets/questions/blok2.5-import/recap_cumex2_ii.5_iup_2022_q52.jpg
- source_10:cumex-2:28:1: assets/questions/blok2.5-import/rekap_cumex2_bii.5_lakrawiyasa_q28.jpg
- source_10:cumex-2:68:1: assets/questions/blok2.5-import/rekap_cumex2_bii.5_lakrawiyasa_q68.jpg

## Ditahan — informasi sumber belum memadai

Tidak ada lagi nomor baru yang ditahan. Nomor kosong atau gambar tidak dapat dipulihkan diisi soal pengganti berlabel.

## Rekonstruksi dan soal pengganti

- source_02:uas:16:1 — REKONSTRUKSI: Gambar yang meragukan diganti data genetik dan deskripsi USG sintetis; riwayat ayah gagal ginjal saja tidak dianggap diagnostik. Masalah asli: USG tampak dilatasi pelvikalises; riwayat ayah gagal ginjal tidak cukup menetapkan ADPKD
- source_02:uas:17:1 — REKONSTRUKSI: Gejala lokal, piuria, kultur dan temuan negatif ditambahkan untuk membedakan sumber hematuria. Masalah asli: Opsi dan konteks asal hematuria tidak lengkap
- source_02:uas:22:1 — REKONSTRUKSI: Fokus infeksi, usia kehamilan, kultur dan alergi diperjelas; pilihan sefalosporin ganda dihilangkan. Masalah asli: Fokus infeksi tidak disebut; dua sefalosporin dapat sama-sama sesuai
- source_02:uas:26:1 — REKONSTRUKSI: Stem diubah menjadi eksperimen sel untuk menghindari klaim klinis SCFA yang terlalu luas; opsi mekanisme diperbaiki. Masalah asli: Mekanisme SCFA tidak memiliki opsi paling tepat yang dapat dipastikan dari catatan
- source_02:uas:44:1 — PENGGANTI: Gambar kultur tidak tersedia; dibuat soal pengganti dengan hasil kultur dan biokimia sintetis, bukan deskripsi gambar asli. Masalah asli: Gambar kultur MacConkey tidak tersedia; interpretasi tidak dapat dipastikan
- source_03:cumex-2:2:1 — PENGGANTI: Gambar potongan cacing yang tidak dapat diidentifikasi diganti kasus tekstual spesies yang dapat dibedakan. Masalah asli: Gambar potongan filaria dari parasitologi veteriner tidak cukup memastikan spesies manusia tanpa konteks tambahan
- source_03:cumex-2:7:1 — REKONSTRUKSI: Tujuan pemeriksaan dibatasi pada dislipidemia; profil lipid tidak dinyatakan sebagai satu-satunya pemeriksaan hipertensi. Masalah asli: Pemeriksaan awal hipertensi tidak memiliki satu jawaban unik tanpa tujuan evaluasi
- source_03:cumex-2:9:1 — PENGGANTI: Urografi yang lateralisasinya bertentangan diganti deskripsi CT sintetis dengan lokasi pasti. Masalah asli: Lateralisasi nyeri kiri bertentangan dengan citra yang juga dipakai sebagai obstruksi kanan pada sumber lain
- source_03:cumex-2:32:1 — REKONSTRUKSI: Riwayat obat oral dan mekanisme ditambahkan untuk membedakan sulfonilurea dari insulin. Masalah asli: Insulin dan sulfonilurea sama-sama benar; tidak ada riwayat obat untuk membedakan
- source_03:cumex-2:42:1 — REKONSTRUKSI: Percobaan Pavlov dialihkan ke isyarat makan dalam perilaku obesitas agar relevan dengan lecture; bukan kasus klinis asli. Masalah asli: Percobaan Pavlov tidak dapat dipetakan secara bermakna ke lecture overview Blok II.5
- source_03:cumex-2:44:1 — REKONSTRUKSI: Pertanyaan pelayanan keluarga yang tidak sesuai opsi diganti tujuan pemeriksaan limfatik sesuai pilihan sumber. Masalah asli: Batang soal pelayanan keluarga tidak sesuai opsi pemeriksaan limfatik
- source_05:uas:4:1 — REKONSTRUKSI: Hubungan langsung konsumsi karbohidrat dengan MDA diperbaiki menjadi interpretasi biomarker stres oksidatif. Masalah asli: Batang soal karbohidrat berlebih tidak menjelaskan proses yang ditanyakan
- source_05:uas:6:1 — REKONSTRUKSI: Temuan EKG yang sudah tertulis dipertahankan; gejala iskemia dan perubahan resiprokal ditambahkan sehingga tidak membutuhkan gambar hilang. Masalah asli: EKG yang dirujuk tidak disertakan dalam sumber
- source_05:uas:11:1 — REKONSTRUKSI: CKD dan profil kalsium-fosfat ditambahkan; tanda tetani tidak digunakan untuk menebak etiologi sendirian. Masalah asli: Tanda hipokalsemia tidak cukup membedakan etiologi; opsi tidak memuat diagnosis sindrom
- source_05:uas:19:1 — REKONSTRUKSI: Usia dan pedoman ditentukan; kategori tekanan darah meningkat ditambahkan menggantikan opsi yang tidak lengkap. Masalah asli: Usia dan jenis kelamin anak tidak disebut; tabel tekanan darah tidak cukup untuk klasifikasi
- source_05:uas:22:1 — REKONSTRUKSI: Riwayat efek samping dan golongan yang dituju ditambahkan; osteoartritis saja tidak menentukan pilihan antihipertensi. Masalah asli: Beberapa antihipertensi dapat sesuai; osteoartritis tidak menentukan pilihan tunggal
- source_05:uas:27:1 — REKONSTRUKSI: Gambar yang hilang diganti laporan USG sintetis dan data kebocoran plasma; label derajat sumber yang tidak konsisten dihapus. Masalah asli: Foto toraks dengue yang dirujuk tidak terdapat dalam sumber
- source_05:uas:34:1 — REKONSTRUKSI: Data KAD dan deskripsi pola napas dilengkapi; opsi duplikat dihapus. Masalah asli: Batang soal dan opsi pola napas rusak; maksud indikator KAD belum pasti
- source_05:uas:35:1 — REKONSTRUKSI: Data kultur ditambahkan karena nitrit tidak membedakan E. coli dari Proteus; asal leukosit esterase diperjelas. Masalah asli: E. coli dan Proteus sama-sama dapat memberi nitrit positif; tidak ada data pembeda
- source_05:uas:37:1 — REKONSTRUKSI: Komposisi batu, pH dan kultur ditambahkan agar mekanisme struvit pasti; tidak mengandalkan gambar. Masalah asli: Gambar staghorn yang dirujuk tidak terdapat dalam sumber
- source_05:uas:38:1 — REKONSTRUKSI: Durasi, faktor risiko dan USG ditambahkan untuk memilih satu diagnosis banding elephantiasis. Masalah asli: Beberapa pilihan termasuk diagnosis banding elephantiasis; tidak ada skenario pembeda
- source_05:uas:39:1 — REKONSTRUKSI: Konteks asupan dan pengecualian penyebab ditambahkan; pemberian dekstrosa 40 persen yang tidak jelas rutenya tidak dipertahankan. Masalah asli: Hipoglikemia prematur multifaktorial; opsi tidak cukup membedakan mekanisme
- source_05:uas:40:1 — PENGGANTI: Gambar agar hilang diganti deskripsi hasil kultur sintetis; tidak semua kultur polimikroba otomatis dianggap kontaminasi. Masalah asli: Gambar agar darah tidak disertakan; tidak dapat membaca pola pertumbuhan
- source_06:cumex-2:2:1 — REKONSTRUKSI: Paparan dan pola neurologis ditambahkan agar bukan sekadar pilihan paralysis yang terlalu umum. Masalah asli: Batang menanyakan pembeda paling khas botulisme tanpa konteks klinis cukup
- source_06:cumex-2:6:1 — REKONSTRUKSI: Variabel analitik yang jelas ditambahkan; tidak mengklaim garam empedu atau pemanasan sebagai penyebab tanpa prosedur sumber. Masalah asli: Pertanyaan interferensi Biuret tidak menjelaskan metode atau kondisi reaksi
- source_06:cumex-2:7:1 — REKONSTRUKSI: Pertanyaan kausal yang tidak didukung diubah menjadi interpretasi hubungan risiko berdasarkan kurva BMI. Masalah asli: Mekanisme early adiposity rebound tidak dapat dipastikan dari opsi yang tidak lengkap
- source_06:cumex-2:8:1 — REKONSTRUKSI: Aterosklerosis dihubungkan dengan gagal ventrikel kiri; tidak dianggap langsung menaikkan tekanan semua kapiler. Masalah asli: Aterosklerosis saja tidak menentukan perubahan Starling tanpa gagal jantung atau obstruksi vena
- source_06:cumex-2:9:1 — REKONSTRUKSI: Derajat, konfirmasi dan ketiadaan kerusakan organ ditambahkan untuk menetapkan langkah awal. Masalah asli: Derajat dan konfirmasi hipertensi anak tidak diberikan untuk keputusan obat
- source_06:cumex-2:10:1 — REKONSTRUKSI: Satuan dosis yang hilang tidak ditebak; soal menilai prinsip titrasi dan pemantauan pada hipertensi emergensi. Masalah asli: Titrasi nikardipin tidak mencantumkan satuan dosis dan target penurunan tekanan darah
- source_06:cumex-2:15:1 — REKONSTRUKSI: Pertanyaan dibatasi pada pengambilan sampel sebelum terapi, bukan pilihan antara kultur dan terapi seolah saling meniadakan. Masalah asli: Perlu membedakan langkah pengambilan kultur dan terapi empiris; derajat ISK tidak disebut
- source_06:cumex-2:18:1 — REKONSTRUKSI: Hubungan ventilasi-perfusi diperjelas; perubahan PaCO₂ atau frekuensi napas tidak diperlakukan sebagai penyebab utama. Masalah asli: Pilihan tidak memuat mekanisme V/Q atau shunt edema paru yang tepat
- source_06:cumex-2:21:1 — PENGGANTI: Mikrofilaria yang spesiesnya tidak pasti diganti diagnosis dan sasaran terapi sintetis; tidak memberi regimen universal. Masalah asli: Spesies gambar mikrofilaria dan regimen tidak dapat dipastikan; Loa loa tidak memiliki Wolbachia
- source_06:cumex-2:28:1 — REKONSTRUKSI: Hasil duplex dan ketidaksesuaian ablasi ditambahkan agar terapi injeksi menjadi pilihan yang spesifik. Masalah asli: Opsi operasi varises tidak lengkap; anatomi refluks belum dijelaskan
- source_06:cumex-2:30:1 — REKONSTRUKSI: Riwayat litium, osmolalitas dan respons desmopresin ditambahkan; lokasi kerja ADH dikoreksi ke duktus kolektivus. Masalah asli: Patofisiologi poliuria tidak menyebut diagnosis atau data pembeda
- source_06:cumex-2:36:1 — REKONSTRUKSI: Berat badan, kesadaran dan konsentrasi glukosa ditambahkan sehingga jumlah karbohidrat dapat dihitung. Masalah asli: Dosis terapi hipoglikemia anak tidak dapat dipastikan tanpa usia, berat, kesadaran, dan jumlah karbohidrat
- source_06:cumex-2:41:1 — REKONSTRUKSI: Opsi sumber yang semuanya bermasalah diganti pernyataan patogenesis yang dapat dinilai dengan kasus histologi. Masalah asli: Tidak ada satu pernyataan benar yang dapat dipastikan dari pilihan rusak
- source_06:cumex-2:55:1 — PENGGANTI: Nomor asli kosong; dibuat soal pengganti tentang AKI dari lingkup Blok II.5. Topik asli nomor ini tidak diketahui. Masalah asli: Nomor 55 kosong dalam dokumen sumber
- source_07:uas:1:1 — REKONSTRUKSI: Persentase kehilangan darah dan perfusi organ ditambahkan untuk membedakan kelas III dari IV. Masalah asli: Syok kelas III dan IV bertumpang tindih; data kehilangan darah atau respons mental tidak lengkap
- source_07:uas:3:1 — REKONSTRUKSI: Satuan, jenis sampel, protokol dan konteks ditentukan; hasil tidak dinyatakan membuktikan eutiroid definitif. Masalah asli: Jenis spesimen, satuan, usia, dan protokol cutoff TSH tidak lengkap
- source_07:uas:11:1 — PENGGANTI: Gambar urogram yang tidak pasti diganti laporan CT sintetis; lateralisasi tidak ditebak dari gambar sumber. Masalah asli: Lateralisasi dan batu pada foto urografi tidak cukup jelas untuk kunci tunggal
- source_07:uas:12:1 — REKONSTRUKSI: Pertanyaan lokasi organ yang menyesatkan diganti penilaian keterbatasan biomarker. Masalah asli: MDA tidak memiliki satu organ lokasi spesifik; pertanyaan tidak lengkap
- source_07:uas:15:1 — REKONSTRUKSI: Pedoman dan konfirmasi pengukuran dinyatakan agar istilah prehipertensi versus hipertensi tidak ambigu. Masalah asli: Klasifikasi tekanan darah berbeda antar pedoman; angka juga ditandai ragu oleh sumber
- source_07:uas:20:1 — REKONSTRUKSI: Usia, lokasi infeksi dan kultur ditambahkan; rute sefiksim intravena yang keliru di sumber dihapus. Masalah asli: Rute cefixime IV keliru dan durasi tergantung demam serta lokasi infeksi; informasi tidak cukup
- source_07:uas:23:1 — PENGGANTI: Fragmen regulasi tanpa nomor atau isi tidak direka; dibuat pengganti tentang fungsi pelayanan primer pada gangguan metabolik. Masalah asli: Pertanyaan regulasi PHC tidak menyebut regulasi atau tujuan yang dinilai
- source_07:uas:24:1 — REKONSTRUKSI: Jenis kelamin, etnis, seluruh nilai dan kerangka kriteria ditambahkan; tidak lagi memilih beberapa komponen yang sama-sama benar. Masalah asli: Beberapa opsi adalah komponen sindrom metabolik; tidak ada skenario atau jenis kelamin
- source_07:uas:25:1 — REKONSTRUKSI: Jenis epilepsi diperjelas; sasaran soal diubah ke aksi ACTH yang relevan dengan lecture Cushing, bukan terapi semua epilepsi. Masalah asli: ACTH digunakan pada kondisi epilepsi tertentu, bukan seluruh epilepsi; stem tidak cukup
- source_07:uas:26:1 — PENGGANTI: Nomor asli kosong; dibuat soal pengganti tentang kegawatan metabolik anak. Topik asli nomor ini tidak diketahui. Masalah asli: Nomor 26 kosong dalam sumber
- source_07:uas:30:1 — REKONSTRUKSI: Derajat hiperglikemia dan keadaan klinis ditambahkan; rujukan tidak meniadakan stabilisasi bila diperlukan. Masalah asli: Derajat hiperglikemia dan kegawatan anak tidak disebut untuk menentukan tindakan aman
- source_07:uas:31:1 — REKONSTRUKSI: Fragmen morfologi diganti deskripsi tekstual diagnostik; tidak mengklaim pemulihan gambar asli. Masalah asli: Pilihan morfologi mikrofilaria terpotong dan tidak ada spesies yang dimaksud
- source_07:uas:32:1 — PENGGANTI: USG asli tidak menetapkan tahap embriologi; dibuat kasus baru dengan agenesis bilateral eksplisit. Masalah asli: USG dan oligohidramnion tidak menentukan tahap embriologi tunggal
- source_07:uas:34:1 — REKONSTRUKSI: Status infeksi dan perfusi ditambahkan agar pilihan tidak bergantung pada warna hitam saja. Masalah asli: Ulkus gangren memerlukan penilaian perfusi dan infeksi sebelum debridement atau revaskularisasi
- source_07:uas:38:1 — REKONSTRUKSI: Karakter nodul dan MRI ditambahkan; PSA meningkat saja tidak dianggap konfirmasi kanker. Masalah asli: Pembesaran prostat dan PSA saja tidak membedakan BPH dengan keganasan secara pasti
- source_07:uas:39:1 — REKONSTRUKSI: Fragmen penggunaan steroid dilengkapi gejala dan pertanyaan etiologi. Masalah asli: Stem penggunaan glukokortikoid tidak memuat pertanyaan
- source_07:uas:44:1 — REKONSTRUKSI: Data lima bulan dan USG ditambahkan; durasi edema sebulan saja tidak dipakai menetapkan CKD. Masalah asli: Durasi sebulan tidak memenuhi kronisitas CKD; data pembeda AKI dan CKD kurang
- source_07:uas:46:1 — REKONSTRUKSI: Profil kalsium-fosfat-PTH ditambahkan; nyeri dan osteoporosis saja tidak dianggap menentukan gangguan paratiroid. Masalah asli: Nyeri tungkai dan osteoporosis tidak menetapkan gangguan paratiroid; data kalsium tidak ada
- source_08:cumex-2:1:1 — REKONSTRUKSI: Data analisis batu ditambahkan; radiopak saja tidak dipakai membedakan kalsium fosfat dari struvit. Masalah asli: Kalsium fosfat dan struvit dapat radiopak; opsi lebih dari satu benar
- source_08:cumex-2:2:1 — REKONSTRUKSI: Jenis diabetes dan kekurangan insulin diperjelas untuk menghindari pencampuran efek insulin dengan efek diabetes. Masalah asli: Efek insulin dan diabetes bercampur tanpa pertanyaan klinis yang jelas
- source_08:cumex-2:3:1 — REKONSTRUKSI: Penyebab, asidosis dan kelayakan NIV ditambahkan; terapi tidak ditentukan dari hiperkapnia saja. Masalah asli: Terapi gagal napas hiperkapnik bergantung penyebab dan tingkat kegawatan
- source_08:cumex-2:5:1 — REKONSTRUKSI: Sindrom nefrotik dan albumin ditambahkan; jenis pitting tidak dianggap menentukan mekanisme tunggal. Masalah asli: Mekanisme edema yang diberikan tidak menentukan pitting versus nonpitting secara unik
- source_08:cumex-2:6:1 — REKONSTRUKSI: Istilah biomarker nonenzimatik yang terpotong diperjelas sebagai produk kerusakan lipid. Masalah asli: Konteks biomarker nonenzimatik tidak lengkap
- source_08:cumex-2:11:1 — REKONSTRUKSI: Populasi, metode pengambilan, satu patogen dan satuan volume ditambahkan; ambang tidak digeneralisasi ke semua ISK. Masalah asli: Ambang kultur memerlukan metode pengambilan, gejala, dan volume inokulum
- source_08:cumex-2:26:1 — REKONSTRUKSI: Fase terapi, volume dan komorbid diperjelas; soal menilai tujuan cairan awal, bukan regimen lengkap. Masalah asli: Peran terapi HHS tidak menjelaskan fase atau status pasien
- source_08:cumex-2:30:1 — REKONSTRUKSI: Fragmen SCFA yang tidak menjelaskan proses diubah menjadi pertanyaan pembentukan SCFA. Masalah asli: Pertanyaan SCFA terpotong tanpa proses atau lokasi yang dimaksud
- source_08:cumex-2:31:1 — PENGGANTI: Peringkat Riskesdas yang tidak menyebut indikator diganti latihan epidemiologi dengan angka hipotetis, bukan data Riskesdas 2013. Masalah asli: Peringkat Riskesdas 2013 tidak menyebut indikator atau populasi
- source_08:cumex-2:33:1 — PENGGANTI: Gambar Wuchereria yang tidak tersedia diganti deskripsi morfologi tekstual sintetis. Masalah asli: Gambar Wuchereria yang dirujuk tidak disertakan pada bagian Blok II.5
- source_08:cumex-2:36:1 — REKONSTRUKSI: Onset dan hasil USG ditambahkan untuk membedakan DVT dari limfedema pada pasien kanker. Masalah asli: Kecurigaan DVT versus limfedema memerlukan data pembeda dan pemeriksaan
- source_08:uas:6:1 — REKONSTRUKSI: Daftar sayuran yang beberapa jawabannya benar diganti mekanisme goitrogen yang spesifik; tidak menyarankan menghindari semua sayuran. Masalah asli: Beberapa sayur pada pilihan sama-sama mengandung goitrogen
- source_08:uas:9:1 — REKONSTRUKSI: Lokasi lesi dan bukti retensi ditambahkan; cedera lumbar umum tidak langsung menentukan tipe inkontinensia. Masalah asli: Lesi lumbar tidak spesifik tanpa informasi pusat sakral dan retensi
- source_08:uas:11:1 — REKONSTRUKSI: Ambang dinyatakan sebagai protokol hipotetis latihan, bukan rentang normal universal. Masalah asli: Rentang respons normal cold pressor test tidak memiliki protokol jelas
- source_08:uas:12:1 — REKONSTRUKSI: Arah interferensi dan kerentanan metode dinyatakan; tidak menganggap semua metode bereaksi sama. Masalah asli: Interferensi Jaffe tidak memuat pertanyaan lengkap dan pilihan dapat berbeda arahnya
- source_08:uas:14:1 — REKONSTRUKSI: Kasus sumber yang tercampur dan dosis terpotong diganti skenario emergensi jelas tanpa menebak dosis anak. Masalah asli: Kasus hipertensi anak dan opsi dosis terpotong; tidak dapat menentukan obat aman
- source_08:uas:16:1 — REKONSTRUKSI: Tujuan pemeriksaan dibatasi pada kegawatan ketoasidosis; bukan sekadar mengulang diagnosis hiperglikemia. Masalah asli: Tujuan pemeriksaan anak hiperglikemia tidak jelas: diagnosis atau klasifikasi atau kegawatan
- source_08:uas:17:1 — REKONSTRUKSI: Usia, laju perubahan dan deskripsi slit-lamp ditambahkan; tidak mengklaim semua katarak diabetes mempunyai pola ini. Masalah asli: Lokasi kekeruhan lensa tidak dapat ditentukan dari stem yang tersedia
- source_08:uas:19:1 — REKONSTRUKSI: Hiperplasia yang tidak spesifik dilengkapi serologi dan gambaran histologi pembeda. Masalah asli: Gambaran histologi hiperplasia tiroid terpotong tanpa fitur diagnosis
- source_08:uas:25:1 — REKONSTRUKSI: Komplikasi, kegagalan obat, ukuran prostat dan kelayakan operasi ditambahkan; TURP tidak dinyatakan terapi semua BPH. Masalah asli: Terapi BPH memerlukan keparahan gejala dan komplikasi; tidak ada skenario
- source_08:uas:26:1 — PENGGANTI: Massa berambut yang tidak diagnostik diganti diagnosis spinal eksplisit; jawaban UPJ yang tidak didukung tidak dipertahankan. Masalah asli: Prematur dengan massa berambut dan distensi abdomen tidak cukup menetapkan obstruksi UPJ
- source_08:uas:27:1 — REKONSTRUKSI: Usia, status kehamilan dan ketiadaan tanda infeksi atas ditambahkan untuk menentukan rute terapi. Masalah asli: Nitrit positif saja tidak menetapkan rute antibiotik tanpa usia dan tanda infeksi
- source_08:uas:36:1 — REKONSTRUKSI: Nilai sewaktu dan 2 jam setelah makan yang konteksnya tidak jelas dihapus; fokus menjadi konfirmasi hasil puasa abnormal. Masalah asli: Glukosa puasa abnormal tetapi konteks konfirmasi dan gejala tidak jelas
- source_08:uas:37:1 — REKONSTRUKSI: Pilihan dan konteks alternatif ditambahkan; tidak dinyatakan sebagai larangan absolut untuk setiap keadaan. Masalah asli: Antibiotik yang dihindari pada trimester satu memerlukan opsi dan konteks pilihan
- source_08:uas:38:1 — PENGGANTI: Foto agar tidak tersedia; dibuat pengganti dengan deskripsi tekstual sintetis tanpa mengklaim identifikasi spesies dari zona saja. Masalah asli: Foto agar metronidazol yang dirujuk tidak tersedia
- source_08:uas:39:1 — REKONSTRUKSI: Usia, CKD, proteinuria dan kontraindikasi diperjelas agar pemilihan golongan spesifik dapat dipertanggungjawabkan. Masalah asli: Tekanan darah anak tidak dapat ditangani tanpa usia, ukuran tubuh, dan organ target
- source_08:uas:40:1 — PENGGANTI: Fragmen Riskesdas diganti pertanyaan metodologi survei; tidak mengarang rincian protokol resmi tertentu. Masalah asli: Pertanyaan Riskesdas tidak menyebut indikator dan jawaban yang diminta
- source_08:uas:42:1 — PENGGANTI: Metformin pada fragmen dikoreksi menjadi metronidazol; ditambahkan hasil aerotoleransi sintetis karena gambar asli tidak ada. Masalah asli: Foto hambatan pertumbuhan tidak tersedia; metformin kemungkinan salah tulis metronidazol
- source_10:cumex-2:5:1 — REKONSTRUKSI: Proteinuria dan kelayakan terapi ditambahkan; usia saja tidak menentukan ACE inhibitor. Masalah asli: Usia 18 tahun saja tidak menentukan obat antihipertensi tunggal tanpa komorbid
- source_10:cumex-2:6:1 — REKONSTRUKSI: Nama obat dan ketiadaan insulin ditambahkan untuk mengatasi kunci sumber yang menyebut dua golongan. Masalah asli: Kunci sumber menyebut insulin atau sulfonilurea; riwayat obat tidak ada untuk membedakan
- source_10:cumex-2:8:1 — PENGGANTI: Gambar perbandingan tanpa penunjuk target diganti deskripsi satu spesies sintetis yang dapat diidentifikasi. Masalah asli: Gambar membandingkan beberapa spesies; spesies target tidak ditunjuk secara jelas
- source_10:cumex-2:10:1 — REKONSTRUKSI: Bercak cokelat yang tidak spesifik diganti ciri hiperkortisolisme; kunci tidak bergantung pada lesi kulit yang belum jelas. Masalah asli: Bercak cokelat dan hipertensi tidak spesifik untuk Cushing; catatan mengakui kemungkinan NF1
- source_10:cumex-2:18:1 — REKONSTRUKSI: Prosedur ditentukan dan warna sudah diberikan; konflik kunci pale pink tidak dipertahankan sebagai fakta universal. Masalah asli: Warna reaksi aseton bergantung prosedur; kunci pale pink bertentangan dengan reaksi nitroprusida umum
- source_10:cumex-2:20:1 — REKONSTRUKSI: Fitur lesi dan ketiadaan organisasi ditambahkan; kunci sumber organized thrombus dikoreksi. Masalah asli: Plak ruptur dengan trombus tidak otomatis berarti trombus terorganisasi; fitur histologis kurang
- source_10:cumex-2:26:1 — PENGGANTI: Urografi tidak pasti diganti laporan CT sintetis; lokasi batu tidak ditentukan hanya dari letak nyeri. Masalah asli: Foto urografi tidak memperlihatkan batu dan lateralisasi secara meyakinkan; perlu telaah manual
- source_10:cumex-2:27:1 — REKONSTRUKSI: Ambang lama diganti konsensus yang disebut eksplisit; keton dan asidosis ditambahkan agar glukosa tidak dinilai sendirian. Masalah asli: Ambang glukosa KAD lama lebih dari 250 bukan syarat mutlak kini; stem tidak menyebut kriteria lain
- source_10:cumex-2:37:1 — REKONSTRUKSI: Riwayat kekambuhan, kultur dan selesainya terapi aktif ditambahkan; kunci cranberry tidak dianggap rekomendasi utama universal. Masalah asli: Kunci cranberry untuk profilaksis ISK kehamilan tidak dapat didukung sebagai jawaban terbaik tanpa riwayat kultur
- source_10:cumex-2:39:1 — REKONSTRUKSI: Foto bercak kulit yang tidak menentukan diagnosis diganti temuan klinis sintetis dan konfirmasi hiperkortisolisme. Masalah asli: Hipertensi dan bercak cokelat tanpa ciri klinis tambahan tidak menetapkan Cushing
- source_10:cumex-2:45:1 — REKONSTRUKSI: Istilah pusat osmoregulasi tunggal diganti lokasi sintesis vasopresin; kedua nukleus yang relevan digabung dalam satu opsi. Masalah asli: Osmoregulasi melibatkan beberapa nukleus dan area; pilihan tidak menyediakan pusat tunggal yang tepat
- source_10:cumex-2:46:1 — PENGGANTI: Batang sumber hanya tanda tanya; dibuat pengganti dari petunjuk opsi lifestyle dan metformin, bukan pemulihan kasus asli. Masalah asli: Nomor 46 tidak mempunyai batang soal, hanya tanda tanya
- source_10:cumex-2:48:1 — REKONSTRUKSI: Riwayat ibu dan penanda biokimia ditambahkan; kunci folat pada sumber dikoreksi. Masalah asli: B12 dan folat berbeda; etiologi bayi tidak dapat ditentukan tanpa riwayat ibu dan hasil laboratorium
- source_10:cumex-2:58:1 — REKONSTRUKSI: Tujuan evaluasi dinyatakan; profil lipid tidak lagi dipaksakan sebagai satu pemeriksaan utama semua hipertensi. Masalah asli: Pemeriksaan awal hipertensi bukan hanya profil lipid; tidak ada tujuan pembeda
- source_10:cumex-2:62:1 — REKONSTRUKSI: Fragmen bentuk memanjang dilengkapi lokasi duktus, pola radial dan keterlibatan hati. Masalah asli: Kelainan makroskopis ARPKD ditanyakan tidak lengkap dan opsi elongated tidak spesifik
- source_10:cumex-2:73:1 — REKONSTRUKSI: Normalnya ukuran tiroid diganti hasil uji fungsi setelah evaluasi terapi untuk membedakan transien dari permanen. Masalah asli: Ukuran tiroid normal setelah tiga tahun tidak membuktikan transien tanpa evaluasi penghentian terapi
- source_10:cumex-2:74:1 — REKONSTRUKSI: Istilah kejang-kejangan diperjelas menjadi deskripsi pemeriksaan asteriksis; tidak menganggap setiap kejang uremik adalah asteriksis. Masalah asli: Asteriksis berbeda dari kejang epileptik; deskripsi kejang-kejangan tidak dapat dipastikan

## Rujukan tambahan rekonstruksi

- [ACOG: Urinary Tract Infections in Pregnant Individuals](https://www.acog.org/clinical/clinical-guidance/clinical-consensus/articles/2023/08/urinary-tract-infections-in-pregnant-individuals) — Kultur, pielonefritis, bakteriuria asimtomatik dan pertimbangan supresi setelah ISK berulang.
- [NICE NG109: Lower UTI](https://www.nice.org.uk/guidance/ng109/chapter/Recommendations) — Pengambilan urine sebelum antibiotik dan terapi oral ISK bawah anak.
- [NICE NG224: UTI in under 16s](https://www.nice.org.uk/guidance/ng224/chapter/Recommendations) — Evaluasi ISK anak dan kekambuhan.
- [UKTIS: Trimethoprim in pregnancy](https://uktis.org/monographs/use-of-trimethoprim-in-pregnancy/) — Antagonisme folat dan pertimbangan penggunaan pada trimester pertama.
- [AAP: Pediatric hypertension guideline](https://publications.aap.org/pediatrics/article/140/3/e20171904/38358/Clinical-Practice-Guideline-for-Screening-and) — Kategori tekanan darah remaja, gaya hidup, indikasi obat dan penurunan tekanan darah terkontrol.
- [ACC/AHA 2025: High blood pressure guideline](https://www.ahajournals.org/doi/full/10.1161/CIR.0000000000001356) — Kategori tekanan darah dewasa; konteks pedoman disebut di batang soal.
- [NICE NG136: Hypertension in adults](https://www.nice.org.uk/guidance/ng136/chapter/Recommendations) — Evaluasi risiko kardiovaskular, fungsi ginjal, elektrolit dan albuminuria.
- [ADA/EASD: Hyperglycemic crises consensus 2024](https://diabetesjournals.org/care/article/47/8/1257/156811/Hyperglycemic-Crises-in-Adults-With-Diabetes-A) — Kriteria KAD dewasa, beta-hidroksibutirat dan prinsip cairan HHS.
- [ISPAD 2022: Hypoglycemia in children](https://pmc.ncbi.nlm.nih.gov/articles/PMC10107518/) — Glukosa oral sekitar 0,3 g/kg dan pemeriksaan ulang 15 menit pada anak sadar yang dapat menelan.
- [Diabetes UK: Diagnosing diabetes in children](https://www.diabetes.org.uk/for-professionals/improving-care/clinical-recommendations-for-professionals/specialist-care-for-children-and-adults-and-complications/diagnosis-children-young-people) — Rujukan hari yang sama pada dugaan DM tipe 1 anak.
- [Canadian Paediatric Society: Newborn hypoglycemia](https://cps.ca/en/documents/position/newborns-at-risk-for-low-blood-glucose) — Prematuritas dan hipoglikemia neonatal; penatalaksanaan bergantung kondisi dan rute pemberian.
- [CDC DPDx: Lymphatic filariasis](https://www.cdc.gov/dpdx/lymphaticfilariasis/) — Morfologi Wuchereria dan Brugia; gambar meragukan diganti deskripsi sintetis, bukan diidentifikasi paksa.
- [CDC: Treatment of lymphatic filariasis](https://www.cdc.gov/filarial-worms/hcp/clinical-care/index.html) — Peran doksisiklin terhadap Wolbachia pada filariasis tertentu.
- [CDC: Clinical overview of botulism](https://www.cdc.gov/botulism/hcp/clinical-overview/) — Palsi saraf kranial dan paralisis flaksid desenden.
- [NICE CG168: Varicose veins](https://www.nice.org.uk/guidance/cg168/resources/varicose-veins-diagnosis-and-management-pdf-35109698485957) — Skleroterapi busa bila ablasi endotermal tidak sesuai.
- [ERS/ATS: NIV in acute respiratory failure](https://www.thoracic.org/statements/resources/cc/niv-guidelines.pdf) — NIV bilevel untuk eksaserbasi PPOK dengan asidosis respiratorik pada pasien yang sesuai.
- [IWGDF 2023 guidelines](https://iwgdfguidelines.org/wp-content/uploads/2023/07/IWGDF-Guidelines-2023.pdf) — Evaluasi vaskular segera pada kaki diabetes dengan gangren dan iskemia berat.
- [ENDO-ERN/ESPE: Congenital hypothyroidism consensus](https://pmc.ncbi.nlm.nih.gov/articles/PMC8001676/) — Keterbatasan skrining dan evaluasi ulang fungsi tiroid untuk menentukan transien atau permanen.
- [IDF: Metabolic syndrome consensus](https://onlinelibrary.wiley.com/doi/10.1111/j.1464-5491.2006.01858.x) — Obesitas sentral dan komponen sindrom metabolik menurut kerangka IDF yang disebut eksplisit.
- [Tolhurst et al.: SCFA, FFAR2 and GLP-1](https://pmc.ncbi.nlm.nih.gov/articles/PMC3266401/) — Mekanisme eksperimental sekresi GLP-1, tanpa menganggapnya bukti terapi klinis individual.
- [Early Adiposity Rebound and Adult Obesity](https://publications.aap.org/pediatrics/article/101/3/e5/61923/Early-Adiposity-Rebound-and-the-Risk-of-Adult) — Adiposity rebound dini sebagai penanda risiko, bukan sebab tunggal atau kepastian obesitas.
- [NIDDK: Clinical measurements and eGFR accuracy](https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/factors-affecting-egfr-accuracy/clinical-measurements) — Interferensi metode Jaffe oleh protein dan bilirubin; pengaruh bergantung metode.
- [Bilirubin interference in Jaffe creatinine methods](https://pubmed.ncbi.nlm.nih.gov/27069333/) — Interferensi negatif bilirubin pada kit Jaffe yang diteliti.
- [CDC: Vitamin B12 and breastfeeding](https://www.cdc.gov/breastfeeding-special-circumstances/hcp/diet-micronutrients/vitamin-b12.html) — Risiko defisiensi B12 bayi ASI eksklusif bila ibu kekurangan B12.
- [NIDDK: Autosomal recessive PKD](https://www.niddk.nih.gov/health-information/kidney-disease/polycystic-kidney-disease/autosomal-recessive-pkd) — Keterlibatan ginjal dan hati pada ARPKD.
- [CDC: Dengue plasma leakage](https://www.cdc.gov/dengue/training/cme/ccm/Pathophysiology.pdf) — Peningkatan permeabilitas kapiler dan kebocoran plasma pada dengue.
- [AAO EyeWiki: Cataract](https://eyewiki.aao.org/Cataract) — Pola snowflake sebagai bentuk katarak diabetes usia muda yang tidak selalu ada.
- [Clinical Methods: Ketonuria](https://www.ncbi.nlm.nih.gov/books/NBK247/) — Reaksi nitroprusida dan keterbatasannya terhadap beta-hidroksibutirat.

## Kunci AI dan distraktor

- source_02:uas:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_02:uas:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_02:uas:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_02:uas:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_02:uas:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_02:uas:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar yang meragukan diganti data genetik dan deskripsi USG sintetis; riwayat ayah gagal ginjal saja tidak dianggap diagnostik. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gejala lokal, piuria, kultur dan temuan negatif ditambahkan untuk membedakan sumber hematuria. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fokus infeksi, usia kehamilan, kultur dan alergi diperjelas; pilihan sefalosporin ganda dihilangkan. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Stem diubah menjadi eksperimen sel untuk menghindari klaim klinis SCFA yang terlalu luas; opsi mekanisme diperbaiki. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:39:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:40:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:41:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:42:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:43:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:44:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar kultur tidak tersedia; dibuat soal pengganti dengan hasil kultur dan biokimia sintetis, bukan deskripsi gambar asli. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_02:uas:45:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_02:uas:46:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_02:uas:47:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar potongan cacing yang tidak dapat diidentifikasi diganti kasus tekstual spesies yang dapat dibedakan. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Tujuan pemeriksaan dibatasi pada dislipidemia; profil lipid tidak dinyatakan sebagai satu-satunya pemeriksaan hipertensi. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Urografi yang lateralisasinya bertentangan diganti deskripsi CT sintetis dengan lokasi pasti. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_03:cumex-2:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_03:cumex-2:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_03:cumex-2:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_03:cumex-2:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_03:cumex-2:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Riwayat obat oral dan mekanisme ditambahkan untuk membedakan sulfonilurea dari insulin. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_03:cumex-2:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:39:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:40:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_03:cumex-2:41:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:42:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Percobaan Pavlov dialihkan ke isyarat makan dalam perilaku obesitas agar relevan dengan lecture; bukan kasus klinis asli. Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_03:cumex-2:43:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:44:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Pertanyaan pelayanan keluarga yang tidak sesuai opsi diganti tujuan pemeriksaan limfatik sesuai pilihan sumber. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_03:cumex-2:45:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:46:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:47:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_03:cumex-2:48:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_05:uas:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Hubungan langsung konsumsi karbohidrat dengan MDA diperbaiki menjadi interpretasi biomarker stres oksidatif.
- source_05:uas:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Temuan EKG yang sudah tertulis dipertahankan; gejala iskemia dan perubahan resiprokal ditambahkan sehingga tidak membutuhkan gambar hilang.
- source_05:uas:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. CKD dan profil kalsium-fosfat ditambahkan; tanda tetani tidak digunakan untuk menebak etiologi sendirian. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_05:uas:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Usia dan pedoman ditentukan; kategori tekanan darah meningkat ditambahkan menggantikan opsi yang tidak lengkap.
- source_05:uas:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Riwayat efek samping dan golongan yang dituju ditambahkan; osteoartritis saja tidak menentukan pilihan antihipertensi.
- source_05:uas:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar yang hilang diganti laporan USG sintetis dan data kebocoran plasma; label derajat sumber yang tidak konsisten dihapus.
- source_05:uas:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Data KAD dan deskripsi pola napas dilengkapi; opsi duplikat dihapus.
- source_05:uas:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Data kultur ditambahkan karena nitrit tidak membedakan E. coli dari Proteus; asal leukosit esterase diperjelas.
- source_05:uas:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Komposisi batu, pH dan kultur ditambahkan agar mekanisme struvit pasti; tidak mengandalkan gambar.
- source_05:uas:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Durasi, faktor risiko dan USG ditambahkan untuk memilih satu diagnosis banding elephantiasis.
- source_05:uas:39:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Konteks asupan dan pengecualian penyebab ditambahkan; pemberian dekstrosa 40 persen yang tidak jelas rutenya tidak dipertahankan.
- source_05:uas:40:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar agar hilang diganti deskripsi hasil kultur sintetis; tidak semua kultur polimikroba otomatis dianggap kontaminasi.
- source_05:uas:41:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:42:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:43:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:44:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:45:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_05:uas:46:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_06:cumex-2:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Paparan dan pola neurologis ditambahkan agar bukan sekadar pilihan paralysis yang terlalu umum. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_06:cumex-2:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Variabel analitik yang jelas ditambahkan; tidak mengklaim garam empedu atau pemanasan sebagai penyebab tanpa prosedur sumber. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Pertanyaan kausal yang tidak didukung diubah menjadi interpretasi hubungan risiko berdasarkan kurva BMI. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Aterosklerosis dihubungkan dengan gagal ventrikel kiri; tidak dianggap langsung menaikkan tekanan semua kapiler. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Derajat, konfirmasi dan ketiadaan kerusakan organ ditambahkan untuk menetapkan langkah awal. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Satuan dosis yang hilang tidak ditebak; soal menilai prinsip titrasi dan pemantauan pada hipertensi emergensi. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Pertanyaan dibatasi pada pengambilan sampel sebelum terapi, bukan pilihan antara kultur dan terapi seolah saling meniadakan. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_06:cumex-2:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_06:cumex-2:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Hubungan ventilasi-perfusi diperjelas; perubahan PaCO₂ atau frekuensi napas tidak diperlakukan sebagai penyebab utama. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Mikrofilaria yang spesiesnya tidak pasti diganti diagnosis dan sasaran terapi sintetis; tidak memberi regimen universal. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_06:cumex-2:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_06:cumex-2:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_06:cumex-2:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_06:cumex-2:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Hasil duplex dan ketidaksesuaian ablasi ditambahkan agar terapi injeksi menjadi pilihan yang spesifik. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Riwayat litium, osmolalitas dan respons desmopresin ditambahkan; lokasi kerja ADH dikoreksi ke duktus kolektivus. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_06:cumex-2:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_06:cumex-2:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Berat badan, kesadaran dan konsentrasi glukosa ditambahkan sehingga jumlah karbohidrat dapat dihitung. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:39:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:40:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:41:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Opsi sumber yang semuanya bermasalah diganti pernyataan patogenesis yang dapat dinilai dengan kasus histologi. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_06:cumex-2:42:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:43:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:44:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:45:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_06:cumex-2:46:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:47:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:48:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:49:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:50:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_06:cumex-2:51:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_06:cumex-2:52:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:53:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_06:cumex-2:54:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_06:cumex-2:55:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Nomor asli kosong; dibuat soal pengganti tentang AKI dari lingkup Blok II.5. Topik asli nomor ini tidak diketahui. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_07:uas:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Persentase kehilangan darah dan perfusi organ ditambahkan untuk membedakan kelas III dari IV.
- source_07:uas:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_07:uas:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Satuan, jenis sampel, protokol dan konteks ditentukan; hasil tidak dinyatakan membuktikan eutiroid definitif. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_07:uas:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_07:uas:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_07:uas:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar urogram yang tidak pasti diganti laporan CT sintetis; lateralisasi tidak ditebak dari gambar sumber. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Pertanyaan lokasi organ yang menyesatkan diganti penilaian keterbatasan biomarker. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Pedoman dan konfirmasi pengukuran dinyatakan agar istilah prehipertensi versus hipertensi tidak ambigu. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_07:uas:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_07:uas:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Usia, lokasi infeksi dan kultur ditambahkan; rute sefiksim intravena yang keliru di sumber dihapus. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_07:uas:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_07:uas:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fragmen regulasi tanpa nomor atau isi tidak direka; dibuat pengganti tentang fungsi pelayanan primer pada gangguan metabolik. Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_07:uas:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Jenis kelamin, etnis, seluruh nilai dan kerangka kriteria ditambahkan; tidak lagi memilih beberapa komponen yang sama-sama benar. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_07:uas:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Jenis epilepsi diperjelas; sasaran soal diubah ke aksi ACTH yang relevan dengan lecture Cushing, bukan terapi semua epilepsi. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Nomor asli kosong; dibuat soal pengganti tentang kegawatan metabolik anak. Topik asli nomor ini tidak diketahui. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_07:uas:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_07:uas:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Derajat hiperglikemia dan keadaan klinis ditambahkan; rujukan tidak meniadakan stabilisasi bila diperlukan. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fragmen morfologi diganti deskripsi tekstual diagnostik; tidak mengklaim pemulihan gambar asli. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. USG asli tidak menetapkan tahap embriologi; dibuat kasus baru dengan agenesis bilateral eksplisit. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Status infeksi dan perfusi ditambahkan agar pilihan tidak bergantung pada warna hitam saja. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_07:uas:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_07:uas:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Karakter nodul dan MRI ditambahkan; PSA meningkat saja tidak dianggap konfirmasi kanker. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:39:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fragmen penggunaan steroid dilengkapi gejala dan pertanyaan etiologi. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_07:uas:40:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:41:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_07:uas:42:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_07:uas:43:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:44:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Data lima bulan dan USG ditambahkan; durasi edema sebulan saja tidak dipakai menetapkan CKD. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:45:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:46:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Profil kalsium-fosfat-PTH ditambahkan; nyeri dan osteoporosis saja tidak dianggap menentukan gangguan paratiroid. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_07:uas:47:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_08:cumex-2:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Data analisis batu ditambahkan; radiopak saja tidak dipakai membedakan kalsium fosfat dari struvit.
- source_08:cumex-2:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Jenis diabetes dan kekurangan insulin diperjelas untuk menghindari pencampuran efek insulin dengan efek diabetes.
- source_08:cumex-2:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Penyebab, asidosis dan kelayakan NIV ditambahkan; terapi tidak ditentukan dari hiperkapnia saja. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_08:cumex-2:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_08:cumex-2:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Sindrom nefrotik dan albumin ditambahkan; jenis pitting tidak dianggap menentukan mekanisme tunggal. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_08:cumex-2:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Istilah biomarker nonenzimatik yang terpotong diperjelas sebagai produk kerusakan lipid. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:cumex-2:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:cumex-2:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:cumex-2:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:cumex-2:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_08:cumex-2:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Populasi, metode pengambilan, satu patogen dan satuan volume ditambahkan; ambang tidak digeneralisasi ke semua ISK. Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_08:cumex-2:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fase terapi, volume dan komorbid diperjelas; soal menilai tujuan cairan awal, bukan regimen lengkap. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fragmen SCFA yang tidak menjelaskan proses diubah menjadi pertanyaan pembentukan SCFA. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Peringkat Riskesdas yang tidak menyebut indikator diganti latihan epidemiologi dengan angka hipotetis, bukan data Riskesdas 2013. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar Wuchereria yang tidak tersedia diganti deskripsi morfologi tekstual sintetis. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Onset dan hasil USG ditambahkan untuk membedakan DVT dari limfedema pada pasien kanker. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:cumex-2:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_08:uas:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_08:uas:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_08:uas:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_08:uas:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_08:uas:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Daftar sayuran yang beberapa jawabannya benar diganti mekanisme goitrogen yang spesifik; tidak menyarankan menghindari semua sayuran.
- source_08:uas:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_08:uas:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_08:uas:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Lokasi lesi dan bukti retensi ditambahkan; cedera lumbar umum tidak langsung menentukan tipe inkontinensia.
- source_08:uas:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_08:uas:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Ambang dinyatakan sebagai protokol hipotetis latihan, bukan rentang normal universal. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_08:uas:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Arah interferensi dan kerentanan metode dinyatakan; tidak menganggap semua metode bereaksi sama. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_08:uas:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_08:uas:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Kasus sumber yang tercampur dan dosis terpotong diganti skenario emergensi jelas tanpa menebak dosis anak. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_08:uas:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_08:uas:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Tujuan pemeriksaan dibatasi pada kegawatan ketoasidosis; bukan sekadar mengulang diagnosis hiperglikemia. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_08:uas:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Usia, laju perubahan dan deskripsi slit-lamp ditambahkan; tidak mengklaim semua katarak diabetes mempunyai pola ini. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_08:uas:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_08:uas:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Hiperplasia yang tidak spesifik dilengkapi serologi dan gambaran histologi pembeda. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:uas:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:uas:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:uas:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:uas:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:uas:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:uas:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Komplikasi, kegagalan obat, ukuran prostat dan kelayakan operasi ditambahkan; TURP tidak dinyatakan terapi semua BPH. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_08:uas:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Massa berambut yang tidak diagnostik diganti diagnosis spinal eksplisit; jawaban UPJ yang tidak didukung tidak dipertahankan. Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_08:uas:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Usia, status kehamilan dan ketiadaan tanda infeksi atas ditambahkan untuk menentukan rute terapi. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_08:uas:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Nilai sewaktu dan 2 jam setelah makan yang konteksnya tidak jelas dihapus; fokus menjadi konfirmasi hasil puasa abnormal. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Pilihan dan konteks alternatif ditambahkan; tidak dinyatakan sebagai larangan absolut untuk setiap keadaan. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Foto agar tidak tersedia; dibuat pengganti dengan deskripsi tekstual sintetis tanpa mengklaim identifikasi spesies dari zona saja. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:39:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Usia, CKD, proteinuria dan kontraindikasi diperjelas agar pemilihan golongan spesifik dapat dipertanggungjawabkan. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:40:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fragmen Riskesdas diganti pertanyaan metodologi survei; tidak mengarang rincian protokol resmi tertentu. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:41:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_08:uas:42:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Metformin pada fragmen dikoreksi menjadi metronidazol; ditambahkan hasil aerotoleransi sintetis karena gambar asli tidak ada. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_10:cumex-2:1:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:2:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:3:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:4:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:5:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Proteinuria dan kelayakan terapi ditambahkan; usia saja tidak menentukan ACE inhibitor. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:6:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Nama obat dan ketiadaan insulin ditambahkan untuk mengatasi kunci sumber yang menyebut dua golongan. Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_10:cumex-2:7:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_10:cumex-2:8:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Gambar perbandingan tanpa penunjuk target diganti deskripsi satu spesies sintetis yang dapat diidentifikasi. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:9:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:10:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Bercak cokelat yang tidak spesifik diganti ciri hiperkortisolisme; kunci tidak bergantung pada lesi kulit yang belum jelas.
- source_10:cumex-2:11:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:12:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:13:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:14:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:15:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:16:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Kunci atau teks jawaban sumber dikoreksi; lihat catatan konflik. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:17:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:18:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Prosedur ditentukan dan warna sudah diberikan; konflik kunci pale pink tidak dipertahankan sebagai fakta universal.
- source_10:cumex-2:19:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:20:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fitur lesi dan ketiadaan organisasi ditambahkan; kunci sumber organized thrombus dikoreksi. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:21:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:22:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:23:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:24:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:25:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:26:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Urografi tidak pasti diganti laporan CT sintetis; lokasi batu tidak ditentukan hanya dari letak nyeri.
- source_10:cumex-2:27:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Ambang lama diganti konsensus yang disebut eksplisit; keton dan asidosis ditambahkan agar glukosa tidak dinilai sendirian.
- source_10:cumex-2:28:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:29:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:30:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Kunci atau teks jawaban sumber dikoreksi; lihat catatan konflik.
- source_10:cumex-2:31:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:32:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:33:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Kunci atau teks jawaban sumber dikoreksi; lihat catatan konflik.
- source_10:cumex-2:34:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:35:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:36:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:37:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Riwayat kekambuhan, kultur dan selesainya terapi aktif ditambahkan; kunci cranberry tidak dianggap rekomendasi utama universal. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:38:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_10:cumex-2:39:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Foto bercak kulit yang tidak menentukan diagnosis diganti temuan klinis sintetis dan konfirmasi hiperkortisolisme.
- source_10:cumex-2:40:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:41:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:42:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:43:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:44:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:45:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Istilah pusat osmoregulasi tunggal diganti lokasi sintesis vasopresin; kedua nukleus yang relevan digabung dalam satu opsi. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:46:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Batang sumber hanya tanda tanya; dibuat pengganti dari petunjuk opsi lifestyle dan metformin, bukan pemulihan kasus asli. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:47:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_10:cumex-2:48:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Riwayat ibu dan penanda biokimia ditambahkan; kunci folat pada sumber dikoreksi. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:49:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:50:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:51:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:52:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Kunci atau teks jawaban sumber dikoreksi; lihat catatan konflik.
- source_10:cumex-2:53:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:54:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:55:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:56:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:57:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:58:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Tujuan evaluasi dinyatakan; profil lipid tidak lagi dipaksakan sebagai satu pemeriksaan utama semua hipertensi.
- source_10:cumex-2:59:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:60:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI
- source_10:cumex-2:61:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 0 opsi terbaca menjadi 5.
- source_10:cumex-2:62:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Fragmen bentuk memanjang dilengkapi lokasi duktus, pola radial dan keterlibatan hati. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:63:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:64:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 4 opsi terbaca menjadi 5.
- source_10:cumex-2:65:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_10:cumex-2:66:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:67:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_10:cumex-2:68:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 3 opsi terbaca menjadi 5.
- source_10:cumex-2:69:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:70:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.
- source_10:cumex-2:71:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci ditentukan AI Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_10:cumex-2:72:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.
- source_10:cumex-2:73:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Normalnya ukuran tiroid diganti hasil uji fungsi setelah evaluasi terapi untuk membedakan transien dari permanen. Distraktor dilengkapi dari 1 opsi terbaca menjadi 5.
- source_10:cumex-2:74:1: Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli. kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis. Istilah kejang-kejangan diperjelas menjadi deskripsi pemeriksaan asteriksis; tidak menganggap setiap kejang uremik adalah asteriksis. Distraktor dilengkapi dari 2 opsi terbaca menjadi 5.

## Rujukan pemeriksaan klinis

- [KDIGO 2024](https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf)
- [ADA 2026: diagnosis](https://doi.org/10.2337/dc26-s002)
- [ADA 2026: risiko kardiovaskular dan lipid](https://doi.org/10.2337/dc26-s010)
- [Konsensus krisis hiperglikemia 2024](https://diabetesjournals.org/care/article/47/8/1257/156811/Hyperglycemic-Crises-in-Adults-With-Diabetes-A)
- [WHO filariasis](https://www.who.int/news-room/fact-sheets/detail/lymphatic-filariasis)
- [CDC DPDx](https://www.cdc.gov/dpdx/lymphaticfilariasis/)
- [AAP tekanan darah anak](https://publications.aap.org/pediatrics/article/140/3/e20171904/38358)
- [NICE cairan IV](https://www.nice.org.uk/guidance/cg174/chapter/Recommendations)

## Menjalankan ulang

Gunakan Python dengan PyMuPDF dan Pillow tersedia. Paket lokal sementara ada di tmp/blok2.5/python-packages.
```powershell
python scripts/extract-blok-ii-5.py
python scripts/prepare-blok-ii-5-staging.py
python scripts/extract-blok-ii-5-lectures.py
python scripts/extract-blok-ii-5-question-images.py
node scripts/import-soal-blok2.5.mjs --dry-run
node scripts/import-soal-blok2.5.mjs --apply
# --apply gagal jika ada karantina. --allow-quarantine hanya setelah pengguna menyetujui subset.
node scripts/import-soal-blok2.5.mjs --verify
```
Penerbitan awal mencakup 297 soal. Pengguna kemudian mengizinkan rekonstruksi dan pemasukan seluruh 100 nomor tertahan. Jalankan --apply tanpa pengecualian karantina untuk rencana lengkap ini.
Jika ekstraksi gambar dijalankan ulang, checksum dan verifikasi visual wajib cocok. Tidak ada secret baru atau penulisan Supabase.

Plan SHA-256: d287581549d437e79e3508b025312c6548897897741c83bc1b262ebb47400cc2
Original bank SHA-256: 289bdf513e64e82d4a44b39d2b4ebd2e50112bedcde35603dc6bc39603b9016e

## Git status saat verifikasi

```text
 M .gitignore
 M dashboard.css
 M dashboard.html
 M dashboard.js
 M quiz.html
 M quiz.js
?? assets/questions/blok2.5-import/
?? data/blok2.5-import.js
?? docs/
?? scripts/blok-ii-5-image-review.json
?? scripts/blok-ii-5-reconstruction-references.json
?? scripts/blok-ii-5-reconstruction.tsv
?? scripts/blok-ii-5-review-map.json
?? scripts/blok-ii-5-reviewed.tsv
?? scripts/extract-blok-ii-5-lectures.py
?? scripts/extract-blok-ii-5-question-images.py
?? scripts/extract-blok-ii-5.py
?? scripts/import-soal-blok2.5.mjs
?? scripts/prepare-blok-ii-5-staging.py
?? scripts/review-blok-ii-5-images.py
?? scripts/smoke-blok-ii-5.cjs
?? scripts/test-import-soal-blok2.5.mjs
```
