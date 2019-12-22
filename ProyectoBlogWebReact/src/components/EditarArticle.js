import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global'
import Sidebar from './Siderbar';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';


class EditarArticle extends Component {

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    UNSAFE_componentWillMount() {

        this.article_id = this.props.match.params.id;
        this.getArticle(this.article_id);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image:this.state.article.image
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
            axios.put(this.url + 'article/'+this.article_id, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo Editado',
                            'El articulo se ha editado correctamente',
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
        else {
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
                    <h2 className="subheader">Editar Artículo</h2>

                    {this.state.article.title &&

                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}

                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    { this.state.article.image !== null
                                        ? (<img src={this.url + 'get-image/' +  this.state.article.image} alt={ this.state.article.title}  className="thumb" />)
                                        : (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNvukNlVto2NKIonwefeuYSpRfDS8Y7d22UOeQdjDY7MaAWjk"  className="thumb" alt={ this.state.article.title} />)
                                    }
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h2 className="subheader">Cargando...</h2>
                    }



                </section>
                <Sidebar />
            </div>
        )
    }
}

export default EditarArticle;