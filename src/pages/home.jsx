import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const descRef = useRef(null);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const container = descRef.current;
    if (!container) return;

    // Respect reduced motion
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
    let timeoutId;

    const typeSpeed = 75;
    const deleteSpeed = 45;
    const holdDelay = 1500;

    const tick = () => {
      const fullText = roles[roleIndex];

      if (!deleting) {
        // Typing forward
        charIndex++;
        setCurrentText(fullText.substring(0, charIndex));

        if (charIndex === fullText.length) {
          // Finished typing, wait before deleting
          timeoutId = setTimeout(() => {
            deleting = true;
            tick();
          }, holdDelay);
          return;
        }
      } else {
        // Deleting backward
        charIndex--;
        setCurrentText(fullText.substring(0, charIndex));

        if (charIndex === 0) {
          // Finished deleting, move to next role
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      const nextDelay = deleting ? deleteSpeed : typeSpeed;
      timeoutId = setTimeout(tick, nextDelay);
    };

    // Start the animation
    tick();

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
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
                  fetchPriority="high"
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

                <p
                  className="home__info__desc my-4 text-center"
                  data-roles='["AI/ML Engineer","Full Stack Developer","@Intern at Liferythm Healthcare"]'
                  ref={descRef}
                >
                  <span className="typed-text__content">{currentText}<p className="inline" style={{ opacity: showCursor ? 1 : 0 }}>|</p></span>
                  

                  {/* Hidden fallback */}
                  <span className="typed-text__fallback" aria-hidden="true" style={{ display: 'none' }}>
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