function openMonthBox(mainid) {
    const sheet = document.getElementById('attendance-overlay')
    const center = document.getElementById(mainid)
    center.innerHTML = ''
    const html = `<div class="flex flex-col items-center">
        <div>
            <h2 class="font-bold text-xl">Add months from here</h2>
        </div>
        <div class="department h-[20rem] w-[20rem] overflow-y-scroll mt-5 border-2 rounded-lg p-3">
                <div class="flex justify-between mt-2 items-center border-b-2 p-2">
                    <span class="font-semibold">Jan</span>
                    <input type="checkbox" value="Jan" name="" id="edit-month">
                </div>
                <div class="flex justify-between mt-2 items-center border-b-2 p-2">
                    <span class="font-semibold">Feb</span>
                    <input type="checkbox" value="Feb" name="" id="edit-month">
                </div>
                <div class="flex justify-between mt-2 items-center border-b-2 p-2">
                    <span class="font-semibold">Mar</span>
                    <input type="checkbox" value="Mar" name=""  id="edit-month">
                </div>
                <div class="flex justify-between mt-2 items-center border-b-2 p-2">
                    <span class="font-semibold">Apr</span>
                    <input type="checkbox" value="Apr" name="" id="edit-month">
                </div>
                <div class="flex justify-between mt-2 items-center border-b-2 p-2">
                    <span class="font-semibold">May</span>
                    <input type="checkbox" value="May" name="" id="edit-month">
                </div>
        </div>

        <div class="mt-5">
        <button onclick="addMonthEdit(this)" data-sheet="${sheet.dataset.sheet}" class="hover:bg-[#c2d9ff] flex items-center justify-center p-2 border-2 bg-[#2254ee] text-white font-bold rounded-lg w-[10rem]">Update</button>
        </div>

    </div>`

    center.innerHTML = html;
}

async function openSubjectBox(mainid) {
    const sheet = document.getElementById('attendance-overlay')
    const center = document.getElementById(mainid)
    center.innerHTML = ''
    const html = `<div class="flex flex-col items-center justify-center gap-5 border-2 rounded-lg p-3">
    <div>
        <h1 class="text-xl font-bold">Add Subject here</h1>
    </div>
    <div>
        <div class="flex gap-5 items-center justify-center">
            <div>
                <select id="select-dep-edit"
                    class="bg-[#dae8ff] p-2 text-[#2254ee] rounded-lg font-semibold">
                    <option value="">select department</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BCOM">BCOM</option>
                    <option value="BSC">BSC</option>
                </select>
            </div>
            <div>
                <select id="select-sem-edit"
                    class="bg-[#dae8ff] p-2 text-[#2254ee] rounded-lg font-semibold">
                    <option value="">select semester</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                </select>
            </div>
            <div onclick="subjectSearchEdit()">
                <a class="bg-[#dae8ff] p-2 rounded-xl px-4 flex items-center">
                    <span
                        class="material-symbols-outlined font-bold text-[#2254ee]">search</span>
                </a>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center">
        <div id="sub-edit-list" class="h-[18rem] pb-5 flex flex-col gap-5 w-[30rem] overflow-y-scroll department">
            
        </div>
        <button onclick="EditSubjectUpdate(this)" data-sheet="${sheet.dataset.sheet}" class="hover:bg-blue-300 mt-5 p-2 px-5 rounded-lg text-white font-semibold bg-[#2254ee]">Update</button>
    </div>
</div>`
    center.innerHTML = html;
}

async function openStudentBox(mainid) {
    const sheet = document.getElementById('attendance-overlay')
    const center = document.getElementById(mainid)
    center.innerHTML = ''

    const html = `<diV class="flex flex-col items-center">
    <div class="mt-2 flex items-center">
        <h2 class="text-xl font-bold">Add students from here</h2>
        <div class="flex gap-2 items-center ml-10">
            <span class="text-lg font-semibold">Select All</span>
            <input type="checkbox" onchange="checkAllStudentEdit(this)" name="" id="">
        </div>
    </div>
    <div class="department table-body mt-6 mx-10 h-[25rem] overflow-y-scroll">
        <table class="p-[1rem] border-collapse text-left w-[60vw]">
            <thead class="sticky top-0 left-0 bg-[#eff5ff] rounded-2xl">
                <tr>
                    <th class="p-[1rem] border-collapse text-left">rollno.</th>
                    <th class="p-[1rem] border-collapse text-left">name</th>
                    <th class="p-[1rem] border-collapse text-left">department</th>             
                    <th class="p-[1rem] border-collapse text-left">year</th>
                </tr>
            </thead>
            <tbody id="edit-student-list" class="h-[28rem] overflow-y-scroll">
             
                <tr>
                    <td class="p-[1rem] border-collapse text-left">kjgrhf</td>
                    <td class="p-[1rem] border-collapse text-left" id="">igrigrb</td>
                    <td class="p-[1rem] border-collapse text-left">BCA</td>
                    <td class="p-[1rem] border-collapse text-left">1st sem</td>
                    <td class="p-[1rem] border-collapse text-left flex items-center gap-3">
                        <span>2023</span> <input type="checkbox" name="" id="student-row-edit"></td>
                </tr>
              
            </tbody>
        </table>
    </div>

    <div class="mt-5">
        <button
            class="hover:bg-blue-300 mt-5 p-2 px-5 rounded-lg text-white font-semibold bg-[#2254ee]" onclick="UpdateLateStudent()">Update</button>
    </div>
</diV>`
    center.innerHTML = html;

    const method = new DataCall()
    const param = sheet.dataset.sheet.split('_')
    const sem = getSemester(param[1])
    const data = await method.GET_POST(`apiv1/get-student-with-filter?dep=${param[0].toUpperCase()}&sem=${sem}`, 'GET')
    if (data.length > 0) {
        document.getElementById('edit-student-list').innerHTML = ""
        data.forEach(stud => {
            const tr = `<tr>
        <td class="p-[1rem] border-collapse text-left">${stud.rollno}</td>
        <td class="p-[1rem] border-collapse text-left" id="">${stud.name}</td>
        <td class="p-[1rem] border-collapse text-left">${stud.department}</td>      
        <td class="p-[1rem] border-collapse text-left flex items-center gap-3">
            <span>${stud.year}</span> <input type="checkbox" data-stdid="${stud._id}" name="" id="student-row-edit"></td>
        </tr>`
            document.getElementById('edit-student-list').innerHTML += tr
        });
    }
}

function openShowSubjectBox(mainid) {
    const sheet = document.getElementById('attendance-overlay')
    const center = document.getElementById(mainid)
    center.innerHTML = ''
    const html = `<div class="flex flex-col items-center">
        <div>
            <h2 class="font-bold text-xl">Subjects added</h2>
        </div>
        <div class="department h-[20rem] w-[20rem] overflow-y-scroll mt-5 border-2 rounded-lg p-3" id="show-subject-list">
                
        </div>
    </div>`
    center.innerHTML = html;
    // render subjects--
    const subjects = sheet.dataset.sub.split(',')
    subjects.forEach(subject => {
        const subBox = `<div class="flex justify-between mt-2 items-center border-b-2 p-2">
        <span class="font-semibold">${subject}</span>
        </div>`
        document.getElementById('show-subject-list').innerHTML += subBox
    })
}


async function showStudentList(mainid) {
    const center = document.getElementById(mainid)
    center.innerHTML = ''

    const html = `<diV class="flex flex-col items-center">
    <div class="mt-2 flex items-center">
        <h2 class="text-xl font-bold">Add students from here</h2>
    </div>
    <div class="department table-body mt-6 mx-10 h-[25rem] overflow-y-scroll">
        <table class="p-[1rem] border-collapse text-left w-[60vw]">
            <thead class="sticky top-0 left-0 bg-[#eff5ff] rounded-2xl">
                <tr>
                    <th class="p-[1rem] border-collapse text-left">rollno.</th>
                    <th class="p-[1rem] border-collapse text-left">name</th>
                    <th class="p-[1rem] border-collapse text-left">department</th>
                    <th class="p-[1rem] border-collapse text-left">semester</th>
                    <th class="p-[1rem] border-collapse text-left">year</th>
                </tr>
            </thead>
            <tbody id="show-sheet-students" class="h-[28rem] overflow-y-scroll">
             
                <tr>
                    <td class="p-[1rem] border-collapse text-left">kjgrhf</td>
                    <td class="p-[1rem] border-collapse text-left" id="">igrigrb</td>
                    <td class="p-[1rem] border-collapse text-left">BCA</td>
                    <td class="p-[1rem] border-collapse text-left">1st sem</td>
                    <td class="p-[1rem] border-collapse text-left flex items-center gap-3">
                        <span>2023</span>
                    </td>
                </tr>
              
            </tbody>
        </table>
    </div>

</diV>`
    center.innerHTML = html;

    const method = new DataCall()
    const sheet = document.getElementById('attendance-overlay')
    const param = sheet.dataset.sheet.split('_')
    const data = await method.GET_POST(`apiv1/get-studentlist-persheet?q=${param[0].toUpperCase()}_${param[1]}_2024`, 'GET')
    if ( data.response.length > 0) {
        document.getElementById('show-sheet-students').innerHTML = ""
        data.response.forEach(stud => {
            const tr = `<tr>
                <td class="p-[1rem] border-collapse text-left">${stud.studentsData[0].rollno}</td>
                <td class="p-[1rem] border-collapse text-left" id="">${stud.studentsData[0].name}</td>
                <td class="p-[1rem] border-collapse text-left">BCA</td>
                <td class="p-[1rem] border-collapse text-left">1st sem</td>
                <td class="p-[1rem] border-collapse text-left flex items-center gap-3">
                    <span>2023</span></td>
                </tr>`
            document.getElementById('show-sheet-students').innerHTML += tr
        });
    }
}

