import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, QrCode, Wifi, WifiOff, Heart, ArrowRight, Users, Building2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const } }),
};

const features = [
  { icon: Shield, title: "AES-256 Encrypted", desc: "Your health data is encrypted end-to-end. Only you control who sees it." },
  { icon: QrCode, title: "Instant QR Access", desc: "Share your health summary with a hospital in seconds via QR code." },
  { icon: WifiOff, title: "Offline Ready", desc: "Emergency health info available even without internet connectivity." },
  { icon: Lock, title: "Consent Engine", desc: "Hospitals must request OTP-verified permission to access your data." },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary" fill="currentColor" />
            <span className="font-display font-bold text-xl text-foreground">HealthPass</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/worker/login">
              <Button variant="ghost" size="sm">Worker Login</Button>
            </Link>
            <Link to="/hospital/login">
              <Button variant="outline" size="sm">Hospital Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-6">
                Digital Health Portability
              </span>
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6">
              Your Health Records,{" "}
              <span className="text-gradient">Anywhere You Go</span>
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Secure, portable, and offline-ready digital health records for migrant workers. Take control of your medical history.
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/worker/signup">
                <Button size="lg" className="gradient-primary text-primary-foreground px-8 gap-2 shadow-elevated hover:opacity-90 transition-opacity">
                  <Users className="h-5 w-5" /> Get Your HealthPass <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/hospital/login">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  <Building2 className="h-5 w-5" /> Hospital Access
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Built for Trust & Security</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Every feature designed with migrant workers' real needs in mind.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow border border-border">
                <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-center text-foreground mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Sign Up", desc: "Register with your phone number and basic ID. Get a unique HealthPass ID." },
              { step: "02", title: "Store Records", desc: "Upload documents, add allergies, vaccinations — all encrypted and private." },
              { step: "03", title: "Share Securely", desc: "Show your QR code at any hospital. They request access, you approve via OTP." },
            ].map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="text-center">
                <div className="text-5xl font-extrabold text-gradient mb-4">{s.step}</div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-card border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="font-display font-bold text-foreground">HealthPass</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 HealthPass. Empowering migrant health worldwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
