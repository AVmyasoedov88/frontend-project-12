const apiPath = '/api/v1';

// eslint-disable-next-line import/no-anonymous-default-export
const requireAuth = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
};

const paths = {
  login: () => 'login',
  signup: () => 'signup',
  privatePage: () => '/',
};

export { requireAuth, paths };
