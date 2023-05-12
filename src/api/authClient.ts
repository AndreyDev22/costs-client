import { setAuth, setUsername } from '../context/auth';
import { handleAxiosError } from '../utils/errors';
import api from './axiosClient';

export class AuthClient {
  static async login(username: string, password: string) {
    try {
      const res = await api.post('/auth/login', { username, password });

      if (res.status === 200) {
        setAuth(true);
        setUsername(res.data.username);
        localStorage.setItem('auth', JSON.stringify(res.data));
        return true;
      }
      return false;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  static async registration(username: string, password: string) {
    try {
      const res = await api.post('/auth/registration', { username, password });

      if (res.status === 201) {
        setAuth(false);
        return true;
      }
      return false;
    } catch (error) {
      handleAxiosError(error);
    }
  }
}
