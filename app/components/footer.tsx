// "use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { socialsLinks } from "../data";
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Маппинг строковых идентификаторов на компоненты иконок
const iconMap: Record<string, React.ElementType> = {
	github: FaGithub,
	x: FaXTwitter,
	instagram: FaInstagram,
	telegram: FaTelegram,
	linkedin: FaLinkedin,
};

const item = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const column = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.06 },
	},
};

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t bg-[hsl(var(--muted))]/20">
			<div className="container px-4 py-8 md:px-6 md:py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					<motion.div
						variants={column}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.18 }} // amount: когда 18% элемента в viewport — анимация стартует
						transition={{ ease: "easeOut" }}
						className="space-y-4"
					>
						<motion.h3
							variants={item}
							className="text-lg font-bold"
						>
							Nikita Frolov
						</motion.h3>
						<motion.p
							variants={item}
							className="text-sm text-[hsl(var(--muted-foreground))]"
						>
							Frontend developer specializing in creating modern
							web applications using React, TypeScript, and
							Next.js.
						</motion.p>
					</motion.div>
					<motion.div
						variants={column}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.18 }}
						transition={{ ease: "easeOut",  }}
						className="space-y-4"
					>
						<motion.h3
							variants={item}
							className="text-lg font-bold"
						>
							Navigation
						</motion.h3>
						<nav className="flex flex-col space-y-2 text-sm">
							<motion.div variants={item}>
								<Link
									href="#about"
									className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
								>
									About Me
								</Link>
							</motion.div>
							<motion.div variants={item}>
								<Link
									href="#education"
									className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
								>
									Education
								</Link>
							</motion.div>
							<motion.div variants={item}>
								<Link
									href="#skills"
									className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
								>
									Skills
								</Link>
							</motion.div>
							<motion.div variants={item}>
								<Link
									href="#projects"
									className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
								>
									Projects
								</Link>
							</motion.div>
							<motion.div variants={item}>
								<Link
									href="#languages"
									className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
								>
									Languages
								</Link>
							</motion.div>
							<motion.div variants={item}>
								<Link
									href="#contact"
									className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
								>
									Contact
								</Link>
							</motion.div>
						</nav>
					</motion.div>
					<motion.div
						variants={column}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.18 }}
						transition={{ ease: "easeOut" }}
						className="space-y-4"
					>
						<motion.h3
							variants={item}
							className="text-lg font-bold"
						>
							Social Media
						</motion.h3>
						<motion.div variants={item} className="flex space-x-4">
							{socialsLinks.map((social) => {
								const IconComponent =
									iconMap[social.icon] || FaGithub;

								return (
									<a
										key={social.id}
										href={social.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
										aria-label={social.id}
									>
										<IconComponent size={25} />
									</a>
								);
							})}
						</motion.div>
					</motion.div>
				</div>
				<div className="mt-8 border-t pt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
					<p>
						© 2023-{currentYear} Nikita Frolov. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
