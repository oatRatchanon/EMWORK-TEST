import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
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

const MemberAgeChart = () => {
  const [chartData, setChartData] = useState(null);
  const [ageGroupsTable, setAgeGroupsTable] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    const ageGroups = {};

    storedMembers.forEach((member) => {
      const age = member.age;
      ageGroups[age] = (ageGroups[age] || 0) + 1;
    });

    setChartData({
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: "จำนวนสมาชิก",
          data: Object.values(ageGroups),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });

    const ageGroupsArray = Object.entries(ageGroups);
    const tableRows = ageGroupsArray.map(([age, count]) => (
      <tr key={age}>
        <TableCell>{age}</TableCell>
        <TableCell>{count}</TableCell>
      </tr>
    ));
    setAgeGroupsTable(
      <Table>
        <thead>
          <tr>
            <TableHeader>Age</TableHeader>
            <TableHeader>Number of Members</TableHeader>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    );
  }, []);

  return (
    <Container>
      <StyledLink to="/">ย้อนกลับ</StyledLink>
      <h1>กราฟจำนวนสมาชิกตามอายุ</h1>
      <ChartContainer>
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <LoadingMessage>Loading...</LoadingMessage>
        )}
      </ChartContainer>
      <TableContainer>
        <h1>รายงานรายจำนวนสมาชิกตามอายุ</h1> <br />
        {ageGroupsTable ? (
          ageGroupsTable
        ) : (
          <LoadingMessage>Loading...</LoadingMessage>
        )}
      </TableContainer>
    </Container>
  );
};

export default MemberAgeChart;
