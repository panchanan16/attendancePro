
function addQueryToURL(target) {
    const dep = document.getElementById('select-dep')
    const sem = document.getElementById('select-sem')
    if(dep.value && sem.value) {
        const url = new URL(window.location.href);
        url.searchParams.delete('name');
        url.searchParams.append('name', `${dep.value}_${sem.value}_${target.value}`);
        // window.location.href = url.toString();
        window.history.pushState(null, '', url.toString())
    } else {
        alert('Please select department and semester')
    }
}

function goToNextPage() {
    const url = new URL(window.location.href);
    if(url.searchParams.get('name')) {
        window.location.href = `http://localhost:3000/attendance/create-attendance/add-students?name=${url.searchParams.get('name')}`;
    } else {
        alert('Please select all the fields...')
    }
}