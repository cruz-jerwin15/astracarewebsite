import React from 'react'
import {useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useAddRoomsMutation } from '../../../rtk/roomApi';
import { useGetBuildingsQuery } from '../../../rtk/buildingApi';

function AddRoom() {
    const [addRoom] = useAddRoomsMutation();
    const [roomname,setRoomName]  = useState('');
    const [buildingid,setDespartmentId]  = useState('0');

     const {data:buildings,isLoading,isError,isSuccess,error} = useGetBuildingsQuery();

    const submitRoom=()=>{
        if(roomname === '' || buildingid === '0'){
            toast.error("Please fill all fields");
            return;
        }
        const room = {
            room_name:roomname,
            building_id:buildingid,
            status:'ACTIVE'
        }
        addRoom(room)
        .unwrap()
        .then((res)=>{
            toast.success("Room added successfully");
            setRoomName('');
            setDespartmentId('0');
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
  return (
    <>
     <div className="col-md-5">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter room name"
            value={roomname}
            onChange={(e)=>setRoomName(e.target.value)}
            />
                
        </div>
    </div>
    <div className="col-md-5">
        <div className="form-group">
                    
           

        {isLoading && <h3 className='normal-text'>Loading building...</h3>}
            {isError && <h3 className='normal-text'>Something went wrong</h3>}
            {isSuccess &&
             <select 
             onChange={(e)=>setDespartmentId(e.target.value)}
             value={buildingid}
             className="form-control normal-text" >
            <option key="chooseBuilding" value="0">Choose Building</option>
            {
                 buildings.map((item, index) => (
                    item.status=='ACTIVE' ?
                    <option  key={`building-${item.id}`}  value={item.id}>{item.building_name}</option>
                    : null
                ))
            }
            </select>
            }
                    
          
        </div>
    </div>
   
    <div className="col-md-2"> 
        <button 
        className="btn btn-primary btn-sm btn-header normal-text"
        onClick={()=>submitRoom()}
        
        > Add</button>
    </div>
    </>
  )
}

export default AddRoom