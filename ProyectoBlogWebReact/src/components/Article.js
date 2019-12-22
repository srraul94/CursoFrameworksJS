import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Siderbar';
import Moment from 'react-moment';
import {Link,Redirect} from 'react-router-dom';
import 'moment/locale/es';
import swal from 'sweetalert';


class Article extends Component {

    url = Global.url;

    state = {
        article: {},
        status: null
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            });
    }

    UNSAFE_componentWillMount() {
        this.getArticle();
    }

    deleteArticle = (id) => {

        swal({
            title: "Estas seguro??",
            text: "Una vez eliminado, no podremos recuperar tu articulo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url + 'article/' +id)
                .then(res => {
                    this.setState({
                        article: res.data.article,
                        status: 'deleted'
                    })
                });
        
                swal(
                    'Articulo Eliminado',
                    'El articulo se ha eliminado correctamente',
                    'success'
                );
            } else {
                swal(
                    'Acción Cancelada!',
                    'Rectificar es de sabios',
                    'success'
                );
            }
          });
    }


    render() {

        if(this.state.status === 'deleted'){
            return <Redirect to="/blog" />
        }

        var article = this.state.article;

        return (
            <div className="center">
                <section id="content">

                    { article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image !== null
                                    ? (<img src={this.url + 'get-image/' + article.image} alt={article.title} />)
                                    : (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNvukNlVto2NKIonwefeuYSpRfDS8Y7d22UOeQdjDY7MaAWjk" alt={article.title} />)
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date"> <Moment fromNow date={article.date}></Moment></span>
                            <p>
                                {article.content}
                            </p>

                            
                            <button onClick={() => {this.deleteArticle(article._id)}} className="btn btn-danger" to={'/blog'}>Eliminar</button>
                            <Link to={'/blog/editar/'+article._id} className="btn btn-warning">Editar</Link>

                            <div className="clearfix"></div>
                        </article>
                    } 
                </section>

                <Sidebar />
                <div className="clearfix"></div>

            </div>
        );
    }
}

export default Article;