import React, { useEffect, useRef } from "react";
import "../styles/main.css";
import "./timeline.css";

const timelineData = [
  {
    image: "../assets/images/journey/education.png", // replace with your image path
    title: "B.Tech Honors in CS (AI & ML Specialization)",
    subtitle: "University of Mumbai",
    description:
      "Studying AI and ML with focus on deep learning and systems design.",
    date: "2022 - 2026",
  },
  {
    image: "../assets/images/journey/ai_intern.png",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Liferythm Healthcare",
    description:
      "Building AI doctor modules using MedLLMs for workflow automation.",
    date: "Jul 2025 - Present",
  },
  {
    image: "../assets/images/journey/internship_placeholder.png",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Creo AI",
    description:
      "Built an STS chatbot using RAG, agentic AI, and NLP, with real-time reasoning, voice + LLM integration, and low-latency APIs for 1K+ concurrent users.",
    date: "Mar 2025 – Aug 2025",
  },
  {
    image: "../assets/images/journey/web3galaxy.png",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Web3Galaxy",
    description:
      "Delivered a multimodal chatbot with TTS, STT, and document parsing with multilingual, location-aware responses; deployed on Nginx and Cloudflare.",
    date: "Dec 2024 – Feb 2025",
  },
  {
    image: "../assets/images/journey/internship_placeholder.png",
    title: "Software Developer Intern",
    subtitle: "Chart Raiders",
    description:
      "Built a LangChain+VectorDB trading assistant and tuned SLMs with synthetic Q&A using scalable RAG on ElasticSearch with Docker and CI/CD.",
    date: "Feb 2024 – Aug 2024",
  },
  {
    image: "../assets/images/journey/acm_sigai.jpeg",
    title: "Technical Head",
    subtitle: "ACM SIG AI TCET",
    description:
      "Led AI initiatives with 5+ workshops training 500+ students; oversaw development and maintenance of the TCET SIG AI website.",
    date: "Jul 2024 – Jul 2025",
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const itemRefs = useRef([]);
  const cardRefs = useRef([]);
  //   const pointRefs = useRef([]);
  const logoRefs = useRef([]);

  useEffect(() => {
    const overlay = document.querySelector(".page-overlay");
    if (!overlay) return;

    const updateTimeline = () => {
      const container = containerRef.current;
      const progress = progressRef.current;

      const containerTop = container.offsetTop; // relative to page-section
      const containerHeight = container.offsetHeight;

      const scrollY = overlay.scrollTop; // 🌟 use overlay scroll
      const overlayHeight = overlay.clientHeight; // 🌟 viewport height of overlay

      const start = containerTop - overlayHeight / 2;
      const end = containerTop + containerHeight - overlayHeight / 2;
      const ratio = (scrollY - start) / (end - start);
      const clamped = Math.max(0, Math.min(1, ratio));

      progress.style.height = `${clamped * 100}%`;

      itemRefs.current.forEach((item, i) => {
        const itemTop = item.offsetTop; // relative to container
        const distance = scrollY + overlayHeight / 2 - (containerTop + itemTop);

        // activate point & logo
        if (distance > -50) {
          // pointRefs.current[i].classList.add("active");
          logoRefs.current[i].classList.add("active");
        } else {
          // pointRefs.current[i].classList.remove("active");
          logoRefs.current[i].classList.remove("active");
        }

        // show card
        const cardTop = containerTop + itemTop - overlayHeight * 0.8;
        const cardBottom = containerTop + itemTop + overlayHeight * 0.3;

        if (scrollY > cardTop && scrollY < cardBottom) {
          cardRefs.current[i].classList.add("visible");
        } else {
          cardRefs.current[i].classList.remove("visible");
        }
      });
    };

    overlay.addEventListener("scroll", updateTimeline);
    overlay.addEventListener("resize", updateTimeline);

    updateTimeline();

    return () => {
      overlay.removeEventListener("scroll", updateTimeline);
      overlay.removeEventListener("resize", updateTimeline);
    };
  }, []);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="timeline-page">
      {/* <h1>My Journey</h1> */}

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-line"></div>
        <div className="timeline-progress" ref={progressRef}></div>

        {timelineData.map((item, i) => (
          <div
            className="timeline-item"
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
          >
            <div
              className="timeline-logo"
              ref={(el) => (logoRefs.current[i] = el)}
            >
              <img src={item.image} alt={item.title} />
            </div>

            <div
              className="timeline-card"
              ref={(el) => (cardRefs.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, cardRefs.current[i])}
            >
              <h3 className="card-title">{item.title}</h3>
              <p className="card-subtitle">{item.subtitle}</p>
              <p className="card-description">{item.description}</p>
              <span className="card-date">{item.date}</span>
            </div>
          </div>
        ))}
        <div className="h-72"></div>
      </div>
    </div>
  );
}