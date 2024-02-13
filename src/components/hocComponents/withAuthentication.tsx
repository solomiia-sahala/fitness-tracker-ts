import React from 'react';
import { Unsubscribe } from 'firebase/auth';
import { withFirebase } from './withFirebase';
import AuthenticationContext from '../../contexts/authContext';

export const withAuthentication = (Component: typeof React.Component):
    (props: any) => JSX.Element => {
  class WithAuthentication extends React.Component<NonNullable<unknown>, { user: any }> {
    listener!: Unsubscribe;

    constructor(props: any) {
      super(props);

      this.state = { user: null };
    }

    componentDidMount(): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (user: any | null) => (user ? this.setState({ user })
          : this.setState({ user: null })),
      );
    }

    componentWillUnmount(): void {
      this.listener();
    }

    render(): any {
      return (
        <AuthenticationContext.Provider value={this.state.user}>
          <Component {...this.props} />
        </AuthenticationContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};
