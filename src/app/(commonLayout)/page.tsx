import { subtitle, title } from "@/src/components/primitives";

import HomeBtn from "./@components/HomeBtn";

export default function Home() {
  return (
    <section className="flex flex-col items-end justify-center gap-4 py-8 md:py-10 pr-6 md:pr-8 lg:pr-16 bg-[url('https://i.ibb.co/RP3nxCV/hero-image.png')] bg-cover bg-left min-h-[calc(100vh-64px)]">
      <div className="inline-block max-w-xl text-right  justify-center">
        <span className={title()}>
          In tech, staying informed today shapes&nbsp;
        </span>
        <br />
        <span className={title({ color: "violet" })}>
          the innovations&nbsp;
        </span>
        <br />
        <span className={title()}>of tomorrow.</span>
        <div className={subtitle({ class: "mt-4" })}>
          Keep up with the latest tech trends to stay ahead in an ever-evolving
          digital world.
        </div>
      </div>

      <HomeBtn />
    </section>
  );
}
