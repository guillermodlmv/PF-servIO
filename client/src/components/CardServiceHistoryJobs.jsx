import React, { useEffect, useState } from 'react'

import s from './styles/CardServiceHistory.module.css'

import notFoundImg from '../img/not_found_img.svg'
import { useGlobalStorage } from '../hooks/useGlobalStorage';

import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux';

import axios from 'axios'
import { getClientNeedsById, getSpecificActivitiesById } from '../redux/actions';

const { REACT_APP_HOST } = process.env;


export default function CardServiceHistoryJobs(props) {

    const [ user, ]= useGlobalStorage("globalUser", "")

    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    async function updateNeed(status) {
        try {
            const { data } = await axios.put(`${REACT_APP_HOST}/clientNeeds/${props.ClientNeed}`, {
                status
            })
            // Swal.fire({
            //     icon: 'success',
            //     title: data,
            //     showConfirmButton: false,
            //     timer: 1500
            // })
            // dispatch(getSpecificActivitiesById(user.id))
        } catch (error) {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Something wrong',
            //     showConfirmButton: false,
            //     timer: 1500
            // })
        }
    }

    async function deleteNeed() {
        try {
            const data = await axios.delete(`${REACT_APP_HOST}/clientNeeds/${props.ClientNeedId}`)
            if (data.data === "La necesidad especifica ha sido eliminada."){
                Swal.fire({
                    icon: 'success',
                    title: 'La necesidad especifica ha sido eliminada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(getSpecificActivitiesById(user.id))
                dispatch(getClientNeedsById(user.id))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
      
        <div className={ s.container }>
            {/* FECHA DE STATUS */}
            <div className={ s.container_fecha }>
                <h5>{ props.date }</h5>
            </div>
            <div className={ s.container_datos }>
                {/* photo */}
                <div className={ s.container_datos_img }>
                    {
                        props.photo? <img src={props.photo} alt="" />:<img className={ s.container_datos_img_notFound } src={ notFoundImg } alt="" />
                    }
                </div>
                {/* Description, title and status */}
                <div className={ s.container_datos_description }>
                    <div className={ s.container_datos_description_status}>
                        {
                            props.status ?
                            <span>Status:{ props.status }</span>
                            :<></>
                        }
                    </div>
                    <div className={ s.container_datos_description_title }>
                        <h6> { props.name } </h6>
                    </div>
                    <div className={ s.container_datos_description_description }>
                        <p>
                            { props.description }
                        </p>
                    </div>
                </div>
                {/* Buttons */}
                <div className={ s.container_datos_buttons }>
                    {/* Mostar distintos botones segun el estado (props.status) */}

                    {/* option1:  ["Pending to pay"] - En este caso hay que mostar un mensaje: "Wow, un cliente quiere comprar tu servicio"  */}

                    <button name="offers" type="button" className="btn btn-outline-danger"  onClick={deleteNeed}>
                        Rechazar trabajo
                    </button>

                    {/* RUTA PARA UPDATE DE CLIENT NEED ---> LOCALHOST3000/clientNeeds/:id */}

                    {/* option2:  ["in progress"] - En este caso hay que mostar distintos botones 
                    //para modificar el estado de la clientNeed (id de clienNeed: props.ClientNeedId)
                        button1: Rechazar trabajo,
                        button2: ver detalles (de client need), // eso incluye ambos casos (presupuesto de necesidad especifica del cliente y actividad especifica de profesional)
                        button3: Confirmar Finalizacion (setear en client need valor "done")-pero antes de que se concrete el update 
                        de la tabla ClientNeed, tiene que mandarle un mail al cliente para que lo confirme (Trabajar con guille)
                      */}


                    {/* option3:  ["done"] - En este caso hay que mostar distintos botones 
                        //para modificar el estado de la clientNeed (id de clienNeed: props.ClientNeedId)
                        message on card (not swal!): Enhorabuena! Finalizaste tu trabajo con exito. Revisa en tu cuenta el deposito.
                      */}

                </div>
            </div>
        </div>
    )
}
