import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

export default function UserLogin() {
  return (
    <>
      <Link href="/sign-in">
        <Button gradientDuoTone="purpleToBlue" outline>
          Sign In
        </Button>
      </Link>
    </>
  );
}
