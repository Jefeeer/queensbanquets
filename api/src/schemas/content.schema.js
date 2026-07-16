import { z } from 'zod';

const contactChannelSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
}).passthrough();

const packageFeatureSchema = z.union([
  z.string(),
  z.object({
    text: z.string(),
    included: z.boolean().optional(),
  }).passthrough(),
]);

const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  event: z.string(),
  photoUrl: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  featured: z.boolean().optional(),
}).passthrough();

const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  image: z.string().optional(),
  price: z.string().optional(),
  eyebrow: z.string().optional(),
  iconName: z.string().optional(),
  colSpan: z.string().optional(),
}).passthrough();

export const landingContentSchema = z.object({
  navigationItems: z.array(z.object({ label: z.string(), href: z.string() }).passthrough()),
  brand: z.object({
    name: z.string(),
    owner: z.string(),
    logo: z.string().optional(),
    tagline: z.string().optional(),
  }).passthrough(),
  heroContent: z.object({
    eyebrow: z.string(),
    title: z.string(),
    copy: z.string(),
    primaryCta: z.string().optional(),
    secondaryCta: z.string().optional(),
  }).passthrough(),
  highlights: z.array(z.object({ value: z.string(), label: z.string() }).passthrough()).optional().default([]),
  services: z.array(serviceSchema),
  servicesContent: z.object({
    heroTitle: z.string().optional(),
    heroCopy: z.string().optional(),
  }).passthrough().optional(),
  galleryMoments: z.array(z.string()).optional().default([]),
  packages: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      features: z.array(packageFeatureSchema),
      featured: z.boolean().optional(),
    }).passthrough(),
  ),
  experienceContent: z.object({
    panelQuote: z.string().optional(),
    photoUrl: z.string().optional(),
    narrativeTitle: z.string().optional(),
    mission: z.string().optional(),
    brandImages: z.array(z.string()).optional(),
  }).passthrough(),
  experiencePoints: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
    }).passthrough(),
  ),
  testimonials: z.array(testimonialSchema),
  contactChannels: z.array(contactChannelSchema),
  contactContent: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
    successMessage: z.string(),
  }).passthrough(),
  footerContent: z.object({
    tagline: z.string().optional(),
    address: z.string().optional(),
    mapsUrl: z.string().optional(),
  }).passthrough().optional(),
  adminProfile: z.object({
    displayName: z.string().optional(),
    role: z.string().optional(),
    email: z.string().optional(),
    avatar: z.string().optional(),
  }).passthrough().optional(),
}).passthrough();
