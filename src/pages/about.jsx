import React from "react";
import '../styles/main.css'

const About = () => {
  return (
    <div className="page-section">
    <section className="about" id="about">
      <div className="container">
        <div className="about__layout">
          <div className="about__stack about__stack--left">
            <div className="about__info">
              <span className="about__info__label">Job:</span>
              <span className="about__info__value">Full Stack AI Engineer</span>
            </div>
            <div className="about__info">
              <span className="about__info__label">Degree:</span>
              <span className="about__info__value">
                B.Tech Honors CS ( AI & ML )
              </span>
            </div>
            <div className="about__info">
              <span className="about__info__label">Address:</span>
              <span className="about__info__value">Mumbai, India</span>
            </div>

            <div className="about__info">
              <span className="about__info__label">Phone:</span>
              <span className="about__info__value">+91 7666774342</span>
            </div>
          </div>

          <div className="about__center">
            <div className="about__img">
              <img
                src="/assets/images/person/man-2-min.jpg"
                alt="Professional headshot of Priyanshu Sah, AI ML Engineer and Full Stack Developer"
                draggable="false"
                loading="lazy"
              ></img>
            </div>
            <h3 className="about__title">Priyanshu Sah</h3>
          </div>

          <div className="about__stack about__stack--right">
            <div className="about__info">
              <span className="about__info__label">Birthday:</span>
              <span className="about__info__value">8 Nov 2004</span>
            </div>

            <div className="about__info">
              <span className="about__info__label">Experience:</span>
              <span className="about__info__value">1.5 years</span>
            </div>

            <div className="about__info">
              <span className="about__info__label">Email:</span>
              <span className="about__info__value">priyanshu123sah@gmail.com</span>
            </div>

            <div className="about__info">
              <span className="about__info__label">Freelance:</span>
              <span className="about__info__value">Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
