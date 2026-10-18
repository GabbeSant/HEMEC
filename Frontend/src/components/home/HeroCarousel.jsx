import React, { useEffect, useState } from "react";
import hospital from "../../assets/imgs/vitalworks-hospital-ward-1338585_1920.jpg";
import medical from "../../assets/imgs/ahmadardity-medical-5051148_1920.jpg";
import electronics from "../../assets/imgs/aviavlad-electronics-3628675_1920.jpg";
import "./HeroCarousel.css";

// Cada foto tem seu próprio ponto de enquadramento, sem alterar o arquivo original.
const slides = [
  { src: hospital, alt: "Leitos e equipamentos em uma sala hospitalar", label: "Ambiente hospitalar", position: "58% center" },
  { src: medical, alt: "Equipe e equipamentos de monitoramento em uma sala cirúrgica", label: "Equipamentos no cuidado", position: "60% center" },
  { src: electronics, alt: "Detalhe de componentes em uma placa eletrônica", label: "Tecnologia e manutenção", position: "50% center" },
];
const intervalMs = 6000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, reducedMotion]);

  function move(direction) {
    setPlaying(false);
    setActive(current => (current + direction + slides.length) % slides.length);
  }

  return (
    <section
      className="hero-figure hero-carousel"
      aria-label="Imagens de ambiente hospitalar e tecnologia"
      aria-roledescription="carrossel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="carousel-frame" aria-live={playing ? "off" : "polite"}>
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`carousel-slide${index === active ? " is-active" : ""}`}
            role="group"
            aria-roledescription="imagem"
            aria-label={`${index + 1} de ${slides.length}: ${slide.label}`}
            aria-hidden={index !== active}
          >
            <img src={slide.src} alt={slide.alt} style={{ objectPosition: slide.position }} fetchPriority={index === 0 ? "high" : "low"} />
          </div>
        ))}
        <div className="carousel-shade" aria-hidden="true" />
        <div className="carousel-caption" aria-hidden="true">
          <span>{slides[active].label}</span>
          <span className="carousel-count">{String(active + 1).padStart(2, "0")} / 03</span>
        </div>
      </div>
      <div className="carousel-controls">
        <div className="carousel-navigation">
          <button type="button" onClick={() => move(-1)} aria-label="Imagem anterior">Anterior</button>
          <button type="button" onClick={() => move(1)} aria-label="Próxima imagem">Próxima</button>
        </div>
        {!reducedMotion && (
          <button type="button" onClick={() => setPlaying(current => !current)} aria-label={playing ? "Pausar carrossel" : "Reproduzir carrossel"}>
            {playing ? "Pausar" : "Reproduzir"}
          </button>
        )}
      </div>
    </section>
  );
}
