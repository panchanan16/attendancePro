### API for verify if the attendance create is valid - POST
http://localhost:3000/apiv1/verify-attendance?q=bca_1sts
{
 "sub" : "Java",
 "date" : "06/06/2024"
}

### API for getting today Attendance per subject - GET
http://localhost:3000/apiv1/get-Attendance-Per-Subject?q=bca_1st&sub=Java&date=07-06-2024



### API for getting overall Attendance per subject - GET
http://localhost:3000/apiv1/getOverall-Attendance-per-sub?q=bca_1st&sub=Java&date=07-06-2024




### API for getting subject per sem of deparment - GET
http://localhost:3000/apiv1/get-subj?dep=BBA&sem=3st



### API for adding subject per sem of deparment - POST
http://localhost:3000/apiv1/add-subj
{
  "department" : "BBA",
  "sem" : "2st",
  "subject" : "GDP" || ["GDP"]
}


### API for adding students to the attendance sheet - POST
http://localhost:3000/apiv1/add-students-tosheet?q=bca_1sts
{
  "months": [
    "jan",
    "feb",
    "march"
  ],
  "subjects": [
    "cpp",
    "java"
  ],
  "students": [
    "663b2f78b30fbbd82956c7c7",
    "663b34a205428e5eeacf86bb",
    "663b3660fd40802b9dcf6db6"
  ]
}



### API for adding attendance to the attendance sheet - POST
http://localhost:3000/apiv1/set-attendance?q=bca_1sts
{
  "lastattendancedate": "09-06-2024",
  "lastatttendent": "dhop manuh",
  "month": "jan",
  "subject": "java",
  "attendance": [
    {
      "rollno": "663b2f78b30fbbd82956c7c7",
      "p": 0,
      "a": 1
    },
    {
      "rollno": "663b34a205428e5eeacf86bb",
      "p": 1,
      "a": 0
    },
    {
      "rollno": "663b3660fd40802b9dcf6db6",
      "p": 0,
      "a": 1
    }
  ]
}

### API for adding new subject to the attendance sheet - POST
http://localhost:3000/apiv1/​create-subject?q=bca_1sts
{
  "subject" : "DSA"
}


### API for adding months to subject in the attendance sheet - POST
http://localhost:3000/apiv1/create-month?q=bca_1sts
{
  "month" : ["feb", "march"]
}