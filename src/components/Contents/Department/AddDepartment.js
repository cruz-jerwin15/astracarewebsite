import React from 'react'
import {useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useAddDepartmentsMutation } from '../../../rtk/departmentApi';
function AddDepartment() {
    const [addDepartment] = useAddDepartmentsMutation();
    const [departmentname,setDepartmentName]  = useState('');
    const [description,setDescription]  = useState('');

    const submitDepartment=()=>{
        if(departmentname === '' || description === ''){
            toast.error("Please fill all fields");
            return;
        }
        const department = {
            department_name:departmentname,
            description:description,
            status:'ACTIVE'
        }
        addDepartment(department)
        .unwrap()
        .then((res)=>{
            toast.success("Department added successfully");
            setDepartmentName('');
            setDescription('');
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
  return (
    <>
     <div className="col-md-3">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter department name"
            value={departmentname}
            onChange={(e)=>setDepartmentName(e.target.value)}
            />
                
        </div>
    </div>
     <div className="col-md-6">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter descriptions"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />
                
        </div>
    </div>
    <div className="col-md-3"> 
        <button 
        className="btn btn-primary btn-sm btn-header normal-text"
        onClick={()=>submitDepartment()}
        
        > Add</button>
    </div>
    </>
  )
}

export default AddDepartment