import React from 'react'
import {useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useAddFormsMutation } from '../../../rtk/formApi';
function AddForm() {
    const [addForm] = useAddFormsMutation();
    const [formname,setFormName]  = useState('');
    const [instruction,setInstruction]  = useState('');

    const submitForm=()=>{
        if(formname === '' || instruction === ''){
            toast.error("Please fill all fields");
            return;
        }
        const form = {
            user_id:1,
            form_title:formname,
            instruction:instruction,
            status:'DRAFT'
        }
        addForm(form)
        .unwrap()
        .then((res)=>{
            toast.success("Form added successfully");
            setFormName('');
            setInstruction('');
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
            placeholder="Enter form title"
            value={formname}
            onChange={(e)=>setFormName(e.target.value)}
            />
                
        </div>
    </div>
     <div className="col-md-6">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter instructions"
            value={instruction}
            onChange={(e)=>setInstruction(e.target.value)}
            />
                
        </div>
    </div>
    <div className="col-md-3"> 
        <button 
        className="btn btn-primary btn-sm btn-header normal-text"
        onClick={()=>submitForm()}
        
        > Add</button>
    </div>
    </>
  )
}

export default AddForm