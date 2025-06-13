'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import AddCourse from '../Course/AddCourse'
import UpdateCourse from '../Course/UpdateCourse'
import { useGetCoursesQuery,useUpdateCoursesStatusMutation } from '../../../rtk/courseApi';
import dateOnly from '../../../utils/getDate'
import { toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 


function Course() {
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [process,setProcess] =useState('IDLE');
    const [searchby,setSearchBy] =useState('name');
    const [search,setSearch] =useState('');
    const [row,setRow] = useState(5);
    const [startrow,setStartRow] = useState(0);
    const [courseid,setCourseId] = useState(0);
    const {data:courses,isLoading,isError,isSuccess,error} = useGetCoursesQuery();
    

     const [updateCourseStatus] = useUpdateCoursesStatusMutation();

    const searchDepartment=()=>{
        if (!courses) return;

        let results = courses;
    
        if (searchby === 'name') {
            results = courses.filter(ress =>
                ress.course_name.toLowerCase().includes(search.toLowerCase())
            );
        } else if (searchby === 'date') {
            results = courses.filter(ress =>
                dateOnly(ress.date_added).includes(search)
            );
        }else if (searchby === 'department') {
            results = courses.filter(ress =>
                ress.department_name.toLowerCase().includes(search.toLowerCase())
            );
        }else{
            results = courses.filter(ress =>
                ress.description.toLowerCase().includes(search.toLowerCase())
            );
            
        }
    
        setFilteredDepartments(results);
        setStartRow(0);
        setRow(5); // Reset pagination
    } 
    
    const getRemoveDepartmentId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Remove Course</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to remove this course from Active status?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-danger normal-text"
                        onClick={() => {
                            submitCourseStatus(id,'REMOVED')
                            onClose();
                        }}
                        >
                        Remove
                        </button>
                    </div>
                    
                  </div>
                );
              }
          });
        
    }
    const getRetrieveDepartmentId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Retrieve Course</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to retrieve this course from Removed status?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-info normal-text"
                        onClick={() => {
                            submitCourseStatus(id,'ACTIVE')
                            onClose();
                        }}
                        >
                        Retrieve
                        </button>
                    </div>
                    
                  </div>
                );
              }
          });
        
    }
    const submitCourseStatus=(id,status)=>{
        const course = {
            id:id,
            status:status
        }
        updateCourseStatus(course)
        .unwrap()
        .then((res)=>{
            if(status=='ACTIVE'){
                toast.success("Course retrieved successfully");
            }else{
                toast.success("Course removed successfully");
            }
            
                    
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
    
    const getCourseId =(id)=>{
        setProcess('UPDATE')
        console.log(id)
        setCourseId(id)
}

    const whatProcess=(p)=>{
        setProcess(p)
    }
   
    const addRows = () => {
            setStartRow(startrow + 5)
            setRow(row + 5)
    }
    const minusRows = () => {
       if(startrow - 5 >= 0){
            setStartRow(startrow - 5)
            setRow(row - 5)
        }
    }
    const gotoPage = (pageNumber) => {
        setRow(pageNumber*5)
        setStartRow(pageNumber*5-5)
        
    }
    const style={
        gap:"1px"
    }
   
    if(filteredDepartments){
        let len = Math.ceil(filteredDepartments.length / 5);
        var pageArray = [];
        for (var i = 0; i < len; i++) {
            pageArray.push(i);
        }
    }
   
 
   
    useEffect(() => {
        console.log("Start Row",row)
    },[startrow]);
    useEffect(() => {
        if (courses) {
            setFilteredDepartments(courses);
        }
    }, [courses]);
  return (
    <>
<div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
        <h6 className="m-0 font-weight-bold text-primary header-text">List of Courses /
            {
                process=='IDLE' ?
                <span className="text-secondary"> Search Course</span>
                :
                process=='ADD' ?
                <span className="text-secondary"> Add Course</span>
                :
                <span className="text-secondary"> Update Course</span>
            }
        </h6>
        {
            process=='IDLE' ?
            <button 
            className="btn btn-primary btn-sm"
            onClick={()=>whatProcess('ADD')}
            >
                <i className="fas fa-fw fa-plus normal-text"></i>
            </button>
            :
            <button 
            className="btn btn-danger btn-sm"
            onClick={()=>whatProcess('IDLE')}
            >
                <i className="fas fa-fw fa-times normal-text"></i>
            </button>
        }
       
    </div>
  
    <div className="card-body">
    <div className="container">
        <div className="row" >

        {
            // Search
            process=='IDLE' ? 
            <>
                <div className="col-md-3">
                    <div className="form-group">
                    
                        <select 
                        onChange={(e)=>setSearchBy(e.target.value)}
                        value={searchby}
                        className="form-control normal-text" >
                        <option value="name"> Search by Name</option>
                        <option value="date">Search by Date Added</option>
                        <option value="department">Search by Department</option>
                        <option value="description">Search by Description</option>
                    
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" 
                        className="form-control normal-text"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                         placeholder="Enter your search" />
                
                    </div>
                </div>
                <div className="col-md-3"> 
            
                <button 
                onClick={()=>searchDepartment()}
                className="btn btn-primary btn-sm btn-header normal-text"
                > Search</button>
                <button
                onClick={() => {
                    setFilteredDepartments(courses);
                    setSearch('');
                    setStartRow(0);
                    setRow(5);
                }}
                className="btn btn-secondary btn-sm btn-header normal-text ml-2"
            >
                Reset
            </button>
                </div>
            </>
            :
            // Adding Data
            process=='ADD' ?
            <AddCourse/>
            :
            // Update
            <UpdateCourse courseid={courseid}/>
        }

           
        </div>
    </div>
    
    
   
    </div>
</div>


<div className="card shadow mb-4">
   
    <div className="card-body">
    {isLoading && <h3 className='normal-text'>Loading data...</h3>}
        {isError && <h3 className='normal-text'>Something went wrong</h3>}
        {isSuccess &&
        <div className="table-responsive">
            
            <table className="table table-bordered normal-text" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Course Name</th>
                        <th>Description</th>
                        <th>Department</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Action</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredDepartments.map((item, index) => (
                            index>=startrow && index<row ?
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.course_name}</td>
                                <td>{item.description}</td>
                                <td>{item.department_name}</td>
                                <td>{dateOnly(item.date_added)}</td>
                                <td>{item.status}</td>
                                <td className="d-flex justify-content-center" style={style}>
                                    <button 
                                    className="btn btn-warning btn-sm"
                                    onClick={()=>getCourseId(item.id)}
                                    >
                                        <i className="fas fa-fw fa-edit"></i>
                                    </button>
                                    {
                                        item.status=="ACTIVE" ?
                                            <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={()=>getRemoveDepartmentId(item.id)}
                                            >
                                                <i className="fas fa-fw fa-trash"></i>
                                            </button>
                                        :
                                        <button 
                                        className="btn btn-info btn-sm"
                                        onClick={()=>getRetrieveDepartmentId(item.id)}
                                        >
                                            <i className="fas fa-fw fa-sync"></i>
                                        </button>
                                    }
                                   
                                </td>
                            </tr>
                            : null
                        ))
                    }
             
                   
                   
                </tbody>
               
            </table>
            <div className="w-100 d-flex justify-content-end border-1">
                <div className="btn-group " role="group" aria-label="Basic example" >
                        {
                        filteredDepartments ?
                        <>
                         <button 
                        type="button" 
                        className="btn btn-primary "
                        onClick={()=>minusRows()}
                        disabled={startrow <= 0}
                         >
                            <i className="fas fa-caret-left normal-text"></i>
                        </button>
                        {
                           pageArray.map((index) => {
                            return(
                                
                                    index + 1==row/5 ? 
                                    <button key={`page-${index}`} type="button" className="btn btn-primary normal-text">{index+1}</button>
                                    :
                                    <button 
                                    key={`page-${index}`} 
                                    type="button" 
                                    onClick={()=>gotoPage(index+1)}
                                    className="btn btn-outline-secondary normal-text">{index+1}</button>
                                
                                
                            )
                           })
                        }
                          <button 
                        type="button" 
                        className="btn btn-primary "
                        onClick={()=>addRows()}
                        disabled={startrow+5 >= filteredDepartments.length}
                        >
                            <i className="fas fa-caret-right normal-text"></i>
                        </button>
                           </>  
                           :null
                        
                          
                        }
                       
                      
                    </div>
                </div>
        </div>
        }
    </div>
</div>



    </>
  )
}

export default Course