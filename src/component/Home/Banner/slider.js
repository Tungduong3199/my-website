import React from "react";
import Slider from "react-slick";
import banner1 from '../../../Images/540X540.png'
import banner2 from '../../../Images/540X540-2.png'
import banner3 from '../../../Images/540X540-3_3.png'
import banner4 from '../../../Images/540X540-4.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BannerWeb(props) {

    function SampleNextArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "none"}}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "none"}}
                onClick={onClick}
            />
        );
    }

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };
    return (
        <div className={"SimpleSlider"} >
            <Slider {...settings}>
                <div>
                    <img style={{margin: 'auto'}} src={banner1}/>
                </div>
                <div>
                    <img style={{margin: 'auto'}} src={banner2}/>
                </div>
                <div>
                    <img style={{margin: 'auto'}} src={banner3}/>
                </div>
                <div>
                    <img style={{margin: 'auto'}} src={banner4}/>
                </div>
            </Slider>
        </div>
    );
}

export default BannerWeb