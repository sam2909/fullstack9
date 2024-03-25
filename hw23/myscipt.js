const students = ["Nguyễn Văn A", "Trần Thị B", "Lê Thị C", "Bùi Văn D"];

var stuUl = document.getElementById("students");


stuUl.innerHTML = students.map(s => `<li>${s}</li>`).join(" ")