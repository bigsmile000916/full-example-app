export const formErrorMessages = {
  required: '必須',
  maxLength: (value: number) => {
    return {
      value,
      message: `最大 ${value} 文字`,
    };
  },
};
