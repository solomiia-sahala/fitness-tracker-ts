import React from 'react';
import FirebaseContext from '../../contexts/firebaseContext';
import Firebase from '../../services/firebase.service';

export const withFirebase = (Component: typeof React.Component) => (props: any) => (
  <FirebaseContext.Consumer>
    {(firebase: Firebase) => <Component {...props} firebase={firebase}/>}
  </FirebaseContext.Consumer>
);
