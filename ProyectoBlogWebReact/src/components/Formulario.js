import React, { Component } from 'react';
import Sidebar from './Siderbar';

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHRef = React.createRef();
    generoMRef = React.createRef();

    recibirFormulario = (e) =>{

        var genero = "hombre";

        if(this.generoHRef.current.checked){
            genero = this.generoHRef.current.value;
        }
        else if (this.generoMRef.current.checked){
            genero = this.generoMRef.current.value
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero:genero
        };

        this.setState({
            user:user
        });



        e.preventDefault();
        console.log(user);
    }

    state = {
        user:{}
    };

    render() {

        if(this.state.user.nombre){
            var user = this.state.user;
        }

        return (
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">formulario</h1>

                        {/** Datos del formulario */}
                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>Apellidos: <strong>{user.apellidos}</strong></p>
                                <p>Bio: <strong>{user.bio}</strong></p>
                                <p>Género: <strong>{user.genero}</strong></p>
                            </div>
                        } 


                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografía</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radiobtn">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHRef}/>Hombre
                                <input type="radio" name="genero" value="mujer"  ref={this.generoMRef} />Mujer
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    </div>
                </div>
                <Sidebar blog="false"/>
            </div>
        );
    }
}

export default Formulario;