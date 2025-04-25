import { JsonBinDataContext } from "../context/JsonBinDataContext";
import { useQuery } from "../hooks/boxmagic/useQuery";
import { getBoxMagicJsonBinId } from "../lib/jsonbin";
import Form from "./Form";

export default function Main() {
  const { data, loading, error } = useQuery({
    queryFn: getBoxMagicJsonBinId,
  });

  return (
    <main>
      {loading && <div aria-busy="true"></div>}
      {error && (
        <>
          <h3>Error</h3>
          <p>{error.message}</p>
        </>
      )}
      {data && !error && !loading && (
        <JsonBinDataContext.Provider value={data}>
          <Form />
        </JsonBinDataContext.Provider>
      )}
    </main>
  );
}
