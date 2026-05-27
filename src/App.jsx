import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Check,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
  Home,
  BarChart2,
  Users,
  Settings,
  Bell,
  Search,
  Calendar,
  Inbox,
  LogOut,
  TrendingUp,
  Briefcase,
  CheckSquare,
  ArrowUpRight,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { validateStep } from "./utils/validation";

import {
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
  provider,
} from "/firebase";

import logo from "./assets/Ellipse 1.png"
const STEPS = [
  { label: "Create your account", desc: "Name, email & password" },
  { label: "Your role", desc: "Tell us about yourself" },
  { label: "Workspace", desc: "Set up your team space" },
  { label: "Invite team", desc: "Bring colleagues aboard" },
  { label: "Your goals", desc: "What you want to achieve" },
];

const GOALS = [
  "Manage projects or tasks",
  "Collaborate with my team",
  "Track performance and KPIs",
  "Design workflows or systems",
  "Just exploring for now",
];

const AREA_DATA = [
  { m: "Jan", a: 42, b: 28 },
  { m: "Feb", a: 58, b: 35 },
  { m: "Mar", a: 45, b: 40 },
  { m: "Apr", a: 72, b: 52 },
  { m: "May", a: 65, b: 48 },
  { m: "Jun", a: 88, b: 61 },
  { m: "Jul", a: 79, b: 70 },
  { m: "Aug", a: 95, b: 82 },
];

const BAR_DATA = [
  { d: "Mon", done: 12, open: 5 },
  { d: "Tue", done: 18, open: 8 },
  { d: "Wed", done: 14, open: 6 },
  { d: "Thu", done: 22, open: 4 },
  { d: "Fri", done: 19, open: 7 },
];

function PrimaryBtn({ children, onClick, full, size = "md" }) {
  return (
    <button
      onClick={onClick}
      className={`btn-primary ${size === "sm" ? "btn-sm" : ""} ${full ? "full" : ""
        }`}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn-ghost">
      {children}
    </button>
  );
}

function TextInput({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="text-field">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-input"
      />
    </div>
  );
}

function OnboardingSidebar({ step }) {
  return (
    <aside className="onboarding-sidebar">
      <Logo size={28} />

      <div className="sidebar-caption">Setup progress</div>
      <div className="sidebar-step-list">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={i} className="sidebar-step-row">
              {i < STEPS.length - 1 && (
                <div
                  className={`sidebar-step-connector ${done ? "done" : ""}`}
                />
              )}
              <div className="sidebar-step-body">
                <div
                  className={`sidebar-step-dot ${done ? "done" : active ? "active" : ""
                    }`}
                >
                  {done ? (
                    <Check size={14} color="#fff" strokeWidth={3} />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <div className="sidebar-step-text">
                  <p
                    className={`sidebar-step-title ${active ? "active" : ""}`}
                  >
                    {s.label}
                  </p>
                  <p className="sidebar-step-desc">{s.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="sidebar-help">
        Need help? <span>Contact support</span>
      </p>
    </aside>
  );
}

function StepBasics({ form, setForm }) {
  return (
    <>
      <h2 className="section-header">Let's start with the basics</h2>
      <p className="section-subtitle">
        Tell us a bit about yourself to get started.
      </p>
      <TextInput
        label="Full name"
        placeholder="Jordan Lee"
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
      />
      <TextInput
        label="Work email"
        type="email"
        placeholder="jordan@company.com"
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
      />
      <TextInput
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={(v) => setForm({ ...form, password: v })}
      />
    </>
  );
}

function StepRole({ form, setForm }) {
  return (
    <>
      <h2 className="section-header">Who's joining us?</h2>
      <p className="section-subtitle">
        Select the role that best describes you.
      </p>
      <div className="role-grid">
        <input className="text-input" type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Enter your role..." />
      </div>
    </>
  );
}

function StepWorkspace({ form, setForm }) {
  return (
    <>
      <h2 className="section-header">Create your workspace</h2>
      <p className="section-subtitle">
        This will be your team's home in diag.
      </p>
      <TextInput
        label="Workspace name"
        placeholder="Acme Corp"
        value={form.workspace}
        onChange={(v) => setForm({ ...form, workspace: v })}
      />
      <TextInput
        label="Work URL"
        placeholder="acme.diag.com"
        value={form.wsUrl || ""}
        onChange={(v) => setForm({ ...form, wsUrl: v })}
      />
      <div className="text-field">
        <label>Company size</label>
        <select
          value={form.wsSize}
          onChange={(e) => setForm({ ...form, wsSize: e.target.value })}
          className={`workspace-select ${form.wsSize ? "" : "empty"}`}
        >
          <option value="">Select company size…</option>
          {["1–10", "11–50", "51–200", "201–500", "500+"].map((s) => (
            <option key={s} value={s}>
              {s} employees
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function StepInvite({ form, setForm }) {
  const add = () => setForm({ ...form, emails: [...form.emails, ""] });
  const rem = (i) =>
    setForm({ ...form, emails: form.emails.filter((_, j) => j !== i) });
  const upd = (i, v) => {
    const e = [...form.emails];
    e[i] = v;
    setForm({ ...form, emails: e });
  };

  return (
    <>
      <h2 className="section-header">Invite teammates by email</h2>
      <p className="section-subtitle">
        Add your team — you can always do this later.
      </p>
      {form.emails.map((email, i) => (
        <div key={i} className="invite-row">
          <input
            type="email"
            placeholder="colleague@company.com"
            value={email}
            onChange={(e) => upd(i, e.target.value)}
            className="text-input"
          />
          {form.emails.length > 1 && (
            <button type="button" className="remove-email" onClick={() => rem(i)}>
              <X size={15} />
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-email" onClick={add}>
        <Plus size={15} /> Add another
      </button>
    </>
  );
}

function StepGoals({ form, setForm }) {
  const toggle = (g) => {
    const goals = form.goals.includes(g)
      ? form.goals.filter((x) => x !== g)
      : [...form.goals, g];
    setForm({ ...form, goals });
  };

  return (
    <>
      <h2 className="section-header">What do you want to achieve?</h2>
      <p className="section-subtitle">
        Select all that apply — we'll tailor your experience.
      </p>
      <div className="goal-list">
        {GOALS.map((g) => {
          const sel = form.goals.includes(g);
          return (
            <div
              key={g}
              className={`goal-option ${sel ? "selected" : ""}`}
              onClick={() => toggle(g)}
            >
              <div className="goal-checkbox">
                {sel && <Check size={12} color="#fff" strokeWidth={3} />}
              </div>
              <span>{g}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function NavItem({ Icon, label, sel, onClick }) {
  return (
    <div className={`dash-nav-item ${sel ? "active" : ""}`} onClick={onClick}>
      <Icon size={16} />
      {label}
    </div>
  );
}

function Dashboard({ userData }) {

  const [activeNav, setActiveNav] = useState("dashboard");
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/users/latest-signups/all"
    )
      .then((res) => res.json())
      .then((data) => {
        setLatestUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const stats = [ //Dummy values
    {
      label: "TOTAL REVENUE",
      value: "₦24,000.00",
      delta: "+20%",
      positive: true,
    },
    {
      label: "CHURNED REVENUE",
      value: "₦2,000.00",
      delta: "-5%",
      positive: false,
    },
    {
      label: "ACTIVE USERS",
      value: "400",
      delta: "+20%",
      positive: true,
    },
  ];

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-logo">
            <Logo size={32} />
          </div>

          <div className="sidebar-links">

            <NavItem
              Icon={Home}
              label="Dashboard"
              sel={activeNav === "dashboard"}
              onClick={() => setActiveNav("dashboard")}
            />

            <NavItem
              Icon={BarChart2}
              label="Report"
              sel={activeNav === "report"}
              onClick={() => setActiveNav("report")}
            />

            <NavItem
              Icon={TrendingUp}
              label="Analytics"
              sel={activeNav === "analytics"}
              onClick={() => setActiveNav("analytics")}
            />

            <NavItem
              Icon={Users}
              label="Users"
              sel={activeNav === "users"}
              onClick={() => setActiveNav("users")}
            />

            <NavItem
              Icon={Briefcase}
              label="Integrations"
              sel={activeNav === "integrations"}
              onClick={() => setActiveNav("integrations")}
            />

            <NavItem
              Icon={Settings}
              label="Settings"
              sel={activeNav === "settings"}
              onClick={() => setActiveNav("settings")}
            />
          </div>
        </div>

        <div className="trial-card">
          <div className="trial-icon">
            💎
          </div>

          <h4>
            You’re on a 7-day free trial
          </h4>

          <p>
            Enjoy full access to all features and tools.
          </p>

          <button>
            Choose a Plan
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search anything..."
            />
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={16} />
              <span className="notification-dot"></span>
            </button>

            <div className="header-user">
              {userData?.photo ? (
                <img
                  src={userData.photo}
                  alt=""
                  className="google-avatar"
                />

              ) : (

                <Avatar
                  initials={
                    userData?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "U"
                  }
                  size={36}
                />
              )}

              <span>
                {userData?.name || "User"}
              </span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <h1>
              Welcome {userData?.name?.split(" ")[0] || "User"}
            </h1>
          </div>

          <div className="metrics-grid">
            {stats.map((item, index) => (
              <div className="metric-card" key={index}>
                <span>{item.label}</span>
                <h2>{item.value}</h2>
                <p
                  className={
                    item.positive
                      ? "positive"
                      : "negative"
                  }
                >
                  {item.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="charts-grid">
            <div className="chart-card large-chart">
              <div className="chart-header">
                <p>Revenue Over Time</p>
              </div>
              <ResponsiveContainer width="100%" height={260}>

                <AreaChart data={AREA_DATA}>

                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#635BFF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#635BFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="m"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="a"
                    stroke="#635BFF"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">

              <div className="chart-header">
                <p>Top Performing Plans</p>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={BAR_DATA}>

                  <XAxis
                    dataKey="d"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />

                  <Bar
                    dataKey="done"
                    fill="#B7B2FF"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="signup-table-card">
            <div className="table-header">
              <h3>
                Latest Signups
              </h3>
            </div>

            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PLAN</th>
                  <th>JOINED</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {latestUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                      {user.workspace || "No workspace"}
                    </td>

                    <td>
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <span className="active-pill">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function Logo({ size = 32 }) {
  return (
    <div className="logo-wrap" style={{ "--logo-size": `${size}px` }}>
      <span className="D-logo"><img src={logo} alt="Diag Logo" /></span>
      <span className="logo-text">Diag</span>
    </div>
  );
}

function Avatar({ initials, size = 32 }) { //Google profile picture
  return (
    <div className="avatar" style={{ "--avatar-size": `${size}px` }}>
      {initials}
    </div>
  );
}

export default function DiagHQ() {

  const [screen, setScreen] = useState("welcome");
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    workspace: "",
    wsUrl: "",
    wsSize: "",
    emails: [""],
    goals: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  useEffect(() => { //This is inactive because I haven't set up the backend routes for fetching user data yet. Once those are in place, this will check if the user is already logged in and fetch their data to determine which screen to show (welcome, onboarding, or dashboard).
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (!firebaseUser) return;
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/${firebaseUser.uid}`
          );

          const data = await response.json();
          if (!data.user) return;
          setUserData(data.user);
          if (data.user.onboardingCompleted) {
            setScreen("dashboard");
          } else {
            setForm((prev) => ({
              ...prev,
              name: data.user.name || "",
              email: data.user.email || "",
            }));
            setScreen("onboarding");
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;
      const response = await fetch(
        "http://localhost:5000/api/users/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebaseUID: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          }),
        }
      );

      const data = await response.json();
      setUserData(data.user);
      if (data.user.onboardingCompleted) {
        setScreen("dashboard");
      } else {
        setForm((prev) => ({
          ...prev,
          name: data.user.name || "",
          email: data.user.email || "",
        }));
        setScreen("onboarding");
        setStep(1);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goNext = async () => {
    setError("");
    const validationError = validateStep(step, form);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/users/complete-onboarding",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            firebaseUID: auth.currentUser.uid,
          }),
        }
      );

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      setUserData(data.user);
      setScreen("dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goPrev = () => {
    setError("");
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      setScreen("welcome");
    }
  };

  if (screen === "dashboard") {
    return (
      <Dashboard
        userData={userData}
      />
    );
  }

  const stepComponents = [
    <StepBasics
      key={0}
      form={form}
      setForm={setForm}
    />,

    <StepRole
      key={1}
      form={form}
      setForm={setForm}
    />,

    <StepWorkspace
      key={2}
      form={form}
      setForm={setForm}
    />,

    <StepInvite
      key={3}
      form={form}
      setForm={setForm}
    />,

    <StepGoals
      key={4}
      form={form}
      setForm={setForm}
    />,
  ];

  return (
    <div className="diag-app">
      <OnboardingSidebar
        step={screen === "welcome" ? -1 : step}
      />
      <div className="onboarding-panel">
        <div className="onboarding-card">
          {screen === "welcome" ? (
            <>
              <div className="welcome-badge">
                🚀
              </div>

              <h2 className="welcome-title">
                Let's get you set up
                <br />
                in just a few steps
              </h2>

              <p className="welcome-subtitle">
                Your workspace is waiting.
                A few clicks and the engine room comes alive.
              </p>

              <div className="welcome-step-list">
                {STEPS.map((s, i) => (

                  <div
                    key={i}
                    className="welcome-step-row"
                  >
                    <div className="welcome-step-number">
                      {i + 1}
                    </div>

                    <span className="welcome-step-label">
                      <strong>{s.label}</strong>
                      <span> — {s.desc}</span>
                    </span>
                  </div>

                ))}
              </div>

              <div className="onboarding-actions">
                <PrimaryBtn
                  onClick={googleSignIn}
                  full
                  disabled={loading}
                >
                  <FaGoogle />
                  Continue with Google
                  <ChevronRight size={16} />
                </PrimaryBtn>

              </div>

            </>

          ) : (

            <>

              <div className="onboarding-progress">

                {STEPS.map((_, i) => (

                  <div
                    key={i}
                    className={`progress-step ${i <= step ? "active" : ""
                      }`}
                  />

                ))}

              </div>

              {error && (
                <div className="error-box">
                  {error}
                </div>
              )}

              {stepComponents[step]}

              <div className="onboarding-actions">

                <GhostBtn onClick={goPrev}>
                  Back
                </GhostBtn>

                <PrimaryBtn
                  onClick={goNext}
                  full
                >

                  {loading
                    ? "Please wait..."
                    : step === 4
                      ? "Complete setup"
                      : "Continue"}

                  {!loading && (
                    step === 4
                      ? <ArrowUpRight size={16} />
                      : <ChevronRight size={16} />
                  )}

                </PrimaryBtn>

              </div>

              {step === 3 && (
                <p
                  className="skip-text"
                  onClick={goNext}
                >
                  Skip for now
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}