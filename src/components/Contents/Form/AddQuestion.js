import React from 'react'
import {useState, useEffect,use} from 'react'
import { toast} from 'react-toastify';
import { useAddQuestionsMutation } from '../../../rtk/questionApi';
import { useAddOptionsBulkMutation } from '../../../rtk/optionApi';
function AddForm(props) {
    const formkey = props.form_id;
    const [addQuestion] = useAddQuestionsMutation();
    const [addBulkOption] = useAddOptionsBulkMutation();
    const [question,setQuestion]  = useState('');
    const [answertype,setAnswerType]  = useState('');
    const [numberchoice,setNumberChoice]  = useState(2);
   
    const getInitialInputs = () => ([
        { id: `first${Date.now()}`, value: '' },
        { id: `second${Date.now()}`, value: '' }
      ]);
      const [inputs, setInputs] = useState(getInitialInputs());
    const handleAddInput = () => {
        const id = Date.now(); // unique ID
        setInputs(prev => [...prev, { id, value: '' }]);
      };
    
      const handleRemoveInput = (idToRemove) => {
        setInputs(prev => prev.filter(input => input.id !== idToRemove));
      };
    const handleChange = (id, newValue) => {
        setInputs(prev =>
          prev.map(input =>
            input.id === id ? { ...input, value: newValue } : input
          )
        );
    };
    const submitForm=()=>{
        
        if(question === '' || answertype === ''){
            toast.error("Please fill all fields");
            return;
        }

        if(answertype=='Text'){
            submitTextType();
        }else  if((answertype=='Multiple')||(answertype=='Check')){
            submitMultipleType();
        }
       
    }
    const submitMultipleType = async () => {
        const blank = inputs.find(input => input.value.trim() == "");
        if (blank) {
          toast.error("Please fill all options");
          return;
        }
      
        const singlequestion = {
          form_key: formkey,
          question: question,
          answer_type: answertype,
          status: 'ACTIVE'
        };
      
        try {
          const res = await addQuestion(singlequestion).unwrap();
          await addBulkOption({
            options: inputs.map(input => ({
              question_id: res.id,
              option_name: input.value,
              status: "ACTIVE"
            }))
          }).unwrap();
      
          toast.success("Question and options added successfully");
      
          // Reset form
          setInputs(getInitialInputs());
          setQuestion('');
          setAnswerType('');
        } catch (err) {
            console.error("Error details:", err);
          toast.error(err?.data?.message || "An error occurred");
        }
      };
    
    const submitTextType =()=>{
        const singlequestion = {
            form_key:formkey,
            question:question,
            answer_type:answertype,
            status:'ACTIVE'
        }
        console.log(singlequestion)
        addQuestion(singlequestion)
        .unwrap()
        .then((res)=>{
            toast.success("Question added successfully");
            setQuestion('');
            setAnswerType('');
        })
        .catch((err)=>{
            toast.error(err.data.message);
        })
    }
    
  return (
    <>
     <div className="col-md-12">
        <div className="row">
        <div className="col-md-7">
        <div className="form-group">
            <input type="text" 
            className="form-control normal-text"  
            placeholder="Enter questions"
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            />
                
        </div>
        </div>
        <div className="col-md-3">
            <div className="form-group">
                
            <select 
                onChange={(e)=>setAnswerType(e.target.value)}
                value={answertype}
                className="form-control normal-text" >
                <option value="">Choose Type of Answer</option>
                <option value="Text">Input Short Answer </option>
                <option value="Multiple">Single Answer</option>
                <option value="Check">Multiple Answer</option>
            
            </select>
                    
            </div>
        </div>
      
        <div className="col-md-2"> 
            <button 
            className="btn btn-primary btn-sm btn-header normal-text"
            onClick={()=>submitForm()}
            
            > Add</button>
        </div>
      

        </div>

    </div>
    {
        answertype=="Multiple" || answertype=="Check" ?
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-7 d-flex justify-content-between align-items-baseline mb-2">
                            <h6 className="m-0 font-weight-bold text-secondary normal-text">Provide choices below:</h6>
                        <button onClick={handleAddInput} className='btn btn-link normal-text'>Add Choices</button>
                        </div>
                    </div>
                
                </div>
                {inputs.map((input, index) => (
                <div key={input.id} className="col-md-12">
                    <div className="row">
                    <div className="col-md-7">
                        <div className="form-group">

                            <input type="text" 
                            className="form-control normal-text" 
                            value={input.value} 
                            onChange={(e) => handleChange(input.id, e.target.value)}
                            placeholder={`Enter choice ${index + 1}`}
                            />
                                
                        </div>
                    </div>
                    {
                        index>=numberchoice ?
                        <div className="col-md-3 d-flex justify-content-start">
                            <button 
                            onClick={() => handleRemoveInput(input.id)}
                            className='btn btn-link btn-sm normal-text mb-2'>
                                <i className="fas fa-fw fa-times normal-text text-danger"></i>
                            </button>
                        </div>
                        :
                        null
                    }
                   
                    </div>  
                
                </div>
                ))}
            </div>
        </div>
        :
        null
    }
    

     
    
    </>
  )
}

export default AddForm