import { motion } from 'framer-motion';

const LoadingDots = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -3 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  };

  return (
    <motion.div
      className="flex items-center space-x-1 p-2"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-1.5 h-1.5 rounded-full bg-primary"
          variants={dotVariants}
          animate="animate"
          initial="initial"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.4,
            delay: index * 0.1
          }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingDots; 