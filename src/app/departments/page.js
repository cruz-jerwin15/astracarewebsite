import React from 'react'
import Sidebar from '../../components/Global/Sidebar/Sidebar'
import Header from '../../components/Global/Header/Header'
import Footer from '../../components/Global/Footer/Footer'
import DepartmentContent from '../../components/Contents/Department/Department'
function Department() {
  return (
    <>
    <div id="wrapper">
        <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Header/>
                    <div className="container-fluid">
                        <h1 className="h6 mb-4 text-gray-800">Departments</h1>
                        <DepartmentContent/>

                    </div>
            </div>
                    <Footer/>
            </div>
    </div>
    </>
  )
}

export default Department