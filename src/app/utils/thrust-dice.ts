export function getThrustDice(strength: number) {
  let tm = 0

  if (strength <= 10) {
    tm = Math.round(strength / 2) - 7
  } else if (strength <= 40) {
    tm = ((Math.round(strength / 2) - 2) % 4) - 1
  } else if (strength > 40 && strength <= 44) {
    tm = 1
  } else if (strength >= 50 && strength <= 54) {
    tm = 2
  } else if (strength >= 60 && strength <= 64) {
    tm = -1
  } else if (strength >= 65 && strength <= 69) {
    tm = 1
  } else if (strength >= 75 && strength <= 79) {
    tm = 2
  } else if (strength >= 85 && strength <= 89) {
    tm = 2
  } else if (strength >= 95 && strength <= 99) {
    tm = 2
  }

  return tm
}
