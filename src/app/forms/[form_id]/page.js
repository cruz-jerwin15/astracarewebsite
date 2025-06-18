'use client'
import React,{useState,useEffect,use} from 'react'
import Sidebar from '../../../components/Global/Sidebar/Sidebar'
import Header from '../../../components/Global/Header/Header'
import Footer from '../../../components/Global/Footer/Footer'
import QuestionContent from '../../../components/Contents/Form/Question'
import { useGetFormKeyQuery } from '../../../rtk/formApi';
import Link from 'next/link';
function Question({params}) {
    const { form_id } = use(params); 
     const {data} = useGetFormKeyQuery(form_id);
     const [formname,setFormName] = useState('');
     const [formkey,setFormKey] = useState('');

    useEffect(()=>{
             if(data){
                 console.log(data)
                 setFormName(data.form_title);
                 setFormKey(data.form_key);
             }
        },[data])
  return (
    <>
    <div id="wrapper">
        <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Header/>
                    <div className="container-fluid">
                        <h1 className="h6 mb-4 text-gray-800"><Link href="/forms">Forms </Link> / {formname}</h1>

                       <QuestionContent form_id={formkey}/>

                    </div>
            </div>
                    <Footer/>
            </div>
    </div>
    </>
  )
}

export default Question