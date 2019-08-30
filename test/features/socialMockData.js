/**
 *
 * Google Mock Data
 */

const googleMock = (req, res, next) => {
  req.user = {
    id: 12334456,
    displayName: 'Barefoot Nomad',
    name: {
      familyName: 'Nomad',
      givenName: 'Barefoot'
    },
    emails: [{ value: 'jubilee.barefootnomad@gmail.com', verified: true }],
    photos: [
      {
        value:
          'https://lh6.googleusercontent.com/-2BlqgBk4Y3M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdOsWp-Z4uy0OPYuat0AtpEDMkTOw/photo.jpg'
      }
    ],
    provider: 'google',
    _raw:
    '{\n  "sub": "116080001749246744313",\n  "name": "Barefoot Nomad",\n  "given_name": "Barefoot",\n  "family_name": "Nomad",\n  "picture": "https://lh6.googleusercontent.com/-2BlqgBk4Y3M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdOsWp-Z4uy0OPYuat0AtpEDMkTOw/photo.jpg",\n  "email": "jubilee.barefootnomad@gmail.com",\n  "email_verified": true,\n  "locale": "en"\n}',
    _json: {
      sub: 12334456,
      name: 'Barefoot Nomad',
      given_name: 'Barefoot',
      family_name: 'Nomad',
      picture: 'https://lh6.googleusercontent.com/-2BlqgBk4Y3M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdOsWp-Z4uy0OPYuat0AtpEDMkTOw/photo.jpg',
      email: 'ejimchisom@gmail.com',
      email_verified: true,
      locale: 'en'
    }
  };
  next();
};

export default googleMock;
