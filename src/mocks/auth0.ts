// Implementación simulada de auth0-spa-js
export interface Auth0ClientOptions {
  domain: string;
  clientId: string;
  authorizationParams?: {
    redirect_uri?: string;
    audience?: string;
    scope?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface Auth0User {
  sub?: string;
  name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  [key: string]: any;
}

export class Auth0Client {
  private options: Auth0ClientOptions;
  private user: Auth0User | null = null;
  private authenticated = false;

  constructor(options: Auth0ClientOptions) {
    this.options = options;
    console.log('Auth0Client inicializado con opciones:', options);
  }

  async loginWithRedirect(options?: any): Promise<void> {
    console.log('Redirigiendo a Auth0 para login con opciones:', options);
    // En una implementación real, esto redireccionaría al usuario a Auth0
  }

  async loginWithPopup(options?: any): Promise<void> {
    console.log('Abriendo popup de Auth0 para login con opciones:', options);
    // En una implementación real, esto abriría un popup de Auth0
    this.authenticated = true;
    this.user = {
      sub: 'auth0|123456789',
      name: 'Usuario de Prueba',
      email: 'usuario@ejemplo.com',
      email_verified: true,
      picture: 'https://via.placeholder.com/150',
    };
  }

  async getUser(): Promise<Auth0User | undefined> {
    console.log('Obteniendo información del usuario');
    return this.user || undefined;
  }

  async getIdTokenClaims(): Promise<any> {
    console.log('Obteniendo claims del token ID');
    return {
      sub: this.user?.sub,
      aud: this.options.clientId,
      iss: `https://${this.options.domain}/`,
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    };
  }

  async getTokenSilently(options?: any): Promise<string> {
    console.log('Obteniendo token silenciosamente con opciones:', options);
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }

  async getTokenWithPopup(options?: any): Promise<string> {
    console.log('Obteniendo token con popup con opciones:', options);
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }

  logout(options?: any): void {
    console.log('Cerrando sesión con opciones:', options);
    this.authenticated = false;
    this.user = null;
  }

  async isAuthenticated(): Promise<boolean> {
    console.log('Verificando si el usuario está autenticado');
    return this.authenticated;
  }

  async handleRedirectCallback(url?: string): Promise<any> {
    console.log('Manejando callback de redirección con URL:', url || window.location.href);
    this.authenticated = true;
    this.user = {
      sub: 'auth0|123456789',
      name: 'Usuario de Prueba',
      email: 'usuario@ejemplo.com',
      email_verified: true,
      picture: 'https://via.placeholder.com/150',
    };
    return {
      appState: {},
    };
  }
}

export async function createAuth0Client(options: Auth0ClientOptions): Promise<Auth0Client> {
  return new Auth0Client(options);
} 