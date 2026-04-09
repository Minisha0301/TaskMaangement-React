import { useEffect, useState } from "react";
import { getSummary } from "../../Services/summaryApi";

export const useSummary = (refreshKey) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await getSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [refreshKey]);

  return { summary, loading };
};