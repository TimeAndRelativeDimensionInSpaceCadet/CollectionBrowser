Object.defineProperty(String.prototype, 'toTitleCase', {
  value() {
    //regex note: match the first character of the string or the first word character (letter) after a whitespace character
    //not including whitespace character in match.
    return this.replace(/^\w|(?<=\s)\w/g, e => e.toUpperCase());
  },
});
