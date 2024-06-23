console.log('I am from students');

function showOverlay(id) {
    const divId = document.getElementById(id)
    divId.classList.remove('hidden')
    divId.classList.add('flex')
}

function closeOverlay(id) {
    const divId = document.getElementById(id)
    divId.classList.add('hidden')
    divId.classList.remove('flex')
}

async function addNewStudents(e) {
    e.preventDefault()
    const method = new DataCall()
    const formData = new FormData(document.getElementById('add-student-form'))
    const verify = method.checkFormValid('add-student-form')
    if (verify.includes(false)) {
        alert('please fillup all the input')
    } else {
        await method.GET_POST('apiv1/create-student', 'POST', formData, 'form' )
    }
}