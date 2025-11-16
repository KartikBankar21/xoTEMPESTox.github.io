import React from "react";
import "../styles/main.css";

const Journey = () => {
  return (
    <div className="page-section">
    <section className="journey" id="journey">
      <div className="container">
        <div className="row align-items-center justify-content-center gx-5 gy-sm-4 mx-auto">
          <div className="col-md-6">
            <h2 className="journey__title">my education</h2>
            <div className="journey__card-group">
              <div className="journey__card">
                <h3 className="journey__card__title">
                  B.Tech Honors in CS ( AI & ML Specialization )
                </h3>
                <p className="journey__card__place">
                  University of Mumbai | <span>2022 - 2026</span>
                </p>
                <p className="journey__card__desc">
                  Studying AI and ML with focus on deep learning and systems
                  design.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 journey__experience">
            <h3 className="journey__title">my experience</h3>
            <div className="journey__scroll-indicator" aria-hidden="true">
              <span className="journey__scroll-indicator__inner">
                <span className="journey__scroll-indicator__chevron"></span>
              </span>
            </div>
            <div className="journey__card-group">
              <div className="journey__card">
                <h3 className="journey__card__title">
                  Full-Stack AI Engineer Intern
                </h3>
                <p className="journey__card__place">
                  Liferythm Healthcare | <span>Jul 2025 - Present</span>
                </p>
                <p className="journey__card__desc">
                  Building AI doctor modules using MedLLMs for workflow
                  automation.
                </p>
              </div>

              <div className="journey__card">
                <h3 className="journey__card__title">
                  Full-Stack AI Engineer Intern
                </h3>
                <p className="journey__card__place">
                  Creo AI | <span>Mar 2025 – Aug 2025</span>
                </p>
                <p className="journey__card__desc">
                  Built an STS chatbot using RAG, agentic AI, NLP,with real-time
                  reasoning <br></br> voice + LLM integration and low-latency
                  APIs for 1K+ concurrent users.
                </p>
              </div>

              <div className="journey__card">
                <h3 className="journey__card__title">
                  Full-Stack AI Engineer Intern
                </h3>
                <p className="journey__card__place">
                  Web3Galaxy | <span>Dec 2024 – Feb 2025</span>
                </p>
                <p className="journey__card__desc">
                  Delivered a multimodal chatbot with TTS, STT, and doc parsing
                  with multilingual,<br></br> location-aware responses and
                  production deployment on Nginx and Cloudflare.
                </p>
              </div>

              <div className="journey__card">
                <h3 className="journey__card__title">Software Developer Intern</h3>
                <p className="journey__card__place">
                  Chart Raiders | <span>Feb 2024 – Aug 2024</span>
                </p>
                <p className="journey__card__desc">
                  Built a LangChain+VectorDB trading assistant and tuned SLMs
                  with synthetic Q&A <br></br>with scalable RAG on ElasticSearch
                  with Docker and CI/CD.
                </p>
              </div>

              <div className="journey__card">
                <h3 className="journey__card__title">Technical Head</h3>
                <p className="journey__card__place">
                  ACM SIG AI TCET | <span>Jul 2024 – Jul 2025</span>
                </p>
                <p className="journey__card__desc">
                  Led AI initiatives with 5+ workshops training 500+ students{" "}
                  <br></br> oversaw development and maintenance of the TCET SIG
                  AI website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Journey;
