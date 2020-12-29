import React, { useState } from 'react';
import { Button, Segment, Message, Modal } from 'semantic-ui-react';

const Estacionamiento = () => {

    const [estacionados, setEstacionados] = useState([]);
    const [enEspera, setEnEspera] = useState([]);
    const [asignacionDisponible, setAsignacionDisponible] = useState(true);
    const [vehiculoEnEspera, setVehiculoEnEspera] = useState('');
    const [chico, setChico] = useState(0);
    const [mediano, setMediano] = useState(0);
    const [grande, setGrande] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);

    // Se asigna el vehículo más próximo de la cola de espera al espacio del estacionamiento
    // correspondiente
    const asignarVehiculo = () => {
        let asignado = enEspera[0];
        let seMueve = false;
        // console.log(asignado);

        if (asignado && asignado === 'Motocicleta') {
            if (chico < 10) {
                setChico(chico + 1)
                setEstacionados(estacionados.concat({ tipo: asignado, lugar: 0 }));
                seMueve = true;
            } else if (mediano < 10) {
                setMediano(mediano + 1)
                setEstacionados(estacionados.concat({ tipo: asignado, lugar: 1 }));
                seMueve = true;
            } else if (grande < 10) {
                setGrande(grande + 1)
                setEstacionados(estacionados.concat({ tipo: asignado, lugar: 2 }));
                seMueve = true;
            }
        }

        if (asignado && asignado === 'Sedan') {
            if (mediano < 10) {
                setMediano(mediano + 1)
                setEstacionados(estacionados.concat({ tipo: asignado, lugar: 1 }));
                seMueve = true;
            } else if (grande < 10) {
                setGrande(grande + 1)
                setEstacionados(estacionados.concat({ tipo: asignado, lugar: 2 }));
                seMueve = true;
            }
        }

        if (asignado && asignado === 'Camioneta') {
            if (grande < 10) {
                setGrande(grande + 1)
                setEstacionados(estacionados.concat({ tipo: asignado, lugar: 2 }));
                seMueve = true;
            }
        }


        if (seMueve) {
            eliminarPrimeroCola(asignado);
            setAsignacionDisponible(true)
            setVehiculoEnEspera('')
        } else {
            setAsignacionDisponible(false)
            setMostrarModal(true)
            setVehiculoEnEspera(asignado)
        }
        // console.log(estacionados)
    }


    const agregarVehiculo = (tipo) => {
        setEnEspera(enEspera.concat(tipo));
        //console.log(enEspera);
    }

    // Función para mover el vehículo mas próximo de la cola de espera al lugar de estacionamiento
    const eliminarPrimeroCola = (asignado) => {
        let nuevaCola = [];

        for (let i = 1; i < enEspera.length; i++) {
            nuevaCola.push(enEspera[i]);
        }

        setEnEspera(nuevaCola);
        // console.log(nuevaCola);
    }

    const liberarEspacio = () => {
        let random;
        let lista = [];

        if (chico > 0) {
            lista.push(0)
        }
        if (mediano > 0) {
            lista.push(1)
        }
        if (grande > 0) {
            lista.push(2)
        }

        if (lista.length > 0) {
            while (!lista.includes(random)) {
                random = Math.floor(Math.random() * (2 + 1));
            }
            random === 0 ? setChico(chico - 1)
                : random === 1 ? setMediano(mediano - 1)
                    : setGrande(grande - 1)


            let borrado = false;
            let nuevoEstacionados = [];

            for (let i = 0; i < estacionados.length; ++i) {
                if (estacionados[i].lugar === random && borrado === false) {
                    borrado = true;
                } else {
                    nuevoEstacionados.push(estacionados[i]);
                }
            }
            setEstacionados(nuevoEstacionados);
            setAsignacionDisponible(true)
        }

        // console.log(estacionados);
    }
    return (
        <>
            <h1>Estacionamiento</h1>
            <br />
            <h2>Disponibilidad de estacionamiento</h2>
            <Segment>
                <div className="row mb-4">
                    <div className="col-md-4">
                        <Segment>
                            Espacios chicos ocupados: {chico} de 10
                        <br />
                        Motocicletas: {estacionados.filter(ve => ve.tipo === 'Motocicleta' && ve.lugar === 0).length}
                            <br />
                        Sedans: {estacionados.filter(ve => ve.tipo === 'Sedan' && ve.lugar === 0).length}
                            <br />
                        Camionetas: {estacionados.filter(ve => ve.tipo === 'Camioneta' && ve.lugar === 0).length}
                        </Segment>
                    </div>
                    <div className="col-md-4">
                        <Segment>
                            Espacios medianos ocupados: {mediano} de 10
                        <br />
                        Motocicletas: {estacionados.filter(ve => ve.tipo === 'Motocicleta' && ve.lugar === 1).length}
                            <br />
                        Sedans: {estacionados.filter(ve => ve.tipo === 'Sedan' && ve.lugar === 1).length}
                            <br />
                        Camionetas: {estacionados.filter(ve => ve.tipo === 'Camioneta' && ve.lugar === 1).length}
                        </Segment>
                    </div>
                    <div className="col-md-4">
                        <Segment>
                            Espacios grandes ocupados: {grande} de 10
                        <br />
                        Motocicletas: {estacionados.filter(ve => ve.tipo === 'Motocicleta' && ve.lugar === 2).length}
                            <br />
                        Sedans: {estacionados.filter(ve => ve.tipo === 'Sedan' && ve.lugar === 2).length}
                            <br />
                        Camionetas: {estacionados.filter(ve => ve.tipo === 'Camioneta' && ve.lugar === 2).length}
                        </Segment>
                    </div>
                </div>
                <Button
                    color="green"
                    disabled={!asignacionDisponible || enEspera.length === 0}
                    onClick={() => asignarVehiculo()}
                >Asignar</Button>
                <Button
                    color="red"
                    disabled={estacionados.length === 0}
                    onClick={() => liberarEspacio()}
                >Liberar</Button>
            </Segment>
            <br />
            <div className="row">
                <div className="col-md-6">
                <h2>Vehículos a ingresar</h2>
                    <Segment>
                        <div className="row">
                            <div className="col-md-4">
                                <Button color="orange" fluid onClick={() => agregarVehiculo('Motocicleta')}>Motocicleta</Button>
                            </div>
                            <div className="col-md-4">
                                <Button color="red" fluid onClick={() => agregarVehiculo('Sedan')}>Sedan</Button>
                            </div>
                            <div className="col-md-4">
                                <Button color="blue" fluid onClick={() => agregarVehiculo('Camioneta')}>Camioneta</Button>
                            </div>
                        </div>
                    </Segment>
                </div>
                <div className="col-md-3">
                    <h3>Cola de vehículos</h3>
                    <br />
                    <ul>
                        {enEspera.map(ve => <li>{ve}</li>)}
                    </ul>
                </div>
            </div>
            <Modal open={mostrarModal} size="small" style={{ height: 'auto', position: 'relative' }}>
                <Button icon="close" floated="right" onClick={() => setMostrarModal(false)} />
                <br/><br/>
                <Modal.Content>
                    <Segment raised>
                        <Message positive>Por favor espera a que se libere un espacio.</Message>
                        <h4>Tipo de vehículo en espera: {vehiculoEnEspera}</h4>
                    </Segment>
                    <Button floated="right" color="green" onClick={() => setMostrarModal(false)}>Aceptar</Button>
                <br/>
                </Modal.Content>

            </Modal>
        </>
    )
}
export default Estacionamiento;