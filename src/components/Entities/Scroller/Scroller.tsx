"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Introducer from "@/components/Entities/Introducer";
import styles from "./Scroller.module.css";

const words = [
  { word: "Heizung", image: "https://picsum.photos/seed/heizung/1920/1080" },
  { word: "Elektrik", image: "https://picsum.photos/seed/elektrik/1920/1080" },
  { word: "Klima", image: "https://picsum.photos/seed/klima/1920/1080" },
  { word: "Lüftung", image: "https://picsum.photos/seed/lueftung/1920/1080" },
  { word: "Sanitär", image: "https://picsum.photos/seed/sanitaer/1920/1080" },
  { word: "Smart Home", image: "https://picsum.photos/seed/smarthome/1920/1080" }
];

export default function Scroller() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const wordRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      words.forEach((_, index) => {
        const el = wordRefs.current[index];
        if (el && el.parentNode && el.isConnected) {
          try {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          } catch {} // ignore
        }
      });
      setActiveWordIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const setRef = useCallback((index: number) => (el: HTMLLIElement | null) => {
    wordRefs.current[index] = el;
  }, []);

  return (
    <div className={styles.scrollerContainer}>
      {/* Sticky image at the top */}
      <div className={styles.scrollerStickyImage}>
        <div className={styles.scrollerStickyImageContainer}>
          {words.map((item, index) => (
            <div
              key={index}
              className={
                styles.scrollerImageLayer +
                " " +
                (activeWordIndex === index
                  ? styles.scrollerImageLayerActive
                  : styles.scrollerImageLayerInactive)
              }
            >
              <Image
                src={item.image}
                alt={`Background for ${item.word}`}
                fill
                style={{ objectFit: "cover" }}
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Introducer section */}
      <div className={styles.scrollerIntroducerSection}>
        <Introducer
          index="03"
          label="Services"
          title="Unsere umfassenden Dienstleistungen"
          ctaLabel="Mehr erfahren"
          ctaHref="#services"
        >
          <p>
            Entdecken Sie unser vollständiges Portfolio an Gebäudetechnik-Lösungen. Von traditionellen Heizsystemen bis hin zu modernster Smart-Home-Technologie bieten wir alles aus einer Hand.
          </p>
          <br />
          <p>
            Unsere Experten planen, installieren und warten Ihre Systeme mit höchster Präzision und Sorgfalt. Jede Lösung wird individuell auf Ihre Bedürfnisse und Ihr Budget abgestimmt.
          </p>
        </Introducer>
      </div>

      {/* Words section */}
      <div className={styles.scrollerWordsSection}>
        <ul className={styles.scrollerWordsList}>
          {words.map((item, index) => (
            <li
              key={index}
              ref={setRef(index)}
              className={
                styles.scrollerWordItem +
                " " +
                (activeWordIndex === index
                  ? styles.scrollerWordItemActive
                  : styles.scrollerWordItemInactive)
              }
            >
              {item.word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 