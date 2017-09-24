var binary_com_market = {
  id: "#select_market",
  div: {},
  option: [],
  database: {
    Forex: {
      Major_pairs:
        ['AUDJPY', 'AUDUSD', 'EURAUD', 'EURCAD', 'EURCHF', 'EURCHF', 'EURGBP', 'EURJPY', 'EURUSD',
          'GBPAUD', 'GBPJPY', 'GBPUSD', 'USDCAD', 'USDCHF', 'USDJPY'],
      Minor_pairs:
        ['AUDCAD', 'AUDCHF', 'AUDNZD', 'AUDPLN', 'EURNZD', 'GBPCAD', 'GBPCHF', 'GBPNOK', 'GBPNZD',
          'GBPPLN', 'NZDJPY', 'NZDUSD', 'USDMXN', 'USDNOK', 'USDPLN', 'USDSEK'],
    },
    Volatility: {
      Continuous_indices: [10, 25, 50, 75, 100],
      Daily_reset_indices: ['BEAR', 'BULL']
    }
  },
  parser: function () {
    this.div = $(this.id);
    for (d in this.database) {
      for (m in this.database[d]) {
        this.option.push({type: 'title', value: d.toUpperCase() + ' ' + m.toUpperCase().replace('_', ' ')});
        for (s in this.database[d][m]) {
          if (m == 'Continuous_indices') {
            this.option.push({type: 'market', symbol: 'R_' + this.database[d][m][s], code: 'Volatility ' + this.database[d][m][s] + ' Index'});
          } else if (m == 'Daily_reset_indices') {
            this.option.push({type: 'market', symbol: 'RD' + this.database[d][m][s].toLowerCase(), code: this.database[d][m][s] + ' Market Index'});
          } else {
            this.option.push({type: 'market', symbol: 'frx' + this.database[d][m][s], code: 'Forex ' + this.database[d][m][s]});
          }
        }
      }
    }
    console.log(this.option);
    this.create();
  },
  create: function () {
    opt = '<option value="">Select market</option>';
    onopt = false;
    for (a in this.option) {
      if (this.option[a].type == 'title') {
        if (onopt) {
          opt += '</optgroup>';
        }
        onopt = true;
        opt += '<optgroup label="' + this.option[a].value + '">';
      } else {
        opt += '<option value="' + this.option[a].type + '">' + this.option[a].code + '</option>';
      }
    }
    opt += '</optgroup>';
    this.div.html(opt);
  }
}.parser();