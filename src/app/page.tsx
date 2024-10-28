"use client";

import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center p-4 mt-4 md:mt-8 pb-20 md:pb-8">
      <div className="p-2 flex flex-col justify-center items-center">
        <h1 className="uppercase font-bold text-4xl text-center md:text-8xl">
          graboga.pl <span className="text-rare">2.0</span>
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center p-2 mt-5 md:mt-10 gap-6">
          <Image
            src={"/dyrektor.png"}
            alt="Dyrektor Mechanika"
            width={300}
            height={300}
            priority
            className="img"
          />
          <Image
            src={"/idol_blogoslawi.png"}
            alt="Błogosławiony Andrzej Mucha"
            width={840}
            height={840}
            priority
            className="img"
          />
        </div>
      </div>
      <div className="border-y-4 w-full md:min-h-60 flex gap-4 justify-center items-center py-8 my-8">
        {/* Tutaj jakiś panel dac, komponent do tego zrobic */}
        <div className="w-11/12 md:w-2/3 border-2 rounded-lg border-rare-hover p-2 text-justify">
          To do testów. Wstawić tu jakiś dojebany panel.
        </div>
        <div className="w-11/12 md:w-2/3 border-2 rounded-lg border-rare-hover p-2 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          tenetur consequatur ab. Corporis omnis dolor beatae officiis inventore
          odit provident, impedit sit? Architecto saepe, consequatur optio
          voluptates natus ipsum accusamus.
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-2/3 gap-8 md:gap-48 justify-center py-8">
        <Image
          src={"/donejtor.png"}
          alt="Osoba wysyłająca nam donejty"
          width={256}
          height={256}
          loading="lazy"
          className="img"
        />
        <Image
          src={"/tworcy.png"}
          alt="Tworcy GRABOGA.PL"
          width={256}
          height={256}
          loading="lazy"
          className="img"
        />
        <Image
          src={"/nig.png"}
          alt="Nigger"
          width={256}
          height={256}
          loading="lazy"
          className="img"
        />
      </div>

      <footer className="text-2xl p-2 text-center mt-8">
        Twórcy: <br />
        <span className="text-rare font-bold">Konrad Ciesielski</span> i <br />
        <span className="text-common font-bold">Michał Wachowski</span>. <br />
        <span className="text-legendary font-bold">(4ir)</span>
      </footer>
    </section>
  );
}
