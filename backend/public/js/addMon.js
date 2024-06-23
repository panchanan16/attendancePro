console.log("i am from month");

async function finalCreateAttendanceSheet() {
    const monthRow = document.querySelectorAll('#month-name')
    const month = []
    monthRow.forEach((el) => {
        if(el.checked) { return month.push(el.dataset.mon) }
        return;
    })
    const url = new URL(window.location.href)
    const sheetName = url.searchParams.get('name')
    const method = new DataCall()
    await method.GET_POST(`apiv1/create-month?q=${sheetName}`, 'POST', {month}, undefined)
}