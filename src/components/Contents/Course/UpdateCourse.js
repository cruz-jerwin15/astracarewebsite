import React from 'react'
import {useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useAddCoursesMutation,useUpdateCoursesMutation,useGetCourseQuery } from '../../../rtk/courseApi';
import { useGetDepartmentsQuery } from '../../../rtk/departmentApi';

function UpdateCourse(props) {
     const {data} = useGetCourseQuery(props.courseid);
    const [addCourse] = useAddCoursesMutation();
    const [coursename,setCourseName]  = useState('');
    const [description,setDescription]  = useState('');
    const [departmentid,setDespartmentId]  = useState('0');

     const {data:departments,isLoading,isError,isSuccess,error} = useGetDepartmentsQuery();
      const [updateCourse] = useUpdateCoursesMutation();

    const submitCourse=()=>{
        if(coursename === '' || description === '' || departmentid === '0'){
            toast.error("Please fill all fields");
            return;
        }
        const course = {
            id:data.id,
            course_name:coursename,
            description:description,
            department_id:departmentid,
            status:data.status
        }
        updateCourse(course)
        .unwrap()
        .then((res)=>{
            toast.success("Course updated successfully");
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
     useEffect(()=>{
            if(data){
                console.log(data)
                setCourseName(data.course_name)
                setDescription(data.description)
                setDespartmentId(data.department_id)
            }
        },[data])
  return (
    <>
     <div className="col-md-3">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter course name"
            value={coursename}
            onChange={(e)=>setCourseName(e.target.value)}
            />
                
        </div>
    </div>
    <div className="col-md-3">
        <div className="form-group">
                    
           

        {isLoading && <h3 className='normal-text'>Loading department...</h3>}
            {isError && <h3 className='normal-text'>Something went wrong</h3>}
            {isSuccess &&
             <select 
             onChange={(e)=>setDespartmentId(e.target.value)}
             value={departmentid}
             className="form-control normal-text" >
            <option key="chooseDepartment" value="0">Choose Department</option>
            {
                 departments.map((item, index) => (
                    item.status=='ACTIVE' ?
                    <option  key={`department-${item.id}`}  value={item.id}>{item.department_name}</option>
                    : null
                ))
            }
            </select>
            }
                    
          
        </div>
    </div>
     <div className="col-md-5">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter course description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />
                
        </div>
    </div>
    <div className="col-md-1"> 
        <button 
        className="btn btn-warning btn-sm btn-header normal-text"
        onClick={()=>submitCourse()}
        
        > Update</button>
    </div>
    </>
  )
}

export default UpdateCourse