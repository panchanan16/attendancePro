
function showOverlay(id, idform) {
    const divId = document.getElementById(id)
    const divIdForm = document.getElementById(idform)
    divId.classList.remove('hidden')
    divId.classList.add('flex')
    divIdForm.classList.remove('hidden')
    divIdForm.classList.add('flex')
}

function closeOverlay(id, idform) {
    const divId = document.getElementById(id)
    const divIdForm = document.getElementById(idform)
    divId.classList.add('hidden')
    divId.classList.remove('flex')

    divIdForm.classList.add('hidden')
    divIdForm.classList.remove('flex')
}

function showUpdateForm(id, target) {
    const item = target.parentNode.parentNode.childNodes
    const divId = document.getElementById(id)
    divId.classList.remove('hidden')
    divId.classList.add('flex')
    divId.innerHTML += `<div id="dep-update" class="p-10 flex flex-col justify-center items-center bg-white w-[39%] rounded-lg">
    <button onclick="closeUpdateForm('settings-overlay', 'dep-update')" class="bg-red-100 text-red-600 self-end p-2 rounded-xl flex items-center hover:bg-red-200">
        <span class="material-symbols-outlined inline-block font-bold">close</span>
    </button>

    <form id="dep-update-form" class="flex flex-col gap-10 w-full mt-5">   
        <div>
            <input value="${item[1].childNodes[0].innerHTML}" class="border-2 border-[#1a40db] p-3  w-[98%] rounded-lg" type="text" name="department" id="" placeholder="Enter department Name">
        </div>
        <div>
            <select name="session" class="bg-[#dae8ff] text-[#1a40db] p-3 w-[98%] rounded-lg font-semibold">
                <option value="">Select session</option>
                <option value="1st_3rd_5th" ${item[3].childNodes[0].innerHTML == '1st-3rd-5th' ? 'selected' : ''}>1st 3rd 5th</option>
                <option value="2nd_4th_6th" ${item[3].childNodes[0].innerHTML == '2nd-4th-6th' ? 'selected' : ''}>2nd 4th 6th</option>
            </select>
        </div>
      
        <div>
            <button id="${target.id}" onclick="addOrUpdateDepartment(event, 'apiv1/update-session', this, 'dep-update-form', 'update')" class="bg-[#2254ee] p-3 px-8 rounded-xl font-bold text-white hover:bg-blue-300">
                Submit
            </button>
        </div>
    </form>
</div>`
}

function closeUpdateForm(id, idform) {
    const overlay = document.getElementById(id)
    const item = overlay.querySelector(`#${idform}`)
    overlay.removeChild(item)
    overlay.classList.add('hidden')
    overlay.classList.remove('flex')
}

async function addOrUpdateDepartment(e, url, target, id, type) {
    e.preventDefault()
    const method = new DataCall()
    const formData = new FormData(document.getElementById(id))
    const verify = method.checkFormValid(id)
    if (verify.includes(false)) {
        return alert('please fill up all the input')
    }

    if (type === 'update') {
        formData.append('id', target.id)
        return await method.DEL_UPD(url, 'PUT', formData, 'form')
    }
    await method.GET_POST(url, 'POST', formData, 'form')


}

async function deleteDepartment(target) {
    const method = new DataCall()
    await method.DEL_UPD(`apiv1/delete-session?id=${target.id}`, 'DELETE')
    const item = document.getElementById('dep-box')
    item.removeChild(target.parentNode.parentNode)
}

function renderSubjects(id, arr) {
    const target = document.getElementById(id)
    target.innerHTML = ''
    arr.forEach((sub) => {
        const div = document.createElement('div')
        sub.sub.forEach((name) => {
            const html = `<div class="flex justify-between items-center mx-5 p-2 border-b-2">
            <div><span class="font-semibold">${sub.sem} sem</span></div>
            <div><span class="font-semibold">${name}</span></div>
            <div><span class="material-symbols-outlined text-red-600 hover:text-red-300">delete</span>
            </div>
            </div>`    
            div.innerHTML += html
        })
        target.appendChild(div)
    })
}

async function getSubjects(dep, target) {
    const method = new DataCall()
    const data = await method.GET_POST(`apiv1/get-subj-by-dep?dep=${dep ? dep : target.value}`, 'GET')
    renderSubjects('sub-box', data)
}