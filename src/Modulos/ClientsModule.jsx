import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

const url = 'https://localhost:44306/api/Clientes'

class ClientsModule extends Component{
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      idCliente: '',
      nombreCompleto: '',
      rnc: '',
      direccion: '',
      sector: '',
      ciudad: '',
      telefono: '',
      correo: '',
      fotografia: '',
      tipoModal: ''
  }
}

peticionGet=()=>{
  axios.get(url).then(response=>{
    this.setState({data: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
  }
  
  peticionPost=async()=>{
    delete this.state.form.idCliente;
   await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  
  peticionPut=()=>{
    axios.put(url+this.state.form.idCliente, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.idCliente).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  seleccionarCliente=(cliente)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        idCliente: cliente.idCliente,
        nombreCompleto: cliente.nombreCompleto,
        rnc: cliente.rnc,
        direccion: cliente.direccion,
        sector: cliente.sector,
        ciudad: cliente.ciudad,
        provincia: cliente.provincia,
        telefono: cliente.telefono,
        correo: cliente.correo,
        fotografia: cliente.fotografia,


      }
    })
  }
  
  handleChange=async e=>{
  e.persist();
  await this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.form);
  }
  
    componentDidMount() {
      this.peticionGet();
    }

render(){ 
  const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Cliente</button>
  <br /><br />
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>RNC</th>
            <th>Direccion</th>
            <th>Sector</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Fotografia</th>
            <th>Acciones</th>

          </tr>
          </thead>
          <tbody>
            {this.state.data.map(clientes=>{
              return(
                <tr>
                <td>{clientes.idCliente}</td>
                <td>{clientes.nombreCompleto}</td>
                <td>{clientes.rnc}</td>
                <td>{clientes.direccion}</td>
                <td>{clientes.sector}</td>
                <td>{clientes.ciudad}</td>
                <td>{clientes.provincia}</td>
                <td>{clientes.telefono}</td>
                <td>{clientes.correo}</td>
                <td>{clientes.fotografia}</td>
                <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarCliente(clientes); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarCliente(clientes); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                
                  </td>
                </tr>
              )
            })}
          </tbody>
      </table>

      <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="nombreServicio">Nombre</label>
                    <input className="form-control" type="text" name="nombreCompleto" id="nombreCompleto" onChange={this.handleChange} value={form?form.nombreCompleto: ''}/>
                    <br />
                    <label htmlFor="nombreServicio">RNC</label>
                    <input className="form-control" type="text" name="rnc" id="rnc" onChange={this.handleChange} value={form?form.rnc: ''}/>
                    <br />
                    <label htmlFor="direccion">Direccion</label>
                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form?form.direccion:''}/>
                    <br />
                    <label htmlFor="sector">Sector</label>
                    <input className="form-control" type="text" name="sector" id="sector" onChange={this.handleChange} value={form?form.sector: ''}/>
                    <br />
                    <label htmlFor="provincia">Provincia</label>
                    <input className="form-control" type="text" name="provincia" id="provincia" onChange={this.handleChange} value={form?form.provincia:''}/>
                    <br />
                    <label htmlFor="ciudad">Ciudad</label>
                    <input className="form-control" type="text" name="ciudad" id="ciudad" onChange={this.handleChange} value={form?form.ciudad: ''}/>
                    <br />
                    <label htmlFor="correo">Telefono</label>
                    <input className="form-control" type="text" name="correo" id="correo" onChange={this.handleChange} value={form?form.correo: ''}/>
                    <br />
                    <label htmlFor="fotografia">Fotografia</label>
                    <input className="form-control" type="text" name="fotografia" id="fotografia" onChange={this.handleChange} value={form?form.fotografia:''}/>
                    
                  </div>

                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar al cliente {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

  </div>

  );
}
}
export default ClientsModule;
