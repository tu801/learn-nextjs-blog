import { Navbar } from "flowbite-react";
import React from "react";

export default function AdminMenu() {
  return (
    <>
      <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
      <Navbar.Link href="/dashboard/create-post">Create Post</Navbar.Link>
    </>
  );
}
