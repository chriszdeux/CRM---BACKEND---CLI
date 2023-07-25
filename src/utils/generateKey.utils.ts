const cryptoC = require('crypto');

export const generateKey = () => {
  return cryptoC.randomBytes(32).toString('hex');
};

console.log(generateKey());
