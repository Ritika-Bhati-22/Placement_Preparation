import { useState, useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const LANGUAGES = ["JavaScript","Python","C++","Java","C","Go","Rust","TypeScript","Ruby","Swift","Kotlin","PHP","C#","Scala","R"];

const BADGES = [
  { id:"first_solve", name:"First Blood",    icon:"🩸", desc:"Solve your first problem" },
  { id:"streak_3",    name:"On Fire",         icon:"🔥", desc:"3 day streak" },
  { id:"streak_7",    name:"Week Warrior",    icon:"⚔️",  desc:"7 day streak" },
  { id:"streak_30",   name:"Legend",          icon:"👑", desc:"30 day streak" },
  { id:"solve_10",    name:"Tenacious",       icon:"💪", desc:"Solve 10 problems" },
  { id:"solve_50",    name:"Grinder",         icon:"⚙️",  desc:"Solve 50 problems" },
  { id:"solve_100",   name:"Century",         icon:"💎", desc:"Solve 100 problems" },
  { id:"interview_5", name:"Interview Ready", icon:"🎯", desc:"Answer 5 interview Qs" },
  { id:"ats_80",      name:"ATS Champion",    icon:"📊", desc:"ATS score above 80" },
  { id:"resume_done", name:"Resume Pro",      icon:"📄", desc:"Built your first resume" },
  { id:"course_done", name:"Scholar",         icon:"🎓", desc:"Complete a course module" },
];

const PROBLEMS = [
  { id:1,  title:"Two Sum",                                    tags:["Array","Hash Map"],          diff:"Easy",   desc:"Given array nums and integer target, return indices of two numbers that add up to target.",             example:"Input: nums=[2,7,11,15], target=9\nOutput: [0,1]" },
  { id:2,  title:"Reverse String",                             tags:["String","Two Pointers"],     diff:"Easy",   desc:"Write a function that reverses a string. Input is given as an array of characters.",                   example:"Input: ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']" },
  { id:3,  title:"FizzBuzz",                                   tags:["Math","String"],             diff:"Easy",   desc:"Return 'FizzBuzz' if divisible by 3&5, 'Fizz' by 3, 'Buzz' by 5, else the number as string.",        example:"Input: n=5\nOutput: ['1','2','Fizz','4','Buzz']" },
  { id:4,  title:"Valid Parentheses",                          tags:["Stack","String"],            diff:"Easy",   desc:"Given string with '(){}[]', determine if the input string is valid.",                                 example:"Input: '()[]{}\'\nOutput: true" },
  { id:5,  title:"Best Time to Buy and Sell Stock",            tags:["Array","Greedy"],            diff:"Easy",   desc:"Find maximum profit by choosing a single buy day and a later sell day.",                             example:"Input: [7,1,5,3,6,4]\nOutput: 5" },
  { id:6,  title:"Longest Substring Without Repeating Chars",  tags:["Sliding Window","Hash Map"], diff:"Medium", desc:"Find the length of the longest substring without repeating characters.",                            example:"Input: 'abcabcbb'\nOutput: 3" },
  { id:7,  title:"Merge Intervals",                            tags:["Array","Sorting"],           diff:"Medium", desc:"Merge all overlapping intervals and return non-overlapping intervals array.",                         example:"Input: [[1,3],[2,6],[8,10]]\nOutput: [[1,6],[8,10]]" },
  { id:8,  title:"Binary Tree Level Order Traversal",          tags:["BFS","Tree"],                diff:"Medium", desc:"Return level order traversal of binary tree node values.",                                           example:"Input: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]" },
  { id:9,  title:"Kth Largest Element in Array",               tags:["Heap","Quick Select"],       diff:"Medium", desc:"Find the kth largest element in an unsorted array.",                                                 example:"Input: nums=[3,2,1,5,6,4], k=2\nOutput: 5" },
  { id:10, title:"Coin Change",                                 tags:["DP"],                        diff:"Medium", desc:"Find fewest number of coins to make amount. Return -1 if not possible.",                            example:"Input: coins=[1,5,11], amount=11\nOutput: 3" },
  { id:11, title:"Median of Two Sorted Arrays",                 tags:["Binary Search","D&C"],       diff:"Hard",   desc:"Find median of two sorted arrays. Required: O(log(m+n)).",                                           example:"Input: [1,3],[2]\nOutput: 2.0" },
  { id:12, title:"Trapping Rain Water",                         tags:["Two Pointers","Stack"],      diff:"Hard",   desc:"Given elevation map, compute how much water it can trap after raining.",                             example:"Input: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6" },
];

const IQ = [
  { id:1,  cat:"DSA",           q:"Explain BFS vs DFS — when would you use each?",                       hint:"Traversal, shortest paths, memory." },
  { id:2,  cat:"System Design", q:"How would you design a URL shortener like bit.ly?",                    hint:"Hashing, DB, scalability, redirects." },
  { id:3,  cat:"OOP",           q:"Explain SOLID principles with real-world examples.",                   hint:"SRP, OCP, LSP, ISP, DIP." },
  { id:4,  cat:"OS",            q:"Difference between process and thread?",                               hint:"Memory, context switch, overhead." },
  { id:5,  cat:"Database",      q:"What is indexing and how does it improve performance?",                hint:"B-tree, hash index, write trade-offs." },
  { id:6,  cat:"React",         q:"Explain React reconciliation algorithm and Virtual DOM.",              hint:"Diffing, keys, fiber architecture." },
  { id:7,  cat:"HR",            q:"Tell about a team conflict. How did you resolve it?",                  hint:"STAR method." },
  { id:8,  cat:"Networking",    q:"What happens when you type google.com in browser?",                    hint:"DNS, TCP, HTTP, TLS, rendering." },
  { id:9,  cat:"JavaScript",    q:"Explain event loop, call stack, microtasks, macrotasks.",              hint:"Promise queue vs setTimeout queue." },
  { id:10, cat:"HR",            q:"Why should we hire you? What makes you different?",                    hint:"Unique strengths + company alignment." },
  { id:11, cat:"DSA",           q:"What is the difference between array and linked list?",               hint:"Memory, access time, insertion/deletion." },
  { id:12, cat:"System Design", q:"Design a notification system like WhatsApp push notifications.",       hint:"Message queues, WebSockets, mobile push." },
];

const COURSES = [
  { id:"mdn",     name:"MDN Web Docs",        url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", icon:"📚", color:"#1a73e8", tag:"JavaScript", topics:["Variables & Types","Functions","Promises & Async","DOM Manipulation","Fetch API","ES6+ Features"] },
  { id:"gfg",     name:"GeeksforGeeks DSA",   url:"https://www.geeksforgeeks.org/data-structures/",               icon:"🌿", color:"#2f8d46", tag:"DSA",        topics:["Arrays & Strings","Linked Lists","Trees & Graphs","Dynamic Programming","Sorting Algorithms","Recursion"] },
  { id:"gfg-sys", name:"GFG System Design",   url:"https://www.geeksforgeeks.org/system-design-tutorial/",        icon:"⚙️",  color:"#059669", tag:"System Design",topics:["Load Balancing","Database Sharding","Caching Strategies","CAP Theorem","Microservices","API Design"] },
  { id:"w3",      name:"W3Schools",            url:"https://www.w3schools.com/",                                   icon:"🎓", color:"#04aa6d", tag:"Web Dev",    topics:["HTML5 Basics","CSS Flexbox & Grid","Responsive Design","Bootstrap","SQL Basics","Python Intro"] },
  { id:"fcc",     name:"freeCodeCamp",         url:"https://www.freecodecamp.org/learn/",                          icon:"🔥", color:"#f1be32", tag:"Full Stack",  topics:["Responsive Web Design","JavaScript Algorithms","Front End Dev","APIs & Microservices","Data Visualization","Quality Assurance"] },
  { id:"odin",    name:"The Odin Project",     url:"https://www.theodinproject.com/paths",                         icon:"⚔️",  color:"#d14000", tag:"Full Stack",  topics:["Web Dev Foundations","JavaScript Path","React Path","Node.js Path","Databases","Ruby on Rails"] },
  { id:"cs50",    name:"CS50 Harvard",         url:"https://cs50.harvard.edu/x/",                                  icon:"🏛️", color:"#a41034", tag:"CS Fundamentals",topics:["C Language","Arrays & Memory","Data Structures","Python","SQL","Web Dev with Flask"] },
  { id:"jsi",     name:"JavaScript.info",      url:"https://javascript.info/",                                     icon:"💛", color:"#d97706", tag:"JavaScript",  topics:["JS Fundamentals","Objects & Prototypes","Classes","Async JS","Browser APIs","Node.js Basics"] },
  { id:"road",    name:"Roadmap.sh",           url:"https://roadmap.sh/",                                          icon:"🗺️", color:"#8b5cf6", tag:"Career Path", topics:["Frontend Roadmap","Backend Roadmap","DevOps Path","React Path","Node.js Path","SQL Roadmap"] },
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

// ─── AI ───────────────────────────────────────────────────────────────────────
async function ai(messages, system = "") {
  const body = { model:"claude-sonnet-4-20250514", max_tokens:1000, messages };
  if (system) body.system = system;
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)
  });
  const d = await r.json();
  return d.content?.map(b => b.text || "").join("") || "Error. Please try again.";
}

// ─── Storage ──────────────────────────────────────────────────────────────────
const saveUsers = (u) => { try { localStorage.setItem("df_users", JSON.stringify(u)); } catch {} };
const loadUsers = () => { try { return JSON.parse(localStorage.getItem("df_users") || "{}"); } catch { return {}; } };
const defaultProgress = () => ({ streak:0, lastActive:"", totalSolved:0, interviewAnswered:0, xp:0, earnedBadges:[], solvedIds:[], atsScore:null, resumeBuilt:false, lcProgress:0, hrProgress:0, completedTopics:[] });

// ─── Design ───────────────────────────────────────────────────────────────────
const C = { bg:"#0f1117", sidebar:"#13151f", card:"#1a1d2e", border:"#252840", accent:"#6366f1", text:"#e2e8f0", muted:"#64748b", navBg:"#0d0f1a" };

// ─── NEW Sidebar Nav — 5 clear sections ───────────────────────────────────────
const NAV = [
  { section:"MAIN", items:[
    { id:"dashboard", label:"Dashboard",    icon:"🏠" },
  ]},
  { section:"🎯 INTERVIEW PREP", items:[
    { id:"interview",      label:"Interview Qs",     icon:"🧠" },
    { id:"mock",           label:"Mock Interview",   icon:"🎤" },
    { id:"ats",            label:"ATS Score",        icon:"📊" },
  ]},
  { section:"💻 CODING", items:[
    { id:"practice",   label:"DSA Practice",    icon:"🖥️" },
    { id:"aiq",        label:"AI Questions",    icon:"🤖" },
    { id:"leetcode",   label:"LeetCode",        icon:"🔗" },
    { id:"hackerrank", label:"HackerRank",      icon:"🏆" },
    { id:"codeforces", label:"Codeforces",      icon:"⚡" },
  ]},
  { section:"📄 RESUME", items:[
    { id:"resume_build",   label:"Build Resume",     icon:"✨" },
    { id:"resume_analyze", label:"Analyze Resume",   icon:"🔍" },
    { id:"resume_tailor",  label:"Tailor for Job",   icon:"🎯" },
  ]},
  { section:"📚 COURSES", items:[
    { id:"courses",   label:"All Courses",      icon:"🎓" },
    { id:"mdn_learn", label:"MDN — Web Dev",    icon:"📘" },
    { id:"gfg_learn", label:"GFG — DSA",        icon:"🌿" },
  ]},
  { section:"AI", items:[
    { id:"chat", label:"AI Chatbot", icon:"💬" },
  ]},
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]     = useState("auth");
  const [authMode, setAuthMode] = useState("login");
  const [authName, setAuthName] = useState("");
  const [authPwd, setAuthPwd]   = useState("");
  const [authErr, setAuthErr]   = useState("");
  const [user, setUser]         = useState("");
  const [progress, setProgress] = useState(defaultProgress());
  const [tab, setTab]           = useState("dashboard");
  const [sidebar, setSidebar]   = useState(true);
  // collapsed sections in sidebar
  const [collapsed, setCollapsed] = useState({});

  const saveProgress = (p) => {
    const users = loadUsers(); users[user] = p; saveUsers(users); setProgress(p);
  };
  const checkBadges = (p) => {
    const b = [...(p.earnedBadges||[])];
    const add = (id) => { if (!b.includes(id)) b.push(id); };
    if (p.totalSolved>=1)          add("first_solve");
    if (p.streak>=3)               add("streak_3");
    if (p.streak>=7)               add("streak_7");
    if (p.streak>=30)              add("streak_30");
    if (p.totalSolved>=10)         add("solve_10");
    if (p.totalSolved>=50)         add("solve_50");
    if (p.totalSolved>=100)        add("solve_100");
    if (p.interviewAnswered>=5)    add("interview_5");
    if ((p.atsScore||0)>=80)       add("ats_80");
    if (p.resumeBuilt)             add("resume_done");
    if ((p.completedTopics||[]).length>=1) add("course_done");
    return { ...p, earnedBadges:b };
  };
  const addXP = (amount, extra={}) => {
    const today = new Date().toDateString();
    let p = { ...progress, xp:progress.xp+amount, ...extra };
    if (p.lastActive!==today) p = { ...p, streak:p.streak+1, lastActive:today };
    saveProgress(checkBadges(p));
  };

  const handleAuth = () => {
    const name = authName.trim().toLowerCase().replace(/\s+/g,"_");
    if (!name||!authPwd) { setAuthErr("Naam aur password dono bharo!"); return; }
    const users = loadUsers();
    if (authMode==="register") {
      if (users[name]) { setAuthErr("Ye naam already exist karta hai!"); return; }
      const nu = { ...defaultProgress(), _pwd:authPwd };
      users[name]=nu; saveUsers(users);
      setUser(name); setProgress(nu); setScreen("app");
    } else {
      if (!users[name]) { setAuthErr("Account nahi mila. Register karo."); return; }
      if (users[name]._pwd && users[name]._pwd!==authPwd) { setAuthErr("Password galat hai!"); return; }
      setUser(name); setProgress(users[name]); setScreen("app");
    }
    setAuthErr("");
  };
  const logout = () => { setScreen("auth"); setUser(""); setProgress(defaultProgress()); setAuthName(""); setAuthPwd(""); };
  const toggleCollapse = (section) => setCollapsed(c=>({...c,[section]:!c[section]}));

  // ── Auth Screen ──────────────────────────────────────────────────────────────
  if (screen==="auth") return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 30% 20%,#1e1b4b,#0f1117)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter','Segoe UI',sans-serif",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:"400px"}}>
        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <div style={{fontSize:"44px"}}>⚡</div>
          <h1 style={{fontSize:"26px",fontWeight:800,color:"#e2e8f0",margin:"8px 0 4px"}}>DevForge</h1>
          <p style={{color:"#64748b",fontSize:"13px"}}>Your complete coding career platform</p>
        </div>
        <div style={{background:"#1a1d2e",border:"1px solid #252840",borderRadius:"16px",padding:"28px"}}>
          <h2 style={{color:"#e2e8f0",fontSize:"18px",fontWeight:700,marginBottom:"20px",textAlign:"center"}}>
            {authMode==="login"?"Wapas aao! 👋":"Account banao 🚀"}
          </h2>
          <div style={{marginBottom:"12px"}}>
            <label style={Lbl}>Naam</label>
            <input style={Inp} value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="apna naam..." onKeyDown={e=>e.key==="Enter"&&handleAuth()} />
          </div>
          <div style={{marginBottom:"12px"}}>
            <label style={Lbl}>Password</label>
            <input type="password" style={Inp} value={authPwd} onChange={e=>setAuthPwd(e.target.value)} placeholder="password..." onKeyDown={e=>e.key==="Enter"&&handleAuth()} />
          </div>
          {authErr && <div style={{background:"#450a0a",border:"1px solid #ef4444",borderRadius:"8px",padding:"10px",color:"#fca5a5",fontSize:"13px",marginBottom:"12px"}}>{authErr}</div>}
          <button onClick={handleAuth} style={{width:"100%",padding:"12px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",border:"none",borderRadius:"10px",color:"#fff",fontWeight:700,fontSize:"15px",cursor:"pointer",fontFamily:"inherit"}}>
            {authMode==="login"?"Login →":"Register →"}
          </button>
          <p style={{textAlign:"center",marginTop:"14px",color:"#64748b",fontSize:"13px"}}>
            {authMode==="login"?"Account nahi? ":"Already account hai? "}
            <span onClick={()=>{setAuthMode(m=>m==="login"?"register":"login");setAuthErr("");}} style={{color:"#818cf8",cursor:"pointer",fontWeight:600}}>
              {authMode==="login"?"Register":"Login"}
            </span>
          </p>
        </div>
        <p style={{textAlign:"center",color:"#374151",fontSize:"11px",marginTop:"12px"}}>✅ Progress sirf tumhari — private & secure</p>
      </div>
    </div>
  );

  // ── App Shell ────────────────────────────────────────────────────────────────
  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:C.bg,fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text}}>
      {/* Top Nav */}
      <nav style={{height:"54px",background:C.navBg,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",padding:"0 16px",gap:"8px",position:"sticky",top:0,zIndex:200,flexShrink:0}}>
        <button onClick={()=>setSidebar(s=>!s)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:"18px",padding:"6px",flexShrink:0}}>☰</button>
        <span style={{fontSize:"18px"}}>⚡</span>
        <span style={{fontWeight:800,fontSize:"15px",background:"linear-gradient(90deg,#818cf8,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",flexShrink:0}}>DevForge</span>
        {/* Quick Nav pills */}
        <div style={{display:"flex",gap:"2px",overflow:"hidden",flexWrap:"nowrap"}}>
          {[["dashboard","🏠"],["interview","🎯 Interview"],["practice","💻 Coding"],["courses","📚 Courses"],["resume_build","📄 Resume"],["chat","💬 AI"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{padding:"5px 10px",borderRadius:"7px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:600,background:tab===id?"#6366f1":"transparent",color:tab===id?"#fff":"#94a3b8",whiteSpace:"nowrap"}}>
              {lbl}
            </button>
          ))}
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
          <span style={{fontSize:"12px",color:"#f97316",fontWeight:700}}>🔥{progress.streak}d</span>
          <span style={{fontSize:"12px",color:"#818cf8",fontWeight:700}}>⚡Lv.{Math.floor(progress.xp/100)+1}</span>
          <div style={{width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700}}>{user[0]?.toUpperCase()}</div>
          <button onClick={logout} style={{padding:"5px 10px",borderRadius:"6px",border:`1px solid ${C.border}`,background:"none",color:C.muted,cursor:"pointer",fontSize:"12px",fontFamily:"inherit"}}>Logout</button>
        </div>
      </nav>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* ── Sidebar ── */}
        {sidebar && (
          <aside style={{width:"210px",background:C.sidebar,borderRight:`1px solid ${C.border}`,padding:"12px 8px",overflowY:"auto",flexShrink:0}}>
            {NAV.map(({section,items})=>(
              <div key={section} style={{marginBottom:"4px"}}>
                {/* Section header — clickable to collapse */}
                <div onClick={()=>toggleCollapse(section)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"10px",fontWeight:700,color:section==="MAIN"||section==="AI"?C.muted:"#818cf8",letterSpacing:"0.08em",padding:"8px 8px 4px",cursor:"pointer",userSelect:"none"}}>
                  <span>{section}</span>
                  {section!=="MAIN"&&section!=="AI"&&<span style={{fontSize:"10px",color:C.muted}}>{collapsed[section]?"▶":"▼"}</span>}
                </div>
                {!collapsed[section] && items.map(({id,label,icon})=>(
                  <button key={id} onClick={()=>setTab(id)} style={{width:"100%",display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:tab===id?700:400,background:tab===id?"linear-gradient(135deg,#312e81,#1e1b4b)":"transparent",color:tab===id?"#a5b4fc":C.muted,marginBottom:"1px",transition:"all 0.15s",textAlign:"left"}}>
                    <span style={{fontSize:"14px"}}>{icon}</span>
                    <span style={{flex:1}}>{label}</span>
                    {tab===id&&<span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#6366f1",flexShrink:0}}/>}
                  </button>
                ))}
              </div>
            ))}
            {/* XP progress */}
            <div style={{margin:"12px 4px 0",padding:"12px",background:C.card,borderRadius:"10px",border:`1px solid ${C.border}`}}>
              <div style={{fontSize:"11px",color:C.muted,marginBottom:"5px"}}>Lv.{Math.floor(progress.xp/100)+1} • {progress.xp%100}/100 XP</div>
              <div style={{background:"#1e293b",borderRadius:"999px",height:"5px"}}>
                <div style={{width:`${progress.xp%100}%`,height:"100%",background:"linear-gradient(90deg,#6366f1,#8b5cf6)",borderRadius:"999px"}}/>
              </div>
              <div style={{fontSize:"11px",color:"#f97316",marginTop:"6px",fontWeight:700}}>🔥{progress.streak}d streak</div>
              <div style={{fontSize:"10px",color:C.muted,marginTop:"2px"}}>💻{progress.totalSolved} solved • 🏅{progress.earnedBadges.length} badges</div>
            </div>
          </aside>
        )}

        {/* ── Main Content ── */}
        <main style={{flex:1,overflowY:"auto",padding:"24px"}}>
          {tab==="dashboard"      && <Dashboard progress={progress} setTab={setTab} user={user}/>}
          {/* Interview section */}
          {tab==="interview"      && <Interview progress={progress} addXP={addXP}/>}
          {tab==="mock"           && <MockInterview progress={progress} addXP={addXP}/>}
          {tab==="ats"            && <ATSScore progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {/* Coding section */}
          {tab==="practice"       && <Practice progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {tab==="aiq"            && <AIQuestions progress={progress} addXP={addXP}/>}
          {tab==="leetcode"       && <ExtSite url="https://leetcode.com" name="LeetCode" color="#f89f1b" links={[["Problems","https://leetcode.com/problemset/"],["Study Plan","https://leetcode.com/study-plan/"],["Explore","https://leetcode.com/explore/"]]} progress={progress} field="lcProgress" addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {tab==="hackerrank"     && <ExtSite url="https://hackerrank.com" name="HackerRank" color="#2ec866" links={[["Interview Kit","https://hackerrank.com/interview/preparation-kit"],["Certify","https://hackerrank.com/skills-verification"],["Practice","https://hackerrank.com/domains"]]} progress={progress} field="hrProgress" addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {tab==="codeforces"     && <ExtSite url="https://codeforces.com" name="Codeforces" color="#1199ff" links={[["Problemset","https://codeforces.com/problemset"],["Contests","https://codeforces.com/contests"],["Gym","https://codeforces.com/gyms"]]} progress={progress} field="cfProgress" addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {/* Resume section */}
          {tab==="resume_build"   && <ResumeBuild progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {tab==="resume_analyze" && <ResumeAnalyze progress={progress} addXP={addXP}/>}
          {tab==="resume_tailor"  && <ResumeTailor progress={progress} addXP={addXP}/>}
          {/* Courses */}
          {tab==="courses"        && <Courses progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress} setTab={setTab}/>}
          {tab==="mdn_learn"      && <CourseViewer course={COURSES.find(c=>c.id==="mdn")} progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {tab==="gfg_learn"      && <CourseViewer course={COURSES.find(c=>c.id==="gfg")} progress={progress} addXP={addXP} checkBadges={checkBadges} saveProgress={saveProgress}/>}
          {/* AI Chat */}
          {tab==="chat"           && <Chatbot/>}
        </main>
      </div>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#0f1117;}
        ::-webkit-scrollbar-thumb{background:#252840;border-radius:3px;}
        button:hover:not(:disabled){opacity:0.87;}
        button:disabled{opacity:0.45;cursor:not-allowed!important;}
        a{text-decoration:none;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .fade-in{animation:fadeIn 0.3s ease}
      `}</style>
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────
const Lbl = { display:"block", fontSize:"12px", color:"#94a3b8", marginBottom:"5px", fontWeight:600 };
const Inp = { width:"100%", padding:"10px 14px", background:"#0f1117", border:"1px solid #252840", borderRadius:"8px", color:"#e2e8f0", fontFamily:"inherit", fontSize:"14px", outline:"none", boxSizing:"border-box" };

function Card({children,style={}}){ return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"14px",padding:"20px",...style}}>{children}</div>; }
function Btn({children,onClick,disabled,color=C.accent,style={}}){ return <button onClick={onClick} disabled={disabled} style={{padding:"9px 18px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"13px",background:`linear-gradient(135deg,${color},${color}bb)`,color:"#fff",transition:"all 0.2s",...style}}>{children}</button>; }
function Title({children}){ return <h2 style={{fontSize:"20px",fontWeight:800,color:C.text,marginBottom:"16px"}}>{children}</h2>; }
function AIBox({title,content,color=C.accent}){ return <div style={{marginTop:"14px",padding:"16px",background:"#0f1117",borderRadius:"10px",border:`1px solid ${color}55`}}><div style={{color,fontWeight:700,marginBottom:"8px",fontSize:"14px"}}>{title}</div><p style={{color:"#cbd5e1",fontSize:"14px",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{content}</p></div>; }
function TA({value,onChange,placeholder,rows=4,readOnly=false}){ return <textarea value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} style={{width:"100%",minHeight:`${rows*44}px`,padding:"12px",background:"#0f1117",border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>; }
const diffColor = d => d==="Easy"?"#22c55e":d==="Medium"?"#f97316":"#ef4444";
const catCol = { DSA:"#6366f1","System Design":"#ec4899",OOP:"#f59e0b",OS:"#14b8a6",Database:"#8b5cf6",React:"#38bdf8",HR:"#f97316",Networking:"#10b981",JavaScript:"#facc15" };

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({progress,setTab,user}){
  const lv = Math.floor(progress.xp/100)+1;
  const sections = [
    { label:"🎯 Interview Prep", color:"#6366f1", items:[
      { id:"interview",icon:"🧠",label:"Interview Questions",sub:"Topic-wise Q&A" },
      { id:"mock",     icon:"🎤",label:"Mock Interview",      sub:"AI-powered simulation" },
      { id:"ats",      icon:"📊",label:"ATS Score",           sub:"Resume compatibility" },
    ]},
    { label:"💻 Coding Practice", color:"#22c55e", items:[
      { id:"practice",   icon:"🖥️",label:"DSA Practice",    sub:"12+ coding problems" },
      { id:"aiq",        icon:"🤖",label:"AI Questions",    sub:"Unlimited unique Qs" },
      { id:"leetcode",   icon:"🔗",label:"LeetCode",        sub:"Track your progress" },
      { id:"hackerrank", icon:"🏆",label:"HackerRank",      sub:"Get certified" },
      { id:"codeforces", icon:"⚡",label:"Codeforces",      sub:"Competitive programming" },
    ]},
    { label:"📄 Resume", color:"#f97316", items:[
      { id:"resume_build",  icon:"✨",label:"Build Resume",   sub:"AI LaTeX generator" },
      { id:"resume_analyze",icon:"🔍",label:"Analyze Resume", sub:"Get detailed feedback" },
      { id:"resume_tailor", icon:"🎯",label:"Tailor for Job", sub:"Company-specific tuning" },
    ]},
    { label:"📚 Courses", color:"#eab308", items:[
      { id:"courses",  icon:"🎓",label:"All Courses",   sub:"MDN, GFG, freeCodeCamp..." },
      { id:"mdn_learn",icon:"📘",label:"MDN Web Dev",   sub:"JS, HTML, CSS, APIs" },
      { id:"gfg_learn",icon:"🌿",label:"GFG DSA",       sub:"Algorithms, DS, CP" },
    ]},
  ];

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#1a1d2e)",borderRadius:"16px",padding:"28px 32px",marginBottom:"24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px",border:`1px solid ${C.border}`}}>
        <div>
          <div style={{fontSize:"11px",fontWeight:700,color:"#818cf8",letterSpacing:"0.12em",marginBottom:"6px"}}>WELCOME BACK</div>
          <h1 style={{fontSize:"clamp(20px,4vw,30px)",fontWeight:900,color:C.text,marginBottom:"4px"}}>Placement Preparation</h1>
          <h2 style={{fontSize:"clamp(16px,3vw,22px)",fontWeight:800,color:"#818cf8",marginBottom:"10px"}}>Dashboard</h2>
          <p style={{color:C.muted,fontSize:"14px"}}>Hey <b style={{color:C.text}}>{user.charAt(0).toUpperCase()+user.slice(1)}</b>! Aaj kya karein? 🚀</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          <Btn onClick={()=>setTab("resume_build")} style={{padding:"11px 20px"}}>📄 Build Resume</Btn>
          <Btn onClick={()=>setTab("chat")} color="#ec4899" style={{padding:"11px 20px"}}>💬 Ask AI</Btn>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:"10px",marginBottom:"24px"}}>
        {[["💻",progress.totalSolved,"Solved","#6366f1"],["🔥",`${progress.streak}d`,"Streak","#f97316"],["⚡",`Lv.${lv}`,"Level","#818cf8"],["🎯",progress.interviewAnswered,"Interviews","#22c55e"],["📊",progress.atsScore??"-","ATS Score","#eab308"],["🏅",progress.earnedBadges.length,"Badges","#ec4899"]].map(([ic,val,lbl,col],i)=>(
          <Card key={i} style={{textAlign:"center",padding:"14px"}}>
            <div style={{fontSize:"18px",marginBottom:"4px"}}>{ic}</div>
            <div style={{fontSize:"18px",fontWeight:800,color:col}}>{val}</div>
            <div style={{fontSize:"10px",color:C.muted}}>{lbl}</div>
          </Card>
        ))}
      </div>

      {/* Sections */}
      {sections.map(sec=>(
        <div key={sec.label} style={{marginBottom:"24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
            <div style={{width:"3px",height:"20px",background:sec.color,borderRadius:"2px"}}/>
            <h3 style={{fontSize:"16px",fontWeight:700,color:C.text}}>{sec.label}</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"12px"}}>
            {sec.items.map(m=>(
              <div key={m.id} onClick={()=>setTab(m.id)} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`3px solid ${sec.color}`,borderRadius:"10px",padding:"16px",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#1e293b";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.card;e.currentTarget.style.transform="";}}>
                <div style={{fontSize:"22px",marginBottom:"8px"}}>{m.icon}</div>
                <div style={{fontWeight:700,fontSize:"14px",marginBottom:"3px"}}>{m.label}</div>
                <div style={{fontSize:"12px",color:C.muted,marginBottom:"10px"}}>{m.sub}</div>
                <span style={{fontSize:"12px",color:sec.color,fontWeight:700}}>Open →</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Badges */}
      <div style={{marginBottom:"8px",display:"flex",alignItems:"center",gap:"8px"}}>
        <div style={{width:"3px",height:"20px",background:"#f59e0b",borderRadius:"2px"}}/>
        <h3 style={{fontSize:"16px",fontWeight:700,color:C.text}}>🏅 Your Badges</h3>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:"10px"}}>
        {BADGES.map(b=>{
          const earned = progress.earnedBadges.includes(b.id);
          return <Card key={b.id} style={{textAlign:"center",opacity:earned?1:0.35,border:`1px solid ${earned?"#6366f1":C.border}`,padding:"12px"}}><div style={{fontSize:"22px"}}>{b.icon}</div><div style={{fontSize:"11px",fontWeight:700,marginTop:"5px",color:earned?C.text:C.muted}}>{b.name}</div><div style={{fontSize:"10px",color:C.muted,marginTop:"2px"}}>{b.desc}</div></Card>;
        })}
      </div>
    </div>
  );
}

// ─── Interview Prep ───────────────────────────────────────────────────────────
function Interview({progress,addXP}){
  const [mode,setMode]=useState("general");
  const [sel,setSel]=useState(null);
  const [answer,setAnswer]=useState("");
  const [resumeTxt,setRT]=useState("");
  const [feedback,setFB]=useState("");
  const [loading,setLoad]=useState(false);
  const [catF,setCatF]=useState("All");
  const cats=["All",...new Set(IQ.map(q=>q.cat))];

  const getFeedback=async()=>{
    if(!sel)return; setLoad(true);setFB("");
    const r=await ai([{role:"user",content:`Interview Question: ${sel.q}\n\nCandidate's Answer: ${answer}\n\nProvide:\n1. What's good\n2. What's missing\n3. Ideal answer outline\n4. Score /10`}],
      "Senior technical interviewer at top tech company. Honest, specific, constructive feedback. Be encouraging.");
    setFB(r); addXP(30,{interviewAnswered:progress.interviewAnswered+1}); setLoad(false);
  };
  const fromResume=async()=>{
    if(!sel||!resumeTxt.trim())return; setLoad(true);setFB("");
    const r=await ai([{role:"user",content:`Resume:\n${resumeTxt}\n\nGenerate a strong STAR-format answer for:\n"${sel.q}"\n\nUse specific examples from this candidate's actual resume.`}],
      "Career coach. Generate specific, compelling interview answers using real experience.");
    setFB(r); addXP(20,{interviewAnswered:progress.interviewAnswered+1}); setLoad(false);
  };
  const filtered=catF==="All"?IQ:IQ.filter(q=>q.cat===catF);

  return (
    <div className="fade-in">
      <Title>🧠 Interview Preparation</Title>
      <div style={{display:"flex",gap:"8px",marginBottom:"20px",flexWrap:"wrap"}}>
        <Btn onClick={()=>setMode("general")} color={mode==="general"?C.accent:"#1e293b"}>📋 General Questions</Btn>
        <Btn onClick={()=>setMode("resume")}  color={mode==="resume"?"#8b5cf6":"#1e293b"}>📄 Resume-Based Answers</Btn>
      </div>
      {mode==="resume"&&(
        <Card style={{marginBottom:"16px"}}>
          <div style={{fontSize:"13px",color:C.muted,fontWeight:600,marginBottom:"8px"}}>Paste your resume — AI will generate answers from YOUR experience:</div>
          <TA value={resumeTxt} onChange={e=>setRT(e.target.value)} placeholder="Resume content paste karo yahan..." rows={4}/>
        </Card>
      )}
      <div style={{display:"flex",gap:"6px",marginBottom:"14px",flexWrap:"wrap"}}>
        {cats.map(c=><button key={c} onClick={()=>setCatF(c)} style={{padding:"5px 12px",borderRadius:"999px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:700,background:catF===c?(catCol[c]||C.accent):"#1e293b",color:"#fff",opacity:catF===c?1:0.6}}>{c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"12px",marginBottom:"20px"}}>
        {filtered.map(q=>(
          <div key={q.id} onClick={()=>{setSel(q);setAnswer("");setFB("");}} style={{padding:"16px",borderRadius:"12px",border:`1px solid ${sel?.id===q.id?"#6366f1":C.border}`,background:sel?.id===q.id?"#1e1b4b":C.card,cursor:"pointer",transition:"all 0.15s"}}>
            <span style={{fontSize:"11px",fontWeight:700,color:catCol[q.cat]||"#64748b",background:`${catCol[q.cat]||"#64748b"}22`,padding:"3px 10px",borderRadius:"999px"}}>{q.cat}</span>
            <p style={{fontSize:"14px",color:"#cbd5e1",marginTop:"10px",lineHeight:1.6}}>{q.q}</p>
            <p style={{fontSize:"11px",color:C.muted,marginTop:"6px"}}>💡 {q.hint}</p>
          </div>
        ))}
      </div>
      {sel&&(
        <Card>
          <h3 style={{fontSize:"14px",fontWeight:700,color:"#a5b4fc",marginBottom:"14px"}}>Q: {sel.q}</h3>
          {mode==="general"?(
            <><TA value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Apna answer likho... (HR ke liye STAR method use karo)" rows={4}/><Btn onClick={getFeedback} disabled={loading||!answer.trim()} style={{marginTop:"12px"}}>{loading?"⏳ Analyzing...":"🤖 Get AI Feedback (+30 XP)"}</Btn></>
          ):(
            <Btn onClick={fromResume} disabled={loading||!resumeTxt.trim()} color="#8b5cf6">{loading?"⏳ Generating...":"✨ Generate Answer from My Resume (+20 XP)"}</Btn>
          )}
          {feedback&&<AIBox title="🎯 AI Feedback" content={feedback} color="#6366f1"/>}
        </Card>
      )}
    </div>
  );
}

// ─── Mock Interview ───────────────────────────────────────────────────────────
function MockInterview({progress,addXP}){
  const [role,setRole]=useState("SDE-1 (Fresher)");
  const [company,setCompany]=useState("General");
  const [session,setSession]=useState(null);
  const [msgIdx,setMsgIdx]=useState(0);
  const [answer,setAnswer]=useState("");
  const [feedback,setFB]=useState("");
  const [loading,setLoad]=useState(false);
  const [done,setDone]=useState(false);
  const roles=["SDE-1 (Fresher)","SDE-2 (2-4 yrs)","Frontend Dev","Backend Dev","Full Stack","Data Scientist","DevOps"];
  const companies=["General","Google","Amazon","Microsoft","Flipkart","Startup"];

  const startMock=async()=>{
    setLoad(true);setSession(null);setDone(false);setMsgIdx(0);setFB("");
    const r=await ai([{role:"user",content:`Create a realistic mock interview session for a ${role} position at ${company}.\n\nGenerate exactly 5 interview questions (mix of technical, behavioral, and coding approach). Format as JSON:\n{"questions":[{"q":"question text","type":"Technical/Behavioral/Coding","tip":"what to focus on"}]}`}],
      "Expert technical interviewer. Return only valid JSON. No markdown, no explanation.");
    try {
      const parsed=JSON.parse(r.replace(/```json|```/g,"").trim());
      setSession(parsed); setMsgIdx(0);
    } catch { alert("Could not generate. Try again."); }
    setLoad(false);
  };

  const submitAnswer=async()=>{
    if(!session||!answer.trim())return;
    setLoad(true);setFB("");
    const q=session.questions[msgIdx];
    const r=await ai([{role:"user",content:`Interview Question: ${q.q}\nType: ${q.type}\n\nCandidate's Answer: ${answer}\n\nGive: score/10, what was good, what was missing, model answer in 3-4 lines.`}],
      "Experienced interviewer. Give honest, brief feedback. Score strictly.");
    setFB(r);
    if(msgIdx>=session.questions.length-1){
      setDone(true); addXP(100,{interviewAnswered:progress.interviewAnswered+session.questions.length});
    }
    setLoad(false);
  };

  const next=()=>{setMsgIdx(i=>i+1);setAnswer("");setFB("");};

  return (
    <div className="fade-in">
      <Title>🎤 Mock Interview</Title>
      <Card style={{marginBottom:"16px"}}>
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"flex-end"}}>
          {[["Role",role,setRole,roles],["Company",company,setCompany,companies]].map(([lbl,val,set,opts])=>(
            <div key={lbl}><div style={{fontSize:"12px",color:C.muted,marginBottom:"4px"}}>{lbl}</div>
            <select value={val} onChange={e=>set(e.target.value)} style={{padding:"8px 12px",background:"#0f1117",border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"inherit",fontSize:"13px"}}>{opts.map(o=><option key={o}>{o}</option>)}</select></div>
          ))}
          <Btn onClick={startMock} disabled={loading}>{loading?"⏳ Preparing...":"🎤 Start Mock Interview"}</Btn>
        </div>
      </Card>

      {session&&!done&&(
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"}}>
            <div style={{fontSize:"13px",fontWeight:700,color:C.muted}}>Question {msgIdx+1} of {session.questions.length}</div>
            <div style={{display:"flex",gap:"4px"}}>{session.questions.map((_,i)=><div key={i} style={{width:"24px",height:"4px",borderRadius:"2px",background:i<=msgIdx?"#6366f1":"#1e293b"}}/>)}</div>
          </div>
          <div style={{padding:"16px",background:"#0f1117",borderRadius:"10px",marginBottom:"16px",border:`1px solid ${C.border}`}}>
            <span style={{fontSize:"11px",fontWeight:700,color:catCol[session.questions[msgIdx].type]||"#818cf8",background:`${catCol[session.questions[msgIdx].type]||"#818cf8"}22`,padding:"3px 10px",borderRadius:"999px"}}>{session.questions[msgIdx].type}</span>
            <p style={{fontSize:"16px",fontWeight:600,color:C.text,marginTop:"12px",lineHeight:1.6}}>{session.questions[msgIdx].q}</p>
            <p style={{fontSize:"12px",color:C.muted,marginTop:"8px"}}>💡 Focus: {session.questions[msgIdx].tip}</p>
          </div>
          <TA value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Apna answer yahan likho..." rows={5}/>
          <div style={{display:"flex",gap:"10px",marginTop:"12px",flexWrap:"wrap"}}>
            <Btn onClick={submitAnswer} disabled={loading||!answer.trim()}>{loading?"⏳ Evaluating...":"Submit Answer"}</Btn>
            {feedback&&msgIdx<session.questions.length-1&&<Btn onClick={next} color="#374151">Next Question →</Btn>}
          </div>
          {feedback&&<AIBox title="📊 Interviewer Feedback" content={feedback} color="#6366f1"/>}
        </Card>
      )}
      {done&&(
        <Card style={{textAlign:"center",padding:"40px"}}>
          <div style={{fontSize:"48px",marginBottom:"16px"}}>🎉</div>
          <h3 style={{fontSize:"20px",fontWeight:800,color:"#22c55e",marginBottom:"8px"}}>Mock Interview Complete!</h3>
          <p style={{color:C.muted,marginBottom:"16px"}}>+100 XP earned! Great job practicing!</p>
          <Btn onClick={startMock}>🔄 New Session</Btn>
        </Card>
      )}
    </div>
  );
}

// ─── ATS Score ────────────────────────────────────────────────────────────────
function ATSScore({progress,addXP,checkBadges,saveProgress}){
  const [rTxt,setRT]=useState("");
  const [jd,setJD]=useState("");
  const [result,setRes]=useState(null);
  const [loading,setLoad]=useState(false);

  const analyze=async()=>{
    if(!rTxt.trim())return; setLoad(true);setRes(null);
    const r=await ai([{role:"user",content:`Analyze this resume for ATS${jd?` against job:\n${jd}\n\nResume:\n${rTxt}`:`:\n${rTxt}`}\n\nReturn ONLY valid JSON:\n{"score":75,"matched":["React","Python"],"missing":["Docker","Kubernetes"],"formatting":["Issue1"],"improvements":["Tip1"],"sections":{"experience":80,"skills":70,"education":90}}`}],
      "ATS expert. Return ONLY valid JSON. No markdown. No explanation.");
    try {
      const p=JSON.parse(r.replace(/```json|```/g,"").trim());
      setRes(p);
      const up=checkBadges({...progress,atsScore:p.score});
      addXP(20,{atsScore:p.score});
    } catch { setRes({score:65,matched:[],missing:[],formatting:[],improvements:["Could not parse. Paste cleaner text."]}); }
    setLoad(false);
  };

  const sc=result?.score||0;
  const scCol=sc>=80?"#22c55e":sc>=60?"#f97316":"#ef4444";

  return (
    <div className="fade-in">
      <Title>📊 ATS Score Checker</Title>
      <p style={{color:C.muted,fontSize:"13px",marginBottom:"20px"}}>Check how well your resume passes Applicant Tracking Systems. Optimize keywords for better shortlisting.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"}}>
        <Card><div style={{fontSize:"13px",fontWeight:700,color:C.muted,marginBottom:"8px"}}>📄 Resume Text *</div><TA value={rTxt} onChange={e=>setRT(e.target.value)} placeholder="Resume paste karo..." rows={8}/></Card>
        <Card><div style={{fontSize:"13px",fontWeight:700,color:C.muted,marginBottom:"8px"}}>🎯 Job Description (optional)</div><TA value={jd} onChange={e=>setJD(e.target.value)} placeholder="Job description paste karo better keyword match ke liye..." rows={8}/></Card>
      </div>
      <Btn onClick={analyze} disabled={loading||!rTxt.trim()} style={{marginBottom:"24px"}}>{loading?"⏳ Analyzing...":"📊 Check ATS Score"}</Btn>
      {result&&(
        <div className="fade-in">
          <Card style={{marginBottom:"16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"24px",flexWrap:"wrap"}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:"56px",fontWeight:900,color:scCol,lineHeight:1}}>{sc}</div><div style={{fontSize:"13px",color:C.muted}}>/100 ATS Score</div></div>
              <div style={{flex:1,minWidth:"160px"}}>
                <div style={{background:"#1e293b",borderRadius:"999px",height:"12px",overflow:"hidden",marginBottom:"8px"}}><div style={{width:`${sc}%`,height:"100%",background:`linear-gradient(90deg,${scCol},${scCol}88)`,borderRadius:"999px",transition:"width 1s"}}/></div>
                <div style={{fontSize:"14px",fontWeight:700,color:scCol}}>{sc>=80?"✅ ATS Optimized!":sc>=60?"⚠️ Needs Improvement":"❌ Major Issues Found"}</div>
              </div>
            </div>
          </Card>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"14px"}}>
            {result.matched?.length>0&&<Card><div style={{fontWeight:700,color:"#22c55e",marginBottom:"10px"}}>✅ Matched ({result.matched.length})</div>{result.matched.map(k=><span key={k} style={{display:"inline-block",background:"#14532d",color:"#86efac",padding:"3px 10px",borderRadius:"999px",fontSize:"12px",margin:"3px"}}>{k}</span>)}</Card>}
            {result.missing?.length>0&&<Card><div style={{fontWeight:700,color:"#ef4444",marginBottom:"10px"}}>❌ Missing ({result.missing.length})</div>{result.missing.map(k=><span key={k} style={{display:"inline-block",background:"#450a0a",color:"#fca5a5",padding:"3px 10px",borderRadius:"999px",fontSize:"12px",margin:"3px"}}>{k}</span>)}</Card>}
            {result.improvements?.length>0&&<Card style={{gridColumn:"1/-1"}}><div style={{fontWeight:700,color:"#f97316",marginBottom:"10px"}}>💡 Improvements</div>{result.improvements.map((imp,i)=><div key={i} style={{padding:"7px 0",borderBottom:`1px solid ${C.border}`,color:"#cbd5e1",fontSize:"14px"}}>• {imp}</div>)}</Card>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────
function Practice({progress,addXP,checkBadges,saveProgress}){
  const [filter,setFilter]=useState("All");
  const [lang,setLang]=useState("JavaScript");
  const [sel,setSel]=useState(null);
  const [code,setCode]=useState("");
  const [hint,setHint]=useState("");
  const [hLoad,setHL]=useState(false);
  const [review,setRev]=useState("");
  const [rLoad,setRL]=useState(false);

  const flat=PROBLEMS;
  const filtered=filter==="All"?flat:flat.filter(q=>q.diff===filter);

  const getHint=async()=>{ if(!sel)return; setHL(true);setHint(""); const r=await ai([{role:"user",content:`Hint (NO full solution) for ${lang}: ${sel.title}\n${sel.desc}`}]); setHint(r); setHL(false); };
  const getReview=async()=>{ if(!code.trim()||!sel)return; setRL(true);setRev(""); const r=await ai([{role:"user",content:`Review this ${lang} code for "${sel.title}":\n\`\`\`${lang}\n${code}\n\`\`\`\nGive: correctness, time/space complexity, improvements.`}],"Senior SWE. Specific constructive review."); setRev(r); setRL(false); };
  const markSolved=()=>{
    if(!sel)return;
    const ids=[...(progress.solvedIds||[])];
    if(!ids.includes(sel.id)){ ids.push(sel.id); addXP(50,{totalSolved:progress.totalSolved+1,solvedIds:ids}); alert("✅ +50 XP!"); }
    else alert("Already solved! Pick another.");
  };

  return (
    <div style={{display:"grid",gridTemplateColumns:sel?"1fr 1.4fr":"1fr",gap:"20px",alignItems:"start"}} className="fade-in">
      <div>
        <Title>🖥️ DSA Practice</Title>
        <p style={{color:C.muted,fontSize:"13px",marginBottom:"14px"}}>Pure coding problems — no theory. AI hints + code review. Sabhi languages available!</p>
        <div style={{display:"flex",gap:"6px",marginBottom:"14px",flexWrap:"wrap",alignItems:"center"}}>
          {["All","Easy","Medium","Hard"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"5px 14px",borderRadius:"999px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:700,background:filter===f?(f==="All"?"#6366f1":diffColor(f)):"#1e293b",color:"#fff",opacity:filter===f?1:0.6}}>{f}</button>)}
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{marginLeft:"auto",padding:"6px 10px",background:"#1e293b",border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"inherit",fontSize:"12px"}}>
            {LANGUAGES.map(l=><option key={l}>{l}</option>)}
          </select>
        </div>
        {filtered.map(q=>{
          const solved=(progress.solvedIds||[]).includes(q.id);
          return <div key={q.id} onClick={()=>{setSel(q);setCode("");setHint("");setRev("");}} style={{padding:"13px",borderRadius:"10px",marginBottom:"7px",border:`1px solid ${sel?.id===q.id?"#6366f1":C.border}`,background:sel?.id===q.id?"#1e1b4b":C.card,cursor:"pointer",transition:"all 0.15s"}}>
            <div style={{fontWeight:600,fontSize:"14px",marginBottom:"5px",display:"flex",alignItems:"center",gap:"6px"}}>{solved&&<span style={{color:"#22c55e",fontSize:"11px"}}>✓</span>}{q.title}</div>
            <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}><span style={{fontSize:"11px",fontWeight:700,color:diffColor(q.diff),background:`${diffColor(q.diff)}22`,padding:"2px 8px",borderRadius:"999px"}}>{q.diff}</span>{q.tags.map(t=><span key={t} style={{fontSize:"11px",color:C.muted,background:"#1e293b",padding:"2px 8px",borderRadius:"999px"}}>{t}</span>)}</div>
          </div>;
        })}
      </div>
      {sel&&(
        <div>
          <Card style={{marginBottom:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px",marginBottom:"10px"}}>
              <h3 style={{fontSize:"15px",fontWeight:800}}>{sel.title}</h3>
              <span style={{fontSize:"12px",fontWeight:700,color:diffColor(sel.diff)}}>{sel.diff}</span>
            </div>
            <p style={{color:"#cbd5e1",fontSize:"14px",lineHeight:1.7,marginBottom:"10px"}}>{sel.desc}</p>
            <pre style={{background:"#0f1117",padding:"12px",borderRadius:"8px",fontFamily:"monospace",fontSize:"12px",color:"#a5b4fc",overflowX:"auto",whiteSpace:"pre-wrap"}}>{sel.example}</pre>
          </Card>
          <Card>
            <div style={{fontSize:"12px",color:C.muted,fontWeight:600,marginBottom:"6px"}}>Your {lang} Solution:</div>
            <TA value={code} onChange={e=>setCode(e.target.value)} placeholder={`// Write your ${lang} solution...\n// Think about time & space complexity!`} rows={6}/>
            <div style={{display:"flex",gap:"8px",marginTop:"12px",flexWrap:"wrap"}}>
              <Btn onClick={getHint} disabled={hLoad}>{hLoad?"⏳...":"💡 Hint"}</Btn>
              <Btn onClick={getReview} disabled={rLoad||!code.trim()} color="#8b5cf6">{rLoad?"⏳...":"🔍 AI Review"}</Btn>
              <Btn onClick={markSolved} color="#22c55e">✅ Solved (+50 XP)</Btn>
            </div>
            {hint&&<AIBox title="💡 Hint" content={hint} color="#6366f1"/>}
            {review&&<AIBox title="🔍 Code Review" content={review} color="#8b5cf6"/>}
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── AI Questions ──────────────────────────────────────────────────────────────
function AIQuestions({progress,addXP}){
  const [diff,setDiff]=useState("Medium");
  const [lang,setLang]=useState("JavaScript");
  const [topic,setTopic]=useState("Any");
  const [q,setQ]=useState(null);
  const [loading,setLoad]=useState(false);
  const [code,setCode]=useState("");
  const topics=["Any","Arrays","Strings","Trees","Graphs","Dynamic Programming","Sorting","Linked Lists","Stacks/Queues","Binary Search","Greedy","Backtracking","Math","Hashing","Two Pointers"];

  const generate=async()=>{
    setLoad(true);setQ(null);setCode("");
    const raw=await ai([{role:"user",content:`Generate a unique ${diff} ${lang} coding problem on ${topic==="Any"?"any DSA topic":topic}.\n\nFormat:\nTITLE: ...\nTAGS: t1, t2\nDESCRIPTION:\n...\nEXAMPLE:\nInput: ...\nOutput: ...\nCONSTRAINTS:\n...`}],
      "Competitive programming expert. CODING problems only — no theory. Realistic, educational, original.");
    const lines=raw.split('\n');
    const gl=p=>lines.find(l=>l.startsWith(p))?.replace(p,"").trim()||"";
    const gb=(s,e)=>{ const si=lines.findIndex(l=>l.startsWith(s)); if(si===-1)return""; const ei=lines.findIndex((l,i)=>i>si&&l.startsWith(e)); return lines.slice(si+1,ei===-1?undefined:ei).join('\n').trim(); };
    setQ({title:gl("TITLE:"),tags:gl("TAGS:").split(',').map(t=>t.trim()),diff,desc:gb("DESCRIPTION:","EXAMPLE:"),example:gb("EXAMPLE:","CONSTRAINTS:"),constraints:gb("CONSTRAINTS:","~~~")});
    setLoad(false);
  };

  return (
    <div className="fade-in">
      <Title>🤖 AI-Generated Questions</Title>
      <p style={{color:C.muted,fontSize:"13px",marginBottom:"20px"}}>Unlimited unique coding problems — Basic to Advanced, any language, any topic!</p>
      <Card style={{marginBottom:"20px"}}>
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"flex-end"}}>
          {[["Difficulty",diff,setDiff,["Easy","Medium","Hard"]],["Language",lang,setLang,LANGUAGES],["Topic",topic,setTopic,topics]].map(([lbl,val,set,opts])=>(
            <div key={lbl}><div style={{fontSize:"11px",color:C.muted,marginBottom:"4px",fontWeight:600}}>{lbl}</div>
            <select value={val} onChange={e=>set(e.target.value)} style={{padding:"8px 12px",background:"#0f1117",border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"inherit",fontSize:"13px"}}>{opts.map(o=><option key={o}>{o}</option>)}</select></div>
          ))}
          <Btn onClick={generate} disabled={loading}>{loading?"⏳ Generating...":"⚡ Generate Question"}</Btn>
        </div>
      </Card>
      {loading&&<div style={{textAlign:"center",padding:"60px",color:"#6366f1"}}><div style={{fontSize:"44px",animation:"pulse 1s infinite"}}>⚙️</div><p style={{marginTop:"14px"}}>AI is crafting a unique problem...</p></div>}
      {q&&!loading&&(
        <Card className="fade-in">
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",marginBottom:"10px"}}>
            <h3 style={{fontSize:"17px",fontWeight:800}}>{q.title}</h3>
            <span style={{fontSize:"12px",fontWeight:700,color:diffColor(q.diff)}}>{q.diff}</span>
          </div>
          <div style={{marginBottom:"12px"}}>{q.tags?.filter(Boolean).map(t=><span key={t} style={{fontSize:"11px",background:"#1e293b",color:"#818cf8",padding:"2px 10px",borderRadius:"999px",marginRight:"6px",display:"inline-block",marginBottom:"4px"}}>{t}</span>)}</div>
          <p style={{color:"#cbd5e1",fontSize:"14px",lineHeight:1.7,marginBottom:"12px"}}>{q.desc}</p>
          {q.example&&<pre style={{background:"#0f1117",padding:"12px",borderRadius:"8px",fontFamily:"monospace",fontSize:"12px",color:"#86efac",overflowX:"auto",whiteSpace:"pre-wrap",marginBottom:"12px"}}>{q.example}</pre>}
          {q.constraints&&<p style={{fontSize:"12px",color:C.muted,marginBottom:"16px"}}><b style={{color:C.text}}>Constraints:</b> {q.constraints}</p>}
          <TA value={code} onChange={e=>setCode(e.target.value)} placeholder={`// Solve in ${lang}...`} rows={5}/>
          <Btn onClick={()=>{addXP(50,{totalSolved:progress.totalSolved+1});alert("✅ +50 XP!");}} color="#22c55e" style={{marginTop:"12px"}}>✅ Solved (+50 XP)</Btn>
        </Card>
      )}
      {!q&&!loading&&<div style={{textAlign:"center",padding:"80px 20px",color:C.muted}}><div style={{fontSize:"56px",marginBottom:"16px"}}>🤖</div><p>Generate karo — unlimited unique coding problems!</p></div>}
    </div>
  );
}

// ─── External Site ────────────────────────────────────────────────────────────
function ExtSite({url,name,color,links,progress,field,addXP,checkBadges,saveProgress}){
  const val=progress[field]||0;
  const [inp,setInp]=useState(val);
  const save=()=>{ addXP(0,{[field]:inp}); alert(`✅ ${name} progress saved: ${inp}`); };
  return (
    <div className="fade-in">
      <Title>🔗 {name}</Title>
      <Card style={{marginBottom:"16px"}}>
        <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"16px"}}>
          {links.map(([lbl,href])=><a key={lbl} href={href} target="_blank" rel="noreferrer" style={{padding:"10px 18px",borderRadius:"8px",background:`linear-gradient(135deg,${color},${color}99)`,color:"#fff",fontWeight:700,fontSize:"13px"}}>{lbl} ↗</a>)}
        </div>
        <div style={{background:"#0f1117",padding:"14px",borderRadius:"10px",border:`1px solid ${C.border}`}}>
          <div style={{fontSize:"13px",fontWeight:700,color:C.muted,marginBottom:"10px"}}>📊 My {name} Progress</div>
          <div style={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
            <span style={{color:C.muted,fontSize:"13px"}}>Problems solved:</span>
            <input type="number" min="0" value={inp} onChange={e=>setInp(Number(e.target.value))} style={{width:"80px",padding:"8px",background:C.card,border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"inherit",fontSize:"14px",outline:"none",textAlign:"center"}}/>
            <Btn onClick={save} color={color}>Save</Btn>
          </div>
          <div style={{marginTop:"10px",background:"#1e293b",borderRadius:"999px",height:"7px",overflow:"hidden"}}><div style={{width:`${Math.min(val,500)/5}%`,height:"100%",background:`linear-gradient(90deg,${color},${color}88)`,borderRadius:"999px"}}/></div>
          <div style={{fontSize:"12px",color:C.muted,marginTop:"5px"}}>{val} problems solved</div>
        </div>
      </Card>
      <Card><div style={{fontSize:"13px",color:C.muted,marginBottom:"10px"}}>Live:</div>
      <iframe src={url} style={{width:"100%",height:"580px",border:"none",borderRadius:"10px",background:"#fff"}} title={name} sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation" loading="lazy"/></Card>
    </div>
  );
}

// ─── Resume Build ─────────────────────────────────────────────────────────────
function ResumeBuild({progress,addXP,checkBadges,saveProgress}){
  const [d,setD]=useState({name:"",email:"",phone:"",linkedin:"",github:"",college:"",degree:"",year:"",skills:"",experience:"",projects:"",achievements:""});
  const [result,setRes]=useState("");
  const [loading,setLoad]=useState(false);
  const upd=(k,v)=>setD(p=>({...p,[k]:v}));
  const dl=(content,fname)=>{const b=new Blob([content],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=fname;a.click();};

  const generate=async()=>{
    setLoad(true);setRes("");
    const r=await ai([{role:"user",content:`Generate professional ATS-friendly LaTeX resume:\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nLinkedIn: ${d.linkedin}\nGitHub: ${d.github}\nCollege: ${d.college}\nDegree: ${d.degree} (${d.year})\nSkills: ${d.skills}\nExperience:\n${d.experience}\nProjects:\n${d.projects}\nAchievements:\n${d.achievements}\n\nGenerate complete compilable LaTeX. ATS-optimized.`}],
      "Expert resume writer. Output ONLY LaTeX code. No markdown, no explanation.");
    setRes(r); addXP(100,{resumeBuilt:true}); setLoad(false);
  };

  const fields=[["name","Full Name","Rahul Sharma"],["email","Email","rahul@gmail.com"],["phone","Phone","+91 9876543210"],["linkedin","LinkedIn","linkedin.com/in/rahul"],["github","GitHub","github.com/rahul"],["college","College","IIT Delhi"],["degree","Degree","B.Tech CSE"],["year","Grad Year","2025"]];

  return (
    <div className="fade-in">
      <Title>✨ Build Resume (AI + LaTeX)</Title>
      <p style={{color:C.muted,fontSize:"13px",marginBottom:"20px"}}>AI se professional LaTeX resume banao — Overleaf pe paste karo aur PDF download karo!</p>
      <Card style={{marginBottom:"20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:"12px",marginBottom:"14px"}}>
          {fields.map(([k,lbl,ph])=>(
            <div key={k}><div style={{fontSize:"12px",color:C.muted,marginBottom:"4px"}}>{lbl}</div>
            <input value={d[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} style={{width:"100%",padding:"9px 12px",background:"#0f1117",border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"inherit",fontSize:"13px",outline:"none",boxSizing:"border-box"}}/></div>
          ))}
        </div>
        {[["skills","Technical Skills","Python, React, Node.js, SQL, Git, Docker",2],["experience","Work Experience","Company | Role | Jun-Aug 2024\n- Built X that improved Y by 40%",3],["projects","Projects","Project | Tech | github.com/link\n- Description and impact",3],["achievements","Achievements","- LeetCode 400+ Top 5%\n- HackIndia 2024 Winner",2]].map(([k,lbl,ph,rows])=>(
          <div key={k} style={{marginBottom:"12px"}}><div style={{fontSize:"12px",color:C.muted,marginBottom:"4px"}}>{lbl}</div><TA value={d[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} rows={rows}/></div>
        ))}
        <Btn onClick={generate} disabled={loading}>{loading?"⏳ Generating...":"✨ Generate LaTeX Resume (+100 XP)"}</Btn>
      </Card>
      {result&&(
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
            <h3 style={{fontSize:"15px",fontWeight:700,color:"#86efac"}}>✅ Your LaTeX Resume Ready!</h3>
            <Btn onClick={()=>dl(result,"resume.tex")} color="#22c55e">⬇️ Download .tex</Btn>
          </div>
          <TA value={result} readOnly rows={10}/>
          <div style={{marginTop:"10px",padding:"12px",background:"#0f1117",borderRadius:"8px",border:`1px solid ${C.border}`}}>
            <p style={{color:C.muted,fontSize:"13px"}}>📋 <b style={{color:C.text}}>Steps to get PDF:</b></p>
            <p style={{color:C.muted,fontSize:"13px",marginTop:"4px"}}>1. Copy code above → 2. Go to <a href="https://overleaf.com" target="_blank" rel="noreferrer" style={{color:"#818cf8"}}>Overleaf.com</a> → 3. New Project → Blank → Paste → Compile → Download PDF</p>
          </div>
        </Card>
      )}
      <Card style={{marginTop:"16px"}}>
        <h3 style={{fontSize:"14px",fontWeight:700,color:"#a5b4fc",marginBottom:"8px"}}>📋 Quick Template</h3>
        <p style={{color:C.muted,fontSize:"13px",marginBottom:"10px"}}>Ready-made template — bas fill karo:</p>
        <Btn onClick={()=>dl(LATEX_TEMPLATE,"resume_template.tex")} color="#374151">⬇️ Download Template</Btn>
      </Card>
    </div>
  );
}

// ─── Resume Analyze ───────────────────────────────────────────────────────────
function ResumeAnalyze({addXP}){
  const [txt,setTxt]=useState("");
  const [analysis,setAna]=useState("");
  const [loading,setLoad]=useState(false);
  const analyze=async()=>{ if(!txt.trim())return; setLoad(true);setAna(""); const r=await ai([{role:"user",content:`Analyze this resume:\n${txt}\n\nCover: strengths, weaknesses, missing sections, impact statements, quantification, ATS, score/10, top 3 improvements.`}],"Expert resume reviewer. Specific, actionable, honest."); setAna(r); addXP(10,{}); setLoad(false); };
  return (
    <div className="fade-in">
      <Title>🔍 Analyze Resume</Title>
      <p style={{color:C.muted,fontSize:"13px",marginBottom:"20px"}}>Paste your resume — AI detailed feedback dega: kya acha hai, kya missing hai, score bhi milega!</p>
      <Card style={{marginBottom:"16px"}}><TA value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Apna resume paste karo yahan..." rows={10}/><Btn onClick={analyze} disabled={loading||!txt.trim()} style={{marginTop:"12px"}}>{loading?"⏳ Analyzing...":"🔍 Analyze Resume"}</Btn></Card>
      {analysis&&<Card><AIBox title="📊 Resume Analysis" content={analysis} color="#f97316"/></Card>}
    </div>
  );
}

// ─── Resume Tailor ────────────────────────────────────────────────────────────
function ResumeTailor({addXP}){
  const [resume,setResume]=useState("");
  const [company,setCo]=useState("");
  const [jd,setJD]=useState("");
  const [result,setRes]=useState("");
  const [loading,setLoad]=useState(false);
  const tailor=async()=>{ if(!resume.trim()||!company.trim())return; setLoad(true);setRes(""); const r=await ai([{role:"user",content:`Tailor this resume for ${company}${jd?` (Job Description:\n${jd})`:""}.\n\nEmphasize relevant skills, rewrite bullet points with ${company}-specific keywords, match their culture and tech stack. Keep professional.\n\nResume:\n${resume}`}],"Expert resume tailor. Make targeted, impactful changes. Keep format. Optimize for this specific company."); setRes(r); addXP(20,{}); setLoad(false); };
  const dl=(c,f)=>{const b=new Blob([c],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=f;a.click();};

  return (
    <div className="fade-in">
      <Title>🎯 Tailor Resume for Job</Title>
      <p style={{color:C.muted,fontSize:"13px",marginBottom:"20px"}}>Har company ke liye alag resume chahiye! AI automatically tailor karega company ke according.</p>
      <Card style={{marginBottom:"16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
          <div><div style={{fontSize:"12px",color:C.muted,marginBottom:"4px"}}>Company Name *</div><input value={company} onChange={e=>setCo(e.target.value)} placeholder="Google, Amazon, Microsoft..." style={{width:"100%",padding:"9px 12px",background:"#0f1117",border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"inherit",fontSize:"13px",outline:"none",boxSizing:"border-box"}}/></div>
          <div><div style={{fontSize:"12px",color:C.muted,marginBottom:"4px"}}>Job Description (optional)</div><input value={jd} onChange={e=>setJD(e.target.value)} placeholder="Paste JD for better tailoring..." style={{width:"100%",padding:"9px 12px",background:"#0f1117",border:`1px solid ${C.border}`,borderRadius:"8px",color:C.text,fontFamily:"inherit",fontSize:"13px",outline:"none",boxSizing:"border-box"}}/></div>
        </div>
        <div style={{fontSize:"12px",color:C.muted,marginBottom:"4px"}}>Your Resume (LaTeX or plain text) *</div>
        <TA value={resume} onChange={e=>setResume(e.target.value)} placeholder="Apna resume paste karo..." rows={8}/>
        <Btn onClick={tailor} disabled={loading||!resume.trim()||!company.trim()} style={{marginTop:"12px"}}>{loading?"⏳ Tailoring...":"🎯 Tailor for "+company}</Btn>
      </Card>
      {result&&(
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
            <h3 style={{fontSize:"15px",fontWeight:700,color:"#86efac"}}>✅ {company} Tailored Resume</h3>
            <Btn onClick={()=>dl(result,`resume_${company}.tex`)} color="#22c55e">⬇️ Download</Btn>
          </div>
          <TA value={result} readOnly rows={10}/>
        </Card>
      )}
    </div>
  );
}

// ─── Courses ──────────────────────────────────────────────────────────────────
function Courses({progress,addXP,checkBadges,saveProgress,setTab}){
  const tagColors={"JavaScript":"#f7df1e","DSA":"#6366f1","System Design":"#ec4899","Web Dev":"#22c55e","Full Stack":"#f97316","CS Fundamentals":"#8b5cf6","Career Path":"#14b8a6"};
  const [tagF,setTagF]=useState("All");
  const tags=["All",...new Set(COURSES.map(c=>c.tag))];
  const filtered=tagF==="All"?COURSES:COURSES.filter(c=>c.tag===tagF);
  const completed=(progress.completedTopics||[]);
  const pct=(id)=>{ const course=COURSES.find(c=>c.id===id); if(!course)return 0; const done=course.topics.filter(t=>completed.includes(`${id}_${t}`)).length; return Math.round(done/course.topics.length*100); };

  return (
    <div className="fade-in">
      <Title>🎓 Courses & Learning</Title>
      <p style={{color:C.muted,fontSize:"13px",marginBottom:"20px"}}>Best resources for placement prep — MDN, GeeksForGeeks, freeCodeCamp and more. Topic-wise progress track karo!</p>
      <div style={{display:"flex",gap:"6px",marginBottom:"16px",flexWrap:"wrap"}}>
        {tags.map(t=><button key={t} onClick={()=>setTagF(t)} style={{padding:"5px 14px",borderRadius:"999px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:700,background:tagF===t?(tagColors[t]||C.accent):"#1e293b",color:tagF===t?"#000":"#fff",opacity:tagF===t?1:0.6}}>{t}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"16px"}}>
        {filtered.map(course=>{
          const p=pct(course.id);
          return (
            <Card key={course.id} style={{border:`1px solid ${C.border}`,borderTop:`3px solid ${course.color}`}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                <div style={{width:"40px",height:"40px",background:`${course.color}22`,borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>{course.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:"15px"}}>{course.name}</div>
                  <span style={{fontSize:"11px",background:tagColors[course.tag]?`${tagColors[course.tag]}22`:"#1e293b",color:tagColors[course.tag]||C.muted,padding:"2px 8px",borderRadius:"999px",fontWeight:700}}>{course.tag}</span>
                </div>
              </div>
              {/* Progress */}
              <div style={{marginBottom:"12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:C.muted,marginBottom:"4px"}}><span>Progress</span><span>{p}%</span></div>
                <div style={{background:"#1e293b",borderRadius:"999px",height:"5px"}}><div style={{width:`${p}%`,height:"100%",background:`linear-gradient(90deg,${course.color},${course.color}88)`,borderRadius:"999px"}}/></div>
              </div>
              {/* Topics */}
              <div style={{marginBottom:"12px"}}>
                {course.topics.map(t=>{
                  const key=`${course.id}_${t}`;
                  const done=completed.includes(key);
                  return <div key={t} onClick={()=>{ const tops=done?completed.filter(x=>x!==key):[...completed,key]; addXP(done?0:15,{completedTopics:tops}); }} style={{display:"flex",alignItems:"center",gap:"8px",padding:"6px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
                    <div style={{width:"16px",height:"16px",borderRadius:"4px",border:`1.5px solid ${done?course.color:C.muted}`,background:done?course.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",flexShrink:0}}>{done?"✓":""}</div>
                    <span style={{fontSize:"13px",color:done?C.text:C.muted,textDecoration:done?"line-through":"none"}}>{t}</span>
                    {done&&<span style={{marginLeft:"auto",fontSize:"10px",color:"#22c55e"}}>+15xp</span>}
                  </div>;
                })}
              </div>
              <a href={course.url} target="_blank" rel="noreferrer" style={{display:"block",padding:"8px",borderRadius:"8px",background:`${course.color}22`,color:course.color,fontWeight:700,fontSize:"13px",textAlign:"center",border:`1px solid ${course.color}44`}}>Open {course.name} ↗</a>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Course Viewer (MDN / GFG embedded) ───────────────────────────────────────
function CourseViewer({course,progress,addXP,checkBadges,saveProgress}){
  if(!course)return null;
  const completed=(progress.completedTopics||[]);
  const [selTopic,setSelTopic]=useState(course.topics[0]);
  const [notes,setNotes]=useState("");
  const [aiExplain,setAE]=useState("");
  const [loading,setLoad]=useState(false);

  const getExplanation=async()=>{ setLoad(true);setAE(""); const r=await ai([{role:"user",content:`Explain "${selTopic}" in simple terms with a practical example. Include: what it is, why it matters, code example if applicable, common interview questions about this topic.`}],"Expert programming teacher. Clear, concise explanations with examples. Use code blocks for code."); setAE(r); setLoad(false); };
  const markDone=()=>{ const key=`${course.id}_${selTopic}`; if(!completed.includes(key)){ addXP(15,{completedTopics:[...completed,key]}); } };

  return (
    <div className="fade-in">
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px",flexWrap:"wrap"}}>
        <div style={{fontSize:"28px"}}>{course.icon}</div>
        <div>
          <Title style={{marginBottom:"2px"}}>{course.name}</Title>
          <a href={course.url} target="_blank" rel="noreferrer" style={{color:"#818cf8",fontSize:"13px"}}>Open full site ↗</a>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:"16px",alignItems:"start"}}>
        {/* Topic list */}
        <Card style={{padding:"12px"}}>
          <div style={{fontSize:"12px",color:C.muted,fontWeight:700,marginBottom:"10px"}}>TOPICS</div>
          {course.topics.map(t=>{
            const done=completed.includes(`${course.id}_${t}`);
            return <button key={t} onClick={()=>setSelTopic(t)} style={{width:"100%",display:"flex",alignItems:"center",gap:"6px",padding:"8px 10px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"13px",background:selTopic===t?`${course.color}22`:"transparent",color:selTopic===t?course.color:C.muted,marginBottom:"2px",textAlign:"left"}}>
              <span style={{width:"14px",height:"14px",borderRadius:"3px",border:`1.5px solid ${done?course.color:C.border}`,background:done?course.color:"transparent",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"9px",flexShrink:0}}>{done?"✓":""}</span>
              <span style={{flex:1}}>{t}</span>
            </button>;
          })}
        </Card>
        {/* Content area */}
        <div>
          <Card style={{marginBottom:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px",marginBottom:"14px"}}>
              <h3 style={{fontSize:"16px",fontWeight:700,color:course.color}}>{selTopic}</h3>
              <div style={{display:"flex",gap:"8px"}}>
                <Btn onClick={getExplanation} disabled={loading} color={course.color}>{loading?"⏳...":"🤖 AI Explain"}</Btn>
                <Btn onClick={markDone} color="#22c55e" disabled={completed.includes(`${course.id}_${selTopic}`)}>
                  {completed.includes(`${course.id}_${selTopic}`)?"✅ Done":"Mark Done (+15 XP)"}
                </Btn>
              </div>
            </div>
            {aiExplain&&<AIBox title={`🤖 AI Explanation: ${selTopic}`} content={aiExplain} color={course.color}/>}
            <div style={{marginTop:"14px"}}>
              <div style={{fontSize:"12px",color:C.muted,fontWeight:600,marginBottom:"6px"}}>📝 My Notes:</div>
              <TA value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Apne notes yahan likhte jao..." rows={4}/>
            </div>
          </Card>
          <Card style={{padding:"12px"}}>
            <div style={{fontSize:"13px",color:C.muted,marginBottom:"8px"}}>📖 Read on {course.name}:</div>
            <iframe src={course.url} style={{width:"100%",height:"500px",border:"none",borderRadius:"8px",background:"#fff"}} title={course.name} sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation" loading="lazy"/>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Chatbot ──────────────────────────────────────────────────────────────────
function Chatbot(){
  const [msgs,setMsgs]=useState([{role:"assistant",content:"👋 Namaste! Main DevForge AI hoon.\n\nDSA doubts, system design, debugging, resume tips, career advice — kuch bhi pucho! Hinglish mein bhi baat kar sakte ho. 🚀"}]);
  const [input,setInput]=useState("");
  const [loading,setLoad]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const userMsg={role:"user",content:input};
    setMsgs(m=>[...m,userMsg]);setInput("");setLoad(true);
    try {
      const r=await ai([...msgs,userMsg].map(m=>({role:m.role,content:m.content})),
        "You are DevForge AI — friendly expert coding mentor and placement coach. Help with DSA, algorithms, system design, debugging, resume, career advice. Be concise, use examples and code blocks. Respond in Hinglish when user writes in Hindi. Be encouraging and conversational.");
      setMsgs(m=>[...m,{role:"assistant",content:r}]);
    } catch { setMsgs(m=>[...m,{role:"assistant",content:"Oops! Error. Dobara try karo!"}]); }
    setLoad(false);
  };

  const sugg=["Binary Search samjhao","DP kaise approach karein?","Resume tips for fresher","FAANG crack roadmap","JavaScript event loop","Merge sort code karo","System design kahan se start karein?"];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 130px)"}} className="fade-in">
      <Title>💬 DevForge AI Assistant</Title>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"10px",marginBottom:"12px",paddingRight:"4px"}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:"8px"}}>
            {m.role==="assistant"&&<div style={{width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0}}>⚡</div>}
            <div style={{padding:"12px 15px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?"linear-gradient(135deg,#6366f1,#8b5cf6)":"#1e293b",color:"#fff",maxWidth:"78%",fontSize:"14px",lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{m.content}</div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"flex-end",gap:"8px"}}><div style={{width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px"}}>⚡</div><div style={{padding:"12px 15px",borderRadius:"16px 16px 16px 4px",background:"#1e293b",color:"#818cf8"}}>⏳ Soch raha hoon...</div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"8px"}}>
        {sugg.map(s=><button key={s} onClick={()=>setInput(s)} style={{padding:"5px 12px",background:"#1e293b",border:`1px solid ${C.border}`,borderRadius:"999px",color:C.muted,fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>{s}</button>)}
      </div>
      <div style={{display:"flex",gap:"8px"}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Kuch bhi pucho — DSA, system design, resume, career..." style={{flex:1,padding:"12px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:"10px",color:C.text,fontFamily:"inherit",fontSize:"14px",outline:"none"}}/>
        <Btn onClick={send} disabled={loading} style={{padding:"12px 20px"}}>Send →</Btn>
      </div>
    </div>
  );
}