/**
 *
 * Facebook Mock Data
 */

export default (req, res, next) => {
  req.user = {
    id: '1283637238389',
    username: undefined,
    displayName: undefined,
    name: {
      familyName: 'Barefoot',
      givenName: 'Nomad',
      middleName: undefined
    },
    gender: undefined,
    profileUrl: undefined,
    photos: [
      {
        value:
          'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1579056305559670&height=50&width=50&ext=1563032609&hash=AeSwH6WuOP66Hnvp'
      }
    ],
    emails: [
      {
        value: 'jubilee_barefootnomad@gmail.com'
      }
    ],
    provider: 'facebook',
    _raw:
    '{"last_name":"Barefoot","first_name":"Nomad","picture":{"data":{"height":50,"is_silhouette":false,"url":"https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=2389951121100538&height=50&width=50&ext=1569372411&hash=AeRp-z6x0OzdHr5z","width":50}},"email":"ejimchisom\\u0040gmail.com","id":"2389951121100538"}',
    _json: {
      last_name: 'Barefoot',
      first_name: 'Nomad',
      picture:
      {
        data: {
          height: 50,
          is_silhouette: false,
          url:
          'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2389951121100538&height=50&width=50&ext=1569373036&hash=AeRzZOJPwcleMAEO',
          width: 50
        }
      },
      email: 'jubilee.barefootnomad@gmail.com',
      id: '1283637238389'
    }
  };
  next();
};
