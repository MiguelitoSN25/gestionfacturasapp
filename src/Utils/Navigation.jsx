import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/HomePage">
                    Home
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/ServicesModule">
                    Servicios
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/ClientsModule">
                    Clientes
                </NavLink>
                 
                <NavLink className="d-inline p-2 bg-dark text-white" to="/FacturasModule">
                   Facturas
                </NavLink>

                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}