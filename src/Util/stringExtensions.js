Object.defineProperty(String.prototype, 'toCapitalized', {
  value() {
    const values = this.split(' ');
    return values
      .map(value => {
        const firstChar = value.slice(0, 1);
        return [
          ...value.replace(new RegExp('^\\w'), firstChar.toUpperCase()),
        ].join('');
      })
      .join(' ');
  },
});
