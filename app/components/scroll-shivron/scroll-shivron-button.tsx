// import { motion } from 'framer-motion'
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ScrollShivronButtonProps {
	isSectionsLoaded?: boolean;
	scrollToEdge: (section: "top" | "bottom") => void;
}

const ScrollShivronButton = ({
	isSectionsLoaded,
	scrollToEdge,
}: ScrollShivronButtonProps) => {
	const [isOnTheTop, setIsOnTheTop] = useState(true);

	const scrollTo = () => {
		if (!isSectionsLoaded) return;

		setIsOnTheTop((prev) => !prev);

		if (isOnTheTop) {
			// Скролл в самый низ

			scrollToEdge("bottom");
		} else {
			// Скролл наверх
			scrollToEdge("top");
		}
	};

	return (
		<div
			className={`fixed bottom-4 left-0 right-0 z-10 flex justify-center pointer-events-none hover:scale-110 transition-transform duration-300 ${
				isOnTheTop ? "rotate-180" : ""
			} transition-transform duration-300`}
		>
			<button
				className={cn(
					"animate-fade-in-down",
					"pointer-events-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-3 rounded-full shadow-lg"
				)}
				onClick={scrollTo}
				aria-label={isOnTheTop ? "Scroll to bottom" : "Scroll to top"}
			>
				<FaChevronUp size={20} />
			</button>
		</div>
	);
};

export default ScrollShivronButton;
