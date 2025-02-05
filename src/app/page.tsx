"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageData {
  src: string;
  alt: string;
}

const images = [
  {
    src: "/donejtor.png",
    alt: "Twórcy GRABOGA.PL",
  },
  {
    src: "/tworcy.png",
    alt: "Osoba wysyłająca nam donejty",
  },
  {
    src: "/nig.png",
    alt: "Nigger",
  },
];

export default function Home() {
  const [muchaImages, setMuchaImages] = useState<ImageData[]>([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(true);
  const imgRotationInterval = 5000;

  // Fetch images from JSON file in public folder
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/data/muchas.json");
      const data: ImageData[] = await response.json();
      setMuchaImages(data);
    };

    fetchImages();
  }, []);

  // Go to the next image
  const nextImage = () => {
    setFade(false); // Start fade-out effect
    setTimeout(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % muchaImages.length);
      setProgress(0);
      setFade(true); // Start fade-in effect
    }, 500);
  };

  const prevImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImgIndex(
        (prevIndex) => (prevIndex - 1 + muchaImages.length) % muchaImages.length
      );
      setProgress(0);
      setFade(true);
    }, 500);
  };

  // Progress bar and image rotation effect
  useEffect(() => {
    if (muchaImages.length === 0) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => prev + 100 / (imgRotationInterval / 100));
    }, 100);

    const rotationInterval = setInterval(nextImage, imgRotationInterval);

    return () => {
      clearInterval(progressInterval);
      clearInterval(rotationInterval);
    };
  }, [muchaImages]);

  return (
    <section className="flex flex-col justify-center items-center p-4 mt-4 md:mt-8 pb-20 md:pb-8">
      <div className="p-2 flex flex-col justify-center md:justify-stretch items-center md:h-screen">
        <h1 className="uppercase font-bold text-4xl text-center md:text-8xl">
          graboga.pl <span className="text-gradient">2.0</span>
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
          {/* Rotation Image */}
          {muchaImages.length > 0 && (
            <div className="relative group">
              <Image
                src={muchaImages[currentImgIndex].src}
                alt={muchaImages[currentImgIndex].alt}
                width={840}
                height={840}
                priority
                className={`img hover:scale-105 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-none overflow-hidden">
                <div
                  className="h-1 bg-gradient transition-all rounded"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
              {/* Navigation Buttons */}
              <button onClick={prevImage} className="nav-btn left-2">
                &#10094;
              </button>
              <button onClick={nextImage} className="nav-btn right-2">
                &#10095;
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="border-y-4 w-full md:min-h-60 flex flex-col gap-4 justify-center items-center py-8 my-8">
        {/* Tutaj jakiś panel dac, komponent do tego zrobic */}
        <div className="w-11/12 md:w-2/3 border-2 rounded-lg border-rare p-2 text-justify">
          To do testów. Wstawić tu jakiś dojebany panel.
        </div>
        <div className="w-11/12 md:w-2/3 border-2 rounded-lg border-rare p-2 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          tenetur consequatur ab. Corporis omnis dolor beatae officiis inventore
          odit provident, impedit sit? Architecto saepe, consequatur optio
          voluptates natus ipsum accusamus.
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:w-2/3 gap-8 lg:gap-24 xl:gap-48 justify-center items-center py-8">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={256}
            height={256}
            loading="lazy"
            className="img"
          />
        ))}
      </div>

      <footer className="text-2xl p-2 text-center mt-8">
        Twórcy: <br />
        <span className="text-rare font-bold">Konrad Ciesielski</span> i <br />
        <span className="text-epic font-bold">Michał Wachowski</span>. <br />
        <span className="text-gray-700 text-xs">(i ChatGPT)</span><br />
        <span className="font-bold">(4ir (w 2023r.))</span>
      </footer>
    </section>
  );
}
