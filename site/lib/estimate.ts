import { z } from "zod";
import { services } from "@/lib/data";

export const serviceOptions = services.map((s) => s.title);

// Shared client/server validation. The server re-validates everything.
const clean = (max: number) =>
  z.string().trim().max(max).transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, ""));

export const estimateSchema = z.object({
  name: clean(100).pipe(z.string().min(2, "Please enter your name")),
  phone: clean(30).pipe(z.string().regex(/^[0-9+()\-.\s]{7,30}$/, "Enter a valid phone number")),
  email: z.string().trim().max(160).email("Enter a valid email address"),
  address: clean(200).pipe(z.string().min(3, "Enter the property address or city")),
  service: z.enum(serviceOptions as [string, ...string[]], { message: "Choose a service" }),
  message: clean(2000).optional().default(""),
  consent: z.literal(true, { message: "Please agree to be contacted" }),
  website: z.string().max(0).optional().default(""), // honeypot: must stay empty
});

export type EstimateInput = z.input<typeof estimateSchema>;
