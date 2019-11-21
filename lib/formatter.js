/*
  This is from: https://github.com/dannytatom/muddy
  Most of the credit to him for this!
  I just modificated this a bit
*/

const colorCodes = [ ['[0m','normal']
                 ,  ['[1m','bold']
                 ,  ['[4m','underline']
                 ,  ['[30m','black'] 
                 ,  ['[30m','red']
                 ,  ['[32m','green']
                 ,  ['[33m','yellow']
                 ,  ['[34m','blue']
                 ,  ['[35m','magenta']
                 ,  ['[36m','cyan']
                 ,  ['[37m','white']
                 ,  ['[40m','black-bg'] 
                 ,  ['[41m','red-bg']
                 ,  ['[42m','green-bg']
                 ,  ['[43m','yellow-bg']
                 ,  ['[44m','blue-bg']
                 ,  ['[45m','magenta-bg']
                 ,  ['[46m','cyan-bg']
                 ,  ['[47m','white-bg']];
/*
exports.go = (data) => {
  for (let i = 0; i < colorCodes.length; i++) {
    const toReplace = colorCodes[i][0];
    const matches = data.match(toReplace);
    const replaceTo = colorCodes [i][1];
    
    if (matches) {
      for (let ix = 0; ix < matches.length; ix++) {
        data.replace(toReplace, '<span class="' + replaceTo + '">');
      }
    }
    
    const toFind = colorCodes[i][0];
    //data.replace(re,'<span class="' + replaceTo + '">');
  }
  */
  /*
  var matches = data.match(/\[((\d*);){0,2}(\d*)m/g) 
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
*/
  // Probably temporary, but otherwise it will try
  // to render whatever is in <> as a HTML tag.
  data = data.replace('<', '&lt;');
  data = data.replace('>', '&gt;');  
  // getting those messy things away: hopefully temporary solytion
  data = data.replace(/��/g, '');
  data = data.replace(//g, '');
  
  return data;
}


