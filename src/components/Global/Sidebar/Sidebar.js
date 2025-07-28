'use client'
import React,{useState,useEffect} from 'react'
import Link from 'next/link';
function Sidebar() {

  return (
    <>
<ul className="navbar-nav bg-gradient-danger sidebar sidebar-dark accordion" id="accordionSidebar">

        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            
            <div className="sidebar-brand-text mx-3">Astracare</div>
        </a>

        <hr className="sidebar-divider my-0" />


        <li className="nav-item">
            <Link className="nav-link" href="/dashboard">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></Link>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="/covid-status">
                <i className="fas fa-fw fa-virus"></i>
                <span>Covid Status</span></a>
        </li>


        <li className="nav-item">
            <a className="nav-link" href="/users">
                <i className="fas fa-fw fa-users"></i>
                <span>Users</span></a>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="/forms">
                <i className="fas fa-fw fa-file-contract"></i>
                <span>Forms</span></a>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="/">
                <i className="fas fa-fw fa-chart-bar"></i>
                <span>Reports</span></a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">
            Settings
        </div>

        <li className="nav-item">
            <Link className="nav-link" href="/departments">
                <i className="fas fa-fw fa-university"></i>
                <span>Departments</span></Link>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="/courses">
                <i className="fas fa-fw fa-user-graduate"></i>
                <span>Courses</span></a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/sections">
                <i className="fas fa-fw fa-puzzle-piece"></i>
                <span>Sections</span></a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/buildings">
                <i className="fas fa-fw fa-building"></i>
                <span>Buildings</span></a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/rooms">
                <i className="fas fa-fw fa-door-open"></i>
                <span>Rooms</span></a>
        </li>

      

        <hr className="sidebar-divider d-none d-md-block" />

</ul>
    </>
  )
}

export default Sidebar