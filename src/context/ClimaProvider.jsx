import { useState, createContext } from "react";
import axios from 'axios'

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {

    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })

    const [resultado, setResultado] = useState({})
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')
    
    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const consultarClima = async datosBusqueda => {
        setCargando(true)
        setError('')
        try {
            const appId = import.meta.env.VITE_API_KEY
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${datosBusqueda.ciudad},${datosBusqueda.pais}&limit=1&appid=${appId}`
            const {data} = await axios(url)
            const {lat, lon} = data[0]

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const {data: clima} = await axios(urlClima)
            setResultado(clima)
            console.log(clima)
        }catch(error) {
            console.log(error)
            setError('No hay resultados')
        }
        setCargando(false)
    }

    return(
        <ClimaContext.Provider value={{
            busqueda,
            datosBusqueda,
            consultarClima,
            resultado,
            cargando,
            error
        }}>
            {children}
        </ClimaContext.Provider>
    )
}
export {
    ClimaProvider
}

export default ClimaContext