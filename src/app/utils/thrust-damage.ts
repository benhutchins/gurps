import { getThrustDice } from './thrust-dice'

export function getThrustDamage(strength): string {
  const FinalDiceDmg = getThrustDice(strength)
  const ThrustMod = GetThrustMod(strength)

  const SkillMod = parseFloat(window.document.getElementById('SkillBonus').value);
  const WeaponFlat = parseFloat(window.document.getElementById('WeaponFlatMod').value);
  const MagicFlat = parseFloat(window.document.getElementById('MagicFlatMod').value);

  const orFlat = parseFloat(window.document.getElementById('WeaponOrFlat').value);
  const orPer = parseFloat(window.document.getElementById('WeaponOrPerDie').value);

  const WeaponMasterLevel = parseFloat(window.document.getElementById('WeaponExp').value);

  //handle the easy numbers for thrust mod...
  let FinalThrustMod = ThrustMod;
  if (!isNaN(SkillMod)) { FinalThrustMod += SkillMod; }
  if (!isNaN(WeaponFlat)) { FinalThrustMod += WeaponFlat; }
  if (!isNaN(MagicFlat)) { FinalThrustMod += MagicFlat; }

  //handle the flat or per-die mod...
  if (!isNaN(orFlat) && !isNaN(orPer)) {
    if (orFlat >= (orPer * FinalDiceDmg)) { FinalThrustMod += orFlat; }
    else { FinalThrustMod += (orPer * FinalDiceDmg); }
  }

  //handle weapon master bonus...
  if (WeaponMasterLevel > 0) {
    if (FinalDiceDmg <= 2) {
      //in this case we use the flat bonus
      FinalThrustMod += (2 * WeaponMasterLevel);
    }
    else {
      //in this case use the per-die bonus
      FinalThrustMod += (FinalDiceDmg * WeaponMasterLevel);
    }
  }

  let displayStr = "" + FinalDiceDmg + "d";
  if (FinalThrustMod > 0) { displayStr = displayStr + "+" + FinalThrustMod; }
  else if (FinalThrustMod < 0) { displayStr = displayStr + FinalThrustMod; }

  return displayStr;
}
