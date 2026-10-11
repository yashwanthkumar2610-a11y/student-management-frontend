import axios from "axios"; 
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [editingId, setEditingId] =useState(null);
  useEffect(() => {
  axios.get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    })
    .catch((error) => {
      console.error("Error loading students:", error);
    });
}, []);

    const addStudent = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
  await axios.put(`http://localhost:5000/students/${editingId}`, {
    rollNo,
    name,
    email,
    course,
  });
} else {
  await axios.post("http://localhost:5000/students", {
    rollNo,
    name,
    email,
    course,
  });
}

    alert(
  editingId
    ? "Student updated successfully!"
    : "Student added successfully!"
);

    const response = await axios.get(
      "http://localhost:5000/students"
    );

    setStudents(response.data);
    setRollNo("");
    setName("");
    setEmail("");
    setCourse("");
  } catch (error) {
    console.error(error);
    alert("Failed to add student. Check the backend terminal.");
  }
};
  
  

  const deleteStudent = async (id) => {
  try {
    await
     axios.delete(`http://localhost:5000/students/${id}`);

    const response = await axios.get(
      "http://localhost:5000/students"
    );

    setStudents(response.data);
    alert("Student deleted successfully!");
  } catch (error) {
    console.error("Delete error:", error);
    alert(error.response?.data?.error || error.message);
  }
};
  const editStudent = (student) => {
setRollNo(student.rollNo);

setName(student.name);

setEmail(student.email);

setCourse(student.course);
setEditingId(student.id);
  };
  return (
    <div>
      <h1>Student Management System</h1>

      <h2>Add Student</h2>

      <form onSubmit={addStudent}>
        <input
  type="text"
  placeholder="Roll Number"
  value={rollNo}
  onChange={(e) => setRollNo(e.target.value)}
  required
/>
<input

type="text"

placeholder="Student Name"

value={name}

onChange={(e) =>

setName(e.target.value)}
 required
/>



        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>

      {students.map((student) => (
        <div key={student.id}>
          <p>
  <strong>Roll No:</strong> {student.rollNo}
  <br />
  <strong>Name:</strong> {student.name}
  <br />
  <strong>Email:</strong> {student.email}
  <br />
  <strong>Course:</strong> {student.course}
</p>

          <button onClick={() => editStudent(student)}>
            Edit
          </button>
          <button onClick={() => deleteStudent(student.id)}>
            Delete
            </button>          
        </div>
      ))}
    </div>
  );
}

export default App;