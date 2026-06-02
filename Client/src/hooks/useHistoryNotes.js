import { useEffect, useState } from "react";
import { getHistoryNotes } from "../services/api";

export const useHistoryNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getHistoryNotes();
        setNotes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your notes history.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return { notes, loading, error };
};
