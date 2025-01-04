export const ACCESS_TOKEN: string = 'access';
export const REFRESH_TOKEN: string = 'refresh';
export const API_URL: string = 'http://127.0.0.1:8000/api';
export const ADD_STATE: string = 'addState';
export const REMOVE_STATE: string = 'removeState';
export const UPDATE_STATE: string = 'updateState';


export interface INote {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}