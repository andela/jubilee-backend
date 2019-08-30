"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 * Google Mock Data
 */
var _default = (req, res, next) => {
  req.user = {
    id: req.body.id,
    displayName: 'Barefoot Nomad',
    name: {
      familyName: 'Nomad',
      givenName: 'Barefoot'
    },
    emails: [{
      value: 'jubilee_barefootnomad@gmail.com',
      verified: true
    }],
    photos: [{
      value: 'https://lh6.googleusercontent.com/-2BlqgBk4Y3M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdOsWp-Z4uy0OPYuat0AtpEDMkTOw/photo.jpg'
    }],
    provider: req.body.provider,
    _raw: '{\n  "sub": "116080001749246744313",\n  "name": "Barefoot Nomad",\n  "given_name": "Barefoot",\n  "family_name": "Nomad",\n  "picture": "https://lh6.googleusercontent.com/-2BlqgBk4Y3M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdOsWp-Z4uy0OPYuat0AtpEDMkTOw/photo.jpg",\n  "email": "jubilee.barefootnomad@gmail.com",\n  "email_verified": true,\n  "locale": "en"\n}',
    _json: {
      sub: req.body.id,
      name: 'Barefoot Nomad',
      given_name: 'Barefoot',
      family_name: 'Nomad',
      picture: 'https://lh6.googleusercontent.com/-2BlqgBk4Y3M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdOsWp-Z4uy0OPYuat0AtpEDMkTOw/photo.jpg',
      email: 'jubilee_barefootnomad@gmail.com',
      email_verified: true,
      locale: 'en'
    }
  };
  next();
};

exports.default = _default;