import React,{useState,useEffect} from 'react'
import { useGetFormQuery,useUpdateFormsMutation } from '../../../rtk/formApi';
import { toast} from 'react-toastify';
function UpdateForm(props) {

    const {data} = useGetFormQuery(props.formid);
    const [formname,setFormName]  = useState('');
    const [instruction,setInstruction]  = useState('');

    const [updateForm] = useUpdateFormsMutation();

    const submitForm =()=>{
        if(formname === '' || instruction === ''){
            toast.error("Please fill all fields");
            return;
        }
        const form = {
            id:data.id,
            user_id:data.user_id,
            form_title:formname,
            instruction:instruction,
            status:data.status
        }
        updateForm(form)
        .unwrap()
        .then((res)=>{
            toast.success("Form updated successfully");
            setFormName('');
            setInstruction('');
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }

    useEffect(()=>{
        if(data){
            console.log(data)
            setFormName(data.form_title)
            setInstruction(data.instruction)
        }
    },[data])
  return (
    <>
     <div className="col-md-3">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter form name"
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
                className="btn btn-warning btn-sm btn-header normal-text"
                onClick={()=>submitForm()}
                > Update</button>
            </div>
    </>
  )
}

export default UpdateForm