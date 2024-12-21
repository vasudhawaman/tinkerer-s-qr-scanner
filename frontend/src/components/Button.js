import { motion } from "framer-motion";

export default function Button({
  children,
  animate = false,
  className = "",
  onClick,
}) {
  const animateProps = animate
    ? {
        whileHover: {
          scale: 1.1,
        },
        whileTap: {
          scale: 0.9,
        },
      }
    : {};

  return (
    <motion.button
      {...animateProps}
      className={`bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-4 py-2 text-lg w-full rounded-lg drop-shadow-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
