import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  Cell
} from 'recharts';
import '../styles/studentProgress.css';

const COLORS = {
  Completed: '#26a69a',
  Remaining: '#0d47a1'
};

const StudentProgressCard = ({ userId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeBar, setActiveBar] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`https://your-api-id.execute-api.us-east-2.amazonaws.com/dev/getStudentProgress?userId=${userId}`);
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [userId]);

  if (loading) return <p>Loading student progress...</p>;
  if (!student) return <p>No student data found.</p>;

  const completedMilestones = student.milestones?.filter(m => m.completed) || [];
  const remainingMilestones = student.milestones?.filter(m => !m.completed) || [];

  const chartData = [
    { name: 'Completed', value: completedMilestones.length },
    { name: 'Remaining', value: remainingMilestones.length }
  ];

  const handleBarClick = (data) => {
    if (activeBar === data.name) {
      setActiveBar(null);
    } else {
      setActiveBar(data.name);
    }
  };

  const getFilteredMilestones = () => {
    if (activeBar === 'Completed') return completedMilestones;
    if (activeBar === 'Remaining') return remainingMilestones;
    return student.milestones;
  };

  return (
    <div className="student-progress-card">
      <h3>Student Progress Overview</h3>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Grade:</strong> {student.grade}</p>
      <p><strong>GPA:</strong> {student.gpa}</p>
      <p><strong>Career Path:</strong> {student.careerPath}</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            onClick={(e) => e && e.activePayload && handleBarClick(e.activePayload[0].payload)}
          >
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Bar dataKey="value" name="Progress">
              <LabelList dataKey="value" position="right" />
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name]}
                  opacity={activeBar && activeBar !== entry.name ? 0.4 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4>
        Milestone Tracker{activeBar ? `: Showing ${activeBar}` : ''}
      </h4>
      <ul className="milestone-list">
        {getFilteredMilestones().map((milestone, index) => (
          <li
            key={index}
            className={milestone.completed ? 'completed' : 'incomplete'}
            title={`Status: ${milestone.completed ? 'Completed' : 'Incomplete'}`}
          >
            {milestone.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentProgressCard;
