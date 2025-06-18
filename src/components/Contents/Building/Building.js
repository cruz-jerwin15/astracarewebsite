'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import AddBuilding from '../Building/AddBuilding'
import UpdateBuilding from '../Building/UpdateBuilding'
import { useGetBuildingsQuery,useUpdateBuildingsStatusMutation } from '../../../rtk/buildingApi';
import dateOnly from '../../../utils/getDate'
import { toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 


function Building() {
    const [filteredBuildings, setFilteredBuildings] = useState([]);
    const [process,setProcess] =useState('IDLE');
    const [searchby,setSearchBy] =useState('name');
    const [search,setSearch] =useState('');
    const [row,setRow] = useState(5);
    const [startrow,setStartRow] = useState(0);
    const [deptid,setDeptId] = useState(0);
    const {data:buildings,isLoading,isError,isSuccess,error} = useGetBuildingsQuery();

     const [updateBuildingStatus] = useUpdateBuildingsStatusMutation();

    const searchBuilding=()=>{
        if (!buildings) return;

        let results = buildings;
    
        if (searchby === 'name') {
            results = buildings.filter(dep =>
                dep.building_name.toLowerCase().includes(search.toLowerCase())
            );
        } else if (searchby === 'date') {
            results = buildings.filter(dep =>
                dateOnly(dep.date_added).includes(search)
            );
        }else{
            results = buildings.filter(dep =>
                dep.description.toLowerCase().includes(search.toLowerCase())
            );
            
        }
    
        setFilteredBuildings(results);
        setStartRow(0);
        setRow(5); // Reset pagination
    } 
    
    const getRemoveBuildingId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Remove Building</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to remove this building from Active status?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-danger normal-text"
                        onClick={() => {
                            submitBuildingStatus(id,'REMOVED')
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
    const getRetrieveBuildingId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Retrieve Building</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to retrieve this building from Removed status?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-info normal-text"
                        onClick={() => {
                            submitBuildingStatus(id,'ACTIVE')
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
    const submitBuildingStatus=(id,status)=>{
        const building = {
            id:id,
            status:status
        }
        updateBuildingStatus(building)
        .unwrap()
        .then((res)=>{
            if(status=='ACTIVE'){
                toast.success("Building retrieved successfully");
            }else{
                toast.success("Building removed successfully");
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
   
    if(filteredBuildings){
        let len = Math.ceil(filteredBuildings.length / 5);
        var pageArray = [];
        for (var i = 0; i < len; i++) {
            pageArray.push(i);
        }
    }
   
 
   
    useEffect(() => {
        console.log("Start Row",row)
    },[startrow]);
    useEffect(() => {
        if (buildings) {
            setFilteredBuildings(buildings);
        }
    }, [buildings]);
  return (
    <>
<div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
        <h6 className="m-0 font-weight-bold text-primary header-text">List of Building /
            {
                process=='IDLE' ?
                <span className="text-secondary"> Search Building</span>
                :
                process=='ADD' ?
                <span className="text-secondary"> Add Building</span>
                :
                <span className="text-secondary"> Update Building</span>
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
                onClick={()=>searchBuilding()}
                className="btn btn-primary btn-sm btn-header normal-text"
                > Search</button>
                <button
                onClick={() => {
                    setFilteredBuildings(buildings);
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
            <AddBuilding/>
            :
            // Update
            <UpdateBuilding buildingid={deptid}/>
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
                        <th>Building Name</th>
                        <th>Description</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Action</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredBuildings.map((item, index) => (
                            index>=startrow && index<row ?
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.building_name}</td>
                                <td>{item.description}</td>
                                <td>{dateOnly(item.date_added)}</td>
                                <td>{item.status}</td>
                                <td className="d-flex justify-content-center" style={style}>
                                    <button 
                                    className="btn btn-warning btn-sm"
                                    onClick={()=>getBuildingId(item.id)}
                                    >
                                        <i className="fas fa-fw fa-edit"></i>
                                    </button>
                                    {
                                        item.status=="ACTIVE" ?
                                            <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={()=>getRemoveBuildingId(item.id)}
                                            >
                                                <i className="fas fa-fw fa-trash"></i>
                                            </button>
                                        :
                                        <button 
                                        className="btn btn-info btn-sm"
                                        onClick={()=>getRetrieveBuildingId(item.id)}
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
                        filteredBuildings ?
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
                        disabled={startrow+5 >= filteredBuildings.length}
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

export default Building