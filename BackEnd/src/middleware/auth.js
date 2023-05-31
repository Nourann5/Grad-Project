const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
  const secret = process.env.JWT_SECRET;

  return jwt({
    secret,
    algorithms: ['HS256'],
    // isRevoked:isRevoked
  }).unless({
    path: [
      { url: /\/public(.*)/ },
      { url: /\/advertisement(.*)/,options:['GET']},
      { url: /\/user(.*)/ },
      { url: /\/provider(.*)/ },
      { url: /\/cart(.*)/ },
      { url: /\/orders(.*)/ },
      { url: /\/admin(.*)/ },
      { url: /\/notification(.*)/ },
      { url: /\/neighborhood\/all-neighborhoods(.*)/ },
      { url: /\/product(.*)/ },
      { url: /\/city(.*)/ },
      { url: /\/neighborhood(.*)/ },
      { url: /\/exams(.*)/ },
      { url: /\/category(.*)/ },
      { url: /\/settings(.*)/ },
      { url: /\/avatars(.*)/ },
      { url: /\/static-pages(.*)/ },
      // { url: /\/admin(.*)/ },
      // '/admin/statistics',
      // '/neighborhood/all-neighborhoods/:id',
      '/category/all-categories',
      '/admin/login',
    ],
  });
}

module.exports = authJwt;
