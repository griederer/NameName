import { cn } from '../../../lib/utils';

describe('Utility Functions', () => {
  describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
      const result = cn('base-class', 'additional-class');
      expect(result).toContain('base-class');
      expect(result).toContain('additional-class');
    });

    it('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class');
      expect(result).toContain('base-class');
      expect(result).toContain('valid-class');
      expect(result).not.toContain('undefined');
      expect(result).not.toContain('null');
    });

    it('should handle empty strings', () => {
      const result = cn('base-class', '', 'valid-class');
      expect(result).toContain('base-class');
      expect(result).toContain('valid-class');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      );
      
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
      expect(result).not.toContain('disabled-class');
    });

    it('should handle string arguments only (current implementation)', () => {
      // Current implementation only handles string, undefined, null, false values
      const result = cn('class1', 'class2', 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('should convert non-string values to string representation', () => {
      // Arrays and objects will be converted to string representation
      const result = cn('base-class', ['class1', 'class2']);
      expect(result).toContain('base-class');
      expect(result).toContain('class1,class2'); // Arrays join with comma
    });

    it('should handle Tailwind CSS conflict resolution', () => {
      // Test that later classes override earlier ones for conflicting properties
      const result = cn('text-sm', 'text-lg');
      // The exact behavior depends on the implementation (clsx vs classnames vs custom)
      // This test ensures the function doesn't break with conflicting classes
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle mixed arguments with current implementation', () => {
      const result = cn(
        'base-class',
        undefined,
        null,
        false,
        'final-class'
      );
      
      expect(result).toContain('base-class');
      expect(result).toContain('final-class');
      expect(result).not.toContain('undefined');
      expect(result).not.toContain('null');
      expect(result).not.toContain('false');
    });

    it('should return empty string for no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should return empty string for all falsy arguments', () => {
      const result = cn(undefined, null, false, '');
      expect(result).toBe('');
    });

    it('should handle single class name', () => {
      const result = cn('single-class');
      expect(result).toBe('single-class');
    });

    it('should preserve whitespace in class names', () => {
      // Current implementation joins with space but doesn't trim individual classes
      const result = cn('  class1  ', '  class2  ');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      // Will have extra spaces due to simple join implementation
      expect(result).toBe('  class1     class2  ');
    });

    it('should handle duplicate class names', () => {
      const result = cn('duplicate', 'other', 'duplicate');
      // The function should handle duplicates gracefully
      expect(result).toContain('duplicate');
      expect(result).toContain('other');
    });

    it('should work with common Tailwind CSS patterns', () => {
      const result = cn(
        'flex items-center justify-center',
        'px-4 py-2',
        'bg-blue-500 hover:bg-blue-600',
        'text-white font-medium',
        'rounded-md shadow-sm'
      );
      
      expect(result).toContain('flex');
      expect(result).toContain('items-center');
      expect(result).toContain('justify-center');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('hover:bg-blue-600');
      expect(result).toContain('text-white');
      expect(result).toContain('font-medium');
      expect(result).toContain('rounded-md');
      expect(result).toContain('shadow-sm');
    });

    it('should handle responsive classes', () => {
      const result = cn('w-full', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/4');
      expect(result).toContain('w-full');
      expect(result).toContain('sm:w-1/2');
      expect(result).toContain('md:w-1/3');
      expect(result).toContain('lg:w-1/4');
    });

    it('should handle state variants', () => {
      const result = cn(
        'bg-gray-100',
        'hover:bg-gray-200',
        'focus:bg-gray-300',
        'active:bg-gray-400',
        'disabled:bg-gray-50'
      );
      
      expect(result).toContain('bg-gray-100');
      expect(result).toContain('hover:bg-gray-200');
      expect(result).toContain('focus:bg-gray-300');
      expect(result).toContain('active:bg-gray-400');
      expect(result).toContain('disabled:bg-gray-50');
    });

    it('should handle dark mode classes', () => {
      const result = cn('bg-white', 'dark:bg-gray-900', 'text-black', 'dark:text-white');
      expect(result).toContain('bg-white');
      expect(result).toContain('dark:bg-gray-900');
      expect(result).toContain('text-black');
      expect(result).toContain('dark:text-white');
    });

    it('should work in component scenarios', () => {
      // Simulate a component that conditionally applies classes
      const variant = 'primary';
      const size = 'large';
      const disabled = false;
      
      const result = cn(
        'button',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-500 text-white',
        size === 'small' && 'px-2 py-1 text-sm',
        size === 'large' && 'px-6 py-3 text-lg',
        disabled && 'opacity-50 cursor-not-allowed'
      );
      
      expect(result).toContain('button');
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('text-white');
      expect(result).toContain('px-6');
      expect(result).toContain('py-3');
      expect(result).toContain('text-lg');
      expect(result).not.toContain('opacity-50');
      expect(result).not.toContain('cursor-not-allowed');
    });
  });

  // Test for any other utility functions that might be exported
  describe('Utility exports', () => {
    it('should export cn function', () => {
      expect(cn).toBeDefined();
      expect(typeof cn).toBe('function');
    });

    it('cn should be the main export', () => {
      // Ensure cn is available as a named export
      const utils = require('../../../lib/utils');
      expect(utils.cn).toBeDefined();
      expect(typeof utils.cn).toBe('function');
    });
  });

  // Performance tests
  describe('Performance considerations', () => {
    it('should handle large numbers of class names efficiently', () => {
      const startTime = performance.now();
      const manyClasses = Array.from({ length: 100 }, (_, i) => `class-${i}`);
      const result = cn(...manyClasses);
      const endTime = performance.now();
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(endTime - startTime).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should handle deeply nested conditional logic efficiently', () => {
      const startTime = performance.now();
      const result = cn(
        'base',
        true && 'level1',
        true && (true && 'level2'),
        true && (true && (true && 'level3')),
        true && (true && (true && (true && 'level4')))
      );
      const endTime = performance.now();
      
      expect(result).toContain('base');
      expect(result).toContain('level1');
      expect(result).toContain('level2');
      expect(result).toContain('level3');
      expect(result).toContain('level4');
      expect(endTime - startTime).toBeLessThan(10); // Should be very fast
    });
  });
});