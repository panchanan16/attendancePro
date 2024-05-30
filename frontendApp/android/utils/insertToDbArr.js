

export function insertRecord(actualItem, itemToDbArray, setitemToDbArray) {
    const checkDuplicacy = itemToDbArray.find((item)=> typeof item === 'object' ? item.rollno === actualItem.rollno : item === actualItem)
    if (checkDuplicacy) {
        const index = itemToDbArray.indexOf(checkDuplicacy) 
        itemToDbArray.splice(index, 1)
        setitemToDbArray([...itemToDbArray, actualItem]) 
    } else {
        setitemToDbArray([...itemToDbArray, actualItem])
    }
    return;
}


export function departmentToDb(status, actualItem, itemToDbArray, setitemToDbArray) {
    if (status) {
        const index = itemToDbArray.indexOf(actualItem) 
        index !== -1 && itemToDbArray.splice(index, 1) 
        return;
    } else {
        insertRecord(actualItem, itemToDbArray, setitemToDbArray)
    } 
    return;
   
}