export const getDateNow = () => {
  const date = new Date();
  const dateNow = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  return dateNow;
};
