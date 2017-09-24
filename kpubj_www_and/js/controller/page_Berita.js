var page_berita = function () {
  page_cloudbot.showpage(aDiv.pageBerita);
  // database URL are loaded
  promise.get(kpubj_url_allpost)
    .then(function (error, text, xhr) {
      if (error) {
        console.log("error " + xhr.status);
      } else {
        data = JSON.parse(text);
        console.log(data);
        w = chtml.open(chtml.library.div, {class: chtml.value.row});
        w += chtml.open(chtml.library.img,
          {src: database_url[id_android.id_android_gambar_dibawah_bar].url,
            class: [chtml.value.img_responsive, chtml.value.col_xs_12, chtml.value.col_md_12]});
        for (r in data["FeedData"]) {
          w += chtml.open(chtml.library.div, {class: [chtml.value.col_xs_12, chtml.value.col_md_12]})
            + chtml.open(chtml.library.div, {class: chtml.value.card})
            // header
            + chtml.open(chtml.library.div, {class: chtml.value.header})
            // h4
            + chtml.open(chtml.library.h4, {class: chtml.value.title})
            // content
            + data["FeedData"][r].title
            + chtml.close(chtml.library.h4)
            // p
            + chtml.open(chtml.library.p, {class: chtml.value.category})
            // content
            + data["FeedData"][r].tanggal
            + chtml.close(chtml.library.p)
            // header close
            + chtml.close(chtml.library.div)
            // card close
            + chtml.close(chtml.library.div)
            // col-md-12 close
            + chtml.close(chtml.library.div)
            ;
        }
        w += chtml.close(chtml.library.div);
        console.log(w);
        $(aDiv.pageBerita).html(w);
      }
    });
}
