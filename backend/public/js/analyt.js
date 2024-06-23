console.log("I am analyts");

async function getAttendanceData(arg, target) {
    const type = arg ? arg : target.value
    const method = new DataCall()
    const data = await method.GET_POST(`apiv1/${type == 'month' ? 'get-Attendance-by-month' : 'get-Attendance-by-subject'}?q=bca_1st`, 'GET')
    const headerParam = ['name', 'rollno', ...data[0].attendanceData, 'total', 'percent %']
    renderHeaderItem(headerParam)
    document.getElementById('table-body-data').innerHTML = ''
    data.forEach((item) => {
        let totalPresent = 0; let totalClass = 0; let percent = 0;
        item.attendanceData.forEach((mondata) => {
            totalPresent += mondata.ptotal
            totalClass += mondata.ptotal + mondata.atotal
        })
        percent = (totalPresent / totalClass) * 100
        renderBodyItem([item.rollno, item.name, ...item.attendanceData, totalPresent, `${percent.toFixed(2)}%`])
    })

}

async function renderHeaderItem(arr) {
    const center = document.getElementById('table-heading')
    center.innerHTML = ''
    arr.forEach(item => {
        const html = `<th class="p-[1rem] border-collapse text-left">${item.name ? item.name + ' | ' : item} ${item.ptotal || item.atotal ? + item.ptotal + item.atotal : ''}</th>`
        center.innerHTML += html
    });
}

async function renderBodyItem(arr) {
    const center = document.getElementById('table-body-data')
    let tr = document.createElement('tr')
    arr.forEach(item => {
        const td = document.createElement('td')
        td.setAttribute('class', 'p-[1rem] border-collapse text-left"')
        td.innerHTML = typeof item == 'object' ? item.ptotal : item
        tr.appendChild(td)
    });
    const trString = tr.outerHTML
    center.innerHTML += trString

}
