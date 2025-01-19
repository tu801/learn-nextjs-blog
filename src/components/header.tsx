"use client";
import {
  Button,
  DarkThemeToggle,
  Navbar,
  TextInput,
  useThemeMode,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";

export default function Headers() {
  const { mode } = useThemeMode();
  const path = usePathname();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image
          src="/logo.png"
          width={200}
          height={50}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
        />
      </form>
      <div className="flex gap-2 md:order-2">
        <DarkThemeToggle />
        <SignedIn>
          <UserButton
            appearance={{ baseTheme: mode === "dark" ? dark : undefined }}
          ></UserButton>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        </SignedOut>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href="/">
          <Navbar.Link active={path === "/"} as={"div"}>
            Home
          </Navbar.Link>
        </Link>
        <Link href="/about">
          <Navbar.Link active={path === "/about"} as={"div"}>
            About
          </Navbar.Link>
        </Link>
        <Link href="/project">
          <Navbar.Link active={path === "/project"} as={"div"}>
            Project
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
