import { axiosService } from './axiosService';

export const jokeService = {
    getJoke: () => axiosService.get('/jokes/random').then(value => value.data)
};