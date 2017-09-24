/**
 * require args
 * id = from div id
 * array with value and text
 */
var select_parser = function (args) {
  div = $(args.id);
  opt = '<option value="">' + args.title + '</option>';
  for (c in args.option) {
    opt += '<option value="' + args.option[c].value + '">' + args.option[c].text + '</option>';
  }
  div.html(opt);
}

/*
 * contract type, 
 * 
 */
select_parser({
  id: '#select_contract_type',
  title: 'Trading menu',
  option: [
    {value: "rf", text: "Rise Fall"},
    {value: "hlt", text: "Higher Lower Target"},
    {value: "hls", text: "Higher Lower Sideway"},
    {value: "ot", text: "One touch"},
    {value: "nt", text: "No touch"},
    // {value: "nt", text: "Even"},
  ]
});
