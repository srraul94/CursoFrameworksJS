import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global'
import Sidebar from './Siderbar';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

class CreateArticle extends Component {

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    UNSAFE_componentWillMount() {
        this.validator = new SimpleReactValidator({
          messages:{
              required:'Este campo es requerido'
          }   
        });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    saveArticle = (e) => {
        e.preventDefault();

        //rellenar el state
        this.changeState();

        if (this.validator.allValid()) {
            //Petición a la API
            axios.post(this.url + 'save', this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo Creado',
                            'El articulo se ha creado correctamente',
                            'success'
                        );

                        //Subir la imagen
                        if (this.state.selectedFile !== null) {
                            //Sacar el id del articulo guaradaa
                            var article_id = this.state.article._id;
                            //crear form data
                            const formData = new FormData();
                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );
                            //Peticion ajax
                            axios.post(this.url + 'upload/' + article_id, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    }
                                    else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });

                        }
                        else {
                            this.setState({
                                status: 'success'
                            });
                        }

                    }
                    else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                });
        }
        else{
            this.setState({
                status: 'failed'
            });
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        if (this.state.status === 'success') {
            return <Redirect to='/blog' />
        }

        return (
            <div className="center">
                <section id="content">
                    <h2 className="subheader">Crear Artículo</h2>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required|alpha')}

                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />


                    </form>


                </section>
                <Sidebar />
            </div>
        )
    }
}

export default CreateArticle;