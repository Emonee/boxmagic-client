import { useContext, useState } from "preact/hooks";
import { JsonBinDataContext } from "../../context/JsonBinDataContext";
import type { JSX } from "preact";
import Days from "./Days";
import { formatFormData } from "../../lib/helpers/form";
import { putBoxMagicJsonBinId } from "../../lib/jsonbin";
export default function Form() {
  const [loading, setLoading] = useState(false);
  const data = useContext(JsonBinDataContext);

  function handleSubmit(e: JSX.TargetedSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = formatFormData(e.currentTarget);
    if (import.meta.env.DEV) return console.log(formData);

    setLoading(true);
    putBoxMagicJsonBinId(formData)
      .then(() => {
        alert("Saved");
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Token
        <input name="token" value={data.token} />
      </label>
      <label>
        Pago ID
        <input name="pagoID" value={data.pagoID} data-formatter="Number" />
      </label>
      <label>
        Membresia ID
        <input
          name="membresiaID"
          value={data.membresiaID}
          data-formatter="Number"
        />
      </label>
      <Days />
      <button
        type="submit"
        aria-busy={loading ? "true" : "false"}
        disabled={loading}
      >
        Save
      </button>
    </form>
  );
}
