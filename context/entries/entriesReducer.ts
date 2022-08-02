import { EntryInterface } from '../../interfaces';
import {EntriesState} from './EntriesProvider';

type EntriesActionTypes =
| {type: '[Entries]-AddEntries',payload:EntryInterface }
| {type: '[Entries]-UpDateStausEntries',payload:EntryInterface }
| {type: '[Entries]-RefreshEntries',payload:EntryInterface[] }

export const entriesReducer = (state : EntriesState, action : EntriesActionTypes) : EntriesState => {

    switch (action.type) {
        case '[Entries]-AddEntries':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            };
        case '[Entries]-UpDateStausEntries':
            return {
                ...state,
                entries: state.entries.map(entry => entry._id === action.payload._id ? action.payload : entry)
            };
        case "[Entries]-RefreshEntries":
            return{
                ...state,
                entries: [...action.payload]
            }

        default:
            return state;
     }
}