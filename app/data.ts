import { StaticImageData } from 'next/image';
import mestoImage from '../public/mesto.webp'
import stellarBurgersImage from '../public/stellar-burgers.webp'
import closingTagImage from '../public/closing-tag-screen.webp'
import blogCustomizerImage from '../public/blog-customizer.webp'
import ticTacToeImage from '../public/gameAI.webp'
import GHUserAnalyzerImage from '../public/GH-User-Analyzer.webp'
import { NavItem } from './components/header/navigation';

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
  { name: 'Russian', percent: 95, code: 'RU' },
  { name: 'English', percent: 90, code: 'GB' },
  { name: 'Spanish', percent: 70, code: 'ES' },
  { name: 'Swedish', percent: 50, code: 'SE' }
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