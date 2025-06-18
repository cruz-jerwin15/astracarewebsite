'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import AddQuestion from '../Form/AddQuestion'
import UpdateForm from '../Form/UpdateForm'
import { useGetFormsQuery,useUpdateFormsStatusMutation } from '../../../rtk/formApi';
import { useGetQuestionWithOptionsQuery } from '../../../rtk/questionApi';
import dateOnly from '../../../utils/getDate'
import { toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Link from 'next/link';

function Question(props) {
    const [questionlist, setQuestionList] = useState([]);
    const [process,setProcess] =useState('ADD');
    // const {data} = useGetQuestionWithOptionsQuery(props.form_id);
    const {
        data: quests,
        isLoading: isQuestLoading,
        isError: isQuestError,
        isSuccess: isQuestSuccess
      } = useGetQuestionWithOptionsQuery(props.form_id, {
        skip: !props.form_id  // skip query if form_id is falsy
      });


    const style={
        gap:"1px"
    }
   
   
    
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
                <h6 className="m-0 font-weight-bold text-primary header-text">Add Questions</h6>
                :
                <h6 className="m-0 font-weight-bold text-primary header-text">Update Question </h6>
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
            <AddQuestion form_id={props.form_id}/>
            :
            // Update
            <UpdateForm />
        }

           
        </div>
    </div>
    
    
   
    </div>
</div>


<div className="card shadow mb-4">
   
    <div className="card-body">
    {isQuestLoading && <h3 className='normal-text'>Loading data...</h3>}
        {isQuestError && <h3 className='normal-text'>Something went wrong</h3>}
        {isQuestSuccess &&
        <div className="table-responsive">
          <div className="col-md-12">
            <div className="row">
                {
                    quests.map((quest,index)=>{
                        return(
                        <div className="col-md-12 py-3 border border-bottom-1 border-top-0  border-left-0 border-right-0" key={`quest${index}`}>
                            <h6 className="m-0 font-weight-bold text-secondary normal-text">Question {index+1}: </h6>
                            <p className='text-secondary normal-text mt-2'>{quest.question}</p>
                            
                                {
                                    quest.answer_type=='Check' ?
                                        <h6 className="m-0 text-secondary normal-text mb-1">Question Type: Accepts multiple answers  </h6>
                                    :
                                    quest.answer_type=='Multiple' ?
                                        <h6 className="m-0 text-secondary normal-text mb-1">Question Type: Accepts single answer  </h6>
                                    :
                                    <h6 className="m-0 text-secondary normal-text mb-1">Question Type: Accepts short input answer  </h6>

                                }
                           
                           
                            {
                                quest.answer_type=='Check' ?
                                
                                    quest.options.map((opt)=>{
                                        return(
                                            <div className="form-check" key={`opt${opt.id}`}>
                                            <input className="form-check-input normal-text" type="checkbox" value="" id={`opt${opt.id}`} />
                                                <label className="form-check-label normal-text" htmlFor={`opt${opt.id}`}>
                                                {
                                                    opt.option_name
                                                }
                                                </label>
                                            </div>
                                        )   
                                    })
                                :
                                quest.answer_type=='Multiple' ?
                                    quest.options.map((opt)=>{
                                        return(
                                            <div className="form-check" key={`opt${opt.id}`}>
                                            <input className="form-check-input normal-text" type="radio" value="" name={`opt_name${quest.id}`} id={`opt${opt.id}`} />
                                                <label className="form-check-label normal-text" htmlFor={`opt${opt.id}`}>
                                                {
                                                    opt.option_name
                                                }
                                                </label>
                                            </div>
                                        )   
                                    })
                                :

                                null
                               
                            }
                           
                            
                        </div>
                    )
                    })
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

export default Question