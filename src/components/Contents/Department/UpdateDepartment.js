import React,{useState,useEffect} from 'react'
import { useGetDepartmentQuery,useUpdateDepartmentsMutation } from '../../../rtk/departmentApi';
import { toast} from 'react-toastify';
function UpdateDepartment(props) {

    const {data} = useGetDepartmentQuery(props.departmentid);
    const [departmentname,setDepartmentName]  = useState('');
    const [description,setDescription]  = useState('');

    const [updateDepartment] = useUpdateDepartmentsMutation();

    const submitDepartment =()=>{
        if(departmentname === '' || description === ''){
            toast.error("Please fill all fields");
            return;
        }
        const department = {
            id:data.id,
            department_name:departmentname,
            description:description,
            status:data.status
        }
        updateDepartment(department)
        .unwrap()
        .then((res)=>{
            toast.success("Department updated successfully");
            setDepartmentName('');
            setDescription('');
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }

    useEffect(()=>{
        if(data){
            console.log(data)
            setDepartmentName(data.department_name)
            setDescription(data.description)
        }
    },[data])
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
                className="btn btn-warning btn-sm btn-header normal-text"
                onClick={()=>submitDepartment()}
                > Update</button>
            </div>
    </>
  )
}

export default UpdateDepartment