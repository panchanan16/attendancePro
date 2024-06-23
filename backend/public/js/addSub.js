console.log("I am from sub");

function renderSubjectsList(subjects, dep, sem) {
    if (subjects.length > 0) {
        document.getElementById('subject-list').innerHTML = ""
        subjects.forEach((sub) => {
            const tableRow = `<tr id="subject-row">
            <td class="p-[1rem] border-collapse text-left">${sub}</td>
            <td class="p-[1rem] border-collapse text-left">${dep}</td>
            <td class="p-[1rem] border-collapse text-left flex items-center gap-3">
            <span>${sem} sem</span><input type="checkbox" data-sub="${sub}" name="" id="select-subject"></td>
            </tr>`
            document.getElementById('subject-list').innerHTML += tableRow
        })
    }
}

async function searchSubjects() {
    const dep = document.getElementById('select-dep').value
    const sem = document.getElementById('select-sem').value
    if (dep && sem) {
        const method = new DataCall()
        const data = await method.GET_POST(`apiv1/get-subj?dep=${dep}&sem=${sem}`, 'GET', undefined, undefined)
        renderSubjectsList(data, dep, sem)
    } else {
        alert('Please select department and semester')
    }
}


async function proceedSubjectList() {
    const url = new URL(window.location.href)
    const sheetName = url.searchParams.get('name')
    const row = document.querySelectorAll('#subject-row')
    const subjects = []
    row.forEach((el) => {
        if (el.querySelector('#select-subject').checked) {
            subjects.push(el.querySelector('#select-subject').dataset.sub)
        }
    })
    if (subjects.length > 0) {
        const fet = await fetch(`http://localhost:3000/apiv1/create-subject?q=${sheetName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({subjects})
        })
        if (fet.ok) {
            window.location.href = `http://localhost:3000/attendance/create-attendance/add-months?name=${sheetName}`
        }
    } else {
        alert('Please select atleast one subject')
    }
}