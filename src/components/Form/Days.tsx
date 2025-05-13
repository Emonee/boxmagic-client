import { useContext, useState } from "preact/hooks";
import { JsonBinDataContext } from "../../context/JsonBinDataContext";
import { daysMapper } from "../../consts/daysMapper";
import type { Day, Class } from "../../types/jsonBin";
import ClassInputs from "./ClassInputs";

import { Fragment } from "preact";

export default function Days() {
  const {
    data: { classesByDay },
  } = useContext(JsonBinDataContext);
  const dayEntries = Object.entries(classesByDay);
  const [daysToRemove, setDaysToRemove] = useState<
    { day: Day; classId: number }[]
  >([]);
  const days = dayEntries.map<[Day, Class[]]>(([day, classes]) => [
    +day as Day,
    classes.filter(
      (c) =>
        !daysToRemove.some((dtr) => dtr.day === +day && dtr.classId === c.id)
    ),
  ]);

  return days
    .toSorted((a, b) => (b[0] === 0 ? -1 : a[0] - b[0])) // Make sunday last
    .map(
      ([day, classes]) =>
        !!classes.length && (
          <Fragment key={day}>
            <h3>{daysMapper[+day as Day]}</h3>
            {classes
              .toSorted((a, b) => a.hour - b.hour || a.minute - b.minute)
              .map((c, i) => (
                <ClassInputs
                  key={c.id}
                  day={+day as Day}
                  boxMagicClass={c}
                  index={i}
                  onRemove={() => {
                    if (
                      !confirm(
                        `Are you sure you want to remove this class?\n${
                          c.name
                        }, ${daysMapper[day]} ${c.hour
                          .toString()
                          .padStart(2, "0")}:${c.minute
                          .toString()
                          .padStart(2, "0")} hrs`
                      )
                    )
                      return;

                    setDaysToRemove((prev) => [
                      ...prev,
                      { day: +day as Day, classId: c.id },
                    ]);
                  }}
                />
              ))}
          </Fragment>
        )
    );
}
