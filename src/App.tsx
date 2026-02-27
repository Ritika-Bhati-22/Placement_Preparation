import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const LANGUAGES = ["JavaScript","Python","C++","Java","C","Go","Rust","TypeScript","Ruby","Swift","Kotlin","PHP","C#","Scala","R"];

const BADGES = [
  { id:"first_solve",  name:"First Blood",     icon:"🩸", desc:"Solve your first problem" },
  { id:"streak_3",     name:"On Fire",          icon:"🔥", desc:"3 day streak" },
  { id:"streak_7",     name:"Week Warrior",     icon:"⚔️",  desc:"7 day streak" },
  { id:"streak_30",    name:"Legend",           icon:"👑", desc:"30 day streak" },
  { id:"solve_10",     name:"Tenacious",        icon:"💪", desc:"Solve 10 problems" },
  { id:"solve_50",     name:"Grinder",          icon:"⚙️",  desc:"Solve 50 problems" },
  { id:"solve_100",    name:"Century",          icon:"💎", desc:"Solve 100 problems" },
  { id:"interview_5",  name:"Interview Ready",  icon:"🎯", desc:"Answer 5 interview Qs" },
  { id:"ats_80",       name:"ATS Champion",     icon:"📊", desc:"ATS score above 80" },
  { id:"resume_done",  name:"Resume Pro",       icon:"📄", desc:"Built your first resume" },
];

const PROBLEMS = [
  { id:1,  title:"Two Sum",                                     tags:["Array","Hash Map"],          diff:"Easy",   desc:"Given array nums and integer target, return indices of two numbers that add up to target.",                example:"Input: nums=[2,7,11,15], target=9\nOutput: [0,1]" },
  { id:2,  title:"Reverse String",                              tags:["String","Two Pointers"],     diff:"Easy",   desc:"Write a function that reverses a string. Input is given as an array of characters s.",                    example:"Input: ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']" },
  { id:3,  title:"FizzBuzz",                                    tags:["Math","String"],             diff:"Easy",   desc:"Given integer n, return string array: 'FizzBuzz' if divisible by 3 and 5, 'Fizz' by 3, 'Buzz' by 5, else the number.", example:"Input: n=5\nOutput: ['1','2','Fizz','4','Buzz']" },
  { id:4,  title:"Valid Parentheses",                           tags:["Stack","String"],            diff:"Easy",   desc:"Given string with '(){}[]', determine if the input string is valid.",                                    example:"Input: '()[]{}\'\nOutput: true" },
  { id:5,  title:"Best Time to Buy and Sell Stock",             tags:["Array","Greedy"],            diff:"Easy",   desc:"Find maximum profit by choosing a single buy day and a later sell day.",                                  example:"Input: [7,1,5,3,6,4]\nOutput: 5" },
  { id:6,  title:"Longest Substring Without Repeating Chars",   tags:["Sliding Window","Hash Map"], diff:"Medium", desc:"Find the length of the longest substring without repeating characters.",                               example:"Input: 'abcabcbb'\nOutput: 3" },
  { id:7,  title:"Merge Intervals",                             tags:["Array","Sorting"],           diff:"Medium", desc:"Merge all overlapping intervals and return non-overlapping intervals array.",                            example:"Input: [[1,3],[2,6],[8,10]]\nOutput: [[1,6],[8,10]]" },
  { id:8,  title:"Binary Tree Level Order Traversal",           tags:["BFS","Tree"],                diff:"Medium", desc:"Return level order traversal of binary tree node values (from left to right, level by level).",          example:"Input: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]" },
  { id:9,  title:"Kth Largest Element in Array",                tags:["Heap","Quick Select"],       diff:"Medium", desc:"Find the kth largest element in an unsorted array. Not the kth distinct element.",                      example:"Input: nums=[3,2,1,5,6,4], k=2\nOutput: 5" },
  { id:10, title:"Coin Change",                                  tags:["DP","BFS"],                  diff:"Medium", desc:"Find fewest number of coins needed to make up the given amount. Return -1 if not possible.",             example:"Input: coins=[1,5,11], amount=11\nOutput: 3" },
  { id:11, title:"Median of Two Sorted Arrays",                  tags:["Binary Search","D&C"],       diff:"Hard",   desc:"Find median of two sorted arrays. Required overall time complexity: O(log(m+n)).",                     example:"Input: [1,3],[2]\nOutput: 2.0" },
  { id:12, title:"Trapping Rain Water",                          tags:["Two Pointers","Stack"],      diff:"Hard",   desc:"Given elevation map as array, compute how much water it can trap after raining.",                      example:"Input: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6" },
];

const IQ = [
  { id:1,  cat:"DSA",           q:"Explain BFS vs DFS — when would you use each?",                          hint:"Traversal, shortest paths, memory usage." },
  { id:2,  cat:"System Design", q:"How would you design a URL shortener like bit.ly?",                       hint:"Hashing, DB design, scalability, redirects." },
  { id:3,  cat:"OOP",           q:"Explain SOLID principles with real-world examples.",                      hint:"SRP, OCP, LSP, ISP, DIP — one each." },
  { id:4,  cat:"OS",            q:"What is the difference between process and thread?",                      hint:"Memory, context switch, communication." },
  { id:5,  cat:"Database",      q:"What is database indexing and how does it improve performance?",          hint:"B-tree, hash index, write trade-offs." },
  { id:6,  cat:"React",         q:"Explain React reconciliation algorithm and Virtual DOM.",                 hint:"Diffing, keys, fiber architecture." },
  { id:7,  cat:"HR",            q:"Tell about a team conflict. How did you resolve it?",                     hint:"Use STAR method." },
  { id:8,  cat:"Networking",    q:"What happens when you type google.com in a browser?",                     hint:"DNS, TCP, HTTP, TLS, rendering pipeline." },
  { id:9,  cat:"JavaScript",    q:"Explain event loop, call stack, microtasks, and macrotasks.",             hint:"Promise queue vs setTimeout queue." },
  { id:10, cat:"HR",            q:"Why should we hire you? What makes you different from others?",           hint:"Unique strengths + company alignment." },
];

const RESOURCES = [
  { name:"MDN Web Docs",    url:"https://developer.mozilla.org", icon:"📚", color:"#1a73e8", desc:"Web APIs, HTML, CSS, JavaScript reference" },
  { name:"GeeksforGeeks",   url:"https://geeksforgeeks.org",     icon:"🌿", color:"#2f8d46", desc:"DSA, algorithms, CS fundamentals" },
  { name:"W3Schools",       url:"https://w3schools.com",         icon:"🎓", color:"#04aa6d", desc:"Web dev tutorials and references" },
  { name:"freeCodeCamp",    url:"https://freecodecamp.org",      icon:"🔥", color:"#f1be32", desc:"Full-stack development curriculum" },
  { name:"The Odin Project",url:"https://theodinproject.com",    icon:"⚔️",  color:"#d14000", desc:"Full-stack web dev learning path" },
  { name:"CS50",            url:"https://cs50.harvard.edu",      icon:"🏛️", color:"#a41034", desc:"Harvard's Introduction to CS" },
  { name:"Roadmap.sh",      url:"https://roadmap.sh",            icon:"🗺️", color:"#8b5cf6", desc:"Developer learning roadmaps" },
  { name:"JavaScript.info", url:"https://javascript.info",      icon:"💛", color:"#f7df1e", desc:"Modern JavaScript deep tutorial" },
];

const LATEX_TEMPLATE = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym,fullpage,titlesec,marvosym,verbatim,hyperref,fancyhdr,tabularx,enumitem,xcolor}
\\pagestyle{fancy}\\fancyhf{}\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}\\renewcommand{\\footrulewidth}{0pt}
\\urlstyle{same}\\raggedbottom\\raggedright\\setlength{\\tabcolsep}{0in}
\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large}{}{0em}{}[\\color{black}\\titlerule\\vspace{-5pt}]
\\begin{document}
\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
  \\textbf{\\Large YOUR NAME} & Email: your@email.com \\\\
  LinkedIn: linkedin.com/in/you & GitHub: github.com/you \\\\
\\end{tabular*}
\\section{Education}
\\textbf{Your University} \\hfill City \\\\
\\textit{B.Tech Computer Science} \\hfill \\textit{2021--2025} \\\\ CGPA: 8.5/10
\\section{Skills}
\\textbf{Languages:} Python, JavaScript, C++ \\\\
\\textbf{Frameworks:} React, Node.js, FastAPI \\\\
\\textbf{Tools:} Git, Docker, AWS, MongoDB
\\section{Projects}
\\textbf{Project Name} \\hfill \\textit{React, Node.js} \\\\
\\textit{github.com/project}
\\begin{itemize}[leftmargin=*]
  \\item Built X that improved Y by Z\\%
\\end{itemize}
\\section{Experience}
\\textbf{Company} \\hfill \\textit{Jun--Aug 2024} \\\\
\\textit{Software Intern}
\\begin{itemize}[leftmargin=*]
  \\item Developed X using Y, improving performance by Z\\%
\\end{itemize}
\\section{Achievements}
\\begin{itemize}[leftmargin=*]
  \\item Competitive programming / hackathon win
\\end{itemize}
\\end{document}`;

// ─── AI Helper ────────────────────────────────────────────────────────────────
async function ai(messages, system = "") {
  const body = { model: "claude-sonnet-4-20250514", max_tokens: 1000, messages };
  if (system) body.system = system;
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
  });
  const d = await r.json();
  return d.content?.map(b => b.text || "").join("") || "Error. Please try again.";
}

// ─── Local Storage (user progress) ───────────────────────────────────────────
const saveUsers = (u) => { try { localStorage.setItem("df_users", JSON.stringify(u)); } catch {} };
const loadUsers = () => { try { return JSON.parse(localStorage.getItem("df_users") || "{}"); } catch { return {}; } };
const defaultProgress = () => ({ streak:0, lastActive:"", totalSolved:0, interviewAnswered:0, xp:0, earnedBadges:[], solvedIds:[], atsScore:null, resumeBuilt:false, lcProgress:0, hrProgress:0 });

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = { bg:"#0f1117", sidebar:"#13151f", card:"#1a1d2e", border:"#252840", accent:"#6366f1", text:"#e2e8f0", muted:"#64748b", navBg:"#0d0f1a" };

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────
const NAV = [
  { section:"MAIN", items:[
    { id:"dashboard", label:"Dashboard",       icon:"🏠" },
    { id:"resume",    label:"Resume Analyzer", icon:"📄" },
    { id:"ats",       label:"ATS Score",       icon:"🎯" },
    { id:"interview", label:"Interview Prep",  icon:"🧠" },
  ]},
  { section:"PRACTICE", items:[
    { id:"practice",   label:"DSA Practice",    icon:"💻" },
    { id:"aiq",        label:"AI Questions",    icon:"🤖" },
    { id:"leetcode",   label:"LeetCode",        icon:"🔗" },
    { id:"hackerrank", label:"HackerRank",      icon:"🏆" },
  ]},
  { section:"LEARN", items:[
    { id:"study", label:"Study Resources", icon:"📚" },
  ]},
  { section:"AI", items:[
    { id:"chat", label:"AI Chatbot", icon:"💬" },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]       = useState("auth");
  const [authMode, setAuthMode]   = useState("login");
  const [authName, setAuthName]   = useState("");
  const [authPwd, setAuthPwd]     = useState("");
  const [authErr, setAuthErr]     = useState("");
  const [user, setUser]           = useState("");
  const [progress, setProgress]   = useState(defaultProgress());
  const [tab, setTab]             = useState("dashboard");
  const [sidebar, setSidebar]     = useState(true);

  const saveProgress = (p) => {
    const users = loadUsers();
    users[user] = p;
    saveUsers(users);
    setProgress(p);
  };

  const checkBadges = (p) => {
    const b = [...(p.earnedBadges || [])];
    const add = (id) => { if (!b.includes(id)) b.push(id); };
    if (p.totalSolved >= 1)           add("first_solve");
    if (p.streak >= 3)                add("streak_3");
    if (p.streak >= 7)                add("streak_7");
    if (p.streak >= 30)               add("streak_30");
    if (p.totalSolved >= 10)          add("solve_10");
    if (p.totalSolved >= 50)          add("solve_50");
    if (p.totalSolved >= 100)         add("solve_100");
    if (p.interviewAnswered >= 5)     add("interview_5");
    if ((p.atsScore || 0) >= 80)      add("ats_80");
    if (p.resumeBuilt)                add("resume_done");
    return { ...p, earnedBadges: b };
  };

  const addXP = (amount, extra = {}) => {
    const today = new Date().toDateString();
    let p = { ...progress, xp: progress.xp + amount, ...extra };
    if (p.lastActive !== today) p = { ...p, streak: p.streak + 1, lastActive: today };
    const checked = checkBadges(p);
    saveProgress(checked);
  };

  const handleAuth = () => {
    const name = authName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!name || !authPwd) { setAuthErr("Naam aur password dono bharo!"); return; }
    const users = loadUsers();
    if (authMode === "register") {
      if (users[name]) { setAuthErr("Ye naam already exist karta hai. Login karo."); return; }
      const newUser = { ...defaultProgress(), _pwd: authPwd };
      users[name] = newUser;
      saveUsers(users);
      setUser(name); setProgress(newUser); setScreen("app");
    } else {
      if (!users[name]) { setAuthErr("Account nahi mila. Register karo pehle."); return; }
      if (users[name]._pwd && users[name]._pwd !== authPwd) { setAuthErr("Password galat hai!"); return; }
      setUser(name); setProgress(users[name]); setScreen("app");
    }
    setAuthErr("");
  };

  const logout = () => { setScreen("auth"); setUser(""); setProgress(defaultProgress()); setAuthName(""); setAuthPwd(""); };

  if (screen === "auth") return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 30% 20%,#1e1b4b 0%,#0f1117 60%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter','Segoe UI',sans-serif", padding:"20px" }}>
      <div style={{ width:"100%", maxWidth:"420px" }}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ fontSize:"44px", marginBottom:"8px" }}>⚡</div>
          <h1 style={{ fontSize:"28px", fontWeight:800, color:"#e2e8f0", margin:0 }}>DevForge</h1>
          <p style={{ color:"#64748b", marginTop:"8px", fontSize:"14px" }}>Your complete coding career platform</p>
        </div>
        <div style={{ background:"#1a1d2e", border:"1px solid #252840", borderRadius:"16px", padding:"32px" }}>
          <h2 style={{ color:"#e2e8f0", fontSize:"20px", fontWeight:700, marginBottom:"24px", textAlign:"center" }}>
            {authMode === "login" ? "Wapas aao! 👋" : "Account banao 🚀"}
          </h2>
          <div style={{ marginBottom:"14px" }}>
            <label style={Lbl}>Naam (Username)</label>
            <input style={Inp} value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="apna naam likho..." onKeyDown={e=>e.key==="Enter"&&handleAuth()} />
          </div>
          <div style={{ marginBottom:"14px" }}>
            <label style={Lbl}>Password</label>
            <input type="password" style={Inp} value={authPwd} onChange={e=>setAuthPwd(e.target.value)} placeholder="password..." onKeyDown={e=>e.key==="Enter"&&handleAuth()} />
          </div>
          {authErr && <div style={{ background:"#450a0a", border:"1px solid #ef4444", borderRadius:"8px", padding:"10px 14px", color:"#fca5a5", fontSize:"13px", marginBottom:"14px" }}>{authErr}</div>}
          <button onClick={handleAuth} style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"10px", color:"#fff", fontWeight:700, fontSize:"15px", cursor:"pointer", fontFamily:"inherit" }}>
            {authMode === "login" ? "Login karo →" : "Register karo →"}
          </button>
          <p style={{ textAlign:"center", marginTop:"16px", color:"#64748b", fontSize:"14px" }}>
            {authMode === "login" ? "Account nahi hai? " : "Already hai? "}
            <span onClick={()=>{ setAuthMode(authMode==="login"?"register":"login"); setAuthErr(""); }} style={{ color:"#818cf8", cursor:"pointer", fontWeight:600 }}>
              {authMode === "login" ? "Register karo" : "Login karo"}
            </span>
          </p>
        </div>
        <p style={{ textAlign:"center", color:"#374151", fontSize:"12px", marginTop:"16px" }}>
          ✅ Progress sirf tumhari — koi aur nahi dekh sakta
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", background:C.bg, fontFamily:"'Inter','Segoe UI',sans-serif", color:C.text }}>
      {/* ── Top Nav ── */}
      <nav style={{ height:"56px", background:C.navBg, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", padding:"0 16px", gap:"10px", position:"sticky", top:0, zIndex:200, flexShrink:0 }}>
        <button onClick={()=>setSidebar(s=>!s)} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:"18px", padding:"6px", flexShrink:0 }}>☰</button>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", flexShrink:0 }}>
          <span style={{ fontSize:"18px" }}>⚡</span>
          <span style={{ fontWeight:800, fontSize:"15px", background:"linear-gradient(90deg,#818cf8,#60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>DevForge</span>
        </div>
        <div style={{ display:"flex", gap:"2px", flexWrap:"wrap", overflow:"hidden" }}>
          {[["dashboard","Dashboard"],["resume","Resume"],["ats","ATS Score"],["interview","Interview Prep"],["practice","DSA"],["aiq","AI Qs"],["study","Study"],["chat","Chatbot"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ padding:"6px 10px", borderRadius:"7px", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:"12px", fontWeight:600, background:tab===id?"#6366f1":"transparent", color:tab===id?"#fff":"#94a3b8", whiteSpace:"nowrap" }}>{lbl}</button>
          ))}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
          <span style={{ fontSize:"12px", color:"#f97316", fontWeight:700 }}>🔥{progress.streak}d</span>
          <span style={{ fontSize:"12px", color:"#818cf8", fontWeight:700 }}>⚡Lv.{Math.floor(progress.xp/100)+1}</span>
          <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:700, cursor:"pointer" }} title={user}>{user[0]?.toUpperCase()}</div>
          <button onClick={logout} style={{ padding:"5px 10px", borderRadius:"6px", border:`1px solid ${C.border}`, background:"none", color:C.muted, cursor:"pointer", fontSize:"12px", fontFamily:"inherit" }}>Logout</button>
        </div>
      </nav>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* ── Sidebar ── */}
        {sidebar && (
          <aside style={{ width:"210px", background:C.sidebar, borderRight:`1px solid ${C.border}`, padding:"16px 10px", overflowY:"auto", flexShrink:0 }}>
            {NAV.map(({ section, items }) => (
              <div key={section} style={{ marginBottom:"20px" }}>
                <div style={{ fontSize:"10px", fontWeight:700, color:C.muted, letterSpacing:"0.1em", marginBottom:"8px", paddingLeft:"8px" }}>{section}</div>
                {items.map(({ id, label, icon }) => (
                  <button key={id} onClick={()=>setTab(id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"9px 10px", borderRadius:"9px", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:"13px", fontWeight:tab===id?700:500, background:tab===id?"linear-gradient(135deg,#312e81,#1e1b4b)":"transparent", color:tab===id?"#a5b4fc":C.muted, marginBottom:"2px", transition:"all 0.15s", textAlign:"left" }}>
                    <span>{icon}</span>
                    <span style={{ flex:1 }}>{label}</span>
                    {tab===id && <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#6366f1", flexShrink:0 }} />}
                  </button>
                ))}
              </div>
            ))}
            {/* Level card */}
            <div style={{ padding:"12px", background:C.card, borderRadius:"10px", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:"11px", color:C.muted, marginBottom:"6px" }}>Level {Math.floor(progress.xp/100)+1} • {progress.xp%100}/100 XP</div>
              <div style={{ background:"#1e293b", borderRadius:"999px", height:"6px" }}>
                <div style={{ width:`${progress.xp%100}%`, height:"100%", background:"linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius:"999px" }} />
              </div>
              <div style={{ fontSize:"12px", color:"#f97316", marginTop:"8px", fontWeight:700 }}>🔥 {progress.streak} day streak</div>
              <div style={{ fontSize:"11px", color:C.muted, marginTop:"4px" }}>💻 {progress.totalSolved} solved • 🎯 {progress.interviewAnswered} interviews</div>
            </div>
          </aside>
        )}

        {/* ── Main ── */}
        <main style={{ flex:1, overflowY:"auto", padding:"24px" }}>
          {tab==="dashboard"  && <Dashboard  progress={progress} setTab={setTab} user={user} />}
          {tab==="practice"   && <Practice   progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress} />}
          {tab==="aiq"        && <AIQuestions progress={progress} addXP={addXP} />}
          {tab==="interview"  && <Interview  progress={progress} addXP={addXP} />}
          {tab==="ats"        && <ATSScore   progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress} />}
          {tab==="resume"     && <ResumeBuilder progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress} />}
          {tab==="study"      && <Study />}
          {tab==="chat"       && <Chatbot />}
          {tab==="leetcode"   && <ExternalSite url="https://leetcode.com" name="LeetCode" color="#f89f1b" links={[["Problem Set","https://leetcode.com/problemset/"],["Study Plan","https://leetcode.com/study-plan/"],["Explore","https://leetcode.com/explore/"]]} progress={progress} field="lcProgress" addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress} />}
          {tab==="hackerrank" && <ExternalSite url="https://hackerrank.com" name="HackerRank" color="#2ec866" links={[["Interview Kit","https://hackerrank.com/interview/preparation-kit"],["Certify","https://hackerrank.com/skills-verification"],["Practice","https://hackerrank.com/domains"]]} progress={progress} field="hrProgress" addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress} />}
        </main>
      </div>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#0f1117;}
        ::-webkit-scrollbar-thumb{background:#252840;border-radius:3px;}
        button:hover:not(:disabled){opacity:0.88;}
        button:disabled{opacity:0.45;cursor:not-allowed!important;}
        a{text-decoration:none;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @media(max-width:700px){
          nav>div:nth-child(3){display:none!important;}
          aside{position:fixed;left:0;top:56px;bottom:0;z-index:150;box-shadow:4px 0 20px #000;}
        }
      `}</style>
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
const Lbl = { display:"block", fontSize:"13px", color:"#94a3b8", marginBottom:"6px", fontWeight:600 };
const Inp = { width:"100%", padding:"10px 14px", background:"#0f1117", border:"1px solid #252840", borderRadius:"8px", color:"#e2e8f0", fontFamily:"inherit", fontSize:"14px", outline:"none", boxSizing:"border-box" };

function Card({ children, style = {} }) {
  return <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"20px", ...style }}>{children}</div>;
}
function Btn({ children, onClick, disabled, color = C.accent, style = {} }) {
  return <button onClick={onClick} disabled={disabled} style={{ padding:"9px 18px", borderRadius:"8px", border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:"13px", background:`linear-gradient(135deg,${color},${color}bb)`, color:"#fff", transition:"all 0.2s", ...style }}>{children}</button>;
}
function Title({ children }) {
  return <h2 style={{ fontSize:"20px", fontWeight:800, color:C.text, marginBottom:"16px" }}>{children}</h2>;
}
function AIBox({ title, content, color = C.accent }) {
  return (
    <div style={{ marginTop:"16px", padding:"16px", background:"#0f1117", borderRadius:"10px", border:`1px solid ${color}55` }}>
      <div style={{ color, fontWeight:700, marginBottom:"8px", fontSize:"14px" }}>{title}</div>
      <p style={{ color:"#cbd5e1", fontSize:"14px", lineHeight:1.8, whiteSpace:"pre-wrap" }}>{content}</p>
    </div>
  );
}
const diffColor = (d) => d==="Easy"?"#22c55e":d==="Medium"?"#f97316":"#ef4444";
const catColors  = { DSA:"#6366f1","System Design":"#ec4899",OOP:"#f59e0b",OS:"#14b8a6",Database:"#8b5cf6",React:"#38bdf8",HR:"#f97316",Networking:"#10b981",JavaScript:"#facc15" };
const Tarea = ({ value, onChange, placeholder, rows = 4, readOnly = false }) => (
  <textarea value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly}
    style={{ width:"100%", minHeight:`${rows*44}px`, padding:"12px", background:"#0f1117", border:`1px solid ${C.border}`, borderRadius:"8px", color:C.text, fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:"13px", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ progress, setTab, user }) {
  const lv = Math.floor(progress.xp / 100) + 1;
  const modules = [
    { id:"resume",    icon:"📄", label:"Resume Analyzer",  sub:"Upload & analyze your resume",    accent:"#6366f1" },
    { id:"ats",       icon:"🎯", label:"ATS Score",         sub:"Check ATS compatibility",          accent:"#eab308" },
    { id:"interview", icon:"🧠", label:"Interview Prep",    sub:"Topic-wise preparation",           accent:"#8b5cf6" },
    { id:"practice",  icon:"💻", label:"DSA Practice",      sub:"Solve coding problems",            accent:"#22c55e" },
    { id:"aiq",       icon:"🤖", label:"AI Questions",      sub:"Unlimited AI-generated problems",  accent:"#60a5fa" },
    { id:"study",     icon:"📚", label:"Study Resources",   sub:"MDN, GeeksForGeeks & more",        accent:"#f97316" },
    { id:"leetcode",  icon:"🔗", label:"LeetCode",          sub:"Practice + track your progress",   accent:"#f89f1b" },
    { id:"hackerrank",icon:"🏆", label:"HackerRank",        sub:"Practice + get certified",         accent:"#2ec866" },
    { id:"chat",      icon:"💬", label:"AI Chatbot",        sub:"Ask anything, get instant help",   accent:"#ec4899" },
  ];
  return (
    <div>
      {/* Hero Banner */}
      <div style={{ background:"linear-gradient(135deg,#1e1b4b 0%,#1a1d2e 100%)", borderRadius:"16px", padding:"32px", marginBottom:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px", border:`1px solid ${C.border}` }}>
        <div>
          <div style={{ fontSize:"11px", fontWeight:700, color:"#818cf8", letterSpacing:"0.12em", marginBottom:"8px" }}>WELCOME TO</div>
          <h1 style={{ fontSize:"clamp(22px,4vw,34px)", fontWeight:900, color:C.text, marginBottom:"4px" }}>
            Placement Preparation
          </h1>
          <h2 style={{ fontSize:"clamp(18px,3vw,26px)", fontWeight:800, color:"#818cf8", marginBottom:"10px" }}>
            Dashboard
          </h2>
          <p style={{ color:C.muted, fontSize:"14px" }}>
            Hey <b style={{ color:C.text }}>{user.charAt(0).toUpperCase()+user.slice(1)}</b>! Upload your resume to get a personalized prep plan 🚀
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          <Btn onClick={()=>setTab("resume")} style={{ padding:"12px 22px" }}>📄 Upload Resume</Btn>
          <Btn onClick={()=>setTab("chat")} color="#ec4899" style={{ padding:"12px 22px" }}>💬 Ask AI Chatbot</Btn>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:"12px", marginBottom:"24px" }}>
        {[["💻",progress.totalSolved,"Problems Solved","#6366f1"],["🔥",`${progress.streak}d`,"Streak","#f97316"],[`⚡Lv.${lv}`,`${progress.xp}xp`,"Experience","#818cf8"],["🎯",progress.interviewAnswered,"Interview Qs","#22c55e"],["📊",progress.atsScore??"-","ATS Score","#eab308"],["🏅",progress.earnedBadges.length,"Badges","#ec4899"]].map(([icon,val,lbl,col],i)=>(
          <Card key={i} style={{ textAlign:"center", padding:"16px" }}>
            <div style={{ fontSize:"20px", marginBottom:"4px" }}>{icon}</div>
            <div style={{ fontSize:"18px", fontWeight:800, color:col }}>{val}</div>
            <div style={{ fontSize:"11px", color:C.muted }}>{lbl}</div>
          </Card>
        ))}
      </div>

      {/* Modules */}
      <Title>ALL MODULES</Title>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"14px", marginBottom:"28px" }}>
        {modules.map(m => (
          <div key={m.id} onClick={()=>setTab(m.id)} style={{ background:C.card, border:`1px solid ${C.border}`, borderTop:`3px solid ${m.accent}`, borderRadius:"12px", padding:"20px", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor=m.accent;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderTopColor=m.accent;e.currentTarget.style.borderColor=C.border;e.currentTarget.style.borderTopColor=m.accent;}}>
            <div style={{ width:"40px", height:"40px", background:`${m.accent}22`, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", marginBottom:"12px" }}>{m.icon}</div>
            <div style={{ fontWeight:700, fontSize:"15px", marginBottom:"4px" }}>{m.label}</div>
            <div style={{ fontSize:"12px", color:C.muted, marginBottom:"12px" }}>{m.sub}</div>
            <span style={{ fontSize:"13px", color:m.accent, fontWeight:700 }}>Open →</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <Title>🏅 Your Badges</Title>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:"10px" }}>
        {BADGES.map(b => {
          const earned = progress.earnedBadges.includes(b.id);
          return (
            <Card key={b.id} style={{ textAlign:"center", opacity:earned?1:0.4, border:`1px solid ${earned?"#6366f1":C.border}`, padding:"14px" }}>
              <div style={{ fontSize:"24px" }}>{b.icon}</div>
              <div style={{ fontSize:"12px", fontWeight:700, marginTop:"6px", color:earned?C.text:C.muted }}>{b.name}</div>
              <div style={{ fontSize:"10px", color:C.muted, marginTop:"2px" }}>{b.desc}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────
function Practice({ progress, addXP, checkBadges, saveProgress }) {
  const [filter, setFilter]     = useState("All");
  const [lang, setLang]         = useState("JavaScript");
  const [sel, setSel]           = useState(null);
  const [code, setCode]         = useState("");
  const [hint, setHint]         = useState("");
  const [hintLoad, setHintLoad] = useState(false);
  const [review, setReview]     = useState("");
  const [revLoad, setRevLoad]   = useState(false);

  const filtered = filter === "All" ? PROBLEMS : PROBLEMS.filter(q => q.diff === filter);

  const getHint = async () => {
    if (!sel) return;
    setHintLoad(true); setHint("");
    const r = await ai([{ role:"user", content:`Give a helpful hint (NO full solution) for this ${lang} problem:\nTitle: ${sel.title}\n${sel.desc}` }]);
    setHint(r); setHintLoad(false);
  };

  const getReview = async () => {
    if (!code.trim() || !sel) return;
    setRevLoad(true); setReview("");
    const r = await ai([{ role:"user", content:`Review this ${lang} code for "${sel.title}":\n\`\`\`${lang}\n${code}\n\`\`\`\nGive: correctness, time/space complexity, improvements, edge cases.` }],
      "You are a senior software engineer. Give specific, constructive code review. Be educational.");
    setReview(r); setRevLoad(false);
  };

  const markSolved = () => {
    if (!sel) return;
    const ids = [...(progress.solvedIds || [])];
    if (!ids.includes(sel.id)) {
      ids.push(sel.id);
      addXP(50, { totalSolved: progress.totalSolved + 1, solvedIds: ids });
      alert("✅ Solved! +50 XP earned!");
    } else { alert("Already solved! Pick another problem."); }
  };

  return (
    <div style={{ display:"grid", gridTemplateColumns:sel?"1fr 1.4fr":"1fr", gap:"20px", alignItems:"start" }}>
      <div>
        <Title>💻 DSA Practice</Title>
        <p style={{ color:C.muted, fontSize:"13px", marginBottom:"16px" }}>Pure coding problems — no theory. AI hints + code review. All languages supported!</p>
        <div style={{ display:"flex", gap:"6px", marginBottom:"14px", flexWrap:"wrap", alignItems:"center" }}>
          {["All","Easy","Medium","Hard"].map(f => (
            <button key={f} onClick={()=>setFilter(f)} style={{ padding:"5px 14px", borderRadius:"999px", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:"12px", fontWeight:700, background:filter===f?(f==="All"?"#6366f1":diffColor(f)):"#1e293b", color:"#fff", opacity:filter===f?1:0.6 }}>{f}</button>
          ))}
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{ marginLeft:"auto", padding:"6px 10px", background:"#1e293b", border:`1px solid ${C.border}`, borderRadius:"8px", color:C.text, fontFamily:"inherit", fontSize:"12px" }}>
            {LANGUAGES.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        {filtered.map(q => {
          const solved = (progress.solvedIds || []).includes(q.id);
          return (
            <div key={q.id} onClick={()=>{ setSel(q); setCode(""); setHint(""); setReview(""); }}
              style={{ padding:"14px", borderRadius:"10px", marginBottom:"8px", border:`1px solid ${sel?.id===q.id?"#6366f1":C.border}`, background:sel?.id===q.id?"#1e1b4b":C.card, cursor:"pointer", transition:"all 0.15s" }}>
              <div style={{ fontWeight:600, fontSize:"14px", marginBottom:"6px", display:"flex", alignItems:"center", gap:"6px" }}>
                {solved && <span style={{ color:"#22c55e", fontSize:"12px" }}>✓</span>}
                {q.title}
              </div>
              <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                <span style={{ fontSize:"11px", fontWeight:700, color:diffColor(q.diff), background:`${diffColor(q.diff)}22`, padding:"2px 8px", borderRadius:"999px" }}>{q.diff}</span>
                {q.tags.map(t => <span key={t} style={{ fontSize:"11px", color:C.muted, background:"#1e293b", padding:"2px 8px", borderRadius:"999px" }}>{t}</span>)}
              </div>
            </div>
          );
        })}
      </div>

      {sel && (
        <div>
          <Card style={{ marginBottom:"14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"8px", marginBottom:"10px" }}>
              <h3 style={{ fontSize:"16px", fontWeight:800 }}>{sel.title}</h3>
              <span style={{ fontSize:"12px", fontWeight:700, color:diffColor(sel.diff) }}>{sel.diff}</span>
            </div>
            <p style={{ color:"#cbd5e1", fontSize:"14px", lineHeight:1.7, marginBottom:"10px" }}>{sel.desc}</p>
            <pre style={{ background:"#0f1117", padding:"12px", borderRadius:"8px", fontFamily:"monospace", fontSize:"12px", color:"#a5b4fc", overflowX:"auto", whiteSpace:"pre-wrap" }}>{sel.example}</pre>
          </Card>
          <Card>
            <div style={{ fontSize:"13px", color:C.muted, fontWeight:600, marginBottom:"6px" }}>Your {lang} Solution:</div>
            <Tarea value={code} onChange={e=>setCode(e.target.value)} placeholder={`// Write your ${lang} solution here...\n// Think about time & space complexity!`} rows={5} />
            <div style={{ display:"flex", gap:"8px", marginTop:"12px", flexWrap:"wrap" }}>
              <Btn onClick={getHint} disabled={hintLoad}>{hintLoad?"⏳ Thinking...":"💡 Get Hint"}</Btn>
              <Btn onClick={getReview} disabled={revLoad||!code.trim()} color="#8b5cf6">{revLoad?"⏳ Reviewing...":"🔍 AI Code Review"}</Btn>
              <Btn onClick={markSolved} color="#22c55e">✅ Mark Solved (+50 XP)</Btn>
            </div>
            {hint && <AIBox title="💡 AI Hint" content={hint} color="#6366f1" />}
            {review && <AIBox title="🔍 Code Review" content={review} color="#8b5cf6" />}
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── AI Questions ──────────────────────────────────────────────────────────────
function AIQuestions({ progress, addXP }) {
  const [diff, setDiff]     = useState("Medium");
  const [lang, setLang]     = useState("JavaScript");
  const [topic, setTopic]   = useState("Any");
  const [q, setQ]           = useState(null);
  const [loading, setLoad]  = useState(false);
  const [code, setCode]     = useState("");
  const topics = ["Any","Arrays","Strings","Trees","Graphs","Dynamic Programming","Sorting","Linked Lists","Stacks/Queues","Binary Search","Greedy","Backtracking","Math","Hashing"];

  const generate = async () => {
    setLoad(true); setQ(null); setCode("");
    const topicStr = topic === "Any" ? "any DSA topic" : topic;
    const raw = await ai(
      [{ role:"user", content:`Generate a unique ${diff} ${lang} coding problem on ${topicStr}.\n\nFormat strictly:\nTITLE: ...\nTAGS: tag1, tag2\nDESCRIPTION:\n(problem statement)\nEXAMPLE:\nInput: ...\nOutput: ...\nCONSTRAINTS:\n(constraints)` }],
      "You are a competitive programming expert. Generate original, practical CODING problems only — no theory. Make them realistic and educational. Use the exact format given."
    );
    const lines = raw.split('\n');
    const getLine = (prefix) => lines.find(l => l.startsWith(prefix))?.replace(prefix, "").trim() || "";
    const getBlock = (start, end) => {
      const si = lines.findIndex(l => l.startsWith(start));
      if (si === -1) return "";
      const ei = lines.findIndex((l, i) => i > si && l.startsWith(end));
      return lines.slice(si + 1, ei === -1 ? undefined : ei).join('\n').trim();
    };
    setQ({ title:getLine("TITLE:"), tags:getLine("TAGS:").split(',').map(t=>t.trim()), diff, desc:getBlock("DESCRIPTION:","EXAMPLE:"), example:getBlock("EXAMPLE:","CONSTRAINTS:"), constraints:getBlock("CONSTRAINTS:","~~~") });
    setLoad(false);
  };

  return (
    <div>
      <Title>🤖 AI-Generated Questions</Title>
      <p style={{ color:C.muted, fontSize:"13px", marginBottom:"20px" }}>Unlimited unique coding problems — Basic to Advanced, any language, any topic!</p>
      <Card style={{ marginBottom:"20px" }}>
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"flex-end" }}>
          {[["Difficulty",diff,setDiff,["Easy","Medium","Hard"]],["Language",lang,setLang,LANGUAGES],["Topic",topic,setTopic,topics]].map(([lbl,val,set,opts]) => (
            <div key={lbl}>
              <div style={{ fontSize:"11px", color:C.muted, marginBottom:"4px", fontWeight:600 }}>{lbl}</div>
              <select value={val} onChange={e=>set(e.target.value)} style={{ padding:"8px 12px", background:"#0f1117", border:`1px solid ${C.border}`, borderRadius:"8px", color:C.text, fontFamily:"inherit", fontSize:"13px" }}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <Btn onClick={generate} disabled={loading}>{loading ? "⏳ Generating..." : "⚡ Generate New Question"}</Btn>
        </div>
      </Card>

      {loading && <div style={{ textAlign:"center", padding:"60px", color:"#6366f1" }}><div style={{ fontSize:"44px", animation:"pulse 1s infinite" }}>⚙️</div><p style={{ marginTop:"14px" }}>AI is crafting a unique problem for you...</p></div>}

      {q && !loading && (
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"8px", marginBottom:"10px" }}>
            <h3 style={{ fontSize:"17px", fontWeight:800 }}>{q.title}</h3>
            <span style={{ fontSize:"12px", fontWeight:700, color:diffColor(q.diff) }}>{q.diff}</span>
          </div>
          <div style={{ marginBottom:"12px" }}>
            {q.tags?.filter(Boolean).map(t => <span key={t} style={{ fontSize:"11px", background:"#1e293b", color:"#818cf8", padding:"2px 10px", borderRadius:"999px", marginRight:"6px", display:"inline-block", marginBottom:"4px" }}>{t}</span>)}
          </div>
          <p style={{ color:"#cbd5e1", fontSize:"14px", lineHeight:1.7, marginBottom:"12px" }}>{q.desc}</p>
          {q.example && <pre style={{ background:"#0f1117", padding:"12px", borderRadius:"8px", fontFamily:"monospace", fontSize:"12px", color:"#86efac", overflowX:"auto", whiteSpace:"pre-wrap", marginBottom:"12px" }}>{q.example}</pre>}
          {q.constraints && <p style={{ fontSize:"12px", color:C.muted, marginBottom:"16px" }}><b style={{ color:C.text }}>Constraints:</b> {q.constraints}</p>}
          <Tarea value={code} onChange={e=>setCode(e.target.value)} placeholder={`// Solve in ${lang}...`} rows={5} />
          <Btn onClick={()=>{ addXP(50,{totalSolved:progress.totalSolved+1}); alert("✅ +50 XP!"); }} color="#22c55e" style={{ marginTop:"12px" }}>✅ Mark Solved (+50 XP)</Btn>
        </Card>
      )}

      {!q && !loading && (
        <div style={{ textAlign:"center", padding:"80px 20px", color:C.muted }}>
          <div style={{ fontSize:"56px", marginBottom:"16px" }}>🤖</div>
          <p style={{ fontSize:"16px" }}>Click "Generate New Question" for unlimited AI coding problems!</p>
        </div>
      )}
    </div>
  );
}

// ─── Interview ────────────────────────────────────────────────────────────────
function Interview({ progress, addXP }) {
  const [mode, setMode]       = useState("general");
  const [sel, setSel]         = useState(null);
  const [answer, setAnswer]   = useState("");
  const [resumeTxt, setRT]    = useState("");
  const [feedback, setFB]     = useState("");
  const [loading, setLoad]    = useState(false);
  const [catF, setCatF]       = useState("All");
  const cats = ["All", ...new Set(IQ.map(q => q.cat))];

  const getFeedback = async () => {
    if (!sel) return;
    setLoad(true); setFB("");
    const r = await ai([{ role:"user", content:`Interview Question: ${sel.q}\n\nCandidate's Answer: ${answer}\n\nProvide:\n1. What's good\n2. What's missing\n3. Ideal answer outline\n4. Score out of 10` }],
      "You are a senior technical interviewer at a top tech company. Give honest, specific, constructive feedback. Be encouraging but accurate.");
    setFB(r);
    addXP(30, { interviewAnswered: progress.interviewAnswered + 1 });
    setLoad(false);
  };

  const fromResume = async () => {
    if (!sel || !resumeTxt.trim()) return;
    setLoad(true); setFB("");
    const r = await ai([{ role:"user", content:`Based on this resume:\n---\n${resumeTxt}\n---\n\nGenerate a strong STAR-format answer for:\n"${sel.q}"\n\nUse specific examples from the candidate's actual experience.` }],
      "You are a career coach helping candidates prepare using their resume. Generate specific, compelling answers.");
    setFB(r);
    addXP(20, { interviewAnswered: progress.interviewAnswered + 1 });
    setLoad(false);
  };

  const filtered = catF === "All" ? IQ : IQ.filter(q => q.cat === catF);

  return (
    <div>
      <Title>🧠 Interview Preparation</Title>
      <div style={{ display:"flex", gap:"8px", marginBottom:"20px", flexWrap:"wrap" }}>
        <Btn onClick={()=>setMode("general")} color={mode==="general"?C.accent:"#1e293b"}>📋 General Questions</Btn>
        <Btn onClick={()=>setMode("resume")}  color={mode==="resume"?"#8b5cf6":"#1e293b"}>📄 Resume-Based Answers</Btn>
      </div>

      {mode === "resume" && (
        <Card style={{ marginBottom:"20px" }}>
          <div style={{ fontSize:"13px", color:C.muted, fontWeight:600, marginBottom:"8px" }}>Paste your resume — AI will generate answers from YOUR experience:</div>
          <Tarea value={resumeTxt} onChange={e=>setRT(e.target.value)} placeholder="Paste your resume content here..." rows={4} />
        </Card>
      )}

      <div style={{ display:"flex", gap:"6px", marginBottom:"16px", flexWrap:"wrap" }}>
        {cats.map(c => <button key={c} onClick={()=>setCatF(c)} style={{ padding:"5px 12px", borderRadius:"999px", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:"12px", fontWeight:700, background:catF===c?(catColors[c]||C.accent):"#1e293b", color:"#fff", opacity:catF===c?1:0.6 }}>{c}</button>)}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"12px", marginBottom:"20px" }}>
        {filtered.map(q => (
          <div key={q.id} onClick={()=>{ setSel(q); setAnswer(""); setFB(""); }}
            style={{ padding:"16px", borderRadius:"12px", border:`1px solid ${sel?.id===q.id?"#6366f1":C.border}`, background:sel?.id===q.id?"#1e1b4b":C.card, cursor:"pointer", transition:"all 0.15s" }}>
            <span style={{ fontSize:"11px", fontWeight:700, color:catColors[q.cat]||"#64748b", background:`${catColors[q.cat]||"#64748b"}22`, padding:"3px 10px", borderRadius:"999px" }}>{q.cat}</span>
            <p style={{ fontSize:"14px", color:"#cbd5e1", marginTop:"10px", lineHeight:1.6 }}>{q.q}</p>
            <p style={{ fontSize:"11px", color:C.muted, marginTop:"6px" }}>💡 {q.hint}</p>
          </div>
        ))}
      </div>

      {sel && (
        <Card>
          <h3 style={{ fontSize:"14px", fontWeight:700, color:"#a5b4fc", marginBottom:"14px" }}>Selected: {sel.q}</h3>
          {mode === "general" ? (
            <>
              <Tarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer here... (Use STAR method for HR questions)" rows={4} />
              <Btn onClick={getFeedback} disabled={loading||!answer.trim()} style={{ marginTop:"12px" }}>{loading?"⏳ Getting feedback...":"🤖 Get AI Feedback (+30 XP)"}</Btn>
            </>
          ) : (
            <Btn onClick={fromResume} disabled={loading||!resumeTxt.trim()} color="#8b5cf6">{loading?"⏳ Generating...":"✨ Generate Answer from My Resume (+20 XP)"}</Btn>
          )}
          {feedback && <AIBox title="🎯 AI Feedback" content={feedback} color="#6366f1" />}
        </Card>
      )}
    </div>
  );
}

// ─── ATS Score ────────────────────────────────────────────────────────────────
function ATSScore({ progress, addXP, checkBadges, saveProgress }) {
  const [resumeTxt, setRT] = useState("");
  const [jobDesc, setJD]   = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoad] = useState(false);

  const analyze = async () => {
    if (!resumeTxt.trim()) return;
    setLoad(true); setResult(null);
    const r = await ai(
      [{ role:"user", content:`Analyze this resume for ATS compatibility${jobDesc?` against this job description:\n\n${jobDesc}\n\n`:" "}\nResume:\n${resumeTxt}\n\nReturn ONLY valid JSON (no markdown):\n{"score":85,"matched":["Python","React"],"missing":["Docker"],"formatting":["Issue 1"],"improvements":["Tip 1"],"sections":{"experience":80,"skills":90,"education":85}}` }],
      "You are an expert ATS analyzer. Return only valid JSON. No explanation, no markdown."
    );
    try {
      const parsed = JSON.parse(r.replace(/```json|```/g,"").trim());
      setResult(parsed);
      const p = checkBadges({ ...progress, atsScore: parsed.score });
      addXP(20, { atsScore: parsed.score });
    } catch {
      setResult({ score:68, matched:["Could not parse details"], missing:[], formatting:[], improvements:["Try pasting cleaner resume text"] });
    }
    setLoad(false);
  };

  const sc = result?.score || 0;
  const scCol = sc>=80?"#22c55e":sc>=60?"#f97316":"#ef4444";

  return (
    <div>
      <Title>📊 ATS Score Checker</Title>
      <p style={{ color:C.muted, fontSize:"13px", marginBottom:"20px" }}>Check how well your resume matches job requirements and optimize for Applicant Tracking Systems.</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
        <Card>
          <div style={{ fontSize:"13px", fontWeight:700, color:C.muted, marginBottom:"8px" }}>📄 Your Resume Text *</div>
          <Tarea value={resumeTxt} onChange={e=>setRT(e.target.value)} placeholder="Paste your resume content here..." rows={7} />
        </Card>
        <Card>
          <div style={{ fontSize:"13px", fontWeight:700, color:C.muted, marginBottom:"8px" }}>🎯 Job Description (Optional — for better match)</div>
          <Tarea value={jobDesc} onChange={e=>setJD(e.target.value)} placeholder="Paste job description to check keyword match..." rows={7} />
        </Card>
      </div>
      <Btn onClick={analyze} disabled={loading||!resumeTxt.trim()} style={{ marginBottom:"24px" }}>{loading?"⏳ Analyzing...":"📊 Analyze ATS Score"}</Btn>

      {result && (
        <div>
          <Card style={{ marginBottom:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"24px", flexWrap:"wrap" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"60px", fontWeight:900, color:scCol, lineHeight:1 }}>{sc}</div>
                <div style={{ fontSize:"13px", color:C.muted }}>ATS Score /100</div>
              </div>
              <div style={{ flex:1, minWidth:"180px" }}>
                <div style={{ background:"#1e293b", borderRadius:"999px", height:"14px", overflow:"hidden", marginBottom:"10px" }}>
                  <div style={{ width:`${sc}%`, height:"100%", background:`linear-gradient(90deg,${scCol},${scCol}88)`, borderRadius:"999px", transition:"width 1s" }} />
                </div>
                <div style={{ fontSize:"15px", fontWeight:700, color:scCol }}>
                  {sc>=80?"✅ ATS Optimized!":sc>=60?"⚠️ Needs Improvement":"❌ Major Issues Found"}
                </div>
                {result.sections && (
                  <div style={{ marginTop:"10px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
                    {Object.entries(result.sections).map(([k,v])=>(
                      <div key={k} style={{ fontSize:"12px", color:C.muted }}>{k}: <b style={{ color:C.text }}>{v}</b></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:"14px" }}>
            {result.matched?.length > 0 && (
              <Card>
                <div style={{ fontWeight:700, color:"#22c55e", marginBottom:"10px" }}>✅ Matched Keywords ({result.matched.length})</div>
                {result.matched.map(k => <span key={k} style={{ display:"inline-block", background:"#14532d", color:"#86efac", padding:"3px 10px", borderRadius:"999px", fontSize:"12px", margin:"3px" }}>{k}</span>)}
              </Card>
            )}
            {result.missing?.length > 0 && (
              <Card>
                <div style={{ fontWeight:700, color:"#ef4444", marginBottom:"10px" }}>❌ Missing Keywords ({result.missing.length})</div>
                {result.missing.map(k => <span key={k} style={{ display:"inline-block", background:"#450a0a", color:"#fca5a5", padding:"3px 10px", borderRadius:"999px", fontSize:"12px", margin:"3px" }}>{k}</span>)}
              </Card>
            )}
            {result.improvements?.length > 0 && (
              <Card style={{ gridColumn:"1/-1" }}>
                <div style={{ fontWeight:700, color:"#f97316", marginBottom:"10px" }}>💡 Improvement Suggestions</div>
                {result.improvements.map((imp,i) => <div key={i} style={{ padding:"8px 0", borderBottom:`1px solid ${C.border}`, color:"#cbd5e1", fontSize:"14px" }}>• {imp}</div>)}
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Resume Builder ────────────────────────────────────────────────────────────
function ResumeBuilder({ progress, addXP, checkBadges, saveProgress }) {
  const [data, setData]       = useState({ name:"",email:"",phone:"",linkedin:"",github:"",college:"",degree:"",year:"",skills:"",experience:"",projects:"",achievements:"" });
  const [result, setResult]   = useState("");
  const [loading, setLoad]    = useState(false);
  const [company, setCo]      = useState("");
  const [tailored, setTail]   = useState("");
  const [tLoad, setTLoad]     = useState(false);
  const [rText, setRT]        = useState("");
  const [analysis, setAna]    = useState("");
  const [aLoad, setALoad]     = useState(false);

  const upd = (k, v) => setData(d => ({ ...d, [k]: v }));

  const generate = async () => {
    setLoad(true); setResult("");
    const r = await ai(
      [{ role:"user", content:`Generate a professional ATS-friendly LaTeX resume for:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nLinkedIn: ${data.linkedin}\nGitHub: ${data.github}\nCollege: ${data.college}\nDegree: ${data.degree} (${data.year})\nSkills: ${data.skills}\nExperience:\n${data.experience}\nProjects:\n${data.projects}\nAchievements:\n${data.achievements}\n\nGenerate complete, compilable LaTeX code. ATS-optimized. Professional layout.` }],
      "Expert resume writer. Output ONLY the LaTeX code. No explanation, no markdown."
    );
    setResult(r);
    const p = checkBadges({ ...progress, resumeBuilt: true });
    addXP(100, { resumeBuilt: true });
    setLoad(false);
  };

  const tailor = async () => {
    if (!company || !result) return;
    setTLoad(true); setTail("");
    const r = await ai([{ role:"user", content:`Tailor this resume for ${company}. Emphasize relevant skills, rewrite bullet points with ${company}-specific keywords, match their engineering culture and tech stack.\n\nResume:\n${result}` }],
      "Expert resume tailor. Optimize for specific company. Keep LaTeX format. Make targeted, impactful changes.");
    setTail(r); setTLoad(false);
  };

  const analyzeResume = async () => {
    if (!rText.trim()) return;
    setALoad(true); setAna("");
    const r = await ai([{ role:"user", content:`Analyze this resume in detail:\n${rText}\n\nCover: strengths, weaknesses, missing sections, impact statements, quantification, ATS compatibility, score out of 10, top 3 improvements.` }],
      "Expert resume reviewer. Specific, actionable feedback. Honest but constructive.");
    setAna(r); setALoad(false);
  };

  const dl = (content, filename) => { const b = new Blob([content], {type:"text/plain"}); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = filename; a.click(); };

  return (
    <div>
      <Title>📄 Resume Builder & Analyzer</Title>

      {/* AI Generator */}
      <Card style={{ marginBottom:"20px" }}>
        <h3 style={{ fontSize:"15px", fontWeight:700, color:"#a5b4fc", marginBottom:"16px" }}>✨ AI Resume Generator (LaTeX / Overleaf)</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:"12px", marginBottom:"14px" }}>
          {[["name","Full Name","Rahul Sharma"],["email","Email","rahul@gmail.com"],["phone","Phone","+91 9876543210"],["linkedin","LinkedIn","linkedin.com/in/rahul"],["github","GitHub","github.com/rahul"],["college","College","IIT Delhi"],["degree","Degree","B.Tech CS"],["year","Grad Year","2025"]].map(([k,lbl,ph])=>(
            <div key={k}>
              <div style={{ fontSize:"12px", color:C.muted, marginBottom:"4px" }}>{lbl}</div>
              <input value={data[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} style={{ width:"100%", padding:"9px 12px", background:"#0f1117", border:`1px solid ${C.border}`, borderRadius:"8px", color:C.text, fontFamily:"inherit", fontSize:"13px", outline:"none", boxSizing:"border-box" }} />
            </div>
          ))}
        </div>
        {[["skills","Technical Skills (comma-separated)","Python, React, Node.js, SQL, Git, Docker, AWS",2],["experience","Work Experience","Company | Role | Jun-Aug 2024\n- Built X that improved Y by 40%\n- Implemented Z resulting in W",3],["projects","Projects","ProjectName | React, Node.js | github.com/project\n- Built full-stack platform for 500+ users\n- Integrated Claude AI for personalized hints",3],["achievements","Achievements","- LeetCode: 400+ problems solved, Top 5%\n- Winner: HackIndia 2024 (300+ teams)",2]].map(([k,lbl,ph,rows])=>(
          <div key={k} style={{ marginBottom:"12px" }}>
            <div style={{ fontSize:"12px", color:C.muted, marginBottom:"4px" }}>{lbl}</div>
            <Tarea value={data[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} rows={rows} />
          </div>
        ))}
        <Btn onClick={generate} disabled={loading}>{loading?"⏳ Generating...":"✨ Generate LaTeX Resume (+100 XP)"}</Btn>
      </Card>

      {result && (
        <Card style={{ marginBottom:"20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px", flexWrap:"wrap", gap:"8px" }}>
            <h3 style={{ fontSize:"15px", fontWeight:700, color:"#86efac" }}>✅ Your LaTeX Resume</h3>
            <Btn onClick={()=>dl(result,"resume.tex")} color="#22c55e">⬇️ Download .tex</Btn>
          </div>
          <Tarea value={result} readOnly rows={8} />
          <p style={{ color:C.muted, fontSize:"12px", marginTop:"8px" }}>
            📋 Copy → Paste in <a href="https://overleaf.com" target="_blank" rel="noreferrer" style={{ color:"#818cf8" }}>Overleaf.com</a> → Compile to PDF
          </p>
          {/* Company tailor */}
          <div style={{ marginTop:"16px", padding:"16px", background:"#0f1117", borderRadius:"10px", border:`1px solid ${C.border}` }}>
            <h4 style={{ fontSize:"14px", fontWeight:700, color:"#f97316", marginBottom:"12px" }}>🎯 Tailor for a Specific Company</h4>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              <input value={company} onChange={e=>setCo(e.target.value)} placeholder="e.g. Google, Amazon, Microsoft, startup name..." style={{ flex:1, padding:"9px 12px", background:C.card, border:`1px solid ${C.border}`, borderRadius:"8px", color:C.text, fontFamily:"inherit", fontSize:"13px", outline:"none", minWidth:"160px" }} />
              <Btn onClick={tailor} disabled={tLoad||!company} color="#f97316">{tLoad?"⏳ Tailoring...":"🤖 Tailor with AI"}</Btn>
            </div>
            {tailored && (
              <>
                <Tarea value={tailored} readOnly rows={6} />
                <Btn onClick={()=>dl(tailored,`resume_${company}.tex`)} color="#22c55e" style={{ marginTop:"10px" }}>⬇️ Download {company} Version</Btn>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Template */}
      <Card style={{ marginBottom:"20px" }}>
        <h3 style={{ fontSize:"15px", fontWeight:700, marginBottom:"8px", color:"#a5b4fc" }}>📋 Quick LaTeX Template</h3>
        <p style={{ color:C.muted, fontSize:"13px", marginBottom:"12px" }}>Ready-to-edit Overleaf template — just fill in your details:</p>
        <Btn onClick={()=>dl(LATEX_TEMPLATE,"resume_template.tex")} color="#374151">⬇️ Download Template</Btn>
      </Card>

      {/* Analyzer */}
      <Card>
        <h3 style={{ fontSize:"15px", fontWeight:700, marginBottom:"12px", color:"#f97316" }}>🔍 Paste & Analyze Resume</h3>
        <Tarea value={rText} onChange={e=>setRT(e.target.value)} placeholder="Paste your resume text for detailed AI analysis..." rows={5} />
        <Btn onClick={analyzeResume} disabled={aLoad||!rText.trim()} color="#f97316" style={{ marginTop:"12px" }}>{aLoad?"⏳ Analyzing...":"🔍 Analyze Resume"}</Btn>
        {analysis && <AIBox title="📊 Resume Analysis" content={analysis} color="#f97316" />}
      </Card>
    </div>
  );
}

// ─── Study ────────────────────────────────────────────────────────────────────
function Study() {
  return (
    <div>
      <Title>📚 Study Resources</Title>
      <p style={{ color:C.muted, fontSize:"13px", marginBottom:"20px" }}>Best learning resources handpicked for placement prep. Click to open in a new tab.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:"14px" }}>
        {RESOURCES.map(r => (
          <a key={r.name} href={r.url} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:"14px", padding:"18px", background:C.card, border:`1px solid ${C.border}`, borderRadius:"14px", color:C.text, transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=r.color}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{ width:"44px", height:"44px", background:`${r.color}22`, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>{r.icon}</div>
            <div>
              <div style={{ fontWeight:700, color:r.color, marginBottom:"2px" }}>{r.name}</div>
              <div style={{ fontSize:"12px", color:C.muted }}>{r.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Chatbot ──────────────────────────────────────────────────────────────────
function Chatbot() {
  const [msgs, setMsgs]   = useState([{ role:"assistant", content:"👋 Namaste! Main DevForge AI hoon.\n\nDSA doubts, system design, debugging, resume tips, career advice — kuch bhi pucho! Hinglish mein baat kar sakte ho. 🚀\n\nMain tumhara placement journey mein help karunga!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoad] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role:"user", content:input };
    setMsgs(m => [...m, userMsg]); setInput(""); setLoad(true);
    try {
      const r = await ai(
        [...msgs, userMsg].map(m => ({ role:m.role, content:m.content })),
        "You are DevForge AI — a friendly, expert coding mentor and placement coach. Help with DSA, algorithms, system design, debugging, resume tips, career advice, and interview preparation. Be concise but thorough. Use examples and code snippets (in code blocks) when helpful. Respond in Hinglish (natural mix of Hindi and English) when the user writes in Hindi or Hinglish. Be encouraging, supportive, and conversational. Format code with triple backticks."
      );
      setMsgs(m => [...m, { role:"assistant", content:r }]);
    } catch { setMsgs(m => [...m, { role:"assistant", content:"Oops! Thoda error aa gaya. Dobara try karo!" }]); }
    setLoad(false);
  };

  const suggestions = ["Binary Search kya hai?","DP problems kaise approach karein?","Resume tips for freshers","System design kaise prepare karein?","FAANG crack karne ka roadmap","Time complexity explain karo","JavaScript async/await explain karo"];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 130px)" }}>
      <Title>💬 DevForge AI Assistant</Title>
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:"12px", marginBottom:"14px", paddingRight:"4px" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", alignItems:"flex-end", gap:"8px" }}>
            {m.role === "assistant" && <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", flexShrink:0 }}>⚡</div>}
            <div style={{ padding:"12px 16px", borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background:m.role==="user"?"linear-gradient(135deg,#6366f1,#8b5cf6)":"#1e293b", color:"#fff", maxWidth:"78%", fontSize:"14px", lineHeight:1.7, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:"8px" }}>
            <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px" }}>⚡</div>
            <div style={{ padding:"12px 16px", borderRadius:"16px 16px 16px 4px", background:"#1e293b", color:"#818cf8" }}>⏳ Soch raha hoon...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"10px" }}>
        {suggestions.map(s => <button key={s} onClick={()=>setInput(s)} style={{ padding:"5px 12px", background:"#1e293b", border:`1px solid ${C.border}`, borderRadius:"999px", color:C.muted, fontSize:"12px", cursor:"pointer", fontFamily:"inherit" }}>{s}</button>)}
      </div>
      <div style={{ display:"flex", gap:"10px" }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Kuch bhi pucho — DSA, debugging, career advice, Hinglish mein..." style={{ flex:1, padding:"12px 16px", background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", color:C.text, fontFamily:"inherit", fontSize:"14px", outline:"none" }} />
        <Btn onClick={send} disabled={loading} style={{ padding:"12px 22px" }}>Send →</Btn>
      </div>
    </div>
  );
}

// ─── External Site (LeetCode / HackerRank) ────────────────────────────────────
function ExternalSite({ url, name, color, links, progress, field, addXP, checkBadges, saveProgress }) {
  const val = progress[field] || 0;
  const [inp, setInp] = useState(val);

  const save = () => {
    const p = checkBadges({ ...progress, [field]: inp });
    addXP(0, { [field]: inp });
    alert(`✅ ${name} progress saved: ${inp} problems!`);
  };

  return (
    <div>
      <Title style={{ color }}>🔗 {name}</Title>
      <Card style={{ marginBottom:"16px" }}>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"18px" }}>
          {links.map(([lbl, href]) => (
            <a key={lbl} href={href} target="_blank" rel="noreferrer" style={{ padding:"10px 18px", borderRadius:"8px", background:`linear-gradient(135deg,${color},${color}99)`, color:"#fff", fontWeight:700, fontSize:"13px" }}>{lbl} ↗</a>
          ))}
        </div>
        <div style={{ background:"#0f1117", padding:"16px", borderRadius:"10px", border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:"13px", fontWeight:700, color:C.muted, marginBottom:"10px" }}>📊 Track My {name} Progress</div>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
            <span style={{ color:C.muted, fontSize:"13px" }}>Problems solved:</span>
            <input type="number" min="0" value={inp} onChange={e=>setInp(Number(e.target.value))} style={{ width:"80px", padding:"8px 10px", background:C.card, border:`1px solid ${C.border}`, borderRadius:"8px", color:C.text, fontFamily:"inherit", fontSize:"14px", outline:"none", textAlign:"center" }} />
            <Btn onClick={save} color={color}>Save</Btn>
          </div>
          <div style={{ marginTop:"12px", background:"#1e293b", borderRadius:"999px", height:"8px", overflow:"hidden" }}>
            <div style={{ width:`${Math.min(val,500)/5}%`, height:"100%", background:`linear-gradient(90deg,${color},${color}88)`, borderRadius:"999px" }} />
          </div>
          <div style={{ fontSize:"12px", color:C.muted, marginTop:"6px" }}>{val} / 500+ problems solved</div>
        </div>
      </Card>
      <Card>
        <div style={{ fontSize:"13px", color:C.muted, marginBottom:"12px" }}>Live access to {name}:</div>
        <iframe src={url} style={{ width:"100%", height:"600px", border:"none", borderRadius:"10px", background:"#fff" }} title={name} sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation" loading="lazy" />
      </Card>
    </div>
  );
}