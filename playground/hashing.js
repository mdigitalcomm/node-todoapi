const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$ti5oBuJp3iAFXSrR20HVf.fR.YgdW12kaq02LMzzITRQRIb35rJ6u';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
// var data = {
//   id: 10
// };
// var token = jwt.sign(data, 'abdba');
//
// console.log(token);
// var decoded = jwt.verify(token, 'abdba');
// console.log(decoded);
// var message = 'I am user number 1.';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'alsdkfj').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'alsdkfj').toString();
//
// token.data = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// if (resultHash === token.hash) {
//   console.log('data was not changed.');
// } else {
//   console.log('data was changed. Do not trust.');
// }
