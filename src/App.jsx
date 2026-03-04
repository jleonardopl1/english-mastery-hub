import { useState, useEffect, useCallback, useRef } from "react";

const THEMES = {
  light: {
    name: "light", bg: "#FAFAF7", bgAlt: "#F2F0EB", bgCard: "#FFFFFF", bgCardHover: "#FFFDF8",
    bgGlass: "rgba(255,255,255,0.72)", bgInput: "#F5F3EE", bgNav: "rgba(250,250,247,0.88)",
    accent: "#D4A017", accentDim: "rgba(212,160,23,0.10)", accentText: "#8B6914",
    secondary: "#1B6B4A", secondaryDim: "rgba(27,107,74,0.08)",
    tertiary: "#E85D3A", tertiaryDim: "rgba(232,93,58,0.08)",
    text: "#1A1A18", textSec: "#6B6960", textMut: "#9E9A8F",
    border: "rgba(0,0,0,0.07)", borderCard: "rgba(0,0,0,0.05)",
    shadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.03)",
    shadowHover: "0 4px 12px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.06)",
    success: "#2D9F6F", successDim: "rgba(45,159,111,0.10)",
    error: "#D94F4F", errorDim: "rgba(217,79,79,0.10)",
    warning: "#E5A100", warningDim: "rgba(229,161,0,0.10)",
    info: "#4A8FD4", infoDim: "rgba(74,143,212,0.10)",
    gradHero: "linear-gradient(135deg, #FBF7EE 0%, #F0E8D6 50%, #E8DFC8 100%)",
    gradAccent: "linear-gradient(135deg, #D4A017 0%, #E8B82E 100%)",
    gradCard: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(212,160,23,0.03) 100%)",
    chatU: "#1B6B4A", chatUT: "#FFFFFF", chatB: "#F5F3EE", chatBT: "#1A1A18",
    dots: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
  },
  dark: {
    name: "dark", bg: "#0E1117", bgAlt: "#161A22", bgCard: "#1A1F2B", bgCardHover: "#212838",
    bgGlass: "rgba(26,31,43,0.78)", bgInput: "#141820", bgNav: "rgba(14,17,23,0.88)",
    accent: "#F0C246", accentDim: "rgba(240,194,70,0.12)", accentText: "#F0C246",
    secondary: "#3DD9A0", secondaryDim: "rgba(61,217,160,0.10)",
    tertiary: "#FF7A5C", tertiaryDim: "rgba(255,122,92,0.10)",
    text: "#ECE9E1", textSec: "#9A978E", textMut: "#5E5C56",
    border: "rgba(255,255,255,0.06)", borderCard: "rgba(255,255,255,0.05)",
    shadow: "0 1px 3px rgba(0,0,0,0.2), 0 6px 24px rgba(0,0,0,0.15)",
    shadowHover: "0 4px 12px rgba(0,0,0,0.25), 0 12px 40px rgba(0,0,0,0.2)",
    success: "#3DD9A0", successDim: "rgba(61,217,160,0.12)",
    error: "#FF6B6B", errorDim: "rgba(255,107,107,0.12)",
    warning: "#F0C246", warningDim: "rgba(240,194,70,0.12)",
    info: "#6CB4FF", infoDim: "rgba(108,180,255,0.12)",
    gradHero: "linear-gradient(135deg, #0E1117 0%, #161A22 50%, #1A1F2B 100%)",
    gradAccent: "linear-gradient(135deg, #F0C246 0%, #D4A017 100%)",
    gradCard: "linear-gradient(180deg, rgba(26,31,43,0) 0%, rgba(240,194,70,0.03) 100%)",
    chatU: "#F0C246", chatUT: "#0E1117", chatB: "#1A1F2B", chatBT: "#ECE9E1",
    dots: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
  },
};

const M = { DASH: "d", VOCAB: "v", VERBS: "vb", CONV: "c", WRITE: "w", INT: "i" };

const vocabSets = [
  { cat: "Data Science & Analytics", icon: "📊", col: "secondary", words: [
    { term: "churn rate", def: "The percentage of customers who stop using a product over a given period", ex: "Our monthly churn rate dropped to 3.2% after we improved the onboarding flow.", ph: "/tʃɜːrn reɪt/" },
    { term: "cohort analysis", def: "Grouping users by shared characteristics to track behavior over time", ex: "The cohort analysis revealed that Q2 users had 40% higher retention.", ph: "/ˈkoʊ.hɔːrt əˈnæl.ə.sɪs/" },
    { term: "feature engineering", def: "Creating new input variables from raw data to improve model performance", ex: "Feature engineering was the key driver behind our model's accuracy boost.", ph: "/ˈfiː.tʃər ˌen.dʒɪˈnɪr.ɪŋ/" },
    { term: "stakeholder alignment", def: "Ensuring all decision-makers share the same understanding and goals", ex: "Before building the dashboard, we need stakeholder alignment on KPIs.", ph: "/ˈsteɪkˌhoʊl.dər əˈlaɪn.mənt/" },
    { term: "data pipeline", def: "An automated set of processes that move and transform data", ex: "The data pipeline ingests raw CSV files and outputs clean Parquet tables.", ph: "/ˈdeɪ.tə ˈpaɪp.laɪn/" },
    { term: "actionable insights", def: "Findings from data analysis that directly inform business decisions", ex: "The report must go beyond numbers and deliver actionable insights.", ph: "/ˈæk.ʃən.ə.bəl ˈɪn.saɪts/" },
    { term: "scalability", def: "The ability of a system to handle growing amounts of work", ex: "Scalability is a non-negotiable requirement for our SaaS architecture.", ph: "/ˌskeɪ.ləˈbɪl.ə.ti/" },
    { term: "benchmark", def: "A standard against which things are compared", ex: "We benchmark our NPS against industry leaders quarterly.", ph: "/ˈbentʃ.mɑːrk/" },
  ]},
  { cat: "SaaS & Product", icon: "🚀", col: "accent", words: [
    { term: "product-market fit", def: "When a product satisfies strong market demand", ex: "We achieved product-market fit when our NRR exceeded 120%.", ph: "/ˈprɒd.ʌkt ˈmɑːr.kɪt fɪt/" },
    { term: "go-to-market strategy", def: "A plan for launching a product to reach target customers", ex: "Our go-to-market strategy for LATAM includes localized pricing.", ph: "/ˌɡoʊ.tə.ˈmɑːr.kɪt ˈstræt.ə.dʒi/" },
    { term: "unit economics", def: "The revenues and costs associated with a single business unit", ex: "The unit economics must show a positive LTV:CAC ratio.", ph: "/ˈjuː.nɪt ˌiː.kəˈnɒm.ɪks/" },
    { term: "product-led growth", def: "Strategy where the product drives acquisition and retention", ex: "Slack is the textbook example of product-led growth.", ph: "/ˈprɒd.ʌkt lɛd ɡroʊθ/" },
    { term: "north star metric", def: "The single metric that captures the core value delivered", ex: "Our north star metric is weekly active analyses per user.", ph: "/nɔːrθ stɑːr ˈmɛt.rɪk/" },
    { term: "burn rate", def: "Rate at which a company spends its cash reserves", ex: "At our current burn rate, we have 14 months of runway.", ph: "/bɜːrn reɪt/" },
    { term: "onboarding friction", def: "Obstacles preventing new users from reaching value quickly", ex: "Reducing onboarding friction increased Day-7 retention by 25%.", ph: "/ˈɒn.bɔːr.dɪŋ ˈfrɪk.ʃən/" },
    { term: "freemium", def: "Pricing model with free basics and premium upgrades", ex: "The freemium tier acts as our top-of-funnel acquisition engine.", ph: "/ˈfriː.mi.əm/" },
  ]},
  { cat: "Business & Leadership", icon: "💼", col: "tertiary", words: [
    { term: "cross-functional collaboration", def: "Working across departments to achieve shared goals", ex: "This requires cross-functional collaboration between engineering and sales.", ph: "/krɒs ˈfʌŋk.ʃən.əl kəˌlæb.əˈreɪ.ʃən/" },
    { term: "OKRs", def: "Objectives and Key Results — a goal-setting framework", ex: "Every team aligns their OKRs with strategic priorities.", ph: "/ˌoʊ.keɪˈɑːrz/" },
    { term: "bottom line", def: "The ultimate outcome or most important factor", ex: "The bottom line: we need to reduce CAC by 30%.", ph: "/ˈbɒt.əm laɪn/" },
    { term: "leverage", def: "To use something to maximum advantage", ex: "We can leverage our existing infrastructure to ship faster.", ph: "/ˈlev.ər.ɪdʒ/" },
    { term: "bandwidth", def: "Capacity or time available to handle work", ex: "I don't have the bandwidth for another project this sprint.", ph: "/ˈbænd.wɪdθ/" },
    { term: "deliverables", def: "Tangible outputs expected from a project", ex: "Main deliverables: the PRD and wireframes.", ph: "/dɪˈlɪv.ər.ə.bəlz/" },
    { term: "due diligence", def: "Thorough investigation before making a decision", ex: "We're conducting due diligence on acquisition targets.", ph: "/djuː ˈdɪl.ɪ.dʒəns/" },
    { term: "value proposition", def: "How a product uniquely solves a customer's problem", ex: "Our value proposition: saving analysts 10+ hours per week.", ph: "/ˈvæl.juː ˌprɒp.əˈzɪʃ.ən/" },
  ]},
  { cat: "Interview & Career", icon: "🎯", col: "info", words: [
    { term: "track record", def: "Past performance or achievements", ex: "I have a strong track record of data-driven solutions.", ph: "/træk ˈrek.ɔːrd/" },
    { term: "thought leadership", def: "Establishing authority in a specific field", ex: "My content strategy focuses on thought leadership.", ph: "/θɔːt ˈliː.dər.ʃɪp/" },
    { term: "upskilling", def: "Learning new skills to advance in career", ex: "Continuous upskilling keeps me competitive.", ph: "/ˈʌp.skɪl.ɪŋ/" },
    { term: "pain point", def: "Specific problem experienced by a customer", ex: "The biggest pain point was the slow export feature.", ph: "/peɪn pɔɪnt/" },
    { term: "scope creep", def: "Uncontrolled growth in a project's scope", ex: "We mitigated scope creep with clear acceptance criteria.", ph: "/skoʊp kriːp/" },
    { term: "ownership", def: "Taking full responsibility for outcomes", ex: "I took full ownership from scoping to deployment.", ph: "/ˈoʊ.nər.ʃɪp/" },
    { term: "impact-driven", def: "Focused on measurable, meaningful results", ex: "I'm impact-driven, prioritizing high-ROI initiatives.", ph: "/ˈɪm.pækt ˈdrɪv.ən/" },
    { term: "remote-first culture", def: "Work environment designed for distributed teams", ex: "Yamazing Corp operates remote-first across time zones.", ph: "/rɪˈmoʊt fɜːrst ˈkʌl.tʃər/" },
  ]},
];

const verbExercises = [
  { level: "Tenses in Context", icon: "⏳", exercises: [
    { prompt: "By next quarter, we ___ (launch) the new pricing tier.", answer: "will have launched", tense: "Future Perfect", tip: "Use future perfect for actions completed before a future deadline." },
    { prompt: "The team ___ (refactor) the codebase since January.", answer: "has been refactoring", tense: "Present Perfect Continuous", tip: "Ongoing action from past to now." },
    { prompt: "If we ___ (invest) in automation earlier, we'd have saved 200 hours.", answer: "had invested", tense: "3rd Conditional", tip: "Hypothetical past that didn't happen." },
    { prompt: "While I ___ (analyze) the dataset, I noticed an anomaly.", answer: "was analyzing", tense: "Past Continuous", tip: "Background action concurrent with another past event." },
    { prompt: "By the time the board meets, we ___ (prepare) three models.", answer: "will have prepared", tense: "Future Perfect", tip: "Completed before a specific future point." },
    { prompt: "She ___ (work) on the pipeline for six months before launch.", answer: "had been working", tense: "Past Perfect Continuous", tip: "Duration before another past event." },
    { prompt: "Competitors ___ (roll out) similar features lately.", answer: "have been rolling out", tense: "Present Perfect Continuous", tip: "Recent repeated actions with present relevance." },
    { prompt: "If we ___ (reduce) friction, conversion would increase.", answer: "reduced", tense: "2nd Conditional", tip: "Hypothetical present/future." },
  ]},
  { level: "Phrasal Verbs in Business", icon: "🔗", exercises: [
    { prompt: "We need to ___ ___ a meeting with investors. (arrange)", answer: "set up", tense: "Phrasal Verb", tip: "'Set up' = arrange or organize." },
    { prompt: "Let's ___ ___ the data before conclusions. (examine)", answer: "look into", tense: "Phrasal Verb", tip: "'Look into' = investigate." },
    { prompt: "The CEO decided to ___ ___ the launch. (postpone)", answer: "put off", tense: "Phrasal Verb", tip: "'Put off' = delay." },
    { prompt: "I'll ___ ___ the report by Friday. (deliver)", answer: "turn in", tense: "Phrasal Verb", tip: "'Turn in' = submit." },
    { prompt: "We can't ___ ___ ___ this churn level. (tolerate)", answer: "put up with", tense: "Phrasal Verb", tip: "'Put up with' = tolerate." },
    { prompt: "The project ___ ___ due to budget issues. (failed)", answer: "fell through", tense: "Phrasal Verb", tip: "'Fall through' = plan failed." },
    { prompt: "Let me ___ ___ the key takeaways. (summarize)", answer: "run through", tense: "Phrasal Verb", tip: "'Run through' = quickly review." },
    { prompt: "We need to ___ ___ ___ a solution. (create)", answer: "come up with", tense: "Phrasal Verb", tip: "'Come up with' = think of an idea." },
  ]},
];

const convScenarios = [
  { title: "Job Interview", ctx: "Senior Data Scientist at a global tech company", icon: "🎤", col: "accent",
    sys: `You are a senior hiring manager at a global tech company interviewing Jonas for a Senior Data Scientist position. He has experience in data analysis, agribusiness rebate optimization, SaaS entrepreneurship (Yamazing Corp), and vibe coding. Conduct a realistic behavioral interview. Ask one question at a time. After each response, give brief English feedback (grammar, vocabulary, fluency) then ask the next question. Be encouraging but honest. Use STAR method focus. Start by asking for an introduction.`,
    start: "Welcome, Jonas. Thanks for joining us today. Could you walk me through your background and what brings you to this role?",
    tips: ["STAR method", "Quantify results", "Show ownership"] },
  { title: "Sprint Planning", ctx: "Leading cross-functional sprint planning", icon: "📋", col: "secondary",
    sys: `Simulate a sprint planning meeting. Play multiple roles: PM, frontend dev, QA engineer. Jonas is tech lead for a SaaS product. Raise concerns, ask questions, sometimes disagree. After each response, note English improvements in [brackets].`,
    start: "Hey team, thanks for joining. The CEO wants us to prioritize the analytics dashboard. Thoughts on feasibility for this sprint?",
    tips: ["Facilitation language", "Hedging phrases", "Manage disagreements"] },
  { title: "C-Suite Presentation", ctx: "Quarterly business review to executives", icon: "📈", col: "tertiary",
    sys: `You are CFO and VP of Product. Jonas presents Q4 data analysis. Ask tough questions about methodology, impact, next steps. Challenge assumptions. Provide English feedback in [brackets] on executive communication style.`,
    start: "Jonas, you have 15 minutes. What's the headline?",
    tips: ["Lead with conclusion", "Executive language", "Anticipate 'So what?'"] },
  { title: "Client Discovery Call", ctx: "Yamazing Corp prospect discovery", icon: "🤝", col: "info",
    sys: `You are Head of Operations at a logistics company exploring SaaS solutions. Jonas represents Yamazing Corp. Share pain points gradually, ask about pricing, express skepticism. Provide English feedback in [brackets] on consultative selling.`,
    start: "Hi Jonas, I'll be honest — we've tried tools before and they didn't stick. But what does Yamazing do exactly?",
    tips: ["Active listening", "Open questions", "Mirror language"] },
];

const writingPrompts = [
  { title: "LinkedIn Post", icon: "✍️", prompt: "Write a LinkedIn post (150-200 words) sharing a data-driven insight from agribusiness. Conversational yet professional. Include hook, story, insight, CTA.", criteria: ["Strong hook", "Pro vocab", "Structure", "CTA", "Grammar"] },
  { title: "Executive Email", icon: "📧", prompt: "Email your VP about a data migration that's 2 weeks behind. Explain why, propose new timeline, highlight progress. Under 150 words.", criteria: ["Concise", "Pro tone", "Solution-focused", "Formality", "Next steps"] },
  { title: "SaaS Feature Copy", icon: "🛠️", prompt: "Product description (100-150 words) for an AI analytics feature. Target: CTOs. Focus on value, not features.", criteria: ["Benefit-focused", "Credibility", "Value prop", "Copywriting", "Tone"] },
  { title: "Slack Disagreement", icon: "💬", prompt: "Slack message (50-80 words) disagreeing with a colleague's NoSQL proposal — you think relational DB is better. Be diplomatic.", criteria: ["Diplomatic", "Clear reasoning", "Collaborative", "Informal", "Brief"] },
];

const intQuestions = [
  { cat: "Behavioral", icon: "🧠", qs: [
    { q: "Tell me about a time you made a decision with incomplete data.", tip: "STAR method. Show analytical thinking + action bias." },
    { q: "Describe influencing a stakeholder who disagreed with your analysis.", tip: "Empathy, data storytelling, outcome." },
    { q: "Example of identifying and fixing a process inefficiency.", tip: "Quantify improvement. Show ownership." },
    { q: "Tell me about a project that failed. What did you learn?", tip: "Vulnerability + growth mindset. Lessons, not blame." },
  ]},
  { cat: "Technical", icon: "⚙️", qs: [
    { q: "How would you explain a complex ML model to a non-technical stakeholder?", tip: "Analogies. No jargon. Business impact." },
    { q: "Walk me through a customer churn prediction project.", tip: "End-to-end: data → model → deploy → value." },
    { q: "Correlation vs causation — give a business example.", tip: "Classic. Use a real-world domain example." },
    { q: "How do you prioritize data projects?", tip: "Impact vs effort, stakeholder input, strategy." },
  ]},
  { cat: "Culture & Leadership", icon: "🌍", qs: [
    { q: "How do you handle different time zones and cultures?", tip: "Adaptability, async comms, empathy." },
    { q: "What does 'ownership' mean in a remote-first environment?", tip: "Proactivity, accountability, communication." },
    { q: "Where do you see yourself in 3-5 years?", tip: "Align with role. Ambition + realism." },
    { q: "Why opportunities outside Brazil?", tip: "Growth, global impact, diverse perspectives." },
  ]},
];

const expressions = [
  { exp: "Let's circle back on this", mean: "Return to discuss later", ctx: "Meetings", ex: "Good point — let's circle back after reviewing the data." },
  { exp: "I'll take the lead on this", mean: "I'll drive this forward", ctx: "Ownership", ex: "I'll take the lead on the migration and keep you posted." },
  { exp: "We're on the same page", mean: "We share the same understanding", ctx: "Alignment", ex: "Let's make sure we're on the same page regarding the timeline." },
  { exp: "Let me push back on that", mean: "I respectfully disagree", ctx: "Debates", ex: "Let me push back — the data suggests a different approach." },
  { exp: "That's a fair point", mean: "Your argument is valid", ctx: "Discussions", ex: "That's a fair point. Let me reconsider my assumptions." },
  { exp: "I'd love to get your take", mean: "I want your opinion", ctx: "Collaboration", ex: "Before I finalize, I'd love to get your take on the methodology." },
  { exp: "Let's not boil the ocean", mean: "Don't try too much at once", ctx: "Scoping", ex: "For the MVP, let's not boil the ocean — focus on core features." },
  { exp: "The ball is in their court", mean: "Their turn to act", ctx: "Follow-ups", ex: "We sent the proposal. The ball is in their court now." },
];

export default function App() {
  const [dk, setDk] = useState(false);
  const [mod, setMod] = useState(M.DASH);
  const [vsi, setVsi] = useState(0);
  const [vci, setVci] = useState(0);
  const [showDef, setShowDef] = useState(false);
  const [vScore, setVScore] = useState({ k: 0, l: 0 });
  const [bsi, setBsi] = useState(0);
  const [bi, setBi] = useState(0);
  const [bAns, setBAns] = useState("");
  const [bFb, setBFb] = useState(null);
  const [bScore, setBScore] = useState({ c: 0, t: 0 });
  const [si, setSi] = useState(0);
  const [msgs, setMsgs] = useState([]);
  const [cin, setCin] = useState("");
  const [cLoad, setCLoad] = useState(false);
  const [wi, setWi] = useState(0);
  const [wTxt, setWTxt] = useState("");
  const [wFb, setWFb] = useState(null);
  const [wLoad, setWLoad] = useState(false);
  const [iCat, setICat] = useState(0);
  const [iQ, setIQ] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [expI, setExpI] = useState(0);
  const [streak, setStreak] = useState(0);
  const [anim, setAnim] = useState(0);
  const chatEnd = useRef(null);

  const th = dk ? THEMES.dark : THEMES.light;

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { setAnim(a => a + 1); }, [mod]);

  const api = useCallback(async (sys, messages) => {
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages }),
      });
      const d = await r.json();
      return d.content?.map(b => b.text || "").join("\n") || "No response.";
    } catch { return "Connection error. Please try again."; }
  }, []);

  const sendChat = useCallback(async () => {
    if (!cin.trim() || cLoad) return;
    const u = { role: "user", content: cin };
    const nm = [...msgs, u]; setMsgs(nm); setCin(""); setCLoad(true);
    const r = await api(convScenarios[si].sys, nm.map(m => ({ role: m.role, content: m.content })));
    setMsgs(p => [...p, { role: "assistant", content: r }]); setCLoad(false);
  }, [cin, cLoad, msgs, si, api]);

  const getWFb = useCallback(async () => {
    if (!wTxt.trim() || wLoad) return;
    setWLoad(true);
    const wp = writingPrompts[wi];
    const r = await api(`You are an expert English writing coach. Student: upper-intermediate Brazilian professional (Data Scientist/SaaS). Evaluate on: ${wp.criteria.join(", ")}. Format: **Score**: X/10 | **Strengths**: 2-3 | **Improve**: 2-3 with corrections | **Rewrite**: improved | **Notes**: patterns. Encouraging but precise.`,
      [{ role: "user", content: `Task: ${wp.prompt}\n\nWriting:\n${wTxt}` }]);
    setWFb(r); setWLoad(false);
  }, [wTxt, wLoad, wi, api]);

  const startConv = useCallback((i) => { setSi(i); setMsgs([{ role: "assistant", content: convScenarios[i].start }]); setMod(M.CONV); }, []);

  const checkV = useCallback(() => {
    const ex = verbExercises[bsi].exercises[bi];
    const ok = bAns.trim().toLowerCase() === ex.answer.toLowerCase();
    setBFb({ ok, ans: ex.answer, tip: ex.tip });
    setBScore(p => ({ c: p.c + (ok ? 1 : 0), t: p.t + 1 }));
    ok ? setStreak(s => s + 1) : setStreak(0);
  }, [bAns, bsi, bi]);

  const nextV = useCallback(() => {
    const s = verbExercises[bsi];
    if (bi < s.exercises.length - 1) setBi(i => i + 1);
    else if (bsi < verbExercises.length - 1) { setBsi(i => i + 1); setBi(0); }
    else { setBsi(0); setBi(0); }
    setBAns(""); setBFb(null);
  }, [bi, bsi]);

  // ═══ DESIGN SYSTEM COMPONENTS ═══

  const getCol = (c) => ({ accent: { bg: th.accentDim, fg: th.accentText }, secondary: { bg: th.secondaryDim, fg: th.secondary }, tertiary: { bg: th.tertiaryDim, fg: th.tertiary }, info: { bg: th.infoDim, fg: th.info }, success: { bg: th.successDim, fg: th.success }, error: { bg: th.errorDim, fg: th.error }, warning: { bg: th.warningDim, fg: th.warning } }[c] || { bg: th.accentDim, fg: th.accentText });

  const Card = ({ children, s = {}, onClick }) => (
    <div onClick={onClick} style={{ background: th.bgCard, borderRadius: 22, padding: 28, border: `1px solid ${th.borderCard}`, boxShadow: th.shadow, transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)", cursor: onClick ? "pointer" : "default", backgroundImage: th.gradCard, ...s }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.boxShadow = th.shadowHover; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = th.accent + "33"; }}}
      onMouseLeave={e => { if (onClick) { e.currentTarget.style.boxShadow = th.shadow; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = th.borderCard; }}}
    >{children}</div>
  );

  const Btn = ({ label, onClick, v = "primary", dis = false, icon, sz = "md" }) => {
    const vs = { primary: { bg: th.gradAccent, c: dk ? "#0E1117" : "#1A1A18", bd: "none" }, secondary: { bg: th.secondaryDim, c: th.secondary, bd: `1px solid ${th.secondary}22` }, ghost: { bg: "transparent", c: th.textSec, bd: `1px solid ${th.border}` }, success: { bg: th.success, c: "#fff", bd: "none" }, warning: { bg: th.warning, c: "#1A1A18", bd: "none" }, danger: { bg: th.errorDim, c: th.error, bd: `1px solid ${th.error}22` } };
    const vv = vs[v] || vs.primary;
    const ss = { sm: { px: 14, py: 7, fs: 12 }, md: { px: 22, py: 11, fs: 13 }, lg: { px: 28, py: 14, fs: 15 } }[sz];
    return <button onClick={onClick} disabled={dis} style={{ background: dis ? th.bgAlt : vv.bg, color: dis ? th.textMut : vv.c, border: dis ? `1px solid ${th.border}` : vv.bd, borderRadius: 14, padding: `${ss.py}px ${ss.px}px`, fontSize: ss.fs, fontWeight: 650, cursor: dis ? "not-allowed" : "pointer", transition: "all 0.25s", fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.01em", display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}>{icon && <span style={{ fontSize: ss.fs + 1 }}>{icon}</span>}{label}</button>;
  };

  const Badge = ({ text, c = "accent", sz = "sm" }) => { const cc = getCol(c); return <span style={{ background: cc.bg, color: cc.fg, padding: sz === "sm" ? "4px 12px" : "6px 16px", borderRadius: 20, fontSize: sz === "sm" ? 11 : 13, fontWeight: 650, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{text}</span>; };

  const Pill = ({ label, active, onClick, col }) => {
    const c = col === "accent" ? th.accent : col === "secondary" ? th.secondary : col === "tertiary" ? th.tertiary : th.info;
    return <button onClick={onClick} style={{ background: active ? c : th.bgAlt, color: active ? (dk ? "#0E1117" : "#fff") : th.textSec, border: `1.5px solid ${active ? c : th.border}`, borderRadius: 14, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{label}</button>;
  };

  const PBar = ({ val, max, c = th.accent }) => <div style={{ height: 5, borderRadius: 3, background: th.bgAlt, overflow: "hidden", width: 80 }}><div style={{ height: "100%", width: `${Math.min((val / max) * 100, 100)}%`, background: c, borderRadius: 3, transition: "width 0.5s ease" }} /></div>;

  const InpStyle = { background: th.bgInput, border: `1.5px solid ${th.border}`, borderRadius: 14, padding: "14px 18px", color: th.text, fontSize: 15, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: "none", transition: "border 0.3s" };

  // ═══ DASHBOARD ═══
  const renderDash = () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <div style={{ background: th.gradHero, borderRadius: 28, padding: "48px 44px", marginBottom: 28, border: `1px solid ${th.borderCard}`, position: "relative", overflow: "hidden", backgroundImage: `${th.gradHero}, ${th.dots}`, backgroundSize: "100% 100%, 20px 20px" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 12, color: th.textMut, fontWeight: 600, marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Yamazing Corp • Learning Platform</p>
              <h1 style={{ fontSize: 42, fontWeight: 800, color: th.text, lineHeight: 1.1, fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: 12 }}>English Mastery<br/><span style={{ background: th.gradAccent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hub</span></h1>
              <p style={{ fontSize: 15, color: th.textSec, maxWidth: 440, lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Your personalized path to professional fluency — built for Data Scientists, SaaS founders & global leaders.</p>
            </div>
            {streak > 2 && <div style={{ background: th.warningDim, borderRadius: 16, padding: "10px 20px", display: "flex", alignItems: "center", gap: 8, border: `1px solid ${th.warning}22` }}><span style={{ fontSize: 20 }}>🔥</span><span style={{ color: th.warning, fontWeight: 750, fontSize: 18, fontFamily: "'Outfit',sans-serif" }}>{streak}</span></div>}
          </div>
        </div>
        <div style={{ position: "absolute", right: -50, top: -50, width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle, ${th.accentDim}, transparent 70%)`, opacity: 0.9 }} />
        <div style={{ position: "absolute", right: 100, bottom: -80, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${th.secondaryDim}, transparent 70%)`, opacity: 0.7 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { icon: "📚", title: "Vocabulary", desc: "32 terms across 4 domains", col: "secondary", m: M.VOCAB, ct: "32 terms" },
          { icon: "⚡", title: "Verb Mastery", desc: "Tenses & phrasal verbs", col: "accent", m: M.VERBS, ct: "16 exercises" },
          { icon: "🎙️", title: "Conversation", desc: "AI role-play with feedback", col: "tertiary", m: M.CONV, ct: "4 scenarios" },
          { icon: "✍️", title: "Writing Lab", desc: "Write & get AI feedback", col: "warning", m: M.WRITE, ct: "4 prompts" },
          { icon: "🎯", title: "Interview Prep", desc: "Behavioral & technical Qs", col: "info", m: M.INT, ct: "12 questions" },
        ].map((it) => {
          const cc = getCol(it.col);
          return (
            <Card key={it.title} onClick={() => { if (it.m === M.CONV) { setMod(M.CONV); setMsgs([]); } else setMod(it.m); }} s={{ padding: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: cc.bg }}>{it.icon}</div>
                <Badge text={it.ct} c={it.col} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 750, color: th.text, marginBottom: 6, fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.02em" }}>{it.title}</h3>
              <p style={{ fontSize: 13, color: th.textSec, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{it.desc}</p>
            </Card>
          );
        })}
      </div>

      <Card s={{ position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: th.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💡</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: th.text, fontFamily: "'Outfit',sans-serif" }}>Daily Expression</h3>
          </div>
          <Btn label="Next" onClick={() => setExpI(i => (i + 1) % expressions.length)} v="ghost" sz="sm" icon="→" />
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: th.text, marginBottom: 10, fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.02em" }}>"{expressions[expI].exp}"</h2>
        <p style={{ color: th.textSec, fontSize: 15, marginBottom: 14 }}>{expressions[expI].mean}</p>
        <Badge text={expressions[expI].ctx} c="info" />
        <div style={{ background: th.bgAlt, borderRadius: 16, padding: 18, borderLeft: `3px solid ${th.accent}`, marginTop: 14 }}>
          <p style={{ color: th.text, fontSize: 14, fontStyle: "italic", lineHeight: 1.6 }}>"{expressions[expI].ex}"</p>
        </div>
      </Card>
    </div>
  );

  // ═══ VOCAB ═══
  const renderVocab = () => {
    const s = vocabSets[vsi], c = s.words[vci];
    return (
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>{vocabSets.map((ss, i) => <Pill key={i} label={`${ss.icon} ${ss.cat}`} active={vsi === i} onClick={() => { setVsi(i); setVci(0); setShowDef(false); }} col={ss.col} />)}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ color: th.textMut, fontSize: 13, fontWeight: 500 }}>{vci + 1} of {s.words.length}</span><PBar val={vci + 1} max={s.words.length} c={th.secondary} /></div>
          <div style={{ display: "flex", gap: 8 }}><Badge text={`✓ ${vScore.k}`} c="success" /><Badge text={`📖 ${vScore.l}`} c="warning" /></div>
        </div>
        <Card s={{ textAlign: "center", minHeight: 320, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: 11, color: th.textMut, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>{s.cat}</p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: th.text, marginBottom: 8, fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.02em" }}>{c.term}</h2>
          <p style={{ color: th.textMut, fontSize: 14, marginBottom: 30, fontFamily: "monospace" }}>{c.ph}</p>
          {!showDef ? (
            <button onClick={() => setShowDef(true)} style={{ background: th.bgAlt, color: th.textSec, border: `1.5px dashed ${th.border}`, borderRadius: 16, padding: "18px 40px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = th.accent; e.currentTarget.style.color = th.accentText; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.color = th.textSec; }}>Tap to reveal</button>
          ) : (
            <div style={{ width: "100%", maxWidth: 520 }}>
              <p style={{ color: th.text, fontSize: 17, marginBottom: 22, lineHeight: 1.65 }}>{c.def}</p>
              <div style={{ background: th.bgAlt, borderRadius: 16, padding: 18, borderLeft: `3px solid ${th.secondary}`, textAlign: "left" }}>
                <p style={{ color: th.textMut, fontSize: 10, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Example</p>
                <p style={{ color: th.text, fontSize: 14, fontStyle: "italic", lineHeight: 1.6 }}>"{c.ex}"</p>
              </div>
            </div>
          )}
        </Card>
        {showDef && <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 22 }}>
          <Btn label="Still Learning" v="warning" icon="📖" onClick={() => { setVScore(p => ({ ...p, l: p.l + 1 })); setShowDef(false); setVci(i => (i + 1) % s.words.length); }} />
          <Btn label="I Know This" v="success" icon="✓" onClick={() => { setVScore(p => ({ ...p, k: p.k + 1 })); setShowDef(false); setVci(i => (i + 1) % s.words.length); setStreak(x => x + 1); }} />
        </div>}
      </div>
    );
  };

  // ═══ VERBS ═══
  const renderVerbs = () => {
    const s = verbExercises[bsi], ex = s.exercises[bi];
    return (
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>{verbExercises.map((ss, i) => <Pill key={i} label={`${ss.icon} ${ss.level}`} active={bsi === i} onClick={() => { setBsi(i); setBi(0); setBAns(""); setBFb(null); }} col="accent" />)}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ color: th.textMut, fontSize: 13, fontWeight: 500 }}>{bi + 1} of {s.exercises.length}</span><PBar val={bi + 1} max={s.exercises.length} /></div>
          <div style={{ display: "flex", gap: 8 }}><Badge text={`${bScore.c}/${bScore.t}`} c={bScore.t > 0 && bScore.c / bScore.t > 0.7 ? "success" : "warning"} />{streak > 0 && <Badge text={`🔥 ${streak}`} c="accent" />}</div>
        </div>
        <Card>
          <Badge text={ex.tense} c="info" sz="md" />
          <p style={{ fontSize: 19, color: th.text, lineHeight: 1.8, margin: "20px 0 24px", fontWeight: 500 }}>{ex.prompt}</p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input value={bAns} onChange={e => setBAns(e.target.value)} onKeyDown={e => e.key === "Enter" && !bFb && checkV()} placeholder="Type your answer..." style={{ ...InpStyle, flex: 1, borderColor: bFb ? (bFb.ok ? th.success : th.error) : th.border }}
              onFocus={e => { if (!bFb) e.target.style.borderColor = th.accent; }} onBlur={e => { if (!bFb) e.target.style.borderColor = th.border; }} />
            {!bFb ? <Btn label="Check" onClick={checkV} /> : <Btn label="Next →" onClick={nextV} />}
          </div>
          {bFb && <div style={{ marginTop: 18, padding: 18, borderRadius: 16, background: bFb.ok ? th.successDim : th.errorDim, borderLeft: `3px solid ${bFb.ok ? th.success : th.error}` }}>
            <p style={{ fontWeight: 700, color: bFb.ok ? th.success : th.error, marginBottom: 6, fontFamily: "'Outfit',sans-serif", fontSize: 15 }}>{bFb.ok ? "✓ Correct!" : `✗ Answer: "${bFb.ans}"`}</p>
            <p style={{ color: th.textSec, fontSize: 13, lineHeight: 1.5 }}>💡 {bFb.tip}</p>
          </div>}
        </Card>
      </div>
    );
  };

  // ═══ CONVERSATION ═══
  const renderConv = () => {
    if (!msgs.length) return (
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: th.text, marginBottom: 8, fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.02em" }}>Conversation Practice</h2>
        <p style={{ color: th.textSec, fontSize: 15, marginBottom: 28 }}>Choose a scenario for AI-powered professional role-play</p>
        <div style={{ display: "grid", gap: 16 }}>
          {convScenarios.map((s, i) => { const cc = getCol(s.col); return (
            <Card key={i} onClick={() => startConv(i)} s={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: cc.bg }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 750, color: th.text, fontFamily: "'Outfit',sans-serif" }}>{s.title}</h3>
                  <p style={{ color: th.textMut, fontSize: 13 }}>{s.ctx}</p>
                </div>
                <span style={{ color: th.textMut, fontSize: 22 }}>→</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{s.tips.map((tip, j) => <Badge key={j} text={tip} c={s.col} />)}</div>
            </Card>
          );})}
        </div>
      </div>
    );
    const sc = convScenarios[si]; const cc = getCol(sc.col);
    return (
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 130px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${th.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: cc.bg }}>{sc.icon}</div>
            <div><h3 style={{ fontSize: 16, fontWeight: 700, color: th.text, fontFamily: "'Outfit',sans-serif" }}>{sc.title}</h3><p style={{ color: th.textMut, fontSize: 12 }}>{sc.ctx}</p></div>
          </div>
          <Btn label="End" onClick={() => setMsgs([])} v="danger" sz="sm" />
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, paddingRight: 6 }}>
          {msgs.map((m, i) => <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "78%", background: m.role === "user" ? th.chatU : th.chatB, color: m.role === "user" ? th.chatUT : th.chatBT, borderRadius: m.role === "user" ? "20px 20px 6px 20px" : "20px 20px 20px 6px", padding: "14px 20px", fontSize: 14, lineHeight: 1.65, border: m.role === "user" ? "none" : `1px solid ${th.border}`, whiteSpace: "pre-wrap", boxShadow: m.role === "user" ? "none" : th.shadow }}>{m.content}</div>)}
          {cLoad && <div style={{ alignSelf: "flex-start", padding: "14px 20px", background: th.chatB, borderRadius: 20, border: `1px solid ${th.border}` }}><div style={{ display: "flex", gap: 6 }}>{[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: th.textMut, animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />)}</div></div>}
          <div ref={chatEnd} />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${th.border}` }}>
          <input value={cin} onChange={e => setCin(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Type your response in English..." style={{ ...InpStyle, flex: 1, borderRadius: 16, padding: "14px 20px" }} onFocus={e => e.target.style.borderColor = th.accent} onBlur={e => e.target.style.borderColor = th.border} />
          <Btn label="Send" onClick={sendChat} dis={cLoad} icon="↑" />
        </div>
      </div>
    );
  };

  // ═══ WRITING ═══
  const renderWrite = () => {
    const wp = writingPrompts[wi];
    return (
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>{writingPrompts.map((p, i) => <Pill key={i} label={`${p.icon} ${p.title}`} active={wi === i} onClick={() => { setWi(i); setWTxt(""); setWFb(null); }} col="accent" />)}</div>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: th.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{wp.icon}</div>
            <h3 style={{ fontSize: 19, fontWeight: 750, color: th.text, fontFamily: "'Outfit',sans-serif" }}>{wp.title}</h3>
          </div>
          <p style={{ color: th.textSec, fontSize: 14, marginBottom: 18, lineHeight: 1.65 }}>{wp.prompt}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>{wp.criteria.map((c, i) => <Badge key={i} text={c} c="accent" />)}</div>
          <textarea value={wTxt} onChange={e => setWTxt(e.target.value)} placeholder="Write your response here..." rows={8} style={{ ...InpStyle, width: "100%", borderRadius: 16, padding: 18, resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = th.accent} onBlur={e => e.target.style.borderColor = th.border} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <span style={{ color: th.textMut, fontSize: 13 }}>{wTxt.split(/\s+/).filter(Boolean).length} words</span>
            <Btn label={wLoad ? "Analyzing..." : "Get AI Feedback"} onClick={getWFb} dis={wLoad || !wTxt.trim()} icon="✦" />
          </div>
        </Card>
        {wFb && <Card s={{ marginTop: 22, borderLeft: `3px solid ${th.success}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: th.successDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📝</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: th.success, fontFamily: "'Outfit',sans-serif" }}>AI Feedback</h3>
          </div>
          <div style={{ color: th.text, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{wFb}</div>
        </Card>}
      </div>
    );
  };

  // ═══ INTERVIEW ═══
  const renderInt = () => {
    const cat = intQuestions[iCat], q = cat.qs[iQ];
    return (
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>{intQuestions.map((c, i) => <Pill key={i} label={`${c.icon} ${c.cat}`} active={iCat === i} onClick={() => { setICat(i); setIQ(0); setShowTip(false); }} col="tertiary" />)}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}><span style={{ color: th.textMut, fontSize: 13, fontWeight: 500 }}>Question {iQ + 1} of {cat.qs.length}</span><PBar val={iQ + 1} max={cat.qs.length} c={th.tertiary} /></div>

        <Card s={{ textAlign: "center", padding: 44 }}>
          <div style={{ width: 68, height: 68, borderRadius: 20, background: th.tertiaryDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 28px" }}>{cat.icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 750, color: th.text, lineHeight: 1.5, marginBottom: 28, fontFamily: "'Outfit',sans-serif", maxWidth: 560, margin: "0 auto 28px" }}>"{q.q}"</h2>
          {!showTip ? <Btn label="Show coaching tip" onClick={() => setShowTip(true)} v="secondary" icon="💡" />
            : <div style={{ background: th.successDim, borderRadius: 18, padding: 20, borderLeft: `3px solid ${th.success}`, textAlign: "left", maxWidth: 520, margin: "0 auto" }}>
                <p style={{ color: th.textMut, fontSize: 10, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Coaching Tip</p>
                <p style={{ color: th.text, fontSize: 14, lineHeight: 1.65 }}>{q.tip}</p>
              </div>}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
            <Btn label="← Previous" onClick={() => { setIQ(i => Math.max(0, i - 1)); setShowTip(false); }} v="ghost" />
            <Btn label="Next →" onClick={() => { setIQ(i => (i + 1) % cat.qs.length); setShowTip(false); }} />
          </div>
          <p style={{ color: th.textMut, fontSize: 12, marginTop: 24, fontStyle: "italic" }}>Practice answering out loud before reading the tip!</p>
        </Card>

        <Card s={{ marginTop: 22 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: th.accentText, marginBottom: 14, fontFamily: "'Outfit',sans-serif" }}>🗣️ Power Phrases</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["I spearheaded the initiative to...", "The key takeaway was...", "I collaborated with cross-functional teams...", "That challenge taught me...", "I proactively identified the opportunity...", "The measurable impact was X%..."].map((p, i) =>
              <div key={i} style={{ background: th.accentDim, borderRadius: 12, padding: "10px 14px", fontSize: 12, color: th.accentText, fontWeight: 500, lineHeight: 1.5 }}>{p}</div>
            )}
          </div>
        </Card>
      </div>
    );
  };

  const renderMod = () => ({ [M.DASH]: renderDash, [M.VOCAB]: renderVocab, [M.VERBS]: renderVerbs, [M.CONV]: renderConv, [M.WRITE]: renderWrite, [M.INT]: renderInt }[mod] || renderDash)();

  const nav = [
    { k: M.DASH, l: "Home", i: "⬡" }, { k: M.VOCAB, l: "Vocabulary", i: "◈" }, { k: M.VERBS, l: "Verbs", i: "⚡" },
    { k: M.CONV, l: "Speak", i: "◉" }, { k: M.WRITE, l: "Write", i: "✦" }, { k: M.INT, l: "Interview", i: "◎" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: th.bg, color: th.text, fontFamily: "'Plus Jakarta Sans',sans-serif", transition: "background 0.4s, color 0.4s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${th.border};border-radius:3px}
        *{margin:0;padding:0;box-sizing:border-box}
        input::placeholder,textarea::placeholder{color:${th.textMut}}
      `}</style>

      <nav style={{ background: th.bgNav, backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", borderBottom: `1px solid ${th.border}`, padding: "0 20px", position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 2, overflowX: "auto" }}>
          {nav.map(n => (
            <button key={n.k} onClick={() => { setMod(n.k); if (n.k === M.CONV) setMsgs([]); }}
              style={{ background: "transparent", border: "none", borderBottom: mod === n.k ? `2.5px solid ${th.accent}` : "2.5px solid transparent", color: mod === n.k ? th.text : th.textMut, padding: "16px 14px", fontSize: 13, fontWeight: mod === n.k ? 700 : 500, cursor: "pointer", transition: "all 0.25s", fontFamily: "'Plus Jakarta Sans',sans-serif", display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}
              onMouseEnter={e => { if (mod !== n.k) e.currentTarget.style.color = th.text; }}
              onMouseLeave={e => { if (mod !== n.k) e.currentTarget.style.color = th.textMut; }}>
              <span style={{ fontSize: 13, opacity: mod === n.k ? 1 : 0.5 }}>{n.i}</span><span>{n.l}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setDk(!dk)} aria-label="Toggle theme" style={{ width: 54, height: 30, borderRadius: 15, border: `1.5px solid ${th.border}`, cursor: "pointer", background: dk ? th.accentDim : th.bgAlt, position: "relative", transition: "all 0.35s", padding: 0, flexShrink: 0 }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, background: th.accent, position: "absolute", top: 2, left: dk ? 27 : 2, transition: "left 0.35s cubic-bezier(0.22,1,0.36,1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, boxShadow: `0 1px 4px ${th.accent}44` }}>
            {dk ? "🌙" : "☀️"}
          </div>
        </button>
      </nav>

      <main key={anim} style={{ padding: "32px 24px 72px", animation: "fadeUp 0.4s ease" }}>{renderMod()}</main>
    </div>
  );
}
