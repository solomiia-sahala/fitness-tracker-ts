import { useOutletContext } from 'react-router-dom';
import Firebase from '../services/firebase.service';

type ContextType = { userId: string, firebase: Firebase };

export function useUserContext(): ContextType {
  return useOutletContext<ContextType>();
}
