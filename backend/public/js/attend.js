console.log("I am from attend");

async function deleteAttendanceSheet(target) {
    const method = new DataCall()
    await method.DEL_UPD(`apiv1/delete-sheet?q=${target.dataset.sheet}`, 'DELETE', undefined, undefined)
}


function showOverlay(id, target) {
    const divId = document.getElementById(id)
    divId.dataset.sheet = target.dataset.att
    divId.dataset.sub = target.dataset.sub
    divId.dataset.mon = target.dataset.mon
    divId.classList.remove('hidden')
    divId.classList.add('flex')
}

function closeOverlay(id, idform) {
    const divId = document.getElementById(id)
    divId.classList.add('hidden')
    divId.classList.remove('flex')
}



async function addMonthEdit(target) {
    const monthRow = document.querySelectorAll('#edit-month')
    const month = []
    monthRow.forEach((el) => {
        if (el.checked) { return month.push(el.value) }
        return;
    })
    if (month.length > 0) {
        const method = new DataCall()
        await method.GET_POST(`apiv1/create-month?q=${target.dataset.sheet}`, 'POST', { month }, undefined)
    } else {
        alert('select atleast one month')
    }

}


function renderSubjectsEdit(arr) {
    const target = document.getElementById('sub-edit-list')
    target.innerHTML = ''
    arr.forEach((sub) => {
        const html = `<div class="flex items-center justify-between mx-5 border-2 p-3 rounded-md">
        <span class="font-semibold">${sub}</span>
        <input id="subject-row-edit" type="checkbox" value="${sub}">
        </div>`
        target.innerHTML += html
    })


}

async function subjectSearchEdit() {
    const dep = document.getElementById('select-dep-edit').value
    const sem = document.getElementById('select-sem-edit').value
    if (dep && sem) {
        const method = new DataCall()
        const data = await method.GET_POST(`apiv1/get-subj?dep=${dep}&sem=${sem}`, 'GET', undefined, undefined)
        renderSubjectsEdit(data)
    } else {
        alert('Please select department and semester')
    }
}

async function EditSubjectUpdate(target) {
    const sheet = document.getElementById('attendance-overlay')
    const method = new DataCall()
    const row = document.querySelectorAll('#subject-row-edit')
    const subjects = []
    const months = sheet.dataset.mon.split(',')
    row.forEach((el) => {
        if (el.checked) { subjects.push(el.value) }
    })
    if (subjects.length > 0) {
        await method.GET_POST(`apiv1/create-subject?q=${target.dataset.sheet}`, 'POST', { subjects, months })
    } else {
        alert('Please select atleast one subject')
    }
}

function checkAllStudentEdit(target) {
    const row = document.querySelectorAll('#student-row-edit')
    row.forEach((el) => {
        el.checked = target.checked ? true : false
    })

}

async function UpdateLateStudent() {
    const method = new DataCall()
    const row = document.querySelectorAll('#student-row-edit')
    const sheet = document.getElementById('attendance-overlay')
    const students = []
    row.forEach((el) => {
        if (el.checked) {
            students.push(el.dataset.stdid)
        }
    })

    const body = {
        students: students,
        months : sheet.dataset.mon.split(','),
        subjects: sheet.dataset.sub.split(',')
    }

    if (students.length > 0) {
       await method.GET_POST(`apiv1/add-students-onedit?q=${sheet.dataset.sheet}`, 'POST', body)
        
    } else {
        alert('Please select atleast one student')
    }
}