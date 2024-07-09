import React, { useRef } from 'react'
import Slider from 'react-slick';


import {
    ArrowCircleLeftIcon, ArrowCircleRightIcon
} from "@heroicons/react/outline";
import styled from 'styled-components';
import Project from './Project';


let data = [
    {
        link: '/career',
        img: "https://i.ytimg.com/vi/QQB93QyEHJ0/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD_qK1wvgqwXI88PWMoeHIbDwX9Uw",
        disc: "Top Career Journey Stories of PCS Global ",
    },
    {
        link: '/motivation',
        img: "https://i.ytimg.com/vi/k2y_PxpoQhc/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciBSKEEwDw==&rs=AOn4CLA2uSzSiP9SMnG89fpZ4MzTENST1Q",
        disc: "PCS Global Career Motivation ",
    },
    {
        link: '/career-talk',
        img: "https://res.cloudinary.com/dalfbjhy3/image/upload/v1709055446/ykchmzyfl11smra2hh5q.webp",
        disc: "Build Career With PCS Global",
    },
    {
        link: '/pcs-born',
        img: "https://res.cloudinary.com/dalfbjhy3/image/upload/v1710003914/vydpzhsbpjwclt7k1sdf.webp",
        disc: "How PCS Global Born In India",
    },
    {
        link: '/interview-sql',
        img: "https://res.cloudinary.com/dalfbjhy3/image/upload/v1710013958/v7menfrf6rhyxiswvzhw.webp",
        disc: "Sql Basic Interview Questions",
    }
];

var settings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
        {
            breakpoint: 990,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                centerMode: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                centerMode: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }
    ]
};
const SliderComp = () => {
    const arrowRef = useRef(null);
    let sliderProject = "";
    sliderProject = data.map((item, i) => (
        <Project item={item} key={i} />
    ))
    return (
        <Container>
            <Slider ref={arrowRef} {...settings}>
                {sliderProject}
            </Slider>
            <Buttons>
                <button
                    onClick={() => arrowRef.current.slickPrev()}
                    className='back'><ArrowCircleLeftIcon /></button>
                <button
                    onClick={() => arrowRef.current.slickNext()}
                    className='next'><ArrowCircleRightIcon /></button>
            </Buttons>
        </Container>
    )
}

export default SliderComp;

const Container = styled.div`
  position: relative;
`

const Buttons = styled.div`
  button{
    width: 2rem;
    height: 2rem;
    background-color: rgba(255, 255, 255, 0.100);
    cursor: pointer;
    color: #01be96;
    border: none;
    position: absolute;
    top: 45%;
    right: -1rem;
  }

  .back{
    left: -1rem;
  }
`