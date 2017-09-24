// create listen
page_cloudbot = {
  hideall: function () {
    $(".thispage").each(function () {
      $(this).hide();
    });
  },
  // TODO add swith li active with parent
  showpage: function (div) {
    this.hideall();
    $(div).show();
  }
}

