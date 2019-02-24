import fetch from 'cross-fetch';

const baseURL =
  process.env.environment == 'production'
    ? 'https://api.app.new.tongzhuogame.com'
    : process.env.environment == 'simulation'
      ? 'https://staging.api.app.new.tongzhuogame.com'
      : 'https://debug.api.app.new.tongzhuogame.com';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log(process.env.environment, baseURL);

export const generateFetch = (baseURL, fn) => {
  return function(...args) {
    args[0] = `${baseURL}${args[0]}`;
    if (fn) return fetch.apply(null, args).then(fn);
    return fetch.apply(null, args);
  };
};

export default function(...args) {
  args[0] = `${baseURL}${args[0]}`;
  return fetch.apply(null, args);
}
