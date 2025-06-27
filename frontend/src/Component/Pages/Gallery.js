import React from 'react';
import '../CSS/Gallery.css'; 
import HeaderMain from '../Common/HeaderMain';
import NavBarMain from '../Common/NavBarMain';
import FooterMain from '../Common/FooterMain';

const Gallery = () => {
    return (
        <div className="gallery-page">
            <HeaderMain/>
            <NavBarMain/>
        <div className="gallery-container">
            <h1 className="gallery">Gallery</h1>
            {/* Additional section - Why Peacock Corrido Holiday House */}
            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery.jpg" alt="Gallery1" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_2.jpg" alt="Gallery2" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_3.jpg" alt="Gallery3"/>
                </div>
            </div>
            {/* You can add more gallery content here */}

            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery_4.jpeg" alt="Gallery4" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_5.png" alt="Gallery5" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_6.jpeg" alt="Gallery6"/>
                </div>
            </div>

            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery_7.jpg" alt="Gallery7" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_8.jpg" alt="Gallery8" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_9.jpg" alt="Gallery9"/>
                </div>
            </div>

            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery_10.jpeg" alt="Gallery10" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_11.jpg" alt="Gallery11" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_12.jpeg" alt="Gallery12"/>
                </div>
            </div>

        </div>
        <FooterMain/>
        </div>
    );
};

export default Gallery;
