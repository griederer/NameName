/* eslint-disable @typescript-eslint/no-var-requires */
require('@testing-library/jest-dom');

// Load test environment variables
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api';
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test-project.appspot.com';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '123456789';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = '1:123456789:web:abcdef123456';
process.env.OPENAI_API_KEY = 'sk-test123456789';
process.env.FIREBASE_ADMIN_PROJECT_ID = 'test-project';
process.env.FIREBASE_ADMIN_PRIVATE_KEY = 'test-private-key';
process.env.FIREBASE_ADMIN_CLIENT_EMAIL = 'test@test.iam.gserviceaccount.com';
process.env.PINECONE_API_KEY = 'test-pinecone-key';
process.env.PINECONE_ENVIRONMENT = 'test-env';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_DEFAULT_CREDITS = '3000';
process.env.NEXT_PUBLIC_CREDIT_COST_PER_QUERY = '10';
process.env.RATE_LIMIT_PER_MINUTE = '20';
process.env.RATE_LIMIT_PER_HOUR = '100';

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;