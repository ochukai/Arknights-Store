module.exports = function repeat(mano, times = 1) {
  let ret = '';
  for(let i = 0; i < times; i ++) {
    ret += mano;
  }

  return ret;
}
