function easeIn(time, maxTime, power = 4) {
  let t = constrain(time / maxTime, 0, 1);
  return 1 - pow(1 - t, power);
}

function easeOut(time, maxTime, power = 4) {
  let t = constrain(time / maxTime, 0, 1);
  return pow(t, power);
}
