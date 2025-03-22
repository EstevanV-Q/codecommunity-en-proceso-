declare module '@auth0/auth0-spa-js' {
  export interface Auth0ClientOptions {
    domain: string;
    clientId: string;
    redirectUri?: string;
    audience?: string;
    scope?: string;
    useRefreshTokens?: boolean;
    cacheLocation?: 'memory' | 'localstorage';
    authorizationParams?: {
      redirect_uri?: string;
      audience?: string;
      scope?: string;
      [key: string]: any;
    };
  }

  export interface Auth0User {
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: string;
    updated_at?: string;
    sub?: string;
    [key: string]: any;
  }

  export interface Auth0Client {
    loginWithRedirect(options?: any): Promise<void>;
    loginWithPopup(options?: any): Promise<void>;
    getUser(): Promise<Auth0User | undefined>;
    getIdTokenClaims(): Promise<any>;
    getTokenSilently(options?: any): Promise<string>;
    getTokenWithPopup(options?: any): Promise<string>;
    logout(options?: any): void;
    isAuthenticated(): Promise<boolean>;
    handleRedirectCallback(url?: string): Promise<any>;
  }

  export function createAuth0Client(options: Auth0ClientOptions): Promise<Auth0Client>;
} 