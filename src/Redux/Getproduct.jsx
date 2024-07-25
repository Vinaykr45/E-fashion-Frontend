import { setData, setLoading, setError } from './Productslice';
import axios from 'axios';

const Getproduct = () => {

 const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';

  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${url}/getproducts`);
      dispatch(setData(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export default Getproduct
