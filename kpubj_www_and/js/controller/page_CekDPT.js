var page_cekdpt = function () {
  page_cloudbot.showpage(aDiv.pageCekDPT);
  // database URL are loaded
  w = chtml.open(chtml.library.div, {class: chtml.value.row});
  w += chtml.open(chtml.library.img,
    {src: database_url[id_android.id_android_gambar_dibawah_bar].url,
      class: [chtml.value.img_responsive, chtml.value.col_xs_12, chtml.value.col_md_12]});

  w += chtml.close(chtml.library.div);
  $(aDiv.pageCekDPT).html(w);
}
