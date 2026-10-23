"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const gardenRef = useRef<HTMLDivElement>(null);

  const posts = [
    {
      id: 1,
      category: "Indoor",
      title: "My little jungle corner 🌿",
      text: "Turning an empty corner into a peaceful indoor garden with pothos, monstera and spider plants.",
      author: "Ayesha",
      emoji: "🪴",
      color: "from-lime-200 via-green-100 to-emerald-200",
      likes: 128,
    },
    {
      id: 2,
      category: "Organic",
      title: "Compost that actually works",
      text: "Sharing my simple kitchen-waste composting routine for healthier soil and happier plants.",
      author: "Hamza",
      emoji: "🌱",
      color: "from-amber-100 via-lime-100 to-green-200",
      likes: 94,
    },
    {
      id: 3,
      category: "Flowers",
      title: "A balcony full of blooms",
      text: "My favorite flowering plants for adding color and life to a small balcony garden.",
      author: "Sara",
      emoji: "🌸",
      color: "from-pink-100 via-rose-100 to-orange-100",
      likes: 176,
    },
    {
      id: 4,
      category: "Vegetables",
      title: "Growing food at home",
      text: "Tomatoes, chilies and herbs growing happily in recycled containers.",
      author: "Omar",
      emoji: "🍅",
      color: "from-orange-100 via-yellow-100 to-lime-200",
      likes: 82,
    },
  ];

  const categories = ["All", "Indoor", "Organic", "Flowers", "Vegetables"];

  const filteredPosts =
    activeTab === "All"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  const toggleLike = (id: number) => {
    setLikedPosts((current) =>
      current.includes(id)
        ? current.filter((postId) => postId !== id)
        : [...current, id]
    );
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;

      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5e9] text-[#173b2a] selection:bg-lime-300 selection:text-green-950">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-lime-300/20 blur-3xl" />
        <div className="absolute right-0 top-[35%] h-[32rem] w-[32rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-green-900/10 bg-[#f7f5e9]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#173b2a] text-xl shadow-lg transition-transform group-hover:rotate-6">
              🌿
            </span>
            <span className="text-xl font-black tracking-tight">
              the gardeners<span className="text-lime-600">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <button
              onClick={() => scrollTo("home")}
              className="transition-colors hover:text-lime-700"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("community")}
              className="transition-colors hover:text-lime-700"
            >
              Community
            </button>
            <button
              onClick={() => scrollTo("ideas")}
              className="transition-colors hover:text-lime-700"
            >
              Garden Ideas
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="transition-colors hover:text-lime-700"
            >
              About
            </button>
          </div>

          <button
            onClick={() => scrollTo("join")}
            className="hidden rounded-full bg-[#173b2a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-950/15 transition hover:-translate-y-0.5 hover:bg-[#24573c] md:block"
          >
            Join the garden →
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-green-900/10 bg-white/50 px-3 py-2 text-xl md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-green-900/10 bg-[#f7f5e9] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-bold">
              <button onClick={() => scrollTo("home")} className="text-left">
                Home
              </button>
              <button
                onClick={() => scrollTo("community")}
                className="text-left"
              >
                Community
              </button>
              <button onClick={() => scrollTo("ideas")} className="text-left">
                Garden Ideas
              </button>
              <button onClick={() => scrollTo("about")} className="text-left">
                About
              </button>
              <button
                onClick={() => scrollTo("join")}
                className="rounded-full bg-[#173b2a] px-5 py-3 text-white"
              >
                Join the garden →
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-20">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-900/10 bg-white/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] shadow-sm backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime-500" />
              A community for plant people
            </div>

            <h1 className="max-w-4xl text-6xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6.7rem]">
              Grow your
              <br />
              <span className="relative inline-block text-[#4d8b38]">
                passion.
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 300 20"
                  fill="none"
                >
                  <path
                    d="M3 14C74 3 205 2 297 12"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Share the joy.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-green-950/65 sm:text-xl">
              A cozy corner of the internet for gardeners, plant lovers and
              curious beginners to share ideas, celebrate growth and learn from
              each other.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("community")}
                className="rounded-full bg-[#173b2a] px-7 py-4 font-bold text-white shadow-xl shadow-green-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Explore the community 🌱
              </button>
              <button
                onClick={() => scrollTo("ideas")}
                className="rounded-full border border-green-900/15 bg-white/60 px-7 py-4 font-bold transition hover:bg-white"
              >
                Discover garden ideas
              </button>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-2xl font-black">2.8k+</p>
                <p className="text-xs font-semibold text-green-950/50">
                  plant lovers
                </p>
              </div>
              <div className="h-9 w-px bg-green-900/15" />
              <div>
                <p className="text-2xl font-black">12k+</p>
                <p className="text-xs font-semibold text-green-950/50">
                  garden ideas
                </p>
              </div>
              <div className="h-9 w-px bg-green-900/15" />
              <div>
                <p className="text-2xl font-black">∞</p>
                <p className="text-xs font-semibold text-green-950/50">
                  new leaves
                </p>
              </div>
            </div>
          </div>

          {/* Hero bento */}
          <div className="relative mx-auto w-full max-w-xl">
            <div
              className="absolute -inset-8 rounded-[4rem] bg-lime-300/20 blur-3xl"
              style={{
                transform:
                  "translate(var(--mouse-x), var(--mouse-y))",
              }}
            />

            <div className="relative grid grid-cols-2 gap-3">
              <div className="relative col-span-2 h-64 overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-br from-[#2e6b45] via-[#4d8b38] to-[#9ccf55] p-7 shadow-2xl sm:h-72">
                <div className="absolute -right-10 -top-20 text-[15rem] leading-none opacity-25">
                  🌿
                </div>
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    TODAY&apos;S MOOD
                  </span>
                  <div>
                    <p className="text-4xl font-black tracking-tight text-white">
                      Slow mornings.
                      <br />
                      Green thoughts.
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/75">
                      Water your plants. Water your dreams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative h-52 overflow-hidden rounded-[2.5rem] border border-white/70 bg-[#e7edcf] p-5 shadow-xl transition hover:-translate-y-2">
                <span className="text-6xl transition-transform duration-500 group-hover:scale-110">
                  🪴
                </span>
                <div className="absolute bottom-5 left-5">
                  <p className="font-black">Plant care</p>
                  <p className="text-xs text-green-950/50">Little rituals</p>
                </div>
              </div>

              <div className="group relative h-52 overflow-hidden rounded-[2.5rem] border border-white/70 bg-[#f1ddb0] p-5 shadow-xl transition hover:-translate-y-2">
                <span className="text-6xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  🌻
                </span>
                <div className="absolute bottom-5 left-5">
                  <p className="font-black">Garden diary</p>
                  <p className="text-xs text-green-950/50">Share your story</p>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-between rounded-[2rem] bg-[#173b2a] p-5 text-white shadow-xl">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-lime-300">
                    New here?
                  </p>
                  <p className="mt-1 font-bold">
                    Every gardener starts with one seed.
                  </p>
                </div>
                <button
                  onClick={() => scrollTo("join")}
                  className="rounded-full bg-lime-300 px-4 py-2 text-xs font-black text-green-950 transition hover:bg-lime-200"
                >
                  Start growing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-green-900/10 bg-[#dce9bb] py-4">
        <div className="flex min-w-max animate-[marquee_25s_linear_infinite] items-center gap-8 text-sm font-black uppercase tracking-[0.18em]">
          <span>🌱 Grow</span>
          <span>✦</span>
          <span>🪴 Connect</span>
          <span>✦</span>
          <span>🌻 Share</span>
          <span>✦</span>
          <span>🍃 Learn</span>
          <span>✦</span>
          <span>🌿 Inspire</span>
          <span>✦</span>
          <span>🌱 Grow</span>
          <span>✦</span>
          <span>🪴 Connect</span>
          <span>✦</span>
          <span>🌻 Share</span>
          <span>✦</span>
          <span>🍃 Learn</span>
          <span>✦</span>
        </div>
      </div>

      {/* COMMUNITY */}
      <section id="community" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-green-700">
              The garden community
            </p>
            <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-6xl">
              What&apos;s growing in our community?
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-green-950/55">
            Real gardeners. Real experiments. Tiny victories and lessons
            learned one leaf at a time.
          </p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition ${
                activeTab === category
                  ? "bg-[#173b2a] text-white shadow-lg"
                  : "border border-green-900/10 bg-white/60 hover:bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-gradient-to-br ${post.color} p-7 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                index === 0 ? "md:row-span-2 md:min-h-[500px]" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-white/60 px-3 py-1.5 text-xs font-black uppercase tracking-wider backdrop-blur">
                  {post.category}
                </span>
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`rounded-full bg-white/60 px-3 py-2 text-sm font-bold backdrop-blur transition hover:scale-105 ${
                    likedPosts.includes(post.id) ? "text-red-600" : ""
                  }`}
                >
                  {likedPosts.includes(post.id) ? "♥" : "♡"}{" "}
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
              </div>

              <div
                className={`flex items-center justify-center transition duration-700 group-hover:scale-110 ${
                  index === 0
                    ? "my-8 min-h-56 text-[11rem]"
                    : "my-5 h-28 text-7xl"
                }`}
              >
                {post.emoji}
              </div>

              <div className="mt-auto">
                <p className="mb-2 text-xs font-bold text-green-950/50">
                  Shared by @{post.author.toLowerCase()}
                </p>
                <h3 className="text-2xl font-black tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-green-950/65">
                  {post.text}
                </p>
                <button className="mt-5 text-sm font-black underline decoration-green-900/20 underline-offset-4 transition hover:decoration-green-900">
                  Read the story →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* IDEAS / BENTO */}
      <section id="ideas" className="bg-[#173b2a] px-5 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-lime-300">
              Garden inspiration
            </p>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">
              Make your little
              <span className="text-lime-300"> green world.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            <div className="group relative min-h-72 overflow-hidden rounded-[2.5rem] bg-[#719d49] p-7 md:col-span-2">
              <div className="absolute -right-8 -top-12 text-[12rem] opacity-30 transition duration-500 group-hover:rotate-12 group-hover:scale-110">
                🌱
              </div>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="text-4xl">01</span>
                <div>
                  <h3 className="text-3xl font-black">Start small</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/75">
                    One pot, one plant, one new habit. You don&apos;t need a
                    huge garden to become a gardener.
                  </p>
                </div>
              </div>
            </div>

            <div className="group min-h-72 overflow-hidden rounded-[2.5rem] bg-[#d9a84c] p-7 md:col-span-2">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">02</span>
                  <span className="text-6xl transition group-hover:rotate-12">
                    🌻
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-black">Grow with seasons</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/75">
                    Learn what your plants need as the weather changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="group min-h-72 overflow-hidden rounded-[2.5rem] bg-[#a7bd7c] p-7 text-green-950 md:col-span-1">
              <span className="text-4xl">03</span>
              <div className="mt-20">
                <span className="text-6xl transition group-hover:scale-110">
                  🪴
                </span>
                <h3 className="mt-5 text-2xl font-black">Indoor jungle</h3>
                <p className="mt-2 text-sm text-green-950/60">
                  Turn empty corners into green corners.
                </p>
              </div>
            </div>

            <div className="group min-h-72 overflow-hidden rounded-[2.5rem] bg-[#e9e4c5] p-7 text-green-950 md:col-span-3">
              <div className="flex h-full flex-col justify-between md:flex-row md:items-end">
                <div>
                  <span className="text-4xl">04</span>
                  <h3 className="mt-16 text-3xl font-black">
                    Share your garden diary
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-green-950/60">
                    Post your plant progress, experiments, tips and tiny
                    victories. Someone might need exactly what you learned.
                  </p>
                </div>
                <div className="mt-8 text-8xl transition duration-500 group-hover:-translate-y-4 group-hover:rotate-6 md:mt-0">
                  🌿
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-green-900/10 bg-white/60 p-7">
            <span className="text-4xl">🤝</span>
            <h3 className="mt-8 text-2xl font-black">Grow together</h3>
            <p className="mt-3 text-sm leading-6 text-green-950/60">
              Gardening is more fun when you can exchange ideas, ask questions
              and learn from other plant lovers.
            </p>
          </div>

          <div className="rounded-[2rem] border border-green-900/10 bg-[#dce9bb] p-7">
            <span className="text-4xl">🌍</span>
            <h3 className="mt-8 text-2xl font-black">Garden naturally</h3>
            <p className="mt-3 text-sm leading-6 text-green-950/60">
              Discover simple, thoughtful and organic approaches to caring for
              plants and soil.
            </p>
          </div>

          <div className="rounded-[2rem] border border-green-900/10 bg-[#f0d6b0] p-7">
            <span className="text-4xl">✨</span>
            <h3 className="mt-8 text-2xl font-black">Celebrate progress</h3>
            <p className="mt-3 text-sm leading-6 text-green-950/60">
              A new leaf counts. A first flower counts. Every little sign of
              growth deserves to be celebrated.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT CREATOR */}
      <section id="about" className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#dce9bb]">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[.75fr_1.25fr] lg:p-16">
            <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#799d4e] to-[#d3df9f]">
              <div className="absolute -left-8 -top-10 text-[9rem] opacity-20">
                🍃
              </div>
              <div className="relative text-[9rem]">👩‍🌾</div>
              <div className="absolute bottom-5 rounded-full bg-white/70 px-4 py-2 text-xs font-black backdrop-blur">
                BOTANY × WEB × AI
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">
                Meet the creator
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Hi, I&apos;m Hajira.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-green-950/65">
                I&apos;m a BS Botany student at the University of Sargodha,
                learning web development and AI. I created{" "}
                <strong className="text-green-950">the gardeners</strong> as a
                place where my love for plants can meet my passion for building
                useful digital experiences.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "🌿 Organic gardening",
                  "💻 HTML",
                  "⚡ Next.js",
                  "🎨 Canva",
                  "📊 MS Excel",
                  "🤝 Communication",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-green-900/10 bg-white/60 px-4 py-2 text-xs font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="px-5 pb-24 lg:px-8">
        <div
          ref={gardenRef}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#173b2a] px-7 py-16 text-center text-white sm:px-12"
        >
          <div className="absolute -left-20 -top-24 text-[15rem] opacity-10">
            🌿
          </div>
          <div className="absolute -bottom-24 -right-20 text-[15rem] opacity-10">
            🌱
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            {joined ? (
              <>
                <div className="text-6xl">🌱</div>
                <h2 className="mt-6 text-4xl font-black sm:text-5xl">
                  Welcome to the garden!
                </h2>
                <p className="mt-4 text-white/65">
                  Your spot is ready. Keep growing, sharing and inspiring.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">
                  Your next chapter
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                  Bring your plant
                  <br />
                  <span className="text-lime-300">story.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-white/65">
                  Join the community and start sharing the plants, experiments
                  and garden ideas that make you happy.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setJoined(true);
                  }}
                  className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
                >
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="Your email address"
                    className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-lime-300/60"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-lime-300 px-7 py-4 text-sm font-black text-green-950 transition hover:bg-lime-200"
                  >
                    Join us 🌿
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-green-900/10 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173b2a] text-lg">
                🌿
              </span>
              <span className="font-black">the gardeners.</span>
            </div>
            <p className="mt-3 text-xs text-green-950/45">
              A passion project by Hajira SaadUllah · 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:hajirasaadullah03@gmail.com"
              className="rounded-full border border-green-900/10 bg-white/50 px-4 py-2 text-xs font-bold transition hover:bg-white"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/hajira-saadullah-414989409/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-green-900/10 bg-white/50 px-4 py-2 text-xs font-bold transition hover:bg-white"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/hajira285"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-green-900/10 bg-white/50 px-4 py-2 text-xs font-bold transition hover:bg-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        ::selection {
          background: #bef264;
          color: #173b2a;
        }
      `}</style>
    </main>
  );
}