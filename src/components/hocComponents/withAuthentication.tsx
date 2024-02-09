import React from 'react';
import { withFirebase } from './withFirebase';
import AuthenticationContext from '../../contexts/authContext';
import { Unsubscribe } from 'firebase/auth';
import Firebase from '../../services/firebase.service';

export const withAuthentication = (Component: typeof React.Component) => {
  class WithAuthentication extends React.Component {
    listener!: Unsubscribe;

    constructor(props: any) {
      super(props);

      this.state = { user: null };
    }

    componentDidMount(): void {
      // @ts-ignore
      this.listener = (this.props.firebase as Firebase).auth.onAuthStateChanged(
        user => {
          user
            ? this.setState({ user })
            : this.setState({ user: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
      // @ts-ignore
        <AuthenticationContext.Provider value={this.state.user}>
          <Component {...this.props} />
        </AuthenticationContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
