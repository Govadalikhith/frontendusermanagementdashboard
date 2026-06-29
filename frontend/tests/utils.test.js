import { describe, it, expect } from 'vitest';
import { validateEmail, validateUserForm } from '../src/utils/validators.js';
import { getInitials, truncateText, getDepartmentColor } from '../src/utils/helpers.js';

describe('Validation Engine Tests', () => {
  describe('validateEmail', () => {
    it('should return true for valid email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@company.co.in')).toBe(true);
      expect(validateEmail('admin+testing@domain.org')).toBe(true);
    });

    it('should return false for invalid email formats', () => {
      expect(validateEmail('testexample.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('test@com')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test @domain.com')).toBe(false);
    });
  });

  describe('validateUserForm', () => {
    it('should flag empty first and last names', () => {
      const emptyForm = {
        firstName: '',
        lastName: 'Smith',
        email: 'test@example.com',
        department: 'Engineering'
      };
      
      const errors = validateUserForm(emptyForm);
      expect(errors.firstName).toBeDefined();
      expect(errors.lastName).toBeUndefined();
    });

    it('should flag names shorter than 2 characters', () => {
      const shortForm = {
        firstName: 'J',
        lastName: 'Do',
        email: 'jd@example.com',
        department: 'Sales'
      };

      const errors = validateUserForm(shortForm);
      expect(errors.firstName).toBeDefined();
      expect(errors.lastName).toBeUndefined(); // 'Do' is 2 chars, so it should be fine
    });

    it('should flag invalid email structure', () => {
      const invalidEmailForm = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe.com',
        department: 'Marketing'
      };

      const errors = validateUserForm(invalidEmailForm);
      expect(errors.email).toBeDefined();
      expect(errors.email).toContain('Invalid Email');
    });

    it('should succeed with no errors for valid form inputs', () => {
      const validForm = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'Engineering'
      };

      const errors = validateUserForm(validForm);
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});

describe('Helper Utility Tests', () => {
  describe('getInitials', () => {
    it('should correctly extract initials', () => {
      expect(getInitials('John', 'Doe')).toBe('JD');
      expect(getInitials('eleanor', 'vance')).toBe('EV');
    });

    it('should handle missing first or last names', () => {
      expect(getInitials('', 'Doe')).toBe('D');
      expect(getInitials('John', '')).toBe('J');
      expect(getInitials('', '')).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate strings exceeding max length', () => {
      expect(truncateText('This is a very long string', 10)).toBe('This is a ...');
    });

    it('should preserve strings shorter than max length', () => {
      expect(truncateText('Short', 10)).toBe('Short');
    });
  });

  describe('getDepartmentColor', () => {
    it('should return styled HSL values for recognized departments', () => {
      const engStyle = getDepartmentColor('Engineering');
      expect(engStyle.color).toBe('#a78bfa');

      const saleStyle = getDepartmentColor('Sales');
      expect(saleStyle.color).toBe('#fbbf24');
    });

    it('should return fallback slate style for unrecognized departments', () => {
      const fallback = getDepartmentColor('OtherDept');
      expect(fallback.color).toBe('#cbd5e1');
    });
  });
});
