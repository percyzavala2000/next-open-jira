
import { createContext} from 'react';
import { EntryInterface } from '../../interfaces';



interface ContextProps {
  entries: EntryInterface[];
  addEntries: (entry: string) => void;
  handleUpdateEntry: (entry: EntryInterface, ShowSnackbar?: boolean) => void;
  handleDeleteEntry: (id: string) => void;
}


export const EntriesContext = createContext<ContextProps>({} as ContextProps);
