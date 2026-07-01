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
import {
  BarChart3,
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  LayoutDashboard,
  Layers3,
  Lightbulb,
  Menu,
  Rocket,
  Phone,
  PenTool,
  Route,
  SearchCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
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
    title: "Уеб разработка",
    description: "Бързи и мащабируеми уеб приложения.",
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
    title: "Мобилни приложения",
    description: "Приложения за iOS и Android.",
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
    title: "Дизайн на интерфейси",
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
    title: "Облачни решения",
    description: "Облачна инфраструктура и стратегии за внедряване.",
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
    title: "Дигитален маркетинг",
    description: "Оптимизация, платена реклама, социални мрежи и съдържание.",
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

type Project = {
  title: string;
  description: string;
  img: string;
  concept: "fitness" | "finance" | "interior" | "ecommerce" | "saas" | "restaurant";
  accent: "purple" | "blue" | "orange" | "cyan";
};

  const projects: Project[] = [
    {
      title: "Pulse фитнес сайт",
      description: "Тъмна фитнес платформа с програми, тренировки и ясен път към запитване.",
      img: "/images/portfolio-fitness.svg",
      concept: "fitness",
      accent: "purple",
    },
    {
      title: "Finova финансов панел",
      description: "Премиум панел за финанси, анализи и бързо вземане на решения.",
      img: "/images/portfolio-finance.svg",
      concept: "finance",
      accent: "blue",
    },
    {
      title: "Atelier интериорно студио",
      description: "Минимален сайт за интериорен дизайн с премиум проектни галерии.",
      img: "/images/portfolio-real-estate.svg",
      concept: "interior",
      accent: "orange",
    },
    {
      title: "Maison онлайн магазин",
      description: "Модерен онлайн магазин с продуктови колекции и плавно пазаруване.",
      img: "/images/portfolio-fashion.svg",
      concept: "ecommerce",
      accent: "cyan",
    },
    {
      title: "Nova софтуерна платформа",
      description: "Софтуерен интерфейс с работно пространство, показатели и изчистена навигация.",
      img: "/images/portfolio-healthcare.svg",
      concept: "saas",
      accent: "blue",
    },
    {
      title: "Lume ресторантски сайт",
      description: "Елегантен ресторантски сайт с меню, резервации и атмосфера на бранда.",
      img: "/images/portfolio-restaurant.svg",
      concept: "restaurant",
      accent: "orange",
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

const sampleReviews: ApprovedReview[] = [
  {
    id: "sample-1",
    name: "Мария Николова",
    company: "Niko Home Studio",
    role: "Основател",
    rating: 5,
    message:
      "VM Studio създадоха сайт, който изглежда премиум и работи изключително бързо. Процесът беше ясен, организиран и много професионален.",
  },
  {
    id: "sample-2",
    name: "Георги Димитров",
    company: "Delta Consult",
    role: "Маркетинг директор",
    rating: 5,
    message:
      "Получихме модерна дигитална визия и по-добра структура за представяне на услугите ни. Екипът мисли едновременно за дизайн, скорост и реални бизнес резултати.",
  },
  {
    id: "sample-3",
    name: "Елена Петрова",
    company: "Active Zone",
    role: "Бранд мениджър",
    rating: 5,
    message:
      "Работата с VM Studio беше много гладка. Новата ни онлайн визия изглежда силна, ясна и напълно съобразена с аудиторията ни.",
  },
];

type TeamCardProps = {
  member: TeamMember;
  variants: {
    hidden: object;
    visible: object;
  };
  prefersReducedMotion: boolean | null;
};

type AutoPlayVideoProps = {
  src: string;
  className: string;
};

const AutoPlayVideo = ({ src, className }: AutoPlayVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          // iOS may block autoplay in Low Power Mode until the first user gesture.
        });
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        tryPlay();
      }
    };

    tryPlay();
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    window.addEventListener("pointerdown", tryPlay, { once: true, passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
    />
  );
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
          }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          style={{
            x: prefersReducedMotion || !isHoverable ? 0 : iconX,
            y: prefersReducedMotion || !isHoverable ? 0 : iconY,
            willChange: "transform",
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

type PortfolioCardProps = {
  project: Project;
  isActive: boolean;
  prefersReducedMotion: boolean | null;
};

const accentStyles = {
  purple: {
    ring: "border-fuchsia-400/70 shadow-[0_0_42px_rgba(217,70,239,0.36)]",
    glow: "from-fuchsia-500/50 via-violet-500/24 to-cyan-400/12",
    button: "from-fuchsia-500 to-violet-500",
    text: "text-fuchsia-200",
  },
  blue: {
    ring: "border-blue-300/80 shadow-[0_0_48px_rgba(59,130,246,0.42)]",
    glow: "from-blue-500/48 via-cyan-400/24 to-violet-500/12",
    button: "from-blue-500 to-cyan-400",
    text: "text-blue-200",
  },
  orange: {
    ring: "border-amber-300/80 shadow-[0_0_46px_rgba(245,158,11,0.38)]",
    glow: "from-amber-400/48 via-orange-500/24 to-cyan-400/10",
    button: "from-amber-400 to-orange-500",
    text: "text-amber-100",
  },
  cyan: {
    ring: "border-cyan-300/80 shadow-[0_0_46px_rgba(34,211,238,0.38)]",
    glow: "from-cyan-400/48 via-blue-500/22 to-fuchsia-500/10",
    button: "from-cyan-400 to-blue-500",
    text: "text-cyan-100",
  },
};

const PortfolioMockup = ({ project }: { project: Project }) => {
  const accent = accentStyles[project.accent];

  const navItems = {
    fitness: ["Начало", "Програми", "Треньори"],
    finance: ["Начало", "Функции", "Цени"],
    interior: ["Начало", "Проекти", "Студио"],
    ecommerce: ["Магазин", "Колекции", "Журнал"],
    saas: ["Преглед", "Задачи", "Отчети"],
    restaurant: ["Меню", "Резервации", "Събития"],
  }[project.concept];

  return (
    <div className={`absolute inset-4 overflow-hidden rounded-2xl border bg-[#050914]/92 backdrop-blur-sm ${accent.ring}`}>
      <div className={`absolute -inset-16 bg-gradient-to-br ${accent.glow} blur-3xl opacity-46`} />
      <div className="relative z-10 flex h-full flex-col opacity-58 saturate-75 contrast-90">
        <div className="flex h-10 items-center justify-between border-b border-white/10 bg-white/[0.03] px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-fuchsia-300/80" />
            <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
            <span className="h-2 w-2 rounded-full bg-white/35" />
          </div>
          <div className="hidden items-center gap-4 text-[8px] uppercase tracking-[0.18em] text-white/55 sm:flex">
            {navItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {project.concept === "fitness" ? (
          <div className="grid flex-1 grid-rows-[1fr_auto] p-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-violet-950/70 to-black p-5">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.28),transparent_62%)]" />
              <p className="relative z-10 text-[9px] uppercase tracking-[0.26em] text-fuchsia-200/70">Силова зона</p>
              <h3 className="relative z-10 mt-8 max-w-[11rem] text-2xl font-black leading-none text-white/72">
                ТРЕНИРАЙ БЕЗ ЛИМИТИ
              </h3>
              <button className={`relative z-10 mt-6 rounded-md bg-gradient-to-r ${accent.button} px-4 py-2 text-[10px] font-bold text-white`}>
                Започни
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["Сила", "Кардио", "Йога"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center text-[9px] uppercase tracking-wider text-white/70">
                  <div className="mb-2 h-10 rounded-lg bg-fuchsia-300/15" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {project.concept === "finance" ? (
          <div className="grid flex-1 grid-cols-[1fr_0.85fr] gap-4 p-5">
            <div className="flex flex-col justify-center">
              <p className="text-[9px] uppercase tracking-[0.24em] text-blue-200/70">Finova</p>
              <h3 className="mt-5 text-2xl font-black leading-tight text-white/72">
                Умни финанси за <span className="text-blue-400/80">модерен бизнес</span>
              </h3>
              <button className={`mt-6 w-max rounded-md bg-gradient-to-r ${accent.button} px-4 py-2 text-[10px] font-bold text-white`}>
                Започни
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-blue-300/20 bg-black/35 p-4">
                <p className="text-xs text-white/70">$24,780</p>
                <svg viewBox="0 0 120 60" className="mt-3 h-16 w-full text-blue-400">
                  <path d="M4 48 22 34 38 42 55 18 72 31 91 12 116 20" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-white/[0.04] p-4 text-lg font-bold text-white">+18.2%</div>
            </div>
          </div>
        ) : null}

        {project.concept === "interior" ? (
          <div className="grid flex-1 grid-cols-[1fr_0.9fr] bg-neutral-100 text-black">
            <div className="flex flex-col justify-center p-7">
              <p className="text-[8px] uppercase tracking-[0.24em] text-black/35">Ателие</p>
              <h3 className="mt-7 font-serif text-2xl leading-none text-black/70">Вечен интериорен дизайн</h3>
              <p className="mt-4 text-xs text-black/45">Пространства с усещане за стил.</p>
              <button className="mt-6 w-max rounded-full bg-black px-4 py-2 text-[9px] uppercase text-white">Проекти</button>
            </div>
            <div className="m-4 rounded-2xl bg-gradient-to-br from-stone-200 via-white to-stone-300 shadow-inner" />
          </div>
        ) : null}

        {project.concept === "ecommerce" ? (
          <div className="flex flex-1 flex-col p-5">
            <div className="rounded-2xl border border-cyan-200/20 bg-white/[0.05] p-5">
              <p className="text-[9px] uppercase tracking-[0.22em] text-cyan-100/70">Maison колекция</p>
              <h3 className="mt-4 text-xl font-black text-white/72">Нова сезонна селекция</h3>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-24 rounded-xl bg-gradient-to-br from-cyan-300/18 to-blue-500/10" />
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <span className="h-12 flex-1 rounded-xl bg-white/[0.06]" />
              <span className="h-12 flex-1 rounded-xl bg-cyan-300/15" />
            </div>
          </div>
        ) : null}

        {project.concept === "saas" ? (
          <div className="grid flex-1 grid-cols-[0.38fr_1fr] gap-4 p-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              {[1, 2, 3, 4].map((item) => (
                <span key={item} className="mb-3 block h-3 rounded-full bg-blue-300/20" />
              ))}
            </div>
            <div className="grid grid-rows-[0.55fr_1fr] gap-4">
              <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-4 text-white">
                <p className="text-[11px] text-white/45">Оценка на работното пространство</p>
                <strong className="text-3xl">94%</strong>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <span key={item} className="rounded-xl bg-white/[0.06]" />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {project.concept === "restaurant" ? (
          <div className="grid flex-1 grid-cols-[1fr_0.85fr] gap-4 p-5">
            <div className="flex flex-col justify-center">
              <p className="text-[9px] uppercase tracking-[0.24em] text-amber-100/70">Lume ресторант</p>
              <h3 className="mt-5 text-2xl font-black leading-tight text-white/72">Запази вечерта</h3>
              <p className="mt-4 text-xs text-white/45">Сезонно меню и частни събития.</p>
              <button className={`mt-6 w-max rounded-full bg-gradient-to-r ${accent.button} px-4 py-2 text-[10px] font-bold text-black`}>
                Запази маса
              </button>
            </div>
            <div className="grid gap-3">
              <span className="rounded-2xl bg-amber-300/15" />
              <span className="rounded-2xl bg-orange-400/15" />
              <span className="rounded-2xl bg-white/[0.06]" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
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
      className="relative h-full w-full overflow-hidden rounded-3xl bg-[#030712]"
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
          className="h-full w-full object-cover opacity-45"
          animate={{ scale: isHovering && !prefersReducedMotion ? 1.08 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            x: prefersReducedMotion || !isHoverable ? 0 : imageX,
            y: prefersReducedMotion || !isHoverable ? 0 : imageY,
            willChange: "transform",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-[2]"
        animate={{
          scale: isHovering && !prefersReducedMotion ? 1.025 : 1,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          x: prefersReducedMotion || !isHoverable ? 0 : imageX,
          y: prefersReducedMotion || !isHoverable ? 0 : imageY,
          willChange: "transform",
        }}
      >
        <PortfolioMockup project={project} />
      </motion.div>
      <motion.div
        className="absolute -inset-20 z-[3] rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.28),rgba(59,130,246,0.16)_30%,rgba(168,85,247,0.1)_46%,transparent_70%)] blur-2xl pointer-events-none"
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: isHovering && !prefersReducedMotion ? 1 : 0.38 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none"
        animate={{
          opacity: isHovering && !prefersReducedMotion ? 0.96 : 0.78,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/72 via-[48%] to-black/10" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(34,211,238,0.10)_38%,rgba(59,130,246,0.05)_52%,transparent_68%)] opacity-65" />
        <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[radial-gradient(circle_at_20%_100%,rgba(34,211,238,0.18),transparent_48%),radial-gradient(circle_at_90%_100%,rgba(168,85,247,0.15),transparent_50%)]" />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-[6] rounded-3xl border border-cyan-300/40 pointer-events-none"
        animate={{
          opacity: isHovering && !prefersReducedMotion ? 1 : 0.5,
          boxShadow:
            isHovering && !prefersReducedMotion
              ? "inset 0 0 34px rgba(0,255,255,0.18), 0 0 36px rgba(59,130,246,0.2)"
              : "inset 0 0 10px rgba(0,255,255,0.08)",
        }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      />
      <motion.span
        className="absolute right-5 top-5 z-10 rounded-full border border-cyan-200/18 bg-black/28 px-3 py-2 text-[0.54rem] font-semibold uppercase tracking-[0.3em] text-cyan-50/78 shadow-[0_12px_34px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md drop-shadow-[0_0_10px_rgba(0,255,255,0.32)] sm:right-7 sm:top-7"
        animate={{
          opacity: isHovering && !prefersReducedMotion ? 0.96 : 0.72,
          y: isHovering && !prefersReducedMotion ? -1 : 0,
          borderColor: isHovering && !prefersReducedMotion ? "rgba(103,232,249,0.36)" : "rgba(165,243,252,0.18)",
          boxShadow:
            isHovering && !prefersReducedMotion
              ? "0 14px 38px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 22px rgba(34,211,238,0.16)"
              : "0 12px 34px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        Очаквайте скоро
      </motion.span>
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start justify-end px-5 pb-6 text-left sm:px-7 sm:pb-7"
        initial={false}
        animate={{ y: isHovering && !prefersReducedMotion ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 190, damping: 20 }}
        style={{ transform: "translateZ(44px)" }}
      >
        <motion.div
          className="max-w-[94%] rounded-2xl border border-white/12 bg-black/34 px-4 py-4 shadow-[0_18px_55px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:max-w-[88%] sm:px-5"
          initial={false}
          animate={{
            opacity: 1,
            y: isHovering && !prefersReducedMotion ? -2 : 0,
          }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 h-px w-16 bg-gradient-to-r from-cyan-300 via-blue-400 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.55)]" />
          <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)] md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-white/88 drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)] md:text-[0.95rem]">
            {project.description}
          </p>
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
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasRevealed(true);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsCompactViewport(compactQuery.matches);

    updateViewport();
    compactQuery.addEventListener("change", updateViewport);

    return () => compactQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (hasRevealed || prefersReducedMotion) return;

    const element = titleRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: isCompactViewport ? 0.18 : 0.35,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasRevealed, isCompactViewport, prefersReducedMotion]);

  const titleWords = typeof children === "string" ? children.split(" ") : null;

  const titleMaskVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : isCompactViewport ? 0.045 : 0.06,
        delayChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  const titleWordVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : "112%",
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? "blur(0px)" : isCompactViewport ? "blur(6px)" : "blur(8px)",
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : isCompactViewport ? 0.66 : 0.78,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const titleFallbackVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : "112%",
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
      clipPath: prefersReducedMotion ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: prefersReducedMotion ? 0 : isCompactViewport ? 0.68 : 0.82,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const titleAccentVariants = {
    hidden: {
      scaleX: prefersReducedMotion ? 1 : 0,
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : isCompactViewport ? 0.52 : 0.68,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : isCompactViewport ? 0.28 : 0.36,
      },
    },
  };

  return (
    <motion.div
      ref={titleRef}
      initial="hidden"
      animate={hasRevealed ? "visible" : "hidden"}
      className={`relative text-center ${className}`}
    >
      <motion.h2
        variants={titleMaskVariants}
        className={`${headingClassName} flex flex-wrap justify-center gap-x-3 gap-y-1 overflow-hidden pb-2 font-bold leading-tight drop-shadow-[0_0_15px_#00ffff]`}
      >
        {titleWords ? (
          titleWords.map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1">
              <motion.span
                variants={titleWordVariants}
                className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent will-change-transform"
              >
                {word}
              </motion.span>
            </span>
          ))
        ) : (
          <span className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={titleFallbackVariants}
              className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent will-change-transform"
            >
              {children}
            </motion.span>
          </span>
        )}
      </motion.h2>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviewState, setReviewState] = useState<FormActionState>({
    ok: false,
    message: "",
  });
  const [isContactPending, startContactTransition] = useTransition();
  const [isReviewPending, startReviewTransition] = useTransition();
  const touchStartY = useRef<number | null>(null);
  const heroTransitioning = useRef(false);
  const pendingIntroScroll = useRef(0);
  const portfolioSwiperRef = useRef<any>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const contactError = (name: string) => contactState.errors?.[name];
  const reviewError = (name: string) => reviewState.errors?.[name];

  useEffect(() => {
    document.body.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.documentElement.style.removeProperty("position");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mobileQuery.matches);

    updateViewport();
    mobileQuery.addEventListener("change", updateViewport);

    return () => mobileQuery.removeEventListener("change", updateViewport);
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
    if (!showMain || introComplete) return;

    const fallbackTimer = window.setTimeout(() => {
      setIntroComplete(true);
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    }, prefersReducedMotion ? 0 : 1400);

    return () => window.clearTimeout(fallbackTimer);
  }, [introComplete, prefersReducedMotion, showMain]);

  const revealMain = (scrollIntent = 0) => {
    if (heroTransitioning.current) return;
    heroTransitioning.current = true;
    pendingIntroScroll.current = scrollIntent;
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
        staggerChildren: prefersReducedMotion ? 0 : isMobileViewport ? 0.11 : 0.14,
        delayChildren: prefersReducedMotion ? 0 : isMobileViewport ? 0.08 : 0.14,
      },
    },
  };

  const teamCardVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : isMobileViewport ? 38 : 46,
      scale: prefersReducedMotion ? 1 : isMobileViewport ? 0.96 : 0.92,
      rotateX: prefersReducedMotion || isMobileViewport ? 0 : 8,
      filter: prefersReducedMotion ? "blur(0px)" : isMobileViewport ? "blur(10px)" : "blur(14px)",
      clipPath: prefersReducedMotion
        ? "inset(0% round 16px)"
        : isMobileViewport
          ? "inset(8% 0% 8% round 16px)"
          : "inset(10% 0% 12% round 16px)",
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
      y: prefersReducedMotion ? 0 : isMobileViewport ? 42 : 34,
      scale: prefersReducedMotion ? 1 : isMobileViewport ? 0.98 : 1,
      filter: prefersReducedMotion ? "blur(0px)" : isMobileViewport ? "blur(12px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : isMobileViewport ? 0.78 : 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const testimonialsRevealVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : isMobileViewport ? 36 : 28,
      scale: prefersReducedMotion ? 1 : isMobileViewport ? 0.98 : 1,
      filter: prefersReducedMotion ? "blur(0px)" : isMobileViewport ? "blur(10px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : isMobileViewport ? 0.72 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const testimonialsTrackVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : isMobileViewport ? 0.13 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : isMobileViewport ? 0.08 : 0.12,
      },
    },
  };

  const sectionRevealVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : isMobileViewport ? 38 : 30,
      scale: prefersReducedMotion ? 1 : isMobileViewport ? 0.985 : 1,
      filter: prefersReducedMotion ? "blur(0px)" : isMobileViewport ? "blur(10px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : isMobileViewport ? 0.68 : 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : isMobileViewport ? 0.12 : 0.09,
        delayChildren: prefersReducedMotion ? 0 : isMobileViewport ? 0.1 : 0.08,
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsMobileMenuOpen(false);
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const displayedReviews = approvedReviews.length > 0 ? approvedReviews : sampleReviews;


  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* HERO SECTION */}
      <AnimatePresence>
        {!introComplete && (
          <motion.section
            key="hero"
            className={`fixed inset-0 z-[80] w-full h-screen overflow-hidden bg-black ${showMain ? "pointer-events-none" : ""}`}
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
                document.body.style.removeProperty("overflow");
                document.documentElement.style.removeProperty("overflow");

                if (pendingIntroScroll.current > 0) {
                  window.requestAnimationFrame(() => {
                    window.scrollBy({
                      top: Math.min(Math.max(pendingIntroScroll.current, 80), 180),
                      left: 0,
                      behavior: "smooth",
                    });
                    pendingIntroScroll.current = 0;
                  });
                }
              }
            }}
            onWheel={(event) => {
              if (showMain) return;
              if (event.deltaY > 0) {
                event.preventDefault();
                revealMain(event.deltaY);
              }
            }}
            onTouchStart={(event) => {
              if (showMain) return;
              touchStartY.current = event.touches[0]?.clientY ?? null;
            }}
            onTouchEnd={(event) => {
              if (showMain) return;
              if (touchStartY.current === null) return;
              const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY.current;
              const touchDelta = touchStartY.current - touchEndY;
              if (touchDelta > 20) {
                revealMain(touchDelta);
              }
              touchStartY.current = null;
            }}
          >
            <AutoPlayVideo
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/video/tech-video.mp4"
            />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_52%)]"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 -mt-10">
              <motion.img
                src="/images/vm-studio-logo-transparent.png"
                alt="VM Studio"
                className="mb-7 h-auto w-32 sm:w-40 md:w-48 object-contain drop-shadow-[0_0_18px_rgba(0,255,255,0.38)]"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 sm:mb-6 flex flex-wrap justify-center gap-2 sm:gap-4 leading-tight">
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
                className="text-base sm:text-xl md:text-2xl text-white mb-8 max-w-2xl"
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

            <div className="absolute inset-x-0 bottom-8 md:bottom-16 z-20 flex justify-center">
              <motion.button
                type="button"
                className="flex w-32 flex-col items-center justify-center text-center cursor-pointer"
                animate={prefersReducedMotion ? {} : { y: [-4, 0, -4] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
                onClick={() => revealMain()}
                aria-label="Продължи към сайта"
              >
                <motion.span
                  className="block w-full bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-center text-transparent tracking-[0.16em] text-base font-semibold uppercase leading-none drop-shadow-[0_0_12px_rgba(0,255,255,0.85)]"
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          opacity: [0.82, 1, 0.82],
                          textShadow: [
                            "0 0 10px rgba(0,255,255,0.62)",
                            "0 0 18px rgba(0,255,255,0.82), 0 0 24px rgba(59,130,246,0.42)",
                            "0 0 10px rgba(0,255,255,0.62)",
                          ],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                >
                  Продължи
                </motion.span>
                <span className="relative mx-auto mt-3.5 mb-2.5 block h-16 w-px overflow-hidden bg-gradient-to-b from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(0,255,255,0.82),0_0_20px_rgba(59,130,246,0.45)]">
                  <motion.span
                    className="absolute left-1/2 top-0 block h-5 w-px -translate-x-1/2 bg-cyan-100 shadow-[0_0_14px_rgba(0,255,255,0.9)]"
                    animate={prefersReducedMotion ? {} : { y: [-22, 58] }}
                    transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
                  />
                </span>
                <motion.span
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400 bg-black/25 shadow-[0_0_18px_rgba(0,255,255,0.82),0_0_30px_rgba(59,130,246,0.5),inset_0_0_14px_rgba(0,255,255,0.28)] backdrop-blur-sm"
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: [1, 1.06, 1],
                          boxShadow: [
                            "0 0 18px rgba(0,255,255,0.72), 0 0 26px rgba(59,130,246,0.38), inset 0 0 12px rgba(0,255,255,0.24)",
                            "0 0 26px rgba(0,255,255,0.9), 0 0 42px rgba(59,130,246,0.58), inset 0 0 18px rgba(0,255,255,0.36)",
                            "0 0 18px rgba(0,255,255,0.72), 0 0 26px rgba(59,130,246,0.38), inset 0 0 12px rgba(0,255,255,0.24)",
                          ],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-7 w-7 text-cyan-50 drop-shadow-[0_0_8px_rgba(0,255,255,0.9)]"
                    animate={prefersReducedMotion ? {} : { y: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.35, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                  </motion.svg>
                </motion.span>
              </motion.button>
            </div>
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
                className="mx-auto max-w-7xl flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-black/20 backdrop-blur-md relative"
              >
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center cursor-pointer"
                >
                  <img
                    src="/images/vm-studio-logo-transparent.png"
                    alt="VM Studio"
                    className="h-12 w-auto sm:h-14 object-contain drop-shadow-[0_0_14px_rgba(0,255,255,0.28)]"
                  />
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

                <div className="ml-3 flex items-center gap-2">
                  <motion.a
                    href="tel:+359000000000"
                    aria-label="Свържете се по телефон"
                    className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/60 px-2.5 sm:px-3.5 py-2 text-sm font-semibold text-cyan-100 bg-black/30 shadow-[0_0_18px_rgba(0,255,255,0.22)] backdrop-blur-md transition-colors hover:text-white"
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
                  <motion.button
                    type="button"
                    aria-label={isMobileMenuOpen ? "Затвори меню" : "Отвори меню"}
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                    className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/50 bg-black/35 text-cyan-100 shadow-[0_0_18px_rgba(0,255,255,0.18)] backdrop-blur-md"
                    whileTap={{ scale: 0.94 }}
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {isMobileMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="lg:hidden absolute left-4 right-4 top-[calc(100%+0.75rem)] overflow-hidden rounded-2xl border border-cyan-400/40 bg-black/80 shadow-[0_20px_70px_rgba(0,255,255,0.18)] backdrop-blur-xl"
                    >
                      <div className="flex flex-col py-2">
                        {navItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollToSection(item.id)}
                            className="flex items-center justify-between px-5 py-4 text-left text-base font-medium text-cyan-100 transition-colors hover:bg-cyan-400/10"
                          >
                            <span>{item.label}</span>
                            <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(0,255,255,0.7)]" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

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

            <main className="flex flex-col text-white">
              {/* First Section */}
              <motion.section
                className="relative min-h-screen flex flex-col items-center justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <AutoPlayVideo
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="/video/tech-video-2.mp4"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                <motion.div
                  className="relative z-10 text-center px-4"
                  variants={staggerContainerVariants}
                >
                  <motion.h2
                    variants={sectionRevealVariants}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                  >
                    Добре дошли в VM Studio
                  </motion.h2>
                  <motion.p
                    variants={sectionRevealVariants}
                    className="text-base sm:text-xl md:text-2xl text-white max-w-2xl mx-auto"
                  >
                    Професионални уеб решения, онлайн маркетинг и дигитален растеж за вашия бизнес.
                  </motion.p>
                  <motion.div
                    variants={staggerContainerVariants}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    <motion.button
                      type="button"
                      onClick={() => scrollToSection("services")}
                      className="relative w-full sm:w-auto overflow-hidden rounded-md px-8 py-4 font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_28px_rgba(0,255,255,0.32)] transition-transform"
                      variants={sectionRevealVariants}
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
                      className="relative w-full sm:w-auto overflow-hidden rounded-md border border-cyan-400/70 px-8 py-4 font-semibold text-cyan-100 bg-black/25 shadow-[0_0_22px_rgba(0,255,255,0.18)] backdrop-blur-md transition-transform"
                      variants={sectionRevealVariants}
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                        boxShadow: "0 0 32px rgba(59,130,246,0.38)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Свържи се с нас</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.section>


              <section id="services" className="relative py-24 bg-gray-900 overflow-hidden">


                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
                  <PremiumSectionTitle className="mb-16">
                    Нашите услуги
                  </PremiumSectionTitle>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                  >
                    {[
                      {
                        title: "Изкуствен интелект",
                        description: "Интелигентни алгоритми за вашия бизнес.",
                        icon: (
                          <BrainCircuit className="h-16 w-16 text-white" strokeWidth={1.7} />
                        ),
                        gradientFrom: "from-cyan-400",
                        gradientTo: "to-blue-500",
                      },
                      {
                        title: "Уеб разработка",
                        description: "Съвременни уеб приложения с висока производителност.",
                        icon: (
                          <Code2 className="h-16 w-16 text-white" strokeWidth={1.7} />
                        ),
                        gradientFrom: "from-purple-400",
                        gradientTo: "to-pink-500",
                      },
                      {
                        title: "Мобилни приложения",
                        description: "Решения за iOS и Android с надеждна работа на различни устройства.",
                        icon: (
                          <Smartphone className="h-16 w-16 text-white" strokeWidth={1.7} />
                        ),
                        gradientFrom: "from-green-400",
                        gradientTo: "to-lime-500",
                      },
                      {
                        title: "Дизайн на интерфейси",
                        description: "Интуитивни и визуално впечатляващи интерфейси.",
                        icon: (
                          <Layers3 className="h-16 w-16 text-white" strokeWidth={1.7} />
                        ),
                        gradientFrom: "from-pink-400",
                        gradientTo: "to-red-500",
                      },
                      {
                        title: "Облачни решения",
                        description: "Облачни инфраструктури и стратегии за деплоймент.",
                        icon: (
                          <CloudCog className="h-16 w-16 text-white" strokeWidth={1.7} />
                        ),
                        gradientFrom: "from-blue-400",
                        gradientTo: "to-indigo-500",
                      },
                      {
                        title: "Дигитален маркетинг",
                        description: "Оптимизация за търсачки, платена реклама, социални мрежи и съдържание.",
                        icon: (
                          <TrendingUp className="h-16 w-16 text-white" strokeWidth={1.7} />
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
                className="relative order-5 py-28 bg-black overflow-hidden"
              >
                <div className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_82%_58%,rgba(59,130,246,0.13),transparent_34%),linear-gradient(180deg,rgba(17,24,39,0)_0%,rgba(17,24,39,0.82)_18%,rgba(0,0,0,0.96)_52%,rgba(17,24,39,0.74)_82%,rgba(17,24,39,0)_100%)]" />
                {/* Dynamic hi-tech background */}
                <div className="absolute inset-0 z-0 opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
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

                <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
                  <PremiumSectionTitle className="mb-12">
                    Клиенти & Отзиви
                  </PremiumSectionTitle>

                  {/* Testimonials Slider on Top */}
                  <motion.div
                    className="mb-14 sm:mb-20 py-5"
                    variants={testimonialsTrackVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    {displayedReviews.length > 3 ? (
                      <div className="mb-3 flex items-center justify-end gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan-100/55">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300/70" />
                        Плъзнете за още
                      </div>
                    ) : null}
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      className="testimonials-swiper"
                      slidesPerView={1.08}
                      spaceBetween={16}
                      grabCursor
                      watchSlidesProgress
                      loop={displayedReviews.length > 3}
                      pagination={{ clickable: true }}
                      autoplay={
                        displayedReviews.length > 3 && !prefersReducedMotion
                          ? { delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }
                          : false
                      }
                      breakpoints={{
                        640: { slidesPerView: 1.25, spaceBetween: 20 },
                        768: { slidesPerView: 2.14, spaceBetween: 24 },
                        1024: { slidesPerView: 3.12, spaceBetween: 30 },
                      }}
                    >
                      {displayedReviews.map((testimonial, i) => (
                        <SwiperSlide key={testimonial.id} className="pb-12">
                          <motion.div
                            className="group h-full"
                            variants={testimonialsRevealVariants}
                            whileHover={
                              prefersReducedMotion
                                ? {}
                                : {
                                    y: -10,
                                    scale: 1.04,
                                    rotateZ: i % 2 === 0 ? 2.4 : -2.4,
                                    rotateX: 2,
                                    rotateY: i % 2 === 0 ? -2 : 2,
                                  }
                            }
                            transition={{ type: "spring", stiffness: 180, damping: 18 }}
                            style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
                          >
                            <motion.div
                              className="relative flex min-h-[320px] flex-col justify-between overflow-hidden p-6 sm:p-10 rounded-3xl bg-gray-900/64 border border-cyan-400/40 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
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
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </motion.div>

                  {/* Futuristic Comment Form Below */}
                  <motion.div
                    className="max-w-lg mx-auto px-1 sm:px-0"
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
                        (field, i) => {
                          const error = reviewError(field.name);

                          return i < 2 ? (
                            <motion.div key={field.name} variants={sectionRevealVariants} className="flex flex-col gap-1.5">
                              <motion.input
                                name={field.name}
                                type="text"
                                placeholder={field.placeholder}
                                required
                                aria-invalid={Boolean(error)}
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
                                className={`px-4 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-md text-white border focus:outline-none transition-all duration-300 text-sm ${
                                  error
                                    ? "border-red-400/80 shadow-[0_0_22px_rgba(248,113,113,0.35)] focus:border-red-300"
                                    : "border-cyan-400/40 focus:border-cyan-400 focus:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                                }`}
                              />
                              {error ? <span className="px-1 text-xs text-red-200">{error}</span> : null}
                            </motion.div>
                          ) : (
                            <motion.div key={field.name} variants={sectionRevealVariants} className="flex flex-col gap-1.5">
                              <motion.textarea
                                name={field.name}
                                placeholder={field.placeholder}
                                required
                                rows={4}
                                aria-invalid={Boolean(error)}
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
                                className={`px-4 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-md text-white border focus:outline-none transition-all duration-300 resize-none text-sm ${
                                  error
                                    ? "border-red-400/80 shadow-[0_0_22px_rgba(248,113,113,0.35)] focus:border-red-300"
                                    : "border-cyan-400/40 focus:border-cyan-400 focus:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                                }`}
                              />
                              {error ? <span className="px-1 text-xs text-red-200">{error}</span> : null}
                            </motion.div>
                          );
                        }
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
      <div className="absolute inset-x-0 bottom-12 h-52 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2),rgba(168,85,247,0.12)_36%,transparent_70%)] blur-2xl" />
      <div className="absolute bottom-0 left-0 h-44 w-1/3 bg-[radial-gradient(circle,rgba(217,70,239,0.2),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-44 w-1/3 bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_68%)] blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <PremiumSectionTitle className="mb-12">
          Нашето портфолио
        </PremiumSectionTitle>
        <motion.p variants={portfolioRevealVariants} className="text-center text-gray-400 mb-12 sm:mb-16 max-w-2xl mx-auto text-base sm:text-lg md:text-xl">
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
          onSwiper={(swiper) => {
            portfolioSwiperRef.current = swiper;
            setActiveProjectIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => setActiveProjectIndex(swiper.realIndex)}
          className="portfolio-swiper w-full py-12"
        >
          {projects.map((project, i) => (
            <SwiperSlide
              key={i}
              className="portfolio-slide group rounded-3xl overflow-hidden relative shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              style={{ width: "min(82vw, 20rem)", height: "min(24rem, 112vw)" }}
              onClick={() => portfolioSwiperRef.current?.slideToLoop(i)}
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

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
                  <PremiumSectionTitle className="mb-12">
                    Зад нашия екип
                  </PremiumSectionTitle>

                  <motion.p
                    variants={aboutTextVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.45 }}
                    className="text-center text-gray-400 mb-14 sm:mb-20 max-w-2xl mx-auto text-base sm:text-lg md:text-xl"
                  >
                    Нашият екип се състои от специалисти с дългогодишен опит в технологии, дизайн и дигитален маркетинг. Съчетаваме професионализъм и иновации, за да създаваме решения, които работят.
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12"
                    variants={teamGridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                  >
                    {[
                      {
                        role: "Ръководител проекти", exp: "14+ години опит", icon: (
                          <LayoutDashboard className="h-16 w-16 text-cyan-400" strokeWidth={1.6} />
                        )
                      },
                      {
                        role: "UX/UI дизайнер", exp: "8+ години опит", icon: (
                          <PenTool className="h-16 w-16 text-cyan-400" strokeWidth={1.6} />
                        )
                      },
                      {
                        role: "Специалист облачна инфраструктура", exp: "7+ години опит", icon: (
                          <CloudCog className="h-16 w-16 text-cyan-400" strokeWidth={1.6} />
                        )
                      },
                      {
                        role: "Специалист дигитален маркетинг", exp: "6+ години опит", icon: (
                          <BarChart3 className="h-16 w-16 text-cyan-400" strokeWidth={1.6} />
                        )
                      },
                      // Новите двама developers
                      {
                        role: "Фронтенд програмист", exp: "10+ години опит", icon: (
                          <Sparkles className="h-16 w-16 text-cyan-400" strokeWidth={1.6} />
                        )
                      },
                      {
                        role: "Бекенд програмист", exp: "10+ години опит", icon: (
                          <Database className="h-16 w-16 text-cyan-400" strokeWidth={1.6} />
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
                <div className="max-w-7xl mx-auto px-5 sm:px-6">
                  <PremiumSectionTitle className="mb-12">
                    Нашият процес
                  </PremiumSectionTitle>
                  <motion.p
                    variants={sectionRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    className="text-gray-400 max-w-2xl mx-auto mb-12 sm:mb-16 text-center text-base sm:text-lg md:text-xl"
                  >
                    Всяко решение преминава през внимателно планиране и изпълнение, за да осигурим максимално качество и ефективност.
                  </motion.p>

                  <div className="relative flex">
                    {/* Vertical Progress Indicator */}
                    <div className="relative w-1 bg-gray-700 rounded-full mr-5 sm:mr-12">
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-400 rounded-full origin-top"
                        initial={{ height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: prefersReducedMotion ? 0 : isMobileViewport ? 1.35 : 2, ease: "easeInOut" }}
                      />
                    </div>

                    {/* Steps */}
                    <div className="flex-1 flex flex-col space-y-8 sm:space-y-16">
                      {[
                        {
                          title: "Идея & Концепция",
                          description: "Обсъждане на нуждите, визията на проекта и потенциални технологии.",
                          icon: (
                            <Lightbulb className="h-12 w-12 overflow-visible text-cyan-400" strokeWidth={1.8} />
                          ),
                        },
                        {
                          title: "План & Архитектура",
                          description: "Създаваме детайлен план и архитектура, която гарантира мащабируемост и ефективност.",
                          icon: (
                            <Route className="h-12 w-12 overflow-visible text-blue-400" strokeWidth={1.8} />
                          ),
                        },
                        {
                          title: "Дизайн",
                          description: "Решения за потребителски интерфейси, които са интуитивни, визуално впечатляващи и модерни.",
                          icon: (
                            <PenTool className="h-12 w-12 overflow-visible text-purple-400" strokeWidth={1.8} />
                          ),
                        },
                        {
                          title: "Разработка",
                          description: "Изграждане на клиентска и сървърна част с висок стандарт за качество и производителност.",
                          icon: (
                            <Code2 className="h-12 w-12 overflow-visible text-green-400" strokeWidth={1.8} />
                          ),
                        },
                        {
                          title: "Тест & Оптимизация",
                          description: "Пълно тестиране, дебъг и оптимизация за висока производителност и стабилност.",
                          icon: (
                            <SearchCheck className="h-12 w-12 overflow-visible text-yellow-400" strokeWidth={1.8} />
                          ),
                        },
                        {
                          title: "Деплой & Поддръжка",
                          description: "Деплой на live среда, monitoring и постоянна поддръжка на проекта.",
                          icon: (
                            <Rocket className="h-12 w-12 overflow-visible text-pink-400" strokeWidth={1.8} />
                          ),
                        },
                      ].map((step, i) => (
                        <motion.div
                          key={i}
                          className="relative flex justify-start md:justify-start"
                          initial={{
                            opacity: prefersReducedMotion ? 1 : 0,
                            x: prefersReducedMotion ? 0 : isMobileViewport ? 24 : 100,
                            y: prefersReducedMotion ? 0 : isMobileViewport ? 18 : 0,
                            filter: prefersReducedMotion ? "blur(0px)" : isMobileViewport ? "blur(8px)" : "blur(0px)",
                          }}
                          whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : isMobileViewport ? 0.62 : 0.8,
                            delay: prefersReducedMotion ? 0 : i * (isMobileViewport ? 0.11 : 0.2),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div className="flex gap-4 sm:gap-6 items-start w-full">
                            {/* Икона */}
                            <div className="flex-shrink-0 mt-2 overflow-visible scale-90 sm:scale-100 origin-top">{step.icon}</div>
                            {/* Блок с описание */}
                            <motion.div
                              className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 relative border border-gray-700"
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
                              <h3 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h3>
                              <p className="text-sm sm:text-base text-gray-400 mt-2">{step.description}</p>
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
                className="relative order-6 min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
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
                  className="relative z-10 w-[calc(100%-2rem)] max-w-xl bg-gray-800/30 backdrop-blur-md p-5 sm:p-8 rounded-2xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300"
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
                    className="flex flex-col gap-5 sm:gap-6 relative z-10"
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
                    ].map((field, i) => {
                      const error = contactError(field.name);

                      return (
                      <motion.div
                        key={i}
                        className="relative"
                        variants={sectionRevealVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        {/* Полето */}
                        <motion.input
                          type={field.type}
                          name={field.name}
                          required
                          placeholder=" "
                          aria-invalid={Boolean(error)}
                          whileFocus={{
                            scale: 1.01,
                            boxShadow: "0 0 22px rgba(0,255,255,0.45)",
                          }}
                          className={`peer w-full rounded-lg bg-gray-700/50 border px-4 pb-3 pt-5 text-white placeholder-transparent focus:outline-none focus:ring-2 hover:shadow-[0_0_15px_#00ffff] transition-all duration-300 ${
                            error
                              ? "border-red-400/80 focus:ring-red-300 shadow-[0_0_20px_rgba(248,113,113,0.28)]"
                              : "border-gray-600 focus:ring-cyan-400"
                          }`}
                        />
                        <label className="pointer-events-none absolute left-4 top-1.5 text-xs text-cyan-200 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-cyan-300">
                          {field.placeholder}
                        </label>
                        {error ? <p className="mt-2 px-1 text-xs text-red-200">{error}</p> : null}
                      </motion.div>
                      );
                    })}

                    {/* Съобщение */}
                    <motion.div
                      className="relative"
                      variants={sectionRevealVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.textarea
                        name="message"
                        required
                        placeholder=" "
                        aria-invalid={Boolean(contactError("message"))}
                        whileFocus={{
                          scale: 1.01,
                          boxShadow: "0 0 22px rgba(0,255,255,0.45)",
                        }}
                        className={`peer w-full rounded-lg bg-gray-700/50 border px-4 pb-3 pt-5 text-white placeholder-transparent focus:outline-none focus:ring-2 hover:shadow-[0_0_15px_#00ffff] transition-all duration-300 resize-none ${
                          contactError("message")
                            ? "border-red-400/80 focus:ring-red-300 shadow-[0_0_20px_rgba(248,113,113,0.28)]"
                            : "border-gray-600 focus:ring-cyan-400"
                        }`}
                        rows={4}
                      ></motion.textarea>
                      <label className="pointer-events-none absolute left-4 top-1.5 text-xs text-cyan-200 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-cyan-300">
                        Съобщение
                      </label>
                      {contactError("message") ? (
                        <p className="mt-2 px-1 text-xs text-red-200">{contactError("message")}</p>
                      ) : null}
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
                className="relative order-7 w-full py-12 mt-20 bg-black text-center overflow-hidden"
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
                      © {new Date().getFullYear()} VM Studio – Всички права запазени
                    </span>
                    © {new Date().getFullYear()} VM Studio – Всички права запазени
                  </motion.p>

                  <motion.p
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-base drop-shadow-[0_0_20px_#00ffff]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                  >
                    ⚡ Разработено от <span className="text-white">VM Studio</span>
                  </motion.p>

                  <motion.p
                    className="text-xs italic text-gray-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                  >
                    Създаваме дигиталното бъдеще ✨
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
