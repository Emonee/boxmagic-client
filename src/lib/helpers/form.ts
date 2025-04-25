import { BoxMagixConfig } from "../../types/jsonBin";

const formatters = {
  Number,
};

export function formatFormData(form: HTMLFormElement) {
  const data = {} as BoxMagixConfig;
  for (const element of form.elements) {
    if (!(element instanceof HTMLInputElement)) continue;

    let finalValue: number | boolean | string | null;
    if (element.type === "checkbox") {
      finalValue = element.checked;
    } else {
      const formatter = formatters[element.dataset.formatter] || String;
      finalValue = formatter(element.value);
    }

    const splittedName = element.name.split(".");
    splittedName.reduce((acc, name, i) => {
      const isLast = i === splittedName.length - 1;
      const [value, index] = parseIndexedValue(name);
      if (isLast && index == null) acc[value] = finalValue;
      else if (isLast && index != null) {
        acc[value] ||= [];
        acc[value][index] = finalValue;
      } else if (!isLast && index == null) {
        acc[value] ||= {};
        return acc[value];
      } else if (!isLast && index != null) {
        acc[value] ||= [];
        acc[value][index] ||= {};
        return acc[value][index];
      }
      return acc;
    }, data);
  }
  return data;
}

// "name[0]" -> ["name", 0]
// "name0" -> ["name0", null]
function parseIndexedValue(str: string) {
  const match = str.match(/^([^\[\]]+)(?:\[(\d+)\])?$/);
  if (match) {
    return [match[1], match[2] !== undefined ? parseInt(match[2], 10) : null];
  }
  return [str, null];
}
