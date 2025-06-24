/**
 * Environment configuration with type safety
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value || defaultValue || ''
}

// Environment variables object for test compatibility
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
}

// Environment flags
export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV === 'test'

export const config = {
  // Firebase Client Config
  firebase: {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', 'test-api-key'),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'test.firebaseapp.com'),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'test-project'),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'test-project.appspot.com'),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '123456789'),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', '1:123456789:web:abcdef123456'),
  },

  // Firebase Admin (Server-side only)
  firebaseAdmin: {
    projectId: getEnvVar('FIREBASE_ADMIN_PROJECT_ID', 'test-project'),
    privateKey: getEnvVar('FIREBASE_ADMIN_PRIVATE_KEY', 'test-private-key').replace(/\\n/g, '\n'),
    clientEmail: getEnvVar('FIREBASE_ADMIN_CLIENT_EMAIL', 'test@test.iam.gserviceaccount.com'),
  },

  // LLM Configuration
  llm: {
    openaiApiKey: process.env.OPENAI_API_KEY || 'sk-test123456789',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    provider: process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'openai',
  },

  // Vector Database
  pinecone: {
    apiKey: getEnvVar('PINECONE_API_KEY', 'test-pinecone-key'),
    environment: getEnvVar('PINECONE_ENVIRONMENT', 'test-env'),
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
  isDevelopment,
  isProduction,
  isTest,
}

// Type exports for use in other files
export type Config = typeof config
export type FirebaseConfig = typeof config.firebase
export type LLMConfig = typeof config.llm
export type AppConfig = typeof config.app
