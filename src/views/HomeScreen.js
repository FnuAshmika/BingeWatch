import React from 'react';
import "./HomeScreen.css";
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';

function HomeScreen(){
    return(
        <div className='homeScreen'>
            <Nav/>
            <Banner/>
            <Row title="TRENDING NOW" fetchUrl={requests.fetchTrending} isLargeRow/>
            <Row title="ANIMATION MOVIES" fetchUrl={requests.fetchAnimation}/>
            <Row title="ACTION MOVIES" fetchUrl={requests.fetchActionMovies}/>
            <Row title="MYSTERY MOVIES" fetchUrl={requests.fetchMystery}/>
            <Row title="TOP RATED" fetchUrl={requests.fetchTopRated}/>  
            <Row title="ADVENTURE MOVIES" fetchUrl={requests.fetchAdventure}/>
            <Row title="HORROR MOVIES" fetchUrl={requests.fetchHorrorMovies}/>
            <Row title="DOCUMENTARIES" fetchUrl={requests.fetchDocumentaries}/>
            

        </div>
    )
}

export default HomeScreen