const files = require.context('.', true, /\.js$/);
const blacklist = ['./index.js', './request.js'];
const modules = files.keys()
  .filter(key => !blacklist.includes(key))
  .reduce((accumulator, currentValue) => ({ ...accumulator, ...files(currentValue).default }), {});
export default modules;
