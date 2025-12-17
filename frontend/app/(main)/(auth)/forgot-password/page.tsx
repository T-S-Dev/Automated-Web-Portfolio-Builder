import { KeyRound } from "lucide-react";
import Link from "next/link";
import ForgotPasswordForm from "@/features/auth/components/ForgotPaswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex w-[500px] flex-col gap-y-4">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <KeyRound className="mx-auto h-8 w-8" aria-hidden="true" />
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="text-center text-sm">
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;