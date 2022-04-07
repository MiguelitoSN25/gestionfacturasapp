import React, { Component,useState , useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import {Dropdown, DropdownItem,DropdownMenu,DropdownToggle} from 'reactstrap'

const url = 'https://localhost:44306/api/Servicios'

function Facturas() {

const [services, setService] =useState([]);

useEffect( ()=>{


  const getservices= async()=>{
      const res = await fetch("https://localhost:44306/api/Servicios");
      const getser = await res.json();
      console.log(getser);

      setService(await getser)
    }

    getservices();
    
  
    });

    return (
        <body>
    <main>
        <div class="page" id="info">
            <p>If this were really a Single Page Application we would be hiding all but one of the div "pages" at all times.</p>
        </div>
       
        <div class="page" id="master">
            <header>
                <h1>MASTER detail</h1>    
            </header>
            <main>
                <ul class="master-list"></ul>
            </main>
        </div>

        <div class="page" id="detail">
            <header>
                <h1>master DETAIL</h1>
            </header>
            <main>
                <ul class="detail-list"></ul>
            </main>
        </div>
    </main>
    <script src="master-detail.js"></script>
</body>
    )
    
}
export default Facturas
