export default function getPosition(elm) {
  const { bottom, top, height } = elm.getBoundingClientRect();
  return {
    bottom: bottom,
    top: top,
    height: height,
    elm,
  }
}