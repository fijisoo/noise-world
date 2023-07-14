export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'de', 'pl', 'ar', 'it', 'zh', 'ja', 'vi', 'fr', 'es', 'tr'],
} as const

export type Locale = (typeof i18n)['locales'][number]