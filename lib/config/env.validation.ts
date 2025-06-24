/**
 * Environment validation to ensure all required variables are set
 * This runs at build time to catch configuration errors early
 */

type EnvVar = {
  name: string
  required: boolean
  type: 'string' | 'number' | 'boolean'
  pattern?: RegExp
}

const envVars: EnvVar[] = [
  // Firebase Client
  { name: 'NEXT_PUBLIC_FIREBASE_API_KEY', required: true, type: 'string' },
  { name: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', required: true, type: 'string' },
  { name: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', required: true, type: 'string' },
  { name: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', required: true, type: 'string' },
  { name: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', required: true, type: 'string' },
  { name: 'NEXT_PUBLIC_FIREBASE_APP_ID', required: true, type: 'string' },

  // Firebase Admin (Server-side)
  { name: 'FIREBASE_ADMIN_PROJECT_ID', required: true, type: 'string' },
  { name: 'FIREBASE_ADMIN_PRIVATE_KEY', required: true, type: 'string' },
  { name: 'FIREBASE_ADMIN_CLIENT_EMAIL', required: true, type: 'string' },

  // LLM - At least one required
  { name: 'OPENAI_API_KEY', required: false, type: 'string' },
  { name: 'ANTHROPIC_API_KEY', required: false, type: 'string' },

  // Vector Database
  { name: 'PINECONE_API_KEY', required: true, type: 'string' },
  { name: 'PINECONE_ENVIRONMENT', required: true, type: 'string' },
  { name: 'PINECONE_INDEX_NAME', required: false, type: 'string' },

  // Application
  { name: 'NEXT_PUBLIC_APP_URL', required: false, type: 'string' },
  { name: 'NEXT_PUBLIC_DEFAULT_CREDITS', required: false, type: 'number' },
  { name: 'NEXT_PUBLIC_CREDIT_COST_PER_QUERY', required: false, type: 'number' },

  // External APIs
  { name: 'BEHIND_THE_NAME_API_KEY', required: false, type: 'string' },

  // Analytics
  { name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID', required: false, type: 'string' },

  // Rate Limiting
  { name: 'RATE_LIMIT_PER_MINUTE', required: false, type: 'number' },
  { name: 'RATE_LIMIT_PER_HOUR', required: false, type: 'number' },
]

export function validateEnv(): void {
  const errors: string[] = []

  // Check each environment variable
  envVars.forEach((envVar) => {
    const value = process.env[envVar.name]

    // Check if required variable is missing
    if (envVar.required && !value) {
      errors.push(`Missing required environment variable: ${envVar.name}`)
      return
    }

    // Skip validation if optional and not provided
    if (!envVar.required && !value) {
      return
    }

    // Type validation
    if (value) {
      switch (envVar.type) {
        case 'number':
          if (isNaN(Number(value))) {
            errors.push(`${envVar.name} must be a number, got: ${value}`)
          }
          break
        case 'boolean':
          if (value !== 'true' && value !== 'false') {
            errors.push(`${envVar.name} must be 'true' or 'false', got: ${value}`)
          }
          break
        case 'string':
          // Pattern validation if specified
          if (envVar.pattern && !envVar.pattern.test(value)) {
            errors.push(`${envVar.name} does not match required pattern`)
          }
          break
      }
    }
  })

  // Check that at least one LLM API key is provided
  if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    errors.push('At least one LLM API key is required (OPENAI_API_KEY or ANTHROPIC_API_KEY)')
  }

  // If there are errors, throw them
  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`)
  }
}

// Only validate in non-test environments
if (process.env.NODE_ENV !== 'test') {
  validateEnv()
}
