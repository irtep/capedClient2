

const attributes = { 0:  'normal'
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

exports.go = (data) => { 
  const matches = data.match(/\[((\d*);){0,2}(\d*)m/g)

  // Probably temporary, but otherwise it will try
  // to render whatever is in <> as a HTML tag.
  //data = data.replace('<', '&lt;');
  //data = data.replace('>', '&gt;');
  /*
  console.log('before: ', data);
  data.replace('[1m', '<span class= "bold">');
  data.replace('[0m', '</span>');
  console.log('after: ', data);*/
  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i]
        , codes = match.replace('[', '').replace('m', '').split(';')

      for (var c = 0; c < codes.length; c++) {
        codes[c] = attributes[codes[c]];
      }

      //data = data.replace(match, '<span class="' + codes.join('') + '">' + '</span>')
      data = data.replace(match, '');
      
      data = data.replace('', '');
      //data = data.replace('\\', '');
    }
  }

  // This is definitely a hack,
  // whatever it's trying to say is probably important.
  //
  // But since it comes back crazy characters,
  // I have no idea. :(
  
  //data = data.replace('.', '.&nbsp;'); // /&emsp;&emsp;/ /\s/g
  
  //data = data.replace(/\s/g, ' ');
  //data = data.replace(/\./g, '. ');
  data = data.replace(/��/g, '');
  data = data.replace(/�/g, 'ä');
  //data = data.replace('< ', 'I'); // these two to help with bugging maps
  //data = data.replace(' >', 'I'); // need to find a better way for this...

  return data;
}

