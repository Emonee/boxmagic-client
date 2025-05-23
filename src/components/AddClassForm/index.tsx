import type { JSX } from "preact";
import { daysMapper } from "../../consts/daysMapper";
import { formatFormData } from "../../lib/helpers/form";
import { useContext, useState } from "preact/hooks";
import { JsonBinDataContext } from "../../context/JsonBinDataContext";
import { Class, Day } from "../../types/jsonBin";
import { putBoxMagicJsonBinId } from "../../lib/jsonbin";

export default function AddClassForm() {
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useContext(JsonBinDataContext);

  const onSubmit = (e: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = formatFormData<Class & { day: Day }>(form);
    const { day, ...classData } = formData;
    const boxMagicConfigCopy = structuredClone(data);
    boxMagicConfigCopy.classesByDay[day] ||= [];
    boxMagicConfigCopy.classesByDay[day].push(classData);
    if (import.meta.env.DEV) return console.log(boxMagicConfigCopy);

    setLoading(true);
    putBoxMagicJsonBinId(boxMagicConfigCopy)
      .then(() => {
        alert("Saved");
        form.reset();
        refetch?.();
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h3>Add Class</h3>
      <form onSubmit={onSubmit}>
        <label>
          ID
          <input name="id" data-formatter="Number" required />
        </label>
        <label>
          Day
          <select name="day" required>
            <option value="" disabled selected>
              Select Day
            </option>
            {Object.entries(daysMapper).map(([day, label]) => (
              <option value={day}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Hour
          <input name="hour" type="number" data-formatter="Number" required />
        </label>
        <label>
          Minute
          <input name="minute" type="number" data-formatter="Number" required />
        </label>
        <label>
          <input name="active" type="checkbox" />
          Active
        </label>
        <button
          type="submit"
          aria-busy={loading ? "true" : "false"}
          disabled={loading}
        >
          Add Class
        </button>
      </form>
    </>
  );
}
