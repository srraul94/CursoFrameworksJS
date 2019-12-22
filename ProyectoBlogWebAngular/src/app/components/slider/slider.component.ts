import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var $:any;


@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura:number;
  @Input('etiquetas') captions:boolean;
  @Output() conseguirAutor = new EventEmitter();
  
  public autor:any;

  constructor() {

  	this.autor = {
  		nombre: "Raul Sanchez",
  		website: "raul.com",
  		youtube: "raultuber" 
  	}

  }

  ngOnInit() {

  	$("header").css("background","green");
  	$("#logo").click(function(e){
  		e.preventDefault();
  		$("header").css("background","pink")
  				   .css("height","50px");
  	});


  	$('.galeria').bxSlider({
  		mode: 'fade',
    	captions: this.captions,
    	slideWidth: this.anchura
  	});
  }

  lanzar(event){
  	console.log(event);
  	this.conseguirAutor.emit(this.autor);

  }

}
