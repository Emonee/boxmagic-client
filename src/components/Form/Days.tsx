import { useContext } from "preact/hooks";
import { JsonBinDataContext } from "../../context/JsonBinDataContext";
import { daysMapper } from "../../consts/daysMapper";
import { Day } from "../../types/jsonBin";
import ClassInputs from "./ClassInputs";

import { Fragment } from "preact";

export default function Days() {
  const {
    data: { classesByDay },
  } = useContext(JsonBinDataContext);
  const days = Object.entries(classesByDay);
  return days
    .toSorted((a, b) => (b[0] === "0" ? -1 : a[0].localeCompare(b[0]))) // Make sunday last
    .map(
      ([day, classes]) =>
        !!classes.length && (
          <Fragment key={day}>
            <h3>{daysMapper[+day as Day]}</h3>
            {classes.map((c, i) => (
              <ClassInputs
                key={c.id}
                day={+day as Day}
                boxMagicClass={c}
                index={i}
              />
            ))}
          </Fragment>
        )
    );
}
