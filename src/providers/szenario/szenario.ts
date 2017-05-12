import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class SzenarioProvider {

  constructor() {
  }
  
 updateTest(test: string): firebase.Promise<any> {
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).update({
      test: test,
    });
  } 
  
  
  
  /*
  updateProblemfeld(problemfeld: string): firebase.Promise<any> {
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).update({
      problemfeld: problemfeld,
    });
  }
  */
}
