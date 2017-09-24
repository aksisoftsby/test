/*
 * Create by dony
 * attr is
 */
var chtml = {
  library: {
    span: 'span',
    div: 'div',
    input: 'input',
    class: 'class',
    id: 'id',
    a: 'a',
    img: 'img',
    h4: 'h4',
    p: 'p',
  },
  value: {
    row: 'row',
    container: 'container',
    img_responsive: 'img-responsive',
    card: 'card',
    header: 'header',
    title: 'title',
    category: 'category',
    col_xs_12: 'col-xs-12',
    col_xs_6: 'col-xs-6',
    col_md_6: 'col-md-6',
    col_md_12: 'col-md-12',
  },
  open: function (tag, attr) {
    g = "<" + tag + " ";
    for (c in attr) {
      g += c + "='";
      if (is_array(attr[c])) {
        for (f in attr[c]) {
          g += attr[c][f] + " ";
        }
        g += attr[c][f] + "' ";
      } else {
        g += attr[c] + "' ";
      }
    }
    g += ">";
    return g;
  },
  close: function (tag) {
    return '</' + tag + '>';
  }
}

