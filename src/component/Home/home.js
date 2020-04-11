import React from 'react';
import Header from "../Header/Header";
import Banner from "./Banner/banner";
import Content from "./content/content";
import Footer from "../Footer/footer";

function Home() {
    return (
        <div>
            <Header/>
            <Banner/>
            <Content/>
            <Footer/>
        </div>
    )
}

export default Home;