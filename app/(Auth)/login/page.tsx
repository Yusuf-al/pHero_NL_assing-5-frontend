"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionState, loginAction } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";


export const initialState: ActionState = { success: false, message: "" };

export default function LoginPage() {

  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
      router.push('/home')
    } else {
      toast.error(state.message)
    }

  }, [state])
  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" action={formAction}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {isPending ? <>
                <Spinner data-icon="inline-start" />
                Please wait
              </> : "Sign in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?
            <Link href="/registration" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}