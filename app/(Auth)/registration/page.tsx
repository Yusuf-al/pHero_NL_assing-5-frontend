"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { registrationAction } from "../_actions/authAction";
import { initialState } from "../login/page";


export default function RegisterPage() {
  const [role, setRole] = useState("TENANT");
  const [state,formAction,isPending] = useActionState(registrationAction,initialState )

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword]= useState('')

 const checkPassword = (e: React.FormEvent<HTMLFormElement>) => {
  if (password !== confirmPassword) {
    e.preventDefault();
    toast.error("Passwords do not match");
  }
};

useEffect(()=>{
  console.log(state, "from page")
   if (!state.message) return; 

  if (state.success) {
    toast.success(state.message);
  } else {
    toast.error(state.message);
  }

},[state])


  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            Create an account
          </CardTitle>

          <CardDescription>
            Register to access your rental marketplace account.
          </CardDescription>
        </CardHeader>


        <CardContent>
          <form 
            onSubmit={checkPassword}
            action={formAction}
            className="space-y-5"
          >

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name
              </Label>

              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
              />
            </div>


            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>


            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
            </div>


            {/* Role */}
            <div className="space-y-2">
              <Label>
                Account Type
              </Label>

              <Select
                value={role}
                name="role"
                onValueChange={setRole}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="TENANT">
                    Tenant
                  </SelectItem>

                  <SelectItem value="LANDLORD">
                    Landlord
                  </SelectItem>
                </SelectContent>

              </Select>
            </div>


            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number
              </Label>

              <Input
                id="phone"
                name="phone"
                placeholder="+8801XXXXXXXXX"
              />
            </div>


            {/* Profile Image */}
            <div className="space-y-2">
              <Label htmlFor="profileImage">
                Profile Image URL
              </Label>

              <Input
                id="profileImage"
                name="profileImage"
                placeholder="https://example.com/image.jpg"
              />
            </div>


            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">
                Address
              </Label>

              <Textarea
                id="address"
                name="address"
                placeholder="Enter your address"
              />
            </div>


            <Button
              type="submit"
              className="w-full"
            >
              {
                isPending ? "Creating...": "Create Account"
              }
              
            </Button>


            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}