import { Day, Class } from "../../types/jsonBin";

type Props = {
  index: number;
  day: Day;
  boxMagicClass: Class;
};

export default function ClassInput({ day, boxMagicClass, index }: Props) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          role="switch"
          name={`classesByDay.${day}[${index}].active`}
          defaultChecked={boxMagicClass.active}
        />
        {boxMagicClass.hour}:{boxMagicClass.minute} | {boxMagicClass.name}
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
    </div>
  );
}
