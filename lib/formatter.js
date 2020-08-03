/*
  This is from: https://github.com/dannytatom/muddy
  Most of the credit to him for this!
  I just modificated this a bit to suit my needs.
*/
var attributes = { 0:  'normal'
                 , 1:  'bold'
                 , 4:  'underline'
                 , 30: 'black'
                 , 31: 'red'
                 , 32: 'green'
                 , 33: 'yellow'
                 , 34: 'blue'
                 , 35: 'magenta'
                 , 36: 'cyan'
                 , 37: 'white'
                 , 40: 'black-bg'
                 , 41: 'red-bg'
                 , 42: 'green-bg'
                 , 43: 'yellow-bg'
                 , 44: 'blue-bg'
                 , 45: 'magenta-bg'
                 , 46: 'cyan-bg'
                 , 47: 'white-bg' }

exports.go = function(data) {
  var matches = data.match(/\[((\d*);){0,2}(\d*)m/g)
  // Probably temporary, but otherwise it will try
  // to render whatever is in <> as a HTML tag.
  data = data.replace('<', '&lt;');
  data = data.replace('>', '&gt;');
  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i]
        , codes = match.replace('[', '').replace('m', '').split(';')
      for (var c = 0; c < codes.length; c++) {
        codes[c] = attributes[codes[c]]
      }
      data = data.replace(match, '<span class="' + codes.join(' ') + '">');
    }
  }
  // This is definitely a hack,
  // whatever it's trying to say is probably important.
  //
  // But since it comes back crazy characters,
  // I have no idea. :(
  data = data.replace(/ÿù/g, '');
  data = data.replace(//g, '');
  // final cleanUp attempt
  for (let i = 30; i < 38; i++) {
    data = data.replace("[" + i + "m", "");
    data = data.replace("[0;" + i + "m", "");
    data = data.replace("[1;" + i + "m", "");
    data = data.replace("[" + i + ";1m", "");
  }
  return data;
}
/*
possible fix for minor problems
// Lisä siivous
            for (int siivous = 30; siivous < 38; siivous++)
            {
                data = data.Replace("[" + siivous + "m", "");
                data = data.Replace("[0;" + siivous + "m", "");
                data = data.Replace("[1;" + siivous + "m", "");
                data = data.Replace("[" + siivous + ";1m", "");
            }
            data = Regex.Replace(data, "\\[m\\b", "");
            data = Regex.Replace(data, "\\[0m", "");
*/
