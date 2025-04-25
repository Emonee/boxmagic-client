import { useState, useEffect } from "preact/hooks";

type Params<T> = {
  enabled?: boolean;
  queryFn: () => Promise<T>;
};

export function useQuery<T>({ enabled = true, queryFn }: Params<T>) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refetchState, setRefetchState] = useState(false);

  function refetch() {
    setRefetchState((prev) => !prev);
  }

  useEffect(() => {
    if (!enabled) return;

    setLoading(true);
    queryFn()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchState]);

  return { data, loading, error, refetch };
}
