import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, ChevronRight, CheckCircle2, 
  Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook, Youtube, Layout, 
  Share2, TrendingUp, Lightbulb, Video, PenTool, Search, ShieldAlert, ShieldCheck,
  Star, Sparkles, Hexagon
} from 'lucide-react';

const SERVICES = [
  {
    id: 'website-creation',
    title: 'Website Creation',
    icon: <Layout className="w-6 h-6 text-[#3732FE]" />,
    brief: 'Professional, responsive websites designed to present your business clearly and help visitors take the next step.',
    benefit: 'Ideal for scaling businesses that need a robust, technically sound online hub to drive enterprise growth and customer trust.',
    deliverables: ['Custom UI/UX Design', 'Full-Stack Development', 'Technical SEO Architecture', 'CMS Integration (WordPress/Headless)'],
    expandedDescription: 'Your website is often the foundational interaction a potential customer has with your brand. We build digital experiences that are not only visually engaging but structurally sound. Our focus is on user experience (UX), fast loading times, and intuitive navigation. We ensure your site aligns perfectly with your brand identity while providing a frictionless journey that guides the user toward meaningful actions.',
    approach: [
      { title: "Discovery & Strategy", desc: "We map out user journeys, site architecture, and technical requirements." },
      { title: "Design & Prototyping", desc: "Crafting wireframes and high-fidelity designs to establish the visual direction." },
      { title: "Development & Testing", desc: "Building clean, semantic, responsive code followed by rigorous QA testing." }
    ],
    faqs: [
      { q: "Are your websites mobile-friendly?", a: "Yes, every website we build follows a responsive, mobile-first approach to ensure optimal performance and accessibility across all devices." },
      { q: "Can our team update the content easily?", a: "Absolutely. We integrate user-friendly Content Management Systems (like WordPress) and provide training so your team can manage day-to-day updates without touching code." }
    ],
    motif: 'grid'
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    icon: <Share2 className="w-6 h-6 text-[#3732FE]" />,
    brief: 'Social media planning, content creation, and account management to help a business maintain a consistent presence.',
    benefit: 'Brands seeking to transform passive followers into active communities through data-driven content strategies.',
    deliverables: ['Audience Persona Mapping', 'Multi-channel Content Calendars', 'Proactive Community Management', 'Sentiment Analysis Reports'],
    expandedDescription: 'A successful social media presence requires more than sporadic posting; it demands a deliberate, ongoing strategy. We help organizations articulate their voice, create high-quality assets, and distribute them across the platforms where their audience actually spends time. By blending creative storytelling with analytical listening, we help you build authentic authority in your industry.',
    approach: [
      { title: "Platform Audit", desc: "Evaluating current performance, audience demographics, and competitive positioning." },
      { title: "Content Strategy", desc: "Developing content pillars, visual guidelines, and an actionable editorial calendar." },
      { title: "Execution & Monitoring", desc: "Publishing content, engaging with the community, and continuously monitoring sentiment." }
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "We tailor our platform selection to your audience. This typically includes LinkedIn for B2B, and a mix of Instagram, X, Facebook, or TikTok for B2C organizations." },
      { q: "Do we need to provide all the content?", a: "No. While we rely on your industry expertise, our team handles the copywriting, graphic design, and video editing required to produce the final posts." }
    ],
    motif: 'bubbles'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: <TrendingUp className="w-6 h-6 text-[#3732FE]" />,
    brief: 'Digital marketing services and campaign support shaped around the business, audience, and goals.',
    benefit: 'Companies looking to aggressively capture market share and optimize their customer acquisition costs (CAC).',
    deliverables: ['PPC & Search Ads', 'Conversion Rate Optimization (CRO)', 'A/B Testing Frameworks', 'Advanced Attribution Modeling'],
    expandedDescription: 'Effective digital marketing is an interconnected ecosystem, not a series of isolated tactics. We design and execute multi-channel campaigns that capture intent, nurture interest, and drive action. By continuously analyzing performance data and user behavior, we refine targeting and messaging to ensure your marketing budget is deployed efficiently.',
    approach: [
      { title: "Market & Audience Research", desc: "Identifying high-intent audience segments and evaluating competitive dynamics." },
      { title: "Campaign Architecture", desc: "Structuring ad accounts, setting up conversion tracking, and developing creative assets." },
      { title: "Optimization & Scaling", desc: "Running structured A/B tests and reallocating budget to top-performing channels." }
    ],
    faqs: [
      { q: "How do you measure campaign success?", a: "We look beyond vanity metrics, focusing on key performance indicators (KPIs) that align with your business goals, such as Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), and lead quality." },
      { q: "Do you handle both search and social ads?", a: "Yes, we manage paid search (Google/Bing Ads) for intent capture, as well as paid social (LinkedIn, Meta) for targeted demand generation." }
    ],
    motif: 'arrows'
  },
  {
    id: 'digital-marketing-advisory',
    title: 'Marketing Advisory',
    icon: <Lightbulb className="w-6 h-6 text-[#3732FE]" />,
    brief: 'Practical guidance to help a business review its marketing, identify opportunities, and decide what to focus on.',
    benefit: 'Leadership teams requiring an external, objective perspective to restructure marketing departments or validate go-to-market strategies.',
    deliverables: ['Comprehensive Marketing Audits', 'Go-To-Market (GTM) Strategy', 'Tech Stack Evaluation', 'Quarterly Growth Roadmaps'],
    expandedDescription: 'Sometimes, organizations have the internal resources to execute but lack a clear, overarching strategy. Our advisory service provides executive-level marketing guidance. We act as a sounding board and strategic partner, helping you audit your existing efforts, untangle complex technology stacks, and define a clear roadmap that prioritizes high-impact initiatives.',
    approach: [
      { title: "Deep-Dive Audit", desc: "A thorough review of your current marketing performance, team structure, and tooling." },
      { title: "Strategic Roadmap", desc: "Developing a prioritized, actionable plan aligned with quarterly and annual business objectives." },
      { title: "Ongoing Consultation", desc: "Regular advisory sessions to navigate challenges, adapt to market changes, and review progress." }
    ],
    faqs: [
      { q: "Is this service for execution or just planning?", a: "Advisory is strictly focused on strategy, planning, and high-level guidance. It is designed to empower your internal teams to execute more effectively." },
      { q: "Who typically uses this service?", a: "Founders, CEOs, and internal marketing directors who need an experienced, objective external perspective to validate or pivot their approach." }
    ],
    motif: 'sparkles'
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    icon: <Video className="w-6 h-6 text-[#3732FE]" />,
    brief: 'Video editing for social media, promotions, and other digital channels designed to capture attention.',
    benefit: 'B2B and B2C brands aiming to leverage short-form or long-form video for education, brand awareness, or direct response.',
    deliverables: ['Storyboarding & Scripting', 'Post-Production & VFX', 'Platform-Specific Formatting', 'Motion Graphics'],
    expandedDescription: 'Video is the most engaging medium on the modern web, but unpolished or poorly paced content can damage brand perception. We specialize in transforming raw footage into compelling narratives. Whether you need short-form clips optimized for social algorithms or detailed product explainers, we ensure the final cut is dynamic, on-brand, and formatted perfectly for its intended platform.',
    approach: [
      { title: "Asset Review & Storyboarding", desc: "Reviewing raw materials and mapping out the narrative arc of the final video." },
      { title: "Editing & Sound Design", desc: "Pacing the footage, applying color correction, and integrating professional audio." },
      { title: "Formatting & Delivery", desc: "Exporting optimized versions specific to platforms like YouTube, Instagram Reels, or your website." }
    ],
    faqs: [
      { q: "Do you shoot the video footage as well?", a: "This service focuses strictly on post-production and editing. You provide the raw footage or concepts, and we handle the editing, motion graphics, and finalizing." },
      { q: "Can you add subtitles and motion graphics?", a: "Yes, we implement accessibility-friendly captions, lower-thirds, and branded motion graphics to enhance engagement." }
    ],
    motif: 'play'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    icon: <PenTool className="w-6 h-6 text-[#3732FE]" />,
    brief: 'Visual assets for websites, social media, and marketing materials that ensure brand consistency.',
    benefit: 'Organizations undergoing rebranding, or those needing a highly polished visual language to match their market positioning.',
    deliverables: ['Logo & Typography Systems', 'Digital Asset Libraries', 'Print & Packaging Design', 'Brand Guidelines (Brand Book)'],
    expandedDescription: 'Visual identity is the silent ambassador of your brand. We design clean, intentional, and scalable graphic assets that communicate your values before a user reads a single word. From establishing core brand guidelines to creating daily marketing collateral, we ensure every touchpoint looks professional and reinforces your market positioning.',
    approach: [
      { title: "Visual Discovery", desc: "Exploring aesthetic directions that align with your target audience and industry standards." },
      { title: "Concept Development", desc: "Drafting initial designs and refining them based on strategic feedback." },
      { title: "Systemization", desc: "Creating final assets and documenting them in comprehensive brand guidelines." }
    ],
    faqs: [
      { q: "What is included in a Brand Guideline?", a: "Our brand books typically cover logo usage rules, typography hierarchy, primary and secondary color palettes, and visual treatment examples." },
      { q: "Do you design for print as well as digital?", a: "Yes, while our core focus is digital, we design high-quality, print-ready assets for brochures, business cards, and packaging." }
    ],
    motif: 'shapes'
  },
  {
    id: 'google-business-profile',
    title: 'Google Business Profile',
    icon: <Search className="w-6 h-6 text-[#3732FE]" />,
    brief: 'Setup and support to help keep a business’s Google profile accurate and useful to customers.',
    benefit: 'Multi-location enterprises and regional businesses relying on local foot traffic or geographically targeted leads.',
    deliverables: ['GBP Claiming & Optimization', 'Citation Building & Audits', 'Review Generation Strategy', 'Local Keyword Tracking'],
    expandedDescription: 'For businesses serving specific geographic areas, your Google Business Profile (GBP) is often more visible than your actual website. We optimize your local presence to ensure accurate information, professional presentation, and improved discoverability in local search results and Google Maps. We help manage citations, respond to reviews, and post updates to keep the profile active.',
    approach: [
      { title: "Profile Claiming & Audit", desc: "Securing ownership of your profile and auditing current information for accuracy." },
      { title: "Optimization", desc: "Structuring categories, updating business hours, and integrating optimized photography." },
      { title: "Ongoing Maintenance", desc: "Monitoring reviews, managing Q&A, and publishing regular updates to signal activity to search engines." }
    ],
    faqs: [
      { q: "Why is an optimized Google profile important?", a: "It dictates how you appear in Google Maps and local search packs. An optimized profile provides essential trust signals to users and search algorithms." },
      { q: "Can you manage profiles for multiple locations?", a: "Yes, we implement scalable strategies for businesses with multiple storefronts or service areas, ensuring consistency across all regions." }
    ],
    motif: 'pins'
  }
];

const PORTFOLIO = [
  { id: 1, name: 'E-Commerce Platform Overhaul', client: '[Client Name Placeholder]', category: 'Website', imgColor: '#E9E8FF', desc: 'A complete architectural rebuild focusing on mobile-first user experience and seamless headless commerce integration to support expanding inventory.' },
  { id: 2, name: 'B2B SaaS Lead Generation', client: '[Client Name Placeholder]', category: 'Marketing', imgColor: '#FFC333', desc: 'Omnichannel campaign designed to reach enterprise decision-makers, utilizing targeted messaging and rigorous A/B testing frameworks.' },
  { id: 3, name: 'Brand Evolution & Identity', client: '[Client Name Placeholder]', category: 'Graphic Design', imgColor: '#17156B', desc: 'Development of a cohesive visual language and brand book, helping position the organization clearly for its next phase of market expansion.' },
  { id: 4, name: 'Short-Form Video Series', client: '[Client Name Placeholder]', category: 'Video', imgColor: '#F1F1F1', desc: 'Production and editing of a social-first video series aimed at clearly communicating complex product benefits in under 60 seconds.' },
  { id: 5, name: 'Local Search Optimization', client: '[Client Name Placeholder]', category: 'Website', imgColor: '#FFF433', desc: 'Comprehensive audit and optimization of 50+ regional Google Business Profiles to ensure accurate, consistent customer information.' },
  { id: 6, name: 'Community Engagement Strategy', client: '[Client Name Placeholder]', category: 'Social Media', imgColor: '#E9E8FF', desc: 'Strategic social media planning and proactive community management designed to foster meaningful dialogue and brand loyalty.' },
];

const INSIGHTS = [
  { id: 'insight-1', title: 'Preparing for a Privacy-First Digital Landscape', category: 'Digital Strategy', date: 'October 10, 2026', brief: 'As privacy regulations tighten globally, we explore how organizations can pivot from relying on third-party data to cultivating direct, transparent relationships with their audience.' },
  { id: 'insight-2', title: 'Why Web Performance Impacts User Retention', category: 'Web Design', date: 'September 24, 2026', brief: 'An overview of how modern web architecture, accessibility, and site speed optimization play a crucial role in reducing friction and improving the overall user journey.' },
  { id: 'insight-3', title: 'Establishing Meaningful Social Media Metrics', category: 'Social Media', date: 'September 12, 2026', brief: 'Moving past vanity metrics to establish clear, strategic reporting models that connect social media activity to broader business objectives.' },
];

const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Accessible Button Component with clear focus states
const Button = ({ children, variant = 'primary', className = '', onClick, type = "button", disabled = false, "aria-label": ariaLabel }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-bold rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3732FE]/50 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  const variants = {
    primary: "bg-[#3732FE] text-white hover:bg-[#17156B] hover:shadow-lg hover:-translate-y-1",
    secondary: "bg-white text-[#1A1A1A] border-2 border-gray-100 hover:border-[#3732FE] hover:text-[#3732FE] hover:shadow-md hover:-translate-y-1",
    accent: "bg-[#FFC333] text-[#1A1A1A] hover:bg-[#FFF433] hover:shadow-lg hover:-translate-y-1",
    outline: "bg-transparent text-[#17156B] border-2 border-[#17156B] hover:bg-[#17156B] hover:text-white hover:-translate-y-1"
  };
  
  return (
    <button type={type} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }) => (
  <ScrollReveal className={`mb-12 ${centered ? 'text-center' : ''}`}>
    {subtitle && <span className="inline-block px-4 py-1 bg-[#E9E8FF] text-[#3732FE] font-bold tracking-widest uppercase text-xs rounded-full mb-4 transform -rotate-1">{subtitle}</span>}
    <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tight leading-tight">{title}</h2>
  </ScrollReveal>
);

// Collage Sticker Assets
const Sticker = ({ type, className = "" }) => {
  const baseClasses = `absolute z-20 pointer-events-none drop-shadow-md ${className}`;
  if (type === 'star') return <Star className={`${baseClasses} text-[#FFC333] fill-[#FFC333]`} />;
  if (type === 'sparkle') return <Sparkles className={`${baseClasses} text-[#3732FE]`} />;
  if (type === 'hex') return <Hexagon className={`${baseClasses} text-[#E9E8FF] fill-[#E9E8FF]`} />;
  return null;
};

// Expressive Service Background Motifs
const ServiceMotif = ({ motif }) => {
  switch (motif) {
    case 'grid': return <div className="absolute inset-0 opacity-10 pattern-grid-lg mix-blend-overlay"></div>;
    case 'bubbles': return (
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20%" cy="30%" r="40" fill="currentColor" /><circle cx="80%" cy="70%" r="60" fill="currentColor" /><circle cx="70%" cy="20%" r="20" fill="currentColor" />
      </svg>
    );
    case 'arrows': return (
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 200 L200 100 L300 150 L400 50" stroke="currentColor" strokeWidth="8" fill="none" /><path d="M380 50 L400 50 L400 70" stroke="currentColor" strokeWidth="8" fill="none" />
      </svg>
    );
    case 'sparkles': return <div className="absolute inset-0 opacity-20 pattern-dots"></div>;
    default: return <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-black to-transparent"></div>;
  }
};

const Header = ({ currentRoute, navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredShape, setHoveredShape] = useState(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Insights', path: '/insights' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
        if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const handleNav = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="z-50 relative">
      <header className={`fixed w-full top-0 md:top-6 z-[60] transition-all duration-300 px-4 sm:px-6 lg:px-8 pointer-events-none`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 gap-3 pointer-events-auto">
          
          <button 
            onClick={() => handleNav('/')}
            className="flex-shrink-0 flex items-center group bg-[#E9E8FF] h-full px-6 rounded-full shadow-sm border border-white/60 transition-transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-[#3732FE] rounded-full mr-3 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-xl text-[#17156B] tracking-tight">CreatByte</span>
          </button>

          <button role="button" className="nav-close-btn bg-[#1A1A1A] text-white h-full px-6 rounded-full flex items-center shadow-sm hover:scale-105 transition-transform overflow-hidden" onClick={toggleMenu} style={{ pointerEvents: 'auto' }}>
            <div className="menu-button-text relative h-6 w-16 mr-2 font-bold text-sm uppercase tracking-widest hidden sm:block overflow-hidden">
              <p className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${isMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}>Menu</p>
              <p className={`absolute inset-0 flex items-center justify-center text-[#FFC333] transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>Close</p>
            </div>
            <div className="icon-wrap w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-500 ease-in-out origin-center ${isMenuOpen ? 'rotate-[315deg]' : 'rotate-0'}`}>
                <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor"></path>
                <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* Pure CSS Kinetic Fullscreen Menu */}
      <section className={`fixed inset-0 z-[55] ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
          
          <nav className={`absolute top-0 right-0 w-full md:w-[600px] h-full overflow-hidden shadow-2xl transition-transform duration-[800ms] ease-[cubic-bezier(0.65,0.01,0.05,0.99)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-[120%]'}`}>
            <div className="absolute inset-0 w-full h-full z-0">
              {/* Kinetic Backdrops */}
              <div className={`absolute inset-0 bg-[#17156B] transition-transform duration-[600ms] ease-out ${isMenuOpen ? 'translate-x-0 delay-75' : 'translate-x-[101%]'}`}></div>
              <div className={`absolute inset-0 bg-[#FFC333] transition-transform duration-[600ms] ease-out ${isMenuOpen ? 'translate-x-0 delay-150' : 'translate-x-[101%]'}`}></div>
              <div className={`absolute inset-0 bg-[#FFFFFF] transition-transform duration-[600ms] ease-out ${isMenuOpen ? 'translate-x-0 delay-[225ms]' : 'translate-x-[101%]'}`}></div>

              {/* Ambient Background Shapes Container (Hover Driven) */}
              <div className="absolute inset-0 overflow-hidden z-40 opacity-40">
                {/* Shape 1 */}
                <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out transform origin-center ${hoveredShape === 1 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'}`} viewBox="0 0 400 400" fill="none">
                  <circle cx="80" cy="120" r="80" fill="rgba(55,50,254,0.15)" />
                  <circle cx="300" cy="80" r="120" fill="rgba(255,195,51,0.15)" />
                </svg>
                {/* Shape 2 */}
                <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out transform origin-center ${hoveredShape === 2 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-6'}`} viewBox="0 0 400 400" fill="none">
                  <path d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(23,21,107,0.2)" strokeWidth="60" fill="none"/>
                  <path d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(55,50,254,0.15)" strokeWidth="40" fill="none"/>
                </svg>
                {/* Shape 3 */}
                <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out transform origin-center ${hoveredShape === 3 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-6'}`} viewBox="0 0 400 400" fill="none">
                   <circle cx="150" cy="50" r="8" fill="rgba(255,195,51,0.5)" />
                   <circle cx="250" cy="50" r="8" fill="rgba(55,50,254,0.3)" />
                   <circle cx="200" cy="150" r="12" fill="rgba(23,21,107,0.25)" />
                   <circle cx="150" cy="250" r="10" fill="rgba(55,50,254,0.3)" />
                </svg>
                {/* Shape 4 */}
                <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out transform origin-center ${hoveredShape === 4 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`} viewBox="0 0 400 400" fill="none">
                  <path d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(55,50,254,0.12)" />
                  <path d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(255,195,51,0.2)" />
                </svg>
                {/* Shape 5 */}
                 <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out transform origin-center ${hoveredShape === 5 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-3'}`} viewBox="0 0 400 400" fill="none">
                  <line x1="0" y1="100" x2="300" y2="400" stroke="rgba(23,21,107,0.15)" strokeWidth="30" />
                  <line x1="100" y1="0" x2="400" y2="300" stroke="rgba(255,195,51,0.2)" strokeWidth="25" />
                </svg>
              </div>
            </div>

            <div className="relative z-50 flex flex-col justify-center h-full px-12 md:px-20 py-24">
              <span className="text-[#3732FE] font-bold uppercase tracking-widest text-xs mb-8 block">Navigation</span>
              <ul className="space-y-2">
                {navLinks.map((link, i) => {
                  const shapeId = (i % 5) + 1;
                  return (
                    <li key={link.name} className="w-full" onMouseEnter={() => setHoveredShape(shapeId)} onMouseLeave={() => setHoveredShape(null)}>
                      <button 
                        onClick={() => handleNav(link.path)}
                        className="w-full text-left block group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3732FE]/30 rounded-2xl"
                      >
                        <div className="overflow-hidden py-1">
                          {/* Staggered text reveal */}
                          <p 
                            className={`text-5xl md:text-7xl font-black text-[#1A1A1A] group-hover:text-[#3732FE] flex items-center transition-all duration-700 ease-out transform origin-top-left ${isMenuOpen ? 'translate-y-0 rotate-0 opacity-100' : 'translate-y-[140%] rotate-12 opacity-0'}`}
                            style={{ transitionDelay: isMenuOpen ? `${350 + (i * 60)}ms` : '0ms' }}
                          >
                            {link.name}
                            <ArrowRight className="w-10 h-10 ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FFC333]" />
                          </p>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
              
              <div className="mt-auto pt-12 border-t border-gray-200 overflow-hidden">
                <p 
                  className={`text-sm font-bold text-[#5F6368] transition-all duration-700 ease-out transform ${isMenuOpen ? 'translate-y-0 opacity-100 delay-[700ms]' : 'translate-y-8 opacity-0'}`}
                >
                  info@creatbyte.com <br/>
                  +91 9494796412
                </p>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
};

const Footer = ({ navigate }) => (
  <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 mt-auto rounded-t-[3rem] md:rounded-t-[4rem]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <button className="flex items-center mb-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1 -ml-1" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#3732FE] rounded-xl mr-3 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <span className="font-black text-3xl tracking-tight">CreatByte</span>
          </button>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
            A creative digital partner helping businesses build and manage their online presence with clear, professional execution.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://x.com/creatbytes" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#3732FE] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Twitter className="w-4 h-4" /></a>
            <a href="https://in.linkedin.com/company/creatbyte" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#3732FE] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Linkedin className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/ig.creatbyte/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#3732FE] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Instagram className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/p/Creatbyte-61571020475640/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#3732FE] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Facebook className="w-4 h-4" /></a>
            <a href="https://www.youtube.com/@creatbyte" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#3732FE] hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-black mb-6 text-lg tracking-wide text-white uppercase text-sm">Services</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            {SERVICES.slice(0, 5).map(service => (
              <li key={service.id}>
                <button onClick={() => navigate(`/services/${service.id}`)} className="hover:text-[#FFF433] hover:translate-x-1 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">
                  {service.title}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button onClick={() => navigate('/services')} className="hover:text-white transition-colors text-left font-bold text-[#FFC333] flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">
                Explore all services <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-6 text-lg tracking-wide text-white uppercase text-sm">Agency</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li><button onClick={() => navigate('/about')} className="hover:text-white hover:translate-x-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">About Us</button></li>
            <li><button onClick={() => navigate('/work')} className="hover:text-white hover:translate-x-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">Portfolio</button></li>
            <li><button onClick={() => navigate('/insights')} className="hover:text-white hover:translate-x-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">Insights</button></li>
            <li><button onClick={() => navigate('/contact')} className="hover:text-white hover:translate-x-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">Let's Talk</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-6 text-lg tracking-wide text-white uppercase text-sm">Contact</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li className="flex items-start group">
              <Mail className="w-5 h-5 mr-3 text-[#3732FE]" />
              <a href="mailto:info@creatbyte.com" className="hover:text-white transition-colors">info@creatbyte.com</a>
            </li>
            <li className="flex items-start group">
              <Phone className="w-5 h-5 mr-3 text-[#3732FE]" />
              <a href="tel:+919494796412" className="hover:text-white transition-colors">+91 9494796412</a>
            </li>
            <li className="flex items-start group">
              <MapPin className="w-5 h-5 mr-3 text-[#3732FE]" />
              <span>Global / Remote</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500">
        <p>&copy; {new Date().getFullYear()} CreatByte. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Privacy Policy</button>
          <button className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Terms of Service</button>
        </div>
      </div>
    </div>
  </footer>
);

const Home = ({ navigate }) => (
  <div className="pt-24 md:pt-32">
    <section className="pb-16 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid mapping perfectly to image.png layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">

          {/* Block 1: Top Left - Wireframe precisely mapped */}
          <div className="lg:col-span-7 bg-[#FFF8E7] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between border border-gray-100 shadow-sm relative group">
            <Sticker type="star" className="top-6 right-6 w-8 h-8 opacity-50 group-hover:rotate-180 transition-transform duration-1000" />
            <ScrollReveal>
              {/* Wireframe: Title */}
              <h1 className="text-5xl md:text-[5rem] font-black text-[#1A1A1A] tracking-tighter leading-[1] mb-12">
                Build a stronger <br/><span className="text-[#3732FE]">digital presence.</span>
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-6 items-stretch">
                {/* Wireframe: Thumb (Purple) */}
                <div className="w-full sm:w-40 h-40 bg-[#E9E8FF] rounded-3xl flex-shrink-0 flex items-center justify-center shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#3732FE] opacity-5 pattern-grid-lg"></div>
                  <span className="text-[#3732FE] font-black text-7xl relative z-10 transform -rotate-6">C</span>
                </div>
                
                <div className="flex flex-col gap-4 flex-1">
                  {/* Wireframe: Text (Green-ish box replaced with light gray for branding) */}
                  <div className="bg-[#F1F1F1] p-6 rounded-3xl shadow-sm border border-gray-50 flex-1 flex items-center">
                    <p className="text-[#1A1A1A] font-bold text-lg leading-snug">
                      From creating your website to managing your social media and marketing, CreatByte helps bring your brand together online.
                    </p>
                  </div>
                  
                  {/* Wireframe: Button Row (Pink/Blue placeholders mapped to primary/accent) */}
                  <div className="flex flex-wrap sm:flex-nowrap gap-3">
                    <Button onClick={() => navigate('/services')} variant="accent" className="flex-1 rounded-2xl border-none shadow-sm text-base">
                      Explore services
                    </Button>
                    <Button onClick={() => navigate('/contact')} variant="primary" className="flex-1 rounded-2xl shadow-sm text-base bg-[#3732FE]">
                      Let's talk
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Block 2: Top Right - Image Box (Blue in wireframe) */}
          <div className="lg:col-span-5 bg-[#E9E8FF] rounded-[2.5rem] rounded-bl-[5rem] p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] shadow-sm group">
             <ScrollReveal delay={100} className="w-full h-full flex items-center justify-center relative">
                <span className="absolute top-0 right-0 bg-white/50 text-[#3732FE] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest z-10 backdrop-blur-sm transform rotate-3">Visual Motif</span>
                {/* Custom Inline SVG for Hero Image Box */}
                <svg viewBox="0 0 400 400" className="w-full h-full max-w-md mx-auto drop-shadow-xl transform group-hover:scale-105 transition-transform duration-700" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="40" width="260" height="320" rx="40" fill="#17156B" className="opacity-90"/>
                  <rect x="100" y="80" width="260" height="280" rx="40" fill="#3732FE" opacity="0.9" />
                  <path d="M280 80 A 40 40 0 0 1 320 120 A 40 40 0 0 1 280 160 A 40 40 0 0 1 240 120 A 40 40 0 0 1 280 80 Z" fill="#FFC333" />
                  <rect x="130" y="140" width="120" height="12" rx="6" fill="#E9E8FF" opacity="0.8" />
                  <rect x="130" y="170" width="180" height="12" rx="6" fill="#E9E8FF" opacity="0.8" />
                  <path d="M130 260 L180 230 L220 280 L290 200" stroke="#FFC333" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
             </ScrollReveal>
          </div>

          {/* Block 3: Bottom Left - Image Box (Green in wireframe) */}
          <div className="lg:col-span-8 bg-[#17156B] rounded-[2.5rem] rounded-tr-[5rem] p-8 md:p-12 relative overflow-hidden min-h-[350px] flex flex-col md:flex-row items-center gap-8 shadow-inner group">
            <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
            <Sticker type="sparkle" className="bottom-10 left-10 w-12 h-12 opacity-30 text-white" />
            <ScrollReveal delay={200} className="relative z-10 flex-1 text-center md:text-left">
               <span className="inline-block px-3 py-1 bg-white/10 text-white font-bold tracking-widest uppercase text-xs rounded-full mb-4">Our Approach</span>
               <h3 className="text-white text-4xl lg:text-5xl font-black mb-4 leading-tight tracking-tight">Data-Driven <br/>Strategies.</h3>
            </ScrollReveal>
            <ScrollReveal delay={300} className="relative z-10 flex-1 w-full max-w-sm">
               {/* Analytics Graphic SVG */}
               <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto drop-shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-700" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="20" y="40" width="360" height="140" rx="24" fill="#FFFFFF" opacity="0.1" />
                 <rect x="60" y="100" width="40" height="60" rx="12" fill="#FFC333" />
                 <rect x="120" y="60" width="40" height="100" rx="12" fill="#3732FE" />
                 <rect x="180" y="120" width="40" height="40" rx="12" fill="#E9E8FF" />
                 <rect x="240" y="40" width="40" height="120" rx="12" fill="#FFF433" />
                 <path d="M60 90 L140 50 L200 110 L260 30 L320 80" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                 <circle cx="260" cy="30" r="8" fill="#FFFFFF" />
                 <circle cx="320" cy="80" r="8" fill="#FFFFFF" />
               </svg>
            </ScrollReveal>
          </div>

          {/* Block 4: Bottom Right - Product Box (Pink in wireframe, using Primary Navy here for cohesion) */}
          <button 
            className="lg:col-span-4 bg-[#3732FE] rounded-[2.5rem] rounded-tl-[5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden text-center min-h-[350px] group cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFC333]" 
            onClick={() => navigate('/work')}
            aria-label="View our work"
          >
            <ScrollReveal delay={400} className="w-full h-full flex flex-col items-center justify-center">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#17156B]/50 rounded-full blur-3xl"></div>
              <div className="bg-white px-8 py-10 rounded-[2rem] shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2 border border-gray-100">
                <div className="w-16 h-16 bg-[#FFC333] rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 group-hover:rotate-0 transition-transform">
                  <Star className="w-8 h-8 text-[#1A1A1A] fill-[#1A1A1A]" />
                </div>
                <span className="block text-[#1A1A1A] font-black text-2xl mb-1 tracking-tight">Our Work</span>
                <span className="block text-[#5F6368] font-bold text-sm">View portfolio</span>
              </div>
            </ScrollReveal>
          </button>

        </div>
      </div>
    </section>

    {/* Intro / Services Preview with trend-inspired "Sticker" styling */}
    <section className="py-24 bg-[#F1F1F1] rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24 relative">
      <Sticker type="hex" className="top-10 left-10 w-24 h-24 opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <SectionHeading title="Comprehensive digital support." subtitle="What We Do" />
            <ScrollReveal delay={100}>
              <p className="text-xl text-[#5F6368] mb-10 leading-relaxed font-medium">
                We act as your integrated digital partner. By bridging the gap between design, development, and marketing, we ensure your brand presents a unified, professional front across all channels.
              </p>
              <Button onClick={() => navigate('/services')} variant="secondary" className="rounded-2xl">View all services</Button>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SERVICES.slice(0, 4).map((service, idx) => (
                <ScrollReveal key={service.id} delay={idx * 100}>
                  <button 
                    className="w-full text-left p-8 h-full rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3732FE]/50 hover:-translate-y-2 relative" 
                    onClick={() => navigate(`/services/${service.id}`)}
                  >
                    <div className="w-14 h-14 bg-[#E9E8FF] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#3732FE] group-hover:scale-110 transition-all duration-300 transform -rotate-3 group-hover:rotate-0">
                      {React.cloneElement(service.icon, { className: 'w-7 h-7 text-[#3732FE] group-hover:text-white transition-colors' })}
                    </div>
                    <h3 className="text-2xl font-black text-[#1A1A1A] mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-[#5F6368] text-sm mb-6 font-medium line-clamp-2 leading-relaxed">{service.brief}</p>
                    <span className="text-[#3732FE] font-black text-sm flex items-center group-hover:translate-x-2 transition-transform">
                      Read more <ChevronRight className="w-5 h-5 ml-1" />
                    </span>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How We Work - Expressive Process layout */}
    <section className="py-24 bg-white relative overflow-hidden">
      <Sticker type="star" className="bottom-20 left-10 w-16 h-16 opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="How we work." subtitle="Our Process" centered={true} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            { step: '01', title: 'Understand', desc: 'We start by learning about your business, audience, and goals.' },
            { step: '02', title: 'Plan', desc: 'We outline a clear strategy and timeline tailored to your needs.' },
            { step: '03', title: 'Create', desc: 'Our team designs, builds, and executes the approved plan.' },
            { step: '04', title: 'Refine', desc: 'We review results and make adjustments to ensure ongoing success.' }
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 150} className="relative p-8 rounded-3xl border-2 border-[#F1F1F1] bg-white hover:border-[#3732FE] hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <span className="text-8xl font-black text-[#F1F1F1] absolute -bottom-4 -right-4 z-0 group-hover:text-[#E9E8FF] transition-colors">{item.step}</span>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-[#1A1A1A] text-white font-bold text-xs rounded-full mb-4 transform -rotate-2">STEP {item.step}</span>
                <h3 className="text-2xl font-black text-[#1A1A1A] mb-3 tracking-tight">{item.title}</h3>
                <p className="text-[#5F6368] text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ServicesOverview = ({ navigate }) => (
  <div className="pt-32">
    <section className="py-16 bg-white relative">
      <Sticker type="sparkle" className="top-10 right-20 w-12 h-12 opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
        <ScrollReveal>
          <span className="inline-block px-4 py-1 bg-[#E9E8FF] text-[#3732FE] font-bold tracking-widest uppercase text-xs rounded-full mb-6 transform -rotate-2">Capabilities</span>
          <h1 className="text-5xl md:text-[5rem] font-black text-[#1A1A1A] tracking-tighter mb-8 leading-tight">Our Services.</h1>
          <p className="text-xl text-[#5F6368] font-medium leading-relaxed max-w-2xl mx-auto">
            We provide core digital services under one roof to keep your online presence consistent, professional, and effective.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="py-24 bg-[#F1F1F1] rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ScrollReveal key={service.id} delay={(idx % 3) * 100}>
              <button 
                className="w-full text-left flex flex-col h-full p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3732FE]/50" 
                onClick={() => navigate(`/services/${service.id}`)}
              >
                <div className="w-16 h-16 bg-[#E9E8FF] rounded-[1.25rem] flex items-center justify-center mb-8 text-[#3732FE] group-hover:bg-[#3732FE] group-hover:text-white transition-all duration-300 transform -rotate-3 group-hover:rotate-0">
                  {React.cloneElement(service.icon, { className: 'w-8 h-8 opacity-100' })}
                </div>
                <h3 className="text-3xl font-black text-[#1A1A1A] mb-4 group-hover:text-[#3732FE] transition-colors tracking-tight leading-tight">{service.title}</h3>
                <p className="text-[#5F6368] mb-8 flex-grow leading-relaxed font-medium text-base">{service.brief}</p>
                <div className="pt-6 border-t border-gray-100 flex items-center text-[#1A1A1A] font-black group-hover:text-[#3732FE] transition-colors uppercase tracking-widest text-xs">
                  View details <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ServiceDetail = ({ serviceId, navigate }) => {
  const service = SERVICES.find(s => s.id === serviceId);

  if (!service) {
    return <div className="py-40 pt-56 text-center"><h1 className="text-3xl font-bold mb-4">Service not found.</h1><Button onClick={() => navigate('/services')}>Return to Services</Button></div>;
  }

  return (
    <div className="pt-32">
      <section className="bg-white pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex text-sm text-[#5F6368] mb-12 font-bold uppercase tracking-widest">
            <button onClick={() => navigate('/services')} className="hover:text-[#3732FE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3732FE] rounded px-1 -ml-1">Services</button>
            <span className="mx-3 text-gray-300">/</span>
            <span className="text-[#1A1A1A]" aria-current="page">{service.title}</span>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-block px-4 py-2 bg-[#E9E8FF] rounded-2xl mb-8 transform -rotate-3">
                 {React.cloneElement(service.icon, { className: 'w-10 h-10 text-[#3732FE]' })}
              </div>
              <h1 className="text-5xl md:text-[4.5rem] font-black text-[#1A1A1A] mb-8 leading-[1.05] tracking-tighter">{service.title}</h1>
              <p className="text-xl text-[#5F6368] mb-12 leading-relaxed font-medium">{service.brief}</p>
              <Button onClick={() => navigate('/contact')} variant="primary" className="py-4 px-8 text-lg rounded-full">Discuss this service</Button>
            </ScrollReveal>
            
            {/* Expressive Header Motif */}
            <ScrollReveal delay={200} className="hidden lg:block bg-[#17156B] rounded-[3rem] p-12 h-full min-h-[450px] relative overflow-hidden group shadow-2xl">
               <ServiceMotif motif={service.motif} />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#3732FE]/50 to-transparent mix-blend-overlay"></div>
               <div className="relative z-10 h-full flex items-center justify-center text-white opacity-90 transform group-hover:scale-110 transition-transform duration-1000">
                 {React.cloneElement(service.icon, { className: 'w-64 h-64 drop-shadow-2xl' })}
               </div>
               <span className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-md text-white font-bold tracking-widest text-xs uppercase px-4 py-2 rounded-full transform rotate-3">Service Motif</span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SEO/SXO Optimized Content Section */}
      <section className="py-24 bg-[#F1F1F1] rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24 relative overflow-hidden">
        <Sticker type="star" className="top-20 right-10 w-16 h-16 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Overview & Approach */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <h2 className="text-4xl font-black text-[#1A1A1A] mb-8 tracking-tight">Overview</h2>
                <p className="text-[#5F6368] text-lg leading-relaxed mb-16 font-medium">
                  {service.expandedDescription}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <h2 className="text-4xl font-black text-[#1A1A1A] mb-10 tracking-tight">Our Approach</h2>
                <div className="space-y-6">
                  {service.approach.map((step, idx) => (
                    <div key={idx} className="flex bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mr-6 flex-shrink-0">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#FFC333] text-[#1A1A1A] font-black text-2xl rounded-2xl transform -rotate-3">
                          {idx + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-[#1A1A1A] mb-3 tracking-tight">{step.title}</h3>
                        <p className="text-[#5F6368] leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Details & Deliverables */}
            <div className="lg:col-span-4">
              <ScrollReveal delay={200} className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm mb-8 relative">
                <span className="absolute -top-3 -right-3 bg-[#E9E8FF] text-[#3732FE] font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-sm transform rotate-6">Focus</span>
                <h3 className="text-2xl font-black text-[#1A1A1A] mb-4 tracking-tight">Who it's for</h3>
                <p className="text-[#5F6368] leading-relaxed font-medium">
                  {service.benefit}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300} className="bg-[#1A1A1A] text-white p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3732FE] rounded-bl-[4rem] opacity-20"></div>
                <h3 className="text-2xl font-black mb-8 tracking-tight relative z-10">Core Deliverables</h3>
                <ul className="space-y-5 relative z-10">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-[#FFC333] mr-4 flex-shrink-0" />
                      <span className="font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* AEO/GEO Optimized FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-16 text-center tracking-tight">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#F1F1F1] p-8 md:p-10 rounded-[2rem] border border-gray-50 hover:bg-white hover:border-[#E9E8FF] hover:shadow-lg transition-all duration-300">
                  <dt className="text-2xl font-black text-[#1A1A1A] mb-4 tracking-tight">{faq.q}</dt>
                  <dd className="text-[#5F6368] leading-relaxed font-medium text-lg">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
          
          <ScrollReveal delay={200} className="mt-24 text-center">
            <h3 className="text-3xl font-black text-[#1A1A1A] mb-8 tracking-tight">Ready to get started?</h3>
            <Button onClick={() => navigate('/contact')} variant="primary" className="py-4 px-10 text-lg">
              Tell us about your project
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

const About = ({ navigate }) => (
  <div className="pt-32">
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <ScrollReveal>
            <span className="inline-block px-4 py-1 bg-[#E9E8FF] text-[#3732FE] font-bold tracking-widest uppercase text-xs rounded-full mb-8 transform -rotate-2">About Us</span>
            <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter mb-10 text-[#1A1A1A] leading-[1.05]">Your digital partner.</h1>
            <p className="text-2xl text-[#5F6368] leading-relaxed font-medium">
              We believe having your web, creative, and marketing services in one place leads to better communication, stronger branding, and more effective results.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <section className="py-32 bg-[#1A1A1A] text-white rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
      <Sticker type="star" className="top-20 right-20 w-24 h-24 text-[#FFC333] opacity-20 transform rotate-45" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 bg-white/10 text-white font-bold tracking-widest uppercase text-xs rounded-full mb-6 transform rotate-1">How We Operate</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Our Principles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <ScrollReveal delay={100} className="bg-[#2A2A2A] rounded-[2.5rem] p-10 border border-white/10 text-center hover:bg-[#3732FE] transition-colors duration-500 group">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <ShieldCheck className="w-10 h-10 text-[#FFC333]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Clear Communication</h3>
              <p className="text-gray-400 group-hover:text-white/90 font-medium leading-relaxed transition-colors">No jargon or hidden agendas. We speak plainly about what we are doing, why we are doing it, and what you can expect.</p>
            </ScrollReveal>
             <ScrollReveal delay={200} className="bg-[#2A2A2A] rounded-[2.5rem] p-10 border border-white/10 text-center hover:bg-[#3732FE] transition-colors duration-500 group">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Layout className="w-10 h-10 text-[#FFC333]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Consistent Branding</h3>
              <p className="text-gray-400 group-hover:text-white/90 font-medium leading-relaxed transition-colors">We ensure your website, social media, and digital campaigns all look and sound like they belong to the same professional organization.</p>
            </ScrollReveal>
             <ScrollReveal delay={300} className="bg-[#2A2A2A] rounded-[2.5rem] p-10 border border-white/10 text-center hover:bg-[#3732FE] transition-colors duration-500 group">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-[#FFC333]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Client-Focused</h3>
              <p className="text-gray-400 group-hover:text-white/90 font-medium leading-relaxed transition-colors">We don't force one-size-fits-all packages. We shape our work around your specific needs, audience, and business goals.</p>
            </ScrollReveal>
        </div>
      </div>
    </section>
  </div>
);

const Work = ({ navigate }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Website', 'Social Media', 'Marketing', 'Video', 'Graphic Design'];
  const filteredPortfolio = filter === 'All' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === filter);

  return (
    <div className="pt-32">
      <section className="py-16 bg-white relative overflow-hidden">
        <Sticker type="sparkle" className="top-10 left-10 w-16 h-16 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h1 className="text-5xl md:text-[5rem] font-black text-[#1A1A1A] tracking-tighter mb-8">Our Work.</h1>
            <p className="text-xl text-[#5F6368] max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
              Explore examples of how we help businesses build and manage their online presence.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={100} className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full text-sm font-black tracking-wide uppercase transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3732FE]/50 ${
                  filter === cat 
                    ? 'bg-[#3732FE] text-white scale-105 transform -rotate-2' 
                    : 'bg-[#F1F1F1] text-[#5F6368] hover:bg-[#E9E8FF] hover:text-[#3732FE] hover:-translate-y-1'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#F1F1F1] rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((project, idx) => (
              <ScrollReveal key={`${project.id}-${filter}`} delay={(idx % 3) * 100}>
                <div className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 relative">
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-block bg-white text-[#1A1A1A] font-black uppercase tracking-widest text-[10px] px-3 py-2 rounded-full shadow-md transform rotate-3">{project.category}</span>
                  </div>
                  <div className="w-full aspect-[4/3] relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: project.imgColor }}>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <span className="absolute bottom-4 left-4 text-xs font-black opacity-30 uppercase tracking-widest text-black z-10 bg-white/20 px-2 py-1 rounded backdrop-blur-sm">Project Visual</span>
                    {/* Abstract SVG Graphic per category replacing image requests */}
                    <div className="w-3/4 h-3/4 transform group-hover:scale-110 transition-transform duration-700 ease-out flex items-center justify-center opacity-80 text-[#17156B]">
                       {project.category === 'Website' && <svg viewBox="0 0 100 100" fill="currentColor"><path d="M10 20h80v60H10zM10 35h80v2H10zM20 25h5v5h-5zM30 25h5v5h-5zM40 25h5v5h-5z"/></svg>}
                       {project.category === 'Social Media' && <svg viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="20" fill={project.imgColor}/><circle cx="20" cy="20" r="10"/></svg>}
                       {project.category === 'Marketing' && <svg viewBox="0 0 100 100" fill="currentColor"><path d="M10 90h80v5H10zM20 50h15v40H20zM42 30h15v60H42zM64 10h15v80H64z"/></svg>}
                       {project.category === 'Video' && <svg viewBox="0 0 100 100" fill="currentColor"><path d="M20 20h60v60H20zM35 35l30 15-30 15z"/></svg>}
                       {project.category === 'Graphic Design' && <svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 10l40 40-40 40-40-40 40-40zm0 20l-20 20 20 20 20-20-20-20z"/></svg>}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className="text-3xl font-black text-[#1A1A1A] mb-3 leading-tight tracking-tight group-hover:text-[#3732FE] transition-colors">{project.name}</h3>
                    <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">{project.client}</p>
                    <p className="text-[#5F6368] text-base flex-grow font-medium leading-relaxed">{project.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {filteredPortfolio.length === 0 && (
             <div className="py-20 text-center text-[#5F6368] text-xl font-bold">No placeholder projects currently listed for this category.</div>
          )}
        </div>
      </section>
    </div>
  );
};

const Insights = ({ navigate }) => (
  <div className="pt-32">
    <section className="py-16 bg-white relative">
       <Sticker type="hex" className="top-10 left-1/2 w-16 h-16 opacity-30 transform -translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mb-16 relative z-10">
          <h1 className="text-5xl md:text-[5rem] font-black text-[#1A1A1A] tracking-tighter mb-8 leading-tight">Insights.</h1>
          <p className="text-2xl text-[#5F6368] font-medium leading-relaxed">
            Perspectives, guides, and thoughts on digital strategy, design, and marketing.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="py-24 bg-[#F1F1F1] rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHTS.map((insight, idx) => (
            <ScrollReveal key={insight.id} delay={idx * 100}>
              <button 
                className="w-full text-left group flex flex-col h-full bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3732FE]/50" 
                onClick={() => navigate(`/insights/${insight.id}`)}
              >
                <div className="w-full aspect-[4/3] rounded-3xl mb-8 bg-[#17156B] flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 opacity-20 pattern-dots mix-blend-overlay"></div>
                  <Lightbulb className="w-12 h-12 text-[#FFC333] opacity-80 transform group-hover:scale-125 transition-transform duration-700" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-black opacity-40 uppercase tracking-widest text-white bg-black/20 px-2 py-1 rounded">Article Image</span>
                </div>
                <div className="flex flex-wrap items-center text-xs font-black mb-6 gap-3">
                  <span className="text-[#3732FE] uppercase tracking-widest bg-[#E9E8FF] px-3 py-1 rounded-full transform -rotate-2">{insight.category}</span>
                  <span className="text-gray-400">{insight.date}</span>
                </div>
                <h2 className="text-2xl font-black text-[#1A1A1A] mb-4 group-hover:text-[#3732FE] transition-colors leading-tight tracking-tight">{insight.title}</h2>
                <p className="text-[#5F6368] text-base mb-8 flex-grow font-medium leading-relaxed">{insight.brief}</p>
                <div className="text-[#1A1A1A] font-black text-sm flex items-center group-hover:text-[#3732FE] transition-colors uppercase tracking-widest">
                  Read article <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const InsightDetail = ({ insightId, navigate }) => {
  const insight = INSIGHTS.find(i => i.id === insightId) || INSIGHTS[0];

  return (
    <div className="pt-32">
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <ScrollReveal>
             <nav aria-label="Breadcrumb" className="flex text-sm text-[#5F6368] mb-12 font-bold uppercase tracking-widest">
              <button onClick={() => navigate('/insights')} className="hover:text-[#3732FE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3732FE] rounded px-1 -ml-1">Insights</button>
              <span className="mx-3 text-gray-300">/</span>
              <span className="text-[#1A1A1A]">{insight.category}</span>
            </nav>
            <div className="flex flex-wrap items-center text-sm mb-8 gap-4">
              <span className="font-black text-[#3732FE] uppercase tracking-widest bg-[#E9E8FF] px-4 py-1 rounded-full transform -rotate-2">{insight.category}</span>
              <span className="text-gray-400 font-bold">{insight.date}</span>
            </div>
            <h1 className="text-5xl md:text-[4rem] font-black text-[#1A1A1A] mb-8 leading-[1.05] tracking-tighter">{insight.title}</h1>
          </ScrollReveal>
        </div>
      </section>
      
      <section className="py-24 bg-[#F1F1F1] rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={100}>
            {/* Header Image Placeholder */}
            <div className="w-full aspect-[21/9] rounded-[2.5rem] bg-[#17156B] flex items-center justify-center mb-16 relative overflow-hidden shadow-xl">
               <div className="absolute w-full h-full bg-gradient-to-r from-[#3732FE]/50 to-transparent mix-blend-overlay"></div>
               <div className="absolute inset-0 opacity-20 pattern-dots"></div>
               <Lightbulb className="w-20 h-20 text-[#FFC333] relative z-10" />
               <span className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md text-white font-bold tracking-widest text-xs uppercase px-4 py-2 rounded-full transform rotate-2">Header Image Placeholder</span>
            </div>
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-[#5F6368] font-medium leading-relaxed">
              <p className="text-2xl text-[#1A1A1A] mb-12 font-bold leading-relaxed tracking-tight">
                {insight.brief} Here is a structured look at how we approach this topic conceptually.
              </p>
              
              <h2 className="text-3xl font-black mt-16 mb-8 text-[#1A1A1A] tracking-tight">Understanding the Core Issue</h2>
              <p className="mb-8">
                [Article Body Placeholder] This section would contain detailed paragraphs explaining the central theme of the article. It breaks down industry trends conceptually without making unsupported claims, promising specific metrics, or inventing fictional case studies.
              </p>
              <p className="mb-8">
                The modern digital landscape requires organizations to adapt quickly. We focus on building resilient strategies that prioritize clear communication, structured methodology, and adaptability across various platforms and channels.
              </p>
              
              <blockquote className="border-l-8 border-[#3732FE] pl-8 my-16 text-2xl text-[#17156B] bg-white shadow-md py-10 pr-10 rounded-3xl rounded-l-none font-bold tracking-tight relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E8FF] rounded-bl-full opacity-50"></div>
                "[Quote Placeholder] A strong, relevant quote from the agency leadership reinforcing the core message of the insight."
              </blockquote>
              
              <h3 className="text-2xl font-black mt-16 mb-6 text-[#1A1A1A] tracking-tight">Practical Takeaways</h3>
              <ul className="space-y-4 mb-12 list-none pl-0">
                <li className="flex items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-50"><span className="text-[#3732FE] font-black mr-4 bg-[#E9E8FF] px-2 py-0.5 rounded">1</span> <span className="pt-0.5">[List Item Placeholder] Review your current approach to this channel.</span></li>
                <li className="flex items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-50"><span className="text-[#3732FE] font-black mr-4 bg-[#E9E8FF] px-2 py-0.5 rounded">2</span> <span className="pt-0.5">[List Item Placeholder] Ensure consistency across all related digital assets.</span></li>
                <li className="flex items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-50"><span className="text-[#3732FE] font-black mr-4 bg-[#E9E8FF] px-2 py-0.5 rounded">3</span> <span className="pt-0.5">[List Item Placeholder] Align your metrics with actual business goals.</span></li>
              </ul>
              
              <p className="mb-12">
                [Conclusion Placeholder] Summarize the article and invite the reader to consider how these principles apply to their own business.
              </p>
            </div>
            
            <div className="mt-20 p-12 bg-white rounded-[3rem] text-center shadow-xl border border-gray-100 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFC333] rounded-full opacity-20"></div>
               <h4 className="text-3xl font-black text-[#1A1A1A] mb-8 tracking-tight relative z-10">Want to discuss your strategy?</h4>
               <Button onClick={() => navigate('/contact')} className="px-10 py-4 text-lg relative z-10 shadow-lg">Let's talk</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Application-Layer Rate Limiting (Anti-Spam)
  useEffect(() => {
    let interval = null;
    if (lockoutTimer > 0) {
      interval = setInterval(() => setLockoutTimer(prev => prev - 1), 1000);
    } else if (lockoutTimer === 0 && formStatus === 'locked') {
      setFormStatus('idle');
      setSubmitAttempts(0);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer, formStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitAttempts >= 2) {
      setFormStatus('locked');
      setLockoutTimer(15);
      return;
    }
    setSubmitAttempts(prev => prev + 1);
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="pt-32">
      <section className="py-16 bg-white relative">
        <Sticker type="star" className="top-10 left-10 w-12 h-12 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h1 className="text-5xl md:text-[4.5rem] font-black text-[#1A1A1A] tracking-tighter mb-8 leading-[1.05]">Tell us about <br/><span className="text-[#3732FE]">your project.</span></h1>
                <p className="text-xl text-[#5F6368] mb-12 font-medium leading-relaxed">
                  Briefly describe what you need help with. We'll review your information and get back to you to discuss the details.
                </p>
                
                <div className="space-y-6 bg-[#F1F1F1] p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative">
                  <span className="absolute -top-3 -right-3 bg-[#17156B] text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-sm transform rotate-6">Contact Info</span>
                  
                  <div className="flex items-center group">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mr-5 group-hover:bg-[#E9E8FF] group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-6 h-6 text-[#3732FE]" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#1A1A1A] text-sm tracking-wide uppercase">Email</h4>
                      <p className="text-[#5F6368] font-medium text-base mt-1">info@creatbyte.com</p>
                    </div>
                  </div>
                  <div className="flex items-center group">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mr-5 group-hover:bg-[#E9E8FF] group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-6 h-6 text-[#3732FE]" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#1A1A1A] text-sm tracking-wide uppercase">Phone</h4>
                      <p className="text-[#5F6368] font-medium text-base mt-1">+91 9494796412</p>
                    </div>
                  </div>
                  <div className="flex items-center group">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mr-5 group-hover:bg-[#E9E8FF] group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-[#3732FE]" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#1A1A1A] text-sm tracking-wide uppercase">Location</h4>
                      <p className="text-[#5F6368] font-medium text-base mt-1">Global / Remote</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-start text-xs text-gray-500 bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
                  <ShieldAlert className="w-6 h-6 mr-4 flex-shrink-0 text-gray-400" />
                  <p className="font-medium"><strong>Architecture Note:</strong> Client-side rate limiting is active here. In a true WordPress production environment, this form integrates with backend nonces and edge-level WAF rules (e.g., Cloudflare) for robust DDoS security.</p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal delay={100} className="h-full">
                {formStatus === 'success' ? (
                  <div className="bg-[#E9E8FF] p-12 rounded-[3rem] text-center h-full flex flex-col justify-center items-center shadow-inner border border-white/50">
                    <div className="w-24 h-24 bg-[#3732FE] text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-xl transform -rotate-3 animate-pulse">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-4xl font-black text-[#1A1A1A] mb-4 tracking-tight">Message Sent.</h3>
                    <p className="text-[#1A1A1A] font-medium text-lg max-w-md">Thank you for reaching out. We will review your project details and contact you shortly.</p>
                    <Button onClick={() => setFormStatus('idle')} variant="secondary" className="mt-8 bg-white/80 backdrop-blur">Send another message</Button>
                  </div>
                ) : formStatus === 'locked' ? (
                  <div className="bg-red-50 p-12 rounded-[3rem] text-center h-full flex flex-col justify-center items-center border border-red-200 shadow-inner">
                    <div className="w-24 h-24 bg-red-100 text-red-600 rounded-[2rem] flex items-center justify-center mb-8 transform rotate-3">
                      <ShieldAlert className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-black text-red-900 mb-4 tracking-tight">Security Pause</h3>
                    <p className="text-red-800 font-medium text-lg mb-8 max-w-md">Too many rapid submissions detected. Anti-spam protection is temporarily active to ensure service quality.</p>
                    <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-red-100">
                      <p className="font-mono text-xl font-black text-red-600">Please wait {lockoutTimer}s</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden group">
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E9E8FF] rounded-full blur-3xl opacity-50 z-0"></div>
                    <div className="space-y-6 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-black text-[#1A1A1A] mb-3 uppercase tracking-wider">Name *</label>
                          <input required type="text" id="name" className="w-full px-5 py-4 rounded-2xl border-2 border-[#F1F1F1] focus:ring-4 focus:ring-[#E9E8FF] focus:border-[#3732FE] outline-none transition-all bg-[#F1F1F1] hover:bg-white font-medium" placeholder="Jane Doe" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-black text-[#1A1A1A] mb-3 uppercase tracking-wider">Email *</label>
                          <input required type="email" id="email" className="w-full px-5 py-4 rounded-2xl border-2 border-[#F1F1F1] focus:ring-4 focus:ring-[#E9E8FF] focus:border-[#3732FE] outline-none transition-all bg-[#F1F1F1] hover:bg-white font-medium" placeholder="jane@example.com" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="business" className="block text-sm font-black text-[#1A1A1A] mb-3 uppercase tracking-wider">Business Name (Optional)</label>
                        <input type="text" id="business" className="w-full px-5 py-4 rounded-2xl border-2 border-[#F1F1F1] focus:ring-4 focus:ring-[#E9E8FF] focus:border-[#3732FE] outline-none transition-all bg-[#F1F1F1] hover:bg-white font-medium" placeholder="Acme Corp" />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-black text-[#1A1A1A] mb-3 uppercase tracking-wider">Service Needed *</label>
                        {/* Accessible Select component, defaultValue handles initial state in React */}
                        <select required id="service" defaultValue="" className="w-full px-5 py-4 rounded-2xl border-2 border-[#F1F1F1] focus:ring-4 focus:ring-[#E9E8FF] focus:border-[#3732FE] outline-none transition-all bg-[#F1F1F1] hover:bg-white font-medium cursor-pointer appearance-none">
                          <option value="" disabled>Select an option...</option>
                          {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                          <option value="not-sure">Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-black text-[#1A1A1A] mb-3 uppercase tracking-wider">Message *</label>
                        <textarea required id="message" rows="5" className="w-full px-5 py-4 rounded-2xl border-2 border-[#F1F1F1] focus:ring-4 focus:ring-[#E9E8FF] focus:border-[#3732FE] outline-none transition-all bg-[#F1F1F1] hover:bg-white resize-none font-medium" placeholder="How can we help?"></textarea>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" variant="primary" className="w-full py-5 text-xl shadow-xl shadow-[#3732FE]/20" disabled={formStatus === 'submitting'}>
                          {formStatus === 'submitting' ? 'Sending securely...' : 'Send Message'}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [route, setRoute] = useState('/');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  // Simple Router
  const renderPage = () => {
    if (route === '/') return <Home navigate={setRoute} />;
    if (route === '/services') return <ServicesOverview navigate={setRoute} />;
    if (route.startsWith('/services/')) {
      const id = route.split('/')[2];
      return <ServiceDetail serviceId={id} navigate={setRoute} />;
    }
    if (route === '/about') return <About navigate={setRoute} />;
    if (route === '/work') return <Work navigate={setRoute} />;
    if (route === '/contact') return <Contact />;
    if (route === '/insights') return <Insights navigate={setRoute} />;
    if (route.startsWith('/insights/')) {
       const id = route.split('/')[2];
       return <InsightDetail insightId={id} navigate={setRoute} />;
    }
    return <Home navigate={setRoute} />;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#FFC333] selection:text-[#1A1A1A] overflow-x-hidden">
      
      <Header currentRoute={route} navigate={setRoute} />
      
      <main className="flex-grow focus-visible:outline-none" tabIndex="-1">
        {renderPage()}
      </main>
      
      <Footer navigate={setRoute} />
      
      {/* Utility Styles for Background Motifs and Typography */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        
        /* Fast, hardware-accelerated patterns */
        .pattern-grid-lg {
          background-image: linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .pattern-dots {
          background-image: radial-gradient(currentColor 2px, transparent 2px);
          background-size: 24px 24px;
        }

        /* Focus state visibility helper for accessibility */
        *:focus:not(:focus-visible) {
          outline: none !important;
          box-shadow: none !important;
        }

        /* Kinetic Menu Specific Styles */
        .bg-shape.active {
          opacity: 1 !important;
          z-index: 45;
        }
      `}} />
    </div>
  );
}