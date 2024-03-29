const students = ["Nguyễn Văn A", "Trần Thị B", "Lê Thị C", "Bùi Văn D"]
const studentUl = document.getElementById('students')

let li = document.createElement('li')

studentUl.innerHTML = students.map((st)=>`<li>${st}</li>`).join('')
