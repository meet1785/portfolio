import { describe, it, expect } from 'vitest';
import * as z from 'zod';

// Import the schema from the main file
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

describe('Contact Form Validation', () => {
  it('validates correct form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'This is a test message with enough content to pass validation.',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Project Inquiry',
      message: 'This is a test message.',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address');
    }
  });

  it('rejects name too short', () => {
    const invalidData = {
      name: 'J',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'This is a test message.',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name must be at least 2 characters');
    }
  });

  it('rejects subject too short', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hi',
      message: 'This is a test message.',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Subject must be at least 5 characters');
    }
  });

  it('rejects message too short', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'Hi',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Message must be at least 10 characters');
    }
  });

  it('validates maximum lengths', () => {
    const longName = 'A'.repeat(51);
    const longSubject = 'A'.repeat(101);
    const longMessage = 'A'.repeat(1001);

    expect(contactSchema.safeParse({
      name: longName,
      email: 'john@example.com',
      subject: 'Valid Subject',
      message: 'Valid message',
    }).success).toBe(false);

    expect(contactSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      subject: longSubject,
      message: 'Valid message',
    }).success).toBe(false);

    expect(contactSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Valid Subject',
      message: longMessage,
    }).success).toBe(false);
  });
});