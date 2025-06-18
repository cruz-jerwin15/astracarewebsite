'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import AddForm from '../Form/AddForm'
import UpdateForm from '../Form/UpdateForm'
import { useGetFormsQuery,useUpdateFormsStatusMutation } from '../../../rtk/formApi';
import dateOnly from '../../../utils/getDate'
import { toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Link from 'next/link';

function Form(props) {
    const [filteredForms, setFilteredForms] = useState([]);
    const [process,setProcess] =useState('ADD');
    const [searchby,setSearchBy] =useState('name');
    const [search,setSearch] =useState('');
    const [row,setRow] = useState(5);
    const [startrow,setStartRow] = useState(0);
    const [deptid,setDeptId] = useState(0);
    const {data:forms,isLoading,isError,isSuccess,error} = useGetFormsQuery();

     const [updateFormStatus] = useUpdateFormsStatusMutation();

    const searchForm=()=>{
        if (!forms) return;

        let results = forms;
    
        if (searchby === 'name') {
            results = forms.filter(dep =>
                dep.form_title.toLowerCase().includes(search.toLowerCase())
            );
        } else if (searchby === 'date') {
            results = forms.filter(dep =>
                dateOnly(dep.date_added).includes(search)
            );
        }else{
            results = forms.filter(dep =>
                dep.description.toLowerCase().includes(search.toLowerCase())
            );
            
        }
    
        setFilteredForms(results);
        setStartRow(0);
        setRow(5); // Reset pagination
    } 
    
    const getRemoveFormId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Un-publish Form</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to unpublish this form?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-danger normal-text"
                        onClick={() => {
                            submitFormStatus(id,'DRAFT')
                            onClose();
                        }}
                        >
                        Un-publish
                        </button>
                    </div>
                    
                  </div>
                );
              }
          });
        
    }
    const getPublishFormId=(id)=>{

        const publishExist = forms.some(form => form.status === "PUBLISHED");
        if(publishExist){
            toast.warning("We only allow one published form. We already have one published forms. Please un-publish it first.");
        }else{
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                      <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                        <h1 className="text-secondary header-text">Publish Form</h1>
                        <p className="text-secondary normal-text">
                          Are you sure to publish this form?
                        </p>
                        <div className="w-100 d-flex justify-content-between">
                            <button
                            className="btn btn-secondary normal-text"
                            onClick={onClose}>Cancel</button>
                            <button
                            className="btn btn-primary normal-text"
                            onClick={() => {
                                submitFormStatus(id,'PUBLISHED')
                                onClose();
                            }}
                            >
                            Publish
                            </button>
                        </div>
                        
                      </div>
                    );
                  }
              });
        }

       
        
    }
    const getRetrieveFormId=(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='card shadow' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8d7da' }}>
                    <h1 className="text-secondary header-text">Retrieve Form</h1>
                    <p className="text-secondary normal-text">
                      Are you sure to retrieve this form from Removed status?
                    </p>
                    <div className="w-100 d-flex justify-content-between">
                        <button
                        className="btn btn-secondary normal-text"
                        onClick={onClose}>Cancel</button>
                        <button
                        className="btn btn-info normal-text"
                        onClick={() => {
                            submitFormStatus(id,'ACTIVE')
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
    const submitFormStatus=(id,status)=>{
        const form = {
            id:id,
            status:status
        }
        updateFormStatus(form)
        .unwrap()
        .then((res)=>{
            if(status=='DRAFT'){
                toast.success("Form unpublish successfully");
            }else if(status=='PUBLISHED'){
                toast.success("Form publish successfully");
            }else{
                toast.success("Form removed successfully");
            }
            
                    
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
    
    const getFormId =(id)=>{
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
   
    if(filteredForms){
        let len = Math.ceil(filteredForms.length / 5);
        var pageArray = [];
        for (var i = 0; i < len; i++) {
            pageArray.push(i);
        }
    }
   
 
   
    useEffect(() => {
        console.log("Start Row",row)
    },[startrow]);
    useEffect(() => {
        if (forms) {
            setFilteredForms(forms);
        }
    }, [forms]);
     useEffect(() => {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipTriggerList.forEach(el => new window.bootstrap.Tooltip(el));
          }, []);
  return (
    <>
<div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
       
            {
              
                process=='ADD' ?
                <h6 className="m-0 font-weight-bold text-primary header-text">Add Form</h6>
                :
                <h6 className="m-0 font-weight-bold text-primary header-text">Update Form </h6>
            }
    
        {
            process=='ADD' ?
           <></>
            :
            <button 
            className="btn btn-danger btn-sm"
            onClick={()=>whatProcess('ADD')}
            >
                <i className="fas fa-fw fa-times normal-text"></i>
            </button>
        }
       
    </div>
  
    <div className="card-body">
    <div className="container">
        <div className="row" >

        {
           
            // Adding Data
            process=='ADD' ?
            <AddForm/>
            :
            // Update
            <UpdateForm formid={deptid}/>
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
                        <th>Title</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Action</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredForms.map((item, index) => (
                            index>=startrow && index<row ?
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.form_title}</td>
                                <td>{dateOnly(item.date_added)}</td>
                                <td>{item.status}</td>
                                <td className="d-flex justify-content-center" style={style}>
                                   
                                    {
                                        
                                        item.status=="DRAFT" ?
                                        <>
                                         <Link 
                                            className="btn btn-primary btn-sm"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Click to add question."
                                            href={`/forms/${item.form_key}`}
                                            >
                                                <i className="fas fa-fw fa-plus-square"></i>
                                            </Link>
                                         <button 
                                            className="btn btn-warning btn-sm"
                                            onClick={()=>getFormId(item.id)}
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Click to update forms."
                                            >
                                                <i className="fas fa-fw fa-edit"></i>
                                            </button>
                                            <button 
                                            className="btn btn-success btn-sm"
                                            onClick={()=>getPublishFormId(item.id)}
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Click to publish forms."
                                            >
                                                <i className="fas fa-fw fa-check"></i>
                                            </button>
                                        </>
                                        : 
                                        item.status=="PUBLISHED" ?
                                        <>
                                        <button 
                                            className="btn btn-primary btn-sm" disabled
                                            >
                                                <i className="fas fa-fw fa-plus-square"></i>
                                            </button>
                                        <button 
                                            className="btn btn-warning btn-sm" disabled
                                            >
                                                <i className="fas fa-fw fa-edit"></i>
                                            </button>
                                        <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={()=>getRemoveFormId(item.id)}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Click to un-publish form."
                                        >
                                            <i className="fas fa-fw fa-trash"></i>
                                        </button>
                                        </>
                                        :
                                        <>
                                        <button 
                                            className="btn btn-primary btn-sm" disabled
                                            >
                                                <i className="fas fa-fw fa-plus-square"></i>
                                            </button>
                                        <button 
                                            className="btn btn-warning btn-sm" disabled
                                            >
                                                <i className="fas fa-fw fa-edit"></i>
                                            </button>
                                        <button 
                                        className="btn btn-info btn-sm"
                                        onClick={()=>getRetrieveFormId(item.id)}
                                        >
                                            <i className="fas fa-fw fa-sync"></i>
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
                        filteredForms ?
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
                        disabled={startrow+5 >= filteredForms.length}
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

export default Form