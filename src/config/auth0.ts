// Configuración de Auth0
export const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || 'dev-example.auth0.com',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'your-client-id',
  redirectUri: window.location.origin,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  scope: 'openid profile email',
}; 