import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/app/auth/_hooks/use-auth";
import { Button } from "@/app/_components/ui/button";
import { FormInput } from "@/app/_components/ui/form-input";
import { Spinner } from "@/app/_components/ui/spinner";

const loginSchema = z.object({
    email: z
        .email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const { success, error } = await login(data);

        if (success) {
            navigate("/dashboard", { replace: true });
        } else {
            setError("root", { message: error });
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm space-y-4">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sign In</h1>
        <p className="text-sm text-slate-500">Sign in to your backoffice account</p>
      </div>

      {/* Submit Error (root) */}
      {errors?.root && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errors?.root?.message}
        </div>
      )}

      <FormInput
        label="Email"
        type="email"
        placeholder="admin@example.com"
        error={errors?.email?.message}
        {...register('email')}
      />

      <FormInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors?.password?.message}
        {...register('password')}
      />

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-slate-900" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Spinner /> Processing...
          </span>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
}
