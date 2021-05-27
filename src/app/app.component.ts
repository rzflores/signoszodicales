import { Component,  } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';


export interface signoElement {
  signo: string; 
}


const Data : signoElement[]=  []

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title:string = 'SignosZodiacales';
  value:string = 'Clear me';
  dataSource  = new MatTableDataSource<signoElement>(Data);
  isBlank:boolean = false;  
  displayedColumns: string[] = ['signo'];
  

  

  borrar(inputvalue:HTMLInputElement){
    inputvalue.value = '';
  }
  buscar = async(inputvalue:HTMLInputElement) => {
    let dataBody = inputvalue.value == null|| undefined ? JSON.stringify({filtro: "" }) : JSON.stringify({filtro: `${inputvalue.value}`})        
    
  
   await fetch('https://estigia.ctorres.sandbox.ehg.pe/Rest/Caronte/v1.0/getData',{
       method: 'POST',
       mode: 'cors',
       headers: {
           'Content-Type': 'application/json'               
         },
       body: dataBody
   })
   
   .then(response => response.json())
   .then( (data) => {
      if(data.signos != null){
        this.dataSource =  data.signos
      }else{
        this.dataSource= new MatTableDataSource<signoElement>(Data);
        this.isBlank = true;
      }  
      
      
     }
    );
       
    
  }

  ngOnInit(){
    
  }
}
