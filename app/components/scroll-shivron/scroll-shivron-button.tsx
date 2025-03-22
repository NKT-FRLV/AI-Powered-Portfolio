import { motion } from 'framer-motion'
import { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa'

interface ScrollShivronButtonProps {
  isSectionsLoaded: boolean;
  scrollToEdge: (section: 'top' | 'bottom') => void;
}

const ScrollShivronButton = ({ isSectionsLoaded, scrollToEdge }: ScrollShivronButtonProps) => {

    const [isOnTheTop, setIsOnTheTop] = useState(true);

    const scrollTo = () => {
        if (!isSectionsLoaded) return;
        
        setIsOnTheTop(prev => !prev);
        
        if (isOnTheTop) {
        // Скролл в самый низ
        
        scrollToEdge('bottom');
        } else {
        // Скролл наверх
        scrollToEdge('top');
        }
    };

    return (
        <div className="fixed bottom-4 left-0 right-0 z-10 flex justify-center pointer-events-none">
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                rotate: isOnTheTop ? 180 : 0,
                opacity: isSectionsLoaded ? 1 : 0,
                y: isSectionsLoaded ? 0 : 20
                }}
                whileHover={{ scale: 1.1 }}
                onClick={scrollTo}
                className="pointer-events-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-3 rounded-full shadow-lg"
                aria-label={isOnTheTop ? "Scroll to bottom" : "Scroll to top"}
            >
                <FaChevronUp size={20} />
            </motion.button>
        </div>
    )
}

export default ScrollShivronButton