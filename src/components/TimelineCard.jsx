import React, { useEffect, useRef, useState } from "react";

const TimelineCard = ({ item, isLeft, progressRatio, effectivePos, effectiveThreshold, borderColor }) => {
  const cardRef = useRef(null);
  // Use the passed "effectivePos" (which handles mobile vs desktop logic)
  // Use "effectiveThreshold" to determine how long it stays visible
  const isActive = progressRatio >= effectivePos && progressRatio <= effectivePos + effectiveThreshold;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  

  return (
    <div
      className="absolute w-full px-4 md:px-0"
      style={{ top: `${effectivePos * 100}%`, transform: "translateY(-50%)" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative p-8 md:p-10 rounded-3xl border-2 transition-all duration-700 ease-out transform bg-black/50 backdrop-blur-sm rounded-2xl m-0 w-[100%] p-12 w-fit
          ${
            isActive
              ? "opacity-100 translate-y-0 scale-100 "
              : "opacity-0 translate-y-16 scale-95 pointer-events-none "
          } bg-black/90 border-white/5 ${borderColor} `}
        style={{
          // Use backgroundImage instead of background
          backgroundImage: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 10%)`,
          marginLeft: isLeft ? "5rem" : "0",
          marginRight: !isLeft ? "5rem" : "0",
          maxWidth: "85%",
        }}
      >
        <div className="flex flex-col gap-2">
          <h3 className={`text-white  font-bold text-xl md:text-2xl tracking-tight`}>
            {item.title}
          </h3>
          <p className={` font-bold text-base md:text-xl  ${item.type === "edu" ? "text-blue-500" : "text-purple-500"}`}>
            {item.subtitle}
          </p>
          <p className="text-gray-300 text-xl mt-4 leading-relaxed font-normal">
            {item.description}
          </p>

          <div className="mt-6 pt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  item.type === "edu" ? "bg-zinc-600" : "bg-teal-700"
                }`}
              ></div>
              <span className="text-gray-500 text-sm md:text-lg font-mono tracking-widest uppercase font-bold">
                {item.date}
              </span>
            </div>
            <span
              className={`text-[10px] md:text-xl font-mono uppercase px-4 py-1.5 rounded-md bg-white/5 ${
                item.type === "edu" ? "text-blue-500" : "text-purple-500"
              }`}
            >
              {item.type === "edu" ? "Undergrad" : "Internship"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
