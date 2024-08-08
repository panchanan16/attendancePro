
async function getAttendanceData(arg, target) {
    const type = arg ? arg : target.value
    const sem = document.getElementById('get-sem').value
    const dept = window.location.href.toLowerCase();
    const method = new DataCall()
    const data = await method.GET_POST(`apiv1/${type == 'month' ? 'get-Attendance-by-month' : 'get-Attendance-by-subject'}?q=${dept.split("/").pop()}_${sem ? sem : '1st'}_2024`, 'GET')
    if (data.length > 0) {
        const headerParam = ['rollno', 'name', ...data[0].attendanceData, 'total', 'percent %']
        renderHeaderItem(headerParam, 'table-heading')
        document.getElementById('table-body-data').innerHTML = ''
        data.forEach((item) => {
            let totalPresent = 0; let totalClass = 0; let percent = 0;
            item.attendanceData.forEach((mondata) => {
                totalPresent += mondata.ptotal
                totalClass += mondata.ptotal + mondata.atotal
            })
            percent = (totalPresent / totalClass) * 100
            renderBodyItem([item.rollno, item.name, ...item.attendanceData, totalPresent, `${percent.toFixed(2)}%`], item.id)
        })
    } else { document.getElementById('table-body-data').innerHTML = '' }

}

async function renderHeaderItem(arr, tableId) {
    const center = document.getElementById(tableId)
    center.innerHTML = ''
    arr.forEach(item => {
        const html = `<th class="${item && item == 'name' ? 'length10' : 'length8'} sticky top-0 bg-[#eff5ff] p-[1rem] border-collapse text-left rounded-lg border-[1px] border-black">${item.name ? item.name + ' | ' : item} ${item.ptotal || item.atotal ? + item.ptotal + item.atotal : ''}</th>`
        center.innerHTML += html
    });
}

async function renderBodyItem(arr, id) {
    const center = document.getElementById('table-body-data')
    let tr = document.createElement('tr')
    tr.setAttribute('data-studid', id)
    arr.forEach((item, ind) => {
        const td = document.createElement('td')
        td.setAttribute('class', 'hover p-[1rem] border-collapse text-left rounded-lg border-[1px] border-black')
        ind == 1 && td.setAttribute('onclick', 'openAndSetDatesBox(this)')
        td.innerHTML = typeof item == 'object' ? item.ptotal : item
        tr.appendChild(td)
    });
    const trString = tr.outerHTML
    center.innerHTML += trString
}

function openAndSetDatesBox(target) {
    const overlay = document.getElementById('student-overlay')
    overlay.classList.remove('hidden')
    overlay.classList.add('flex')
    document.getElementById('get-date-month').dataset.stdid = target.parentNode.dataset.studid
    getDataForEachStudent(target.parentNode.dataset.studid)
}

async function getDataForEachStudent(stid, month) {
    const sem = document.getElementById('get-sem').value;
    const dep = window.location.href.split('/').pop().toLowerCase();
    const method = new DataCall()
    const data = await method.GET_POST(`apiv1/get-dateof-attendance-per-student?q=${dep}_${sem ? sem : '1st'}_${new Date().getFullYear()}&id=${stid}&month=${month ? month : new Date().toLocaleString('default', {month: 'short'})}`, 'GET')
    const headingArray = data.sendData.attendanceData.map((el) => (el.sub))
    renderHeaderItem(headingArray, 'table-heading-for-dates')
    renderDatesPerStudents(data.sendData.attendanceData)
    document.getElementById('st-name').innerHTML = data.sendData.studentData[0].name
    document.getElementById('st-roll').innerHTML = data.sendData.studentData[0].rollno
}

function closeOverlay(params) {
    document.getElementById(params).classList.add('hidden')
}

function renderDatesPerStudents(dateArray) {
    let tr = document.createElement('tr')
    dateArray.forEach((el) => {
        const presentDatesArr = el.month.date
        const td = document.createElement('td')
        td.setAttribute('class', 'hover p-[1rem] border-collapse text-left rounded-lg border-[1px] border-black')
        const tdDiv = document.createElement('div')
        tdDiv.setAttribute('class', 'flex flex-col h-[80vh] justify-start')
        presentDatesArr.forEach((elem) => {
            if (elem != '0') { tdDiv.innerHTML += `<span class="inline-block">${elem}</span>`}
        })
        const tdDivString = tdDiv.outerHTML
        td.innerHTML += tdDivString
        tr.appendChild(td)
    })
    const center = document.getElementById('table-body-data-for-dates')
    const trString = tr.outerHTML
    center.innerHTML = trString
}

function changeMonthToViewDate(mon)  {
   mon.value? getDataForEachStudent(mon.dataset.stdid, mon.value) : alert('select a valid month')
}

