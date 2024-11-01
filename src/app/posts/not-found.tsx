import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-6 gap-2 sm:p-10">
      <h1 className="text-4xl font-bold mb-4">404 - পেজ পাওয়া যায়নি</h1>
      <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
