let students = [];

function addStudent() {
    const name = document.getElementById('name').value;
    const sex = document.getElementById('sex').value;
    const subjects = ["english", "maths", "chichewa", "life-skills", "expressive-arts", "social-studies", "agri-science"];
    let marks = [];
    let totalMarks = 0;

    subjects.forEach(subject => {
        const mark = parseInt(document.getElementById(subject).value);
        marks.push(mark);
        totalMarks += mark;
    });

    const remarks = getRemarks(totalMarks);

    const student = {
        name: name,
        sex: sex,
        marks: marks,
        totalMarks: totalMarks,
        remarks: remarks
    };

    students.push(student);
    clearForm();
}

function getRemarks(totalMarks) {
    if (totalMarks < 300) {
        return "Failed";
    } else if (totalMarks <= 350) {
        return "Average";
    } else if (totalMarks <= 400) {
        return "Good";
    } else if (totalMarks <= 500) {
        return "Very Good";
    } else {
        return "Excellent";
    }
}

function finalizeEntries() {
    students.sort((a, b) => b.totalMarks - a.totalMarks); // Sort students by total marks in descending order
    displayStudents();
}

function displayStudents() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.sex}</td>
            <td>${student.marks[0]}</td>
            <td>${student.marks[1]}</td>
            <td>${student.marks[2]}</td>
            <td>${student.marks[3]}</td>
            <td>${student.marks[4]}</td>
            <td>${student.marks[5]}</td>
            <td>${student.marks[6]}</td>
            <td>${student.totalMarks}</td>
            <td>${student.remarks}</td>
        `;
        studentList.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('sex').value = 'Male';
    const subjects = ["english", "maths", "chichewa", "life-skills", "expressive-arts", "social-studies", "agri-science"];
    subjects.forEach(subject => {
        document.getElementById(subject).value = '';
    });
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Position,Name,Sex,English,Maths,Chichewa,Life Skills,Expressive Arts,Social Studies,Agriculture & Science,Total Marks,Remarks\n";

    students.forEach((student, index) => {
        const row = `${index + 1},${student.name},${student.sex},${student.marks[0]},${student.marks[1]},${student.marks[2]},${student.marks[3]},${student.marks[4]},${student.marks[5]},${student.marks[6]},${student.totalMarks},${student.remarks}`;
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    link.click();
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Define table columns with shortened names
    const tableColumn = [
        "Position", "Name", "Sex", 
        "Eng", "Mat", "Chi", 
        "Lif", "Exp", "Sos", 
        "Agr & Sci", "Total", "Rem"
    ];

    const tableRows = [];

    // Populate table rows from student data
    students.forEach((student, index) => {
        const studentData = [
            index + 1,
            student.name,
            student.sex,
            student.marks[0],
            student.marks[1],
            student.marks[2],
            student.marks[3],
            student.marks[4],
            student.marks[5],
            student.marks[6],
            student.totalMarks,
            student.remarks
        ];
        tableRows.push(studentData);
    });

    // Generate the table with autoTable
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        theme: 'grid', // Adding gridlines for table cells
        styles: {
            cellPadding: 3,
            fontSize: 10,
            minCellHeight: 10, // Optional: minimal height for cells
            halign: 'center', // Center-align the text
            cellWidth: 'wrap' // Allow column width to adjust automatically
        },
        headStyles: { fillColor: [22, 160, 133] }, // Optional: header styling
        columnStyles: {
            1: { cellWidth: 'auto' }, // Make 'Name' column width auto-adjustable for long names
        },
        columnStyles: {
            1: { cellWidth: 'auto' },  // Automatically adjust the "Name" column width
        }
    });

    // Save the PDF
    doc.save("students_report.pdf");
}