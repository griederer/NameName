import { env, isProduction, isDevelopment, isTest } from '../../../lib/config/env';

// Mock process.env
const originalEnv = process.env;

describe('Environment Configuration', () => {
  beforeEach(() => {
    // Reset modules and environment
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('env object', () => {
    it('should have NODE_ENV property', () => {
      expect(env).toHaveProperty('NODE_ENV');
    });

    it('should have NEXT_PUBLIC_API_URL property', () => {
      expect(env).toHaveProperty('NEXT_PUBLIC_API_URL');
    });

    it('should have NEXT_PUBLIC_FIREBASE_API_KEY property', () => {
      expect(env).toHaveProperty('NEXT_PUBLIC_FIREBASE_API_KEY');
    });

    it('should have NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN property', () => {
      expect(env).toHaveProperty('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
    });

    it('should have required Firebase configuration properties', () => {
      expect(env).toHaveProperty('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
      expect(env).toHaveProperty('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
      expect(env).toHaveProperty('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
      expect(env).toHaveProperty('NEXT_PUBLIC_FIREBASE_APP_ID');
    });

    it('should have OPENAI_API_KEY property', () => {
      expect(env).toHaveProperty('OPENAI_API_KEY');
    });
  });

  describe('Environment Detection', () => {
    describe('isProduction', () => {
      it('should return true when NODE_ENV is production', () => {
        process.env.NODE_ENV = 'production';
        // Need to re-import to get updated environment
        jest.isolateModules(() => {
          const { isProduction: prodCheck } = require('../../../lib/config/env');
          expect(prodCheck).toBe(true);
        });
      });

      it('should return false when NODE_ENV is not production', () => {
        process.env.NODE_ENV = 'development';
        jest.isolateModules(() => {
          const { isProduction: prodCheck } = require('../../../lib/config/env');
          expect(prodCheck).toBe(false);
        });
      });

      it('should return false when NODE_ENV is test', () => {
        process.env.NODE_ENV = 'test';
        jest.isolateModules(() => {
          const { isProduction: prodCheck } = require('../../../lib/config/env');
          expect(prodCheck).toBe(false);
        });
      });
    });

    describe('isDevelopment', () => {
      it('should return true when NODE_ENV is development', () => {
        process.env.NODE_ENV = 'development';
        jest.isolateModules(() => {
          const { isDevelopment: devCheck } = require('../../../lib/config/env');
          expect(devCheck).toBe(true);
        });
      });

      it('should return false when NODE_ENV is production', () => {
        process.env.NODE_ENV = 'production';
        jest.isolateModules(() => {
          const { isDevelopment: devCheck } = require('../../../lib/config/env');
          expect(devCheck).toBe(false);
        });
      });

      it('should return false when NODE_ENV is test', () => {
        process.env.NODE_ENV = 'test';
        jest.isolateModules(() => {
          const { isDevelopment: devCheck } = require('../../../lib/config/env');
          expect(devCheck).toBe(false);
        });
      });
    });

    describe('isTest', () => {
      it('should return true when NODE_ENV is test', () => {
        process.env.NODE_ENV = 'test';
        jest.isolateModules(() => {
          const { isTest: testCheck } = require('../../../lib/config/env');
          expect(testCheck).toBe(true);
        });
      });

      it('should return false when NODE_ENV is production', () => {
        process.env.NODE_ENV = 'production';
        jest.isolateModules(() => {
          const { isTest: testCheck } = require('../../../lib/config/env');
          expect(testCheck).toBe(false);
        });
      });

      it('should return false when NODE_ENV is development', () => {
        process.env.NODE_ENV = 'development';
        jest.isolateModules(() => {
          const { isTest: testCheck } = require('../../../lib/config/env');
          expect(testCheck).toBe(false);
        });
      });
    });
  });

  describe('Environment Variable Types', () => {
    it('should handle string environment variables', () => {
      process.env.NODE_ENV = 'test';
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
      
      jest.isolateModules(() => {
        const { env: testEnv } = require('../../../lib/config/env');
        expect(typeof testEnv.NODE_ENV).toBe('string');
        expect(typeof testEnv.NEXT_PUBLIC_API_URL).toBe('string');
      });
    });

    it('should handle undefined environment variables', () => {
      delete process.env.OPENAI_API_KEY;
      
      jest.isolateModules(() => {
        const { env: testEnv } = require('../../../lib/config/env');
        // Environment variables can be undefined
        expect(testEnv.OPENAI_API_KEY).toBeUndefined();
      });
    });
  });

  describe('Firebase Configuration', () => {
    it('should include all required Firebase config properties', () => {
      const firebaseKeys = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID'
      ];

      firebaseKeys.forEach(key => {
        expect(env).toHaveProperty(key);
      });
    });

    it('should handle Firebase config with actual values', () => {
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-app.firebaseapp.com';
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
      
      jest.isolateModules(() => {
        const { env: testEnv } = require('../../../lib/config/env');
        expect(testEnv.NEXT_PUBLIC_FIREBASE_API_KEY).toBe('test-api-key');
        expect(testEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN).toBe('test-app.firebaseapp.com');
        expect(testEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBe('test-project');
      });
    });
  });

  describe('API Configuration', () => {
    it('should handle API URL configuration', () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.babynames.com';
      
      jest.isolateModules(() => {
        const { env: testEnv } = require('../../../lib/config/env');
        expect(testEnv.NEXT_PUBLIC_API_URL).toBe('https://api.babynames.com');
      });
    });

    it('should handle OpenAI API key configuration', () => {
      process.env.OPENAI_API_KEY = 'sk-test123456789';
      
      jest.isolateModules(() => {
        const { env: testEnv } = require('../../../lib/config/env');
        expect(testEnv.OPENAI_API_KEY).toBe('sk-test123456789');
      });
    });
  });

  describe('Environment Validation', () => {
    it('should maintain type safety for environment variables', () => {
      // This test ensures that the env object maintains proper typing
      expect(typeof env.NODE_ENV).toBe('string');
      
      // For optional variables, they can be string or undefined
      const apiKey = env.OPENAI_API_KEY;
      expect(typeof apiKey === 'string' || typeof apiKey === 'undefined').toBe(true);
    });

    it('should handle empty string environment variables', () => {
      process.env.NEXT_PUBLIC_API_URL = '';
      
      jest.isolateModules(() => {
        const { env: testEnv } = require('../../../lib/config/env');
        expect(testEnv.NEXT_PUBLIC_API_URL).toBe('');
      });
    });
  });

  describe('Environment Consistency', () => {
    it('should maintain consistent environment state', () => {
      process.env.NODE_ENV = 'development';
      
      jest.isolateModules(() => {
        const config = require('../../../lib/config/env');
        expect(config.env.NODE_ENV).toBe('development');
        expect(config.isDevelopment).toBe(true);
        expect(config.isProduction).toBe(false);
        expect(config.isTest).toBe(false);
      });
    });

    it('should handle environment changes correctly', () => {
      // Test that environment detection is based on actual NODE_ENV value
      process.env.NODE_ENV = 'production';
      
      jest.isolateModules(() => {
        const config = require('../../../lib/config/env');
        expect(config.isProduction).toBe(true);
        expect(config.isDevelopment).toBe(false);
        expect(config.isTest).toBe(false);
      });
    });
  });

  describe('Export Structure', () => {
    it('should export env object', () => {
      expect(env).toBeDefined();
      expect(typeof env).toBe('object');
    });

    it('should export environment check functions', () => {
      expect(typeof isProduction).toBe('boolean');
      expect(typeof isDevelopment).toBe('boolean');
      expect(typeof isTest).toBe('boolean');
    });

    it('should have exactly one true environment flag', () => {
      const trueFlags = [isProduction, isDevelopment, isTest].filter(flag => flag === true);
      expect(trueFlags).toHaveLength(1);
    });
  });
});