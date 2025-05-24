const convertKeyToLabel = (key) => key
  .replace(/_/g, ' ') // snake_case → space
  .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // camelCase → space
  .replace(/([a-zA-Z])([0-9])/g, '$1 $2') // word123 → word 123
  .replace(/([0-9])([a-zA-Z])/g, '$1 $2') // 123word → 123 word
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

export default convertKeyToLabel;
