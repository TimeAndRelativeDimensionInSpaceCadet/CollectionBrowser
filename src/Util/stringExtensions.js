Object.defineProperty(String.prototype, 'toTitleCase', {
  value() {
    return this.replace(/(^\w|(?<= )\w)/g, e => e.toUpperCase());
  },
});
