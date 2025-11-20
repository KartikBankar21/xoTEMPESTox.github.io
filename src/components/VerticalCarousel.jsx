import React, { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, X } from "lucide-react";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDesc: "Full-stack online shopping experience",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop",
    techStack: ["⚛️ React", "🟢 Node.js", "🍃 MongoDB", "💳 Stripe"],
    github: "https://github.com",
    website: "https://example.com",
    longDesc: "A comprehensive e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Features include product search, filtering, cart management, and order tracking.",
    features: ["Real-time inventory updates", "Secure payment gateway", "Admin dashboard", "Order tracking system", "Product reviews & ratings"]
  },
  {
    id: 2,
    title: "AI Chat Application",
    shortDesc: "Real-time messaging with AI assistance",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&h=300&fit=crop",
    techStack: ["🔷 TypeScript", "⚡ Next.js", "🤖 OpenAI", "🔥 Firebase"],
    github: "https://github.com",
    website: "https://example.com",
    longDesc: "An intelligent chat application that combines real-time messaging with AI-powered responses. Users can chat with each other or interact with an AI assistant for various tasks.",
    features: ["Real-time messaging", "AI-powered responses", "Group chat support", "File sharing", "Message encryption"]
  },
  {
    id: 3,
    title: "Fitness Tracker",
    shortDesc: "Track workouts and nutrition goals",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    techStack: ["📱 React Native", "🐍 Python", "📊 TensorFlow", "☁️ AWS"],
    github: "https://github.com",
    website: "https://example.com",
    longDesc: "A comprehensive fitness tracking application with workout logging, nutrition tracking, and progress visualization. Uses machine learning to provide personalized workout recommendations.",
    features: ["Workout logging", "Calorie tracking", "Progress charts", "AI workout suggestions", "Social sharing"]
  },
  {
    id: 4,
    title: "Task Management System",
    shortDesc: "Collaborative project management tool",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    techStack: ["⚛️ React", "🟦 PostgreSQL", "🚀 GraphQL", "🐳 Docker"],
    github: "https://github.com",
    website: "https://example.com",
    longDesc: "A powerful task management system designed for teams. Features include kanban boards, gantt charts, time tracking, and team collaboration tools with real-time updates.",
    features: ["Kanban boards", "Gantt charts", "Time tracking", "Team collaboration", "Custom workflows"]
  },
  {
    id: 5,
    title: "Weather Dashboard",
    shortDesc: "Beautiful weather forecasting app",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop",
    techStack: ["⚛️ React", "🎨 D3.js", "🌐 REST API", "💨 Tailwind"],
    github: "https://github.com",
    website: "https://example.com",
    longDesc: "An elegant weather dashboard that provides detailed weather information with beautiful data visualizations. Includes hourly and weekly forecasts, weather alerts, and historical data.",
    features: ["7-day forecast", "Hourly predictions", "Weather alerts", "Interactive maps", "Historical data"]
  },
  {
    id: 6,
    title: "Portfolio Generator",
    shortDesc: "Create stunning portfolios in minutes",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    techStack: ["⚡ Next.js", "🎨 Framer Motion", "📝 MDX", "☁️ Vercel"],
    github: "https://github.com",
    website: "https://example.com",
    longDesc: "A portfolio generator that allows developers and designers to create beautiful, responsive portfolios without writing code. Features customizable templates, dark mode, and SEO optimization.",
    features: ["Multiple templates", "Drag & drop builder", "SEO optimized", "Dark mode", "Analytics dashboard"]
  }
];

const ProjectCard = ({ project, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="card-container"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        perspective: '1000px',
        cursor: 'pointer'
      }}
    >
      <div 
        className="card-flipper"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}>
          <div style={{
            width: '100%',
            height: '100px',
            flexShrink: 0,
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <div style={{ 
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>{project.title}</h3>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '13px',
              marginBottom: '12px',
              lineHeight: '1.4',
              flex: 1,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>{project.shortDesc}</p>
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              flexShrink: 0
            }}>
              <a 
                href={project.github}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                  flex: 1
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                <Github size={14} /> GitHub
              </a>
              <a 
                href={project.website}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                  flex: 1
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                <ExternalLink size={14} /> Demo
              </a>
            </div>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
          borderRadius: '16px',
          transform: 'rotateY(180deg)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}>
          <h4 style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '12px',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>Tech Stack</h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: 1,
            justifyContent: 'center'
          }}>
            {project.techStack.map((tech, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.15)',
                padding: '8px 12px',
                borderRadius: '8px',
                color: 'white',
                fontSize: '13px',
                textAlign: 'center',
                fontWeight: '500',
                backdropFilter: 'blur(10px)'
              }}>
                {tech}
              </div>
            ))}
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '11px',
            textAlign: 'center',
            marginTop: '12px',
            fontStyle: 'italic'
          }}>Click to view details</p>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 30px 90px rgba(0,0,0,0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            transition: 'all 0.3s',
            backdropFilter: 'blur(10px)',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.3)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <X size={24} />
        </button>

        <div style={{
          width: '100%',
          height: '300px',
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px 20px 0 0'
        }} />

        <div style={{ padding: '40px' }}>
          <h2 style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '15px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>{project.title}</h2>

          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '16px',
            lineHeight: '1.7',
            marginBottom: '25px'
          }}>{project.longDesc}</p>

          <h3 style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>Key Features</h3>

          <ul style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '15px',
            lineHeight: '1.8',
            marginBottom: '25px',
            paddingLeft: '20px'
          }}>
            {project.features.map((feature, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{feature}</li>
            ))}
          </ul>

          <h3 style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>Technologies Used</h3>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '30px'
          }}>
            {project.techStack.map((tech, i) => (
              <span key={i} style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '10px 18px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '500',
                backdropFilter: 'blur(10px)'
              }}>
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <Github size={20} /> View on GitHub
            </a>
            <a 
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '12px',
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.9)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <ExternalLink size={20} /> Visit Live Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerticalCarousel = () => {
  const carouselRef = useRef(null);
  const [cellCount] = useState(6);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const rotateCarousel = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const cells = carousel.querySelectorAll(".carousel__cell");
    const cellHeight = 220;

    const theta = 360 / cellCount;
    const radius = Math.round((cellHeight / 2) / Math.tan(Math.PI / cellCount));

    cells.forEach((cell, i) => {
      if (i < cellCount) {
        const cellAngle = theta * i;
        cell.style.opacity = 1;
        cell.style.transform = `rotateX(${cellAngle}deg) translateZ(${radius}px)`;
      } else {
        cell.style.opacity = 0;
        cell.style.transform = "none";
      }
    });

    const angle = theta * selectedIndex * -1;
    carousel.style.transform = `rotateX(${angle}deg)`;
  };

  useEffect(() => {
    rotateCarousel();
  }, [cellCount, selectedIndex]);

  useEffect(() => {
    let isScrolling = false;

    const onWheel = (e) => {
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0) {
        setSelectedIndex((i) => (i + 1) % projectsData.length);
      } else {
        setSelectedIndex((i) => (i - 1 + projectsData.length) % projectsData.length);
      }

      setTimeout(() => (isScrolling = false), 300);
    };

    const scene = document.querySelector(".scene");
    if (scene) {
      scene.addEventListener("wheel", onWheel);
    }

    let startY = 0;

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const delta = e.touches[0].clientY - startY;
      if (Math.abs(delta) > 40) {
        if (delta < 0) setSelectedIndex((i) => (i + 1) % projectsData.length);
        else setSelectedIndex((i) => (i - 1 + projectsData.length) % projectsData.length);
        startY = e.touches[0].clientY;
      }
    };

    if (scene) {
      scene.addEventListener("touchstart", onTouchStart);
      scene.addEventListener("touchmove", onTouchMove);
    }

    return () => {
      if (scene) {
        scene.removeEventListener("wheel", onWheel);
        scene.removeEventListener("touchstart", onTouchStart);
        scene.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, []);

  return (
    <>
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div 
          className="scene" 
          style={{
            width: '400px',
            height: '550px',
            perspective: '1200px',
            perspectiveOrigin: 'center center'
          }}
        >
          <div 
            className="carousel" 
            ref={carouselRef}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s ease',
              transformOrigin: 'center center'
            }}
          >
            {projectsData.map((project, i) => (
              <div 
                className="carousel__cell" 
                key={project.id}
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '220px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-160px',
                  marginTop: '-110px',
                  transition: 'transform 0.5s ease, opacity 0.5s ease',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          Scroll to rotate • Hover to flip • Click to expand
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default VerticalCarousel;