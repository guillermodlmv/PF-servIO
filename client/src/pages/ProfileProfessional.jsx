import React, { useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'

import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';

import star from '../img/star.svg'
import s from './styles/ProfileProfessional.module.css'
import logo from '../img/ServIO.svg'

export default function ProfileProfessional(){
    const [state, setstate] = useState({
        login: true,
        seeAllReview: true,
        seeAllServices: true,
    })
    const params = useParams()
    console.log(params)
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
            <div className={ s.container_nav }>
                <img src={ logo } alt="" />
            </div>
            <div className={s.container_details}>
                <div className={ s.container_details_photo }>
                </div>
                <div className={ s.container_details_text }>
                    <h1>Elon Musk</h1>
                    <h2>Mecánica automotriz.</h2>
                    <h5>Buenos Aires, Argentina.</h5>
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
                <Link className={s.container_details_linkEdit} to="/">
                    <FaRegEdit size="40px" className={s.logoEdit}>
                    </FaRegEdit>
                </Link>
                {
                    state.login ? (
                        <button className={s.container_details_button}>
                            <span>
                                Solicitar Presupuesto
                            </span>
                        </button>
                    ) : <></>
                }
            </div>
            <h4>Servicios particulares</h4>
            <div className={ s.container_cards }>
                <div className={ state.seeAllServices?s.container_cards_first:s.container_cards_first_all }>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
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
                        <button className={ s.container_containerButton_button}>
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