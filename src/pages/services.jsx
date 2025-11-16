import React from 'react'
import '../styles/main.css'

const Services = () => {
  return (
    <div className="page-section">
            <section className="services" id="services">
            <div className="services__wrapper">
                <h4 className="services__wrapper__title">Services</h4>
                <div className="services__wrapper__circle rounding"></div>

                <div className="services__wrapper__icons" id="icon-div">
                    <div className="services__wrapper__icons__item" data-service-name="AI Systems">
                        <i className="demo-icon desktopicon-"></i>
                    </div>      

                    <div className="services__wrapper__icons__item" data-service-name="Web Development">
                        <i className="demo-icon codeicon-"></i>
                    </div>      

                    <div className="services__wrapper__icons__item" data-service-name="UI / UX">
                        <i className="demo-icon penicon-"></i>
                    </div>      

                    <div className="services__wrapper__icons__item" data-service-name="Cloud Integration">
                        <i className="demo-icon searchicon-"></i>
                    </div>      

                    <div className="services__wrapper__icons__item" data-service-name="API Automation">
                        <i className="demo-icon doc-texticon-"></i>
                    </div>      

                    <div className="services__wrapper__icons__item" data-service-name="Deployment & Hosting">
                        <i className="demo-icon servericon-"></i>
                    </div>      
                </div>      
            </div>     
        </section> </div>
  )
}

export default Services