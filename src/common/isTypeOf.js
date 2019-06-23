export default function isTypeOf(ele, target) {
  if (!ele) {
    return false;
  }

  try {
    return ele.type.name === target;
  } catch (e) {
    return false;
  }
}
