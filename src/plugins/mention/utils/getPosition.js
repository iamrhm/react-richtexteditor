export default function getPosition(elm) {
  const { bottom } = elm.getBoundingClientRect();
  return {
    top: bottom,
  }
}