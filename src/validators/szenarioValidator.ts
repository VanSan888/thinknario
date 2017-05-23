import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SzenarioValidator {

   constructor(public http: Http)
   {

   }


   validateCheckboxesProblemfeld(boxes: FormControl)
   {
      var valid : boolean = false,
          k     : any;


      for (k in boxes.value)
      {
         var val = boxes.value[k];

         if (val)
         {
            valid = true;
            break;
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