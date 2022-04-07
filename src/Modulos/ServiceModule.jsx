import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

const url = 'https://localhost:44306/api/Servicios'

class ServiceModule extends Component{
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      idServicio: '',
      nombreServicio: '',
      precio: '',
      categoria: '',
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
    delete this.state.form.idServicio;
   await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  
  peticionPut=()=>{
    axios.put(url+this.state.form.idServicio, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.idServicio).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  seleccionarServicio=(servicio)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        idServicio: servicio.idServicio,
        nombreServicio: servicio.nombreServicio,
        precio: servicio.precio,
        categoria: servicio.categoria
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
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Servicio</button>
  <br /><br />
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>Acciones</th>

          </tr>
          </thead>
          <tbody>
            {this.state.data.map(servicio=>{
              return(
                <tr>
                <td>{servicio.idServicio}</td>
                <td>{servicio.nombreServicio}</td>
                <td>{new Intl.NumberFormat("en-EN").format(servicio.precio)}</td>
                <td>{servicio.categoria}</td>
                <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarServicio(servicio); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarServicio(servicio); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                
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
                  <label htmlFor="idServicio">ID</label>
                    <input className="form-control" type="text" name="idServicio" id="idServicio" readOnly onChange={this.handleChange} value={form?form.idServicio: this.state.data.length + 1}/>
                    <br />
                    <label htmlFor="nombreServicio">Nombre</label>
                    <input className="form-control" type="text" name="nombreServicio" id="nombreServicio" onChange={this.handleChange} value={form?form.nombreServicio: ''}/>
                    <br />
                    <label htmlFor="nombreServicio">Precio</label>
                    <input className="form-control" type="text" name="precio" id="precio" onChange={this.handleChange} value={form?form.precio: ''}/>
                    <br />
                    <label htmlFor="categoria">Categoria</label>
                    <input className="form-control" type="text" name="categoria" id="categoria" onChange={this.handleChange} value={form?form.categoria:''}/>
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
               Estás seguro que deseas eliminar este servicio {form && form.nombre}
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
export default ServiceModule;
