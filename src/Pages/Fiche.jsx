import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Header,Footer} from './Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Modal({showModal,setShowModal,children}){
    const params=new URLSearchParams(window.location.search);
    var idProduit=params.get('id');
    const url="https://wss5enchere-production.up.railway.app/produit?id="+idProduit+"";
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get(url)
        .then(
            res=>{
                setData(res.data);
            }
        ).catch(
            error=>{
                console.error(error);
            }
        )
    },[])
    console.log(data);
    return(
        <div>
            {showModal &&(
                <div className='modalContent'>
                    {children}
                </div>
            )}
        </div>
    );
}

function Fiche(){
    const params=new URLSearchParams(window.location.search);
    var idProduit=params.get('id');
    const url="https://wss5enchere-production.up.railway.app/produit?id="+idProduit+"";
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get(url)
        .then(
            res=>{
                setData(res.data);
            }
        ).catch(
            error=>{
                console.error(error);
            }
        )
    },[])

    const [participants,setParticipant]=useState([]);
    useEffect(()=>{
        axios.get('https://wss5enchere-production.up.railway.app/histoEnchereDetaille?idEnchere=1')
        .then(
            res=>{
                setData(res.data);
            }
        ).catch(
            error=>{
                console.error(error);
            }
        )
    },[])


    const [images,setImg]=useState([]);
    const urlImage="https://wss5enchere-production.up.railway.app/getImg?id="+idProduit+""
    useEffect(()=>{
        axios.get(urlImage)
        .then(
            res=>{
                setImg(res.data);
            }
        ).catch(
            error=>{
                console.error(error);
            }
        )
    },[])

    console.log(data,images);
    return(
        <div className='content'>
            <Header/>
            <section style={{width: '80%',marginTop: '5%',marginLeft: '10%',minHeight: '50%',background: 'var(--bs-light)'}}>
            <div className="container" style={{width: '100%',marginLeft: '15%'}}>
                <div className="row" style={{width: '100%'}}>
                    
                        <div className="col-md-6">
                            <div className="carousel slide" data-bs-ride="carousel" id="carousel-1" style={{background: 'url(&quot;assets/img/275082595_414155670481261_1159071535120597596_n.jpg&quot;)',width: '100%',marginTop: '5%'}}>
                            {images.map(image=>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img className="w-100 d-block" style={{width : '500px'}} src={image.ref} alt="Slide"/></div>
                                </div>)}
                                <div><a className="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></a><a className="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></a></div>
                                <ol className="carousel-indicators">
                                    <li data-bs-target="#carousel-1" data-bs-slide-to="0" className="active"></li>
                                    <li data-bs-target="#carousel-1" data-bs-slide-to="1"></li>
                                    <li data-bs-target="#carousel-1" data-bs-slide-to="2"></li>
                                </ol>
                            </div>
                        </div>
                    
                    {data.map(produit=>
                        <div className="col-md-6">
                            <h5 style={{marginTop:'3%'}}>{produit.nom}</h5>
                            <div>
                                <label>Prix : {produit.prixminimal}</label>
                            </div>
                            <div>
                                <label>Date début: {produit.datedebut}</label>
                            </div>
                            <div>
                                <label>Durée: {produit.duree}</label>
                            </div>
                            <div>
                                <label>Description : {produit.description}</label>
                            </div>
                        </div> 
                    )}  
                      
                </div>
            </div>
            </section>
            <Rencherissement/>
            <Footer/>
        </div>
    );
}

function Rencherissement(){
    return(
        <div className="container" style={{width: '100%',marginLeft: '15%'}}>
        <div className="row" style={{width: '100%'}}>
            <div className="col">
                <button className="btn btn-primary" type="button" style={{width : '20%',marginTop: '5%'}} onClick={()=>
                    setShowModal(true)}>Rencherir</button>
                    <Modal showModal={showModal} setShowModal={setShowModal}>
                    <h2>Rencherire</h2>
                    {data.map(produit=>
                        <div className="col-md-6">
                            <h5 style={{marginTop:'3%'}}>{produit.nom}</h5>
                            <div>
                                <label>Prix : {produit.prixminimal}</label>
                            </div>
                            <div>
                                <label>Montant a encherire</label>
                                <input type='number' name='montant'/>
                            </div>
                            <button className="btn btn-primary" type="button" onClick={()=>
                                {
                                    var http=new XMLHttpRequest();
                                    let enchere=[];
                                    var montant=document.getElementById("montant");
                                    http.onreadystatechange=function(){
                                        if(http.readyState===4 && http.status===200){
                                            enchere=JSON.parse(http.response)
                                            console.log(enchere);
                                        }
                                    };
                                    http.open("GET","https://wss5enchere-production.up.railway.app/encherire?idenchere=1&montant="+montant.value+"&uuid=a3688507-f3b8-49bb-9b19-15608c7e6cc1");
                                    http.send();
                                    console.log("Ok");
                                    setShowModal(false);
                                }
                                }>Valider</button>
                        </div>
                    )} 
                    </Modal>
                <div className="table-responsive" style={{marginTop: '5%',width: '700px'}}>
                    <table className="table">
                        <tbody>
                        {participants.map(participant=>
                            <tr style={{background: 'rgb(225,225,225)'}}>
                                <td>
                                    <h6 className="mb-0" style={{width: '50%'}}>Joueur:{participant.nom}</h6>
                                </td>
                                <td>Montant:{participant.montantpayer}</td>
                            </tr>
                        )}  
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
    
}

export default Fiche;