import Image from "next/image";

import loadingGif from "../assets/loading.gif";

export default function Loading() {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Image alt="loading..." height={400} src={loadingGif} width={400} />
    </div>
  );
}
