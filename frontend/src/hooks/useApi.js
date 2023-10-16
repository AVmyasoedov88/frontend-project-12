import { useContext } from 'react'

import apiContext from '../Context/ApiContext'

const useApiSocet = () => useContext(apiContext)

export default useApiSocet
