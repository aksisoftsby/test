var page_kontak = function () {
  page_cloudbot.showpage(aDiv.pageKontak);
  // database URL are loaded
  w = chtml.open(chtml.library.div, {class: chtml.value.row});
  w += chtml.open(chtml.library.img,
    {src: database_url[id_android.id_android_gambar_dibawah_bar].url,
      class: [chtml.value.img_responsive, chtml.value.col_xs_12, chtml.value.col_md_12]});

  w += chtml.close(chtml.library.div);
  $(aDiv.pageKontak).html(w);
}
