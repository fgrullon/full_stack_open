import axios from 'axios';
import { Entry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries'

    export const getAllEntries = () => {
    return axios
        .get<Entry[]>(baseUrl)
        .then(res => res.data);
}

export const createEntry = (object: NewEntry) => {
    return axios
        .post<NewEntry>(baseUrl, object)
        .then(res => res.data);
}