import { motion } from "framer-motion";

export default function Card({ children, animate = false }) {
  const animateProps = animate
    ? {
        whileHover: {
          scale: 1.1,
        },
      }
    : {};

  return (
    <motion.div
      {...animateProps}
      className="border-2 rounded-lg px-5 py-2 shadow-lg min-w-[300px] sm:min-w-[400px] lg:min-w-[600px]"
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children }) {
  return (
    <header className="mb-5 pb-2 border-b border-gray-400 text-center font-bold text-3xl">
      {children}
    </header>
  );
}

export function CardBody({ children }) {
  return <section>{children}</section>;
}
