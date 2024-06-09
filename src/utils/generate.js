function generateRandomMember(id) {
  const prefixes = ["นาย", "นาง", "นางสาว"];
  const firstNames = [
    "วรเมธ",
    "อภิชาติ",
    "อารีย์",
    "ธนิต",
    "ณัฐพล",
    "อมรวิชญ์",
    "ประกิต",
    "ปฏิภาณ",
    "สรวิชญ์",
    "ธนกิจ",
    "สุรเดช",
    "ธนากร",
    "กิตติภพ",
    "ธนัท",
    "เบญจมินทร์",
    "อาทิตย์",
    "ศิรวิชญ์",
    "สมบูรณ์",
    "ณัฐนนท์",
    "ชินวัฒน์",
    "ธนพล",
    "สรวิชญ์",
    "ปริญญา",
    "สุรชัย",
    "ชัยพล",
    "พีรวิชญ์",
    "ภควัต",
    "พีรพัฒน์",
    "ณภัทร",
    "ประวีร์",
  ];
  const lastNames = [
    "พลอยเจริญ",
    "รัตนศิริพงษ์",
    "จันทน์เจริญ",
    "สมิทธิ์",
    "อมรธนะกุล",
    "กลิ่นธรรม",
    "ชาตรีพิทักษ์",
    "วงศ์สว่าง",
    "อินทร์ชัย",
    "แสงสว่าง",
    "ทองสุนทร",
    "วงศ์มาลัย",
    "บุญสาว",
    "พิทักษ์",
    "วงศ์วรรณ",
    "จันทร์ทวีป",
    "ช่างชุ่ย",
    "บุญสุข",
    "สุวรรณวาจา",
    "มุสิก",
    "พิมพ์พงศ์",
    "ประกายพงศ์",
    "แสงสว่าง",
    "บุญญานุวงศ์",
    "พานิชนันทกุล",
    "สมบูรณ์วัฒนา",
    "ปัญญาวงศ์",
    "จริยพร",
    "พงษ์สนิทวงศ์",
    "รุ่งโรจน์",
  ];
  const birthYears = Array.from({ length: 20 }, (_, i) => 1990 + i);
  const types = ["income", "expense"];
  const minAmount = 100;
  const maxAmount = 5000;

  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomBirthYear =
    birthYears[Math.floor(Math.random() * birthYears.length)];
  const randomBirthMonth = Math.floor(Math.random() * 12) + 1; // เลขเดือนระหว่าง 1 ถึง 12
  const randomBirthDay = Math.floor(Math.random() * 28) + 1; // เลขวันระหว่าง 1 ถึง 28
  const birthDate = `${randomBirthYear}-${randomBirthMonth
    .toString()
    .padStart(2, "0")}-${randomBirthDay.toString().padStart(2, "0")}`;
  const age = new Date().getFullYear() - randomBirthYear;
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomAmount =
    Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;

  return {
    id: String(id),
    prefix: randomPrefix,
    firstName: randomFirstName,
    lastName: randomLastName,
    birthDate: birthDate,
    profilePicture: "/icon.png",
    age: age,
    lastUpdated: formatDateTimeToDDMMYYYYTime(new Date()),
    type: randomType,
    amount: randomAmount,
  };
}

function formatDateTimeToDDMMYYYYTime(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const sampleMembers = [];
for (let i = 1; i <= 20; i++) {
  const newMember = generateRandomMember(i);
  sampleMembers.push(newMember);
}

export default sampleMembers;
