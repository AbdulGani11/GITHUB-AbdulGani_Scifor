let studentList = [];
let editingIndex = -1;

window.onload = function () {
    loadData();
};

async function loadData() {
    try {
        // Step A: Requesting the dummy data
        let response = await fetch('https://jsonplaceholder.typicode.com/users');

        // Step B: Converting text to JSON object
        let data = await response.json();

        // Step C: Mapping the API data to my format
        studentList = data.map(user => ({
            name: user.name,
            email: user.email,
            course: user.website,
            mobile: user.phone
        }));

        // Step D: Updating the UI
        showTable();

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function addOrUpdateStudent(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let course = document.getElementById("course").value;
    let mobile = document.getElementById("mobile").value;

    let student = {
        name: name,
        email: email,
        course: course,
        mobile: mobile,
    };

    if (editingIndex === -1) {
        studentList.push(student);
    } else {
        studentList[editingIndex] = student;
        editingIndex = -1;
        document.getElementById("btn").innerText = "Add Student";
    }

    showTable();
    document.getElementById("form").reset();
}

function showTable() {
    let tableBody = document.getElementById("list");
    let allRows = "";

    studentList.forEach(function (student, index) {
        allRows += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.mobile}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = allRows;
}

function deleteStudent(index) {
    studentList.splice(index, 1);
    showTable();
}

function editStudent(index) {
    let student = studentList[index];

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("mobile").value = student.mobile;

    editingIndex = index;

    document.getElementById("btn").innerText = "Update Student";
}