"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';
import { Phone } from "lucide-react";
import {
  submitContactForm,
  submitReviewForm,
  type FormActionState,
} from "../app/actions";

const headlineWords = ["Създаваме", "иновации", "и уеб решения"];
const navItems = [
  { label: "Услуги", id: "services" },
  { label: "Клиенти", id: "testimonials" },
  { label: "За нас", id: "about" },
  { label: "Стъпки", id: "process" },
  { label: "Контакт", id: "contact" },
];

const services = [
  {
    title: "Web Development",
    description: "High-performance, scalable web applications.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-10 h-10 text-white">
        <path d="M8 16h48v32H8z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 24h48" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="16" cy="20" r="2" fill="currentColor" />
        <circle cx="24" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
    gradientFrom: "from-cyan-400",
    gradientTo: "to-blue-500",
    shadow: "shadow-[0_0_20px_#00ffff]",
  },
  {
    title: "Mobile Apps",
    description: "iOS and Android native and cross-platform apps.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-10 h-10 text-white">
        <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="4" />
        <path d="M48 48l8 8" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
    gradientFrom: "from-purple-400",
    gradientTo: "to-pink-500",
    shadow: "shadow-[0_0_20px_#d946ef]",
  },
  {
    title: "UI/UX Design",
    description: "Intuitive and visually appealing user interfaces.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-10 h-10 text-white">
        <path d="M8 56V8h48v48L32 36 8 56z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradientFrom: "from-pink-400",
    gradientTo: "to-red-500",
    shadow: "shadow-[0_0_20px_#f43f5e]",
  },
  {
    title: "E-Commerce",
    description: "Complete e-commerce solutions with payment integration.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-10 h-10 text-white">
        <path d="M8 12h48v8H8z" stroke="currentColor" strokeWidth="4" />
        <path d="M16 20v32h32V20" stroke="currentColor" strokeWidth="4" />
        <circle cx="24" cy="28" r="2" fill="currentColor" />
        <circle cx="40" cy="28" r="2" fill="currentColor" />
      </svg>
    ),
    gradientFrom: "from-green-400",
    gradientTo: "to-lime-500",
    shadow: "shadow-[0_0_20px_#22c55e]",
  },
  {
    title: "Cloud Solutions",
    description: "Cloud infrastructure and deployment strategies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-10 h-10 text-white">
        <path d="M32 16a12 12 0 0112 12H20a12 12 0 012-12" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
    gradientFrom: "from-blue-400",
    gradientTo: "to-indigo-500",
    shadow: "shadow-[0_0_20px_#3b82f6]",
  },
  {
    title: "Digital Marketing",
    description: "SEO, SEM, social media and content marketing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-10 h-10 text-white">
        <path d="M8 32h48M32 8v48" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
    gradientFrom: "from-yellow-400",
    gradientTo: "to-orange-500",
    shadow: "shadow-[0_0_20px_#f59e0b]",
  },
];

  const projects = [
    {
      title: "Luxury Real Estate Platform",
      description: "Премиум платформа за имоти с фокус върху елегантно представяне и качествени запитвания.",
      img: "/images/portfolio-real-estate.svg",
    },
    {
      title: "Restaurant Booking Experience",
      description: "Модерна резервационна система, създадена за бързина, яснота и повече реални посещения.",
      img: "/images/portfolio-restaurant.svg",
    },
    {
      title: "Modern Fitness Brand",
      description: "Адаптивна бранд платформа със силна визия, програми и ясни пътеки към конверсия.",
      img: "/images/portfolio-fitness.svg",
    },
    {
      title: "Healthcare Management Dashboard",
      description: "Изчистен медицински dashboard, проектиран за удобство, ясни данни и мащабируемост.",
      img: "/images/portfolio-healthcare.svg",
    },
    {
      title: "E-Commerce Fashion Store",
      description: "Полиран e-commerce интерфейс, оптимизиран за откриване на продукти и ангажираност.",
      img: "/images/portfolio-fashion.svg",
    },
    {
      title: "Finance Analytics Platform",
      description: "SaaS интерфейс с богата аналитика, фокусирани dashboard-и и уверено вземане на решения.",
      img: "/images/portfolio-finance.svg",
    },
  ];

type TeamMember = {
  role: string;
  exp: string;
  icon: React.ReactNode;
};

type ApprovedReview = {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  message: string;
  avatar?: string | null;
};

type TeamCardProps = {
  member: TeamMember;
  variants: {
    hidden: object;
    visible: object;
  };
  prefersReducedMotion: boolean | null;
};

const TeamCard = ({ member, variants, prefersReducedMotion }: TeamCardProps) => {
  const [isHoverable, setIsHoverable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 23, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 23, mass: 0.45 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-96, 96]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-82, 82]);
  const iconX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const iconY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverable = () => setIsHoverable(hoverQuery.matches);

    updateHoverable();
    hoverQuery.addEventListener("change", updateHoverable);

    return () => hoverQuery.removeEventListener("change", updateHoverable);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const animatePointer = () => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.16;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.16;
    pointerX.set(currentRef.current.x);
    pointerY.set(currentRef.current.y);

    const deltaX = Math.abs(targetRef.current.x - currentRef.current.x);
    const deltaY = Math.abs(targetRef.current.y - currentRef.current.y);

    if (deltaX > 0.001 || deltaY > 0.001) {
      frameRef.current = requestAnimationFrame(animatePointer);
    } else {
      frameRef.current = null;
    }
  };

  const startPointerAnimation = () => {
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(animatePointer);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isHoverable || !cardRef.current) return;

    const bounds = cardRef.current.getBoundingClientRect();
    targetRef.current.x = (event.clientX - bounds.left) / bounds.width - 0.5;
    targetRef.current.y = (event.clientY - bounds.top) / bounds.height - 0.5;
    startPointerAnimation();
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    targetRef.current = { x: 0, y: 0 };
    startPointerAnimation();
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group p-8 bg-gray-900/20 backdrop-blur-xl rounded-2xl border border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.2)] cursor-default overflow-hidden transform-gpu"
      variants={variants}
      onPointerEnter={() => {
        if (!prefersReducedMotion && isHoverable) {
          setIsHovering(true);
        }
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={
        prefersReducedMotion || !isHoverable
          ? {}
          : {
              y: -14,
              scale: 1.045,
              boxShadow:
                "0 30px 90px rgba(0,255,255,0.28), 0 0 70px rgba(59,130,246,0.24)",
            }
      }
      transition={{ type: "spring", stiffness: 190, damping: 18, mass: 0.7 }}
      style={{
        rotateX: prefersReducedMotion || !isHoverable ? 0 : rotateX,
        rotateY: prefersReducedMotion || !isHoverable ? 0 : rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        willChange: "transform, box-shadow",
      }}
    >
      <motion.div
        className="absolute inset-px rounded-2xl border border-white/0 pointer-events-none"
        animate={{
          borderColor: isHovering && !prefersReducedMotion ? "rgba(103,232,249,0.55)" : "rgba(255,255,255,0)",
          boxShadow:
            isHovering && !prefersReducedMotion
              ? "inset 0 0 32px rgba(34,211,238,0.12)"
              : "inset 0 0 0 rgba(34,211,238,0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.34),rgba(59,130,246,0.16)_34%,transparent_68%)] blur-2xl pointer-events-none"
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: isHovering && !prefersReducedMotion ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 pointer-events-none"
        animate={{ opacity: isHovering && !prefersReducedMotion ? 1 : 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      />
      <motion.span
        className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-cyan-300 to-transparent pointer-events-none"
        initial={false}
        animate={{ scaleX: isHovering && !prefersReducedMotion ? 1 : 0, opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute bottom-0 right-0 h-px w-full origin-right bg-gradient-to-r from-transparent via-blue-400 to-transparent pointer-events-none"
        initial={false}
        animate={{ scaleX: isHovering && !prefersReducedMotion ? 1 : 0, opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="relative z-10 text-center mb-4"
        animate={{ y: isHovering && !prefersReducedMotion ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 210, damping: 20 }}
        style={{ transform: "translateZ(46px)" }}
      >
        <motion.div
          className="mx-auto mb-4 rounded-2xl"
          initial={false}
          animate={{
            scale: isHovering && !prefersReducedMotion ? 1.13 : 1,
            clipPath: isHovering && !prefersReducedMotion ? "inset(0% round 18px)" : "inset(4% round 18px)",
          }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          style={{
            x: prefersReducedMotion || !isHoverable ? 0 : iconX,
            y: prefersReducedMotion || !isHoverable ? 0 : iconY,
            willChange: "transform, clip-path",
          }}
        >
          {member.icon}
        </motion.div>
        <h3 className="text-xl md:text-2xl font-semibold mb-1 text-white transition-colors duration-300 group-hover:text-cyan-100">{member.role}</h3>
        <p className="text-gray-400 mt-2 text-sm transition-colors duration-300 group-hover:text-gray-300">{member.exp}</p>
      </motion.div>
    </motion.div>
  );
};

type Project = {
  title: string;
  description: string;
  img: string;
};

type PortfolioCardProps = {
  project: Project;
  isActive: boolean;
  prefersReducedMotion: boolean | null;
};

const PortfolioCard = ({ project, isActive, prefersReducedMotion }: PortfolioCardProps) => {
  const [isHoverable, setIsHoverable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.45 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.5, 2.5]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-105, 105]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-120, 120]);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverable = () => setIsHoverable(hoverQuery.matches);

    updateHoverable();
    hoverQuery.addEventListener("change", updateHoverable);

    return () => hoverQuery.removeEventListener("change", updateHoverable);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setImageRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const animatePointer = () => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.14;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.14;
    pointerX.set(currentRef.current.x);
    pointerY.set(currentRef.current.y);

    const deltaX = Math.abs(targetRef.current.x - currentRef.current.x);
    const deltaY = Math.abs(targetRef.current.y - currentRef.current.y);

    if (deltaX > 0.001 || deltaY > 0.001) {
      frameRef.current = requestAnimationFrame(animatePointer);
    } else {
      frameRef.current = null;
    }
  };

  const startPointerAnimation = () => {
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(animatePointer);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isHoverable || !cardRef.current) return;

    const bounds = cardRef.current.getBoundingClientRect();
    targetRef.current.x = (event.clientX - bounds.left) / bounds.width - 0.5;
    targetRef.current.y = (event.clientY - bounds.top) / bounds.height - 0.5;
    startPointerAnimation();
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    targetRef.current = { x: 0, y: 0 };
    startPointerAnimation();
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full w-full overflow-hidden rounded-3xl bg-gray-950"
      onPointerEnter={() => {
        if (!prefersReducedMotion && isHoverable) {
          setIsHovering(true);
        }
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      animate={{
        opacity: isActive ? 1 : 0.58,
        scale: isActive ? 1 : 0.92,
        filter: isActive ? "saturate(1) brightness(1)" : "saturate(0.68) brightness(0.72)",
      }}
      whileHover={
        prefersReducedMotion || !isHoverable
          ? {}
          : {
              y: -8,
              scale: isActive ? 1.035 : 0.97,
              boxShadow:
                "0 26px 85px rgba(0,255,255,0.24), 0 0 60px rgba(59,130,246,0.18)",
            }
      }
      transition={{ type: "spring", stiffness: 170, damping: 21, mass: 0.7 }}
      style={{
        rotateX: prefersReducedMotion || !isHoverable ? 0 : rotateX,
        rotateY: prefersReducedMotion || !isHoverable ? 0 : rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
      }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-3xl"
        initial={false}
        animate={{
          clipPath: imageRevealed || prefersReducedMotion ? "inset(0% round 24px)" : "inset(14% round 24px)",
          scale: imageRevealed || prefersReducedMotion ? 1 : 1.08,
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, clip-path" }}
      >
        <motion.img
          src={project.img}
          alt={project.title}
          className="h-full w-full object-cover"
          animate={{ scale: isHovering && !prefersReducedMotion ? 1.1 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            x: prefersReducedMotion || !isHoverable ? 0 : imageX,
            y: prefersReducedMotion || !isHoverable ? 0 : imageY,
            willChange: "transform",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.28),rgba(59,130,246,0.16)_32%,transparent_68%)] blur-2xl pointer-events-none"
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: isHovering && !prefersReducedMotion ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:opacity-0" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
        animate={{ opacity: isHovering && !prefersReducedMotion ? 1 : 0.72 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-3xl border border-cyan-300/40 pointer-events-none"
        animate={{
          opacity: isHovering && !prefersReducedMotion ? 1 : 0.42,
          boxShadow:
            isHovering && !prefersReducedMotion
              ? "inset 0 0 28px rgba(0,255,255,0.18)"
              : "inset 0 0 0 rgba(0,255,255,0)",
        }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end px-5 pb-9 text-center"
        initial={false}
        animate={{ y: isHovering && !prefersReducedMotion ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 190, damping: 20 }}
        style={{ transform: "translateZ(44px)" }}
      >
        <motion.span
          className="mb-5 text-white text-3xl font-extrabold tracking-widest drop-shadow-lg"
          animate={{ opacity: isHovering && !prefersReducedMotion ? 0 : 1, y: isHovering ? -10 : 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          Очаквайте скоро
        </motion.span>
        <motion.div
          initial={false}
          animate={{
            opacity: isHovering && !prefersReducedMotion ? 1 : 0,
            y: isHovering && !prefersReducedMotion ? 0 : 16,
          }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-md">{project.title}</h3>
          <p className="text-gray-300 text-sm drop-shadow-md">{project.description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const PremiumSectionTitle = ({
  children,
  className = "mb-12",
  headingClassName = "text-4xl md:text-5xl",
}: {
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [hasRevealed, setHasRevealed] = useState(Boolean(prefersReducedMotion));

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasRevealed(true);
    }
  }, [prefersReducedMotion]);

  const titleRevealVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : "115%",
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const titleAccentVariants = {
    hidden: {
      scaleX: prefersReducedMotion ? 1 : 0,
      opacity: prefersReducedMotion ? 1 : 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.72,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.18,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={hasRevealed ? "visible" : "hidden"}
      onViewportEnter={() => setHasRevealed(true)}
      viewport={{ once: true, amount: 0.45 }}
      className={`relative text-center ${className}`}
    >
      <div className="overflow-hidden pb-2">
        <motion.h2
          variants={titleRevealVariants}
          className={`${headingClassName} font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_#00ffff]`}
        >
          {children}
        </motion.h2>
      </div>
      <motion.div
        variants={titleAccentVariants}
        className="mx-auto mt-3 h-px w-28 origin-center bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_16px_rgba(0,255,255,0.65)]"
      />
    </motion.div>
  );
};

const App = () => {
  const [showMain, setShowMain] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [approvedReviews, setApprovedReviews] = useState<ApprovedReview[]>([]);
  const [contactState, setContactState] = useState<FormActionState>({
    ok: false,
    message: "",
  });
  const [reviewState, setReviewState] = useState<FormActionState>({
    ok: false,
    message: "",
  });
  const [isContactPending, startContactTransition] = useTransition();
  const [isReviewPending, startReviewTransition] = useTransition();
  const touchStartY = useRef<number | null>(null);
  const heroTransitioning = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    fetch("/api/reviews", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { reviews?: ApprovedReview[] }) => {
        if (active) {
          setApprovedReviews(data.reviews ?? []);
        }
      })
      .catch(() => {
        if (active) {
          setApprovedReviews([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startReviewTransition(async () => {
      const result = await submitReviewForm(reviewState, formData);
      setReviewState(result);

      if (result.ok) {
        form.reset();
      }
    });
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startContactTransition(async () => {
      const result = await submitContactForm(contactState, formData);
      setContactState(result);

      if (result.ok) {
        form.reset();
      }
    });
  };

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("main > section[id], main > footer")
    );

    elements.forEach((element) => element.classList.add("premium-section"));

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("premium-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("premium-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (introComplete) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introComplete]);

  const revealMain = () => {
    if (heroTransitioning.current) return;
    heroTransitioning.current = true;
    setShowMain(true);
    if (prefersReducedMotion) {
      setIntroComplete(true);
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  const teamGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.14,
        delayChildren: prefersReducedMotion ? 0 : 0.14,
      },
    },
  };

  const teamCardVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 46,
      scale: prefersReducedMotion ? 1 : 0.92,
      rotateX: prefersReducedMotion ? 0 : 8,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(14px)",
      clipPath: prefersReducedMotion ? "inset(0% round 16px)" : "inset(10% 0% 12% round 16px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      clipPath: "inset(0% round 16px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.92,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const aboutTextVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 18,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const portfolioRevealVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 34,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const testimonialsRevealVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 28,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const testimonialsTrackVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const sectionRevealVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 30,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.09,
        delayChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  return (
    <div className={`relative w-full min-h-screen bg-black ${introComplete ? "" : "overflow-hidden"}`}>
      {/* HERO SECTION */}
      <AnimatePresence>
        {!introComplete && (
          <motion.section
            key="hero"
            className="fixed inset-0 z-[80] w-full h-screen overflow-hidden bg-black"
            initial={{ y: "0%", opacity: 1, scale: 1 }}
            animate={{
              y: showMain ? "-100%" : "0%",
              opacity: showMain ? 0.96 : 1,
              scale: showMain ? 0.98 : 1,
            }}
            exit={{ y: "-100%", opacity: 0.96, scale: 0.98 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.05,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={() => {
              if (showMain) {
                setIntroComplete(true);
                window.scrollTo({ top: 0, left: 0 });
              }
            }}
            onWheel={(event) => {
              if (event.deltaY > 0) {
                event.preventDefault();
                revealMain();
              }
            }}
            onTouchStart={(event) => {
              touchStartY.current = event.touches[0]?.clientY ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartY.current === null) return;
              const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY.current;
              if (touchStartY.current - touchEndY > 20) {
                revealMain();
              }
              touchStartY.current = null;
            }}
          >
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/video/tech-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 -mt-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 flex flex-wrap justify-center gap-4">
                {headlineWords.map((word, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_#00ffff]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: headlineWords.length * 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
              >
                Професионални решения за онлайн маркетинг и дигитален растеж за вашия бизнес.
              </motion.p>

              <div className="hidden">
                <motion.a
                  href="#services"
                  className="relative px-8 py-4 rounded-md font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 overflow-hidden transition-all duration-300"
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                >
                  <span className="absolute inset-0 bg-white opacity-10 blur-xl transition-all duration-300"></span>
                  <span className="relative z-10">Нашите услуги</span>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="relative px-8 py-4 rounded-md font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 overflow-hidden transition-all duration-300"
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                >
                  <span className="absolute inset-0 bg-white opacity-10 blur-xl transition-all duration-300"></span>
                  <span className="relative z-10">Свържете се с нас</span>
                </motion.a>
              </div>
            </div>

            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
              animate={{ y: [-10, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
                ease: "easeInOut",
              }}
              onClick={revealMain}
            >
              <div className="w-14 h-14 rounded-full border-2 border-cyan-400 opacity-90 shadow-[0_0_20px_rgba(0,255,255,0.7)] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#00ffff"
                  className="w-7 h-7"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                </svg>
              </div>
              <span className="text-cyan-400 mt-2 opacity-80 tracking-widest text-sm uppercase">Продължи</span>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* NAV + MAIN */}
          <motion.div
            key="main"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-30"
          >
            <nav className="fixed top-0 left-0 w-full z-50">
              <motion.div
                initial={{ y: -120 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mx-auto max-w-7xl flex justify-between items-center px-6 py-4 bg-black/20 backdrop-blur-md relative"
              >
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_#00ffff] cursor-pointer"
                >
                  VM Studio
                </motion.div>

                <ul className="hidden lg:flex gap-10 text-lg font-medium">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="relative group cursor-pointer"
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide relative z-10 transition-all duration-300 hover:brightness-125"
                      >
                        {item.label}
                        <motion.span
                          className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_#00ffff] group-hover:w-full transition-all duration-400"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="tel:+359000000000"
                  aria-label="Свържете се по телефон"
                  className="group ml-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/60 px-3.5 py-2 text-sm font-semibold text-cyan-100 bg-black/30 shadow-[0_0_18px_rgba(0,255,255,0.22)] backdrop-blur-md transition-colors hover:text-white"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 28px rgba(0,255,255,0.38)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-300/40 transition-colors group-hover:bg-cyan-300/20 group-hover:ring-cyan-200/70">
                    <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="hidden sm:inline">Свържете се</span>
                </motion.a>

<motion.div
  className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
  initial={{ scaleX: 0 }}
  animate={{ scaleX: scrolled ? 1 : 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  style={{
    background: "linear-gradient(90deg, #00ffff, #3b82f6, #00ffff)", // като футъра
    boxShadow: "0 0 25px #00ffff, 0 0 25px #3b82f6", // като футъра
  }}
/>

              </motion.div>
            </nav>

            <main className="text-white">
              {/* First Section */}
              <section className="relative min-h-screen flex flex-col items-center justify-center">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="/video/tech-video-2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                <div className="relative z-10 text-center px-4">
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Добре дошли в VM Studio
                  </h2>
                  <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
                    Професионални уеб решения, онлайн маркетинг и дигитален растеж за вашия бизнес.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.button
                      type="button"
                      onClick={() => scrollToSection("services")}
                      className="relative overflow-hidden rounded-md px-8 py-4 font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_28px_rgba(0,255,255,0.32)] transition-transform"
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                        boxShadow: "0 0 38px rgba(0,255,255,0.55)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 bg-white/10 blur-xl" />
                      <span className="relative z-10">Виж услугите</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => scrollToSection("contact")}
                      className="relative overflow-hidden rounded-md border border-cyan-400/70 px-8 py-4 font-semibold text-cyan-100 bg-black/25 shadow-[0_0_22px_rgba(0,255,255,0.18)] backdrop-blur-md transition-transform"
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                        boxShadow: "0 0 32px rgba(59,130,246,0.38)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Свържи се с нас</span>
                    </motion.button>
                  </div>
                </div>
              </section>


              <section id="services" className="relative py-24 bg-gray-900 overflow-hidden">


                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                  <PremiumSectionTitle className="mb-16">
                    Нашите услуги
                  </PremiumSectionTitle>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                  >
                    {[
                      {
                        title: "AI",
                        description: "Интелигентни алгоритми за вашия бизнес.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="4" />
                            <path d="M32 8v16M32 40v16M8 32h16M40 32h16M16 16l11 11M37 37l11 11M16 48l11-11M37 27l11-11" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        ),
                        gradientFrom: "from-cyan-400",
                        gradientTo: "to-blue-500",
                      },
                      {
                        title: "Web Development",
                        description: "Съвременни уеб приложения с висока производителност.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none">
                            <rect x="8" y="16" width="48" height="32" stroke="currentColor" strokeWidth="4" />
                            <path d="M8 24h48" stroke="currentColor" strokeWidth="4" />
                            <circle cx="16" cy="20" r="2" fill="currentColor" />
                            <circle cx="24" cy="20" r="2" fill="currentColor" />
                          </svg>
                        ),
                        gradientFrom: "from-purple-400",
                        gradientTo: "to-pink-500",
                      },
                      {
                        title: "Mobile Apps",
                        description: "iOS и Android native & cross-platform решения.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none">
                            <rect x="24" y="8" width="16" height="48" rx="4" stroke="currentColor" strokeWidth="4" />
                            <circle cx="32" cy="52" r="2" fill="currentColor" />
                          </svg>
                        ),
                        gradientFrom: "from-green-400",
                        gradientTo: "to-lime-500",
                      },
                      {
                        title: "UI/UX Design",
                        description: "Интуитивни и визуално впечатляващи интерфейси.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none">
                            <path d="M8 56V8h48v48L32 36 8 56z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ),
                        gradientFrom: "from-pink-400",
                        gradientTo: "to-red-500",
                      },
                      {
                        title: "Cloud Solutions",
                        description: "Облачни инфраструктури и стратегии за деплоймент.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none">
                            <path d="M32 16a12 12 0 0112 12H20a12 12 0 012-12" stroke="currentColor" strokeWidth="4" />
                          </svg>
                        ),
                        gradientFrom: "from-blue-400",
                        gradientTo: "to-indigo-500",
                      },
                      {
                        title: "Digital Marketing",
                        description: "SEO, SEM, social media и content marketing.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none">
                            <path d="M8 32h48M32 8v48" stroke="currentColor" strokeWidth="4" />
                          </svg>
                        ),
                        gradientFrom: "from-yellow-400",
                        gradientTo: "to-orange-500",
                      },
                    ].map((service, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="group flex flex-col items-center text-center cursor-pointer transform-gpu"
                        variants={sectionRevealVariants}
                        whileHover={
                          prefersReducedMotion
                            ? {}
                            : {
                                y: -12,
                                scale: 1.035,
                              }
                        }
                        transition={{ type: "spring", stiffness: 190, damping: 17, mass: 0.7 }}
                      >
                        {/* Икона с glow и hover effects */}
                        <div className="relative mb-6 flex items-center justify-center">
                          <motion.div
                            className={`relative w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center transform-gpu transition-[box-shadow,transform] duration-500 ease-out bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} shadow-[0_0_25px_rgba(0,150,255,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(0,255,255,0.75)]`}
                            whileHover={prefersReducedMotion ? {} : { rotate: 3, scale: 1.14 }}
                            transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.65 }}
                          >
                            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                            <motion.div
                              className="relative z-10 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center text-white transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                              animate={prefersReducedMotion ? {} : { rotate: [0, 8, -8, 0], scale: [1, 1.05, 1, 1] }}
                              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            >
                              {service.icon}
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Заглавие */}
                        <div className="transform-gpu transition-transform duration-500 ease-out group-hover:-translate-y-1">
                          <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {service.title}
                          </h3>

                          {/* Описание */}
                          <p className="text-gray-400 max-w-xs transition-colors duration-300 group-hover:text-gray-300">{service.description}</p>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* Testimonials Section with Form Below */}
              <section
                id="testimonials"
                className="relative py-24 bg-black overflow-hidden"
              >
                {/* Dynamic hi-tech background */}
                <div className="absolute inset-0 z-0">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{ y: [0, -5, 0], opacity: [0.2, 0.8, 0.2] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4 + Math.random() * 4,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-px bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${80 + Math.random() * 120}px`,
                      }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 5 + Math.random() * 5,
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6">
                  <PremiumSectionTitle className="mb-12">
                    Клиенти & Отзиви
                  </PremiumSectionTitle>

                  {/* Testimonials Slider on Top */}
                  <motion.div
                    className="overflow-hidden cursor-grab mb-20"
                    whileTap={{ cursor: "grabbing" }}
                  >
                    <motion.div
                      className="flex gap-8 py-4"
                      drag="x"
                      dragConstraints={{ left: -1600, right: 0 }}
                      variants={testimonialsTrackVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.25 }}
                    >
                      {approvedReviews.length === 0 ? (
                        <motion.div
                          className="min-w-[340px] max-w-sm rounded-3xl border border-cyan-400/30 bg-gray-900/40 p-10 text-center text-gray-300"
                          variants={testimonialsRevealVariants}
                        >
                          Все още няма публикувани отзиви.
                        </motion.div>
                      ) : (
                        approvedReviews.map((testimonial, i) => (
                        <motion.div
                          key={testimonial.id}
                          className="group min-w-[340px] max-w-sm"
                          variants={testimonialsRevealVariants}
                          whileHover={
                            prefersReducedMotion
                              ? {}
                              : {
                                  y: -10,
                                  scale: 1.035,
                                  rotate: i % 2 === 0 ? 1.5 : -1.5,
                                }
                          }
                          transition={{ type: "spring", stiffness: 180, damping: 18 }}
                        >
                          <motion.div
                            className="relative overflow-hidden p-10 rounded-3xl bg-gray-900/60 border border-cyan-400/40 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
                            animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 6 + i, ease: "easeInOut" }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                              transition={{ duration: 0.35, ease: "easeOut" }}
                            />
                            <motion.div
                              className="absolute -inset-16 bg-[radial-gradient(circle,rgba(0,255,255,0.2),transparent_62%)] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300 pointer-events-none"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                            />
                            <motion.div
                              className="relative z-10"
                              whileHover={prefersReducedMotion ? {} : { y: -4 }}
                              transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                              <p className="text-gray-300 mb-5 text-base md:text-lg leading-relaxed">
                                "{testimonial.message}"
                              </p>
                              <div className="text-white font-semibold text-base md:text-lg">
                                {testimonial.name}
                              </div>
                              <div className="text-cyan-400 text-sm md:text-base">
                                {testimonial.role} · {testimonial.company}
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                        ))
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Futuristic Comment Form Below */}
                  <motion.div
                    className="max-w-lg mx-auto"
                    variants={sectionRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-cyan-400 mb-6 text-center">
                      Остави своя отзив
                    </h3>
                    <motion.form
                      onSubmit={handleReviewSubmit}
                      className="flex flex-col gap-4"
                      variants={staggerContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.25 }}
                    >
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
                      <input type="hidden" name="rating" value="5" />
                      <input type="hidden" name="turnstileToken" value="" />
                      {[
                        { placeholder: "Име и фамилия", name: "name" },
                        { placeholder: "Длъжност / Компания", name: "roleCompany" },
                        { placeholder: "Вашият коментар", name: "message" },
                      ].map(
                        (field, i) =>
                          i < 2 ? (
                            <motion.input
                              key={i}
                              name={field.name}
                              type="text"
                              placeholder={field.placeholder}
                              required
                              variants={sectionRevealVariants}
                              whileHover={{
                                scale: 1.02,
                                boxShadow:
                                  "0 0 25px rgba(0,255,255,0.5), 0 0 35px rgba(0,150,255,0.4)",
                              }}
                              whileFocus={{
                                scale: 1.015,
                                boxShadow:
                                  "0 0 28px rgba(0,255,255,0.55), 0 0 42px rgba(59,130,246,0.35)",
                              }}
                              className="px-4 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-md text-white border border-cyan-400/40 focus:border-cyan-400 focus:shadow-[0_0_30px_rgba(0,255,255,0.5)] focus:outline-none transition-all duration-300 text-sm"
                            />
                          ) : (
                            <motion.textarea
                              key={i}
                              name={field.name}
                              placeholder={field.placeholder}
                              required
                              rows={4}
                              variants={sectionRevealVariants}
                              whileHover={{
                                scale: 1.02,
                                boxShadow:
                                  "0 0 25px rgba(0,255,255,0.5), 0 0 35px rgba(0,150,255,0.4)",
                              }}
                              whileFocus={{
                                scale: 1.015,
                                boxShadow:
                                  "0 0 28px rgba(0,255,255,0.55), 0 0 42px rgba(59,130,246,0.35)",
                              }}
                              className="px-4 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-md text-white border border-cyan-400/40 focus:border-cyan-400 focus:shadow-[0_0_30px_rgba(0,255,255,0.5)] focus:outline-none transition-all duration-300 resize-none text-sm"
                            />
                          )
                      )}
                      <motion.button
                        type="submit"
                        disabled={isReviewPending}
                        variants={sectionRevealVariants}
                        whileHover={{
                          scale: 1.05,
                          y: -2,
                          boxShadow:
                            "0 0 34px rgba(0,255,255,0.7), 0 0 52px rgba(0,150,255,0.55)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-[0_0_25px_rgba(0,255,255,0.5)] transition-transform disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isReviewPending ? "Изпращане..." : "Изпрати"}
                      </motion.button>
                      {reviewState.message ? (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-center text-sm ${
                            reviewState.ok ? "text-cyan-200" : "text-red-200"
                          }`}
                        >
                          {reviewState.message}
                        </motion.p>
                      ) : null}
                    </motion.form>
                  </motion.div>
                </div>
              </section>

   <motion.section
      id="portfolio"
      className="relative py-24 bg-black overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <PremiumSectionTitle className="mb-12">
          Нашето портфолио
        </PremiumSectionTitle>
        <motion.p variants={portfolioRevealVariants} className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg md:text-xl">
          Работим по вълнуващи проекти – скоро ще покажем нашите успешни реализации!
        </motion.p>

        <motion.div variants={portfolioRevealVariants} className="relative">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          speed={900}
          coverflowEffect={{ rotate: 18, stretch: 0, depth: 170, modifier: 1.05, slideShadows: true }}
          autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          observer
          observeParents
          watchSlidesProgress
          onSwiper={(swiper) => setActiveProjectIndex(swiper.realIndex)}
          onSlideChange={(swiper) => setActiveProjectIndex(swiper.realIndex)}
          className="portfolio-swiper w-full py-12"
        >
          {projects.map((project, i) => (
            <SwiperSlide
              key={i}
              className="portfolio-slide group rounded-3xl overflow-hidden relative shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              style={{ width: "20rem", height: "24rem" }}
            >
              <PortfolioCard
                project={project}
                isActive={activeProjectIndex === i}
                prefersReducedMotion={prefersReducedMotion}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </motion.div>
      </div>
    </motion.section>

              <section id="about" className="relative py-24 bg-black overflow-hidden">
                {/* Сериозна hi-tech мрежа зад секцията */}
                <div className="absolute inset-0 z-0">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 opacity-30 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-px bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${50 + Math.random() * 150}px`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                  <PremiumSectionTitle className="mb-12">
                    Зад нашия екип
                  </PremiumSectionTitle>

                  <motion.p
                    variants={aboutTextVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.45 }}
                    className="text-center text-gray-400 mb-20 max-w-2xl mx-auto text-lg md:text-xl"
                  >
                    Нашият екип се състои от специалисти с дългогодишен опит в технологии, дизайн и дигитален маркетинг. Съчетаваме професионализъм и иновации, за да създаваме решения, които работят.
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
                    variants={teamGridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                  >
                    {[
                      {
                        role: "Lead Developer", exp: "10+ години опит", icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 text-cyan-400">
                            <rect x="8" y="16" width="48" height="32" stroke="currentColor" strokeWidth="3" fill="none" />
                            <circle cx="16" cy="24" r="2" fill="currentColor" />
                            <circle cx="24" cy="24" r="2" fill="currentColor" />
                          </svg>
                        )
                      },
                      {
                        role: "UI/UX Designer", exp: "8+ години опит", icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 text-cyan-400">
                            <path d="M8 56V8h48v48L32 36 8 56z" stroke="currentColor" strokeWidth="3" fill="none" />
                          </svg>
                        )
                      },
                      {
                        role: "Cloud & DevOps", exp: "7+ години опит", icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 text-cyan-400">
                            <path d="M32 16a12 12 0 0112 12H20a12 12 0 012-12" stroke="currentColor" strokeWidth="3" fill="none" />
                          </svg>
                        )
                      },
                      {
                        role: "Digital Marketing", exp: "6+ години опит", icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 text-cyan-400">
                            <path d="M8 32h48M32 8v48" stroke="currentColor" strokeWidth="3" />
                          </svg>
                        )
                      },
                      // Новите двама developers
                      {
                        role: "Frontend Developer", exp: "5+ години опит", icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 text-cyan-400">
                            <rect x="10" y="18" width="44" height="28" stroke="currentColor" strokeWidth="3" fill="none" />
                            <path d="M18 24h28M18 32h28M18 40h28" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )
                      },
                      {
                        role: "Backend Developer", exp: "6+ години опит", icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 text-cyan-400">
                            <ellipse cx="32" cy="32" rx="20" ry="12" stroke="currentColor" strokeWidth="3" fill="none" />
                            <path d="M12 32v0h40v0" stroke="currentColor" strokeWidth="2" />
                            <path d="M32 20v24" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )
                      },
                    ].map((member, i) => (
                      <TeamCard
                        key={i}
                        member={member}
                        variants={teamCardVariants}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    ))}
                  </motion.div>
                </div>
              </section>




              {/* Process Section */}
              <section id="process" className="relative py-24 bg-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                  <PremiumSectionTitle className="mb-12">
                    Нашият процес
                  </PremiumSectionTitle>
                  <motion.p
                    variants={sectionRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    className="text-gray-400 max-w-2xl mx-auto mb-16 text-center text-lg md:text-xl"
                  >
                    Всяко решение преминава през внимателно планиране и изпълнение, за да осигурим максимално качество и ефективност.
                  </motion.p>

                  <div className="relative flex">
                    {/* Vertical Progress Indicator */}
                    <div className="relative w-1 bg-gray-700 rounded-full mr-12">
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-400 rounded-full origin-top"
                        initial={{ height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </div>

                    {/* Steps */}
                    <div className="flex-1 flex flex-col space-y-16">
                      {[
                        {
                          title: "Идея & Концепция",
                          description: "Обсъждане на нуждите, визията на проекта и потенциални технологии.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ),
                        },
                        {
                          title: "План & Архитектура",
                          description: "Създаваме детайлен план и архитектура, която гарантира мащабируемост и ефективност.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                            </svg>
                          ),
                        },
                        {
                          title: "Дизайн",
                          description: "UI/UX решения, които са интуитивни, визуално впечатляващи и модерни.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12 12 0 01.84 6.042L12 14z" />
                            </svg>
                          ),
                        },
                        {
                          title: "Разработка",
                          description: "Frontend & Backend имплементация с висок стандарт за качество и performance.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v4m0 0l-2-2m2 2l2-2" />
                            </svg>
                          ),
                        },
                        {
                          title: "Тест & Оптимизация",
                          description: "Пълно тестиране, дебъг и оптимизация за висока производителност и стабилност.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ),
                        },
                        {
                          title: "Деплой & Поддръжка",
                          description: "Деплой на live среда, monitoring и постоянна поддръжка на проекта.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ),
                        },
                      ].map((step, i) => (
                        <motion.div
                          key={i}
                          className="relative flex justify-start md:justify-start"
                          initial={{ opacity: 0, x: 100 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.8, delay: i * 0.2 }}
                        >
                          <div className="flex gap-6 items-start w-full">
                            {/* Икона */}
                            <div className="flex-shrink-0 mt-2">{step.icon}</div>
                            {/* Блок с описание */}
                            <motion.div
                              className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 relative border border-gray-700"
                              whileHover={
                                prefersReducedMotion
                                  ? {}
                                  : {
                                      y: -5,
                                      scale: 1.035,
                                      boxShadow: "0 0 30px rgba(0,255,255,0.18)",
                                    }
                              }
                              transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            >
                              <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                              <p className="text-gray-400 mt-2">{step.description}</p>
                              <span className="absolute top-0 left-0 w-full h-full rounded-2xl border border-cyan-400 opacity-20 animate-pulse pointer-events-none"></span>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Свържете се с нас */}
              <section
                id="contact"
                className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
              >
                {/* Hi-Tech Dynamic Background */}
                <div className="absolute inset-0 z-0">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {[...Array(30)].map((_, i) => (
                      <motion.line
                        key={i}
                        x1={`${Math.random() * 100}%`}
                        y1={`${Math.random() * 100}%`}
                        x2={`${Math.random() * 100}%`}
                        y2={`${Math.random() * 100}%`}
                        stroke={`url(#gradientLines)`}
                        strokeWidth={1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.8, 0.1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 6 + Math.random() * 6,
                          ease: "easeInOut",
                          delay: Math.random() * 3,
                        }}
                      />
                    ))}
                    {[...Array(50)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={`${Math.random() * 100}%`}
                        cy={`${Math.random() * 100}%`}
                        r={1 + Math.random() * 2}
                        fill="#00ffff"
                        initial={{ opacity: 0.2 }}
                        animate={{
                          cy: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                          opacity: [0.2, 0.7, 0.2],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4 + Math.random() * 4,
                          ease: "easeInOut",
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                    <defs>
                      <linearGradient id="gradientLines" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00ffff" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Контактна форма */}
                <motion.div
                  className="relative z-10 w-full max-w-xl bg-gray-800/30 backdrop-blur-md p-8 rounded-2xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300"
                  variants={sectionRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <PremiumSectionTitle className="mb-6" headingClassName="text-3xl md:text-4xl">
                    Свържете се с нас
                  </PremiumSectionTitle>

                  <motion.form
                    onSubmit={handleContactSubmit}
                    className="flex flex-col gap-6 relative z-10"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
                    <input type="hidden" name="selectedService" value="" />
                    <input type="hidden" name="company" value="" />
                    <input type="hidden" name="turnstileToken" value="" />
                    {[
                      { placeholder: "Вашето име", name: "name", type: "text" },
                      { placeholder: "Имейл", name: "email", type: "email" },
                      { placeholder: "Телефон", name: "phone", type: "tel" },
                    ].map((field, i) => (
                      <motion.div
                        key={i}
                        className="relative"
                        variants={sectionRevealVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        {/* Лейбълът */}
                        <motion.label
                          className="absolute left-4 top-3 text-gray-400 pointer-events-none transition-all"
                          initial={{ y: 0 }}
                          whileHover={{ y: -5, color: "#00ffff" }}
                          transition={{ duration: 0.3 }}
                        >
                          {field.placeholder}
                        </motion.label>
                        {/* Полето */}
                        <motion.input
                          type={field.type}
                          name={field.name}
                          required
                          whileFocus={{
                            scale: 1.01,
                            boxShadow: "0 0 22px rgba(0,255,255,0.45)",
                          }}
                          className="w-full p-4 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:shadow-[0_0_15px_#00ffff] transition-all duration-300"
                        />
                      </motion.div>
                    ))}

                    {/* Съобщение */}
                    <motion.div
                      className="relative"
                      variants={sectionRevealVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.label
                        className="absolute left-4 top-3 text-gray-400 pointer-events-none transition-all"
                        initial={{ y: 0 }}
                        whileHover={{ y: -5, color: "#00ffff" }}
                        transition={{ duration: 0.3 }}
                      >
                        Съобщение
                      </motion.label>
                      <motion.textarea
                        name="message"
                        required
                        placeholder=" "
                        whileFocus={{
                          scale: 1.01,
                          boxShadow: "0 0 22px rgba(0,255,255,0.45)",
                        }}
                        className="w-full p-4 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:shadow-[0_0_15px_#00ffff] transition-all duration-300 resize-none"
                        rows={4}
                      ></motion.textarea>
                    </motion.div>

                    {/* Бутон */}
                    <motion.button
                      type="submit"
                      disabled={isContactPending}
                      variants={sectionRevealVariants}
                      className="mt-4 py-3 px-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold relative overflow-hidden disabled:cursor-not-allowed disabled:opacity-70"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        boxShadow: "0 0 36px rgba(0,255,255,0.55)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-60"></span>
                      <span className="relative z-10">
                        {isContactPending ? "Изпращане..." : "Изпрати"}
                      </span>
                    </motion.button>
                    {contactState.message ? (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-center text-sm ${
                          contactState.ok ? "text-cyan-200" : "text-red-200"
                        }`}
                      >
                        {contactState.message}
                      </motion.p>
                    ) : null}
                  </motion.form>

                </motion.div>
              </section>
              {/* === FUTURISTIC FOOTER === */}
              {/* === FUTURISTIC FOOTER 2.0 === */}
              <motion.footer
                className="relative w-full py-12 mt-20 bg-black text-center overflow-hidden"
                variants={sectionRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* Neon energy grid background */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-[1px] bg-gradient-to-r from-cyan-400/70 to-blue-500/70"
                      style={{ top: `${i * 8}%` }}
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 10 + i * 0.5,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>

                {/* Neon top border */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_25px_#00ffff]" />

                {/* Content */}
                <div className="relative z-10 text-gray-400 text-sm tracking-widest space-y-3">
                  {/* Glitch effect text */}
                  <motion.p
                    className="relative text-cyan-400 uppercase text-xs md:text-sm font-mono"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <span className="absolute left-0 top-0 w-full text-cyan-300 opacity-60 animate-pulse">
                      © {new Date().getFullYear()} VM Studio – All Rights Reserved
                    </span>
                    © {new Date().getFullYear()} VM Studio – All Rights Reserved
                  </motion.p>

                  <motion.p
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-base drop-shadow-[0_0_20px_#00ffff]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                  >
                    ⚡ Developed by <span className="text-white">VM Studio</span>
                  </motion.p>

                  <motion.p
                    className="text-xs italic text-gray-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                  >
                    Empowering Digital Futures ✨
                  </motion.p>
                </div>

                {/* Scroll to top button */}
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_#00ffff] flex items-center justify-center text-white text-xl hover:scale-110 transition-transform"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  ↑
                </motion.button>
              </motion.footer>


            </main>
          </motion.div>
    </div>
  );
};

export default App;
