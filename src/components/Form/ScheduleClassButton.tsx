import { useContext } from "preact/hooks";
import { JsonBinDataContext } from "../../context/JsonBinDataContext";
import type { BoxMagixConfig, Class, Day } from "../../types/jsonBin";
import { bookClass } from "../../lib/boxmagic";
import { formatDate, getNextDayDate } from "../../lib/helpers/date";

type Props = {
  claseId: Class["id"];
  day: Day;
};

export default function ScheduleClassButton({ claseId, day }: Props) {
  const { membresiaID, pagoID, token } = useContext(JsonBinDataContext);

  const onClick = () => {
    const nextDate = getNextDayDate(day);
    bookClass({
      membresiaID,
      pagoID,
      token,
      claseId,
      fecha: formatDate(nextDate),
    }).catch((err) => {
      alert(`Error al reservar la clase:\n${err.message}`);
    });
  };

  return (
    <button type="button" onClick={onClick}>
      Agendar
    </button>
  );
}
