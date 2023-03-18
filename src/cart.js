const division1 = document.getElementById("division1");
const district1 = document.getElementById("district1");
const upazila1 = document.getElementById("upazila1");
const union1 = document.getElementById("union1");

const division2 = document.getElementById("division");
const district2 = document.getElementById("district");
const upazila2 = document.getElementById("upazila");
const union2 = document.getElementById("union");

division.forEach((district) => {
  division1.innerHTML += `<option id=${district.id} value=${district.name}>${district.name}</option>`;
});

// =====load district=====

division1.addEventListener("change", function (e) {
  const divisionId = this.options[this.selectedIndex].id;
  district1.innerHTML = `<option value="">-- Select District--</option>`;
  upazila1.innerHTML = `<option value="">-- Select Upazila--</option>`;
  union1.innerHTML = `<option value="">-- Select Union --</option>`;
  district
    .filter((subdistrict) => subdistrict.division_id === divisionId)
    .forEach((subdistrict) => {
      district1.innerHTML += `<option id=${subdistrict.id} value=${subdistrict.name}>${subdistrict.name}</option>`;
    });
});
// =====load upazila=====
district1.addEventListener("change", function (e) {
  const districtId = this.options[this.selectedIndex].id;

  upazila1.innerHTML = `<option value="">-- Select Upazila--</option>`;
  union1.innerHTML = `<option value="">-- Select Union --</option>`;
  upazila
    .filter((upazila) => upazila.district_id === districtId)
    .forEach((upazila) => {
      upazila1.innerHTML += `<option id=${upazila.id} value=${upazila.name}>${upazila.name}</option>`;
    });
});
// =====load union=====
upazila1.addEventListener("change", function (e) {
  const upazilaId = this.options[this.selectedIndex].id;
  union1.innerHTML = `<option value="">-- Select Union --</option>`;
  union
    .filter((union) => union.upazilla_id === upazilaId)
    .forEach((union) => {
      union1.innerHTML += `<option id=${union.id} value=${union.name}>${union.name}</option>`;
    });
});
let checkbox = document.getElementById("check");
checkbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    [division2, district2, upazila2, union2].forEach(
      (x) => (x.disabled = true)
    );
    division2.innerHTML = `<option id=${division1.id} value=${division1.value}>${division1.value}</option>`;
    district2.innerHTML = `<option id=${district1.id} value=${district1.value}>${district1.value}</option>`;
    upazila2.innerHTML = `<option id=${upazila1.id} value=${upazila1.value}>${upazila1.value}</option>`;
    union2.innerHTML = `<option id=${union1.id} value=${union1.value}>${union1.value}</option>`;
  } else if (!e.target.checked) {
    [division2, district2, upazila2, union2].forEach(
      (x) => (x.disabled = false)
    );
    division2.innerHTML = `
      <option value="">-- Select Division --</option>
    `;
    district2.innerHTML = `<option value="">-- Select District --</option>`;
    upazila2.innerHTML = `<option value="">-- Select Upazila --</option>`;
    union2.innerHTML = `<option value="">-- Select Union --</option>`;
    division.forEach((district) => {
      division2.innerHTML += `<option id=${district.id} value=${district.name}>${district.name}</option>`;
    });
  }
});
// ===========buliding=====
division.forEach((district) => {
  division2.innerHTML += `<option id=${district.id} value=${district.name}>${district.name}</option>`;
});

division2.addEventListener("change", function (e) {
  const divisionId = this.options[this.selectedIndex].id;
  district2.innerHTML = `<option value="">-- Select District--</option>`;
  upazila2.innerHTML = `<option value="">-- Select Upazila--</option>`;
  union2.innerHTML = `<option value="">-- Select Union --</option>`;
  district
    .filter((subdistrict) => subdistrict.division_id === divisionId)
    .forEach((subdistrict) => {
      district2.innerHTML += `<option id=${subdistrict.id} value=${subdistrict.name}>${subdistrict.name}</option>`;
    });
});
// =====load upazila=====
district2.addEventListener("change", function (e) {
  const districtId = this.options[this.selectedIndex].id;
  upazila2.innerHTML = `<option value="">-- Select Upazila--</option>`;
  union2.innerHTML = `<option value="">-- Select Union --</option>`;
  upazila
    .filter((upazila) => upazila.district_id === districtId)
    .forEach((upazila) => {
      upazila2.innerHTML += `<option id=${upazila.id} value=${upazila.name}>${upazila.name}</option>`;
    });
});
// =====load union=====
upazila2.addEventListener("change", function (e) {
  const upazilaId = this.options[this.selectedIndex].id;
  union2.innerHTML = `<option value="">-- Select Union --</option>`;
  union
    .filter((union) => union.upazilla_id === upazilaId)
    .forEach((union) => {
      union2.innerHTML += `<option id=${union.id} value=${union.name}>${union.name}</option>`;
    });
});
