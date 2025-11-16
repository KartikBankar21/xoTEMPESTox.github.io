import React from 'react'
import '../styles/main.css'

const Skills = () => {
  return (
    <div className="page-section">
            <section className="skills" id="skills">
            <div className="container">
                <h2 className="skills__title text-capitalize">my skills</h2>
                <div className="row justify-content-center gy-0">
                    <div className="col-md-6">
                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">GenAI (Agents, LangChain, MCP, FineTuning)</span>
                                <span className="skills__box__head__rate">90%</span>
                            </div>   
                            <div className="skills__box__line">
                                <span data-rate="90"></span>
                            </div>  
                        </div>    

                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">Machine Learning</span>
                                <span className="skills__box__head__rate">85%</span>
                            </div>   
                            <div className="skills__box__line">
                                <span data-rate="80"></span>
                            </div>  
                        </div>    

                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">Data Structures & Algorithms (Python)</span>
                                <span className="skills__box__head__rate">80%</span>
                            </div>   
                            <div className="skills__box__line">
                                <span data-rate="85"></span>
                            </div>  
                        </div> 

                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">Computer Vision & Audio </span>
                                <span className="skills__box__head__rate">70%</span>
                            </div> 
                            <div className="skills__box__line">
                                <span data-rate="95"></span>
                            </div> 
                        </div> 
                    </div> 

                    <div className="col-md-6">
                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">MLOps / DevOps (Docker, Kubernetes, Teraform)</span>
                                <span className="skills__box__head__rate">90%</span>
                            </div> 
                            <div className="skills__box__line">
                                <span data-rate="70"></span>
                            </div> 
                        </div> 
                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">CI/CD (GitHub Actions, n8n)</span>
                                <span className="skills__box__head__rate">85%</span>
                            </div> 
                            <div className="skills__box__line">
                                <span data-rate="80"></span>
                            </div> 
                        </div> 

                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">Web Development (MERN Stack)</span>
                                <span className="skills__box__head__rate">80%</span>
                            </div> 
                            <div className="skills__box__line">
                                <span data-rate="90"></span>
                            </div> 
                        </div> 

                        <div className="skills__box">
                            <div className="skills__box__head">
                                <span className="skills__box__head__lang">SEO / Hosting </span>
                                <span className="skills__box__head__rate">70%</span>
                            </div> 
                            <div className="skills__box__line">
                                <span data-rate="80"></span>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </section> 
        </div>
  )
}

export default Skills