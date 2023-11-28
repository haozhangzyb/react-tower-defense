import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/Canvas"), {
  ssr: false,
});

export default function Home() {
  if (
    !process.env.NEXT_PUBLIC_EMAIL ||
    process.env.NEXT_PUBLIC_EMAIL === "YOUR_EMAIL_HERE_REPLACE_ME"
  ) {
    return (
      <p>
        Please following the instruction in readme and set
        `NEXT_PUBLIC_EMAIL` in .env
      </p>
    );
  }

  return <Canvas />;
}
