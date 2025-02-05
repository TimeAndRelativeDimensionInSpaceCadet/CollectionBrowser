Object.defineProperty(String.prototype, 'toCapitalized', {
    value() {
      
      const toDisplay = [
        ...option.replace(new RegExp('^\\w'), firstChar.toUpperCase()),
      ].join('');
    }
})