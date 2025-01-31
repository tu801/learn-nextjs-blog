"use client";
import {
  Button,
  DarkThemeToggle,
  Navbar,
  TextInput,
  useThemeMode,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import AdminMenu from "./template/admin-menu";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Headers() {
  const { mode } = useThemeMode();
  const path = usePathname();
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [searchTerms, setSearchTerms] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchParamsFromUrl = urlParams.get("searchTerms");
    if (searchParamsFromUrl) {
      setSearchTerms(searchParamsFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = () => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerms", searchTerms);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

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
      <form onSubmit={handleSubmit()}>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
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
        {isSignedIn && user?.publicMetadata?.isAdmin ? <AdminMenu /> : ""}
      </Navbar.Collapse>
    </Navbar>
  );
}
