import { Button } from "@/components/ui/button";
import Image from "next/image";
import Home from "./(home)";
import Header from "@/components/__component/Header";

export default function page() {
  return (
    <main className="">
      <Header />
      <Home />
    </main>
  );
}
