import React from 'react'
import {useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useUpdateSectionsMutation,useGetSectionQuery } from '../../../rtk/sectionApi';
import { useGetCoursesQuery } from '../../../rtk/courseApi';

function UpdateSection(props) {
     const {data} = useGetSectionQuery(props.sectionid);
     const [sectionname,setSectionName]  = useState('');
      const [courseid,setCourseId]  = useState('0');

     const {data:courses,isLoading,isError,isSuccess,error} = useGetCoursesQuery();
      const [updateSection] = useUpdateSectionsMutation();

    const submitSection=()=>{
        if(sectionname === '' || courseid === '0'){
            toast.error("Please fill all fields");
            return;
        }
        const section = {
            id:data.id,
            section_name:sectionname,
            course_id:courseid,
            status:data.status
        }
        updateSection(section)
        .unwrap()
        .then((res)=>{
            toast.success("Section updated successfully");
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
     useEffect(()=>{
            if(data){
            
                setSectionName(data.section_name)
                setCourseId(data.course_id)
            }
        },[data])
  return (
    <>
     <div className="col-md-5">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter section name"
            value={sectionname}
            onChange={(e)=>setSectionName(e.target.value)}
            />
                
        </div>
    </div>
    <div className="col-md-5">
        <div className="form-group">
                    
           

        {isLoading && <h3 className='normal-text'>Loading courses...</h3>}
            {isError && <h3 className='normal-text'>Something went wrong</h3>}
            {isSuccess &&
             <select 
             onChange={(e)=>setCourseId(e.target.value)}
             value={courseid}
             className="form-control normal-text" >
            <option key="chooseCourse" value="0">Choose Course</option>
            {
                 courses.map((item, index) => (
                    item.status=='ACTIVE' ?
                    <option  key={`course-${item.id}`}  value={item.id}>{item.course_name}</option>
                    : null
                ))
            }
            </select>
            }
                    
          
        </div>
    </div>
     
    <div className="col-md-2"> 
        <button 
        className="btn btn-warning btn-sm btn-header normal-text"
        onClick={()=>submitSection()}
        
        > Update</button>
    </div>
    </>
  )
}

export default UpdateSection