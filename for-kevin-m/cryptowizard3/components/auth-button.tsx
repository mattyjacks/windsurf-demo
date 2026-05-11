"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth-context";
import { LogoutButton } from "./logout-button";

export function AuthButton() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-300">Hey, {user.name}!</span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
