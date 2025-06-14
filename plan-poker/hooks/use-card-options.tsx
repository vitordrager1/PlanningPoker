import { useEffect, useState } from "react";

export default function useCardOptions() {
  const [cardOptions, setCardOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/firebase/card-options")
      .then((res) => res.json())
      .then((data) => setCardOptions(data))
      .finally(() => setLoading(false));
  }, []);

  return { cardOptions, loading };
}
