import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SzenarioValidator {

   constructor(public http: Http)
   {

   }

   validateCheckboxesProblemfeld(boxes: FormControl, untereGrenze, obereGrenze)
   {
      var valid : boolean = false;
      var k     : any;
      var i     : number =0;
      //Iteration durch die Checkboxen
      for (k in boxes.value)
      {
         //val bekommt den Wert der aktuellen Checkbox zugewiesen
         var val = boxes.value[k];
         //Wenn val=true (also Checkbox ausgewählt), dann soll i um 1 erhöht werden.
         if (val)
         {
            i=i+1;
         } 
        //Wenn i größer als 1 ist, dann wird valid=true. 
        if(i>=1) {
          valid = true;
        }
        //Wenn i größer als 3 ist, dann wird valid=false.
        if(i >= 3){
          valid = false;
        }   
      }
      //Wenn valid nach der Schleife immer noch false ist, wird null zurück gegeben.
      //Die Form ist damit nicht zulässig
      if (valid)
      {
         return null;
      }
      //Ist valid=true (nach der Schleife), wird die Form freigegeben
      return {
         checkboxRequired: true
      };
   }

   //Sehr ähnlich zu validateCheckboxesProblemfeld. Siehe Erklärung dort.
   validateCheckboxesSchluesselfaktoren(boxes: FormControl)
   {
      var valid : boolean = false;
      var k     : any;
      var i     : number =0;

      for (k in boxes.value)
      {
         var val = boxes.value[k];

         if (val)
         {
            i=i+1;
         } 

        if(i>=2) {
          valid = true;
        }

        if(i >= 5){
          valid = false;
        }   
      }

      if (valid)
      {
         return null;
      }

      return {
         checkboxRequired: true
      };
   }



}