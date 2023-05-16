import Image from "next/image";
import YouTubeForm from "./components/YouTubeForm";
import YupForm from "./components/YupForm";
import ZodForm from "./components/ZodForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <YouTubeForm /> */}
      {/* <YupForm /> */}
      <ZodForm />
    </main>
  );
}
