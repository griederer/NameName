/**
 * Core type definitions for Baby Name Advisor
 */

// User preferences for name selection
export interface NamePreferences {
  gender: 'boy' | 'girl' | 'neutral' | 'both'
  culturalBackground?: string[]
  languages: ('english' | 'spanish' | 'both')[]
  surname: string
  style: 'traditional' | 'modern' | 'unique' | 'mixed'
  popularityPreference: 'popular' | 'uncommon' | 'balanced'
  yearRange?: {
    start: number
    end: number
  }
}

// Name data structure
export interface Name {
  name: string
  gender: 'boy' | 'girl' | 'neutral'
  origin: string
  meaning: string
  popularity: {
    year: number
    rank: number
    count: number
  }[]
  pronunciations: {
    english?: string
    spanish?: string
  }
  nicknames: string[]
  famousPeople?: string[]
  culturalVariations?: {
    language: string
    variation: string
  }[]
}

// Chat message types
export interface ChatMessage {
  id: string
  type: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  suggestions?: NameSuggestion[]
  credits?: number
}

// Name suggestion with reasoning
export interface NameSuggestion {
  name: Name
  score: number
  reasons: string[]
  phoneticMatch: number
  nicknameOptions: string[]
  alternativeSpellings?: string[]
}

// User session data
export interface UserSession {
  id: string
  preferences?: NamePreferences
  credits: number
  messages: ChatMessage[]
  favoriteNames: string[]
  createdAt: Date
  lastActivity: Date
}

// API Response types
export interface APIResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  credits?: number
}

// Phonetic analysis
export interface PhoneticAnalysis {
  metaphone: string
  soundex: string
  syllables: number
  stress: number[]
  rhymePattern: string
}

// Name generation options
export interface NameGenerationOptions {
  type: 'blend' | 'new' | 'similar'
  sourceNames?: string[]
  constraints: {
    minLength: number
    maxLength: number
    startsWith?: string
    endsWith?: string
    avoidSounds?: string[]
  }
}

// Analytics events
export interface AnalyticsEvent {
  type: 'search' | 'suggestion_click' | 'favorite' | 'generation'
  data: Record<string, unknown>
  timestamp: Date
}

// Error types
export type AppError = {
  code: string
  message: string
  details?: unknown
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Rate limiting
export interface RateLimit {
  count: number
  windowStart: number
  windowEnd: number
}
