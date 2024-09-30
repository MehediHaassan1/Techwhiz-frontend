import Image from "next/image";
import loadingGif from "../assets/loading.gif";

export default function Loading() {
    return (
        <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
            <Image src={loadingGif} width={400} height={400} alt="loading..." />
        </div>
    );
}
