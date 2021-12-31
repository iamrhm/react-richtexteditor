export default function getPosition(elm) {
  const { bottom, top } = elm.getBoundingClientRect();
  return {
    bottom: bottom,
    top: top - 24
  }
}