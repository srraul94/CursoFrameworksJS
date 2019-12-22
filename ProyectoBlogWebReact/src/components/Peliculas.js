import React, { Component } from 'react';

import Slider from './Slider';
import Sidebar from './Siderbar';
//import MensajeEstatico from './MensajeEstatico'
import Pelicula from './Pelicula';

class Peliculas extends Component {


    cambiarTitulo = () => {

        var { peliculas } = this.state;
        // var random = Math.floor(Math.random() * 3);
        peliculas[0].titulo = "Batman Begins";

        this.setState({
            peliculas: peliculas
        });
    }

    favorita = (pelicula, indice) => {
        console.log("Favorita Marcada");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }

    componentWillMount() {
        // alert("Se va a montar el componente");
        this.setState({
            peliculas: [
                { titulo: 'Batman VS Superman', image: 'https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2017/03/21/58d1b6084dceb.jpeg' },
                { titulo: 'Gran Torino', image: 'https://www.cabq.gov/south-broadway-cultural-center/events/clint-eastwood-en-espanol-gran-torino/@@images/image' },
                { titulo: 'Looper', image: 'https://cdn2.actitudfem.com/media/files/styles/large/public/images/2012/10/looper.jpg' }
            ],
            nombre: 'Raúl Sánchez',
            favorita: {}
        });
    }

    componentDidMount() {
        //  alert("Se ha cargado el componente de peliculas");
    }

    componentWillUnmount() {
        //alert("Se va a desmontar el componente");
    }

    render() {

        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        return (
            <React.Fragment>
                <Slider title="Peliculas" size="slider-small" />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de Películas</h2>
                        <p>Selección de las peliculas de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>Cambiar titulo</button>
                        </p>

                        {this.state.favorita.titulo && /* && indica un if */
                            <p className="favorita" style={pStyle}>
                                <strong> La pelicula favorita es: </strong>
                                <span>{this.state.favorita.titulo}</span>
                            </p>

                        }

                        {/*
                    this.state.favorita.titulo ? (condicion del if)
                    : (condicion del else)
                
                */}

                        {/**Componente pelicula*/}
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {

                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )

                                })
                            }

                        </div>
                    </div>
                </div>
                <Sidebar blog="false"/>
            </React.Fragment>);
            }
        }
        
export default Peliculas;