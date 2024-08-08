console.log("from add stud");

function renderStudentsList(students) {
    if (students.length > 0) {
        document.getElementById('students-list').innerHTML = ""
        students.forEach((stud)=> {
            const tableRow = `<tr id="student-row">
            <td class="p-[1rem] border-collapse text-left">${stud.rollno}</td>
            <td class="p-[1rem] border-collapse text-left">${stud.name}</td>
            <td class="p-[1rem] border-collapse text-left">${stud.department}</td>
            <td class="p-[1rem] border-collapse text-left">${stud.sem} sem</td>
            <td class="p-[1rem] border-collapse text-left flex items-center gap-3">
                <span>${stud.year}</span><input id="select-student" data-stdid="${stud._id}" type="checkbox" name=""></td>
        </tr>`
        document.getElementById('students-list').innerHTML += tableRow
        })
    }
}

async function searchStudents(params) {
    const dep = document.getElementById('select-dep').value
    const sem = document.getElementById('select-sem').value
    const year = getSemester(sem)
    if (dep && sem) {
        const method = new DataCall()
        const data = await method.GET_POST(`apiv1/get-student-with-filter?dep=${dep}&sem=${year}`, 'GET', undefined, undefined)
        renderStudentsList(data)
    } else {
        alert('Please select department and semester')
    }
}

function checkAll(target) {
    const row = document.querySelectorAll('#student-row')
    row.forEach((el) => {
        el.querySelector('#select-student').checked = target.checked ? true : false
    })

}

async function proceedStudentList() {
    const url = new URL(window.location.href)
    const sheetName = url.searchParams.get('name')
    const row = document.querySelectorAll('#student-row')
    const students = []
    row.forEach((el) => {
        if (el.querySelector('#select-student').checked) {
            students.push(el.querySelector('#select-student').dataset.stdid)
        }
    })
    if (students.length > 0) {
        const fet = await fetch(`http://localhost:3000/apiv1/add-students-tosheet?q=${sheetName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({students})
        })
        const response = await fet.json()
        if (fet.ok) {
            window.location.href = `http://localhost:3000/attendance/create-attendance/add-subjects?name=${sheetName}`
        }else { alert(response.msg) }
        
    } else {
        alert('Please select atleast one student')
    }
}