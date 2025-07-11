PK     J�ZN���^  ^     StudentDashboard.jsximport React from "react";

const StudentDashboard = ({ student }) => {
  const { name, profile, dashboard } = student;

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-300 p-8 font-raleway text-white">
      <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {name || "Student"} 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-xl">
            <h2 className="font-semibold text-lg mb-2">Your Profile</h2>
            <p><strong>Grade:</strong> {profile.grade || "Not set"}</p>
            <p><strong>School:</strong> {profile.school || "Not set"}</p>
            <p><strong>District:</strong> {profile.district || "Not set"}</p>
            <p><strong>Career Interests:</strong> {profile.careerInterest?.join(", ") || "None yet"}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            <h2 className="font-semibold text-lg mb-2">Dashboard Progress</h2>
            <p><strong>Next Step:</strong> {dashboard.nextStep}</p>
            <p><strong>Completed Steps:</strong></p>
            <ul className="list-disc list-inside">
              {dashboard.completedSteps?.length > 0 ? (
                dashboard.completedSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))
              ) : (
                <li>None yet</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;PK     J�Z�(��  �     App.jsximport React from "react";
import StudentDashboard from "./StudentDashboard";

const mockStudent = {
  userId: "1234-5678-9012",
  name: "Student Name",
  profile: {
    grade: "11",
    school: "Kennedy High",
    district: "LAUSD",
    careerInterest: ["Nursing"]
  },
  dashboard: {
    completedSteps: ["signup"],
    nextStep: "career-assessment"
  }
};

function App() {
  return <StudentDashboard student={mockStudent} />;
}

export default App;PK     J�ZN���^  ^             ��    StudentDashboard.jsxPK     J�Z�(��  �             ���  App.jsxPK      w   y    