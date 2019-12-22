import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public widthSlider:number;	
  public anchuraToSlider:any;
  public captions:boolean;
  public autor: any;
  @ViewChild('textos') textos;
  
  constructor() {
  	this.captions = true;
  }

  ngOnInit() {
    //var opcion1 = alert(document.querySelector('#texto').innerHTML);
  	console.log(this.textos.nativeElement.textContent);
  }

  cargarSlider(){
  	 this.anchuraToSlider = this.widthSlider;
  }
  resetSlider(){
  	 this.anchuraToSlider = false ;
  }
  getAutor(event){
  	this.autor = event;
  }

}
