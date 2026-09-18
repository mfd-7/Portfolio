import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Mail, User, Star, Menu, X, Terminal, Shield, Plus, Trash2, Lock, LogOut } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Engineering Solutions',
    description: 'Enterprise platform for fire safety and industrial systems with real-time 3D simulations.',
    tech_stack: 'React 19, Django REST, Three.js, HTML5 Canvas',
    live_link: 'https://engineering-solutions-puce.vercel.app/'
  },
  {
    id: 2,
    title: 'Cyber Threat Tracker',
    description: 'Real-time intrusion monitoring tool with a decoy Honeypot backend and ML classification.',
    tech_stack: 'Python, Flask, MySQL, scikit-learn, Chart.js',
    github_link: 'https://github.com/mfd-7/cyber-threat-tracker.git'
  }
];

function App() {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('mfd_portfolio_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: 5, message: '' });
  const [status, setStatus] = useState(null);

  // Admin Panel States
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('mfd_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_link: '',
    live_link: ''
  });

  // Save projects to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('mfd_portfolio_projects', JSON.stringify(projects));
    } catch {
      // Ignore if localStorage is restricted
    }
  }, [projects]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === 'mfd7' && adminPassword === 'probro@3570') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('mfd_admin_auth', 'true');
      } catch {
        // Fallback
      }
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('mfd_admin_auth');
    } catch {
      // Fallback
    }
    setShowAdminModal(false);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description || !newProject.tech_stack) return;

    const created = {
      ...newProject,
      id: Date.now()
    };

    setProjects([created, ...projects]);
    setNewProject({
      title: '',
      description: '',
      tech_stack: '',
      github_link: '',
      live_link: ''
    });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'b9ec3849-5a1e-4503-be8e-7e9b0683a54b',
          name: feedback.name,
          email: feedback.email,
          rating: `${feedback.rating} / 5 Stars`,
          message: feedback.message,
          subject: `Portfolio Feedback & Collab Request from ${feedback.name}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFeedback({ name: '', email: '', rating: 5, message: '' });
        setTimeout(() => setStatus(null), 4000);
      } else {
        window.location.href = `mailto:muhtasimfuad3570@gmail.com?subject=Collab Request from ${feedback.name}&body=Rating: ${feedback.rating}/5%0D%0A%0D%0A${feedback.message}`;
        setStatus('success');
      }
    } catch {
      window.location.href = `mailto:muhtasimfuad3570@gmail.com?subject=Collab Request from ${feedback.name}&body=Rating: ${feedback.rating}/5%0D%0A%0D%0A${feedback.message}`;
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#030303] to-[#030303]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b-0 border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="text-[#00F3FF]" />
            <span className="font-['Orbitron'] font-bold text-xl tracking-wider text-white">MFD<span className="text-[#00F3FF]">.</span>7</span>
          </div>
          
          <div className="hidden md:flex gap-8 font-semibold tracking-widest text-sm text-gray-300">
            <a href="#home" className="hover:text-[#00F3FF] transition-colors">HOME</a>
            <a href="#about" className="hover:text-[#00F3FF] transition-colors">ABOUT</a>
            <a href="#projects" className="hover:text-[#00F3FF] transition-colors">WORK</a>
            <a href="#contact" className="hover:text-[#00F3FF] transition-colors">CONTACT</a>
            <button 
              onClick={() => setShowAdminModal(true)}
              className="text-xs px-3 py-1 border border-[#00F3FF]/40 rounded text-[#00F3FF] hover:bg-[#00F3FF]/10 transition-all flex items-center gap-1.5"
            >
              <Lock size={12} /> {isAuthenticated ? 'ADMIN PANEL' : 'ADMIN'}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={() => setShowAdminModal(true)}
              className="text-xs px-2.5 py-1 border border-[#00F3FF]/40 rounded text-[#00F3FF]"
            >
              <Lock size={12} />
            </button>
            <button className="text-[#00F3FF]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass px-6 py-4 flex flex-col gap-4 text-sm font-semibold tracking-widest">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00F3FF]">HOME</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00F3FF]">ABOUT</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00F3FF]">WORK</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00F3FF]">CONTACT</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F3FF]/30 bg-[#00F3FF]/10 text-[#00F3FF] text-xs font-bold tracking-widest mb-6">
              <Shield size={14} /> SECURITY SPECIALIST
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-['Orbitron'] mb-6 leading-tight">
              MD. MUHTASIM <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-blue-500 glitch-text">FUAD</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed border-l-2 border-[#00F3FF] pl-4">
              Transforming ideas into secure digital experiences. Full-Stack Developer specializing in Python, React, and Application Security.
            </p>
            <div className="flex gap-4 mb-8">
              <a href="#contact" className="px-8 py-3 bg-[#00F3FF]/10 border border-[#00F3FF] text-[#00F3FF] font-bold hover:bg-[#00F3FF] hover:text-black transition-all rounded">
                HIRE ME
              </a>
              <a href="#projects" className="px-8 py-3 border border-white/20 hover:border-white transition-all rounded">
                VIEW WORK
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#00F3FF]/20 blur-[100px] rounded-full"></div>
            <img 
              src="/profile.png" 
              alt="Md. Muhtasim Fuad" 
              className="relative z-10 w-full max-w-md mx-auto drop-shadow-[0_0_30px_rgba(0,243,255,0.3)] filter contrast-125"
            />
            <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-[#00F3FF] opacity-50"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-[#00F3FF] opacity-50"></div>
          </motion.div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="py-20 px-6 bg-black/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-['Orbitron'] font-bold">CORE <span className="text-[#00F3FF]">DATA</span></h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00F3FF]/50 to-transparent"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Education */}
            <div>
              <h3 className="text-xl font-bold mb-8 text-gray-300 flex items-center gap-2"><User className="text-[#00F3FF]"/> EDUCATION LOG</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#00F3FF]/20 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-[#00F3FF] bg-[#00F3FF]/20 group-[.is-active]:bg-[#00F3FF] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] glass p-6 rounded-lg ml-4 md:ml-0">
                    <h4 className="font-bold text-[#00F3FF]">B.Sc in Computer Science and Engineering</h4>
                    <p className="text-sm text-gray-400 mb-2">BRAC UNIVERSITY (On Going)</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-[#00F3FF] bg-[#00F3FF]/20 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] glass p-6 rounded-lg ml-4 md:ml-0">
                    <h4 className="font-bold text-[#00F3FF]">HSC</h4>
                    <p className="text-sm text-gray-400 mb-2">CANTONMENT COLLEGE, JASHORE</p>
                    <p className="text-xs text-gray-500">GPA: 5.00 (2022)</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-[#00F3FF] bg-[#00F3FF]/20 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] glass p-6 rounded-lg ml-4 md:ml-0">
                    <h4 className="font-bold text-[#00F3FF]">SSC</h4>
                    <p className="text-sm text-gray-400 mb-2">BAF SHAHEEN COLLEGE, JASHORE</p>
                    <p className="text-xs text-gray-500">GPA: 5.00 (2020)</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-bold mb-8 text-gray-300 flex items-center gap-2"><Terminal className="text-[#00F3FF]"/> SYSTEM SPECS</h3>
              <div className="space-y-6">
                <div className="glass p-5 rounded-lg border-l-4 border-l-[#00F3FF]">
                  <h4 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Backend & Languages</h4>
                  <p className="font-semibold text-lg">Python, Django, Flask, REST APIs, MySQL</p>
                </div>
                <div className="glass p-5 rounded-lg border-l-4 border-l-purple-500">
                  <h4 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Frontend Engine</h4>
                  <p className="font-semibold text-lg">React.js, Three.js, JavaScript, HTML5/CSS3</p>
                </div>
                <div className="glass p-5 rounded-lg border-l-4 border-l-red-500">
                  <h4 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Security & Data</h4>
                  <p className="font-semibold text-lg">SIEM/SOC, Honeypot Setup, Machine Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-3xl md:text-5xl font-['Orbitron'] font-bold">PROJECT <span className="text-[#00F3FF]">ARCHIVE</span></h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00F3FF]/50 to-transparent"></div>
            </div>
            {isAuthenticated && (
              <button 
                onClick={() => setShowAdminModal(true)}
                className="ml-4 px-4 py-2 bg-[#00F3FF]/10 border border-[#00F3FF] text-[#00F3FF] rounded text-sm font-bold flex items-center gap-2 hover:bg-[#00F3FF] hover:text-black transition-all"
              >
                <Plus size={16} /> ADD NEW PROJECT
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-xl overflow-hidden group hover:border-[#00F3FF]/50 transition-colors relative"
              >
                {isAuthenticated && (
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    title="Delete Project"
                    className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all z-20"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00F3FF] transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech_stack.split(',').map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 border-t border-white/5 pt-6">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <FaGithub size={18} /> Source Code
                      </a>
                    )}
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#00F3FF] hover:text-white transition-colors">
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Feedback */}
      <section id="contact" className="py-20 px-6 bg-black/50 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-['Orbitron'] font-bold mb-4">INITIATE <span className="text-[#00F3FF]">CONTACT</span></h2>
            <p className="text-gray-400">Feedback, collaborations, or job opportunities. Leave a trace.</p>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="glass p-8 md:p-12 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">YOUR NAME</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF] transition-colors placeholder:text-gray-600"
                  value={feedback.name}
                  onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF] transition-colors placeholder:text-gray-600"
                  value={feedback.email}
                  onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">RATING / EXPERIENCE</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    type="button" 
                    key={star}
                    onClick={() => setFeedback({...feedback, rating: star})}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      size={28} 
                      className={star <= feedback.rating ? "text-[#00F3FF] fill-[#00F3FF]" : "text-gray-600"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">YOUR MESSAGE</label>
              <textarea 
                required
                rows="4"
                placeholder="Let's collaborate on a project..."
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF] transition-colors resize-none placeholder:text-gray-600"
                value={feedback.message}
                onChange={(e) => setFeedback({...feedback, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-[#00F3FF]/10 border border-[#00F3FF] text-[#00F3FF] font-bold py-4 rounded-lg hover:bg-[#00F3FF] hover:text-black transition-all flex justify-center items-center gap-2 cursor-pointer"
            >
              {status === 'submitting' ? 'TRANSMITTING...' : status === 'success' ? 'TRANSMISSION SENT SUCCESSFULLY!' : 'SEND TRANSMISSION'}
              <Mail size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/80 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00F3FF]/5 blur-[100px]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="flex gap-8 mb-8 text-gray-400">
            <a href="https://github.com/mfd-7" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:text-[#00F3FF] hover:border-[#00F3FF]/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/muhtasim-fuad-093a8b274/" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:text-[#00F3FF] hover:border-[#00F3FF]/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <FaLinkedin size={24} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:text-[#00F3FF] hover:border-[#00F3FF]/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <FaInstagram size={24} />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:text-[#00F3FF] hover:border-[#00F3FF]/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <FaFacebook size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm tracking-widest font-['Rajdhani'] mb-3">
            © {new Date().getFullYear()} MD. MUHTASIM FUAD. ALL RIGHTS RESERVED.
          </p>
          <button 
            onClick={() => setShowAdminModal(true)}
            className="text-xs text-gray-600 hover:text-[#00F3FF] transition-colors flex items-center gap-1"
          >
            <Lock size={12} /> Admin Portal
          </button>
        </div>
      </footer>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-2xl w-full max-w-xl border border-[#00F3FF]/40 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Shield className="text-[#00F3FF]" />
                  <h3 className="font-['Orbitron'] font-bold text-lg text-[#00F3FF]">
                    Mr. MUHTASIM Admin Panel
                  </h3>
                </div>
                <button 
                  onClick={() => setShowAdminModal(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {!isAuthenticated ? (
                /* Login Form */
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">USERNAME</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Username (e.g. mfd7)"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">PASSWORD</label>
                    <input 
                      type="password" 
                      required
                      placeholder="Password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF]"
                    />
                  </div>

                  {loginError && (
                    <p className="text-red-400 text-xs">{loginError}</p>
                  )}

                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#00F3FF] text-black font-bold rounded-lg hover:bg-[#00F3FF]/80 transition-all tracking-wider"
                  >
                    AUTHENTICATE
                  </button>
                </form>
              ) : (
                /* Manage Projects Form */
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span className="text-xs text-gray-300">Logged in as: <strong className="text-[#00F3FF]">mfd7</strong></span>
                    <button 
                      onClick={handleAdminLogout}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>

                  <form onSubmit={handleAddProject} className="space-y-4 border-t border-white/10 pt-4">
                    <h4 className="text-sm font-bold text-gray-200 tracking-wider flex items-center gap-2">
                      <Plus size={16} className="text-[#00F3FF]" /> ADD NEW PROJECT
                    </h4>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">PROJECT TITLE *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. AI Sentinel"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00F3FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">DESCRIPTION *</label>
                      <textarea 
                        required
                        rows="2"
                        placeholder="Brief summary of the project..."
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00F3FF] resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">TECH STACK (COMMA SEPARATED) *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. React, Python, Docker"
                        value={newProject.tech_stack}
                        onChange={(e) => setNewProject({...newProject, tech_stack: e.target.value})}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00F3FF]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">GITHUB LINK</label>
                        <input 
                          type="url" 
                          placeholder="https://github.com/..."
                          value={newProject.github_link}
                          onChange={(e) => setNewProject({...newProject, github_link: e.target.value})}
                          className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00F3FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">LIVE DEMO LINK</label>
                        <input 
                          type="url" 
                          placeholder="https://..."
                          value={newProject.live_link}
                          onChange={(e) => setNewProject({...newProject, live_link: e.target.value})}
                          className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00F3FF]"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#00F3FF] text-black font-bold rounded-lg hover:bg-[#00F3FF]/80 transition-all text-sm tracking-wider"
                    >
                      PUBLISH PROJECT TO PORTFOLIO
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
