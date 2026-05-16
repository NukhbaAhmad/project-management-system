import { ChangeEvent, FormEvent, useState } from "react";
import { Button, InputField, Link } from "@/components/form";
import { validateFields } from "@/validations/formValidation";
import payloads from "@/constants/payloads";
import { showToast } from "@/lib/toast";
import { useLoginUser } from "@/hooks/useAuthMutation";

const SignInForm = () => {
  const { mutateAsync: loginUser, isPending: isLoading } = useLoginUser();
  const [formData, setFormData] = useState({
    password: "",
    identifier: "",
  });

  // Reusable event listener to dynamically map keys to values
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validateFields(formData, payloads.auth.login);

    if (!validation.isValid) {
      showToast.error(validation.message);
      return;
    }
    loginUser(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1527] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sign In
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email and password to sign in!
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-slate-800"></div>
          </div>
        </div>

        {/* Credentials Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <InputField
            id="identifier"
            label="Username/Email"
            type="text"
            placeholder="Enter your email/username"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <Button text="Sign In" isLoading={isLoading} />
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400">
          <Link
            message="Don't have an account?"
            to="/signup"
            linkText="Sign Up"
          />
        </p>
      </div>
    </div>
  );
};
export default SignInForm;
