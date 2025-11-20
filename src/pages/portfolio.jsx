import React from "react";
// import VerticalCarousel from "../components/VerticalCarousel";
import CopiedCard from "../components/CopiedCard";
// import SwiperCard from '../components/SwiperCard'
import "../styles/main.css";
const Portfolio = () => {
  return (
    <div className="page-section">
        {/* <SwiperCard /> */}
        <div className="flex justify-center items-center">
        
        <CopiedCard />
        </div>
    </div>
  );
};

export default Portfolio;

{/* <CopiedCard/> */}
//   const [selectedProject, setSelectedProject] = useState(null);
//  const projectData = {
//   badge: "Top 10 Amazon Smbhav GenAI Hackathon",
//   title: "GenAI SmartLister",
//   subtitle: "AI-powered product listing generator",
//   frontImage: "your-image-url.jpg", // Your ENERZAL-style image
//   techStack: [
//     { name: "Python", icon: "</>" },
//     { name: "Gemini API", icon: "🌐" },
//     { name: "Stable Diffusion", icon: "🎨" },
//     { name: "Streamlit", icon: "⚡" }
//   ],
//   description: "Full project description...",
//   highlights: ["Achievement 1", "Achievement 2"],
//   website: "https://yoursite.com"
// };
// import CopiedCard from "../components/CopiedCard";// import CopiedCard from "../components/CopiedCard";

// import { ProjectCard } from "../components/ProjectCard";
// import { FlipCard } from "../components/FlipCard";
// // import Card from "../components/Card";
// // import InvertedCard from "../components/InvertedCard";
      {/* <Card image="/tesla.webp" title="Tesla Roadster" price="$200,000" /> */}
            {/* <InvertedCard 
        brand="Nike"
        image="/shoes.png"
        title="Air Max Dia"
        price="$149.00"
        colors={["#e75a7c", "#4ecdc4", "#fffffc", "#2c363f"]}
      /> */}