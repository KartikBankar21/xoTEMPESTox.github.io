import React, { useEffect, useRef, useState } from "react";
import "../styles/main.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const descRef = useRef(null);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const container = descRef.current;
    if (!container) return;

    // respect reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const raw = container.getAttribute("data-roles");
    let roles = [];

    try {
      roles = JSON.parse(raw);
    } catch {
      roles = raw.split("|").map((x) => x.trim());
    }

    if (!roles || !roles.length) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeSpeed = 75;
    const deleteSpeed = 45;
    const holdDelay = 800;

    const tick = () => {
      const fullText = roles[roleIndex];

      if (!deleting) {
        // typing
        setCurrentText(fullText.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === fullText.length) {
          setTimeout(() => (deleting = true), holdDelay);
        }
      } else {
        // deleting
        setCurrentText(fullText.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      const nextDelay = deleting ? deleteSpeed : typeSpeed;
      setTimeout(tick, nextDelay);
    };

    tick();
  }, []);

  return (
    <div className="page-section">
      <section className="home" id="home">
        <div className="container">
          <div className="row align-items-center gx-0 gy-sm-4 mx-auto text-center">
            <div className="col-md-6">
              <div className="home__img mx-auto">
                <img
                  src="/assets/images/person/man-1-min.jpg"
                  alt="Profile picture of Priyanshu Sah"
                  draggable="false"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="home__info">
                <h1 className="home__info__title text-capitalize">
                  Priyanshu Sah
                  <span></span>
                </h1>

                {/* DESCRIPTION */}
                <p
                  className="home__info__desc my-4"
                  data-roles='["AI/ML Engineer","Full Stack Developer","@Intern at Liferythm Healthcare"]'
                  ref={descRef}
                >
                  <span className="typed-text__content">{currentText}</span>
                  <span className="typed-text__cursor">|</span>

                  {/* hidden fallback */}
                  <span className="typed-text__fallback" aria-hidden="true">
                    AI/ML Engineer <br />
                    Full Stack Developer <br />
                    @Intern at Liferythm Healthcare.
                  </span>
                </p>

                <NavLink
                  id="read-more-home"
                  className="home__info__btn custom-btn mx-auto"
                  to="/about"
                >
                  read more
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
