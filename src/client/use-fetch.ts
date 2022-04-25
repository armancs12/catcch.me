import { useEffect, useState } from "react";

const useFetch = <T = any>(url: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) {
      return;
    }

    fetch(url)
      .then(res => res.json())
      .then((data: T) => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { loading, data, error };
}

export default useFetch;