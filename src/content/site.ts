export const TAGLINE = "Building systems that see, think, and ship.";

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  tags: string[];
  summary: string;
  bullets: string[];
  liveUrl?: string;
  githubUrl?: string;
  inProgress?: boolean;
  image?: string;
  bgToken: "plum" | "umber" | "olive" | "mauve";
}

export interface SkillItem {
  name: string;
  level: "Core" | "Working" | "Learning";
  percentage: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  highlightChip?: string;
  description?: string;
  image?: string;
  bgToken: "plum" | "cream" | "mauve" | "bronze" | "umber";
  subItems?: { label: string; prize: string }[];
  pills?: string[];
}

export interface RoleItem {
  id: string;
  role: string;
  org: string;
  bullets: string[];
  repoUrl?: string;
  repoLabel?: string;
  projectUrl?: string;
  projectLabel?: string;
  image?: string;
}

export interface PathItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  type: "education" | "certification";
  description?: string;
  link?: {
    url: string;
    label: string;
  };
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const SITE_CONTENT = {
  personal: {
    name: "Shruti Ravikumar",
    shortName: "SR",
    role: "B.Tech CSE Student | IIITDM Kancheepuram",
    institution: "IIITDM Kancheepuram",
    degreeLine: "B.Tech CSE · IIITDM Kancheepuram",
    email: "shrutirj307@gmail.com",
    linkedin: "https://linkedin.com/in/shruti-ravikumar-8a0053365",
    github: "https://github.com/Shruti2738",
    cvUrl: "/portfolio/cv.pdf",
    profile:
      "Computer Science undergraduate at IIITDM Kancheepuram with hands-on experience in software development, AI/computer vision, robotics, DevOps, and data analytics. Winner of the Bharat Nirman Track at DECODE SIH 2026, with experience developing automation pipelines, AI-powered systems, and robotics applications through hackathons and technical projects.",
  },

  stats: [
    { value: 5, label: "Projects built" },
    { value: 3, label: "Winning results" },
    { value: 2, label: "Roles of responsibility" },
  ],

  marqueeItems: [
    "AI",
    "COMPUTER VISION",
    "ROBOTICS",
    "DEVOPS",
    "SECURITY",
    "FULL-STACK",
  ],

  achievements: [
    {
      id: "decode-sih",
      title: "Winner, Bharat Nirman Track",
      event: "DECODE SIH 2026",
      highlightChip: "Rs.30,000 cash prize",
      image: "/images/decode-sih.jpg",
      bgToken: "plum",
      description:
        "Secured first place in the Bharat Nirman Track at DECODE SIH 2026 with an automation and software solution tailored to national development infrastructure.",
    },
    {
      id: "adu",
      title: "Abu Dhabi University",
      event: "Academic & Tech Competitions",
      image: "/images/adu.jpg",
      bgToken: "cream",
      subItems: [
        {
          label: "1st Place · STEM Programming Competition",
          prize: "AED 3000",
        },
        {
          label: "2nd Place · College of Engineering Hackathon",
          prize: "AED 2500",
        },
      ],
    },
    {
      id: "optifarm",
      title: "Schneider Electric Yuva Yodha Energy Tech Hackathon",
      event: "Challenge 01: Sustainable Agriculture",
      bgToken: "mauve",
      description:
        "Worked on OptiFarm for Challenge 01: Sustainable Agriculture, developing a voice-first, multilingual PWA to help smallholder farmers reduce water and energy consumption with quantified savings.",
    },
    {
      id: "big-code",
      title: "Google The Big Code 2026",
      event: "Competitive Coding Challenge",
      bgToken: "bronze",
      description: "Advanced to Round 2",
    },
    {
      id: "participation",
      title: "Participation & Hackathons",
      event: "Competitive Engineering & Hackathons",
      bgToken: "umber",
      pills: [
        "Vashisht Hackathon 2026",
        "Bharat Innovation Hackathon",
        "Adobe Hackathon",
        "CodeDuelz",
        "Tantra Fiesta '25 (IIIT Nagpur)",
      ],
    },
  ] as AchievementItem[],

  positions: [
    {
      id: "dev-club",
      role: "Coordinator",
      org: "The Developers Club, IIITDM Kancheepuram",
      bullets: [
        "Coordinate technical events, workshops, and developer activities across the institute.",
        "Contribute to the Automated Dependency Vulnerability Patching System, which detects vulnerable dependencies, validates patches, and opens reviewable pull requests.",
      ],
      projectUrl: "https://github.com/DevClubIIITDM/cve_patcher",
      projectLabel: "Automated Dependency Vulnerability Patching System",
    },
    {
      id: "auv-society",
      role: "Software Subsystem Team Member",
      org: "AUV Society, IIITDM Kancheepuram",
      repoUrl: "https://github.com/Shruti2738/AUV-Tasks",
      repoLabel: "View AUV-Tasks repo",
      bullets: [
        "Develop ROS 2 Python nodes for inter-node communication, data processing, and autonomous navigation.",
        "Implement computer vision pipelines using OpenCV, HSV-based object tracking, and state-machine-driven visual processing.",
      ],
    },
  ] as RoleItem[],

  projects: [
    {
      id: "cve-patcher",
      index: "01",
      title: "Automated Dependency Vulnerability Patching System",
      tags: ["DevOps", "Software Security", "GitHub Automation"],
      summary:
        "Built an automated pipeline to identify vulnerable dependencies, validate patches, and initiate reviewable pull requests.",
      bullets: [
        "Built an automated pipeline to identify vulnerable dependencies, validate patches, and initiate reviewable pull requests.",
        "Focused on dependency management, repository automation, and software supply-chain security.",
      ],
      githubUrl: "https://github.com/DevClubIIITDM/cve_patcher",
      bgToken: "plum",
    },
    {
      id: "aura",
      index: "02",
      title: "AURA — AI-Powered Adaptive Traffic Signal System",
      tags: ["AI", "Computer Vision", "Robotics", "Optimization"],
      summary:
        "Developed the vision and live-data layer using YOLOv8 and OpenCV to detect vehicles, cyclists, and emergency units for adaptive signals.",
      bullets: [
        "Developed the vision and live-data layer using YOLOv8 and OpenCV to detect vehicles, pedestrians, cyclists, and emergency vehicles from camera feeds.",
        "Estimated vehicle speed, identified priority zones, and calculated time-to-intersection for adaptive signal decisions.",
        "Generated structured, timestamped JSON data for backend processing, traffic optimization, and the SUMO digital twin.",
      ],
      liveUrl: "https://aura-ai-traffic.onrender.com",
      githubUrl: "https://github.com/Mohit427/Aura-AI-Traffic.git",
      bgToken: "umber",
    },
    {
      id: "uptimex",
      index: "03",
      title: "UpTimeX — AI-Powered Incident Response Platform",
      tags: ["Full-Stack Development", "DevOps", "AI"],
      summary:
        "Monitoring platform detecting outages with Bob AI (Claude) root cause analysis, automated recovery workflows, and live dashboard.",
      bullets: [
        "Built a monitoring platform that detects service outages, slow responses, and HTTP errors through automated health checks.",
        "Implemented incident recovery workflows with automated rechecks and GitHub Actions redeployment integration.",
        "Integrated Bob AI (Claude) for root cause analysis using logs and commit history, generating suggested fixes and confidence scores.",
        "Developed a live incident dashboard with real-time updates, incident timelines, automated postmortem generation, and Markdown export.",
      ],
      liveUrl: "https://ctrl-alt-hack-phi.vercel.app/",
      githubUrl: "https://github.com/nanduks28-alt/ctrl-alt-hack",
      bgToken: "olive",
    },
    {
      id: "pitwall",
      index: "04",
      title: "PitWall Analytics — Interactive Formula 1 Pre-Race Analytics Platform",
      tags: ["Python", "FastF1", "Data Analytics", "Web Development"],
      summary:
        "Interactive Formula 1 pre-race analytics platform for circuit-specific driver performance analysis and historical comparisons.",
      bullets: [
        "Building an interactive F1 platform for circuit-specific driver performance analysis and historical comparisons.",
        "Developing driver analytics, track visualizations, and race insights using automatically updated data.",
      ],
      inProgress: true,
      bgToken: "mauve",
    },
    {
      id: "dashing-raptor",
      index: "05",
      title: "Dashing Raptor — Ranger Robot",
      tags: ["mBot", "Robotics"],
      summary:
        "Autonomous ranger robot engineered with mBot hardware, ultrasonic sweep detection, and basic autonomous control.",
      bullets: [
        "Built and programmed a ranger robot using mBot, integrating sensors, movement, and basic autonomous control.",
      ],
      bgToken: "plum",
    },
  ] as ProjectItem[],

  skillCategories: [
    {
      id: "programming",
      name: "Programming",
      skills: [
        { name: "Python", level: "Core", percentage: 94 },
        { name: "C++", level: "Core", percentage: 90 },
        { name: "C", level: "Working", percentage: 78 },
      ],
    },
    {
      id: "cse-core",
      name: "CSE Core Knowledge",
      skills: [
        { name: "Data Structures & Algorithms", level: "Core", percentage: 92 },
        { name: "Object-Oriented Programming", level: "Core", percentage: 92 },
        { name: "Introduction to AI", level: "Core", percentage: 88 },
        { name: "Design & Analysis of Algorithms", level: "Working", percentage: 82 },
        { name: "Database Systems Design", level: "Working", percentage: 84 },
        { name: "Discrete Structures", level: "Working", percentage: 78 },
        { name: "Digital Systems Design", level: "Working", percentage: 76 },
        { name: "Computing Paradigms", level: "Working", percentage: 78 },
      ],
    },
    {
      id: "ai-vision",
      name: "AI & Computer Vision",
      skills: [
        { name: "YOLOv8", level: "Core", percentage: 94 },
        { name: "OpenCV", level: "Core", percentage: 92 },
        { name: "Object Tracking", level: "Working", percentage: 84 },
        { name: "HSV Segmentation", level: "Working", percentage: 82 },
      ],
    },
    {
      id: "robotics",
      name: "Robotics",
      skills: [
        { name: "Linux", level: "Core", percentage: 90 },
        { name: "mBot", level: "Core", percentage: 88 },
        { name: "ROS 2", level: "Working", percentage: 82 },
        { name: "Autonomous Navigation", level: "Working", percentage: 80 },
        { name: "State Machines", level: "Working", percentage: 84 },
        { name: "Sensors & Actuators", level: "Working", percentage: 82 },
        { name: "PID Control", level: "Working", percentage: 78 },
      ],
    },
    {
      id: "web-dev",
      name: "Web Development",
      skills: [
        { name: "JavaScript", level: "Core", percentage: 88 },
        { name: "HTML", level: "Core", percentage: 94 },
        { name: "CSS", level: "Core", percentage: 92 },
      ],
    },
    {
      id: "databases-analytics",
      name: "Databases & Data Analytics",
      skills: [
        { name: "CSV/File Handling", level: "Core", percentage: 92 },
        { name: "PostgreSQL", level: "Working", percentage: 82 },
        { name: "MySQL", level: "Working", percentage: 84 },
        { name: "FastF1", level: "Working", percentage: 86 },
      ],
    },
    {
      id: "devops-security",
      name: "DevOps & Security",
      skills: [
        { name: "Git & GitHub", level: "Core", percentage: 94 },
        { name: "GitHub Actions", level: "Working", percentage: 86 },
        { name: "Automated Health Checks", level: "Working", percentage: 84 },
        { name: "Dependency Management", level: "Working", percentage: 84 },
        { name: "Incident Response", level: "Working", percentage: 80 },
      ],
    },
    {
      id: "tools-apis",
      name: "Tools & APIs",
      skills: [
        { name: "VS Code", level: "Core", percentage: 95 },
        { name: "Postman", level: "Working", percentage: 86 },
        { name: "TomTom APIs", level: "Working", percentage: 82 },
        { name: "Thonny", level: "Working", percentage: 80 },
      ],
    },
  ] as SkillCategory[],

  path: [
    {
      id: "btech",
      title: "B.Tech — Computer Science and Engineering",
      institution: "Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram",
      period: "2025 – Present",
      type: "education",
      description: "Undergraduate Computer Science engineering program",
    },
    {
      id: "high-school",
      title: "High School Diploma",
      institution: "Abu Dhabi Indian School, Muroor",
      period: "2011 – 2025",
      type: "education",
      description:
        "Comprehensive academic foundation in mathematics, computer science, and physics with active hackathon participation.",
    },
    {
      id: "genai-cert",
      title: "Generative AI with Large Language Models",
      institution: "Coursera",
      period: "Certification",
      type: "certification",
      description:
        "A foundational course on generative AI and large language models, exploring how they work, the latest research, and real-world applications through expert instruction from AWS AI practitioners.",
      link: {
        url: "https://coursera.org/share/9caa822961e486f14ef978dffdb3a002",
        label: "View Certificate",
      },
    },
  ] as PathItem[],

  gallery: [
    {
      id: "g1",
      src: "/images/gallery-1.jpg",
      alt: "DECODE SIH 2026 Bharat Nirman Track First Place presentation",
      caption: "Winning DECODE SIH 2026: Presenting automated infrastructure solutions.",
    },
    {
      id: "g2",
      src: "/images/gallery-2.jpg",
      alt: "Abu Dhabi University Python Competition ceremony",
      caption: "Abu Dhabi University: 1st Place Python Programming award ceremony.",
    },
    {
      id: "g3",
      src: "/images/gallery-3.jpg",
      alt: "AUV Society testing underwater autonomous navigation",
      caption: "Autonomous Underwater Vehicle (AUV) Society vision & ROS 2 development.",
    },
    {
      id: "g4",
      src: "/images/gallery-4.jpg",
      alt: "Dev Club IIITDM Kancheepuram event coordination",
      caption: "Leading workshops and developer sessions at The Developers Club.",
    },
    {
      id: "g5",
      src: "/images/gallery-5.jpg",
      alt: "Field deployment and sensor calibration for OptiFarm PWA",
      caption: "Energy Tech Hackathon: OptiFarm voice-first smart agriculture PWA.",
    },
    {
      id: "g6",
      src: "/images/gallery-6.jpg",
      alt: "Robotics test bench: mBot ranger hardware and obstacle avoidance",
      caption: "Robotics lab: Dashing Raptor hardware prototyping and sensor sweep tests.",
    },
  ] as GalleryItem[],
};
