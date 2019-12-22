import React, {Component} from 'react';

class MiComponente extends Component{

    render(){

        let receta = {
            nombre:'Pizza',
            ingredientes: ['Tomate','Queso','Jamón'],
            calorias:400
        };

        return(
            <React.Fragment>
                <h1>Hola, soy el componente llamado MiComponente</h1>
                <h2>Estoy probando el componente</h2>
                {this.props.saludo &&
                    <h3>{this.props.saludo}</h3>
                }


                <h3>{receta.nombre}</h3>
                <h3>Ingredientes:</h3>
                <ol>
                    {
                        receta.ingredientes.map((ing, i) => {
                            console.log(ing);
                            return (
                                <li key={i}>
                                   {ing} 
                                </li>
                            );
                        })
                    }
                </ol>
                <h3>{receta.calorias}</h3>
                <hr/>
            </React.Fragment>
           
        );
    }
}

export default MiComponente;

