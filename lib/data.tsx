import {
    Code2,
    Database,
    Terminal,
} from "lucide-react";

export const projects = [
    {
        title: "Nebula Dashboard",
        description: "Real-time analytics platform for distributed systems. Built with React, WebSocket, and Go.",
        tags: ["React", "Go", "WebSocket", "D3.js"],
        image: "/project-placeholder-1.jpg",
        link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
        title: "Void Chain",
        description: "Decentralized identity verification protocol. Smart contracts written in Solidity.",
        tags: ["Solidity", "Ethereum", "Web3.js", "Node.js"],
        image: "/project-placeholder-2.jpg",
        link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
        title: "Cyber Construct",
        description: "3D architectural visualization tool running in the browser using WebGL.",
        tags: ["Three.js", "WebGL", "Vue", "Python"],
        image: "/project-placeholder-3.jpg",
        link: "#", repo: "#", year: "2023", status: "ARCHIVED",
    },
    {
        title: "Signal OS",
        description: "Encrypted peer-to-peer messaging protocol with end-to-end encryption and zero-knowledge proofs.",
        tags: ["Rust", "WebRTC", "WASM", "TypeScript"],
        image: "/project-placeholder-3.jpg",
        link: "#", repo: "#", year: "2023", status: "WIP",
    },
    {
        title: "Quantum Grid",
        description: "Distributed computing framework for ML workloads with automatic load balancing.",
        tags: ["Go", "Kubernetes", "gRPC", "Python"],
        image: "/project-placeholder-1.jpg",
        link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
        title: "Neural Forge",
        description: "Visual ML pipeline editor with drag-and-drop nodes and real-time training previews.",
        tags: ["Python", "React", "TensorFlow", "FastAPI"],
        image: "/project-placeholder-2.jpg",
        link: "#", repo: "#", year: "2024", status: "WIP",
    },
    {
        title: "Orbit CMS",
        description: "Headless content management system with GraphQL API and edge caching.",
        tags: ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
        image: "/project-placeholder-3.jpg",
        link: "#", repo: "#", year: "2023", status: "LIVE",
    },
    {
        title: "Phantom Auth",
        description: "Zero-knowledge authentication library with passkey support and biometric fallback.",
        tags: ["TypeScript", "WebAuthn", "ZKPP", "Rust"],
        image: "/project-placeholder-1.jpg",
        link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
        title: "Drift Engine",
        description: "Realtime collaborative whiteboard with CRDT conflict resolution and canvas rendering.",
        tags: ["React", "Yjs", "WebRTC", "Canvas API"],
        image: "/project-placeholder-2.jpg",
        link: "#", repo: "#", year: "2023", status: "ARCHIVED",
    },
    {
        title: "Flux Monitor",
        description: "Infrastructure observability dashboard aggregating Prometheus, Loki, and Tempo traces.",
        tags: ["Go", "Grafana", "Prometheus", "Docker"],
        image: "/project-placeholder-3.jpg",
        link: "#", repo: "#", year: "2024", status: "LIVE",
    },
];

export const skills = [
    {
        category: "Frontend",
        icon: <Code2 className="h-4 w-4" />,
        items: [
            { name: "React / Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Three.js", level: 75 },
            { name: "Tailwind CSS", level: 92 },
        ],
    },
    {
        category: "Backend",
        icon: <Database className="h-4 w-4" />,
        items: [
            { name: "Node.js", level: 88 },
            { name: "Go", level: 82 },
            { name: "PostgreSQL", level: 85 },
            { name: "Redis", level: 78 },
        ],
    },
    {
        category: "DevOps",
        icon: <Terminal className="h-4 w-4" />,
        items: [
            { name: "Docker", level: 85 },
            { name: "Kubernetes", level: 72 },
            { name: "AWS", level: 80 },
            { name: "Linux", level: 88 },
        ],
    },
];

export const blogPosts = [
    {
        title: "Optimizing React Render Cycles in High-Frequency Data Apps",
        date: "Oct 12, 2024",
        readTime: "5 min",
        excerpt: "Deep dive into memoization strategies and custom hooks for handling 100+ updates per second.",
        tags: ["React", "Performance"],
        lineNum: "001",
    },
    {
        title: "The State of WebAssembly in 2024",
        date: "Sep 28, 2024",
        readTime: "8 min",
        excerpt: "Is WASM ready to replace JavaScript for heavy compute tasks? A performance benchmark.",
        tags: ["WASM", "JavaScript"],
        lineNum: "002",
    },
    {
        title: "Building a Custom Kubernetes Operator with Go",
        date: "Aug 15, 2024",
        readTime: "12 min",
        excerpt: "Automating stateful application management using the Operator pattern.",
        tags: ["Go", "Kubernetes"],
        lineNum: "003",
    },
];
