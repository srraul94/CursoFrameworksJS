import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';
import {Link} from 'react-router-dom';


class Article extends Component {

    url = Global.url;

    state = {
        articles: {},
        status: null
    };

    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;

        if(home === 'true'){
            this.getLastArticles();
        }
        else if(search && search !== null && search !== undefined){
            this.getArticlesBySearch(search);
        }
        else{
            this.getArticles();
        }
        
    }

    getLastArticles = () => {
        axios.get(this.url + 'articles/last')
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
             
            });
    }

    getArticles = () => {
        axios.get(this.url + 'articles')
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
               
            });
    }

    getArticlesBySearch = (search) => {
        axios.get(this.url + 'search/' + search)
            .then(res => {
                    this.setState({
                        articles: res.data.articles,
                        status: 'success'
                    });
            })
            .catch (err => {
                this.setState({
                    articles:[] ,
                    status: 'success'
                });
            });
    }

    render() {
        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map((article) => {
                return (
                    <article className="article-item" id="article-template" key={article._id}>
                        <div className="image-wrap">
                            {article.image !== null
                                ? (<img src={this.url + 'get-image/' + article.image} alt={article.title} />)
                                : (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNvukNlVto2NKIonwefeuYSpRfDS8Y7d22UOeQdjDY7MaAWjk" alt={article.title} />)
                            }
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow date={article.date}></Moment>  
                             
                        </span>
                        <Link to={'/blog/articulo/'+article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                );
            });


            return (
                <div id="articles">
                    {listArticles}
                </div>
            )
        }
        else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavía no se han insertado articulos para mostrar</p>
                </div>
            )
        }
        else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras se cargan los elementos...</p>
                </div>
            )
        }

    }
}

export default Article;