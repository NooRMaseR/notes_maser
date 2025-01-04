export const ACCESS_TOKEN: string = 'access';
export const REFRESH_TOKEN: string = 'refresh';
// export const API_URL: string = import.meta.env.VITE_API_URL as string;
// export const API_URL: string = "https://rx0nj5m1-8000.euw.devtunnels.ms/api";
// export const API_URL: string = "http://192.168.1.7:8000/api";
export const API_URL: string = "https://e80fd39b-6848-42b7-ae7b-77f7319b5f3d-dev.e1-us-east-azure.choreoapis.dev/notes/backend/v1/api";



export interface INote {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}