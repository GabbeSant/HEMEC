import React, { useEffect, useState } from "react";
import hospital from "../../assets/imgs/vitalworks-hospital-ward-1338585_1920.jpg";
import medical from "../../assets/imgs/ahmadardity-medical-5051148_1920.jpg";
import electronics from "../../assets/imgs/sasint-surgery-1807541_1920.jpg";
import "./HeroCarousel.css";

// Cada foto tem seu próprio ponto de enquadramento, sem alterar o arquivo original.
const slides = [
  {
    src: hospital,
    alt: "Leitos e equipamentos em uma sala hospitalar",
    label: "Ambiente hospitalar",
    position: "58% 62%",
  },
  {
    src: medical,
    alt: "Equipe e equipamentos de monitoramento em uma sala cirúrgica",
    label: "Equipamentos no cuidado",
    position: "60% 45%",
  },
  {
    src: electronics,
    alt: "Detalhe de componentes em uma placa eletrônica",
    label: "Tecnologia e manutenção",
    position: "50% 55%",
  },
];
const intervalMs = 6000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
    };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (hovered || focused || reducedMotion) return;
    // Reinicia a contagem após uma seleção manual, dando seis segundos à nova foto.
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setActive((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [active, hovered, focused, reducedMotion]);

  return (
    <section
      className="hero-figure hero-carousel"
      aria-label="Imagens de ambiente hospitalar e tecnologia"
      aria-roledescription="carrossel"
    >
      <div
        className="carousel-frame"
        aria-live={hovered || focused || reducedMotion ? "polite" : "off"}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`carousel-slide${index === active ? " is-active" : ""}`}
            role="group"
            aria-roledescription="imagem"
            aria-label={`${index + 1} de ${slides.length}: ${slide.label}`}
            aria-hidden={index !== active}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              style={{ objectPosition: slide.position }}
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </div>
        ))}
        <div className="carousel-shade" aria-hidden="true" />
      </div>
      <div
        className="carousel-indicators"
        role="group"
        aria-label="Selecionar imagem. A troca automática pausa durante a interação."
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`carousel-indicator${index === active ? " is-active" : ""}`}
            aria-label={`Mostrar imagem ${index + 1}: ${slide.label}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
