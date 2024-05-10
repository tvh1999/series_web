import React from "react";
import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return <SignUp path="/sign-up" />;
}

export default SignUpPage;
