function easeIn(time, maxTime, power = 4) {
  let t = constrain(time / maxTime, 0, 1);
  return 1 - pow(1 - t, power);
}

function easeOut(time, maxTime, power = 4) {
  let t = constrain(time / maxTime, 0, 1);
  return pow(t, power);
}

 // イーズイン・イーズアウトを組み合わせた関数
function easeInOut(time, maxTime, power = 4) {
  let t = constrain(time / maxTime, 0, 1);
  if (t < 0.5) {
    return easeOut(time, maxTime / 2, power) / 2;
  } else {
    return 0.5 + easeIn(time - maxTime / 2, maxTime / 2, power) / 2;
  }
}