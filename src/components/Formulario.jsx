import useClima from "../hooks/useClima"
import { useState } from "react"

const Formulario = () => {
    const {busqueda, datosBusqueda, consultarClima} = useClima()
    const [alerta, setAlerta] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        setAlerta('')
        if(Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son obligatorios')
            return
        }
        consultarClima(busqueda)
    }
  return (
    <div className='contenedor'>
        {alerta && <p>{alerta}</p>}
        <form onSubmit={handleSubmit}>
            <div className='campo'>
                <label htmlFor='ciudad'>Ciudad</label>
                <input type="text" id='ciudad' name='ciudad' value={busqueda.ciudad} onChange={datosBusqueda}/>
            </div>
            <div className='campo'>
                <label htmlFor='pais'>Pais</label>
                <select type="text" id='pais' name='pais' value={busqueda.pais} onChange={datosBusqueda}>
                    <option value="">Seleccione un pais</option>
                    <option value="ES">España</option>
                    <option value="US">Estados Unidos</option>
                    <option value="UK">Inglaterra</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>

                </select>
            </div>
            <input type="submit" value="Consultar clima" />
        </form>
    </div>
  )
}

export default Formulario