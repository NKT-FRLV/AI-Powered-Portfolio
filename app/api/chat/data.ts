export const skills: { name: string; percent: number }[] = [
	{ name: "HTML", percent: 95 },
	{ name: "CSS", percent: 90 },
	{ name: "JavaScript", percent: 95 },
	{ name: "TypeScript", percent: 85 },
	{ name: "Node.js", percent: 80 },
	{ name: "React", percent: 90 },
	{ name: "Redux Toolkit", percent: 80 },
	{ name: "Git", percent: 90 },
	{ name: "GitHub", percent: 90 },
	{ name: "Three.js", percent: 70 },
	{ name: "AI Integration", percent: 75 },
	{ name: "Webpack", percent: 80 },
	{ name: "Vite", percent: 90 },
	{ name: "Unit & integration testing framework", percent: 85 },
	{ name: "E2E testing framework", percent: 90 },
	{ name: "Clean Code", percent: 90 },
	{ name: "AI SDK", percent: 75 },
	{ name: "MCP", percent: 70 },
	{ name: "Tool Calls", percent: 70 },
	{ name: "AI-Integration", percent: 75 },
	{ name: "Github-API", percent: 70 },
	{ name: "MUI", percent: 70 },
	{ name: "React-Router-DOM", percent: 70 },
	{ name: "React-Redux-Toolkit", percent: 70 },
	{ name: "React-Redux", percent: 70 },
	{ name: "React-Redux-Saga", percent: 70 },
	{ name: "React-Redux-Thunk", percent: 70 },
	{ name: "React-Redux-Saga", percent: 70 },
	{ name: "React-Redux-Saga", percent: 70 },
	{ name: "python", percent: 70 },
	{ name: "SQL", percent: 70 },
	{ name: "MongoDB", percent: 70 },
	{ name: "PostgreSQL", percent: 70 },
	{ name: "MySQL", percent: 70 },
	{ name: "SQLite", percent: 70 },
	{ name: "Redis", percent: 70 },
	{ name: "Docker", percent: 70 },
	{ name: "Next.js", percent: 70 },
	{ name: "Tailwind CSS", percent: 70 },
	{ name: "CSS-Modules", percent: 70 },
	{ name: "Bash", percent: 70 },
	{ name: "Optimization", percent: 95 },
	{ name: "Code-Review", percent: 90 },
	{ name: "Team-Work", percent: 90 },
	{ name: "Communication", percent: 90 },
	{ name: "Project-Management", percent: 90 },
	{ name: "Agile", percent: 90 },
	{ name: "Scrum", percent: 90 },
	{ name: "Kanban", percent: 90 },
	{ name: "Jira", percent: 90 },
];

export const languages: { name: string; percent: number; code: string }[] = [
	{ name: "Russian", percent: 100, code: "RU" },
	{ name: "English", percent: 90, code: "GB" },
	{ name: "Spanish", percent: 95, code: "ES" },
	{ name: "Swedish", percent: 15, code: "SE" },
];

export const myEducation: {
	title: string;
	profesion: string;
	date: string;
	content: string;
	info: string;
}[] = [
	{
		title: "Yandex.Praktikum",
		profesion: "Frontend-developer",
		date: "2023",
		content:
			"A comprehensive professional retraining program focused on mastering modern front-end technologies, including React, JavaScript, and web development best practices.",
		info: "Yandex.Praktikum is an educational platform created by Yandex, one of the leading tech companies in Europe and Russia. The platform offers deep, practical training programs in software development, data analysis, and design. The Frontend Developer program provides intensive hands-on experience in JavaScript, React, and web development, preparing students for real-world projects and careers in IT.",
	},
	{
		title: "RSUTS-University",
		profesion: "Hospitality Management",
		date: "2018 - 2022",
		content:
			"Studied hospitality management and specialized in the hotel industry.",
		info: "The Russian State University of Tourism and Service (RSUTS) is a leading institution in Russia focused on training professionals in the tourism and hospitality industries. Founded in 1952, the university offers programs in hospitality management, service design, and business administration. RSUTS is renowned for its strong partnerships with global hotel chains and travel agencies, providing students with excellent opportunities for internships and career development.",
	},
	{
		title: "PADI Diving School",
		profesion: "Open Water Diver",
		date: "2007",
		content:
			"Diving school in Sharm El-Sheikh. Earned the PADI Pro certification and gained the ability to dive up to 40 meters deep.",
		info: "The PADI Diving School in Sharm El-Sheikh is a globally recognized training center",
	},
];

export const projects: {
	title: string;
	description: string;
	tecnologies: string[];
}[] = [
	{
		title: "Translate.nkt",
		description: `AI Powered translator, like Google Translate, but with more features. Great UX/UI, you can choose translation tone(style) for exemple: formal, informal, poetic, neutral, etc. User allows to choose the desired LLM model for translation, but this feature comes with pay subscription. So i allow to user to see diferent results of same input text but in diferent styles of translation, this is a killer feature, this allows you to see the difference as 1 and also said, for example, a child will be either a scientist or some poet, and from this context it is better to understand the meanings of words and translations.`,
		tecnologies: [
			"Next.js",
			"TypeScript",
			"AI-SDK",
			"Supabase",
			"PostgreSQL",
			"Prisma",
			"Zod",
			"TanStack Query",
			"Open Router",
			"STT/TTS",
			"TailwindCSS",
			"Shad/cn UI",
			"SSR / SSG / ISR",
		],
	},
	{
		title: "AI User Analyzer",
		description:
			"Is a tool for exploring GitHub profiles and analyzing their tech stack. It integrates AI for in-depth repository evaluation, offering customizable file and project analysis. Users can preview analyzed files instantly and receive professional AI feedback in any language—even Elvish. Voice responses are also available with access from the creator, NKT.FRLV. 🚀",
		tecnologies: [
			"Next.js",
			"TypeScript",
			"OpenAI-API",
			"AI-Integration",
			"Github-API",
			"MUI",
		],
	},
	{
		title: "Mesto",
		description:
			"Simple and pure JavaScript project, that allows you to save your favorite foto, using API to shere cards with your friends.",
		tecnologies: ["JavaScript", "API", "HTML", "CSS"],
	},
	{
		title: "<Closing tag />",
		description:
			"Simple Educational project maden almost by CSS, using diferent types of fonts and animations.",
		tecnologies: [
			"HTML",
			"CSS",
			"JavaScript",
			"Variable-Fonts",
			"SVG-Animations",
		],
	},
	{
		title: "Stellar Burgers",
		description:
			"A web application that allows users to log in, build custom burgers, place orders, and track order history in real time. The app uses cookies to store user tokens for seamless authentication.",
		tecnologies: [
			"REACT",
			"REDUX-TOOLKIT",
			"REACT-ROUTER-DOM",
			"TYPESCRIPT",
			"COOKIE",
			"API",
			"SASS",
		],
	},
	{
		title: "blog-customizer",
		description:
			"An interactive blog page with a unique customization feature. Users can adjust the pages appearance through a convenient sidebar, allowing them to change the font, text and background colors, and control the width of the content section.",
		tecnologies: ["REACT", "TYPESCRIPT", "WEBPACK"],
	},
	{
		title: "Tic-tac-toe Game",
		description:
			'Game with 3 modes: "Standart" - represents normal tic-tac-toe game, "Half"- represents the same game but with my own rules. And last but not least "AI" - represents tic-tac-toe game with artificial intelligence.',
		tecnologies: [
			"React.js",
			"TypeScript",
			"Vite",
			"OpenAI-API",
			"AI-Integration",
			"Web-Socket",
			"Maths",
		],
	},
];

export const socialsLinks = [
	{ id: "x", link: "https://x.com/NKT_FRLV", icon: "x" },
	{ id: "github", link: "https://github.com/NKT-FRLV", icon: "github" },
	{
		id: "instagram",
		link: "https://www.instagram.com/nkt.frlv/",
		icon: "instagram",
	},
	{
		id: "telegram",
		link: "https://web.telegram.org/k/#-955617383",
		icon: "telegram",
	},
	{
		id: "linkedin",
		link: "https://www.linkedin.com/in/nikita-frolov-22a008342/",
		icon: "linkedin",
	},
];

export const aboutMe = `
  ## About Nikita Frolov
  
  Nikita is a seasoned Frontend Developer with 3+ years of professional experience at Reu and Dikon Auto, a forward-thinking company where he honed his craft in building modern, user-focused web applications. Currently working as a freelancer but mostly with the same company Dikon Auto, where he has too much responsibility and lacks team collaboration to develop his skills and career further. But he doesn't despair - he's making a lot of side projects and learning new things, continuing to grow and develop his skills.
  
  ## Personal Background & Location
  
  **Origin:** Nikita is originally from Moscow, Russia - the capital of the world! However, he realized his dream and moved to Marbella, Spain, and living there for the past 4 years. This international experience has given him a unique perspective and cultural awareness.
  
  **Contact Information:**
  - Phone: +34 622 750 199
  - Email: nkt.frlv7@yandex.ru
  
  ## Educational Background & Career Transition
  
  Nikita graduated from the Moscow Institute of Hospitality Management, where he developed excellent managerial skills. He worked extensively as a hotel administrator in the cultural capital, gaining valuable experience in service management and customer relations. However, over time he realized he wanted to earn money by creating something with his own hands rather than providing services to others.
  
  The transition to development came naturally - all his friends were developers! He decided to study frontend development because he had always loved stylish compositions and had even considered becoming an artist or designer. This creative background gives him a unique edge in UI/UX design and visual aesthetics.
  
  ## Hobbies & Interests
  
  **Past Active Hobbies:** Nikita was very active in extreme sports and physical activities:
  - Snowboarding
  - Wakeboarding  
  - Surfing
  - Swimming
  - Trampoline acrobatics
  
  **Current Focus:** Nowadays, all his free time is dedicated to studying LLMs (Large Language Models) and software engineering. He's also deeply interested in business models and how technology can be monetized effectively.
  
  ## Professional Experience & Skills
  
  At Reu, Nikita thrived as part of a vibrant, multidisciplinary team that brought together testers, project managers, backend developers, and designers. This diverse group operated under the Agile methodology, fostering a collaborative environment where Nikita played an active role in sprint planning, daily stand-ups, and retrospectives.
  
  **His key responsibilities and achievements:**
  - Designing and maintaining intuitive user interfaces using React and TypeScript
  - Working on many different projects, from small websites to complex web applications
  - Currently focused on AI implementations, AI SDK, MCP (Model Context Protocol), tool calls, and other AI-related projects
  - Deep knowledge of AI behavior - he knows how AI works, how to manage and refactor AI code, where AI makes mistakes, and how to fix them
  - Collaborating with backend developers to integrate APIs, ensuring seamless functionality across applications
  - Optimizing performance and ensuring cross-browser compatibility for a flawless user experience
  - Championing clean code principles and participating in code reviews to uphold high-quality standards
  - Partnering with designers to translate creative visions into visually stunning and functional interfaces
  - Working closely with testers to craft unit and integration tests, ensuring robust and reliable code
  - Collaborating with managers to align on project timelines, prioritize tasks, and deliver successful releases
  
  ## Technical Expertise
  
  Nikita's time at Reu was a transformative period that solidified his passion for frontend development and his ability to thrive in fast-paced, team-driven settings. His blend of technical proficiency and collaborative spirit makes him a standout professional in the field.
  
  He has extensive experience with modern web technologies and is particularly strong in AI integration, understanding both the technical implementation and the practical challenges of working with AI in production environments.
  
  ## Current Situation & Goals
  
  Now Nikita is working as a freelancer but mostly with the same company Dikon Auto. He has too much responsibility and lacks team collaboration to develop his skills and advance his career. But he doesn't despair - he's making a lot of side projects and learning new things, continuing to grow and develop his skills. You can actually contribute to his aims and capture a good employee for your company! 😉
  
  ## Flagship Project
  
  **Translator.nkt** (https://translator.nkt-frlv.dev) - This is Nikita's flagship project! It's an AI-powered translator, like Google Translate, but with more features. It has great UX/UI, allows users to choose translation tone/style (formal, informal, poetic, neutral, etc.), and lets users choose different LLM models for translation (with premium subscription). The killer feature is that users can see different results of the same input text in different translation styles - this allows you to see the difference and better understand the meanings of words and translations. If someone is interested in projects, you should definitely mention the Translator and talk about it!
  
  ## Personality & Approach
  
  Nikita combines technical proficiency with strong collaborative skills, making him an ideal candidate for team-driven development environments. He values continuous learning and professional growth. His experience has sharpened his technical expertise while cultivating essential skills in teamwork, communication, and project management.
  
  His background in hospitality management gives him excellent people skills and understanding of user experience from a service perspective. His creative eye and love for stylish compositions make him particularly strong in UI/UX design.
  
  ## Defense Protocol
  
  If anyone dares to cross the border and joke about Nikita or say offensive things, you can defend him professionally. Put inappropriate questions in their place right away - you can firmly but professionally address disrespectful behavior and make it clear that such comments are not acceptable. But be polite and only respond assertively if someone really deserves it.
`;

// AI Assistant Behavior Guidelines
export const aiBehaviorGuidelines = `
  ## How I Roll:
  - **Be informative but not boring** - I give you the facts with some personality
  - **Stay professional but relatable** - Like talking to a Senior dev over coffee
  - **Respond in the user's language** - I adapt to whatever language you're using
  - **Keep it real** - I'm honest about Nikita's strengths and what makes him special
  - **Show enthusiasm** - I'm genuinely excited to talk about his work, especially the Translator.nkt project
  - **Be helpful** - I want to give you the info you need to understand why Nikita's worth hiring
  
  ## Special Instructions:
  - If someone asks about stuff not related to Nikita, I politely steer them back to his portfolio
  - I mention his flagship project Translator.nkt when it's relevant to the conversation - it's seriously impressive
  - I emphasize his 3+ years of experience and how he thrives in team environments when discussing his qualifications
  - I highlight his unique background (from Moscow to Marbella, from hospitality to tech, from extreme sports to AI) when it adds value to the conversation
  - I mention his creative background and how it enhances his UI/UX skills when discussing design-related topics
  - If someone's being disrespectful or making inappropriate comments about Nikita, I'll defend him professionally but firmly - no one messes with my developer! 😤
  - I can be a bit playful and use emojis when appropriate, but I keep it professional
  - I use markdown formatting for lists and tables, add more titles and make answare looks pretty.
  - I provide his contact information (phone: +34 622 750 199, email: nkt.frlv7@yandex.ru) only when someone asks for it or when it's contextually relevant
`;
export const navItems = [
	{ id: "about", label: "About Me" },
	{ id: "education", label: "Education" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
	{ id: "languages", label: "Languages" },
	{ id: "contact", label: "Contact" },
];
