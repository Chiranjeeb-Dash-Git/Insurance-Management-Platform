import React, { useState } from 'react';
import { useInsurance } from '../context/InsuranceContext';

const LoginPage = () => {
  const { handleLogin, handleRegister, setToastMsg } = useInsurance();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const res = await handleLogin(email, password);
      if (!res.success) setError(res.error || 'Failed to login');
    } else {
      const res = await handleRegister({ name, email, password, phone, location });
      if (!res.success) setError(res.error || 'Failed to register');
    }
  };

  return (
    <main className="flex min-h-screen bg-surface text-on-background">
      {/* Left Side: Hero Image Section */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-80 mix-blend-multiply" 
            alt="Corporate office atrium" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC5ewvauZdCwR0ZWB99WKsKKEAcVSwtY4O1pW9-p84-MP88ZpyVxxo8prf48yjyj7llRgInA1DFC9QbyGSFDmZEF5tKS5-YDhOF7Ll20ZcaWC-DdZM0FtAkWmNy3bsiDq2iF-5TlKeL-I6BFzYW118HyNPnIGTwimyy2lHOor9IUu9HybDSELexNBnBqCwXBJr35ql07HLu8tpTaCHOP9pmufNpmBand0Pw4ZDW-Vs0-ZdOmWV1nfrnnqAKSChX5-YDHwWvw8_lkrQ"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-10 w-full text-on-primary">
          <div>
            <h1 className="text-[32px] font-bold tracking-tight">ShieldLink</h1>
            <p className="text-[12px] font-semibold mt-2 uppercase tracking-widest opacity-80">Security • Transparency • Reliability</p>
          </div>
          <div className="max-w-lg">
            <h2 className="text-[24px] font-semibold mb-4">Protecting what matters most with systematic precision.</h2>
            <p className="text-[16px] opacity-90 leading-relaxed">
              Access your comprehensive insurance management suite. Designed for professional agents and discerning clients who demand absolute clarity and functional elegance.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-highest overflow-hidden">
                <img className="w-full h-full object-cover" alt="Agent 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvrc5DgyAEzJM19yiVfXSpOQY67dx3C3RVgSOMoHNuuGQYfiKpq1V_p0-H9_cFd4dyEIBLCRUirUJfSWWv_Ptj2BAA1zz92IelBmdCghua-zmIVPrVjxfgu6njEMV7ygM9tBicFnp7LnQY6LULBTo13FNyi4yEhvX--YhKwsJt96Hc8dzHQmJlVM5i3Kubdn5QG2tzr8NObtdsRkrOp_ToBAG7gy4RcgWlYRxuRe8rz-SAovELaq4a5XGGAH9XdjgFUFSyCvqk_mBj"/>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-highest overflow-hidden">
                <img className="w-full h-full object-cover" alt="Agent 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTPZJ3EeFeaP3NYvOHhTrFb5qokrQ5hcHfnjiazYGyMiaLkIHnyeZDlKyQhc9t84mt3gYXMoIBmrapA1nnaE2QhPljKpEQPvTEUSZOVzCkaKuwG5Jq_s0nqLz4jVH38Rfdu8ZnPMlSYFEx759pbXqqKGXEFhyQQvOm6GUYdfKwjQ-qqurdSCHw8LAL92t_X2OnyTG7d2WyZE2ej7WUQU8VYr3Vjzd0QQS2at5nhLRKXf5grplK2PKptyJf4othzjzANLLAEzC08JMo"/>
              </div>
              <div class="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-highest overflow-hidden">
                <img className="w-full h-full object-cover" alt="Agent 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnJju9iBfjViyYL3Ac648pBHUS2dagkFGpZzQ6xztYJnnbvC_iKL_D3HYJ9lwsEioJcxgmg4t4xxqS7hqZexoK6wFTnof4gSjYGIZWVFIV5wbWptBRe58cvreydydD_kGjRqEnL6Ivwq1V6-Jeb-h2Z-0mas1Ri21d3WsR2R5HLytAVRJ5B4bjEqwZsKaVEUs0MDxFA_mjQh2LPTyg8dUuY4Ie9NRo2nB3guIEAHyw972LwGXPECpKTLfSPrTCcJyuena7ZbjqYBzo"/>
              </div>
            </div>
            <span className="text-[12px] font-semibold">Trusted by 10k+ professionals worldwide</span>
          </div>
          
          <div className="mt-8 bg-surface-container-highest/20 backdrop-blur-md border border-white/20 p-4 rounded-xl w-fit">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary-container mb-2">Demo Agent Login</p>
            <p className="text-[14px] font-medium font-mono">ID: agent@shieldlink.com</p>
            <p className="text-[14px] font-medium font-mono">Pass: password123</p>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </section>

      {/* Right Side: Login Form Section */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 bg-surface">
        <div className="lg:hidden w-full max-w-md mb-8 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">security</span>
          <span className="text-[20px] text-primary font-bold">ShieldLink</span>
        </div>
        <div className="w-full max-w-md">
          <header className="mb-8">
            <h2 className="text-[32px] font-bold text-on-surface mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-[14px] text-on-surface-variant">
              {isLogin ? 'Please enter your credentials to access your dashboard.' : 'Fill in your details to get started with ShieldLink.'}
            </p>
          </header>

          {error && <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-[13px] font-semibold">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-on-surface-variant block uppercase">Full Name</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">person</span>
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-on-surface-variant block uppercase">Phone</label>
                    <input className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      type="tel" placeholder="+1 (555)" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-on-surface-variant block uppercase">Location</label>
                    <input className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      type="text" placeholder="City, State" value={location} onChange={(e) => setLocation(e.target.value)} required />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-on-surface-variant block uppercase" htmlFor="email">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  id="email" 
                  type="email"
                  placeholder="agent@shieldlink.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-semibold text-on-surface-variant block uppercase" htmlFor="password">Password</label>
                <a className="text-[12px] font-semibold text-primary hover:underline transition-all" href="#">Forgot password?</a>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  className="w-full pl-10 pr-10 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" id="remember" type="checkbox"/>
              <label className="ml-2 text-[13px] text-on-surface-variant" htmlFor="remember">Keep me signed in for 30 days</label>
            </div>

            <button className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 rounded-lg text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]" type="submit">
              {isLogin ? 'Sign In' : 'Create Account'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-outline-variant flex-grow"></div>
            <span className="text-[11px] font-medium text-outline uppercase tracking-wider">or continue with</span>
            <div className="h-px bg-outline-variant flex-grow"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors text-[14px]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors text-[14px]">
              <svg className="w-5 h-5" fill="#00A4EF" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"></path>
              </svg>
              Microsoft
            </button>
          </div>

          <div className="mt-4">
            <button 
              type="button" 
              onClick={() => {
                setIsLogin(true);
                setEmail('agent@shieldlink.com');
                setPassword('password123');
                setShowPassword(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-secondary/30 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors text-[13px] font-semibold text-secondary"
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              Auto-fill Demo Agent Credentials
            </button>
          </div>

          <footer className="mt-8 text-center">
            <p className="text-[14px] text-on-surface-variant">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-primary font-bold hover:underline transition-all ml-1"
              >
                {isLogin ? 'Request access' : 'Sign in here'}
              </button>
            </p>
          </footer>
        </div>

        <div className="mt-auto pt-8 flex gap-6 text-[11px] font-medium text-outline">
          <a className="hover:text-on-surface-variant" href="#">Privacy Policy</a>
          <a className="hover:text-on-surface-variant" href="#">Terms of Service</a>
          <a className="hover:text-on-surface-variant" href="#">System Status</a>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
