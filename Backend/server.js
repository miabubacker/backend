import express from "express";
import dotenv from "dotenv";

const app = express();
 const course=[
  {id:1,name:"html",descrip:"html only"},
  {id:2,name:"css",descrip:"css only"},
  {id:3,name:"js",descrip:"javascript only"},
  {id:4,name:"react",descrip:"react only"}
]
 app.get('/',(req,res)=>{
  res.send('checkup')
 })

 app.get('/api/course',(req,res)=>{
  res.send(course)
 })

 app.get('/api/course/:id',(req,res)=>{
   const filtercourseById= course.find((file)=>file.id=== parseInt(req.params.id))
  if(!filtercourseById){
    return res.status(404).send('course id Is not availbe')
  }
  else{
    res.send(filtercourseById)
  }
})
////////////////////////       post method                       ///////////////////////////////
 app.use(express.json())
 app.post('/api/course',(req,res)=>{
   if(req.body.name.length<3|| !req.body.name){
    return res.status(400).send('please sen valid name')
   }
   else{
   const addcourse={
     id:course.length+1,
     name:req.body.name,
     descrip:req.body.descrip
   }
    course.push(addcourse)
    res.send(course)
  }

 })


 ////////////////  put method ////////////////////////////////////////////////////////////
 app.put('/api/course/:id',(req,res)=>{
  const filtercourseById= course.find((file)=>file.id=== parseInt(req.params.id))
  if(!filtercourseById){
    return res.status(404).send('course id Is not availbe')
  }
  if(req.body.name.length<3|| !req.body.name){
    return res.status(400).send('please sen valid name')
    
   }
   else{
    filtercourseById.name=req.body.name,
    filtercourseById.descrip=req.body.descrip
     res.send(filtercourseById)

   }

 })


 //////////////////   DELETE METHOD ///////////////////////////////

 app.delete('/api/course/:id',(req,res)=>{
   const validate= course.find((data)=>data.id=== parseInt(req.params.id))
    // const removedata= course.filter((data)=>data.id!== parseInt(validate.id))
     if(!validate){
       
       return res.status(404).send('not have that type data')
     }
     else{
      // res.send(removedata)
       const index= course.indexOf(validate)
        course.splice(index,1)
       course.map((data,index)=>{
       data.id=index
      })
        res.send(course)
     }
    

 })

const port=process.env.PORT||4000
 app.listen(port,()=>{console.log(`sever start in ${port}`)})
