To run backend 

cd /Backend
npm start


To run frontend

cd /Frontend
npm start 


Api's to test on the postman 


Register

curl --location 'http://localhost:8000/auth/register' \
--header 'Content-Type: application/json' \
--data '{
  "username": "DivyaNigam",
  "password": "testpassword"
}
'

Login 

curl --location 'http://localhost:8000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
  "username": "DivyaNigam",
  "password": "testpassword"
}
'

Add Events

curl --location 'http://localhost:8000/tasks' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQzLCJpYXQiOjE3MDA1MDUyODcsImV4cCI6MTcwMDUwODg4N30.5M8gMnUoyhfPftkJQ4g89iO-xc93H__gd_wWyVCe284' \
--header 'Content-Type: application/json' \
--data '{
  "title": "hello divyar",
  "date": "2023-11-23"
}
'

Get Events

curl --location 'http://localhost:8000/tasks' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQzLCJpYXQiOjE3MDA0NzIzNzcsImV4cCI6MTcwMDQ3NTk3N30.KBv61USEDA_A5VTMk43NgkMlvVMkgasB-y9ktNTkWso'


Delete Events

curl --location --request DELETE 'http://localhost:8000/tasks/722' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQzLCJpYXQiOjE3MDA0NzIzNzcsImV4cCI6MTcwMDQ3NTk3N30.KBv61USEDA_A5VTMk43NgkMlvVMkgasB-y9ktNTkWso'


Update the done status 

curl --location --request PUT 'http://localhost:6000/tasks/4' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzAwNDIyOTgyLCJleHAiOjE3MDA0MjY1ODJ9.lLGD546MA-7F_45ZCg5WFGOj3Bp7iQ8-uLkWV3tXTJ0' \
--header 'Content-Type: application/json' \
--data '{
  "title": "hello Divya",
  "date": "2023-11-21"
}
'


