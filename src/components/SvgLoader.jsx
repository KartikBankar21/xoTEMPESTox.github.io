import React from "react";
import { motion } from "framer-motion";

const SvgLoader = ({ onFinish }) => {
  // Container variant to handle the sequencing of children
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.4, // Delay between each path starting
//         when: "beforeChildren",
//       },
//     },
//   };

  // Path variant for the "drawing" stroke effect
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "spring",
          duration: 3,
          bounce: 0,
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <motion.svg
        viewBox="0 0 300 300"
        className="w-[80%] md:w-[40%] h-auto"
        initial="hidden"
        animate="visible"
        onAnimationComplete={onFinish}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          id="ew7Dz8ECLWi4"
          d="M34.895 115.51c0-8.595 14.176-27.497 23.625-18.73 6.523 6.052 3.767 13.248 4 15.15.538 4.377-8.97 23.003-15.035 16.916-12.613-12.662 22.544-36.314 34.875-26.313C97.733 115 75.144 143.79 60.015 136.155"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="187.17"
          strokeDasharray="187.17"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi5"
          d="M90.234 99.76c-8.09 0-14.523 8.349-18.943 14.26-7.329 9.803-10.376 20.34-13.835 30.437-3.6 10.508-10.784 17.914-17.546 25.568"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="89.41"
          strokeDasharray="89.41"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi6"
          d="M39.88 169.828c-15.19 11.527-30.915 7.49-33.496-5.04-1.301-6.313-.883-16.495 10.911-27.355 5.53-5.498 16.93-10.884 25.608-6.984 8.445 3.796 7.03 17.509.665 22.282"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="125.81"
          strokeDasharray="125.81"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi7"
          d="m103.427 126.511.925-.077.694-.578.077-1.195-.81-.54q-1.194.309-1.194.347t-.309.926l.116.809z"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="7.64"
          strokeDasharray="7.64"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi8"
          d="M69.127 147.833c3.375-6.865 9.723-13.073 12.698-12.467 3.402 2.326-3.402 14.207-8.7 25.723-1.151.865-2.933 5.95-2.902 3.926 6.36-9.853 17.73-24.4 21.53-32.882l-6.229 11.679c-.043 2.099.9 3.215 1.843 3.79 4.36.374 8.3-7.943 12.698-13.622l-3.214 4.236c-8.448 15.951-12.067 26.36-9.484 26.24 5.623 3.535 16.61-17.281 25.188-31.702h-.341c-5.533 8.23-12.816 23.041-11.949 26.799.631 7.213 6.776-1.264 10.882-7.102l13.698-22.428q-1.446 2.513-1.707 2.56c-.26.048-5.96 10.061-14.85 32.261-4.814 13.085-12.268 24.588-16.535 29.858-3.732 4.206-9.924 9.172-12.142 8.72-7.409-2.217.654-15.197 6.487-21.508 4.04-4.659 13.298-12.055 18.435-15.192.955-.79 6.128-2.52 12.46-3.243"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="429.01"
          strokeDasharray="429.01"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi9"
          d="M148.807 126.914c-3.865 6.56-10.173 16.744-14.17 22.742-3.55 6.123-7.176 9.513-8.397 9.446-4.936-1.355-2.97-9.445 0-14.87 2.081-4.118 7.514-11.345 11.196-14.344 1.834-1.642 3.485-2.756 4.698-2.955 1.87-1.138 2.881 1.906 3.757 4.562-2.853 5.582-7.293 14.7-8.455 17.81-2.415 5.233-1.228 7.422 0 8.048 4.61.28 8.399-9.418 12.77-16.094 3.618-8.21 9.114-17.714 12.42-16.444 2.293 1.084-6.385 19.042-11.895 31.138 4.069-7.396 10.527-18.343 11.532-18.821 4.324-7.387 10.562-14.842 12.784-14.242 2.822 1.823 1.13 7.877-3.39 13.57-8.448 10.644-8.82 17.15-4.832 17.919 4.933-1.875 9.277-8.948 12.595-13.82l13.995-26.24c-1.633 2.466-3.601 7.277-3.848 9.621 1.304 6.916 1.776 13.627.35 17.319-1.449 6.272-6.085 8.864-9.272 11.02-5.062 1.65-7.548-3.59-6.123-9.271 1.68-4.158 4.988-6.084 4.866-2.39"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="383.95"
          strokeDasharray="383.95"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi10"
          d="M191.099 150.132c4.195-9.91 20.99-42.717 32.8-66.232-11.05 22.673-20.777 40.07-20.641 44.052 4.335-3.784 8.474-11.942 12.067-9.884.726 4.78-2.545 11.118-4.942 14.48-7.378 10.975-6.02 15.03-3.304 15.271 3.726 1.228 9.508-7.95 13.303-12.972 2.324-3.105 6.512-11.533 10.246-18.146-2.703 4.674-8.37 16.154-12.085 24.352-.975 2.689-.005 5.852 1.572 6.136 3.91-1.471 6.509-7.21 10.265-11.422l12.023-20.538c-2.918 5.102-8.734 16.776-10.414 21.342-1.91 4.364-2.86 7.934.115 8.505s6.898-5.149 13.663-16.18"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="341.35"
          strokeDasharray="341.35"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi12"
          d="M191.752 183.887c2.152 2.648 12.156 1.77 17.062-.218 7.4-3 15-7.177 23.187-12.687 7.678-6.364 18.317-17.684 20.78-22.531 2.823-5.25 2.047-7.6.657-7.656-4.81-1.139-11.968 9.698-13.78 11.812-3.374 4.88-4.736 10.264-6.782 14.437-2.583 7.735-.343 11.589-4.593 21.437-2.309 7.6-10.9 15.135-15.969 17.5-5.556 2.807-13.69 4.503-17.28 3.718-18.877-2.16-18.827-18.994-15.969-24.5 2.944-10.6 12.57-14.814 19.25-18.592 10.628-3.887 19.415-1.294 21.218 1.968 8.99 8.704-.525 22.233-4.375 21.875"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="293.46"
          strokeDasharray="293.46"
          variants={pathVariants}
        />
        <motion.path
          id="ew7Dz8ECLWi13"
          d="M259.782 180.825c-4.489 5.564-11.061 13.677-14 17.937-3.736 4.466-9.652 10.521-11.375 10.281-2.599.298-4.397-2.773-1.312-9.187 2.48-5.973 10.392-14.423 11.812-15.094 1.314-1.81 5.704-4.485 10.062-5.03 1.487 1.34 1.457 3.58 1.237 5.629l-10.424 16.026c-1.916 2.422-1.672 5.91-.875 7.656 1.692 1.302 6.58-3.621 9.4-6.783l38.546-53.736-4.747 5.127c-12.261 18.346-30.436 45.478-35.508 54.686.018-.183 10.05-13.629 15.496-20.73 3.998-3.992 9.722-8.39 10.937-7.876 1.178 1.406.924 4.359-.218 5.906-2.052 3.478-7.728 11.79-11.156 16.625-1.724 2.415-1.071 5.41 0 6.562 5.973-.569 11.56-7.485 15.132-12.26"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDashoffset="356.75"
          strokeDasharray="356.75"
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
};

export default SvgLoader;
