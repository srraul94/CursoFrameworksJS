import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Siderbar';
import Article from './Articles';


class Blog extends Component {

    render() {


        return (
            <div id="blog">
                <Slider title="Bienvenido al Blog" size="slider-small" />
                <div className="center">
                    <div id="content">
                        {/*Listado de arituclos */}
                       <Article/>

                    </div>

                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    }
}

export default Blog;