"use client"; // This makes the component a Client Component
import Link from "next/link";
import { useRouter } from "next/router";
import page from "./page.module.css";

// export const metadata = {
//   title: "App Router",
// };

export default function Page() {
  const router = useRouter();
  // const handleClick = () => {
  //   console.log("Link clicked!");
  //   // window.location.href = "/home";
  //   window.location.replace(`http://localhost:3000/home`);
  //   console.log("Link clicked!=>", window.location.href);
  // };
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default anchor behavior
    router.push("/new-page"); // Navigate to new page
  };
  return (
    <>
      <div className={page.menuBar}>
        <Link href="/" className={page.linkClass}>
          App Router
        </Link>
        <Link href="/home" className={page.linkClass}>
          Home
        </Link>
        <Link href="/about" className={page.linkClass}>
          About
        </Link>
        <a href="/new-page" onClick={handleClick}>
          Go to New Page
        </a>
      </div>
      <div className={page.content}>
        <h1>about</h1>
      </div>
    </>
  );
}
