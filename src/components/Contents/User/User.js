'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import AddBuilding from '../Building/AddBuilding'
import UpdateBuilding from '../Building/UpdateBuilding'
import { useGetUsersQuery } from '../../../rtk/userApi';
import dateOnly from '../../../utils/getDate'
import { toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useUpdateUsersStatusMutation } from '../../../rtk/userApi';

function User() {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [process,setProcess] =useState('IDLE');
    const [searchby,setSearchBy] =useState('lastname');
    const [search,setSearch] =useState('');
    const [row,setRow] = useState(5);
    const [startrow,setStartRow] = useState(0);
    const [deptid,setDeptId] = useState(0);
    const {data:users,isLoading,isError,isSuccess,error} = useGetUsersQuery();
    const [updateUserStatus] = useUpdateUsersStatusMutation();
  

    const searchUser=()=>{
        if (!users) return;

        let results = users;
    
        if (searchby == 'lastname') {
            console.log('searching by lastname');
            results = users.filter(user =>
                user.lastname.toLowerCase().includes(search.toLowerCase())
            );
        }else if (searchby == 'firstname') {
            results = users.filter(user =>
                user.firstname.toLowerCase().includes(search.toLowerCase())
            );
        }else if (searchby == 'date') {
            results = users.filter(user =>
                dateOnly(user.date_added).includes(search)
            );
        }else if (searchby == 'status') {
            results = users.filter(user =>
                user.status.toLowerCase().includes(search.toLowerCase())
            );
        }else{
            results = users.filter(user =>
                user.role.toLowerCase().includes(search.toLowerCase())
            );
            
        }
        console.log("Results",results)
        setFilteredUsers(results);
        setStartRow(0);
        setRow(5); // Reset pagination
    } 
    
    const getRemoveUserId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Remove User</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to remove this user from Active status?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-danger normal-text"
                        onClick={() => {
                            submitUserStatus(id,'REMOVED')
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
    const getStudentUserId=(id)=>{
        const singleUser = users.find(u => u.id === id);
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ width:"400px",padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Student Information</h1>
                    <div className="text-secondary d-flex justify-content-between align-items-center mb-3">
                       <div style={{width:"40%"}}>
                        <p className="normal-text">Student ID</p>
                        <p className="normal-text">Full Name</p>
                        <p className="normal-text">Email</p>
                        <p className="normal-text">Phone</p>
                        <p className="normal-text">Department</p>
                        <p className="normal-text">Year</p>
                        <p className="normal-text">Course</p>
                        <p className="normal-text">Section</p>
                        <p className="normal-text">Date Registered</p>
                       </div>
                       <div style={{width:"60%"}}>
                      
                        <p className="normal-text">: {singleUser.stud_emp_id}</p>
                        <p className="normal-text">: {`${singleUser.lastname}, ${singleUser.firstname} ${singleUser.middlename}`}</p>
                        <p className="normal-text">: {singleUser.email}</p>
                        <p className="normal-text">: {singleUser.phone}</p>
                        <p className="normal-text">: {singleUser.department_name}</p>
                        <p className="normal-text">: {singleUser.yearlevel}</p>
                        <p className="normal-text">: {singleUser.course_name}</p>
                        <p className="normal-text">: {singleUser.section_name}</p>
                        <p className="normal-text">: {dateOnly(singleUser.date_added)}</p>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                      
                    </div>
                    
                  </div>
                );
              }
          });
        
    }
    const getEmployeeUserId=(id)=>{
        const singleUser = users.find(u => u.id === id);
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ width:"400px",padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Student Information</h1>
                    <div className="text-secondary d-flex justify-content-between align-items-center mb-3">
                       <div style={{width:"40%"}}>
                        <p className="normal-text">Employee ID</p>
                        <p className="normal-text">Full Name</p>
                        <p className="normal-text">Email</p>
                        <p className="normal-text">Phone</p>
                        <p className="normal-text">Department</p>
                        <p className="normal-text">Date Registered</p>
                       </div>
                       <div style={{width:"60%"}}>
                      
                        <p className="normal-text">: {singleUser.stud_emp_id}</p>
                        <p className="normal-text">: {`${singleUser.lastname}, ${singleUser.firstname} ${singleUser.middlename}`}</p>
                        <p className="normal-text">: {singleUser.email}</p>
                        <p className="normal-text">: {singleUser.phone}</p>
                        <p className="normal-text">: {singleUser.department_name}</p>
                        <p className="normal-text">: {dateOnly(singleUser.date_added)}</p>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                      
                    </div>
                    
                  </div>
                );
              }
          });
        
    }
    const getApproveUserId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Approve New User</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to approve this user?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-info normal-text"
                        onClick={() => {
                            submitUserStatus(id,'ACTIVE')
                            onClose();
                        }}
                        >
                        Approve
                        </button>
                    </div>
                    
                  </div>
                );
              }
          });
        
    }
    const submitUserStatus=(id,status)=>{
        const newuser = {
            id:id,
            status:status
        }
        updateUserStatus(newuser)
        .unwrap()
        .then((res)=>{
            if(status=='ACTIVE'){
                toast.success("New user successfully approved");
            }else{
                toast.success("User removed successfully");
            }
            
                    
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
    
    const getBuildingId =(id)=>{
        setProcess('UPDATE')
        console.log(id)
        setDeptId(id)
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
   
    if(filteredUsers){
        let len = Math.ceil(filteredUsers.length / 5);
        var pageArray = [];
        for (var i = 0; i < len; i++) {
            pageArray.push(i);
        }
    }
   
 
   
    useEffect(() => {
        console.log("Start Row",row)
    },[startrow]);
    useEffect(() => {
        if (users) {
            setFilteredUsers(users);
        }
    }, [users]);
  return (
    <>
<div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
        <h6 className="m-0 font-weight-bold text-primary header-text">Users / List of Users
           
               
              
        </h6>
       
       
    </div>
  
    <div className="card-body">
    <div className="container">
        <div className="row" >

       
                <div className="col-md-3">
                    <div className="form-group">
                    
                        <select 
                        onChange={(e)=>setSearchBy(e.target.value)}
                        value={searchby}
                        className="form-control normal-text" >
                        <option value="lastname"> Search by Lastname</option>
                        <option value="firstname">Search by Firstname</option>
                        <option value="role">Search by Role</option>
                        <option value="date">Search by Date Registered</option>
                        <option value="status">Search by Status</option>
                    
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
                onClick={()=>searchUser()}
                className="btn btn-primary btn-sm btn-header normal-text"
                > Search</button>
                <button
                onClick={() => {
                    setFilteredUsers(users);
                    setSearch('');
                    setStartRow(0);
                    setRow(5);
                }}
                className="btn btn-secondary btn-sm btn-header normal-text ml-2"
            >
                Reset
            </button>
        </div>
       
          

           
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
                        <th>Name</th>
                        <th>Role</th>
                        <th>Date Registered</th>
                        <th>Status</th>
                        <th>Action</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((item, index) => (
                            index>=startrow && index<row ?
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{`${item.lastname}, ${item.firstname}`}</td>
                                <td>{item.role.toUpperCase()}</td>
                                <td>{dateOnly(item.date_added)}</td>
                                <td>{item.status}</td>
                                <td className="d-flex justify-content-center" style={style}>
                                    
                                    {


                                        item.role=="admin" ?
                                            item.status=="ACTIVE" ?
                                                <button 
                                                className="btn btn-danger btn-sm"
                                                disabled={true}
                                                >
                                                    <i className="fas fa-fw fa-trash"></i>
                                                </button>
                                            :
                                                <button 
                                                className="btn btn-primary btn-sm"
                                                disabled={true}
                                                >
                                                    <i className="fas fa-fw fa-check"></i>
                                                </button>
                                        :
                                            
                                            
                                            item.status=="ACTIVE" ?
                                                item.role=="student" ?
                                                    <>
                                                        <button 
                                                        className="btn btn-info btn-sm"
                                                        onClick={()=>getStudentUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-info"></i>
                                                        </button>
                                                        <button 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={()=>getRemoveUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-trash"></i>
                                                        </button>
                                                    </>
                                                :
                                                    <>
                                                        <button 
                                                        className="btn btn-info btn-sm"
                                                        onClick={()=>getEmployeeUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-info"></i>
                                                        </button>
                                                        <button 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={()=>getRemoveUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-trash"></i>
                                                        </button>
                                                    </>
                                            
                                            :
                                                item.role=="student" ?
                                                    <>
                                                        <button 
                                                        className="btn btn-info btn-sm"
                                                        onClick={()=>getStudentUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-info"></i>
                                                        </button>
                                                        <button 
                                                        className="btn btn-primary btn-sm"
                                                        onClick={()=>getApproveUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-check"></i>
                                                        </button>
                                                    </>
                                                :
                                                    <>
                                                        <button 
                                                        className="btn btn-info btn-sm"
                                                        onClick={()=>getEmployeeUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-info"></i>
                                                        </button>
                                                        <button 
                                                        className="btn btn-primary btn-sm"
                                                        onClick={()=>getApproveUserId(item.id)}
                                                        >
                                                            <i className="fas fa-fw fa-check"></i>
                                                        </button>
                                                    </>
                                                    
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
                        filteredUsers ?
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
                        disabled={startrow+5 >= filteredUsers.length}
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

export default User