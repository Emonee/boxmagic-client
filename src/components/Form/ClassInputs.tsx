import { Day, Class } from "../../types/jsonBin";
import { useRef } from "preact/hooks";
import { daysMapper } from "../../consts/daysMapper";

type Props = {
  index: number;
  day: Day;
  boxMagicClass: Class;
  onRemove: () => void;
};

export default function ClassInput({
  day,
  boxMagicClass,
  index,
  onRemove,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        style={{ margin: 0, padding: "0.25rem 0.5rem" }}
        onClick={onRemove}
      >
        Remove
      </button>
      <label style={{ margin: 0 }}>
        <input
          type="checkbox"
          role="switch"
          name={`classesByDay.${day}[${index}].active`}
          defaultChecked={boxMagicClass.active}
        />
        {boxMagicClass.hour}:{boxMagicClass.minute.toString().padStart(2, "0")}{" "}
        | {boxMagicClass.name}
      </label>
      <input
        type="hidden"
        name={`classesByDay.${day}[${index}].id`}
        data-formatter="Number"
        defaultValue={boxMagicClass.id}
      />
      <input
        type="hidden"
        name={`classesByDay.${day}[${index}].name`}
        defaultValue={boxMagicClass.name}
      />
      <input
        type="hidden"
        name={`classesByDay.${day}[${index}].hour`}
        data-formatter="Number"
        defaultValue={boxMagicClass.hour}
      />
      <input
        type="hidden"
        name={`classesByDay.${day}[${index}].minute`}
        data-formatter="Number"
        defaultValue={boxMagicClass.minute}
      />
    </section>
  );
}
