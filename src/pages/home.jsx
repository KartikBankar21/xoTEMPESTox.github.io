import React from "react";
import "../styles/main.css";

const Home = () => {
  return (
    <div className="page-section">
    <section className="home" id="home">
      <div className="container">
        <div className="row align-items-center gx-0 gy-sm-4 mx-auto text-center">
          <div className="col-md-6">
            <div className="home__img mx-auto">
              <img
                src="/assets/images/person/man-1-min.jpg"
                alt="Profile picture of Priyanshu Sah, an AI ML Engineer and Full Stack Developer"
                draggable="false"
                fetchpriority="high"
                decoding="async"
              ></img>
            </div>
          </div>

          <div className="col-md-6">
            <div className="home__info">
              <h1 className="home__info__title text-capitalize">
                Priyanshu Sah
                <span className="visually-hidden">Portfolio</span>
                <span></span>
              </h1>
              <p
                className="home__info__desc my-4"
                data-roles='["AI/ML Engineer","Full Stack Developer","@Intern at Liferythm Healthcare"]'
              >
                <span className="typed-text__fallback">
                  AI/ML Engineer
                  <br></br>
                  Full Stack Developer
                  <br></br>
                  @Intern at Liferythm Healthcare.
                </span>
              </p>
              <a id="read-more-home" className="home__info__btn custom-btn mx-auto">
                read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Home;
