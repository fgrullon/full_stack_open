import axios from 'axios';
import { Entry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries'

const getAllEntries = () => {
    return axios
        .get<Entry[]>(baseUrl)
        .then(res => res.data);
}

const createEntry = (object: NewEntry) => {
    return axios
        .post<Entry>(baseUrl, object)
        .then(res => res.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllEntries,
    createEntry
}