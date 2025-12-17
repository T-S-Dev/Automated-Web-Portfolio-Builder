"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordForm,
  type ResetPasswordForm,
} from "@/shared/lib/Zod/forgotPasswordSchema";

import { EmailCodeFactor } from "@clerk/types";

const ForgotPasswordForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const searchParams = useSearchParams();
  const identifierParam = searchParams.get("identifier");

  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form 1: Request Password Reset (Identifier)
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: identifierErrors },
    setError: setIdentifierError,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: identifierParam || "" },
  });

  // Form 2: Reset Password (Code + New Password)
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
    setError: setResetError,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onRequestReset = async (data: ForgotPasswordForm) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);

      // Find the user's account (by username OR email)
      const result = await signIn.create({
        identifier: data.identifier,
      });

      const resetFactor = result.supportedFirstFactors?.find(
        (factor): factor is EmailCodeFactor => factor.strategy === "reset_password_email_code",
      );

      if (!resetFactor) {
        // username exists but has no email linked
        toast.error("No email verification method found for this account.");
        return;
      }

      // Trigger the email code using the specific email ID found
      await signIn.prepareFirstFactor({
        strategy: "reset_password_email_code",
        emailAddressId: resetFactor.emailAddressId,
      });

      setSuccessfulCreation(true);
      toast.success("Verification code sent to your email.");
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          setIdentifierError("identifier", {
            type: "manual",
            message: error.longMessage || error.message,
          });
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async (data: ResetPasswordForm) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Password reset successfully.");
        router.push("/dashboard");
      } else {
        console.error(result);
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          const param = error.meta?.paramName;
          if (param === "code") {
            setResetError("code", { type: "manual", message: "Invalid verification code." });
          } else if (param === "password") {
            setResetError("password", { type: "manual", message: error.message });
          } else {
            setResetError("root", { type: "manual", message: error.longMessage || error.message });
            toast.error(error.longMessage || error.message);
          }
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!successfulCreation) {
    return (
      <form key="reset-step-1" onSubmit={handleSubmitEmail(onRequestReset)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email/Username
          </label>
          <input id="email" {...registerEmail("identifier")} placeholder="name@example.com" autoFocus />
          {identifierErrors.identifier && (
            <p className="ml-1 text-sm text-red-500">{identifierErrors.identifier.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>
    );
  }

  return (
    <form key="reset-step-2" onSubmit={handleSubmitReset(onResetPassword)} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="code" className="text-sm font-medium">
          Verification Code
        </label>
        <input id="code" {...registerReset("code")} type="text" placeholder="Enter 6-digit code" autoFocus />
        {resetErrors.code && <p className="ml-1 text-sm text-red-500">{resetErrors.code.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          New Password
        </label>
        <input id="password" {...registerReset("password")} type="password" placeholder="••••••••" />
        {resetErrors.password && <p className="ml-1 text-sm text-red-500">{resetErrors.password.message}</p>}
      </div>

      {resetErrors.root && <p className="ml-1 text-sm text-red-500">{resetErrors.root.message}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
