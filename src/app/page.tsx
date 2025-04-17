import Link from "next/link";


export default function Home() {
  return (
  <div className="flex gap-12 p-6">
    <h3>shoker there</h3>
    <Link href={'/login' }>Login</Link>
  </div>
  );
}
