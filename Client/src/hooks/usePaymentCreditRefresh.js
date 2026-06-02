import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CREDITS_BEFORE_PAYMENT_KEY,
  refreshUserCredits,
} from "../services/api";

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 8;

export const usePaymentCreditRefresh = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [status, setStatus] = useState("loading");
  const [creditsAdded, setCreditsAdded] = useState(null);
  const baselineRef = useRef(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    stoppedRef.current = false;

    const stored = sessionStorage.getItem(CREDITS_BEFORE_PAYMENT_KEY);
    const baseline =
      stored !== null ? Number(stored) : (userData?.credits ?? 0);
    baselineRef.current = Number.isNaN(baseline) ? 0 : baseline;

    const poll = async () => {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        if (stoppedRef.current) return;

        const user = await refreshUserCredits(dispatch);
        const current = user?.credits ?? 0;
        const before = baselineRef.current ?? 0;

        if (current > before) {
          setCreditsAdded(current - before);
          setStatus("updated");
          sessionStorage.removeItem(CREDITS_BEFORE_PAYMENT_KEY);
          return;
        }

        if (attempt < MAX_ATTEMPTS - 1) {
          await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        }
      }

      await refreshUserCredits(dispatch);
      setStatus("pending");
    };

    poll();

    return () => {
      stoppedRef.current = true;
    };
  }, [dispatch]);

  const retryRefresh = async () => {
    setStatus("loading");
    const user = await refreshUserCredits(dispatch);
    const current = user?.credits ?? 0;
    const before = baselineRef.current ?? 0;

    if (current > before) {
      setCreditsAdded(current - before);
      setStatus("updated");
      sessionStorage.removeItem(CREDITS_BEFORE_PAYMENT_KEY);
    } else {
      setStatus("pending");
    }
  };

  return {
    status,
    creditsAdded,
    currentCredits: userData?.credits ?? 0,
    retryRefresh,
  };
};
