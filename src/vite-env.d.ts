/// <reference types="vite/client" />
//
interface ImportMetaEnv {
  readonly MAIN_VITE_GOOGLE_API_KEY: string;
  readonly MAIN_VITE_DATABASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
