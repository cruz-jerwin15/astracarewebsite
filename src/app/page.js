'use client'
import React,{useState, useEffect} from 'react'
import { toast} from 'react-toastify';
import { useAddUsersLoginMutation } from '../rtk/userApi';
import { useRouter } from 'next/navigation';
export default function Login() {
  const router = useRouter();
  const [loginUser] = useAddUsersLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    if (email === '' || password === '') {
      toast.error("Please fill all fields");
      return;
    }
    const user = {
      email:email,
      password:password
    }
    loginUser(user)
    .unwrap()
    .then((res)=>{
        console.log("Res",res)
        if(res.message=="Wrong email or password"){
            toast.error("Wrong email or password");
            setEmail('');
            setPassword('');
            return;

        }else{
          console.log(res)
          if(res.user.role=="admin"){
            localStorage.setItem('user', JSON.stringify(res.user));
            router.push('/dashboard');
          }else{
            toast.error("Only adminisrator can login in this website.Please Download the mobile app for students and teachers");
            setEmail('');
            setPassword('');
            return;
          }
        }
       
    })
    .catch((err)=>{
                toast.error(err);
    })
  }

  return (
   <div className="bg-gradient-danger" style={{height: "100vh"}}>
    <div className="container">


<div className="row justify-content-center">

    <div className="col-xl-10 col-lg-12 col-md-9">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
             
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                      <img src="/loginimage.png" style={{width: "100%", height: "100%"}}/>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                          
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user"
                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email Address..." />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-user"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                        id="exampleInputPassword" placeholder="Password" />
                                </div>
                              
                                <button  className="btn btn-danger btn-user btn-block" onClick={()=>submitLogin()}>
                                    Login
                                </button>
                                
                               
                          
                            <hr />
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

    </div>
   </div>
  );
}
