import { StaticImageData } from 'next/image';
import mestoImage from '../public/mesto.webp'
import stellarBurgersImage from '../public/stellar-burgers.webp'
import closingTagImage from '../public/closing-tag-screen.webp'
import blogCustomizerImage from '../public/blog-customizer.webp'
import ticTacToeImage from '../public/gameAI.webp'
import GHUserAnalyzerImage from '../public/GH-User-Analyzer.webp'
import TranslateImage from '../public/translator-img.png'
import { NavItem } from './components/header/navigation';
import { AchievementCardProps } from './types/dataTypes';

const gitHubRepoUrl = 'https://github.com/NKT-FRLV';

export const skills: { name: string; percent: number; icon: string }[] = [
  { name: 'HTML', percent: 95, icon: 'html5' },
  { name: 'CSS', percent: 90, icon: 'css3' },
  { name: 'JavaScript', percent: 95, icon: 'js' },
  { name: 'TypeScript', percent: 85, icon: 'typescript' },
  { name: 'Node.js', percent: 80, icon: 'nodejs' },
  { name: 'React', percent: 90, icon: 'react' },
  { name: 'Redux Toolkit', percent: 80, icon: 'redux' },
  { name: 'Git', percent: 90, icon: 'git' },
  { name: 'GitHub', percent: 90, icon: 'github' },
  { name: 'Three.js', percent: 70, icon: 'threejs' },
  { name: 'AI Integration', percent: 75, icon: 'openai' },
  { name: 'Webpack', percent: 80, icon: 'webpack' },
  { name: 'Vite', percent: 90, icon: 'vite' },
  { name: 'Unit & integration testing framework', percent: 85, icon: 'jest' },
  { name: 'E2E testing framework', percent: 90, icon: 'cypress' },
  { name: 'Clean Code', percent: 90, icon: 'sparkles' },
];

export const languages: { name: string; percent: number; code: string }[] = [
  { name: 'Russian', percent: 100, code: 'RU' },
  { name: 'English', percent: 90, code: 'GB' },
  { name: 'Spanish', percent: 85, code: 'ES' },
  { name: 'Swedish', percent: 15, code: 'SE' }
];

export const myEducation: {
  title: string;
  profesion: string;
  date: string;
  content: string;
  info: string;
  logo: string;
  documentationPath: string;
  documentName: string
}[] = [
  { 
    title: 'Yandex.Praktikum', 
    profesion: 'Frontend-developer', 
    date: '2023',
    content: 'A comprehensive professional retraining program focused on mastering modern front-end technologies, including React, JavaScript, and web development best practices.',
    info: 'Yandex.Praktikum is an educational platform created by Yandex, one of the leading tech companies in Europe and Russia. The platform offers deep, practical training programs in software development, data analysis, and design. The Frontend Developer program provides intensive hands-on experience in JavaScript, React, and web development, preparing students for real-world projects and careers in IT.',
    logo: 'university',
    documentationPath: '/documents/Practikum-certificate.pdf',
    documentName: 'Nikita_Yandex-Praktikum_Education'
  },
  { 
    title: 'RSUTS-University', 
    profesion: 'Hospitality Management', 
    date: '2018 - 2022', 
    content: 'Studied hospitality management and specialized in the hotel industry.',
    info: 'The Russian State University of Tourism and Service (RSUTS) is a leading institution in Russia focused on training professionals in the tourism and hospitality industries. Founded in 1952, the university offers programs in hospitality management, service design, and business administration. RSUTS is renowned for its strong partnerships with global hotel chains and travel agencies, providing students with excellent opportunities for internships and career development.',
    logo: 'graduation-cap',
    documentationPath: '/documents/Education-University.pdf',
    documentName: 'Nikita_University_Education'
  },
  { 
    title: 'PADI Diving School', 
    profesion: 'Open Water Diver', 
    date: '2007', 
    content: 'Diving school in Sharm El-Sheikh. Earned the PADI Pro certification and gained the ability to dive up to 40 meters deep.',
    info: 'The PADI Diving School in Sharm El-Sheikh is a globally recognized training center',
    logo: 'swimmer',
    documentationPath: '/documents/OPEN-WATER-DIVER.pdf',
    documentName: 'Nikita_Diving_Education'
  }
];

export const projects: {
  title: string;
  image: StaticImageData;
  description: string;
  tecnologies: string[];
  urlGitHub: string;
  urlDemo: string;
}[] = [
	{
		title: 'Translate.nkt',
		image: TranslateImage,
		description: 'AI Powered translator, like Google Translate, but with more features.',
		tecnologies: ['Next.js', 'TypeScript', 'AI-SDK', 'Open Router', 'STT/TTS', 'TailwindCSS', 'Shad/cn UI'],
		urlGitHub: `${gitHubRepoUrl}/The-Real-Translator`,
		urlDemo: 'https://translator.nkt-frlv.dev',
	  },
  {
    title: 'AI User Analyzer',
    image: GHUserAnalyzerImage,
    description: 'Is a tool for exploring GitHub profiles and analyzing their tech stack. It integrates AI for in-depth repository evaluation, offering customizable file and project analysis. Users can preview analyzed files instantly and receive professional AI feedback in any language—even Elvish. Voice responses are also available with access from the creator, NKT.FRLV. 🚀',
    tecnologies: ['Next.js', 'TypeScript', 'OpenAI-API', 'AI-Integration', 'Github-API', 'MUI'],
    urlGitHub: `${gitHubRepoUrl}/GitHub-User-Analyzer`,
    urlDemo: 'https://git-hub-user-analyzer.vercel.app/',
  },
  {
    title: 'Mesto',
    image: mestoImage,
    description: 'Simple and pure JavaScript project, that allows you to save your favorite foto, using API to shere cards with your friends.',
    tecnologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    urlGitHub: `${gitHubRepoUrl}/mesto.git`,
    urlDemo: 'https://NKT-FRLV.github.io/mesto/',
  },
  {
    title: '<Closing tag />',
    image: closingTagImage,
    description: 'Simple Educational project maden almost by CSS, using diferent types of fonts and animations.',
    tecnologies: ['HTML', 'CSS','JavaScript', 'Variable-Fonts', 'SVG-Animations'],
    urlGitHub: `${gitHubRepoUrl}/zakrivayuschiy-teg-f`,
    urlDemo: 'https://NKT-FRLV.github.io/zakrivayuschiy-teg-f/',
  },
  {
    title: 'Stellar Burgers',
    image: stellarBurgersImage,
    description: 'A web application that allows users to log in, build custom burgers, place orders, and track order history in real time. The app uses cookies to store user tokens for seamless authentication.',
    tecnologies: ['REACT', 'REDUX-TOOLKIT', 'REACT-ROUTER-DOM', 'TYPESCRIPT', 'COOKIE', 'API', 'SASS'],
    urlGitHub: `${gitHubRepoUrl}/stellar-burgers`,
    urlDemo: 'https://stellar-burgers-git-main-mi-viejo-amigos-projects.vercel.app/',
  },
  {
    title: 'blog-customizer',
    image: blogCustomizerImage,
    description: 'An interactive blog page with a unique customization feature. Users can adjust the pages appearance through a convenient sidebar, allowing them to change the font, text and background colors, and control the width of the content section.',
    tecnologies: ['REACT', 'TYPESCRIPT', 'WEBPACK'],
    urlGitHub: `${gitHubRepoUrl}/blog-customizer`,
    urlDemo: 'https://blog-customizer-puce.vercel.app/',
  },
  {
    title: 'Tic-tac-toe Game',
    image: ticTacToeImage,
    description: 'Game with 3 modes: "Standart" - represents normal tic-tac-toe game, "Half"- represents the same game but with my own rules. And last but not least "AI" - represents tic-tac-toe game with artificial intelligence.',
    tecnologies: ['React.js', 'TypeScript', 'Vite', 'OpenAI-API', 'AI-Integration'],
    urlGitHub: `${gitHubRepoUrl}/tic-tak-toe_client`,
    urlDemo: 'https://tic-tak-toe-client.vercel.app/',
  }
];

export const socialsLinks = [
  { id: 'github', link: gitHubRepoUrl, icon: 'github' },
  { id: 'X', link: "https://x.com/nkt_frlv", icon: 'x' },
  { id: 'instagram', link: "https://www.instagram.com/nkt.frlv/", icon: 'instagram' },
  { id: 'telegram', link: 'https://web.telegram.org/k/#-955617383', icon: 'telegram' },
  { id: 'linkedin', link: 'https://www.linkedin.com/in/nikita-frolov-22a008342/', icon: 'linkedin' },
] 

export const aboutMe = `
  Context About Nikita
  Nikita is a seasoned frontend developer with 2.5 years of experience at Reu, a forward-thinking company where he honed his craft in building modern, user-focused web applications. At Reu, Nikita thrived as part of a vibrant, multidisciplinary team that brought together testers, project managers, backend developers, and designers. This diverse group operated under the Agile methodology, fostering a collaborative environment where Nikita played an active role in sprint planning, daily stand-ups, and retrospectives.

  His responsibilities at Reu were both challenging and rewarding:

  Designing and maintaining intuitive user interfaces using React and TypeScript.
  Collaborating with backend developers to integrate APIs, ensuring seamless functionality across applications.
  Optimizing performance and ensuring cross-browser compatibility for a flawless user experience.
  Championing clean code principles and participating in code reviews to uphold high-quality standards.
  Partnering with designers to translate creative visions into visually stunning and functional interfaces.
  Beyond development, Nikita worked closely with testers to craft unit and integration tests, ensuring robust and reliable code. He also collaborated with managers to align on project timelines, prioritize tasks, and deliver successful releases. This experience sharpened his technical expertise while cultivating essential skills in teamwork, communication, and project management.

  Nikita's time at Reu was a transformative period that solidified his passion for frontend development and his ability to thrive in fast-paced, team-driven settings. His blend of technical proficiency and collaborative spirit makes him a standout professional in the field.
`
export const navItems: NavItem[] = [
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'languages', label: 'Languages' },
  { id: 'contact', label: 'Contact' }
];

export const interests = [
  { 
    name: "Ethical Coding", 
    description: "Committed to developing software with ethical considerations",
    bgClass: "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-800/40"
  },
  { 
    name: "Design Thinking", 
    description: "Using human-centered approach to solve complex problems",
    bgClass: "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40"
  },
  { 
    name: "Traveling", 
    description: "Discovering new places and cultures",
    bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
  },
  { 
    name: "Diving", 
    description: "Love exploring underwater worlds",
    bgClass: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40"
  },
  { 
    name: "Languages", 
    description: "Passionate about learning new languages",
    bgClass: "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40"
  },
  { 
    name: "Learning", 
    description: "Continuous knowledge seeker",
    bgClass: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40"
  }
];

// Define tech stack with descriptions
export const techStack = [
  { 
    name: "Layout", 
    description: "HTML / CSS / TailwindCSS",
    bgClass: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40"
  },
  {
    name: "Dev Tools",
    description: "I can use DevTools to debug and optimize my code",
    bgClass: "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40"
  },
  { 
    name: "React", 
    description: "Building interactive UIs with components",
    bgClass: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40"
  },
  { 
    name: "TypeScript", 
    description: "Type-safe JavaScript for robust applications",
    bgClass: "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40"
  },
  { 
    name: "NextJS", 
    description: "React framework for production-grade applications",
    bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
  },
  { 
    name: "AI", 
    description: "Integrating AI-powered features into web applications",
    bgClass: "bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-800/40"
  },
  { 
    name: "MCP", 
    description: "Managing cloud processing infrastructure",
    bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
  },
  { 
    name: "MongoDB", 
    description: "Document-based database for flexible schemas",
    bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
  },
  { 
    name: "Testing", 
    description: "Ensuring code quality through automated testing with Jest and Cypress",
    bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
  }
];

// About section data
export const aboutContent = {
  shortBio: "Frontend developer with experience in creating modern web applications and a passion for building intuitive and responsive user interfaces.",
  approach: "I strive to create clean, maintainable code that provides an excellent user experience. I pay special attention to details and always look for ways to optimize performance.",
  goals: "My goal is to constantly improve my skills and stay up-to-date with the latest trends in web development. I aim to create innovative solutions that help businesses grow and develop.",
  experience: "I've worked on various projects, from small websites to complex web applications. My experience includes working with React, TypeScript, Next.js, and integrating AI technologies into web applications."
};

export const characterTraits = [
  { 
    trait: "Creativity", 
    description: "Finding innovative solutions for complex problems", 
    icon: "sparkles",
    color: "text-amber-500"
  },
  { 
    trait: "Attention to Detail", 
    description: "Noticing and fixing even the smallest issues", 
    icon: "magnifying-glass",
    color: "text-indigo-500"
  },
  { 
    trait: "Analytical Thinking", 
    description: "Breaking down complex problems into understandable components", 
    icon: "chart-bar",
    color: "text-emerald-500"
  },
  { 
    trait: "Team Player", 
    description: "Working effectively in teams, valuing everyone's contribution", 
    icon: "users",
    color: "text-blue-500"
  }
];

export const workPreferences = [
  { 
    preference: "Remote Work", 
    description: "Prefer flexible schedule and home office environment", 
    icon: "home",
    bgClass: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40"
  },
  { 
    preference: "Agile Methodologies", 
    description: "Sprints, daily standups, and regular feedback", 
    icon: "puzzle-piece",
    bgClass: "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40"
  },
  { 
    preference: "Open Communication", 
    description: "Value transparency and open dialogue", 
    icon: "chat-bubble-left-right",
    bgClass: "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-800/40"
  },
  { 
    preference: "Continuous Learning", 
    description: "Always learning new technologies and approaches", 
    icon: "academic-cap",
    bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
  }
];

// Professional achievements data
export const achievements: AchievementCardProps[] = [
  {
    id: "perf-opt",
    title: "Performance Optimization",
    shortDescription: "Increased page loading speed by 75%",
    icon: "bolt",
    iconColor: "text-yellow-500",
    problem: "Slow initial page load and high LCP metrics affecting user experience and SEO ranking",
    solution: "Implemented code splitting, optimized asset loading, and utilized Next.js Image component with proper sizing",
    result: "Reduced page load time from 4.2s to 1.1s and improved Core Web Vitals metrics across the board",
    metrics: {
      before: 25,
      after: 100,
      unit: "%"
    }
  },
  {
    id: "ux-redesign",
    title: "UX Redesign",
    shortDescription: "Reduced bounce rate by 40%",
    icon: "sparkles",
    iconColor: "text-purple-500",
    problem: "Confusing navigation and unintuitive interface leading to high bounce rates and low conversion",
    solution: "Conducted user research, implemented A/B testing, and redesigned the interface with a focus on intuitive user flows",
    result: "Improved user engagement metrics with 40% lower bounce rate and 25% higher conversion rate",
    metrics: {
      before: 60,
      after: 100,
      unit: "%"
    }
  },
  {
    id: "accessibility",
    title: "Accessibility Improvements",
    shortDescription: "Achieved WCAG AA compliance",
    icon: "check-circle",
    iconColor: "text-green-500",
    problem: "Website was not accessible to users with disabilities, failing several WCAG requirements",
    solution: "Implemented semantic HTML, improved keyboard navigation, added ARIA attributes, and ensured proper color contrast",
    result: "Achieved WCAG AA compliance and improved experience for all users, including those with disabilities",
    metrics: {
      before: 40,
      after: 95,
      unit: "%"
    }
  },
  {
    id: "code-refactor",
    title: "Code Refactoring",
    shortDescription: "Reduced bundle size by 35%",
    icon: "code",
    iconColor: "text-blue-500",
    problem: "Legacy codebase with technical debt, inconsistencies, and redundant code",
    solution: "Systematically refactored code, implemented modern patterns, and removed unused dependencies",
    result: "Reduced bundle size by 35%, improved maintainability, and enabled faster feature development",
    metrics: {
      before: 65,
      after: 100,
      unit: "%"
    }
  },
  {
    id: "mobile-resp",
    title: "Mobile Responsiveness",
    shortDescription: "Improved mobile conversion by 50%",
    icon: "device-mobile",
    iconColor: "text-red-500",
    problem: "Poor user experience on mobile devices with non-responsive layouts and small touch targets",
    solution: "Implemented mobile-first approach, redesigned UI components, and improved touch interactions",
    result: "Increased mobile traffic by 30% and improved mobile conversion rate by 50%",
    metrics: {
      before: 50,
      after: 100,
      unit: "%"
    }
  }
];