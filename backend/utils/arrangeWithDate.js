function ArrangeAttendanceWithDate(rowdata) {
    let respondData = [];

    for (const id in rowdata) {
        respondData.push({ stId : rowdata[id].id, attendance : []});
         for (const mon in rowdata[id].attendance)  {
           // console.log(`${mon}`, status[mon]);
           rowdata[id].attendance[mon].forEach((el) => {
              const key = Object.keys(el)[0] 
              const val = el[key]
            //   respondData.push([{sub: key, class: val.length}])
           // console.log(`${mon} - ${key}`,val.length)
               let p = []
               let a = []
              val.forEach((item)=> {
                   const keyin = Object.keys(item)[0] 
                   const valin = item[keyin]
                   if(valin === 'p') {
                       p.push(valin)
                   } else { a.push(valin) } 
              })
              respondData.forEach((chatro)=>{
                  // chatro.totalClass.push({sub : key, class : val.length})
                  if(chatro.stId === rowdata[id].id) {
                     chatro.attendance.push({month : mon, subject : key, totalClass : val.length, present : p.length, absent : a.length})
                  }
              }) 
           });
         }
     }

     return respondData;
}

module.exports = {ArrangeAttendanceWithDate};