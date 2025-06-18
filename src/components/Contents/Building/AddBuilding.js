import React from 'react'
import {useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useAddBuildingsMutation } from '../../../rtk/buildingApi';
function AddBuilding() {
    const [addBuilding] = useAddBuildingsMutation();
    const [buildingname,setBuildingName]  = useState('');
    const [description,setDescription]  = useState('');

    const submitBuilding=()=>{
        if(buildingname === '' || description === ''){
            toast.error("Please fill all fields");
            return;
        }
        const building = {
            building_name:buildingname,
            description:description,
            status:'ACTIVE'
        }
        addBuilding(building)
        .unwrap()
        .then((res)=>{
            toast.success("Building added successfully");
            setBuildingName('');
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
            placeholder="Enter building name"
            value={buildingname}
            onChange={(e)=>setBuildingName(e.target.value)}
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
        onClick={()=>submitBuilding()}
        
        > Add</button>
    </div>
    </>
  )
}

export default AddBuilding