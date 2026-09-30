import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FolderKanbanIcon,
  ShieldCheckIcon,
  HardDriveIcon,
  UserIcon,
  MailIcon,
  LockIcon,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const Login = ({ mode = "login" }) => {
  const isRegister = mode === "register";
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {};

  return (
    <div className="min-h-screen text-zinc-900 flex flex-col md:flex-row">
      {/* ;eft hero brand panel  */}
      <div className="md:w-1/2 p-8 md:p-12 lg:p-16 bg-[#F9F6F0] border-b md:border-b-0 md:border-r border-[#E5DEC9] flex flex-col justify-between relative overflow-hidden min-h-[400px] md:min-h-screen">
        <div className="absolute inset-0 bg-[url('/pattern.svg')]"> </div>
        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.svg" alt="Velum logo" className="max-h-9" />
          <span className="text-4xl font-medium uppercase text-zinc-900">
            Velum
          </span>
        </div>

        <div className="relative z-0 my-12 space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900 leading-tight">
            {" "}
            Secure, Simple & Fast
            <br />
            <span className="text-[#C49A6C]">Cloud Storage.</span>
          </h2>
          <p className="text-sm text-[#8C7A6B] leading-relaxed mb-8">
            Store, organize, and share your essential work with zero clutter.
            Designed with speed and security at its core.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-[#2B211B]">
              <div className="p-2 rounded-lg bg-white border border-[#E5DEC9] text-[#C49A6C]">
                <ShieldCheckIcon className="size-4" />
              </div>
              <span>End-to-end access controls & permission management</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#2B211B]">
              <div className="p-2 rounded-lg bg-white border border-[#E5DEC9] text-[#C49A6C]">
                <FolderKanbanIcon className="size-4" />
              </div>
              <span>Structured workspace organization and smart tags</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#2B211B]">
              <div className="p-2 rounded-lg bg-white border border-[#E5DEC9] text-[#C49A6C]">
                <HardDriveIcon className="size-4" />
              </div>
              <span>Instant previewing and seamless file transfers</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 text-xs text-[#8C7A6B]">
          © {new Date().getFullYear()} Velum Inc. All rights reserved.
        </div>
      </div>

      {/* left auth form */}
      <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center bg-white">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-2xl font-medium text-zinc-900">
            <h3 className="text-2xl">
              {isRegister ? "Create and account" : "Welcome back"}
            </h3>
            <p>
              {isRegister
                ? "Enter your details below to get started with 1 GB fre storage"
                : "Enter your credentials to access your Drive"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <Input
                label="Full Name"
                icon={UserIcon}
                placeholder="John Doe"
                value={form.name}
                onchange={(e) => updateField("name", e.target.value)}
                required
              />
            )}
            <Input
              label="Email Addres"
              type="email"
              icon={MailIcon}
              placeholder="you@example.email Doe"
              value={form.email}
              onchange={(e) => updateField("email", e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={LockIcon}
              placeholder="........."
              value={form.email}
              onchange={(e) => updateField("password", e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              isLoading={isLoading}
            >
              <span className="font-medium text-base">
                {isRegister ? "Registered Account" : "Sign In"}
              </span>
            </Button>
          </form>

          <div className="text-center pt-2">
            {isRegister ? (
              <p className="text-xs text-zinc-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Sign in here
                </Link>{" "}
              </p>
            ) : (
              <p className="text-xs text-zinc-500">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Create account
                </Link>{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
