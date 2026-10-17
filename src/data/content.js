/**
 * Every piece of copy on the site lives here.
 * Edit this file and the whole portfolio updates — no component changes needed.
 */

export const profile = {
  firstName: "ABHINAY",
  lastName: "KUMAR",
  initials: "AK",
  email: "abhinyaay@gmail.com",
  location: "Agra, India",
  // TODO: drop your PDF at public/resume.pdf and this button starts working.
  resume: "/resume.pdf",
  // The 3D character (Ready Player Me's example avatar). To make it YOU:
  // create an avatar from your photo at https://readyplayer.me or
  // https://avaturn.me, download the .glb, save it as
  // public/models/character.glb and change this path — no code changes needed.
  // The hero character — a scene published from Spline (Export → Code → React).
  // To change it: publish a new scene and paste its .splinecode URL here.
  splineScene: "https://prod.spline.design/Ng3zv3sWjWqG3EvH/scene.splinecode",
  roles: [
    "FULL-STACK DEVELOPER",
    "AI ENGINEER",
    "AUTOMATION ENGINEER",
    "DATA SCIENTIST",
    "DEVOPS ENGINEER",
  ],
  socials: [
    { name: "Github", url: "https://github.com/abhinyaay", icon: "github" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/abhinyaay", icon: "linkedin" },
  ],
};

export const disciplines = [
  {
    id: "fullstack",
    label: "FULL-STACK",
    headline: "Products end to end, from schema to screen",
    body: "Spring Boot services, React front-ends and .NET pieces stitched together behind one gateway. I care about the parts nobody demos — migrations, auth, error states, the second deploy.",
    skills: [
      "Java",
      "Spring Boot",
      "React",
      "Node.js",
      ".NET",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Tailwind",
    ],
  },
  {
    id: "ai",
    label: "AI & AUTOMATION",
    headline: "Systems that do the boring work for you",
    body: "Local-first LLM pipelines, document parsers, computer-vision trainers and bots that click the things I do not want to click. Python, mostly, and a stubborn preference for running models on my own machine.",
    skills: [
      "Python",
      "LLMs",
      "Ollama",
      "NLP",
      "Scikit-learn",
      "OpenCV",
      "FastAPI",
      "Selenium",
      "Pandas",
      "Bots",
    ],
  },
  {
    id: "devops",
    label: "DEVOPS & DATA",
    headline: "Shipping it, then knowing what it is doing",
    body: "Docker images, Jenkins pipelines and AWS deploys, plus enough SQL tuning to know that the right index beats a bigger instance almost every time.",
    skills: [
      "Docker",
      "Jenkins",
      "AWS",
      "Linux",
      "Git",
      "CI/CD",
      "SQL",
      "NumPy",
      "Matplotlib",
      "Jupyter",
    ],
  },
];

export const timeline = [
  {
    title: "Building in Public",
    org: "Orbit Learn · FixGuard",
    year: "NOW",
    body: "Shipping a social learning platform for tech students and a local-first CLI that keeps fast code from becoming a 2 AM incident. Both in the open, bugs and all.",
  },
  {
    title: "PG-CP in Advanced Computing",
    org: "C-DAC, Pune",
    year: "2026",
    body: "Java, Spring Boot, .NET, DBMS, web technologies and operating system internals — the fundamentals, taught the hard way and on a deadline.",
  },
  {
    title: "Full-Stack & DevOps",
    org: "Self-driven",
    year: "2025",
    body: "Spring Boot services, React clients, Docker images, Jenkins pipelines and AWS deploys. Learned that Lambda plus S3 plus CloudWatch changes how you think about servers.",
  },
  {
    title: "Automation & Backend",
    org: "Projects",
    year: "2024",
    body: "A Django restaurant POS with live table management, a cold-email engine, document parsers and booking bots. Python quietly doing the boring work.",
  },
  {
    title: "Web Development",
    org: "Projects",
    year: "2023",
    body: "MERN stack, React apps and REST APIs — and a first real sense of what the word full-stack actually costs you.",
  },
  {
    title: "Data Science & ML",
    org: "Foundations",
    year: "2022",
    body: "First models: house-price prediction, a chatbot, facial-expression song suggestion, and diabetic retinopathy detection as a college mini-project.",
  },
  {
    title: "B.Tech, Computer Science",
    org: "Dr. A.P.J. Abdul Kalam Technical University",
    year: "2020",
    body: "Four years of CSE fundamentals, finishing with a diabetic retinopathy detection model. Graduated 2024 with a 7.86.",
  },
];

export const education = [
  {
    school: "Centre for Development of Advanced Computing (C-DAC)",
    course: "Post Graduate Certificate Program — Advanced Computing (PGCP-AC)",
    place: "Pune, Maharashtra",
    year: "Feb 2026 — Aug 2026",
    note: "Full-stack program covering Core Java & OOP, Data Structures & Algorithms, database technologies (SQL/MySQL, MongoDB) and web-based Java — Servlets, JSP, Hibernate, Spring Boot and microservices.",
  },
  {
    school: "Dr. A.P.J. Abdul Kalam Technical University",
    course: "Bachelor of Technology — Computer Science and Engineering",
    place: "Grade 7.86",
    year: "Aug 2020 — Jul 2024",
    note: "Four-year CSE degree. Final-year mini-project was a diabetic retinopathy detection model built on retinal scan imaging.",
  },
];

export const projects = [
  {
    no: "01",
    name: "Orbit Learn",
    category: "Full Stack",
    blurb:
      "A social learning platform for tech students. Spring Boot services, a React client and a .NET microservice behind a shared gateway, with real-time rooms and WebRTC calls.",
    tools: ["Spring Boot", "React", ".NET", "MySQL", "Docker", "WebRTC", "JWT"],
    repo: "https://github.com/abhinyaay/orbitlearn",
    live: null,
  },
  {
    no: "02",
    name: "FixGuard",
    category: "DevTools / Security",
    blurb:
      "A verifiable, local-first CLI that scans, fixes and hardens your code with AI-assisted healing, OWASP checks and instant rollback. Speed is not the enemy — blind confidence is.",
    tools: ["TypeScript", "Node.js", "OWASP", "AST", "CLI"],
    repo: "https://github.com/abhinyaay/fixgaurd",
    live: "https://fixgaurd.online",
  },
  {
    no: "03",
    name: "IntelliDocs",
    category: "AI / NLP",
    blurb:
      "A document intelligence pipeline that parses regulatory PDFs and categorises them semantically using local LLMs through Ollama — no documents leaving the machine.",
    tools: ["Python", "pypdf", "Ollama", "FastAPI", "NLP"],
    repo: "https://github.com/abhinyaay/IntelliDocs",
    live: null,
  },
  {
    no: "04",
    name: "AR Fitness Trainer",
    category: "Computer Vision",
    blurb:
      "A pose-tracking trainer that watches your form through the webcam, counts reps and calls out bad technique before it becomes an injury.",
    tools: ["JavaScript", "MediaPipe", "TensorFlow.js", "Canvas"],
    repo: "https://github.com/abhinyaay/AR-Fitness-Trainer",
    live: null,
  },
  {
    no: "05",
    name: "Restaurant POS",
    category: "Full Stack",
    blurb:
      "A Django point-of-sale built for an actual restaurant floor: live table state, order workflow, kitchen hand-off and billing that has to survive a Friday night.",
    tools: ["Django", "Python", "PostgreSQL", "WebSockets", "Bootstrap"],
    repo: "https://github.com/abhinyaay/restaurant-pos-system",
    live: null,
  },
  {
    no: "06",
    name: "Playback Speed",
    category: "Browser Extension",
    blurb:
      "A lightweight extension that lifts YouTube's 2x ceiling to 4x, with keyboard control and per-site memory. Small tool, used every single day.",
    tools: ["JavaScript", "Chrome APIs", "Manifest V3"],
    repo: "https://github.com/abhinyaay/playback-speed-extension",
    live: null,
  },
];

const devicon = (slug, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;

export const techStack = [
  { name: "Java", icon: devicon("java") },
  { name: "Spring", icon: devicon("spring") },
  { name: "Hibernate", icon: devicon("hibernate") },
  { name: "Python", icon: devicon("python") },
  { name: "JavaScript", icon: devicon("javascript") },
  { name: "TypeScript", icon: devicon("typescript") },
  { name: "C++", icon: devicon("cplusplus") },
  { name: "C", icon: devicon("c") },
  { name: "C#", icon: devicon("csharp") },
  { name: "HTML", icon: devicon("html5") },
  { name: "CSS", icon: devicon("css3") },
  { name: "React", icon: devicon("react") },
  { name: "Node.js", icon: devicon("nodejs") },
  { name: ".NET", icon: devicon("dotnetcore") },
  { name: "Django", icon: devicon("django", "plain") },
  { name: "FastAPI", icon: devicon("fastapi") },
  { name: "Flask", icon: devicon("flask") },
  { name: "Tailwind", icon: devicon("tailwindcss") },
  { name: "Bootstrap", icon: devicon("bootstrap") },
  { name: "MySQL", icon: devicon("mysql") },
  { name: "PostgreSQL", icon: devicon("postgresql") },
  { name: "MongoDB", icon: devicon("mongodb") },
  { name: "Redis", icon: devicon("redis") },
  { name: "Docker", icon: devicon("docker") },
  { name: "Jenkins", icon: devicon("jenkins") },
  { name: "Kubernetes", icon: devicon("kubernetes", "plain") },
  { name: "Terraform", icon: devicon("terraform") },
  { name: "Ansible", icon: devicon("ansible") },
  { name: "GitHub Actions", icon: devicon("githubactions") },
  { name: "Nginx", icon: devicon("nginx") },
  { name: "AWS", icon: devicon("amazonwebservices", "original-wordmark") },
  { name: "Linux", icon: devicon("linux") },
  { name: "Bash", icon: devicon("bash") },
  { name: "Git", icon: devicon("git") },
  { name: "GitHub", icon: devicon("github") },
  { name: "Pandas", icon: devicon("pandas") },
  { name: "NumPy", icon: devicon("numpy") },
  { name: "Matplotlib", icon: devicon("matplotlib") },
  { name: "Scikit-learn", icon: devicon("scikitlearn") },
  { name: "OpenCV", icon: devicon("opencv") },
  { name: "TensorFlow", icon: devicon("tensorflow") },
  { name: "Jupyter", icon: devicon("jupyter") },
  { name: "Selenium", icon: devicon("selenium") },
  { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain" },
  { name: "Google Gemini", icon: "https://cdn.simpleicons.org/googlegemini" },
  { name: "Postman", icon: devicon("postman") },
  { name: "VS Code", icon: devicon("vscode") },
  { name: "Vim", icon: devicon("vim") },
  { name: "Vite", icon: devicon("vitejs") },
  { name: "Vercel", icon: devicon("vercel") },
  { name: "Figma", icon: devicon("figma") },
];
