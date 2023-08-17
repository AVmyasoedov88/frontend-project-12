import { useContext } from 'react';

import loginContext from '../Context/loginContext';

const useAuth = () => useContext(loginContext);

export default useAuth;
