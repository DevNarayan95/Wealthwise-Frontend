import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert } from "../../../components/ui/alert/alert";
import { Button } from "../../../components/ui/button/button";
import { FieldError } from "../../../components/ui/field-error/field-error";
import { FieldLabel } from "../../../components/ui/field-label/field-label";
import { Input } from "../../../components/ui/input/input";
import { useAuth } from "../context/auth-context";
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";

interface LoginFormProps {
  onSuccess?: () => void;
}

function getLoginErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "Invalid email or password.";
    }

    if (!error.response) {
      return "Unable to connect to WealthWise. Check your connection and try again.";
    }
  }

  return "Unable to sign in right now. Please try again.";
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearErrors("root.server");

    try {
      await login({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      onSuccess?.();
    } catch (error: unknown) {
      setError("root.server", {
        type: "server",
        message: getLoginErrorMessage(error),
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errors.root?.server?.message && (
        <Alert variant="danger" role="alert">
          {errors.root.server.message}
        </Alert>
      )}

      <div>
        <FieldLabel htmlFor="email" required>
          Email address
        </FieldLabel>

        <Input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="you@example.com"
          error={Boolean(errors.email)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />

        {errors.email && (
          <div id="email-error">
            <FieldError>{errors.email.message}</FieldError>
          </div>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="password" required>
          Password
        </FieldLabel>

        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={Boolean(errors.password)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />

        {errors.password && (
          <div id="password-error">
            <FieldError>{errors.password.message}</FieldError>
          </div>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}
