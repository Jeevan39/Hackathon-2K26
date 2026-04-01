import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  Terminal, 
  Users, 
  Construction, 
  Bolt, 
  Brain, 
  Cloud, 
  Shield, 
  Leaf, 
  Lightbulb, 
  Trophy, 
  ChevronDown,
  Download,
  FileText,
  Phone,
  Menu,
  X,
  Twitter,
  Github,
  Linkedin,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 24,
    hours: 12,
    minutes: 45,
    seconds: 8
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-16">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, i) => (
        <motion.div 
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center glass-card p-4 rounded-xl border border-white/5"
        >
          <span className="text-3xl font-headline font-bold text-primary">
            {item.value.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] font-label text-neutral-500 uppercase tracking-widest">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Tracks', 'Timeline', 'Prizes'];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/80 backdrop-blur-xl py-3 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'bg-transparent py-6'}`}>
      <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Rocket className="text-primary w-6 h-6" />
          <span className="text-xl font-black text-primary tracking-tighter font-headline">HACKATHON-2K26</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-neutral-400 font-label text-xs uppercase tracking-widest hover:text-primary transition-all duration-300"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-2 bg-primary text-on-primary rounded-full font-label text-[10px] font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(143,245,255,0.4)] transition-all">
            REGISTER
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-2xl border-b border-white/10 py-8 px-6 md:hidden flex flex-col gap-6 items-center"
          >
            {navItems.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-400 font-label text-sm uppercase tracking-[0.2em] hover:text-primary transition-all"
              >
                {item}
              </a>
            ))}
            <button className="w-full py-4 bg-primary text-on-primary rounded-full font-label text-xs font-bold tracking-widest uppercase">
              REGISTER NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="glass-card p-8 rounded-2xl border border-white/5 cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-headline font-semibold">{question}</h4>
        <ChevronDown className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 text-neutral-500 leading-relaxed overflow-hidden"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

interface Leader {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  image: string;
}

const LeaderCard: React.FC<{ leader: Leader }> = ({ leader }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <motion.div 
      className={`flex-none w-[280px] sm:w-80 h-[400px] sm:h-96 cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 relative ${
        isHighlighted ? 'border-primary ring-4 ring-primary/20 scale-105 z-10' : 'border-white/10'
      }`}
      onClick={() => setIsHighlighted(!isHighlighted)}
      whileHover={{ y: -10 }}
    >
      <img 
        className="w-full h-full object-cover" 
        src={leader.image} 
        alt={leader.name}
        referrerPolicy="no-referrer"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-80'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div
            animate={{ y: isHighlighted ? 0 : 10 }}
            className="space-y-2"
          >
            <h4 className="text-2xl font-headline font-bold text-white">{leader.name}</h4>
            <p className="text-primary font-label text-xs tracking-widest uppercase">Event Organizer</p>
            
            <AnimatePresence>
              {isHighlighted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t border-white/10 mt-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <p className="text-primary font-label text-sm tracking-tight">{leader.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <p className="text-primary font-label text-sm tracking-tight break-all">{leader.email}</p>
                  </div>
                  <a 
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                    <p className="text-neutral-400 font-label text-xs uppercase tracking-widest">LinkedIn Profile</p>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {!isHighlighted && (
        <div className="absolute top-4 right-4">
          <div className="bg-primary/20 backdrop-blur-md border border-primary/30 p-2 rounded-full">
            <Users className="w-4 h-4 text-primary" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const LoadingScreen = ({ progress }: { progress: number, key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md space-y-8 text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-12"
        >
          <Rocket className="w-16 h-16 text-primary" />
        </motion.div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-headline font-black text-primary tracking-tighter">INITIALIZING...</h2>
            <span className="text-primary font-mono text-sm">{Math.round(progress)}%</span>
          </div>
          
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className="h-full bg-primary shadow-[0_0_15px_rgba(143,245,255,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
        
        <p className="text-neutral-500 font-label text-[10px] uppercase tracking-[0.4em] animate-pulse">
          Establishing secure connection to HACK-2K26
        </p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const leaders = [
    { 
      name: "Alex Rivera", 
      email: "alex.rivera@hack2k26.com", 
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com",
      image: "https://picsum.photos/seed/leader1/400/500" 
    },
    { 
      name: "Sarah Chen", 
      email: "sarah.chen@hack2k26.com", 
      phone: "+1 (555) 234-5678",
      linkedin: "https://linkedin.com",
      image: "https://picsum.photos/seed/leader2/400/500" 
    },
    { 
      name: "Marcus Thorne", 
      email: "marcus.thorne@hack2k26.com", 
      phone: "+1 (555) 345-6789",
      linkedin: "https://linkedin.com",
      image: "https://picsum.photos/seed/leader3/400/500" 
    },
    { 
      name: "Elena Vance", 
      email: "elena.vance@hack2k26.com", 
      phone: "+1 (555) 456-7890",
      linkedin: "https://linkedin.com",
      image: "https://picsum.photos/seed/leader4/400/500" 
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" progress={loadingProgress} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />

            <main>
              {/* Hero Section */}
              <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-surface-container-lowest aurora-bg">
          <div className="container mx-auto px-6 text-center z-10">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-label text-xs tracking-[0.2em] mb-8 animate-pulse"
            >
              SYSTEM ONLINE v2.026
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-headline font-extrabold tracking-tight mb-6 leading-tight text-glow break-words"
            >
              HACKATHON<span className="text-primary">-2K26</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-body text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Code. Create. Conquer. Join the elite ranks of innovators in the most immersive 24-hour sprint of the decade.
            </motion.p>
            
            <CountdownTimer />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <button className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary rounded-full font-headline font-bold tracking-tight text-lg hover:shadow-[0_0_30px_rgba(143,245,255,0.3)] transition-all flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Register Now
              </button>
              <button className="w-full md:w-auto px-10 py-4 border border-white/10 text-white rounded-full font-headline font-bold tracking-tight text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Brochure
              </button>
            </motion.div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ChevronDown className="text-primary w-8 h-8" />
          </div>
        </section>

        {/* About Section */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-surface-container-low"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-24 text-center">
              <span className="text-primary font-label text-xs tracking-widest uppercase mb-4">Discovery</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">The Blueprint</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Terminal, color: 'text-primary', title: 'What it is', desc: 'HACKATHON-2K26 is a premium innovation sandbox where 500+ developers, designers, and visionaries converge to solve planetary-scale challenges.' },
                { icon: Users, color: 'text-secondary', title: 'Who can join', desc: 'Whether you\'re a seasoned CTO or a student prodigy, if you have a vision and the grit to build it in 24 hours, you belong here.' },
                { icon: Construction, color: 'text-tertiary', title: 'What to build', desc: 'Prototypes that matter. From AI-driven healthcare solutions to decentralized finance protocols, we provide the resources; you provide the brilliance.' },
                { icon: Bolt, color: 'text-error', title: 'Why it\'s exciting', desc: 'Direct mentorship from industry leaders, a $50k prize pool, and the chance to showcase your work to top-tier VC firms and tech giants.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass-card p-12 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <item.icon className={`w-12 h-12 ${item.color} mb-6`} />
                  <h3 className="text-2xl font-headline font-bold mb-4">{item.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Tracks Section */}
        <motion.section 
          id="tracks" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-surface"
        >
          <div className="container mx-auto px-6">
            <div className="mb-24">
              <span className="text-secondary font-label text-xs tracking-widest uppercase mb-4">Verticals</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Innovation Tracks</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[
                { icon: Brain, color: 'text-primary', title: 'AI & Intelligence', desc: 'LLMs, Computer Vision, and Predictive Analytics.' },
                { icon: Cloud, color: 'text-secondary', title: 'Web3 & De-Fi', desc: 'Smart contracts and peer-to-peer ecosystems.' },
                { icon: Shield, color: 'text-error', title: 'Cyber Security', desc: 'Privacy, encryption, and threat prevention.' },
                { icon: Leaf, color: 'text-tertiary', title: 'Eco-Innovation', desc: 'Green tech and carbon-neutral solutions.' },
                { icon: Lightbulb, color: 'text-white', title: 'Open Innovation', desc: 'Wildcards and boundary-pushing concepts.' }
              ].map((track, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl glass-card border border-white/5 p-8 transition-all hover:shadow-[0_20px_40px_rgba(143,245,255,0.1)]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${track.color.replace('text-', 'from-')}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <track.icon className={`${track.color} w-12 h-12 mb-6`} />
                  <h4 className="text-xl font-headline font-bold mb-2">{track.title}</h4>
                  <p className="text-sm text-neutral-500">{track.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section 
          id="timeline" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-surface-container-low"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Event Timeline</h2>
              <p className="text-neutral-500 font-label tracking-widest">24 HOURS OF INTENSITY</p>
            </div>
            <div className="max-w-3xl mx-auto relative">
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-secondary via-primary to-transparent" />
              <div className="space-y-16 md:space-y-24">
                {[
                  { time: '09:00 AM | OCT 12', title: 'Registration & Opening', desc: 'Check-in, welcome kit distribution, and the grand opening ceremony at the Main Hall.', color: 'bg-secondary' },
                  { time: '11:00 AM | OCT 12', title: 'Hacking Commences', desc: 'The clock starts ticking. Mentors begin their rounds as teams dive into development.', color: 'bg-primary' },
                  { time: '01:30 PM | OCT 12', title: 'Lunch & Networking', desc: 'Fuel up and connect with fellow hackers and sponsors in the dining area.', color: 'bg-tertiary' },
                  { time: '04:00 PM | OCT 12', title: 'Technical Workshop', desc: 'Deep dive into advanced AI and Web3 integration techniques with our lead engineers.', color: 'bg-secondary' },
                  { time: '08:00 PM | OCT 12', title: 'Dinner & Lightning Talks', desc: 'Quick-fire presentations from sponsors and a hearty dinner to keep the momentum going.', color: 'bg-primary' },
                  { time: '10:00 PM | OCT 12', title: 'Midnight Mentorship', desc: 'Special session with industry veterans for late-night pivots and architecture reviews.', color: 'bg-tertiary' },
                  { time: '02:00 AM | OCT 13', title: 'Midnight Snack & Gaming', desc: 'Take a break with snacks and quick gaming rounds to recharge your creative energy.', color: 'bg-secondary' },
                  { time: '08:00 AM | OCT 13', title: 'Breakfast & Pitch Prep', desc: 'Morning fuel and final polish on your presentations with pitch coaches.', color: 'bg-primary' },
                  { time: '11:00 AM | OCT 13', title: 'Final Submission', desc: 'GitHub links locked. Preparation for the ultimate pitch battle begins.', color: 'bg-error' },
                  { time: '02:00 PM | OCT 13', title: 'Demo Day & Awards', desc: 'Showcase your prototype to the judges and celebrate the winners of HACK-2K26.', color: 'bg-secondary' }
                ].map((event, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-12 md:pl-24 group"
                  >
                    <div className={`absolute left-2 md:left-6 top-2 w-4 h-4 rounded-full ${event.color} shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 transition-transform group-hover:scale-125`} />
                    <span className={`text-xs font-label ${event.color.replace('bg-', 'text-')} mb-2 block`}>{event.time}</span>
                    <h3 className="text-2xl font-headline font-bold mb-2">{event.title}</h3>
                    <p className="text-on-surface-variant">{event.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Prizes Section */}
        <motion.section 
          id="prizes" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-surface"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">The Spoils</h2>
              <p className="text-primary font-label tracking-widest">TOTAL PRIZE POOL $50,000</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:items-end max-w-5xl mx-auto">
              {/* 2nd Place */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="order-2 md:order-1 glass-card p-8 sm:p-10 rounded-3xl border border-white/5 text-center transition-all hover:bg-white/10"
              >
                <Trophy className="w-12 sm:w-16 h-12 sm:h-16 text-slate-400 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-headline font-bold mb-2">Runner Up</h3>
                <p className="text-3xl sm:text-4xl font-headline font-black text-slate-400 mb-6">$15,000</p>
                <p className="text-xs sm:text-sm text-neutral-500">Cloud credits, hardware kits, and certificate of excellence.</p>
              </motion.div>
              {/* 1st Place */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="order-1 md:order-2 glass-card p-10 sm:p-12 rounded-3xl border-2 border-primary/30 text-center shadow-[0_0_60px_rgba(143,245,255,0.15)] relative md:-top-12"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-1 rounded-full text-[10px] sm:text-xs font-label font-bold tracking-[0.2em]">CHAMPION</div>
                <Trophy className="w-16 sm:w-20 h-16 sm:h-20 text-primary mx-auto mb-6" />
                <h3 className="text-2xl sm:text-3xl font-headline font-bold mb-2">Overall Winner</h3>
                <p className="text-5xl sm:text-6xl font-headline font-black text-primary mb-6">$25,000</p>
                <p className="text-xs sm:text-sm text-neutral-300">Seed funding opportunity, exclusive networking dinner, and the HACK-2K26 Trophy.</p>
              </motion.div>
              {/* 3rd Place */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="order-3 md:order-3 glass-card p-8 sm:p-10 rounded-3xl border border-white/5 text-center transition-all hover:bg-white/10"
              >
                <Trophy className="w-12 sm:w-16 h-12 sm:h-16 text-amber-700 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-headline font-bold mb-2">Third Place</h3>
                <p className="text-3xl sm:text-4xl font-headline font-black text-amber-700 mb-6">$10,000</p>
                <p className="text-xs sm:text-sm text-neutral-500">Subscription bundle, exclusive swag kits, and internships.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Leaders Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-surface-container-low overflow-hidden"
        >
          <div className="container mx-auto px-6 mb-12 text-center">
            <h2 className="text-4xl font-headline font-bold mb-4">Meet Our Leaders</h2>
          </div>
          <div className="flex gap-6 px-6 overflow-x-auto pb-8 no-scrollbar md:justify-center snap-x snap-mandatory">
            {leaders.map((leader, i) => (
              <div key={i} className="snap-center">
                <LeaderCard leader={leader} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-surface-container-low"
        >
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-headline font-bold mb-16 text-center">Frequently Asked</h2>
            <div className="space-y-4">
              <FAQItem 
                question="Is there a registration fee?" 
                answer="Participation is completely free of charge. We cover meals, snacks, and provide a premium workspace for all selected participants." 
              />
              <FAQItem 
                question="What is the team size limit?" 
                answer="Teams can consist of 2 to 4 members. Individual applicants will be assisted in team formation during the opening ceremony." 
              />
              <FAQItem 
                question="Can I participate remotely?" 
                answer="HACKATHON-2K26 is an in-person event to ensure the best collaborative experience. Travel grants are available for exceptional international applicants." 
              />
            </div>
          </div>
        </motion.section>

        {/* Sponsors Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6 text-center">
            <p className="text-neutral-500 font-label tracking-[0.3em] uppercase mb-12">Powered By</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50">
              {['TECH-CORE', 'NEXUS.IO', 'AURORA', 'KINETIC'].map((sponsor) => (
                <div key={sponsor} className="text-3xl font-headline font-black tracking-tighter hover:text-primary hover:opacity-100 transition-all cursor-pointer">
                  {sponsor}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 w-full py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-lg font-bold text-primary font-headline tracking-tighter">HACKATHON-2K26</div>
            <p className="font-label text-[10px] tracking-widest text-neutral-600 uppercase text-center md:text-left">
              © 2026 HACKATHON-2K26. THE NEON OBSERVATORY.
            </p>
          </div>
          <div className="flex gap-8">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: MessageSquare, label: 'Discord' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Github, label: 'GitHub' }
            ].map((social) => (
              <a key={social.label} href="#" className="text-neutral-600 hover:text-primary transition-colors flex items-center gap-2 font-label text-[10px] tracking-widest uppercase">
                <social.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>

            {/* FAB for Mobile */}
            <div className="fixed bottom-8 right-8 z-[100] md:hidden">
              <button className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center animate-pulse">
                <Bolt className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
