'use client'
import React from 'react'
import {useState, useEffect} from 'react'


function Dashboard() {
    const [process,setProcess] =useState('IDLE')
    const [row,setRow] = useState(5)
    const [startrow,setStartRow] = useState(0)

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
    const data =[
        {
            building_name:"Makiling A",
            date_added:"2023-10-01",
            status:"ACTIVE"
        },
        {
            building_name:"Makiling B",
            date_added:"2023-10-01",
            status:"ACTIVE"
        },
        {
            building_name:"Makiling C",
            date_added:"2023-10-01",
            status:"ACTIVE"
        },
        {
            building_name:"Makiling D",
            date_added:"2023-10-01",
            status:"ACTIVE"
        },
        {
            building_name:"Makiling E",
            date_added:"2023-10-01",
            status:"ACTIVE"
        },
        {
            building_name:"Makiling F",
            date_added:"2023-10-01",
            status:"REMOVED"
        },
        {
            building_name:"Makiling G",
            date_added:"2023-10-01",
            status:"REMOVED"
        },
        {
            building_name:"Makiling H",
            date_added:"2023-10-01",
            status:"REMOVED"
        },
        {
            building_name:"Makiling I",
            date_added:"2023-10-01",
            status:"REMOVED"
        },
        {
            building_name:"Makiling J",
            date_added:"2023-10-01",
            status:"REMOVED"
        },
        {
            building_name:"Makiling K",
            date_added:"2023-10-01",
            status:"REMOVED"
        },
        {
            building_name:"Makiling L",
            date_added:"2023-10-01",
            status:"REMOVED"
        }
    ]

    const len = Math.ceil(data.length / 5); // Calculate the number of pages based on data length
   const pageArray=[];
    for(var i=0;i<len;i++){
        pageArray.push(i);
    }

   console.log("Page array",pageArray)
   
    useEffect(() => {
        console.log("Start Row",row)
    },[startrow]);
  return (
    <>
<div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
        <h6 className="m-0 font-weight-bold text-primary header-text">List of Department</h6>
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
                    
                        <select className="form-control normal-text" >
                        <option value="name"> Search by Name</option>
                        <option value="date">Search by Date Added</option>
                    
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control normal-text" placeholder="Enter your search" />
                
                    </div>
                </div>
                <div className="col-md-3"> 
            
                <button className="btn btn-primary btn-sm btn-header normal-text"> Search</button>
                </div>
            </>
            :
            // Adding Data
            process=='ADD' ?
            <>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control normal-text"  placeholder="Enter department name" />
                
                    </div>
                </div>
                <div className="col-md-3"> 
                <button className="btn btn-primary btn-sm btn-header normal-text"> Add</button>
                </div>
            </>
            :
            // Update
            <>
            <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control normal-text"  placeholder="Enter department name" />
                
                    </div>
                </div>
                <div className="col-md-3"> 
                <button className="btn btn-warning btn-sm btn-header normal-text"> Update</button>
            </div>
            </>
           
        }

           
        </div>
    </div>
    
    
   
    </div>
</div>


<div className="card shadow mb-4">
   
    <div className="card-body">
        <div className="table-responsive">
            <table className="table table-bordered normal-text" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Department Name</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Action</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            index>=startrow && index<row ?
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.building_name}</td>
                                <td>{item.date_added}</td>
                                <td>{item.status}</td>
                                <td className="d-flex justify-content-center" style={style}>
                                    <button 
                                    className="btn btn-warning btn-sm"
                                    onClick={()=>whatProcess('UPDATE')}
                                    >
                                        <i className="fas fa-fw fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        <i className="fas fa-fw fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            : null
                        ))
                    }
             
                   
                   
                </tbody>
               
            </table>
            <div className="w-100 d-flex justify-content-end border-1">
                <div className="btn-group " role="group" aria-label="Basic example" >

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
                        disabled={startrow+5 >= data.length}
                        >
                            <i className="fas fa-caret-right normal-text"></i>
                        </button>
                    </div>
                </div>
        </div>
    </div>
</div>



    </>
  )
}

export default Dashboard