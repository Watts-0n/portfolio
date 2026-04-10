import {
    Code2,
    Database,
    Terminal,
} from "lucide-react";

export const projects = [
    {
        title: "BIOR",
        description: "Gateway featuring a secure, multi-layered Client Portal for laboratory service coordination.",
        tags: ["PHP", "JavaScript", "WordPress"],
        image: "/screenshots/bior.jpg",
        link: "https://bior.lv", repo: "#", year: "2024", status: "LIVE",
    },
    {
        title: "Latvijas Valsts Ceļi",
        description: "National mobility nexus for infrastructure management, integrating mapping services and real-time sensor data.",
        tags: ["Maps", "Interactive", "Real-time"],
        image: "/screenshots/lvceli.jpg",
        link: "https://lvceli.lv", repo: "#", year: "2026", status: "LIVE",
    },
    {
        title: "Latvijas Skolas Soma",
        description: "High-concurrency cultural education platform architected for massive scalability, supporting 230,000 students.",
        tags: ["React", "Scaling", "High-Concurrency"],
        image: "/screenshots/latvijasskolassoma.jpg",
        link: "https://latvijasskolassoma.lv", repo: "#", year: "2023", status: "LIVE",
    },
    {
        title: "Dienvidkurzemes Kultūras Mantojums",
        description: "Regional digital asset management system centralizing the archival and presentation of historical artifacts.",
        tags: ["Digital Assets", "Archival", "Portal"],
        image: "/screenshots/kulturmantojums.png",
        link: "https://kulturmantojums.lv", repo: "#", year: "2026", status: "LIVE",
    },
    {
        title: "Latgales Centrālā Bibliotēka",
        description: "Comprehensive public information portal managing regional library branches, emphasizing digital literacy.",
        tags: ["Accessibility", "Public Portal"],
        image: "/screenshots/lcb.jpg",
        link: "https://lcb.lv", repo: "#", year: "2023", status: "LIVE",
    },
    {
        title: "APPC Research Platform",
        description: "Strategic communication platform designed for the dissemination of foreign policy expertise and national security.",
        tags: ["Strategic Comm", "Security", "Portal"],
        image: "/screenshots/appc.jpg",
        link: "https://appc.lv", repo: "#", year: "2024", status: "LIVE",
    },
    {
        title: "Digital Lessons (State Police)",
        description: "Gamified Public Safety Training. Developed interactive, age-appropriate educational games for road traffic safety.",
        tags: ["Game Dev", "UI/UX", "JavaScript"],
        image: "/screenshots/csd3.jpg",
        link: "https://csd3.cryptoquantfund.eu/", repo: "#", year: "2023", status: "LIVE",
    },
    {
        title: "Youth Analytics Engine",
        description: "Automating high-volume data collection and youth engagement tracking, replacing manual tracking.",
        tags: ["Big Data", "Data Automation", "Analytics"],
        image: "/screenshots/youth_analytics.png",
        link: "#", repo: "#", year: "2025", status: "LIVE",
    },
    {
        title: "Immersive 360 VR Explorer",
        description: "Engineered a 360 VR platform specifically designed for use with VR glasses to facilitate interactive virtual tours.",
        tags: ["VR", "360", "Immersive Media"],
        image: "/screenshots/vr_explorer.png",
        link: "#", repo: "#", year: "2025", status: "LIVE",
    },
];

export const skills = [
    {
        category: "Frontend",
        icon: <Code2 className="h-4 w-4" />,
        items: [
            { name: "JS / TS", level: 80 },
            { name: "Tailwind CSS", level: 90 },
            { name: "Bootstrap", level: 98 },
            { name: "HTML / CSS", level: 100 },
            { name: "Accessibility", level: 100 }
        ],
    },
    {
        category: "Backend",
        icon: <Database className="h-4 w-4" />,
        items: [
            { name: "PHP", level: 85 },
            { name: "WordPress", level: 90 },
            { name: "Python", level: 60 },
            { name: "MySQL", level: 70 },
        ],
    },
    {
        category: "Performance",
        icon: <Terminal className="h-4 w-4" />,
        items: [
            { name: "Asset Optimization", level: 90 },
            { name: "Core Web Vitals", level: 92 },
            { name: "Caching", level: 85 },

        ],
    },
];

export const experience = [
    {
        title: "Full Stack Developer",
        company: "SIA 'Cloud Enterprise Systems'",
        date: "2023 — 2026",
        readTime: "FULL_TIME",
        excerpt: "National Infrastructure Lead: Collaborated within an agile team to engineer high-traffic WordPress portals for national bodies. Ensured 100% compliance with accessibility standards.",
        tags: ["WordPress", "PHP", "JavaScript", "Accessibility"],
        lineNum: "001",
    },
    {
        title: "Systems Architect & Mentor",
        company: "Youth center 'Pakāpiens'",
        date: "2024 — 2026",
        readTime: "PART_TIME",
        excerpt: "Acted as primary technical lead for digital infrastructure. Designed a custom Big Data reporting engine and engineered a 360 VR platform. Mentored youths on digital literacy.",
        tags: ["Architecture", "Data Automation", "VR", "Mentorship"],
        lineNum: "002",
    },
    {
        title: "Volunteer Developer",
        company: "SIA 'Cloud Enterprise Systems'",
        date: "2021 — 2023",
        readTime: "VOLUNTEER",
        excerpt: "End-to-end creation of digital lesson games for schools, requiring balancing complex programming with intuitive UI/UX design for younger audiences.",
        tags: ["Game Development", "UI/UX", "Frontend"],
        lineNum: "003",
    },
];
