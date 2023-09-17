export default function getPosition(elm : HTMLDivElement): {
  bottom: number,
  top: number,
  left: number,
  elm: HTMLDivElement,
} {
  const { bottom, top, left } = elm.getBoundingClientRect();
  return {
    bottom,
    top,
    left,
    elm,
  };
}
