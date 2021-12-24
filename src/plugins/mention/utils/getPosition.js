export default function getPosition(elm) {
  const {
    top,
    right,
  } = elm.getBoundingClientRect();
  return {
    top,
    right,
  }
}