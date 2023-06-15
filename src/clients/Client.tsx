import axios, { AxiosResponse } from 'axios';
import { StoryPrompt } from '../types/StoryPrompt.types';


const API_BASE_URL: string = import.meta.env.VITE_API_URL || '';

// Función para manejar errores de Axios
const handleAxiosError = (error: any) => {
  console.error('Error en la llamada a la API:', error);
  throw error;
};

// Obtener todas las historias
export const getAllStories = (): Promise<AxiosResponse<any>> => {
  const url = `${API_BASE_URL}/stories`
  return axios
    .get(url)
    .then((response) => response.data)
    .catch(handleAxiosError);
};

// Obtener una historia por su ID
export const getStoryById = (id: string): Promise<AxiosResponse<any>> => {
  const url = `${API_BASE_URL}/stories/${id}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch(handleAxiosError);
};

// Crear una nueva historia
export const createStory = (storyData: StoryPrompt): Promise<any> => {
  const url = `${API_BASE_URL}/stories`
  return axios
    .post(url, storyData)
    .then((response) => response.data)
    .catch(handleAxiosError);
};

// Actualizar una historia existente
export const updateStory = (id: string, storyData: any): Promise<AxiosResponse<any>> => {
  const url = `${API_BASE_URL}/stories/${id}`;
  return axios
    .put(url, storyData)
    .then((response) => response.data)
    .catch(handleAxiosError);
};

// Eliminar una historia por su ID
export const deleteStory = (id: string): Promise<AxiosResponse<any>> => {
  const url = `${API_BASE_URL}/stories/${id}`;
  return axios
    .delete(url)
    .then((response) => response.data)
    .catch(handleAxiosError);
};
