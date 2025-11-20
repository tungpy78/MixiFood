import authorizedAxiosInstance from "./api";



export const login = async (email: string, password: string) => {
  try {
    const response = await authorizedAxiosInstance.post('/auth/login', { email, password });
    return response.data; // Trả về { message, tokens, user }
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (username: string, email: string, phone: string, password: string) => {
  try {
    const response = await authorizedAxiosInstance.post('/auth/register', { username, email, phone, password });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};
