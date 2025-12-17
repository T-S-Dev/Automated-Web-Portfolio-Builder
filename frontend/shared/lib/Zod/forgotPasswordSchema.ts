import { z } from "zod";

export const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .nonempty("Email/Username is required")
    .refine(
      (val) => {
        if (val.includes("@")) {
          return z.email().safeParse(val).success;
        }
        return val.length >= 4;
      },
      { message: "Enter a valid email or username (min 4 characters)" },
    ),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  code: z.string().min(6, "Code must be 6 characters"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
