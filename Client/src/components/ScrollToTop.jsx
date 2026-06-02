/** @format */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Har route change par page top se khule (SPA default scroll position fix) */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
