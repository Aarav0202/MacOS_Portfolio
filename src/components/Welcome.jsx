import gsap from "gsap"
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'

const FONT_WEIGHTS = {
    subtitle:{min:100 , max:400 , default :100},
    title: {min:400 , max:900 , default :400},
}

const renderText = (text , className , baseWeight= 400)=>{
    return[...text].map((char , i)=>(
        <span
        key ={i}
        className={className}
        style={{ 
            fontFamily: 'Georama, sans-serif',
            fontVariationSettings: `'wght' ${baseWeight}`,
            fontWeight: baseWeight
        }}
        >
            {char === " " ? '\u00A0' : char}
        </span>
    ))
}

const setUpTextHover = (container , type )=>{
    if(!container) return;

    const letters = container.querySelectorAll('span');
    const {min  , max  , default : base} = FONT_WEIGHTS[type];

    letters.forEach(letter => {
        letter._currentWeight = base;
    });

    const animateLetter = (letter , targetWeight )=>{
        gsap.to(letter, {
            _currentWeight: targetWeight,
            duration: 0.25,
            ease: 'power2.out',
            onUpdate() {
                letter.style.fontVariationSettings = `'wght' ${Math.round(letter._currentWeight)}`;
            }
        });
    }

    const handleMouseMove = (e)=>{
        const{left} = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter)=>{
            const {left : l , width : w}  = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l -left +w /2));
            const intensity  = Math.exp(-(distance ** 2) / 2000);

            animateLetter(letter , min +(max - min ) * intensity);
        })
    };

    const handleMouseLeave = () => 
        letters.forEach((letter)=> animateLetter(letter , base));

    container.addEventListener('mousemove' , handleMouseMove);
    container.addEventListener('mouseleave' , handleMouseLeave);

    return ()=>{
        container.removeEventListener('mousemove' , handleMouseMove);
        container.removeEventListener('mouseleave' , handleMouseLeave);
    }

};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(()=>{
        const titleCleanup = setUpTextHover(titleRef.current , 'title');
        const subtitleCleanup = setUpTextHover(subtitleRef.current , 'subtitle');

        return ()=>{
            titleCleanup();
            subtitleCleanup();
        }
    }, [])

  return (
    <section id ="welcome">
        <p ref={subtitleRef}>
            {renderText(
                "Hey I'm Aarav! Welcome to my",
                "text-3xl",
                100,
            )}
        </p>
        <h1 ref={titleRef} className='mt-7'>
            {renderText("portfolio" ,
            'text-9xl italic' )}
        </h1>

        <div className='small-screen'>
            <p>This portfolio is designed for desktop/tablet screens</p>
        </div>
    </section>
  )
}

export default Welcome