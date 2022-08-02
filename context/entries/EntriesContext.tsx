
import { createContext} from 'react';
import { EntryInterface } from '../../interfaces';



interface ContextProps {
  entries: EntryInterface[];
  addEntries: (entry: string) => void;
  handleUpdateEntry: (entry: EntryInterface) => void;
}


export const EntriesContext = createContext<ContextProps>({} as ContextProps);
