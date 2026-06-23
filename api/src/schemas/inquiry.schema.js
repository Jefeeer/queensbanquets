import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  meetingDate: z.string().optional(),
  eventDate: z.string().optional(),
  coordinationNeed: z.string().trim().optional(),
  guests: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce.number().int().positive().optional(),
  ),
  message: z.string().trim().max(2000).optional(),
});
