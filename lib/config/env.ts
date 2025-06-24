/**
 * Environment configuration with type safety
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const config = {
  // Firebase Client Config
  firebase: {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY'),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID'),
  },

  // Firebase Admin (Server-side only)
  firebaseAdmin: {
    projectId: getEnvVar('FIREBASE_ADMIN_PROJECT_ID'),
    privateKey: getEnvVar('FIREBASE_ADMIN_PRIVATE_KEY', '').replace(/\\n/g, '\n'),
    clientEmail: getEnvVar('FIREBASE_ADMIN_CLIENT_EMAIL'),
  },

  // LLM Configuration
  llm: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    provider: process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'openai',
  },

  // Vector Database
  pinecone: {
    apiKey: getEnvVar('PINECONE_API_KEY'),
    environment: getEnvVar('PINECONE_ENVIRONMENT'),
    indexName: getEnvVar('PINECONE_INDEX_NAME', 'baby-names-index'),
  },

  // Application Settings
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    defaultCredits: parseInt(getEnvVar('NEXT_PUBLIC_DEFAULT_CREDITS', '3000')),
    creditCostPerQuery: parseInt(getEnvVar('NEXT_PUBLIC_CREDIT_COST_PER_QUERY', '10')),
  },

  // External APIs
  externalApis: {
    behindTheNameApiKey: process.env.BEHIND_THE_NAME_API_KEY,
  },

  // Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },

  // Rate Limiting
  rateLimit: {
    perMinute: parseInt(getEnvVar('RATE_LIMIT_PER_MINUTE', '20')),
    perHour: parseInt(getEnvVar('RATE_LIMIT_PER_HOUR', '100')),
  },

  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
}

// Type exports for use in other files
export type Config = typeof config
export type FirebaseConfig = typeof config.firebase
export type LLMConfig = typeof config.llm
export type AppConfig = typeof config.app
