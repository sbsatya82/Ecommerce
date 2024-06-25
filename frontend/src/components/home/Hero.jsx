import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';

const Hero = () => {
  useEffect(() => {
    const glide = new Glide('#glide_1', {
      type: 'carousel',
      autoplay: 5000,
      hoverpause: true,
      perView: 1,
    });

    glide.mount();
  }, []);

  return (
    <div className="hero">
      <div className="glide" id="glide_1">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <div className="center">
                <div className="left">
                  <span>New Inspiration {new Date().getFullYear()}</span>
                  <h1>NEW COLLECTION!</h1>
                  <p>Trending from men's and women's style collection</p>
                  <a href="#" className="hero-btn">SHOP NOW</a>
                </div>
                <div className="right">
                  <img className="img1" src="./images/hero-1.png" alt="Men's and women's style collection" loading="lazy" />
                </div>
              </div>
            </li>
            <li className="glide__slide">
              <div className="center">
                <div className="left">
                  <span>New Inspiration {new Date().getFullYear()}</span>
                  <h1>THE PERFECT MATCH!</h1>
                  <p>Trending from men's and women's style collection</p>
                  <a href="#" className="hero-btn">SHOP NOW</a>
                </div>
                <div className="right">
                  <img className="img2" src="./images/hero-2.png" alt="Men's and women's style collection" loading="lazy" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
