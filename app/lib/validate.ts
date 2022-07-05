export const formErrorMessages = {
  required: 'This field is required.',
  maxLength: (value: number) => {
    return {
      value,
      message: `This field has a max length of ${value} characters.`,
    };
  },
};
