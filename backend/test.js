function processArray(arr, chunkSize) {
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize); 
      console.log(chunk);
    }
  }
  
  const largeArray = [1, 2, 3, 4,5,5,1, 2, 3, 4,5,5,1, 2, 3, 4,5,8,1, 2, 3, 4,5,9,1, 2, 3, 4,5,5,1, 2, 3, 4,5,10]; // Large array
  const chunkSize = 6; 

  processArray(largeArray, chunkSize);

  

  // { 
  //   "students" :  [
  //                 {
  //                     "rollno": "BCA/1ST/01",
  //                     "attendance": []
  //                 },
  //                 {
  //                     "rollno": "BCA/1ST/02",
  //                     "attendance": []
  //                 },
  //                 {
  //                     "rollno": "BCA/1ST/03",
  //                     "attendance": []
  //                 },
  //                 {
  //                     "rollno": "BCA/1ST/04",
  //                     "attendance": []
  //                 }
  //             ]
  // }

//   {
//     "subject" : "randu",
//     "month" : "Jan",
//     "date" : "20/03/2024",
//     "attendance" : [
//        { "rollno" : "BCA/1ST/01", "p": 1, "a": 0},
//        { "rollno" : "BCA/1ST/02", "p": 0, "a": 1},
//        { "rollno" : "BCA/1ST/03", "p": 1, "a": 0},
//        { "rollno" : "BCA/1ST/04", "p": 0, "a": 1}
//     ]
 
//  }

// { }
  