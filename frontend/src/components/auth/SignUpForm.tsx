import { useState, FormEvent, ChangeEvent } from "react";
import { InputField, Link, Button } from "@/components/form";
import { validateFields } from "@/validations/formValidation";
import payloads from "@/constants/payloads";
import { useRegisterUser } from "@/hooks/useAuthMutation";
import { showToast } from "@/lib/toast";

const SignUpForm = () => {
  const { mutateAsync: registerUser, isPending: isLoading } = useRegisterUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  // Reusable event listener to dynamically map keys to values
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validateFields(formData, payloads.auth.register);

    if (!validation.isValid) {
      showToast.error(validation.message);
      return;
    }
    registerUser(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1527] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sign Up
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email and password to sign up!
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
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

          {/* Using our advanced custom reusable button */}
          <Button text="Sign Up" isLoading={isLoading} />
        </form>

        <p className="text-center text-sm text-slate-400">
          <Link
            message="Already have an account?"
            to="/signin"
            linkText="Sign In"
          />
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
