import React from 'react'
import Sidebar from '../../components/Global/Sidebar/Sidebar'
import Header from '../../components/Global/Header/Header'
import Footer from '../../components/Global/Footer/Footer'
import SectionContent from '../../components/Contents/Section/Section'
function Section() {
  return (
    <>
    <div id="wrapper">
        <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Header/>
                    <div className="container-fluid">
                        <h1 className="h6 mb-4 text-gray-800">Sections</h1>
                        <SectionContent/>

                    </div>
            </div>
                    <Footer/>
            </div>
    </div>
    </>
  )
}

export default Section