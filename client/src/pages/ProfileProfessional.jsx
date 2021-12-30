import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';
import star from '../img/star.svg'
import s from './styles/ProfileProfessional.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getByUserId, getSpecificActivitiesById } from '../redux/actions';
import { NavLink } from 'react-router-dom';


export default function ProfileProfessional(){

    const { idProfessional } = useParams()
    const dispatch= useDispatch();
    const [state, setstate] = useState({
        login: false,
        seeAllReview: true,
        seeAllServices: true,
    })
    
    const professional = useSelector((state) => state?.user[0])
    console.log('profesionalesssssssss',professional)
    const specificActivities = useSelector((state) => state.specificActivitiesById)

    
    const idSpecificActivities = specificActivities !== "There are not specifical Activities" && specificActivities.map((item) => item.idProfessional)


    useEffect(()=>{
        dispatch(getByUserId(idProfessional))
        dispatch(getSpecificActivitiesById(idProfessional))
    },[dispatch, idProfessional])

    function newStateReview(){
        setstate({
            ...state,
            seeAllReview: !state.seeAllReview,
        })
    }
    function newStateServices(){
        setstate({
            ...state,
            seeAllServices: !state.seeAllServices,
        })
    }

    return (
        <div className={ s.container }>

            <div className={s.container_details}>
                <div className={ s.container_details_photo }>
                </div>
                <div className={ s.container_details_text }>
                    <h1>
                        {professional?.first_name + ' ' + professional?.last_name}
                    </h1>
                    <h2>
                        {professional?.profession}
                    </h2>
                    <h5>
                        {professional?.state + ' ' + professional?.city}
                    </h5>
                    <div>
                        <div>
                            <img src={ star } alt="" />
                            <img src={ star } alt="" />
                            <img src={ star } alt="" />
                            <img src={ star } alt="" />
                            <img src={ star } alt="" />
                        </div>
                    </div>
                </div>
                {
                    state.login ? (
                        <NavLink to='/necesidades'>
                        <button className={s.container_details_button}>
                            <span>
                                Solicitar Presupuesto
                            </span>
                        </button>
                        </NavLink>
                    ) : null
                }
            </div>
            <h4>Servicios particulares</h4>
            <div className={ s.container_cards }>
                <div className={ state.seeAllServices?s.container_cards_first:s.container_cards_first_all }>
                    {
                        specificActivities && specificActivities === 'There are not specifical Activities' && (
                            <h3>Este profesional no cargo actividades especificas</h3>
                        )
                    }
                    {
                        specificActivities && specificActivities !== 'There are not specifical Activities' && specificActivities.map((el, index) => 
                            (
                                <NavLink to={"/ProfessionalSpecificActivity/" + el.id}>
                                    <CardParticularService
                                        name= { el.name }
                                        description= { el.description }
                                        price= { el.price }
                                    />
                                </NavLink>
                            )
                        )
                    }
                </div>
                <div className={ state.seeAllServices?s.container_cards_second:s.container_cards_second_all }>
                    <BsArrowRightCircle onClick={ newStateServices } size="50px"/>
                </div>
                <div className={ state.seeAllServices?s.container_cards_second_all:s.container_cards_second }>
                    <BsArrowLeftCircle onClick={ newStateServices } size="50px"/>
                </div>
            </div>
            <h4>Reviews</h4>
            <div className={ s.container_cards }>
                <div className={ state.seeAllReview? s.container_cards_first:s.container_cards_first_all }>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                </div>
                <div className={ state.seeAllReview?s.container_cards_second:s.container_cards_second_all }>
                    <BsArrowRightCircle onClick={ newStateReview } size="50px"/>
                </div>
                <div className={ state.seeAllReview?s.container_cards_second_all:s.container_cards_second }>
                    <BsArrowLeftCircle onClick={ newStateReview } size="50px"/>
                </div>
            </div>
            <div className={ s.container_containerButton}>
                {
                    state.login ? (
                        <button className={s.container_containerButton_button}>
                            <span>
                                Contactar
                            </span>
                        </button>
                    ) : <></>
                }
            </div>
        </div>   
        
            
    )
}