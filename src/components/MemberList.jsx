import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
`;

const MemberListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MemberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const EditLink = styled(Link)`
  color: #2196f3;
  text-decoration: none;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ChartLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  margin-left: 10px;
`;

const SearchForm = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SortButton = styled.button`
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #1976d2;
  }
`;

const ResetButton = styled.button`
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  height: 100px;
`;

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [sortedMembers, setSortedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    setMembers(storedMembers);
    setSortedMembers(storedMembers);
  }, []);

  const deleteMember = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
    setSortedMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredMembers = members.filter((member) =>
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setSortedMembers(filteredMembers);
  };

  const sortByAge = () => {
    const sorted = [...sortedMembers].sort((a, b) => a.age - b.age);
    setSortedMembers(sorted);
  };

  const resetToDefault = () => {
    setSortedMembers(members);
  };

  return (
    <Container>
      <Title>รายการ รายรับ/รายจ่าย</Title>
      <StyledLink to="/add">เพิ่ม</StyledLink>
      <ChartLink to="/chart">ข้อมูลรายงาน</ChartLink>
      <SearchForm>
        <SearchInput
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <SortButton onClick={sortByAge}>เรียงลำดับตามอายุ</SortButton>
        <ResetButton onClick={resetToDefault}>รีเซ็ต</ResetButton>
      </SearchForm>
      <MemberListContainer>
        {sortedMembers.map((member) => (
          <MemberItem
            key={member.id}
            style={{
              borderColor: member.type == "income" ? "#4caf50" : "#f44336",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  color: member.type == "income" ? "#4caf50" : "#f44336",
                }}
              >
                {member.type == "income" ? "รายรับ" : "รายจ่าย"} ={" "}
                {member.amount.toLocaleString()} บาท
              </div>
              <InnerContainer>
                <div>
                  <img
                    src={member.profilePicture}
                    width={100}
                    height={"100%"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {member.prefix} {member.firstName} {member.lastName}{" "}
                  </div>
                  <div>
                    วันเกิด :{" "}
                    {new Date(member.birthDate).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                  <div>อายุ : {member.age}</div>
                  <div>ปรับปรุงล่าสุด : {member.lastUpdated}</div>
                </div>
              </InnerContainer>
            </div>
            <div>
              <EditLink to={`/edit/${member.id}`}>Edit</EditLink>
              <DeleteButton onClick={() => deleteMember(member.id)}>
                Delete
              </DeleteButton>
            </div>
          </MemberItem>
        ))}
      </MemberListContainer>
    </Container>
  );
};

export default MemberList;
