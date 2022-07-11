export const getOptionsLabel = (
  value: string,
  options: {
    value: string;
    label: string;
  }[]
): string | undefined => {
  return options.find((opt) => opt.value === value)?.label;
};
