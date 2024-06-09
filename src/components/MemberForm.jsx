import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
`;

const MemberForm = () => {
  const [member, setMember] = useState({
    prefix: "นาย",
    firstName: "",
    lastName: "",
    birthDate: "",
    profilePicture: "",
    type: "income",
    amount: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
      const memberToEdit = storedMembers.find((member) => member.id === id);
      if (memberToEdit) setMember(memberToEdit);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMember((prevMember) => ({
            ...prevMember,
            [name]: reader.result,
          }));
          setImageFile(file);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setMember((prevMember) => ({
        ...prevMember,
        [name]: name === "amount" ? parseFloat(value) : value,
      }));
    }
  };

  function formatDateTimeToDDMMYYYYTime(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    const type = member.type || "income";

    if (id) {
      const updatedMembers = storedMembers.map((storedMember) =>
        storedMember.id === id
          ? {
              ...member,
              lastUpdated: formatDateTimeToDDMMYYYYTime(new Date()),
            }
          : storedMember
      );
      localStorage.setItem("members", JSON.stringify(updatedMembers));
    } else {
      const newMember = {
        ...member,
        id: Date.now().toString(),
        age: calculateAge(new Date(member.birthDate)),
        lastUpdated: formatDateTimeToDDMMYYYYTime(new Date()),
        type: type,
      };
      if (imageFile) {
        newMember.profilePicture = URL.createObjectURL(imageFile);
      }
      storedMembers.push(newMember);
      localStorage.setItem("members", JSON.stringify(storedMembers));
    }

    navigate("/");
  };

  const calculateAge = (birthDate) => {
    const birthYear = birthDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const birthMonth = birthDate.getMonth();
    const currentMonth = new Date().getMonth();
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        new Date().getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  return (
    <Container>
      <StyledLink to="/">ย้อนกลับ</StyledLink>
      <Title>{id ? "แก้ไข" : "เพิ่ม"}รายการ</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          คำนำหน้าชื่อ*
          <Select name="prefix" value={member.prefix} onChange={handleChange}>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </Select>
        </Label>
        <Label>
          ชื่อ*
          <Input
            type="text"
            name="firstName"
            value={member.firstName}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          นามสกุล*
          <Input
            type="text"
            name="lastName"
            value={member.lastName}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          วันเดือนปีเกิด*
          <Input
            type="date"
            name="birthDate"
            value={member.birthDate}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </Label>
        <Label>
          รูปภาพโปรไฟล์{id ? "" : "*"}
          <Input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            required={id ? false : true}
          />
        </Label>
        <Label>
          ประเภท*
          <Select name="type" value={member.type} onChange={handleChange}>
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </Select>
        </Label>
        <Label>
          จำนวน*
          <Input
            type="number"
            name="amount"
            value={member.amount}
            onChange={handleChange}
            required
          />
        </Label>
        <Button type="submit">ยืนยันการ{id ? "แก้ไข" : "เพิ่ม"}</Button>
      </Form>
    </Container>
  );
};

export default MemberForm;
