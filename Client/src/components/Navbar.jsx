/** @format */

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Plus,
  History,
  LogOut,
  Zap,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { ServerUrl } from "../App";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Notes", path: "/notes" },
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "About", path: "/about" },
];

const NavbarDropdown = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: -8, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8, scale: 0.96 }}
    transition={{ duration: 0.15 }}
    className={`absolute top-[calc(100%+10px)] right-0 z-[200] min-w-[220px]
    rounded-2xl border border-white/15 bg-[#0f0f14]/95 backdrop-blur-xl
    shadow-[0_20px_50px_rgba(0,0,0,0.55)] overflow-hidden ${className}`}>
    {children}
  </motion.div>
);

export default function Navbar() {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const closeAll = () => {
    setCreditOpen(false);
    setUserOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setCreditOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const handleNav = (item) => {
    closeAll();

    if (item.path === "/features") {
      if (location.pathname === "/") {
        scrollToFeatures();
      } else {
        navigate("/", { state: { scrollToFeatures: true } });
      }
      return;
    }

    if (item.path === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    navigate(item.path);
  };

  const isActive = (path) => {
    if (path === "/features") return location.pathname === "/";
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setUserData(null));
      navigate("/auth");
      closeAll();
    }
  };

  return (
    <>
      <AnimatePresence>
        {(creditOpen || userOpen || menuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px] md:pointer-events-auto"
            onClick={() => {
              setCreditOpen(false);
              setUserOpen(false);
              setMenuOpen(false);
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]
        max-w-7xl w-[90%] px-4 sm:px-6 py-3
        bg-black/80 backdrop-blur-xl border border-white/10
        rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.6)]
        flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNav({ path: "/" })}
          className="text-left shrink-0">
          <h1
            className="text-lg sm:text-xl md:text-2xl font-bold
            bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent">
            Exam.io
          </h1>
          <span className="text-xs text-gray-400 font-['Caveat'] hidden sm:block">
            Smarter prep. Better results.
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-300 font-medium">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => handleNav(item)}
                className={`group relative py-1 transition cursor-pointer
                ${isActive(item.path) ? "text-white" : "text-gray-300 hover:text-white"}`}>
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-blue-400 to-pink-400 transition-all
                  ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUserOpen(false);
                setMenuOpen(false);
                setCreditOpen((prev) => !prev);
              }}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border transition
              ${
                creditOpen
                  ? "bg-purple-500/25 border-purple-400/40 text-white"
                  : "bg-white/10 border-transparent hover:bg-white/15 text-white"
              }`}>
              <Zap size={14} className="text-yellow-400" />
              <span className="text-sm font-medium">{userData?.credits ?? 0}</span>
              <Plus size={14} className="opacity-80" />
            </button>

            <AnimatePresence>
              {creditOpen && (
                <NavbarDropdown>
                  <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Your balance
                    </p>
                    <p className="text-2xl font-bold text-white mt-0.5">
                      {userData?.credits ?? 0}{" "}
                      <span className="text-sm font-normal text-gray-400">credits</span>
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => {
                        closeAll();
                        navigate("/pricing");
                      }}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl
                      bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:opacity-90">
                      Buy more credits
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </NavbarDropdown>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCreditOpen(false);
                setMenuOpen(false);
                setUserOpen((prev) => !prev);
              }}
              className={`w-9 h-9 flex items-center justify-center rounded-full font-bold transition ring-2
              ${
                userOpen
                  ? "ring-purple-400/60 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "ring-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:ring-white/20"
              }`}>
              {userData?.name?.charAt(0).toUpperCase() ?? "?"}
            </button>

            <AnimatePresence>
              {userOpen && (
                <NavbarDropdown>
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white truncate">
                      {userData?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        closeAll();
                        navigate("/notes");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/10 text-left">
                      <BookOpen size={16} className="text-blue-400" />
                      Generate Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAll();
                        navigate("/history");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/10 text-left">
                      <History size={16} className="text-purple-400" />
                      History
                    </button>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-300 hover:bg-red-500/15 text-left">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </NavbarDropdown>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setCreditOpen(false);
              setUserOpen(false);
              setMenuOpen((prev) => !prev);
            }}
            aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden fixed top-[76px] sm:top-[88px] left-1/2 -translate-x-1/2 z-[110]
            w-[90%] max-w-7xl p-3 rounded-2xl
            bg-[#0f0f14]/98 backdrop-blur-xl border border-white/15 shadow-2xl">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item)}
                className={`w-full text-left py-3 px-4 rounded-xl transition font-medium
                ${
                  isActive(item.path)
                    ? "bg-purple-500/20 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}>
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
