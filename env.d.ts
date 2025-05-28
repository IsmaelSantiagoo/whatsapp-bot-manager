namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;

    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_API_URL: string;

    NEXT_PUBLIC_DEFAULT_LOGIN_REDIRECT: string;
    NEXT_PUBLIC_DEFAULT_LOGOUT_REDIRECT: string;

    GOOGLE_REDIRECT_URI: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}
