import { JsonBinDataContext } from "../context/JsonBinDataContext";
import { useQuery } from "../hooks/boxmagic/useQuery";
import { getBoxMagicJsonBinId } from "../lib/jsonbin";
import AddClassForm from "./AddClassForm";
import Form from "./Form";

export default function Main() {
  const { data, isFetched, error, refetch } = useQuery({
    queryFn: getBoxMagicJsonBinId,
  });

  return (
    <main>
      {!isFetched && <div aria-busy="true"></div>}
      {error && (
        <>
          <h3>Error</h3>
          <p>{error.message}</p>
        </>
      )}
      {data && !error && isFetched && (
        <JsonBinDataContext.Provider value={{ data, refetch }}>
          <Form />
          <AddClassForm />
        </JsonBinDataContext.Provider>
      )}
    </main>
  );
}
