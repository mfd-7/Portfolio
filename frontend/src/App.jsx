import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, User, Star, Menu, X, Terminal, Shield } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

function App() {
  const [projects, setProjects] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: 5, message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/projects/`)
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post(`${API_URL}/feedback/`, feedback);
      setStatus('success');
      setFeedback({ name: '', email: '', rating: 5, message: '' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#030303] to-[#030303]"></div>
        {/* Subtle grid pattern */}
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
          </div>

          <button className="md:hidden text-[#00F3FF]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
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
            <div className="flex gap-4">
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
            {/* Cyberpunk UI accents */}
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
                    <h4 className="font-bold text-[#00F3FF]">Bachelor of Science, CSE</h4>
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
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-['Orbitron'] font-bold">PROJECT <span className="text-[#00F3FF]">ARCHIVE</span></h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00F3FF]/50 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.length > 0 ? projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-xl overflow-hidden group hover:border-[#00F3FF]/50 transition-colors"
              >
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
            )) : (
              <div className="col-span-2 text-center text-gray-500 py-20">Loading project archives...</div>
            )}
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
                <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">IDENTITY (NAME)</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF] transition-colors"
                  value={feedback.name}
                  onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">COMMLINK (EMAIL)</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF] transition-colors"
                  value={feedback.email}
                  onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">SYSTEM RATING</label>
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
              <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider">TRANSMISSION (MESSAGE)</label>
              <textarea 
                required
                rows="4"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00F3FF] transition-colors resize-none"
                value={feedback.message}
                onChange={(e) => setFeedback({...feedback, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-[#00F3FF]/10 border border-[#00F3FF] text-[#00F3FF] font-bold py-4 rounded-lg hover:bg-[#00F3FF] hover:text-black transition-all flex justify-center items-center gap-2"
            >
              {status === 'submitting' ? 'TRANSMITTING...' : status === 'success' ? 'TRANSMISSION SENT!' : 'SEND TRANSMISSION'}
              <Mail size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} MD. MUHTASIM FUAD. Built with React & Django.</p>
      </footer>
    </div>
  );
}

export default App;
