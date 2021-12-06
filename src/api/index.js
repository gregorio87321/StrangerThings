 const API_URL = 'https://strangers-things.herokuapp.com/api/2108-LSU-RM-WEB-PT';
 const API_POST = '/posts'
 const API_REGISTER = '/users/register'
 
 export const callApi = async ({ url, method, token, body }) => {
    try {
      const options = {
        method: method ? method.toUpperCase() : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(API_URL + url, options);
      const data = await response.json();
      if (data.error) throw data.error;
      return data;
    } catch (error) {
      console.error('ERROR: ', error);
      return error
    }
  };

 export async function registerUser(user) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    };
   try {
     const response = await fetch(`${ BASE_URL }${API_REGISTER}`, options);
     const data = await response.json();
     return data;
   } catch (error) {
     throw error;
   }
 }
 
