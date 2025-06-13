import React from 'react'
import {useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useAddSectionsMutation } from '../../../rtk/sectionApi';
import { useGetCoursesQuery } from '../../../rtk/courseApi';

function AddSection() {
    const [addSection] = useAddSectionsMutation();
    const [sectionname,setSectionName]  = useState('');
    const [courseid,setCourseId]  = useState('0');

     const {data:courses,isLoading,isError,isSuccess,error} = useGetCoursesQuery();

    const submitSection=()=>{
        if(sectionname === '' || courseid === '0'){
            toast.error("Please fill all fields");
            return;
        }
        const section = {
            section_name:sectionname,
            course_id:courseid,
            status:'ACTIVE'
        }
        addSection(section)
        .unwrap()
        .then((res)=>{
            toast.success("Section added successfully");
            setSectionName('');
            setCourseId('0');
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
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
        className="btn btn-primary btn-sm btn-header normal-text"
        onClick={()=>submitSection()}
        
        > Add</button>
    </div>
    </>
  )
}

export default AddSection