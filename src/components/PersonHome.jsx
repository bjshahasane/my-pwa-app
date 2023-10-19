// src/components/BackgroundColorChange.js

import React, { useEffect } from 'react';
// import { Element, Link } from 'react-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PersonAdd from './PersonAdd';

gsap.registerPlugin(ScrollTrigger);

const BackgroundColorChange = () => {

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to('body', {
            backgroundColor: '#d452eb', 
            duration: 1,
        });

        ScrollTrigger.create({
            animation: tl,
            start: 'top top', 
            end: 'bottom top',
            scrub: 1, 
        });
    }, []);
    return (
        <div>
            <div style={{ minHeight: '100vh' }}>
                <h2>Scroll Down to See Background Color Change</h2>
                <PersonAdd />
            </div>
        </div>
    );
};

export default BackgroundColorChange;
