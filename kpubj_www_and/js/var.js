var
  kpubj_url_database = 'http://kab-bojonegoro.kpu.go.id/android/test.php'
  , kpubj_url_allpost = 'http://kab-bojonegoro.kpu.go.id/android/allpost.php'
  , kpubj_url_postid = 'http://kab-bojonegoro.kpu.go.id/android/postid.php'
  , kpubj_template_dir = 'template_kpu_bojonegoro'
  // save selama 10 menit bagaimana
  , sharemessagetitle = false
  , sharemessagemessage = false
  , sharemessagelink = false
  , pushNotification = false
  , xmlhttp = false
  , angular_name = 'starter'
  , modul_controller_home = 'starter.home'
  , factory_load_database = 'starter.factory_load_database'
  , factory_parser_database = 'starter.factory_parser_database'
  , database_url = false
  ;

var _appUse = [
  'ionic',
  'ngStorage',
  modul_controller_home,
  factory_load_database,
  factory_parser_database,
  'ngCordova'
];

var aDiv = {
  pageHome: "#page_Home",
  pageBerita: "#page_Home",
  pageCekDPT: "#page_CekDPT",
  pageProfile: "#page_Profile",
  pageKontak: "#page_Kontak",
  pageProfileCalon: "#page_ProfileCalon",
  pageChartPemilu: "#page_ChartPemilu",
  pagePengaduan: "#page_Pengaduan",
  pageCariTPS: "#page_CariTPS",
}

// android var
var id_android = {
  last_tab: "last_tab",
  id_android_gambar_bar_atas: "id-android-gambar-bar-atas",
  id_android_gambar_background_android: "id-android-gambar-background-android",
  id_android_gambar_dibawah_bar: "id-android-gambar-dibawah-bar",
  id_android_gambar_menu_halaman_berita: "id-android-gambar-menu-halaman-berita",
  id_android_gambar_menu_halaman_cek_DPT: "id-android-gambar-menu-halaman-cek-DPT",
  id_android_gambar_menu_halaman_profile_kPU: "id-android-gambar-menu-halaman-profile-kPU",
  id_android_gambar_menu_halaman_kontak: "id-android-gambar-menu-halaman-kontak",
  id_android_gambar_menu_halaman_profile_pasangan_calon: "id-android-gambar-menu-halaman-profile-pasangan-calon",
  id_android_gambar_menu_halaman_chart: "id-android-gambar-menu-halaman-chart",
  id_android_gambar_menu_halaman_pengaduan: "id-android-gambar-menu-halaman-pengaduan",
  id_android_gambar_menu_halaman_cari_TPS: "id-android-gambar-menu-halaman-cari-TPS",
  id_android_urutan_halaman_1_kiri: "id-android-urutan-halaman-1-kiri",
  id_android_urutan_halaman_1_kanan: "id-android-urutan-halaman-1-kanan",
  id_android_urutan_halaman_2_kiri: "id-android-urutan-halaman-2-kiri",
  id_android_urutan_halaman_2_kanan: "id-android-urutan-halaman-2-kanan",
  id_android_urutan_halaman_3_kiri: "id-android-urutan-halaman-3-kiri",
  id_android_urutan_halaman_3_kanan: "id-android-urutan-halaman-3-kanan",
  id_android_urutan_halaman_4_kiri: "id-android-urutan-halaman-4-kiri",
  id_android_urutan_halaman_4_kanan: "id-android-urutan-halaman-4-kanan",
  id_android_footer_html_depan: "id-android-footer-html-depan",
  id_android_footer_html_berita_atas: "id-android-footer-html-berita-atas",
  id_android_footer_html_berita_bawah: "id-android-footer-html-berita-bawah",
  id_android_footer_html_cekdpt_atas: "id-android-footer-html-cekdpt-atas",
  id_android_footer_html_cekdpt_bawah: "id-android-footer-html-cekdpt-bawah",
  id_android_footer_html_profile_atas: "id-android-footer-html-profile-atas",
  id_android_footer_html_profile_bawah: "id-android-footer-html-profile-bawah",
  id_android_footer_html_kontak_atas: "id-android-footer-html-kontak-atas",
  id_android_footer_html_kontak_kontak_array: "id-android-footer-html-kontak-kontak-array",
  id_android_footer_html_kontak_bawah: "id-android-footer-html-kontak-bawah",
  id_android_footer_html_profile_calon_atas: "id-android-footer-html-profile_calon-atas",
  id_android_footer_html_profile_calon_bawah: "id-android-footer-html-profile_calon-bawah",
  id_android_footer_html_chart_pemilu_atas: "id-android-footer-html-chart_pemilu-atas",
  id_android_footer_html_chart_pemilu_bawah: "id-android-footer-html-chart_pemilu-bawah",
  id_android_footer_html_pengaduan_atas: "id-android-footer-html-pengaduan-atas",
  id_android_footer_html_pengaduan_pengaduan_array: "id-android-footer-html-pengaduan-pengaduan-array",
  id_android_footer_html_pengaduan_bawah: "id-android-footer-html-pengaduan-bawah",
  id_android_footer_html_caritps_atas: "id-android-footer-html-caritps-atas",
  id_android_footer_html_caritps_bawah: "id-android-footer-html-caritps-bawah",
  REDUX_last_saved: "REDUX_last_saved",
  REDUX_LAST_SAVE: "REDUX_LAST_SAVE"
};

var PageName = {
  berita: "berita",
  cekdpt: "cekdpt",
  profile: "profile",
  kontak: "kontak",
  profile_calon: "profile_calon",
  chart_pemilu: "chart_pemilu",
  pengaduan: "pengaduan",
  caritps: "caritps",
}

var PagePicture = {
  berita: id_android.id_android_gambar_menu_halaman_berita,
  cekdpt: id_android.id_android_gambar_menu_halaman_cek_DPT,
  profile: id_android.id_android_gambar_menu_halaman_profile_kPU,
  kontak: id_android.id_android_gambar_menu_halaman_kontak,
  profile_calon: id_android.id_android_gambar_menu_halaman_profile_pasangan_calon,
  chart_pemilu: id_android.id_android_gambar_menu_halaman_chart,
  pengaduan: id_android.id_android_gambar_menu_halaman_pengaduan,
  caritps: id_android.id_android_gambar_menu_halaman_cari_TPS,
}

