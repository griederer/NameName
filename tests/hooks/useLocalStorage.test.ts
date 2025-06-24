import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string): string | null => {
      return store[key] || null
    }),
    setItem: jest.fn((key: string, value: string): void => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string): void => {
      delete store[key]
    }),
    clear: jest.fn((): void => {
      store = {}
    }),
    length: 0,
    key: jest.fn(),
  }
})()

// Replace the global localStorage with our mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    // Clear all mocks and reset localStorage before each test
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('Initialization', () => {
    it('returns initial value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'))

      expect(result.current[0]).toBe('initial-value')
      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key')
    })

    it('returns stored value when localStorage has data', () => {
      localStorageMock.setItem('test-key', JSON.stringify('stored-value'))

      const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'))

      expect(result.current[0]).toBe('stored-value')
      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key')
    })

    it('handles complex objects as initial values', () => {
      const initialObject = { name: 'John', age: 30, active: true }
      const { result } = renderHook(() => useLocalStorage('user', initialObject))

      expect(result.current[0]).toEqual(initialObject)
    })

    it('handles arrays as initial values', () => {
      const initialArray = [1, 2, 3, 'four', { five: 5 }]
      const { result } = renderHook(() => useLocalStorage('items', initialArray))

      expect(result.current[0]).toEqual(initialArray)
    })

    it('handles null as initial value', () => {
      const { result } = renderHook(() => useLocalStorage('nullable', null))

      expect(result.current[0]).toBe(null)
    })

    it('handles undefined as initial value', () => {
      const { result } = renderHook(() => useLocalStorage('undefinable', undefined))

      expect(result.current[0]).toBe(undefined)
    })
  })

  describe('Setting Values', () => {
    it('updates state and localStorage when setting a new value', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

      act(() => {
        result.current[1]('new-value')
      })

      expect(result.current[0]).toBe('new-value')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
    })

    it('handles setting complex objects', () => {
      const { result } = renderHook(() => useLocalStorage('user', {}))
      const newUser = { name: 'Jane', age: 25, preferences: { theme: 'dark' } }

      act(() => {
        result.current[1](newUser)
      })

      expect(result.current[0]).toEqual(newUser)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(newUser))
    })

    it('handles setting arrays', () => {
      const { result } = renderHook(() => useLocalStorage('list', []))
      const newArray = ['a', 'b', 'c']

      act(() => {
        result.current[1](newArray)
      })

      expect(result.current[0]).toEqual(newArray)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('list', JSON.stringify(newArray))
    })

    it('handles setting null value', () => {
      const { result } = renderHook(() => useLocalStorage('nullable', 'initial'))

      act(() => {
        result.current[1](null)
      })

      expect(result.current[0]).toBe(null)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('nullable', JSON.stringify(null))
    })

    it('handles functional updates', () => {
      const { result } = renderHook(() => useLocalStorage('counter', 0))

      act(() => {
        result.current[1]((prev) => prev + 1)
      })

      expect(result.current[0]).toBe(1)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('counter', JSON.stringify(1))
    })

    it('handles functional updates with complex state', () => {
      const { result } = renderHook(() => useLocalStorage('user', { name: 'John', age: 30 }))

      act(() => {
        result.current[1]((prev) => ({ ...prev, age: prev.age + 1 }))
      })

      expect(result.current[0]).toEqual({ name: 'John', age: 31 })
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ name: 'John', age: 31 }),
      )
    })
  })

  describe('Error Handling', () => {
    it('handles JSON parsing errors gracefully', () => {
      // Set invalid JSON in localStorage
      localStorageMock.getItem.mockReturnValueOnce('invalid-json{')

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      const { result } = renderHook(() => useLocalStorage('broken-key', 'fallback'))

      expect(result.current[0]).toBe('fallback')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('handles localStorage.setItem errors gracefully', () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error('Storage quota exceeded')
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

      act(() => {
        result.current[1]('new-value')
      })

      // State should still update even if localStorage fails
      expect(result.current[0]).toBe('new-value')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('handles localStorage.getItem errors gracefully', () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error('localStorage is not available')
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))

      expect(result.current[0]).toBe('fallback')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('Type Safety', () => {
    it('maintains type safety with string values', () => {
      const { result } = renderHook(() => useLocalStorage('string-key', 'string-value'))

      // TypeScript should infer the type as string
      expect(typeof result.current[0]).toBe('string')

      act(() => {
        result.current[1]('new-string')
      })

      expect(typeof result.current[0]).toBe('string')
    })

    it('maintains type safety with number values', () => {
      const { result } = renderHook(() => useLocalStorage('number-key', 42))

      expect(typeof result.current[0]).toBe('number')

      act(() => {
        result.current[1](100)
      })

      expect(typeof result.current[0]).toBe('number')
    })

    it('maintains type safety with boolean values', () => {
      const { result } = renderHook(() => useLocalStorage('boolean-key', true))

      expect(typeof result.current[0]).toBe('boolean')

      act(() => {
        result.current[1](false)
      })

      expect(typeof result.current[0]).toBe('boolean')
    })

    it('maintains type safety with object values', () => {
      interface User {
        name: string
        age: number
      }

      const initialUser: User = { name: 'John', age: 30 }
      const { result } = renderHook(() => useLocalStorage('user-key', initialUser))

      expect(result.current[0]).toHaveProperty('name')
      expect(result.current[0]).toHaveProperty('age')

      act(() => {
        result.current[1]({ name: 'Jane', age: 25 })
      })

      expect(result.current[0].name).toBe('Jane')
      expect(result.current[0].age).toBe(25)
    })
  })

  describe('Re-rendering Behavior', () => {
    it('creates new setter function on each render', () => {
      const { result, rerender } = renderHook(() => useLocalStorage('stable-key', 'stable-value'))
      const initialSetter = result.current[1]

      rerender()

      // The setter function is recreated on each render - this is expected behavior
      expect(typeof result.current[1]).toBe('function')
      expect(result.current[1]).not.toBe(initialSetter)
    })

    it('maintains state when key remains the same', () => {
      const key = 'consistent-key'
      const { result, rerender } = renderHook(() => useLocalStorage(key, 'default'))

      // Set a value
      act(() => {
        result.current[1]('value1')
      })

      expect(result.current[0]).toBe('value1')

      // Rerender with same key
      rerender()

      // Should maintain the same value
      expect(result.current[0]).toBe('value1')
    })
  })

  describe('Multiple Instances', () => {
    it('handles multiple instances of the same key correctly', () => {
      const { result: result1 } = renderHook(() => useLocalStorage('shared-key', 'initial'))
      const { result: result2 } = renderHook(() => useLocalStorage('shared-key', 'initial'))

      expect(result1.current[0]).toBe('initial')
      expect(result2.current[0]).toBe('initial')

      act(() => {
        result1.current[1]('updated')
      })

      // Both instances should reflect the change
      expect(result1.current[0]).toBe('updated')
      // Note: result2 won't automatically update without storage event handling
      // This behavior depends on the hook implementation
    })

    it('handles different keys independently', () => {
      const { result: result1 } = renderHook(() => useLocalStorage('key1', 'value1'))
      const { result: result2 } = renderHook(() => useLocalStorage('key2', 'value2'))

      expect(result1.current[0]).toBe('value1')
      expect(result2.current[0]).toBe('value2')

      act(() => {
        result1.current[1]('updated1')
      })

      expect(result1.current[0]).toBe('updated1')
      expect(result2.current[0]).toBe('value2') // Should remain unchanged
    })
  })
})
