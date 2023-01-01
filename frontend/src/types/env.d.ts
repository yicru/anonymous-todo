declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string
    readonly NEXT_PUBLIC_APP_ORIGIN: string
  }
}
