### API for verify if the attendance create is valid - POST
http://localhost:3000/apiv1/verify-attendance?q=bca_1sts
{
 "sub" : "Java",
 "date" : "06/06/2024"
}

### API for getting today Attendance per subject - GET
http://localhost:3000/apiv1/get-Attendance-Per-Subject?q=bca_1st&sub=Java



### API for getting overall Attendance per subject - GET
http://localhost:3000/apiv1/getOverall-Attendance-per-sub?q=bca_1st&sub=Java




### API for getting subject per sem of deparment - GET
http://localhost:3000/apiv1/get-subj?dep=BBA&sem=3st



### API for adding subject per sem of deparment - POST
http://localhost:3000/apiv1/add-subj
{
  "department" : "BBA",
  "sem" : "2st",
  "subject" : "GDP" || ["GDP"]
}