
// Load data from LocalStorage on startup
let students = JSON.parse(localStorage.getItem('sms_data')) || [];

function updateUI() {
    const tableBody = document.getElementById('tableBody');
    const stuSelect = document.getElementById('stuSelect');
    
    tableBody.innerHTML = '';
    stuSelect.innerHTML = '<option value="">Select Student</option>';

    students.forEach((s, index) => {
        // Update Table
        let status = s.grade >= 50 ? '<span class="pass">Pass</span>' : '<span class="fail">Fail</span>';
        if(s.grade === null) status = "Pending";

        tableBody.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.grade || 'N/A'}</td>
                <td>${status}</td>
                <td><button onclick="deleteStudent(${index})" style="background:red; padding:5px">X</button></td>
            </tr>
        `;

        // Update Dropdown
        stuSelect.innerHTML += `<option value="${index}">${s.name}</option>`;
    });

    localStorage.setItem('sms_data', JSON.stringify(students));
}

function addStudent() {
    const name = document.getElementById('stuName').value;
    const id = document.getElementById('stuID').value;

    if(name && id) {
        students.push({ name, id, grade: null });
        updateUI();
        document.getElementById('stuName').value = '';
        document.getElementById('stuID').value = '';
    }
}

function submitGrade() {
    const index = document.getElementById('stuSelect').value;
    const grade = document.getElementById('stuGrade').value;

    if(index !== "" && grade !== "") {
        students[index].grade = Number(grade);
        updateUI();
        document.getElementById('stuGrade').value = '';
    }
}

function deleteStudent(index) {
    students.splice(index, 1);
    updateUI();
}

// Initial Render
updateUI();

