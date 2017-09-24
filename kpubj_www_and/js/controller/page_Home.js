var page_Home_parser = function (classKey) {
  f = chtml.open(chtml.library.div,
    {class: [chtml.value.col_md_6, chtml.value.col_xs_6]});
  if (database_url[classKey] != "") {
    // create href and onclick
    f += chtml.open(chtml.library.a,
      {href: '#', onclick: 'page_' + database_url[classKey] + '();'})
    f += chtml.open(chtml.library.img,
      {src: database_url[PagePicture[database_url[classKey]]].url,
        class: chtml.value.img_responsive});
    f += chtml.close(chtml.library.a);
  }
  f += chtml.close(chtml.library.div);
  return f;
}

var page_Home = function () {
  page_cloudbot.showpage(aDiv.pageHome);
  // database URL are loaded
  w = chtml.open(chtml.library.div, {class: chtml.value.row});
  w += chtml.open(chtml.library.img,
    {src: database_url[id_android.id_android_gambar_dibawah_bar].url,
      class: [chtml.value.img_responsive, chtml.value.col_xs_12, chtml.value.col_md_12]});
  w += page_Home_parser(id_android.id_android_urutan_halaman_1_kiri);
  w += page_Home_parser(id_android.id_android_urutan_halaman_1_kanan);
  w += page_Home_parser(id_android.id_android_urutan_halaman_2_kiri);
  w += page_Home_parser(id_android.id_android_urutan_halaman_2_kanan);
  w += page_Home_parser(id_android.id_android_urutan_halaman_3_kiri);
  w += page_Home_parser(id_android.id_android_urutan_halaman_3_kanan);
  w += page_Home_parser(id_android.id_android_urutan_halaman_4_kiri);
  w += page_Home_parser(id_android.id_android_urutan_halaman_4_kanan);
  w += chtml.close(chtml.library.div);
  $(aDiv.pageHome).html(w);
}
