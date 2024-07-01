export default function getLayoutRooms (adt: number, chd: number[], pet: string[]) {
    let adultSting =
    adt < 10
      ? "\n0" + adt + " ADT"
      : adt !== 0
      ? "\n" + adt + " ADT"
      : "";

  let ageChild = "de (";
  for (let childIndex = 0; childIndex < chd.length; childIndex++) {
    if (childIndex === 0) {
      ageChild += chd[childIndex];
    } else if (childIndex === chd.length - 1) {
      ageChild += ` e ${chd[childIndex]}`;
    } else {
      ageChild += `, ${chd[childIndex]}`;
    }
  }
  ageChild += ") ano(s)";
  let childString =
    chd.length === 0
      ? ""
      : chd.length < 10
      ? "\n0" + chd.length + " CHD " + ageChild
      : "\n" + chd.length + " CHD " + ageChild;

  let carryingPet = " de (";
  for (let petIndex = 0; petIndex < pet.length; petIndex++) {
    if (petIndex === 0) {
      carryingPet += pet[petIndex];
    } else if (petIndex === pet.length) {
      carryingPet += ` e ${pet[petIndex]}`;
    } else {
      carryingPet += `, ${pet[petIndex]}`;
    }
  }
  carryingPet += ") porte";

  let petString =
    pet.length === 0
      ? ""
      : pet.length < 10
      ? "\n0" + pet.length + " PET" + carryingPet
      : "\n" + pet.length + " PET" + carryingPet;


      
  return adultSting + childString + petString;
}