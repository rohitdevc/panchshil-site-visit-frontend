import Image from "next/image";
import Link from "next/link";

export function PanchshilMark() {
  const basePath = process.env.NEXT_PUBLIC_PATH || "/";
  
  return (
    <Link href="/">
      <Image src={`${basePath}/images/logo.png`} alt="Panchshil Logo" width={74} height={74} loading="eager" />
    </Link>
  );
}
