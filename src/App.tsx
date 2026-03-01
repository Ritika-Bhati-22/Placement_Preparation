import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════
const LANGS = ["JavaScript","Python","C++","Java","C","Go","Rust","TypeScript","Ruby","Swift","Kotlin","PHP","C#","Scala","R"];

const BADGES = [
  {id:"first_solve", name:"First Blood",    icon:"🩸", desc:"Solve your first problem"},
  {id:"streak_3",    name:"On Fire",         icon:"🔥", desc:"3-day streak"},
  {id:"streak_7",    name:"Week Warrior",    icon:"⚔️",  desc:"7-day streak"},
  {id:"streak_30",   name:"Legend",          icon:"👑", desc:"30-day streak"},
  {id:"solve_10",    name:"Tenacious",       icon:"💪", desc:"Solve 10 problems"},
  {id:"solve_50",    name:"Grinder",         icon:"⚙️",  desc:"Solve 50 problems"},
  {id:"solve_100",   name:"Century",         icon:"💎", desc:"Solve 100 problems"},
  {id:"interview_5", name:"Interview Ready", icon:"🎯", desc:"Answer 5 interview Qs"},
  {id:"ats_80",      name:"ATS Champion",    icon:"📊", desc:"ATS score ≥80"},
  {id:"resume_done", name:"Resume Pro",      icon:"📄", desc:"Built first resume"},
  {id:"course_5",    name:"Scholar",         icon:"🎓", desc:"5 course topics done"},
];

const PROBLEMS = [
  {id:1, title:"Two Sum",                       tags:["Array","Hash Map"],       diff:"Easy",   desc:"Return indices of two numbers that add up to target.", example:"Input: nums=[2,7,11,15], target=9\nOutput: [0,1]"},
  {id:2, title:"Valid Parentheses",             tags:["Stack","String"],         diff:"Easy",   desc:"Determine if bracket string is valid.", example:"Input: '()[]{}'\nOutput: true"},
  {id:3, title:"Best Time to Buy/Sell Stock",   tags:["Array","Greedy"],         diff:"Easy",   desc:"Find max profit with one buy and one sell.", example:"Input: [7,1,5,3,6,4]\nOutput: 5"},
  {id:4, title:"Longest Substring No Repeats",  tags:["Sliding Window"],         diff:"Medium", desc:"Length of longest substring without repeating chars.", example:"Input: 'abcabcbb'\nOutput: 3"},
  {id:5, title:"Merge Intervals",               tags:["Array","Sorting"],        diff:"Medium", desc:"Merge all overlapping intervals.", example:"Input: [[1,3],[2,6],[8,10]]\nOutput: [[1,6],[8,10]]"},
  {id:6, title:"Binary Tree Level Order",       tags:["BFS","Tree"],             diff:"Medium", desc:"Level-order traversal of binary tree.", example:"Input: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]"},
  {id:7, title:"Coin Change",                   tags:["DP"],                     diff:"Medium", desc:"Fewest coins to make amount. -1 if impossible.", example:"Input: coins=[1,5,11], amount=11\nOutput: 3"},
  {id:8, title:"Median of Two Sorted Arrays",   tags:["Binary Search"],          diff:"Hard",   desc:"Find median in O(log(m+n)).", example:"Input: [1,3],[2]\nOutput: 2.0"},
  {id:9, title:"Trapping Rain Water",           tags:["Two Pointers","Stack"],   diff:"Hard",   desc:"Compute water trapped between bars.", example:"Input: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6"},
];

const BTECH_QUESTIONS = [
  {id:1,  sub:"OS",   q:"Explain FCFS, SJF, Round Robin scheduling algorithms.",         hint:"Compare fairness, turnaround, CPU utilization"},
  {id:2,  sub:"OS",   q:"What is deadlock? Explain 4 conditions and prevention.",         hint:"Mutual exclusion, Hold&Wait, No preemption, Circular wait"},
  {id:3,  sub:"DBMS", q:"Explain normalization: 1NF, 2NF, 3NF, BCNF with examples.",    hint:"Each form reduces a specific redundancy"},
  {id:4,  sub:"DBMS", q:"Difference between SQL JOIN types with examples.",               hint:"INNER, LEFT, RIGHT, FULL OUTER"},
  {id:5,  sub:"CN",   q:"Explain TCP vs UDP — when would you use each?",                 hint:"Reliability, ordering, connection overhead"},
  {id:6,  sub:"CN",   q:"What is OSI model? Explain all 7 layers.",                      hint:"Physical, DataLink, Network, Transport, Session, Presentation, Application"},
  {id:7,  sub:"OOP",  q:"Explain the 4 pillars of OOP with real-world examples.",        hint:"Encapsulation, Abstraction, Inheritance, Polymorphism"},
  {id:8,  sub:"OOP",  q:"Difference between abstract class and interface?",              hint:"Implementation, instantiation, multiple inheritance"},
  {id:9,  sub:"DSA",  q:"Explain Big-O notation. Give examples for O(1), O(n), O(n²).", hint:"Time vs space, best/worst/avg case"},
  {id:10, sub:"DSA",  q:"When to use HashMap vs TreeMap vs LinkedHashMap?",             hint:"Ordering, time complexity, use-cases"},
  {id:11, sub:"CN",   q:"What happens when you type google.com in browser?",             hint:"DNS→TCP→HTTP/TLS→Server→Render"},
  {id:12, sub:"DBMS", q:"What is indexing? Types of indexes?",                           hint:"B-tree, Hash, Clustered vs Non-clustered"},
];

const TOPICS_BY_LANG = {
  "JavaScript": ["Variables & Scope","Functions & Closures","Promises & Async/Await","DOM Manipulation","Event Loop","ES6+ Features","Prototypes & Classes","Error Handling","Fetch API","Modules"],
  "Python":     ["Variables & Data Types","Functions & Lambda","List Comprehensions","OOP in Python","Decorators","File I/O","Error Handling","Generators","Async Python","Standard Library"],
  "C++":        ["Pointers & References","Memory Management","STL Containers","Templates","OOP Concepts","Operator Overloading","Lambdas","Smart Pointers","Concurrency","Algorithms"],
  "Java":       ["JVM Architecture","OOP in Java","Collections Framework","Exception Handling","Generics","Multithreading","Streams API","Design Patterns","Spring Boot Basics","JUnit Testing"],
  "DSA":        ["Arrays & Strings","Linked Lists","Stacks & Queues","Trees & BST","Graphs & BFS/DFS","Sorting Algorithms","Binary Search","Dynamic Programming","Greedy Algorithms","Backtracking"],
  "System Design": ["Load Balancing","DB Sharding","Caching Strategies","CAP Theorem","Microservices","API Design","Message Queues","Rate Limiting","Consistent Hashing","Distributed Systems"],
  "Web Dev":    ["HTML5 Semantics","CSS Flexbox & Grid","Responsive Design","JavaScript DOM","React Basics","Node.js & Express","REST APIs","SQL/NoSQL","Auth & JWT","Deployment"],
};

const LATEX_TEMPLATE = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym,fullpage,titlesec,hyperref,fancyhdr,tabularx,enumitem,xcolor}
\\pagestyle{fancy}\\fancyhf{}\\fancyfoot{}\\renewcommand{\\headrulewidth}{0pt}
\\urlstyle{same}\\raggedbottom\\raggedright\\setlength{\\tabcolsep}{0in}
\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large}{}{0em}{}[\\color{black}\\titlerule\\vspace{-5pt}]
\\begin{document}
\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
  \\textbf{\\Large YOUR NAME} & Email: you@email.com \\\\
  LinkedIn: linkedin.com/in/you & GitHub: github.com/you \\\\
\\end{tabular*}
\\section{Education}\\textbf{Your University} \\hfill City \\\\
\\textit{B.Tech CS} \\hfill \\textit{2021--2025} \\\\ CGPA: 8.5/10
\\section{Skills}\\textbf{Languages:} Python, JS, C++ \\\\ \\textbf{Frameworks:} React, Node.js \\\\ \\textbf{Tools:} Git, Docker
\\section{Projects}\\textbf{Project} \\hfill \\textit{React, Node.js}\\\\\\begin{itemize}[leftmargin=*]\\item Built X improved Y by Z\\%\\end{itemize}
\\section{Experience}\\textbf{Company} \\hfill \\textit{Jun--Aug 2024}\\\\\\textit{SDE Intern}\\begin{itemize}[leftmargin=*]\\item Developed X using Y\\end{itemize}
\\section{Achievements}\\begin{itemize}[leftmargin=*]\\item Achievement\\end{itemize}
\\end{document}`;

// ═══════════════════════════════════════════════════
//  AI
// ═══════════════════════════════════════════════════
async function callAI(messages, system = "") {
  const body = { model: "claude-sonnet-4-20250514", max_tokens: 1200, messages };
  if (system) body.system = system;
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
  });
  const d = await r.json();
  return d.content?.map(b => b.text || "").join("") || "Error. Please try again.";
}

// ═══════════════════════════════════════════════════
//  STORAGE
// ═══════════════════════════════════════════════════
const SU = u => { try { localStorage.setItem("df3", JSON.stringify(u)); } catch {} };
const LU = () => { try { return JSON.parse(localStorage.getItem("df3") || "{}"); } catch { return {}; } };
const DP = () => ({
  streak:0, lastActive:"", totalSolved:0, interviewAnswered:0, xp:0,
  earnedBadges:[], solvedIds:[], atsScore:null, resumeBuilt:false,
  completedTopics:[], lcProgress:0, hrProgress:0, history:[],
});

// ═══════════════════════════════════════════════════
//  DESIGN — Placement Prep Navy Theme
// ═══════════════════════════════════════════════════
const T = {
  bg:       "#0f1117",
  nav:      "#13161f",
  sidebar:  "#13161f",
  card:     "#1a1d2e",
  cardHov:  "#1f2340",
  border:   "#252840",
  border2:  "#2d3155",
  accent:   "#6c63ff",
  accentV:  "#a78bfa",
  text:     "#f0f2ff",
  textSub:  "#8b93b8",
  textMuted:"#4a5080",
  green:    "#34d399",
  yellow:   "#fbbf24",
  orange:   "#fb923c",
  red:      "#f87171",
  pink:     "#f472b6",
  cyan:     "#38bdf8",
  indigo:   "#818cf8",
};

// ═══════════════════════════════════════════════════
//  NAV CONFIG  — sidebar groups
// ═══════════════════════════════════════════════════
const SECTIONS = [
  { key:"courses",   label:"Courses",   icon:"📚", color:"#38bdf8",
    group:"LEARN",
    tabs:[
      {id:"c_home",    label:"All Subjects",    icon:"🏠"},
      {id:"c_js",      label:"JavaScript",      icon:"🟨"},
      {id:"c_python",  label:"Python",          icon:"🐍"},
      {id:"c_cpp",     label:"C++",             icon:"⚙️"},
      {id:"c_java",    label:"Java",            icon:"☕"},
      {id:"c_dsa",     label:"DSA",             icon:"🌳"},
      {id:"c_sysdes",  label:"System Design",   icon:"🏗"},
      {id:"c_webdev",  label:"Web Dev",         icon:"🌐"},
      {id:"c_mdn",     label:"MDN Docs",        icon:"📘"},
      {id:"c_gfg",     label:"GeeksForGeeks",   icon:"🌿"},
    ]},
  { key:"coding",    label:"Coding",    icon:"💻", color:"#34d399",
    group:"PRACTICE",
    tabs:[{id:"cd_lc",label:"LeetCode",icon:"🟠"},{id:"cd_hr",label:"HackerRank",icon:"🟢"},{id:"cd_fcc",label:"freeCodeCamp",icon:"🔵"},{id:"cd_ai",label:"AI Questions",icon:"🤖"},{id:"cd_test",label:"Topic Tests",icon:"📝"}]},
  { key:"resume",    label:"Resume",    icon:"📄", color:"#fb923c",
    group:"CAREER",
    tabs:[{id:"r_build",label:"Build Resume",icon:"✍️"},{id:"r_ats",label:"ATS Score",icon:"📊"},{id:"r_test",label:"Resume Test",icon:"🎯"},{id:"r_update",label:"Company Tailor",icon:"🏢"}]},
  { key:"interview", label:"Interview Prep", icon:"🎤", color:"#a78bfa",
    group:"CAREER",
    tabs:[{id:"i_hr",label:"HR Questions",icon:"👔"},{id:"i_btech",label:"B.Tech Subjects",icon:"🎓"}]},
  { key:"progress",  label:"Performance",   icon:"📈", color:"#6c63ff",
    group:"AI",
    tabs:[{id:"p_main",label:"My Progress",icon:"📈"}]},
  { key:"chatbot",   label:"AI Chatbot",    icon:"🤖", color:"#f472b6",
    group:"AI",
    tabs:[{id:"ch_course",label:"Course Doubts",icon:"💬"},{id:"ch_code",label:"Code Assistant",icon:"💻"}]},
];

// sidebar group order
const SIDEBAR_GROUPS = [
  { key:"LEARN",    sections:["courses"] },
  { key:"PRACTICE", sections:["coding"] },
  { key:"CAREER",   sections:["resume","interview"] },
  { key:"AI",       sections:["progress","chatbot"] },
];

// ═══════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════
export default function App() {
  const [screen,   setScreen]  = useState("auth");
  const [authMode, setAMode]   = useState("login");
  const [aName,    setAName]   = useState("");
  const [aPwd,     setAPwd]    = useState("");
  const [aErr,     setAErr]    = useState("");
  const [user,     setUser]    = useState("");
  const [prog,     setProg]    = useState(DP());
  const [secKey,   setSK]      = useState("courses");
  const [tabId,    setTID]     = useState("c_home");

  const saveProg = p => { const u = LU(); u[user] = p; SU(u); setProg(p); };
  const checkBadges = p => {
    const b = [...(p.earnedBadges||[])];
    const add = id => { if (!b.includes(id)) b.push(id); };
    if (p.totalSolved>=1)  add("first_solve");
    if (p.streak>=3)       add("streak_3");
    if (p.streak>=7)       add("streak_7");
    if (p.streak>=30)      add("streak_30");
    if (p.totalSolved>=10) add("solve_10");
    if (p.totalSolved>=50) add("solve_50");
    if (p.totalSolved>=100)add("solve_100");
    if (p.interviewAnswered>=5) add("interview_5");
    if ((p.atsScore||0)>=80)   add("ats_80");
    if (p.resumeBuilt)         add("resume_done");
    if ((p.completedTopics||[]).length>=5) add("course_5");
    return { ...p, earnedBadges: b };
  };
  const addXP = (amt, extra={}) => {
    const today = new Date().toDateString();
    let p = { ...prog, xp: prog.xp + amt, ...extra };
    if (p.lastActive !== today) p = { ...p, streak: p.streak+1, lastActive: today };
    if (amt > 0) p = { ...p, history: [...(p.history||[]), {date:new Date().toISOString(), xp:amt}].slice(-100) };
    saveProg(checkBadges(p));
  };
  const handleAuth = () => {
    const name = aName.trim().toLowerCase().replace(/\s+/g,"_");
    if (!name || !aPwd) { setAErr("Please fill both fields."); return; }
    const users = LU();
    if (authMode === "register") {
      if (users[name]) { setAErr("Username exists. Please login."); return; }
      const nu = { ...DP(), _pwd: aPwd };
      users[name] = nu; SU(users); setUser(name); setProg(nu); setScreen("app");
    } else {
      if (!users[name]) { setAErr("Account not found. Register first."); return; }
      if (users[name]._pwd && users[name]._pwd !== aPwd) { setAErr("Incorrect password."); return; }
      setUser(name); setProg(users[name]); setScreen("app");
    }
    setAErr("");
  };
  const logout = () => { setScreen("auth"); setUser(""); setProg(DP()); setAName(""); setAPwd(""); };
  const goSec = key => { setSK(key); setTID(SECTIONS.find(s=>s.key===key)?.tabs[0]?.id || ""); };
  const curSec = SECTIONS.find(s=>s.key===secKey);
  const lv = Math.floor(prog.xp/100)+1;

  // ── AUTH ──────────────────────────────────────────
  if (screen === "auth") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f1117 0%,#1a1040 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Plus Jakarta Sans','Sora','Segoe UI',sans-serif",padding:"20px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,#6c63ff15 0%,transparent 70%)",top:"-150px",left:"-150px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,#38bdf815 0%,transparent 70%)",bottom:"-80px",right:"-80px",pointerEvents:"none"}}/>
      <div style={{width:"100%",maxWidth:"400px",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:"36px"}}>
          <div style={{width:"64px",height:"64px",borderRadius:"18px",background:"linear-gradient(135deg,#6c63ff,#38bdf8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"30px",margin:"0 auto 16px",boxShadow:"0 8px 40px #6c63ff50"}}>⚡</div>
          <h1 style={{fontSize:"30px",fontWeight:800,color:T.text,margin:"0 0 6px",letterSpacing:"-0.5px"}}>DevForge</h1>
          <p style={{color:T.textMuted,fontSize:"16px"}}>Your complete placement preparation hub</p>
        </div>
        <div style={{background:"#1a1d2e",border:"1px solid #2d3155",borderRadius:"20px",padding:"32px",boxShadow:"0 24px 80px #00000080"}}>
          <h2 style={{color:T.text,fontSize:"18px",fontWeight:700,marginBottom:"24px",textAlign:"center"}}>
            {authMode==="login" ? "Welcome back 👋" : "Create your account 🚀"}
          </h2>
          {[["Username",aName,setAName,"text","your_username"],["Password",aPwd,setAPwd,"password","••••••••"]].map(([lbl,val,set,type,ph])=>(
            <div key={lbl} style={{marginBottom:"16px"}}>
              <label style={{display:"block",fontSize:"13px",color:T.textSub,marginBottom:"7px",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase"}}>{lbl}</label>
              <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph} onKeyDown={e=>e.key==="Enter"&&handleAuth()}
                style={{width:"100%",padding:"13px 16px",background:"#0f1117",border:"1px solid #2d3155",borderRadius:"11px",color:T.text,fontFamily:"inherit",fontSize:"15px",outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"}}
                onFocus={e=>e.target.style.borderColor="#6c63ff"} onBlur={e=>e.target.style.borderColor="#2d3155"}/>
            </div>
          ))}
          {aErr && <div style={{background:"#2d0a0a",border:"1px solid #f8717144",borderRadius:"8px",padding:"11px 14px",color:"#f87171",fontSize:"14px",marginBottom:"14px"}}>{aErr}</div>}
          <button onClick={handleAuth} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#6c63ff,#38bdf8)",border:"none",borderRadius:"11px",color:"#fff",fontWeight:700,fontSize:"16px",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 24px #6c63ff50",letterSpacing:"0.02em",marginTop:"4px"}}>
            {authMode==="login" ? "Sign In →" : "Create Account →"}
          </button>
          <p style={{textAlign:"center",marginTop:"18px",color:T.textMuted,fontSize:"14px"}}>
            {authMode==="login" ? "No account? " : "Have an account? "}
            <span onClick={()=>{setAMode(m=>m==="login"?"register":"login");setAErr("");}} style={{color:T.accent,cursor:"pointer",fontWeight:700}}>{authMode==="login"?"Register":"Login"}</span>
          </p>
        </div>
      </div>
      <GS/>
    </div>
  );

  // ── APP SHELL ──────────────────────────────────────
  return (
    <div style={{display:"flex",minHeight:"100vh",background:T.bg,fontFamily:"'Plus Jakarta Sans','Sora','Segoe UI',sans-serif",color:T.text}}>

      {/* ══ LEFT SIDEBAR ══ */}
      <aside style={{width:"260px",background:T.sidebar,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>
        {/* Logo */}
        <div style={{padding:"22px 20px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{width:"38px",height:"38px",borderRadius:"11px",background:"linear-gradient(135deg,#6c63ff,#38bdf8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0,boxShadow:"0 0 18px #6c63ff50"}}>⚡</div>
          <div>
            <div style={{fontWeight:800,fontSize:"18px",color:T.text,letterSpacing:"-0.3px"}}>DevForge</div>
            <div style={{fontSize:"12px",color:T.textMuted}}>Placement Prep</div>
          </div>
        </div>

        {/* Grouped navigation */}
        <div style={{flex:1,padding:"12px 10px",overflowY:"auto"}}>
          {SIDEBAR_GROUPS.map(grp=>(
            <div key={grp.key} style={{marginBottom:"8px"}}>
              <div style={{fontSize:"11px",fontWeight:700,color:T.textMuted,letterSpacing:"0.12em",padding:"10px 12px 6px",textTransform:"uppercase"}}>{grp.key}</div>
              {grp.sections.map(sk=>{
                const sec = SECTIONS.find(s=>s.key===sk);
                const isActiveSec = secKey===sk;
                return(
                  <div key={sk}>
                    {/* Section header — clickable */}
                    <button onClick={()=>goSec(sk)} style={{width:"100%",display:"flex",alignItems:"center",gap:"12px",padding:"11px 12px",borderRadius:"10px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"15px",fontWeight:isActiveSec?700:500,background:isActiveSec?`${sec.color}18`:"transparent",color:isActiveSec?sec.color:T.textSub,marginBottom:"2px",textAlign:"left",transition:"all 0.15s"}}>
                      <span style={{fontSize:"17px",width:"22px",textAlign:"center"}}>{sec.icon}</span>
                      <span style={{flex:1}}>{sec.label}</span>
                      {isActiveSec && <span style={{fontSize:"10px",color:sec.color}}>▾</span>}
                    </button>
                    {/* Sub-tabs when section active */}
                    {isActiveSec && (
                      <div style={{marginLeft:"10px",marginBottom:"4px"}}>
                        {sec.tabs.map(t=>(
                          <button key={t.id} onClick={()=>setTID(t.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px 9px 14px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"14px",fontWeight:tabId===t.id?700:400,background:tabId===t.id?`${sec.color}20`:"transparent",color:tabId===t.id?sec.color:T.textMuted,marginBottom:"1px",textAlign:"left",transition:"all 0.12s",borderLeft:tabId===t.id?`3px solid ${sec.color}`:"3px solid transparent"}}>
                            <span style={{fontSize:"15px",width:"18px",textAlign:"center"}}>{t.icon}</span>
                            <span style={{flex:1}}>{t.label}</span>
                            {tabId===t.id && <div style={{width:"6px",height:"6px",borderRadius:"50%",background:sec.color}}/>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom user card */}
        <div style={{padding:"14px",borderTop:`1px solid ${T.border}`}}>
          <div style={{background:"#0f1117",borderRadius:"12px",padding:"14px",border:`1px solid ${T.border2}`}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
              <div style={{width:"36px",height:"36px",borderRadius:"50%",background:`linear-gradient(135deg,${curSec?.color||T.accent},#6c63ff)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",fontWeight:800,flexShrink:0}}>{user[0]?.toUpperCase()}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:"14px",fontWeight:700,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user}</div>
                <div style={{fontSize:"12px",color:T.textMuted}}>Level {lv} · {prog.xp} XP</div>
              </div>
              <button onClick={logout} title="Logout" style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",fontSize:"16px",padding:"4px",lineHeight:1}}>⏻</button>
            </div>
            {/* XP bar */}
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:T.textMuted,marginBottom:"5px"}}>
              <span style={{color:T.accent,fontWeight:600}}>Lv {lv}</span><span>{prog.xp%100}/100 xp</span>
            </div>
            <div style={{background:T.border,borderRadius:"999px",height:"5px"}}>
              <div style={{width:`${prog.xp%100}%`,height:"100%",background:`linear-gradient(90deg,${T.accent},${T.cyan})`,borderRadius:"999px",transition:"width 0.5s"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px",fontSize:"12px"}}>
              <span style={{color:T.orange,fontWeight:700}}>🔥 {prog.streak}d streak</span>
              <span style={{color:T.textMuted}}>💻 {prog.totalSolved} solved</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT SIDE ══ */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>

        {/* ── TOP NAV BAR ── */}
        <nav style={{height:"62px",background:T.nav,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",padding:"0 28px",gap:"6px",position:"sticky",top:0,zIndex:200,flexShrink:0}}>
          {SECTIONS.map(s=>(
            <button key={s.key} onClick={()=>goSec(s.key)} style={{padding:"8px 18px",borderRadius:"999px",border:secKey===s.key?`1.5px solid ${s.color}`:"1.5px solid transparent",cursor:"pointer",fontFamily:"inherit",fontSize:"15px",fontWeight:secKey===s.key?700:500,background:secKey===s.key?`${s.color}15`:"transparent",color:secKey===s.key?s.color:T.textSub,transition:"all 0.15s",whiteSpace:"nowrap"}}>
              {s.label}
            </button>
          ))}
          {/* right side stats */}
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:"12px",flexShrink:0}}>
            <div style={{fontSize:"14px",color:T.textSub,fontWeight:600}}>Student</div>
            <div style={{width:"34px",height:"34px",borderRadius:"50%",background:`linear-gradient(135deg,${curSec?.color||T.accent},#6c63ff)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:800,cursor:"pointer",boxShadow:`0 0 14px ${curSec?.color||T.accent}50`,flexShrink:0}}>{user[0]?.toUpperCase()}</div>
          </div>
        </nav>

        {/* ── MAIN CONTENT ── */}
        <main style={{flex:1,overflowY:"auto",padding:"32px 36px",background:T.bg}}>
          <div style={{position:"relative",zIndex:1}}>
            {tabId==="c_home"   && <CoursesHome  prog={prog} setTID={setTID}/>}
            {tabId==="c_js"     && <SubjectPage subject="JavaScript" prog={prog} addXP={addXP}/>}
            {tabId==="c_python" && <SubjectPage subject="Python"     prog={prog} addXP={addXP}/>}
            {tabId==="c_cpp"    && <SubjectPage subject="C++"        prog={prog} addXP={addXP}/>}
            {tabId==="c_java"   && <SubjectPage subject="Java"       prog={prog} addXP={addXP}/>}
            {tabId==="c_dsa"    && <SubjectPage subject="DSA"        prog={prog} addXP={addXP}/>}
            {tabId==="c_sysdes" && <SubjectPage subject="System Design" prog={prog} addXP={addXP}/>}
            {tabId==="c_webdev" && <SubjectPage subject="Web Dev"    prog={prog} addXP={addXP}/>}
            {tabId==="c_mdn"    && <CoursesMDN/>}
            {tabId==="c_gfg"    && <CoursesGFG/>}
            {tabId==="cd_lc"   && <ExtSite url="https://leetcode.com" name="LeetCode" color="#f89f1b" links={[["All Problems","https://leetcode.com/problemset/"],["Study Plan","https://leetcode.com/study-plan/"],["Explore","https://leetcode.com/explore/"]]} prog={prog} field="lcProgress" addXP={addXP}/>}
            {tabId==="cd_hr"   && <ExtSite url="https://hackerrank.com" name="HackerRank" color="#22d3a0" links={[["Interview Kit","https://hackerrank.com/interview/preparation-kit"],["Certify","https://hackerrank.com/skills-verification"],["Practice","https://hackerrank.com/domains"]]} prog={prog} field="hrProgress" addXP={addXP}/>}
            {tabId==="cd_fcc"  && <FCC prog={prog} addXP={addXP}/>}
            {tabId==="cd_ai"   && <AIQuestions prog={prog} addXP={addXP}/>}
            {tabId==="cd_test" && <TopicTest   prog={prog} addXP={addXP}/>}
            {tabId==="r_build"  && <ResumeBuild  prog={prog} addXP={addXP}/>}
            {tabId==="r_ats"    && <ResumeATS    prog={prog} addXP={addXP}/>}
            {tabId==="r_test"   && <ResumeTest   prog={prog} addXP={addXP}/>}
            {tabId==="r_update" && <ResumeTailor prog={prog} addXP={addXP}/>}
            {tabId==="i_hr"    && <InterviewHR   prog={prog} addXP={addXP}/>}
            {tabId==="i_btech" && <InterviewBtech prog={prog} addXP={addXP}/>}
            {tabId==="p_main"  && <Progress      prog={prog} user={user}/>}
            {tabId==="ch_course"&& <ChatCourse/>}
            {tabId==="ch_code"  && <ChatCode/>}
          </div>
        </main>
      </div>
      <GS/>
    </div>
  );
}



// ═══════════════════════════════════════════════════
//  GLOBAL STYLES
// ═══════════════════════════════════════════════════
function GS(){ return <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0f1117;}
  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-track{background:#13161f;}
  ::-webkit-scrollbar-thumb{background:#2d3155;border-radius:4px;}
  ::-webkit-scrollbar-thumb:hover{background:#3d4175;}
  button:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
  button{transition:all 0.15s;}
  button:disabled{opacity:0.35;cursor:not-allowed!important;transform:none!important;}
  a{text-decoration:none;}
  input,textarea,select{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif!important;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  .fin{animation:fadeUp 0.28s ease}
  .mod-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.4)!important;}
  .mod-card{transition:all 0.2s ease!important;}
  .nav-item:hover{background:rgba(108,99,255,0.08)!important;color:#f0f2ff!important;}
`}</style>; }

// ═══════════════════════════════════════════════════
//  SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════
function Card({children,style={},className=""}){
  return <div className={className} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"22px",...style}}>{children}</div>;
}
function GCard({children,color=T.accent,style={}}){
  return <div style={{background:`linear-gradient(135deg,${T.card},${T.cardHov})`,border:`1px solid ${color}30`,borderRadius:"14px",padding:"22px",boxShadow:`0 4px 24px ${color}12`,...style}}>{children}</div>;
}
function Btn({children,onClick,disabled,color=T.accent,outline=false,style={}}){
  return <button onClick={onClick} disabled={disabled} style={{padding:"11px 22px",borderRadius:"10px",border:outline?`1.5px solid ${color}`:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"15px",background:outline?"transparent":`linear-gradient(135deg,${color},${color}bb)`,color:outline?color:"#fff",letterSpacing:"0.01em",boxShadow:outline?"none":`0 4px 18px ${color}35`,...style}}>{children}</button>;
}
function PageTitle({children,color=T.accent,sub=""}){
  return (
    <div style={{marginBottom:"28px"}}>
      <div style={{fontSize:"12px",fontWeight:700,color,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"8px"}}>WELCOME TO</div>
      <h2 style={{fontSize:"30px",fontWeight:800,color:T.text,letterSpacing:"-0.5px",lineHeight:1.2}}>{children}</h2>
      {sub && <p style={{fontSize:"15px",color:T.textSub,marginTop:"10px",lineHeight:1.6}}>{sub}</p>}
    </div>
  );
}
function Badge2({children,color=T.accent}){
  return <span style={{fontSize:"13px",fontWeight:700,color,background:`${color}18`,padding:"4px 12px",borderRadius:"999px",display:"inline-block",border:`1px solid ${color}28`}}>{children}</span>;
}
function TA({value,onChange,placeholder,rows=4,readOnly=false,style={}}){
  return <textarea value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly}
    style={{width:"100%",minHeight:`${rows*44}px`,padding:"14px 16px",background:T.bg,border:`1.5px solid ${T.border2}`,borderRadius:"10px",color:T.text,fontFamily:"'JetBrains Mono','Fira Code',monospace",fontSize:"14px",outline:"none",resize:"vertical",boxSizing:"border-box",lineHeight:1.75,...style}}/>;
}
function InpField({value,onChange,placeholder,style={},type="text"}){
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder}
    style={{padding:"12px 16px",background:T.bg,border:`1.5px solid ${T.border2}`,borderRadius:"10px",color:T.text,fontFamily:"inherit",fontSize:"15px",outline:"none",...style}}
    onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border2}/>;
}
function SelField({value,onChange,options,style={}}){
  return <select value={value} onChange={e=>onChange(e.target.value)} style={{padding:"11px 16px",background:T.bg,border:`1.5px solid ${T.border2}`,borderRadius:"10px",color:T.text,fontFamily:"inherit",fontSize:"15px",outline:"none",...style}}>
    {options.map(o=><option key={o} value={o}>{o}</option>)}
  </select>;
}
function AIBox({title,content,color=T.accent}){
  return <div style={{marginTop:"18px",padding:"20px",background:T.bg,borderRadius:"12px",border:`1px solid ${color}25`,borderLeft:`4px solid ${color}`}}>
    <div style={{color,fontWeight:700,marginBottom:"10px",fontSize:"12px",letterSpacing:"0.12em",textTransform:"uppercase"}}>{title}</div>
    <p style={{color:"#a8bbd8",fontSize:"15px",lineHeight:1.9,whiteSpace:"pre-wrap"}}>{content}</p>
  </div>;
}
function EmptyState({icon,title,sub}){
  return <div style={{textAlign:"center",padding:"70px 20px",color:T.textMuted}}>
    <div style={{fontSize:"52px",marginBottom:"16px",opacity:0.4}}>{icon}</div>
    <div style={{fontSize:"20px",fontWeight:600,color:T.textSub,marginBottom:"8px"}}>{title}</div>
    <div style={{fontSize:"15px",lineHeight:1.6,maxWidth:"340px",margin:"0 auto"}}>{sub}</div>
  </div>;
}
const dCol = d => d==="Easy"?T.green:d==="Medium"?T.cyan:T.red;
const subCol = {OS:T.accent,DBMS:T.cyan,CN:T.green,OOP:T.pink,DSA:T.indigo};



// ═══════════════════════════════════════════════════
//  COURSES — Subject config
// ═══════════════════════════════════════════════════
const SUBJECT_META = {
  "JavaScript":    { color:"#f7df1e", textColor:"#000", icon:"JS",  desc:"Master modern JS — closures, async, DOM, ES6+, Promises" },
  "Python":        { color:"#3776ab", textColor:"#fff", icon:"PY",  desc:"Python from basics to advanced — OOP, decorators, async" },
  "C++":           { color:"#00599c", textColor:"#fff", icon:"C++", desc:"C++ mastery — pointers, STL, templates, memory management" },
  "Java":          { color:"#ed8b00", textColor:"#fff", icon:"☕",  desc:"Java fundamentals to enterprise — JVM, collections, Spring" },
  "DSA":           { color:"#7c5cf6", textColor:"#fff", icon:"⚡",  desc:"Data Structures & Algorithms — arrays to dynamic programming" },
  "System Design": { color:"#22c4e0", textColor:"#000", icon:"🏗",  desc:"Build scalable systems — load balancing, caching, CAP theorem" },
  "Web Dev":       { color:"#e879a0", textColor:"#fff", icon:"🌐",  desc:"Full-stack web development — HTML, CSS, React, Node.js" },
};

const SUBJECT_TAB_IDS = {
  "JavaScript":"c_js","Python":"c_python","C++":"c_cpp","Java":"c_java",
  "DSA":"c_dsa","System Design":"c_sysdes","Web Dev":"c_webdev"
};


// ═══════════════════════════════════════════════════
//  COURSES — Dashboard (Placement Prep style)
// ═══════════════════════════════════════════════════
function CoursesHome({prog,setTID}){
  const done = prog.completedTopics||[];
  const totalTopics = Object.values(TOPICS_BY_LANG).flat().length;
  const doneCount = done.length;

  // All modules for the "ALL MODULES" section
  const ALL_MODULES = [
    {id:"c_js",     name:"JavaScript",     desc:"Variables, closures, async, DOM, ES6+",   icon:"🟨", color:"#f7df1e", tc:"#000"},
    {id:"c_python", name:"Python",         desc:"OOP, decorators, async, standard library", icon:"🐍", color:"#3776ab", tc:"#fff"},
    {id:"c_cpp",    name:"C++",            desc:"Pointers, STL, templates, memory mgmt",    icon:"⚙️", color:"#00599c", tc:"#fff"},
    {id:"c_java",   name:"Java",           desc:"JVM, collections, multithreading, Spring", icon:"☕", color:"#ed8b00", tc:"#fff"},
    {id:"c_dsa",    name:"DSA",            desc:"Arrays, trees, graphs, DP, algorithms",    icon:"🌳", color:"#a78bfa", tc:"#fff"},
    {id:"c_sysdes", name:"System Design",  desc:"Load balancing, caching, CAP theorem",     icon:"🏗", color:"#38bdf8", tc:"#000"},
    {id:"c_webdev", name:"Web Dev",        desc:"HTML, CSS, React, Node.js, REST APIs",      icon:"🌐", color:"#f472b6", tc:"#fff"},
    {id:"c_mdn",    name:"MDN Docs",       desc:"Official Mozilla web documentation",        icon:"📘", color:"#6c63ff", tc:"#fff"},
    {id:"c_gfg",    name:"GeeksForGeeks",  desc:"DSA, CS fundamentals, interview prep",      icon:"🌿", color:"#34d399", tc:"#000"},
  ];

  return(
    <div className="fin">

      {/* ── HERO BANNER ── */}
      <div style={{background:"linear-gradient(135deg,#1a1d2e 0%,#1e1a3a 60%,#1a2040 100%)",border:`1px solid ${T.border2}`,borderRadius:"18px",padding:"40px 44px",marginBottom:"36px",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"32px"}}>
        {/* bg decoration */}
        <div style={{position:"absolute",top:"-60px",right:"120px",width:"280px",height:"280px",borderRadius:"50%",background:"radial-gradient(circle,#6c63ff12 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-40px",right:"-40px",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle,#38bdf810 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:"12px",fontWeight:700,color:T.accent,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"12px"}}>WELCOME TO</div>
          <h1 style={{fontSize:"36px",fontWeight:900,color:T.text,letterSpacing:"-0.8px",lineHeight:1.2,marginBottom:"6px"}}>
            DevForge Placement
          </h1>
          <h1 style={{fontSize:"36px",fontWeight:900,color:T.accent,letterSpacing:"-0.8px",lineHeight:1.2,marginBottom:"18px"}}>
            Preparation Hub
          </h1>
          <p style={{fontSize:"16px",color:T.textSub,lineHeight:1.7,maxWidth:"480px"}}>
            Your complete placement preparation platform. Master DSA, build the perfect resume, ace HR interviews, and track your progress — all in one place. 🚀
          </p>
          {/* quick stats */}
          <div style={{display:"flex",gap:"24px",marginTop:"24px",flexWrap:"wrap"}}>
            {[["📚","Topics Done",`${doneCount}/${totalTopics}`],["🔥","Day Streak",`${prog.streak}d`],["⚡","Total XP",`${prog.xp}`],["💻","Problems",`${prog.totalSolved}`]].map(([ic,lbl,val])=>(
              <div key={lbl} style={{textAlign:"center"}}>
                <div style={{fontSize:"13px",color:T.textMuted,marginBottom:"3px"}}>{ic} {lbl}</div>
                <div style={{fontSize:"22px",fontWeight:800,color:T.text}}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right action buttons */}
        <div style={{display:"flex",flexDirection:"column",gap:"12px",flexShrink:0,position:"relative",zIndex:1}}>
          <button onClick={()=>setTID("r_ats")} style={{padding:"14px 24px",borderRadius:"12px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"15px",background:`linear-gradient(135deg,${T.accent},#38bdf8)`,color:"#fff",boxShadow:`0 6px 24px ${T.accent}50`,display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap"}}>
            <span>📊</span> Check ATS Score
          </button>
          <button onClick={()=>setTID("i_hr")} style={{padding:"14px 24px",borderRadius:"12px",border:`1.5px solid ${T.border2}`,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"15px",background:"#1a1d2e",color:T.text,display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap"}}>
            <span>🎤</span> Interview Prep
          </button>
          <button onClick={()=>setTID("ch_code")} style={{padding:"14px 24px",borderRadius:"12px",border:`1.5px solid ${T.border2}`,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"15px",background:"#1a1d2e",color:T.text,display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap"}}>
            <span>🤖</span> Ask AI Chatbot
          </button>
        </div>
      </div>

      {/* ── ALL MODULES ── */}
      <div style={{fontSize:"13px",fontWeight:700,color:T.textMuted,letterSpacing:"0.14em",marginBottom:"18px"}}>ALL MODULES</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"16px"}}>
        {ALL_MODULES.map(m=>{
          const topics = TOPICS_BY_LANG[m.name]||[];
          const cDone = topics.filter(t=>done.includes(`${m.name}_${t}`)).length;
          const pct = topics.length ? Math.round(cDone/topics.length*100) : null;
          return(
            <div key={m.id} onClick={()=>setTID(m.id)} className="mod-card"
              style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"16px",overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.25)"}}>
              {/* colored top border */}
              <div style={{height:"4px",background:m.color}}/>
              <div style={{padding:"22px 22px 18px"}}>
                {/* icon */}
                <div style={{width:"48px",height:"48px",borderRadius:"12px",background:`${m.color}18`,border:`1px solid ${m.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",marginBottom:"16px"}}>
                  {m.icon}
                </div>
                <h3 style={{fontSize:"18px",fontWeight:800,color:T.text,marginBottom:"6px"}}>{m.name}</h3>
                <p style={{fontSize:"13px",color:T.textMuted,lineHeight:1.6,marginBottom:"16px"}}>{m.desc}</p>
                {pct!==null && (
                  <div style={{marginBottom:"14px"}}>
                    <div style={{background:T.border,borderRadius:"999px",height:"4px"}}>
                      <div style={{width:`${pct}%`,height:"100%",background:m.color,borderRadius:"999px",transition:"width 0.5s"}}/>
                    </div>
                    <div style={{fontSize:"12px",color:T.textMuted,marginTop:"5px"}}>{cDone}/{topics.length} topics · {pct}%</div>
                  </div>
                )}
                <div style={{fontSize:"14px",fontWeight:700,color:m.color}}>Open →</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════
//  COURSES — Per-Subject Page (same layout for ALL subjects)
// ═══════════════════════════════════════════════════
function SubjectPage({subject,prog,addXP}){
  const meta   = SUBJECT_META[subject]||{color:T.cyan,textColor:"#fff",icon:"📖",desc:""};
  const topics = TOPICS_BY_LANG[subject]||[];
  const done   = prog.completedTopics||[];
  const completed = topics.filter(t=>done.includes(`${subject}_${t}`)).length;
  const pct    = topics.length ? Math.round(completed/topics.length*100) : 0;

  const [selTopic, setSel]  = useState(topics[0]||"");
  const [notes,    setNotes]= useState("");
  const [loading,  setLoad] = useState(false);
  const [tab,      setTab]  = useState("notes");
  const [practiceQ,setPQ]   = useState("");
  const [practiceA,setPA]   = useState("");
  const [practiceFB,setPFB] = useState("");
  const [pLoad,    setPL]   = useState(false);

  const generate = async () => {
    if(!selTopic) return;
    setLoad(true); setNotes("");
    const r = await callAI(
      [{role:"user",content:`Create comprehensive study notes on "${selTopic}" in ${subject}.\n\nUse this exact structure:\n## 📌 What is it?\n(clear definition)\n\n## 🧠 Why it matters\n(use cases, importance)\n\n## ⚙️ How it works\n(detailed explanation with steps)\n\n\`\`\`\n// Practical ${subject} code example with comments\n\`\`\`\n\n## 🎯 Common Interview Questions\n1. ...\n2. ...\n3. ...\n\n## ✅ Key Points to Remember\n- ...\n- ...`}],
      `Expert ${subject} teacher and interview coach. Write clear, detailed, interview-ready notes. Include working code examples with inline comments. Be thorough but practical.`
    );
    setNotes(r); setLoad(false);
    const key = `${subject}_${selTopic}`;
    if(!done.includes(key)) addXP(15,{completedTopics:[...done,key]});
  };

  const genPractice = async () => {
    setPL(true); setPQ(""); setPA(""); setPFB("");
    const r = await callAI(
      [{role:"user",content:`Generate one challenging ${subject} interview question specifically about "${selTopic}". Include a brief answer outline after the question.`}],
      "Experienced technical interviewer. Practical, focused question."
    );
    setPQ(r); setPL(false);
  };

  const getPFB = async () => {
    if(!practiceA.trim()) return;
    setPL(true); setPFB("");
    const r = await callAI(
      [{role:"user",content:`Subject: ${subject} — Topic: ${selTopic}\nQuestion: ${practiceQ}\nAnswer: ${practiceA}\n\nEvaluate: correctness, gaps, score/10, one improvement tip.`}],
      "Technical interviewer. Brief honest feedback."
    );
    setPFB(r); setPL(false);
    addXP(20,{interviewAnswered:(prog.interviewAnswered||0)+1});
  };

  return(
    <div className="fin">
      {/* ── BIG SUBJECT HEADER ── */}
      <div style={{background:`linear-gradient(135deg,${meta.color}20,${meta.color}05)`,border:`1px solid ${meta.color}35`,borderRadius:"22px",padding:"32px",marginBottom:"26px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"22px",marginBottom:"22px",flexWrap:"wrap"}}>
          <div style={{width:"72px",height:"72px",borderRadius:"20px",background:meta.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"30px",fontWeight:900,color:meta.textColor,flexShrink:0,boxShadow:`0 8px 32px ${meta.color}60`,letterSpacing:"-1px"}}>
            {meta.icon}
          </div>
          <div style={{flex:1}}>
            <h1 style={{fontSize:"38px",fontWeight:900,color:T.text,letterSpacing:"-0.8px",marginBottom:"8px"}}>{subject}</h1>
            <p style={{fontSize:"18px",color:T.textSub,lineHeight:1.5}}>{meta.desc}</p>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:"44px",fontWeight:900,color:meta.color,lineHeight:1}}>{pct}%</div>
            <div style={{fontSize:"18px",color:T.textMuted,marginTop:"4px"}}>{completed} / {topics.length} topics done</div>
          </div>
        </div>
        <div style={{background:"#ffffff08",borderRadius:"999px",height:"10px",overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${meta.color},${meta.color}88)`,borderRadius:"999px",transition:"width 0.6s",boxShadow:`0 0 12px ${meta.color}60`}}/>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:"24px",alignItems:"start"}}>

        {/* ── LEFT: topic list (sticky) ── */}
        <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:"18px",overflow:"hidden",position:"sticky",top:"20px"}}>
          <div style={{padding:"22px 24px 18px",borderBottom:`1px solid ${T.border2}`,background:`${meta.color}12`}}>
            <div style={{fontSize:"22px",fontWeight:800,color:meta.color,letterSpacing:"0.05em"}}>ALL TOPICS</div>
            <div style={{fontSize:"20px",color:T.textMuted,marginTop:"6px"}}>{completed} of {topics.length} completed</div>
          </div>
          <div style={{padding:"10px"}}>
            {topics.map((t,i)=>{
              const isDone   = done.includes(`${subject}_${t}`);
              const isActive = selTopic === t;
              return(
                <button key={t} onClick={()=>{setSel(t);setNotes("");setPQ("");setPFB("");setTab("notes");}} style={{
                  width:"100%",display:"flex",alignItems:"center",gap:"13px",
                  padding:"16px 16px",borderRadius:"12px",border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:"22px",fontWeight:isActive?800:500,
                  background:isActive?`${meta.color}22`:"transparent",
                  color:isActive?meta.color:isDone?T.textSub:T.textMuted,
                  marginBottom:"3px",textAlign:"left",transition:"all 0.15s",
                  borderLeft:isActive?`3px solid ${meta.color}`:"3px solid transparent"
                }}>
                  <div style={{
                    width:"32px",height:"32px",borderRadius:"8px",flexShrink:0,
                    background:isDone?meta.color:isActive?`${meta.color}30`:"#ffffff06",
                    border:`1.5px solid ${isDone?meta.color:T.border2}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"17px",color:isDone?meta.textColor:T.textMuted,fontWeight:900
                  }}>{isDone?"✓":i+1}</div>
                  <span style={{flex:1,lineHeight:1.5}}>{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: content area ── */}
        <div>
          {/* Active topic bar */}
          <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:"18px",padding:"26px 28px",marginBottom:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
              <div>
                <div style={{fontSize:"20px",color:T.textMuted,fontWeight:700,letterSpacing:"0.08em",marginBottom:"10px"}}>{subject.toUpperCase()} · TOPIC</div>
                <h2 style={{fontSize:"36px",fontWeight:900,color:T.text,letterSpacing:"-0.8px"}}>{selTopic}</h2>
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={()=>setTab("notes")} style={{padding:"13px 26px",borderRadius:"12px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"21px",fontWeight:700,background:tab==="notes"?meta.color:T.border2,color:tab==="notes"?meta.textColor:T.textMuted,transition:"all 0.15s"}}>📖 Notes</button>
                <button onClick={()=>setTab("practice")} style={{padding:"13px 26px",borderRadius:"12px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"21px",fontWeight:700,background:tab==="practice"?meta.color:T.border2,color:tab==="practice"?meta.textColor:T.textMuted,transition:"all 0.15s"}}>🎯 Practice</button>
              </div>
            </div>
          </div>

          {/* NOTES TAB */}
          {tab==="notes" && (
            <>
              {!notes && !loading && (
                <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:"18px",padding:"56px 32px",textAlign:"center"}}>
                  <div style={{width:"72px",height:"72px",borderRadius:"20px",background:`${meta.color}18`,border:`1px solid ${meta.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",margin:"0 auto 20px"}}>📖</div>
                  <h3 style={{fontSize:"30px",fontWeight:800,color:T.textSub,marginBottom:"14px"}}>Learn {selTopic}</h3>
                  <p style={{fontSize:"19px",color:T.textMuted,marginBottom:"28px",maxWidth:"380px",margin:"0 auto 28px",lineHeight:1.6}}>AI will generate detailed notes with code examples, explanations and interview questions</p>
                  <button onClick={generate} style={{padding:"18px 48px",borderRadius:"14px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:"26px",background:meta.color,color:meta.textColor,boxShadow:`0 6px 24px ${meta.color}50`,letterSpacing:"0.01em"}}>⚡ Generate Notes  +15 XP</button>
                </div>
              )}
              {loading && (
                <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:"18px",padding:"70px",textAlign:"center"}}>
                  <div style={{fontSize:"44px",animation:"pulse 1s infinite",marginBottom:"18px"}}>📖</div>
                  <p style={{color:T.textMuted,fontSize:"19px"}}>Generating notes for <b style={{color:meta.color}}>{selTopic}</b>...</p>
                </div>
              )}
              {notes && !loading && (
                <div className="fin">
                  <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:"18px",padding:"30px",marginBottom:"16px"}}>
                    <div style={{color:"#c8d8f0",fontSize:"19px",lineHeight:2.2,whiteSpace:"pre-wrap"}}>{notes}</div>
                  </div>
                  <div style={{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}}>
                    <button onClick={generate} style={{padding:"10px 20px",borderRadius:"10px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"19px",background:meta.color,color:meta.textColor}}>🔄 Regenerate</button>
                    <button onClick={()=>setNotes("")} style={{padding:"10px 20px",borderRadius:"10px",border:`1px solid ${T.border2}`,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"19px",background:"transparent",color:T.textMuted}}>✕ Clear</button>
                    <span style={{marginLeft:"auto",fontSize:"19px",color:T.green,fontWeight:700}}>✅ +15 XP earned!</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* PRACTICE TAB */}
          {tab==="practice" && (
            <div>
              <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:"18px",padding:"24px",marginBottom:"16px"}}>
                <p style={{fontSize:"19px",color:T.textSub,marginBottom:"16px"}}>Get an interview question on <b style={{color:meta.color}}>{selTopic}</b> and get AI feedback on your answer.</p>
                <button onClick={genPractice} disabled={pLoad} style={{padding:"11px 24px",borderRadius:"10px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"19px",background:meta.color,color:meta.textColor,opacity:pLoad?0.5:1}}>{pLoad?"⏳ Generating...":"🎯 Generate Question"}</button>
              </div>
              {practiceQ && (
                <div className="fin">
                  <div style={{background:T.card,border:`1px solid ${meta.color}35`,borderLeft:`4px solid ${meta.color}`,borderRadius:"18px",padding:"24px",marginBottom:"16px"}}>
                    <div style={{fontSize:"16px",color:meta.color,fontWeight:700,letterSpacing:"0.1em",marginBottom:"12px"}}>INTERVIEW QUESTION</div>
                    <p style={{fontSize:"19px",color:T.text,lineHeight:1.8}}>{practiceQ}</p>
                  </div>
                  <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:"18px",padding:"24px"}}>
                    <div style={{fontSize:"16px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"12px"}}>YOUR ANSWER</div>
                    <TA value={practiceA} onChange={e=>setPA(e.target.value)} placeholder="Write your answer here..." rows={6}/>
                    <button onClick={getPFB} disabled={pLoad||!practiceA.trim()} style={{marginTop:"14px",padding:"11px 24px",borderRadius:"10px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"17px",background:meta.color,color:meta.textColor,opacity:(pLoad||!practiceA.trim())?0.4:1}}>{pLoad?"⏳ Evaluating...":"🤖 Get Feedback  +20 XP"}</button>
                  </div>
                  {practiceFB && <AIBox title="Feedback" content={practiceFB} color={meta.color}/>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  COURSES — MDN & GFG embed readers
// ═══════════════════════════════════════════════════
function CoursesMDN(){
  const links=[
    {l:"JavaScript Guide",u:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"},
    {l:"HTML Reference",u:"https://developer.mozilla.org/en-US/docs/Web/HTML"},
    {l:"CSS Reference",u:"https://developer.mozilla.org/en-US/docs/Web/CSS"},
    {l:"Web APIs",u:"https://developer.mozilla.org/en-US/docs/Web/API"},
    {l:"Async JS",u:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous"},
    {l:"Fetch API",u:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"},
    {l:"Web Forms",u:"https://developer.mozilla.org/en-US/docs/Learn/Forms"},
  ];
  return <EmbedReader name="MDN Web Docs" color="#4f8ef7" links={links}/>;
}
function CoursesGFG(){
  const links=[
    {l:"Data Structures",u:"https://www.geeksforgeeks.org/data-structures/"},
    {l:"Algorithms",u:"https://www.geeksforgeeks.org/fundamentals-of-algorithms/"},
    {l:"Dynamic Programming",u:"https://www.geeksforgeeks.org/dynamic-programming/"},
    {l:"Graph Algorithms",u:"https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"},
    {l:"System Design",u:"https://www.geeksforgeeks.org/system-design-tutorial/"},
    {l:"DBMS",u:"https://www.geeksforgeeks.org/dbms/"},
    {l:"OS Concepts",u:"https://www.geeksforgeeks.org/operating-systems/"},
    {l:"Interview Prep",u:"https://www.geeksforgeeks.org/interview-preparation/"},
  ];
  return <EmbedReader name="GeeksForGeeks" color="#22d3a0" links={links}/>;
}
function EmbedReader({name,color,links}){
  return(
    <div className="fin">
      <PageTitle color={color}>{name}</PageTitle>
      <div style={{background:`linear-gradient(135deg,${color}18,${color}06)`,border:`1px solid ${color}30`,borderRadius:"18px",padding:"32px 36px",marginBottom:"24px"}}>
        <div style={{fontSize:"13px",fontWeight:700,color,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"10px"}}>DOCUMENTATION</div>
        <h2 style={{fontSize:"30px",fontWeight:900,color:T.text,letterSpacing:"-0.5px",marginBottom:"10px"}}>{name}</h2>
        <p style={{fontSize:"15px",color:T.textSub,lineHeight:1.6}}>Click any section below to open it directly in a new tab.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"14px"}}>
        {links.map(l=>(
          <a key={l.l} href={l.u} target="_blank" rel="noreferrer"
            style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"22px",display:"flex",flexDirection:"column",gap:"10px",textDecoration:"none",transition:"all 0.18s",cursor:"pointer"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 28px ${color}20`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <div style={{width:"40px",height:"40px",borderRadius:"10px",background:`${color}20`,border:`1px solid ${color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px"}}>📄</div>
            <div>
              <div style={{fontSize:"16px",fontWeight:700,color:T.text,marginBottom:"5px"}}>{l.l}</div>
              <div style={{fontSize:"13px",color:T.textMuted,lineHeight:1.5}}>{l.u.replace("https://","").split("/").slice(0,3).join("/")}</div>
            </div>
            <div style={{fontSize:"14px",fontWeight:700,color,marginTop:"auto"}}>Open ↗</div>
          </a>
        ))}
      </div>
    </div>
  );
}



// ═══════════════════════════════════════════════════
//  CODING — EXTERNAL SITE
// ═══════════════════════════════════════════════════
function ExtSite({url,name,color,links,prog,field,addXP}){
  const val=prog[field]||0;
  const [inp,setInp]=useState(val);
  const pct=Math.min(Math.round(val/500*100),100);
  return(
    <div className="fin">
      <PageTitle color={color}>{name}</PageTitle>
      {/* Hero launch card */}
      <div style={{background:`linear-gradient(135deg,${color}18,${color}06)`,border:`1px solid ${color}30`,borderRadius:"18px",padding:"36px 40px",marginBottom:"24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"200px",height:"200px",borderRadius:"50%",background:`radial-gradient(circle,${color}15 0%,transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{fontSize:"13px",fontWeight:700,color,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"12px"}}>PRACTICE ON</div>
        <h2 style={{fontSize:"34px",fontWeight:900,color:T.text,letterSpacing:"-0.6px",marginBottom:"8px"}}>{name}</h2>
        <p style={{fontSize:"15px",color:T.textSub,marginBottom:"28px",lineHeight:1.6}}>
          Click any section below to open {name} in a new tab and start practicing.
        </p>
        {/* Big open buttons */}
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"32px"}}>
          {links.map(([l,u])=>(
            <a key={l} href={u} target="_blank" rel="noreferrer" style={{padding:"14px 24px",borderRadius:"12px",background:color,color:"#fff",fontWeight:700,fontSize:"16px",display:"flex",alignItems:"center",gap:"8px",boxShadow:`0 4px 20px ${color}40`,textDecoration:"none",transition:"all 0.15s"}}>
              {l} <span style={{fontSize:"18px"}}>↗</span>
            </a>
          ))}
        </div>
        {/* Progress tracker */}
        <div style={{background:T.card,borderRadius:"14px",padding:"22px",border:`1px solid ${T.border2}`}}>
          <div style={{fontSize:"14px",fontWeight:700,color:T.textMuted,letterSpacing:"0.1em",marginBottom:"16px",textTransform:"uppercase"}}>Your Progress</div>
          <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
            <span style={{fontSize:"16px",color:T.textSub,fontWeight:500}}>Problems solved:</span>
            <input type="number" min="0" value={inp} onChange={e=>setInp(Number(e.target.value))}
              style={{width:"90px",padding:"10px 14px",background:T.bg,border:`1.5px solid ${T.border2}`,borderRadius:"10px",color:T.text,fontFamily:"inherit",fontSize:"16px",outline:"none",textAlign:"center",fontWeight:700}}/>
            <button onClick={()=>{addXP(0,{[field]:inp});}} style={{padding:"10px 22px",borderRadius:"10px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"15px",background:color,color:"#fff",boxShadow:`0 4px 16px ${color}40`}}>Save Progress</button>
          </div>
          {/* Progress bar */}
          <div style={{marginBottom:"10px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
              <span style={{fontSize:"14px",color:T.textMuted}}>{val} / 500 problems</span>
              <span style={{fontSize:"14px",color,fontWeight:700}}>{pct}%</span>
            </div>
            <div style={{background:T.border,borderRadius:"999px",height:"8px",overflow:"hidden"}}>
              <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${color},${color}88)`,borderRadius:"999px",transition:"width 0.6s",boxShadow:`0 0 10px ${color}60`}}/>
            </div>
          </div>
          {/* Milestones */}
          <div style={{display:"flex",gap:"12px",marginTop:"16px",flexWrap:"wrap"}}>
            {[[50,"🌱","Beginner"],[100,"⭐","Intermediate"],[250,"🔥","Advanced"],[500,"💎","Expert"]].map(([target,icon,lbl])=>(
              <div key={target} style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 12px",borderRadius:"8px",background:val>=target?`${color}20`:T.bg,border:`1px solid ${val>=target?color:T.border}`,opacity:val>=target?1:0.45}}>
                <span style={{fontSize:"16px"}}>{icon}</span>
                <span style={{fontSize:"13px",fontWeight:700,color:val>=target?color:T.textMuted}}>{target}+ {lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips card */}
      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"16px",padding:"24px"}}>
        <div style={{fontSize:"14px",fontWeight:700,color:T.textMuted,letterSpacing:"0.1em",marginBottom:"16px",textTransform:"uppercase"}}>💡 Tips for {name}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"14px"}}>
          {(name==="LeetCode"?[
            ["Start Easy","Solve all Easy problems first before jumping to Medium"],
            ["Pattern Focus","Learn patterns: Two Pointers, Sliding Window, BFS/DFS"],
            ["Daily Goal","Aim for at least 1-2 problems per day consistently"],
            ["Review Wrong","Re-attempt failed problems after 3 days"],
          ]:name==="HackerRank"?[
            ["Get Certified","Complete skill certifications — they impress recruiters"],
            ["Interview Kit","Use the 'Interview Preparation Kit' structured path"],
            ["Domains","Practice SQL, Python, Java domains for variety"],
            ["Leaderboard","Compete in contests to build competitive coding skills"],
          ]:[
            ["Stay Consistent","Practice every day, even if just 30 minutes"],
            ["Track Progress","Log your solved count regularly to stay motivated"],
            ["Join Community","Use forums and discussions to learn better approaches"],
            ["Review Solutions","Always study optimal solutions after solving"],
          ]).map(([title,tip])=>(
            <div key={title} style={{background:T.bg,borderRadius:"10px",padding:"16px",border:`1px solid ${T.border}`}}>
              <div style={{fontSize:"14px",fontWeight:700,color,marginBottom:"6px"}}>{title}</div>
              <div style={{fontSize:"13px",color:T.textMuted,lineHeight:1.6}}>{tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  CODING — freeCodeCamp
// ═══════════════════════════════════════════════════
function FCC(){
  const paths=[
    {l:"Responsive Web Design",u:"https://www.freecodecamp.org/learn/2022/responsive-web-design/"},
    {l:"JS Algorithms & DS",u:"https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"},
    {l:"Front End Libraries",u:"https://www.freecodecamp.org/learn/front-end-development-libraries/"},
    {l:"APIs & Microservices",u:"https://www.freecodecamp.org/learn/back-end-development-and-apis/"},
    {l:"Python / Scientific",u:"https://www.freecodecamp.org/learn/scientific-computing-with-python/"},
  ];
  return <EmbedReader name="freeCodeCamp" color={T.orange} links={paths.map(p=>({l:p.l,u:p.u}))}/>;
}

// ═══════════════════════════════════════════════════
//  CODING — AI QUESTIONS
// ═══════════════════════════════════════════════════
function AIQuestions({prog,addXP}){
  const [diff,setDiff]=useState("Medium");
  const [lang,setLang]=useState("JavaScript");
  const [topic,setTopic]=useState("Any");
  const [q,setQ]=useState(null);
  const [code,setCode]=useState("");
  const [loading,setLoad]=useState(false);
  const [rev,setRev]=useState("");
  const [rLoad,setRL]=useState(false);
  const topics=["Any","Arrays","Strings","Trees","Graphs","Dynamic Programming","Sorting","Linked Lists","Stacks/Queues","Binary Search","Greedy","Backtracking","Math","Hashing","Two Pointers"];

  const generate=async()=>{
    setLoad(true);setQ(null);setCode("");setRev("");
    const raw=await callAI([{role:"user",content:`Generate a unique ${diff} ${lang} coding problem on ${topic==="Any"?"any DSA topic":topic}.\n\nExact format:\nTITLE: ...\nTAGS: tag1, tag2\nDESCRIPTION:\n...\nEXAMPLE:\nInput: ...\nOutput: ...\nCONSTRAINTS:\n...`}],
      "Competitive programming expert. CODING ONLY — no theory. Original, practical, educational.");
    const lines=raw.split('\n');
    const gl=p=>lines.find(l=>l.startsWith(p))?.replace(p,"").trim()||"";
    const gb=(s,e)=>{const si=lines.findIndex(l=>l.startsWith(s));if(si===-1)return"";const ei=lines.findIndex((l,i)=>i>si&&l.startsWith(e));return lines.slice(si+1,ei===-1?undefined:ei).join('\n').trim();};
    setQ({title:gl("TITLE:"),tags:gl("TAGS:").split(',').map(t=>t.trim()),diff,desc:gb("DESCRIPTION:","EXAMPLE:"),example:gb("EXAMPLE:","CONSTRAINTS:"),constraints:gb("CONSTRAINTS:","~~~")});
    setLoad(false);
  };
  const getReview=async()=>{
    setRL(true);setRev("");
    const r=await callAI([{role:"user",content:`Review this ${lang} solution for "${q.title}":\n\`\`\`${lang}\n${code}\n\`\`\`\nCover: correctness, time/space complexity, improvements, edge cases.`}],"Senior SWE. Specific, constructive code review.");
    setRev(r);setRL(false);
  };

  return(
    <div className="fin">
      <PageTitle color={T.green}>✦ AI-Generated Questions</PageTitle>
      <GCard color={T.green} style={{marginBottom:"16px"}}>
        <div style={{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"flex-end"}}>
          {[["Difficulty",diff,setDiff,["Easy","Medium","Hard"]],["Language",lang,setLang,LANGS],["Topic",topic,setTopic,topics]].map(([lbl,val,set,opts])=>(
            <div key={lbl}><div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"5px"}}>{lbl.toUpperCase()}</div>
              <SelField value={val} onChange={set} options={opts}/></div>
          ))}
          <Btn onClick={generate} disabled={loading} color={T.green} style={{alignSelf:"flex-end"}}>{loading?"⏳ Generating...":"⚡ New Question"}</Btn>
        </div>
      </GCard>
      {loading && <div style={{textAlign:"center",padding:"50px"}}><div style={{fontSize:"36px",animation:"pulse 1s infinite"}}>⚙️</div><p style={{color:T.textMuted,marginTop:"12px"}}>Generating unique problem...</p></div>}
      {q && !loading && (
        <Card className="fin">
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",marginBottom:"12px"}}>
            <div><h3 style={{fontSize:"19px",fontWeight:800,marginBottom:"6px"}}>{q.title}</h3>
              <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>{q.tags?.filter(Boolean).map(t=><Badge2 key={t} color={T.accentV}>{t}</Badge2>)}</div>
            </div>
            <Badge2 color={dCol(q.diff)}>{q.diff}</Badge2>
          </div>
          <p style={{color:"#b8c8e8",fontSize:"17px",lineHeight:1.7,marginBottom:"12px"}}>{q.desc}</p>
          {q.example&&<pre style={{background:"#000000",padding:"13px",borderRadius:"9px",fontFamily:"monospace",fontSize:"15px",color:T.green,overflowX:"auto",whiteSpace:"pre-wrap",marginBottom:"10px",border:`1px solid ${T.border2}`}}>{q.example}</pre>}
          {q.constraints&&<p style={{fontSize:"15px",color:T.textSub,marginBottom:"16px"}}><b style={{color:T.text}}>Constraints:</b> {q.constraints}</p>}
          <TA value={code} onChange={e=>setCode(e.target.value)} placeholder={`// Write your ${lang} solution here...`} rows={7}/>
          <div style={{display:"flex",gap:"8px",marginTop:"12px",flexWrap:"wrap"}}>
            <Btn onClick={getReview} disabled={rLoad||!code.trim()} color={T.accentV}>{rLoad?"⏳ Reviewing...":"🔍 AI Code Review"}</Btn>
            <Btn onClick={()=>{addXP(50,{totalSolved:prog.totalSolved+1});alert("✅ +50 XP!");}} color={T.green}>✅ Solved +50 XP</Btn>
          </div>
          {rev && <AIBox title="Code Review" content={rev} color={T.accentV}/>}
        </Card>
      )}
      {!q && !loading && <EmptyState icon="🤖" title="Generate unlimited coding problems" sub="Any language, any topic, any difficulty level"/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  CODING — TOPIC TEST
// ═══════════════════════════════════════════════════
function TopicTest({prog,addXP}){
  const [topic,setTopic]=useState("Arrays");
  const [lang,setLang]=useState("JavaScript");
  const [qs,setQs]=useState([]);
  const [ans,setAns]=useState({});
  const [fb,setFB]=useState({});
  const [loading,setLoad]=useState(false);
  const [submitted,setSub]=useState(false);
  const topics=["Arrays","Strings","Linked Lists","Trees","Graphs","Dynamic Programming","Sorting","Binary Search","Stacks & Queues","Recursion","Hash Maps","Two Pointers"];

  const genTest=async()=>{
    setLoad(true);setQs([]);setAns({});setFB({});setSub(false);
    const raw=await callAI([{role:"user",content:`Generate 5 ${lang} coding problems on "${topic}". Mix: 2 Easy, 2 Medium, 1 Hard.\nReturn ONLY valid JSON array:\n[{"id":1,"title":"...","diff":"Easy","desc":"...","example":"Input: ...\\nOutput: ..."}]`}],
      "Competitive programmer. Return ONLY valid JSON array.");
    try{const arr=JSON.parse(raw.replace(/```json|```/g,"").trim());setQs(arr);}catch{alert("Generation failed. Try again.");}
    setLoad(false);
  };
  const submit=async()=>{
    setLoad(true);const f={};
    for(const q of qs){
      const a=ans[q.id]||"";
      f[q.id]=a.trim()?await callAI([{role:"user",content:`Problem: ${q.title}\n${q.desc}\nSolution:\n${a}\nBrief: correct? complexity? score/10?`}],"Terse evaluator. One paragraph."):"No answer submitted.";
    }
    setFB(f);setSub(true);
    const n=qs.filter(q=>(ans[q.id]||"").trim()).length;
    addXP(n*30,{totalSolved:prog.totalSolved+n});
    setLoad(false);
  };

  return(
    <div className="fin">
      <PageTitle color={T.green}>📝 Topic Test</PageTitle>
      <GCard color={T.green} style={{marginBottom:"16px"}}>
        <div style={{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"flex-end"}}>
          <div><div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"5px"}}>TOPIC</div><SelField value={topic} onChange={setTopic} options={topics}/></div>
          <div><div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"5px"}}>LANGUAGE</div><SelField value={lang} onChange={setLang} options={LANGS}/></div>
          <Btn onClick={genTest} disabled={loading} color={T.green} style={{alignSelf:"flex-end"}}>{loading?"⏳ Generating...":"📝 Generate Test"}</Btn>
        </div>
      </GCard>
      {loading&&<div style={{textAlign:"center",padding:"40px"}}><div style={{fontSize:"36px",animation:"pulse 1s infinite"}}>📝</div><p style={{color:T.textMuted,marginTop:"10px"}}>Building your {topic} test...</p></div>}
      {qs.length>0 && !loading && (
        <div>
          {qs.map((q,i)=>(
            <Card key={q.id||i} style={{marginBottom:"12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",flexWrap:"wrap",gap:"6px"}}>
                <h4 style={{fontSize:"17px",fontWeight:700}}>Q{i+1}. {q.title}</h4>
                <Badge2 color={dCol(q.diff)}>{q.diff}</Badge2>
              </div>
              <p style={{color:"#b8c8e8",fontSize:"16px",lineHeight:1.6,marginBottom:"8px"}}>{q.desc}</p>
              {q.example&&<pre style={{background:"#000000",padding:"10px",borderRadius:"7px",fontSize:"14px",color:T.green,fontFamily:"monospace",overflowX:"auto",whiteSpace:"pre-wrap",marginBottom:"10px",border:`1px solid ${T.border2}`}}>{q.example}</pre>}
              <TA value={ans[q.id]||""} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder={`// ${lang} solution...`} rows={4} readOnly={submitted}/>
              {submitted&&fb[q.id]&&<AIBox title="Evaluation" content={fb[q.id]} color={T.green}/>}
            </Card>
          ))}
          {!submitted&&<Btn onClick={submit} disabled={loading} color={T.green} style={{width:"100%",padding:"12px"}}>{loading?"⏳ Evaluating...":"Submit Test for AI Evaluation"}</Btn>}
          {submitted&&<GCard color={T.green} style={{textAlign:"center",marginTop:"14px"}}><div style={{fontSize:"26px",marginBottom:"6px"}}>🎉</div><div style={{fontWeight:700,color:T.green}}>Test Complete! +{qs.filter(q=>(ans[q.id]||"").trim()).length*30} XP</div></GCard>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  RESUME — BUILD
// ═══════════════════════════════════════════════════
function ResumeBuild({prog,addXP}){
  const [d,setD]=useState({name:"",email:"",phone:"",linkedin:"",github:"",college:"",degree:"",year:"",skills:"",experience:"",projects:"",achievements:""});
  const [result,setRes]=useState("");
  const [loading,setLoad]=useState(false);
  const upd=(k,v)=>setD(p=>({...p,[k]:v}));
  const dl=(c,f)=>{const b=new Blob([c],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=f;a.click();};

  const generate=async()=>{
    setLoad(true);setRes("");
    const r=await callAI([{role:"user",content:`Generate professional ATS-friendly LaTeX resume:\nName: ${d.name}\nEmail: ${d.email} | Phone: ${d.phone}\nLinkedIn: ${d.linkedin} | GitHub: ${d.github}\nCollege: ${d.college} | Degree: ${d.degree} (${d.year})\nSkills: ${d.skills}\nExperience:\n${d.experience}\nProjects:\n${d.projects}\nAchievements:\n${d.achievements}\n\nGenerate complete compilable LaTeX. ATS-optimized.`}],
      "Expert resume writer. Output ONLY LaTeX code. No markdown.");
    setRes(r);addXP(100,{resumeBuilt:true});setLoad(false);
  };

  const fields=[["name","Full Name","Rahul Sharma"],["email","Email","rahul@gmail.com"],["phone","Phone","+91 9876543210"],["linkedin","LinkedIn","linkedin.com/in/rahul"],["github","GitHub","github.com/rahul"],["college","College","IIT Delhi"],["degree","Degree","B.Tech CSE"],["year","Year","2025"]];

  return(
    <div className="fin">
      <PageTitle color={T.orange}>✨ Build Resume</PageTitle>
      <Card style={{marginBottom:"16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"10px",marginBottom:"14px"}}>
          {fields.map(([k,lbl,ph])=>(
            <div key={k}><div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"5px"}}>{lbl.toUpperCase()}</div>
              <InpField value={d[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} style={{width:"100%"}}/></div>
          ))}
        </div>
        {[["skills","SKILLS","Python, React, Node.js, SQL, Git, Docker",2],["experience","EXPERIENCE","Company | Role | Jun–Aug 2024\n- Built X improved Y by 40%",3],["projects","PROJECTS","Project | React, Node.js | github.com/link\n- Description with impact",3],["achievements","ACHIEVEMENTS","- LeetCode 400+ Top 5%\n- HackIndia 2024 Winner",2]].map(([k,lbl,ph,rows])=>(
          <div key={k} style={{marginBottom:"12px"}}><div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"5px"}}>{lbl}</div><TA value={d[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} rows={rows}/></div>
        ))}
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          <Btn onClick={generate} disabled={loading} color={T.orange}>{loading?"⏳ Generating...":"✨ Generate Resume (+100 XP)"}</Btn>
          <Btn onClick={()=>dl(LATEX_TEMPLATE,"template.tex")} outline color={T.orange}>📋 Download Template</Btn>
        </div>
      </Card>
      {result&&(
        <Card className="fin">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
            <Badge2 color={T.green}>✅ LaTeX Ready!</Badge2>
            <Btn onClick={()=>dl(result,"resume.tex")} color={T.green}>⬇ Download .tex</Btn>
          </div>
          <TA value={result} readOnly rows={10}/>
          <div style={{marginTop:"10px",padding:"12px",background:"#000000",borderRadius:"9px",border:`1px solid ${T.border2}`}}>
            <p style={{color:T.textMuted,fontSize:"15px"}}>📋 Copy above → <a href="https://overleaf.com" target="_blank" rel="noreferrer" style={{color:T.accent}}>Overleaf.com</a> → New Project → Blank → Paste → Compile → Download PDF</p>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  RESUME — ATS
// ═══════════════════════════════════════════════════
function ResumeATS({prog,addXP}){
  const [rTxt,  setRT]  = useState("");
  const [jd,    setJD]  = useState("");
  const [result,setRes] = useState(null);
  const [loading,setLoad]= useState(false);
  const [pdfLoad,setPL] = useState(false);
  const [fileName,setFN]= useState("");
  const [pdfB64, setPB] = useState(null);  // base64 PDF for direct API send
  const fileRef = useRef(null);

  // ── Read PDF as base64 ──
  const handlePDF = async(e)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.name.toLowerCase().endsWith(".pdf")){ alert("Please upload a PDF file."); return; }
    setFN(file.name); setPL(true); setRT(""); setRes(null); setPB(null);
    const reader = new FileReader();
    reader.onload = ev => {
      const b64 = ev.target.result.split(",")[1]; // strip data:...base64, prefix
      setPB(b64);
      setRT(`[PDF loaded: ${file.name}]`); // placeholder so analyze button enables
      setPL(false);
    };
    reader.readAsDataURL(file);
  };

  // ── Analyze: if PDF, send as document block; else send as text ──
  const analyze = async()=>{
    if(!rTxt.trim() && !pdfB64) return;
    setLoad(true); setRes(null);

    let messages;
    if(pdfB64){
      // Send PDF directly to Claude — it will extract text itself
      const userContent = [
        { type:"document", source:{ type:"base64", media_type:"application/pdf", data:pdfB64 } },
        { type:"text", text:`Analyze this resume PDF for ATS compatibility${jd?` against this job description:\n\n${jd}`:""}.

Return ONLY valid JSON (no markdown, no explanation):
{"score":75,"matched":["React","Python"],"missing":["Docker","AWS"],"improvements":["Add measurable achievements with numbers","Include more JD keywords in skills section","Use standard section headings for ATS parsers"]}` }
      ];
      messages = [{ role:"user", content: userContent }];
    } else {
      messages = [{role:"user", content:`Analyze this resume for ATS compatibility${jd?` against the job description below`:""}.

Resume:
${rTxt}${jd?`\n\nJob Description:\n${jd}`:""}

Return ONLY valid JSON (no markdown):
{"score":75,"matched":["React","Python"],"missing":["Docker","AWS"],"improvements":["Add measurable achievements","Include keywords from JD","Fix formatting for ATS parsers"]}`}];
    }

    const body = {
      model:"claude-sonnet-4-20250514",
      max_tokens:1200,
      system:"Senior ATS/HR expert. Analyze resume thoroughly. Return ONLY valid JSON, no markdown fences, no extra text.",
      messages
    };
    const resp = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    const d = await resp.json();
    const raw = d.content?.map(b=>b.text||"").join("")||"";
    try{
      const p=JSON.parse(raw.replace(/```json|```/g,"").trim());
      setRes(p); addXP(20,{atsScore:p.score});
    } catch{
      setRes({score:60,matched:[],missing:[],improvements:["Could not parse response. Try again."]});
    }
    setLoad(false);
  };

  const sc=result?.score||0;
  const scCol=sc>=80?T.green:sc>=60?T.cyan:T.red;
  const scLabel=sc>=80?"ATS Optimized ✅":sc>=60?"Needs Improvement ⚠️":"Major Issues ❌";
  const canAnalyze = !loading && (pdfB64 || rTxt.trim().length>20);

  return(
    <div className="fin">
      <PageTitle color={T.cyan}>📊 ATS Score Checker</PageTitle>

      {/* ── PDF Upload Zone ── */}
      <div
        onClick={()=>!pdfB64&&fileRef.current?.click()}
        style={{
          background: pdfB64
            ? `linear-gradient(135deg,${T.green}15,${T.green}05)`
            : `linear-gradient(135deg,${T.cyan}12,${T.accent}06)`,
          border: `2px dashed ${pdfB64?T.green:T.cyan}50`,
          borderRadius:"18px", padding:"40px 32px", marginBottom:"24px",
          textAlign:"center", cursor: pdfB64?"default":"pointer",
          transition:"all 0.2s"
        }}
        onMouseEnter={e=>{ if(!pdfB64) e.currentTarget.style.borderColor=(T.cyan); }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor=(pdfB64?T.green:T.cyan)+"50"; }}
      >
        <input ref={fileRef} type="file" accept=".pdf,application/pdf" onChange={handlePDF} style={{display:"none"}}/>

        {pdfLoad ? (
          <>
            <div style={{fontSize:"44px",marginBottom:"14px",animation:"pulse 1s infinite"}}>⏳</div>
            <div style={{fontSize:"18px",fontWeight:700,color:T.cyan}}>Reading PDF...</div>
            <div style={{fontSize:"14px",color:T.textMuted,marginTop:"6px"}}>{fileName}</div>
          </>
        ) : pdfB64 ? (
          <>
            <div style={{fontSize:"44px",marginBottom:"14px"}}>✅</div>
            <div style={{fontSize:"20px",fontWeight:800,color:T.green,marginBottom:"6px"}}>PDF Ready!</div>
            <div style={{fontSize:"14px",color:T.textMuted,marginBottom:"20px"}}>📄 {fileName}</div>
            <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={e=>{e.stopPropagation();fileRef.current?.click();}}
                style={{padding:"10px 20px",borderRadius:"10px",border:`1px solid ${T.border2}`,background:T.card,color:T.textSub,fontFamily:"inherit",fontWeight:600,fontSize:"14px",cursor:"pointer"}}>
                📂 Change PDF
              </button>
              <button onClick={e=>{e.stopPropagation();setRT("");setFN("");setPB(null);setRes(null);}}
                style={{padding:"10px 20px",borderRadius:"10px",border:`1px solid ${T.red}50`,background:"transparent",color:T.red,fontFamily:"inherit",fontWeight:600,fontSize:"14px",cursor:"pointer"}}>
                ✕ Remove
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{fontSize:"52px",marginBottom:"16px"}}>📄</div>
            <div style={{fontSize:"22px",fontWeight:800,color:T.text,marginBottom:"10px"}}>Upload Resume PDF</div>
            <div style={{fontSize:"15px",color:T.textMuted,marginBottom:"24px",lineHeight:1.7,maxWidth:"420px",margin:"0 auto 24px"}}>
              Click here or drag & drop your resume PDF.<br/>Claude will read it directly — no text extraction needed.
            </div>
            <div style={{display:"inline-block",padding:"14px 40px",borderRadius:"12px",background:`linear-gradient(135deg,${T.cyan},${T.accent})`,color:"#fff",fontWeight:700,fontSize:"17px",boxShadow:`0 6px 24px ${T.cyan}40`}}>
              📂 Choose PDF File
            </div>
            <div style={{fontSize:"13px",color:T.textMuted,marginTop:"14px"}}>or paste resume text in the box below</div>
          </>
        )}
      </div>

      {/* ── Text inputs ── */}
      {!pdfB64 && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"}}>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"20px"}}>
            <div style={{fontSize:"12px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"10px",display:"flex",justifyContent:"space-between"}}>
              <span>RESUME TEXT *</span>
              {rTxt&&<span style={{color:T.cyan}}>{rTxt.length} chars</span>}
            </div>
            <TA value={rTxt} onChange={e=>setRT(e.target.value)} placeholder="Paste resume text here (or upload PDF above)..." rows={9}/>
          </div>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"20px"}}>
            <div style={{fontSize:"12px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"10px"}}>
              JOB DESCRIPTION <span style={{fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:"11px"}}>(optional)</span>
            </div>
            <TA value={jd} onChange={e=>setJD(e.target.value)} placeholder="Paste job description for keyword matching..." rows={9}/>
          </div>
        </div>
      )}

      {/* JD input when PDF is loaded */}
      {pdfB64 && (
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"20px",marginBottom:"20px"}}>
          <div style={{fontSize:"12px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"10px"}}>
            JOB DESCRIPTION <span style={{fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:"11px"}}>(optional — paste to match keywords)</span>
          </div>
          <TA value={jd} onChange={e=>setJD(e.target.value)} placeholder="Paste job description for targeted keyword analysis..." rows={5}/>
        </div>
      )}

      {/* ── Analyze button ── */}
      <button onClick={analyze} disabled={!canAnalyze}
        style={{padding:"15px 44px",borderRadius:"12px",border:"none",cursor:canAnalyze?"pointer":"not-allowed",fontFamily:"inherit",fontWeight:700,fontSize:"17px",
          background:canAnalyze?`linear-gradient(135deg,${T.cyan},${T.accent})`:"#2d3155",
          color:"#fff",boxShadow:canAnalyze?`0 6px 24px ${T.cyan}40`:"none",
          marginBottom:"28px",transition:"all 0.2s",width:"100%",letterSpacing:"0.01em"}}>
        {loading?"⏳ AI is analyzing your resume...":"📊 Check ATS Score"}
      </button>

      {/* ── Results ── */}
      {result && (
        <div className="fin">
          {/* Score circle */}
          <div style={{background:`linear-gradient(135deg,${scCol}15,${scCol}05)`,border:`1px solid ${scCol}30`,borderRadius:"18px",padding:"32px 36px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"32px",flexWrap:"wrap"}}>
            <div style={{width:"120px",height:"120px",borderRadius:"50%",border:`5px solid ${scCol}`,background:`${scCol}12`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 36px ${scCol}30`}}>
              <div style={{fontSize:"44px",fontWeight:900,color:scCol,lineHeight:1}}>{sc}</div>
              <div style={{fontSize:"12px",color:T.textMuted,marginTop:"2px"}}>/100</div>
            </div>
            <div style={{flex:1,minWidth:"200px"}}>
              <div style={{fontSize:"24px",fontWeight:800,color:scCol,marginBottom:"14px"}}>{scLabel}</div>
              <div style={{background:`${scCol}18`,borderRadius:"999px",height:"10px",overflow:"hidden",marginBottom:"12px"}}>
                <div style={{width:`${sc}%`,height:"100%",background:`linear-gradient(90deg,${scCol},${scCol}88)`,borderRadius:"999px",transition:"width 1.4s ease",boxShadow:`0 0 14px ${scCol}50`}}/>
              </div>
              <div style={{fontSize:"15px",color:T.textSub,lineHeight:1.6}}>
                {sc>=80?"Great! Your resume is well-optimized for ATS systems and should pass most filters.":sc>=60?"Your resume has potential but needs some improvements to reliably pass ATS filters.":"Your resume needs significant work — it may be auto-rejected by ATS before reaching a recruiter."}
              </div>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"14px"}}>
            {result.matched?.length>0 && (
              <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"22px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
                  <span style={{fontSize:"15px",fontWeight:700,color:T.green}}>✅ Matched Keywords</span>
                  <span style={{fontSize:"12px",color:T.textMuted,background:`${T.green}15`,padding:"2px 8px",borderRadius:"999px"}}>{result.matched.length}</span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                  {result.matched.map(k=><Badge2 key={k} color={T.green}>{k}</Badge2>)}
                </div>
              </div>
            )}
            {result.missing?.length>0 && (
              <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"22px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
                  <span style={{fontSize:"15px",fontWeight:700,color:T.red}}>❌ Missing Keywords</span>
                  <span style={{fontSize:"12px",color:T.textMuted,background:`${T.red}15`,padding:"2px 8px",borderRadius:"999px"}}>{result.missing.length}</span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                  {result.missing.map(k=><Badge2 key={k} color={T.red}>{k}</Badge2>)}
                </div>
              </div>
            )}
          </div>

          {result.improvements?.length>0 && (
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"14px",padding:"24px"}}>
              <div style={{fontSize:"15px",fontWeight:700,color:T.cyan,marginBottom:"18px"}}>💡 How to Improve Your Score</div>
              {result.improvements.map((imp,i)=>(
                <div key={i} style={{display:"flex",gap:"14px",padding:"13px 0",borderBottom:i<result.improvements.length-1?`1px solid ${T.border}`:"none",alignItems:"flex-start"}}>
                  <div style={{width:"28px",height:"28px",borderRadius:"50%",background:`${T.cyan}18`,border:`1px solid ${T.cyan}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",color:T.cyan,fontWeight:700,flexShrink:0}}>{i+1}</div>
                  <span style={{color:"#b0c8e8",fontSize:"15px",lineHeight:1.7,flex:1}}>{imp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  RESUME — TEST
// ═══════════════════════════════════════════════════
function ResumeTest({prog,addXP}){
  const [rTxt,setRT]=useState("");
  const [qs,setQs]=useState([]);
  const [ans,setAns]=useState({});
  const [fb,setFB]=useState({});
  const [loading,setLoad]=useState(false);
  const [submitted,setSub]=useState(false);

  const generate=async()=>{
    if(!rTxt.trim())return;setLoad(true);setQs([]);setAns({});setFB({});setSub(false);
    const r=await callAI([{role:"user",content:`From this resume:\n${rTxt}\n\nGenerate 6 personalized interview questions from this candidate's real experience and projects.\nReturn ONLY valid JSON:\n[{"id":1,"q":"...","type":"Technical/Behavioral","focus":"..."}]`}],
      "Expert interviewer. Personalized from resume. ONLY valid JSON.");
    try{const arr=JSON.parse(r.replace(/```json|```/g,"").trim());setQs(arr);}catch{alert("Failed. Try again.");}
    setLoad(false);
  };
  const submit=async()=>{
    setLoad(true);const f={};
    for(const q of qs){const a=ans[q.id]||"";f[q.id]=a.trim()?await callAI([{role:"user",content:`Resume:\n${rTxt}\nQ: ${q.q}\nA: ${a}\nShort feedback + score/10.`}],"Brief feedback."):"No answer.";}
    setFB(f);setSub(true);addXP(qs.filter(q=>(ans[q.id]||"").trim()).length*25,{interviewAnswered:prog.interviewAnswered+qs.length});
    setLoad(false);
  };

  return(
    <div className="fin">
      <PageTitle color={T.orange}>🎯 Resume-Based Test</PageTitle>
      <Card style={{marginBottom:"14px"}}>
        <div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"7px"}}>YOUR RESUME</div>
        <TA value={rTxt} onChange={e=>setRT(e.target.value)} placeholder="Paste your resume — AI generates questions from YOUR actual experience..." rows={6}/>
        <Btn onClick={generate} disabled={loading||!rTxt.trim()} color={T.orange} style={{marginTop:"10px"}}>{loading?"⏳ Generating...":"🎯 Generate My Questions"}</Btn>
      </Card>
      {qs.map((q,i)=>(
        <Card key={q.id||i} style={{marginBottom:"12px"}}>
          <div style={{display:"flex",gap:"8px",alignItems:"flex-start",marginBottom:"8px",flexWrap:"wrap"}}>
            <Badge2 color={q.type==="Technical"?T.accentV:T.orange}>{q.type}</Badge2>
            <p style={{fontSize:"17px",fontWeight:600,flex:1}}>Q{i+1}. {q.q}</p>
          </div>
          {q.focus&&<p style={{fontSize:"14px",color:T.textMuted,marginBottom:"8px"}}>Focus: {q.focus}</p>}
          <TA value={ans[q.id]||""} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="Your answer..." rows={3} readOnly={submitted}/>
          {submitted&&fb[q.id]&&<AIBox title="Feedback" content={fb[q.id]} color={T.orange}/>}
        </Card>
      ))}
      {qs.length>0&&!submitted&&<Btn onClick={submit} disabled={loading} color={T.orange} style={{width:"100%",padding:"12px"}}>{loading?"⏳ Evaluating...":"Submit for AI Feedback"}</Btn>}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  RESUME — TAILOR
// ═══════════════════════════════════════════════════
function ResumeTailor({addXP}){
  const [resume,setResume]=useState("");
  const [company,setCo]=useState("");
  const [jd,setJD]=useState("");
  const [result,setRes]=useState("");
  const [loading,setLoad]=useState(false);
  const companies=["Google","Amazon","Microsoft","Meta","Apple","Flipkart","Swiggy","Zomato","Razorpay","CRED","Infosys","TCS"];
  const dl=(c,f)=>{const b=new Blob([c],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=f;a.click();};
  const tailor=async()=>{
    if(!resume.trim()||!company)return;setLoad(true);setRes("");
    const r=await callAI([{role:"user",content:`Tailor this resume for ${company}${jd?`.\nJob:\n${jd}`:""}.\nMake targeted changes: ${company}-specific keywords, rewrite bullets, match culture and tech stack.\n\nResume:\n${resume}`}],
      "Resume tailoring expert. Specific, impactful, targeted changes. Professional.");
    setRes(r);addXP(20,{});setLoad(false);
  };

  return(
    <div className="fin">
      <PageTitle color={T.orange}>🔄 Tailor for Company</PageTitle>
      <Card style={{marginBottom:"14px"}}>
        <div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"8px"}}>TARGET COMPANY</div>
        <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"14px"}}>
          {companies.map(c=><button key={c} onClick={()=>setCo(c)} style={{padding:"6px 13px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"15px",fontWeight:600,background:company===c?T.orange:"#080c14",color:company===c?"#000":T.textMuted,transition:"all 0.15s"}}>{c}</button>)}
        </div>
        <div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"5px"}}>JOB DESCRIPTION (optional)</div>
        <InpField value={jd} onChange={e=>setJD(e.target.value)} placeholder="Paste job description for better tailoring..." style={{width:"100%",marginBottom:"12px"}}/>
        <div style={{fontSize:"13px",color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:"5px"}}>YOUR RESUME *</div>
        <TA value={resume} onChange={e=>setResume(e.target.value)} placeholder="Paste your current resume (LaTeX or plain text)..." rows={8}/>
        <Btn onClick={tailor} disabled={loading||!resume.trim()||!company} color={T.orange} style={{marginTop:"10px"}}>{loading?"⏳ Tailoring...":"🔄 Tailor for "+company}</Btn>
      </Card>
      {result&&(
        <Card className="fin">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
            <Badge2 color={T.green}>✅ {company} Version Ready</Badge2>
            <Btn onClick={()=>dl(result,`resume_${company}.tex`)} color={T.green}>⬇ Download</Btn>
          </div>
          <TA value={result} readOnly rows={12}/>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  INTERVIEW — HR (UNLIMITED AI)
// ═══════════════════════════════════════════════════
function InterviewHR({prog,addXP}){
  const [mode,setMode]=useState("practice"); // practice | generate | strategy
  const [sel,setSel]=useState(null);
  const [answer,setAns]=useState("");
  const [feedback,setFB]=useState("");
  const [loading,setLoad]=useState(false);
  // AI-generated unlimited questions
  const [genTopic,setGenTopic]=useState("General HR");
  const [genQ,setGenQ]=useState(null);
  const [genLoad,setGL]=useState(false);
  const [strategy,setStrat]=useState("");

  const hrTopics=["General HR","Leadership & Teamwork","Problem Solving","Career Goals","Strengths & Weaknesses","Company Research","Conflict Resolution","Achievement & Impact","Work Style & Culture","Salary Negotiation","Fresher-Specific","Internship Experience"];

  const PRESET_HRQ = [
    {id:1, q:"Tell me about yourself.",                         hint:"Education → Projects → Skills → Goals"},
    {id:2, q:"Why should we hire you?",                         hint:"Unique strengths + company fit"},
    {id:3, q:"Tell about a team conflict and resolution.",       hint:"STAR method"},
    {id:4, q:"What is your greatest weakness?",                  hint:"Real weakness + improvement plan"},
    {id:5, q:"Where do you see yourself in 5 years?",           hint:"Company growth alignment"},
    {id:6, q:"Describe your most challenging project.",          hint:"Challenge + your role + outcome"},
    {id:7, q:"Why do you want to work here?",                   hint:"Research company: mission, products"},
    {id:8, q:"How do you handle deadlines and pressure?",        hint:"Real example with result"},
    {id:9, q:"What motivates you?",                             hint:"Align with the role"},
    {id:10,q:"Do you have questions for us?",                   hint:"Ask 2-3 smart questions"},
    {id:11,q:"Tell me about a failure and what you learned.",    hint:"Own it, show growth"},
    {id:12,q:"How do you prioritize tasks when overloaded?",    hint:"Framework + real example"},
  ];

  const generateNewQ=async()=>{
    setGL(true);setGenQ(null);setFB("");setAns("");
    const r=await callAI([{role:"user",content:`Generate a unique, insightful HR interview question on the topic "${genTopic}" that is commonly asked at top tech companies (Google, Amazon, Microsoft, startups).\n\nReturn ONLY a JSON object:\n{"q":"question text","hint":"what to focus on","why":"why interviewers ask this","category":"${genTopic}"}`}],
      "Senior HR interviewer. Generate creative, realistic questions. Return ONLY valid JSON.");
    try{const p=JSON.parse(r.replace(/```json|```/g,"").trim());setGenQ(p);}catch{setGenQ({q:"Tell me about a time you had to learn something completely new in a short timeframe.",hint:"Adaptability, learning speed, resourcefulness",why:"Tests growth mindset and adaptability",category:genTopic});}
    setGL(false);
  };

  const getFeedback=async(question)=>{
    if(!answer.trim())return;setLoad(true);setFB("");
    const r=await callAI([{role:"user",content:`HR Question: ${question}\n\nCandidate's Answer: ${answer}\n\nProvide:\n1. ✅ Strengths of this answer\n2. ⚠️ What's missing or weak\n3. 💡 Ideal answer structure\n4. 📊 Score: /10\n5. 🔄 One-line improved version`}],
      "Senior HR interviewer at top tech company. Honest, specific, encouraging feedback.");
    setFB(r);addXP(25,{interviewAnswered:prog.interviewAnswered+1});setLoad(false);
  };

  const getStrategy=async(question)=>{
    setLoad(true);setStrat("");
    const r=await callAI([{role:"user",content:`Provide the best answering strategy for this HR question:\n"${question}"\n\nInclude:\n1. Framework to use\n2. Key points to cover (bullet format)\n3. Strong sample answer\n4. What NOT to say\n5. Pro tip`}],
      "Career coach. Practical, specific HR interview strategy.");
    setStrat(r);setLoad(false);
  };

  const activeSel = mode==="generate" ? genQ : sel;

  return(
    <div className="fin">
      <PageTitle color={T.accentV}>👔 HR Questions</PageTitle>
      {/* Mode tabs */}
      <div style={{display:"flex",gap:"6px",marginBottom:"18px",padding:"4px",background:T.sidebar,borderRadius:"10px",width:"fit-content",border:`1px solid ${T.border2}`}}>
        {[["practice","📋 Preset Questions"],["generate","🤖 AI Generate (Unlimited)"]].map(([m,lbl])=>(
          <button key={m} onClick={()=>{setMode(m);setSel(null);setGenQ(null);setFB("");setStrat("");setAns("");}} style={{padding:"7px 16px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"16px",fontWeight:600,background:mode===m?T.accentV:"transparent",color:mode===m?"#fff":T.textMuted,transition:"all 0.15s"}}>{lbl}</button>
        ))}
      </div>

      {/* PRESET MODE */}
      {mode==="practice" && (
        <div style={{display:"grid",gridTemplateColumns:"340px 1fr",gap:"16px",alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {PRESET_HRQ.map(q=>(
              <div key={q.id} onClick={()=>{setSel(q);setAns("");setFB("");setStrat("");}} className="card-hover" style={{padding:"13px 14px",borderRadius:"10px",border:`1px solid ${sel?.id===q.id?T.accentV:T.border2}`,background:sel?.id===q.id?`${T.accentV}15`:T.card,cursor:"pointer"}}>
                <p style={{fontSize:"16px",fontWeight:600,color:T.text,marginBottom:"4px",lineHeight:1.5}}>{q.q}</p>
                <p style={{fontSize:"14px",color:T.textMuted}}>💡 {q.hint}</p>
              </div>
            ))}
          </div>
          <div>
            {sel ? (
              <Card>
                <h3 style={{fontSize:"17px",fontWeight:700,color:"#a5b4fc",marginBottom:"16px",lineHeight:1.5}}>"{sel.q}"</h3>
                <div style={{display:"flex",gap:"6px",marginBottom:"14px"}}>
                  <Btn onClick={()=>setMode("answer_mode")} color={T.accentV} style={{flex:1,textAlign:"center"}}>✍️ Write Answer</Btn>
                  <Btn onClick={()=>getStrategy(sel.q)} outline color={T.accentV} style={{flex:1,textAlign:"center"}}>{loading?"⏳...":"💡 Best Strategy"}</Btn>
                </div>
                <TA value={answer} onChange={e=>setAns(e.target.value)} placeholder="Type your answer... (Use STAR method for behavioral questions)" rows={6}/>
                <Btn onClick={()=>getFeedback(sel.q)} disabled={loading||!answer.trim()} color={T.accentV} style={{marginTop:"10px",width:"100%"}}>{loading?"⏳ Getting feedback...":"🤖 Get AI Feedback (+25 XP)"}</Btn>
                {strategy&&<AIBox title="Best Strategy" content={strategy} color={T.accentV}/>}
                {feedback&&<AIBox title="AI Feedback" content={feedback} color={T.accentV}/>}
              </Card>
            ) : (
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"300px",border:`1px dashed ${T.border2}`,borderRadius:"14px"}}>
                <EmptyState icon="👔" title="Select a question to practice" sub="Get AI feedback on your answers"/>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI GENERATE UNLIMITED MODE */}
      {mode==="generate" && (
        <div>
          <GCard color={T.accentV} style={{marginBottom:"16px"}}>
            <div style={{fontSize:"16px",color:T.textSub,fontWeight:600,marginBottom:"10px"}}>🤖 Generate Unlimited HR Questions</div>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"14px"}}>
              {hrTopics.map(t=>(
                <button key={t} onClick={()=>setGenTopic(t)} style={{padding:"6px 12px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"15px",fontWeight:600,background:genTopic===t?T.accentV:"#080c14",color:genTopic===t?"#fff":T.textMuted,transition:"all 0.15s"}}>{t}</button>
              ))}
            </div>
            <Btn onClick={generateNewQ} disabled={genLoad} color={T.accentV} style={{width:"100%",padding:"11px"}}>{genLoad?"⏳ Generating...":"⚡ Generate New HR Question"}</Btn>
          </GCard>

          {genLoad && <div style={{textAlign:"center",padding:"40px"}}><div style={{fontSize:"36px",animation:"pulse 1s infinite"}}>💼</div><p style={{color:T.textMuted,marginTop:"10px"}}>Generating {genTopic} question...</p></div>}

          {genQ && !genLoad && (
            <Card className="fin">
              <div style={{display:"flex",gap:"8px",alignItems:"flex-start",marginBottom:"14px",flexWrap:"wrap"}}>
                <Badge2 color={T.accentV}>{genQ.category||genTopic}</Badge2>
              </div>
              <h3 style={{fontSize:"19px",fontWeight:700,color:T.text,marginBottom:"10px",lineHeight:1.6}}>"{genQ.q}"</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"16px"}}>
                <div style={{padding:"12px",background:"#000000",borderRadius:"9px",border:`1px solid ${T.border2}`}}>
                  <div style={{fontSize:"14px",color:T.accentV,fontWeight:700,marginBottom:"5px"}}>FOCUS</div>
                  <p style={{fontSize:"16px",color:T.textSub}}>{genQ.hint}</p>
                </div>
                <div style={{padding:"12px",background:"#000000",borderRadius:"9px",border:`1px solid ${T.border2}`}}>
                  <div style={{fontSize:"14px",color:T.cyan,fontWeight:700,marginBottom:"5px"}}>WHY ASKED</div>
                  <p style={{fontSize:"16px",color:T.textSub}}>{genQ.why}</p>
                </div>
              </div>
              <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>
                <Btn onClick={()=>getStrategy(genQ.q)} outline color={T.accentV} disabled={loading}>{loading?"⏳...":"💡 Strategy"}</Btn>
                <Btn onClick={generateNewQ} outline color={T.textMuted}>🔄 New Question</Btn>
              </div>
              <TA value={answer} onChange={e=>setAns(e.target.value)} placeholder="Write your answer here..." rows={6}/>
              <Btn onClick={()=>getFeedback(genQ.q)} disabled={loading||!answer.trim()} color={T.accentV} style={{marginTop:"10px",width:"100%"}}>{loading?"⏳ Getting feedback...":"🤖 Get AI Feedback (+25 XP)"}</Btn>
              {strategy&&<AIBox title="Best Strategy" content={strategy} color={T.cyan}/>}
              {feedback&&<AIBox title="AI Feedback" content={feedback} color={T.accentV}/>}
            </Card>
          )}
          {!genQ && !genLoad && <EmptyState icon="🤖" title="Generate unlimited HR questions" sub="Click 'Generate New HR Question' to get started"/>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  INTERVIEW — B.TECH
// ═══════════════════════════════════════════════════
function InterviewBtech({prog,addXP}){
  const [sel,setSel]=useState(null);
  const [answer,setAns]=useState("");
  const [feedback,setFB]=useState("");
  const [loading,setLoad]=useState(false);
  const [subF,setSubF]=useState("All");
  const subs=["All","OS","DBMS","CN","OOP","DSA"];

  const getFeedback=async()=>{
    if(!sel||!answer.trim())return;setLoad(true);setFB("");
    const r=await callAI([{role:"user",content:`Subject: ${sel.sub}\nQ: ${sel.q}\nAnswer: ${answer}\n\nEvaluate:\n1. ✅ What's correct\n2. ⚠️ What's missing\n3. 📖 Ideal answer\n4. 📊 Score /10`}],
      "CS professor. Accurate technical evaluation. Specific about what's right/wrong.");
    setFB(r);addXP(30,{interviewAnswered:prog.interviewAnswered+1});setLoad(false);
  };
  const getIdeal=async()=>{
    setLoad(true);setFB("");
    const r=await callAI([{role:"user",content:`Give comprehensive interview-ready answer for:\nSubject: ${sel.sub}\nQ: ${sel.q}\n\nInclude: concepts, examples, diagrams in text, follow-up questions.`}],"Expert CS teacher. Thorough, interview-ready answer.");
    setFB(r);setLoad(false);
  };
  const filtered=subF==="All"?BTECH_QUESTIONS:BTECH_QUESTIONS.filter(q=>q.sub===subF);

  return(
    <div className="fin">
      <PageTitle color={T.accentV}>🎓 B.Tech Subjects</PageTitle>
      <div style={{display:"flex",gap:"6px",marginBottom:"16px",flexWrap:"wrap"}}>
        {subs.map(s=><button key={s} onClick={()=>setSubF(s)} style={{padding:"6px 14px",borderRadius:"999px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"15px",fontWeight:700,background:subF===s?(subCol[s]||T.accentV):"#080c14",color:"#fff",opacity:subF===s?1:0.55,transition:"all 0.15s"}}>{s}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"10px",marginBottom:"16px"}}>
        {filtered.map(q=>(
          <div key={q.id} onClick={()=>{setSel(q);setAns("");setFB("");}} className="card-hover" style={{padding:"14px",borderRadius:"10px",border:`1px solid ${sel?.id===q.id?subCol[q.sub]||T.accentV:T.border2}`,background:sel?.id===q.id?`${subCol[q.sub]||T.accentV}12`:T.card,cursor:"pointer"}}>
            <Badge2 color={subCol[q.sub]||T.accentV}>{q.sub}</Badge2>
            <p style={{fontSize:"16px",fontWeight:600,color:T.text,marginTop:"8px",marginBottom:"5px",lineHeight:1.5}}>{q.q}</p>
            <p style={{fontSize:"14px",color:T.textMuted}}>💡 {q.hint}</p>
          </div>
        ))}
      </div>
      {sel&&(
        <Card className="fin">
          <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"14px",flexWrap:"wrap"}}>
            <Badge2 color={subCol[sel.sub]||T.accentV}>{sel.sub}</Badge2>
            <p style={{fontSize:"17px",fontWeight:700,color:T.text,flex:1}}>{sel.q}</p>
          </div>
          <TA value={answer} onChange={e=>setAns(e.target.value)} placeholder="Write your answer here..." rows={5}/>
          <div style={{display:"flex",gap:"8px",marginTop:"10px",flexWrap:"wrap"}}>
            <Btn onClick={getFeedback} disabled={loading||!answer.trim()} color={T.accentV}>{loading?"⏳...":"🤖 Evaluate (+30 XP)"}</Btn>
            <Btn onClick={getIdeal} disabled={loading} outline color={T.textMuted}>{loading?"⏳...":"📖 Ideal Answer"}</Btn>
          </div>
          {feedback&&<AIBox title="Evaluation" content={feedback} color={T.accentV}/>}
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  PROGRESS
// ═══════════════════════════════════════════════════
function Progress({prog,user}){
  const lv=Math.floor(prog.xp/100)+1;
  const today=new Date();
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const weekXP=days.map((_,i)=>{
    const d=new Date(today);d.setDate(today.getDate()-6+i);
    return (prog.history||[]).filter(h=>new Date(h.date).toDateString()===d.toDateString()).reduce((a,h)=>a+h.xp,0);
  });
  const maxW=Math.max(...weekXP,1);

  return(
    <div className="fin">
      <PageTitle color={T.accent}>📈 My Progress</PageTitle>
      {/* Stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"10px",marginBottom:"18px"}}>
        {[["💻",prog.totalSolved,"Problems Solved",T.accentV],["🔥",`${prog.streak}d`,"Streak",T.orange],["⚡",`${prog.xp}xp`,"Total XP",T.accent],["🎯",prog.interviewAnswered,"Interview Qs",T.green],["📊",prog.atsScore??"-","ATS Score",T.cyan],["📚",(prog.completedTopics||[]).length,"Topics Done",T.accent],["🏅",prog.earnedBadges.length,"Badges",T.pink],["🎓",`Lv${lv}`,"Level",T.accentV]].map(([ic,val,lbl,col],i)=>(
          <GCard key={i} color={col} style={{textAlign:"center",padding:"14px"}}>
            <div style={{fontSize:"24px",marginBottom:"4px"}}>{ic}</div>
            <div style={{fontSize:"24px",fontWeight:800,color:col,letterSpacing:"-0.5px"}}>{val}</div>
            <div style={{fontSize:"13px",color:T.textMuted,marginTop:"2px"}}>{lbl}</div>
          </GCard>
        ))}
      </div>

      {/* Level */}
      <Card style={{marginBottom:"14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
          <span style={{fontSize:"16px",fontWeight:700}}>⚡ Level {lv}</span>
          <span style={{fontSize:"15px",color:T.textMuted}}>{prog.xp%100}/100 XP to Lv{lv+1}</span>
        </div>
        <div style={{background:T.border2,borderRadius:"999px",height:"8px",overflow:"hidden"}}>
          <div style={{width:`${prog.xp%100}%`,height:"100%",background:`linear-gradient(90deg,${T.accent},${T.accentV})`,borderRadius:"999px",transition:"width 0.6s"}}/>
        </div>
      </Card>

      {/* Weekly bar chart */}
      <Card style={{marginBottom:"14px"}}>
        <div style={{fontSize:"16px",fontWeight:700,marginBottom:"16px",color:T.textSub}}>📅 Weekly XP Activity</div>
        <div style={{display:"flex",gap:"8px",alignItems:"flex-end",height:"90px"}}>
          {weekXP.map((xp,i)=>{
            const isToday=i===6;
            return(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
                {xp>0&&<div style={{fontSize:"9px",color:T.textMuted}}>{xp}</div>}
                <div style={{width:"100%",borderRadius:"4px 4px 0 0",height:`${Math.max(xp/maxW*70,3)}px`,background:isToday?`linear-gradient(180deg,${T.accent},${T.accentV})`:`${T.border2}`,boxShadow:isToday?`0 0 12px ${T.accent}60`:""}}/>
                <div style={{fontSize:"9px",color:isToday?T.accent:T.textMuted,fontWeight:isToday?700:400}}>{days[i]}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 30-day streak */}
      <Card style={{marginBottom:"14px"}}>
        <div style={{fontSize:"16px",fontWeight:700,marginBottom:"12px",color:T.textSub}}>🔥 Activity — Last 30 Days</div>
        <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
          {Array.from({length:30},(_,i)=>{
            const d=new Date(today);d.setDate(today.getDate()-29+i);
            const active=(prog.history||[]).some(h=>new Date(h.date).toDateString()===d.toDateString());
            const isToday=i===29;
            return <div key={i} style={{width:"20px",height:"20px",borderRadius:"4px",background:active?T.green:T.border2,boxShadow:isToday?`0 0 8px ${T.green}60`:""}} title={d.toDateString()}/>;
          })}
        </div>
        <div style={{fontSize:"13px",color:T.textMuted,marginTop:"8px"}}>Green = active day</div>
      </Card>

      {/* Badges */}
      <Card>
        <div style={{fontSize:"16px",fontWeight:700,marginBottom:"14px",color:T.textSub}}>🏅 Badges — {prog.earnedBadges.length}/{BADGES.length} Earned</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:"8px"}}>
          {BADGES.map(b=>{
            const earned=prog.earnedBadges.includes(b.id);
            return(
              <div key={b.id} style={{textAlign:"center",padding:"12px 8px",borderRadius:"10px",background:earned?`${T.accentV}12`:T.sidebar,border:`1px solid ${earned?T.accentV:T.border2}`,opacity:earned?1:0.35,transition:"all 0.2s"}}>
                <div style={{fontSize:"26px",marginBottom:"5px"}}>{b.icon}</div>
                <div style={{fontSize:"14px",fontWeight:700,color:earned?T.text:T.textMuted}}>{b.name}</div>
                <div style={{fontSize:"9px",color:T.textMuted,marginTop:"2px"}}>{b.desc}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  CHATBOTS
// ═══════════════════════════════════════════════════
function ChatCourse(){
  const sugg=["Explain closures in JavaScript","What is Big-O notation?","How does async/await work?","Difference between SQL and NoSQL","What is React reconciliation?","Explain dynamic programming","What is REST API?"];
  return <ChatUI title="📚 Course Doubts" subtitle="Ask anything about programming, DSA, web dev, or any concept" color={T.pink} botIcon="📚"
    system="You are an expert CS tutor. Explain concepts clearly with examples and code blocks. Cover JS, Python, C++, Java, DSA, Web Dev, React, Node.js. Be friendly and educational."
    sugg={sugg}/>;
}
function ChatCode(){
  const [lang,setLang]=useState("JavaScript");
  const sugg=["Write binary search","Debug: for(i=0;i<arr.len;i++)","Sort array without built-in sort","Implement a stack","Fibonacci with memoization","Find longest palindrome substring"];
  return <ChatUI title="💻 Code Assistant" subtitle={`Write, debug, and optimize code`} color={T.pink} botIcon="💻"
    system={`You are an expert ${lang} developer. Write clean, efficient, commented code. Use code blocks. Explain approach and complexity.`}
    sugg={sugg} extra={<div style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{fontSize:"15px",color:T.textMuted}}>Language:</span><SelField value={lang} onChange={setLang} options={LANGS}/></div>}/>;
}

function ChatUI({title,subtitle,color,botIcon,system,sugg,extra}){
  const [msgs,setMsgs]=useState([{role:"assistant",content:`👋 Hi! I'm your ${title.split(" ").slice(1).join(" ")}.\n\n${subtitle}\n\nHow can I help you today?`}]);
  const [input,setInput]=useState("");
  const [loading,setLoad]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const um={role:"user",content:input};
    setMsgs(m=>[...m,um]);setInput("");setLoad(true);
    try{
      const r=await callAI([...msgs,um].map(m=>({role:m.role,content:m.content})),system);
      setMsgs(m=>[...m,{role:"assistant",content:r}]);
    }catch{setMsgs(m=>[...m,{role:"assistant",content:"Error. Please try again."}]);}
    setLoad(false);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 136px)"}} className="fin">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px",flexWrap:"wrap",gap:"8px"}}>
        <div>
          <h2 style={{fontSize:"22px",fontWeight:800,color,letterSpacing:"-0.3px"}}>{title}</h2>
          <p style={{fontSize:"15px",color:T.textMuted}}>{subtitle}</p>
        </div>
        {extra}
      </div>
      {/* Chat messages */}
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"10px",marginBottom:"10px",paddingRight:"2px"}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:"8px"}}>
            {m.role==="assistant"&&<div style={{width:"26px",height:"26px",borderRadius:"8px",background:`linear-gradient(135deg,${color},${T.accentV})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:0,boxShadow:`0 0 10px ${color}40`}}>{botIcon}</div>}
            <div style={{padding:"11px 14px",borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",background:m.role==="user"?`linear-gradient(135deg,${T.accent},${T.accentV})`:"#070a12",color:"#e8edf8",maxWidth:"80%",fontSize:"16px",lineHeight:1.75,whiteSpace:"pre-wrap",wordBreak:"break-word",border:m.role==="assistant"?`1px solid ${T.border2}`:"none",boxShadow:m.role==="user"?`0 4px 16px ${T.accent}30`:""}}>{m.content}</div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",alignItems:"flex-end",gap:"8px"}}>
            <div style={{width:"26px",height:"26px",borderRadius:"8px",background:`linear-gradient(135deg,${color},${T.accentV})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"}}>{botIcon}</div>
            <div style={{padding:"11px 14px",borderRadius:"14px 14px 14px 3px",background:"#070a12",border:`1px solid ${T.border2}`,display:"flex",gap:"4px",alignItems:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:"6px",height:"6px",borderRadius:"50%",background:color,animation:`pulse 1s ${i*0.2}s infinite`}}/>)}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>
      {/* Suggestions */}
      <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"8px"}}>
        {sugg.map(s=><button key={s} onClick={()=>setInput(s)} style={{padding:"5px 11px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:"999px",color:T.textMuted,fontSize:"14px",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>{s}</button>)}
      </div>
      {/* Input */}
      <div style={{display:"flex",gap:"8px"}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Ask your question..."
          style={{flex:1,padding:"12px 16px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:"10px",color:T.text,fontFamily:"inherit",fontSize:"16px",outline:"none",transition:"border-color 0.2s"}}
          onFocus={e=>e.target.style.borderColor=color} onBlur={e=>e.target.style.borderColor=T.border2}/>
        <button onClick={send} disabled={loading} style={{padding:"12px 20px",borderRadius:"10px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"16px",background:`linear-gradient(135deg,${color},${T.accentV})`,color:"#fff",boxShadow:`0 4px 16px ${color}40`,transition:"all 0.15s"}}>Send →</button>
      </div>
    </div>
  );
}