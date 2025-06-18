import React,{useState,useEffect} from 'react'
import { useGetBuildingQuery,useUpdateBuildingsMutation } from '../../../rtk/buildingApi';
import { toast} from 'react-toastify';
function UpdateBuilding(props) {

    const {data} = useGetBuildingQuery(props.buildingid);
    const [buildingname,setBuildingName]  = useState('');
    const [description,setDescription]  = useState('');

    const [updateBuilding] = useUpdateBuildingsMutation();

    const submitBuilding =()=>{
        if(buildingname === '' || description === ''){
            toast.error("Please fill all fields");
            return;
        }
        const building = {
            id:data.id,
            building_name:buildingname,
            description:description,
            status:data.status
        }
        updateBuilding(building)
        .unwrap()
        .then((res)=>{
            toast.success("Building updated successfully");
            setBuildingName('');
            setDescription('');
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }

    useEffect(()=>{
        if(data){
            console.log(data)
            setBuildingName(data.building_name)
            setDescription(data.description)
        }
    },[data])
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
                className="btn btn-warning btn-sm btn-header normal-text"
                onClick={()=>submitBuilding()}
                > Update</button>
            </div>
    </>
  )
}

export default UpdateBuilding