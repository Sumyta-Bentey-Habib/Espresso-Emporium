import React from 'react';
import Banner from '../components/Banner';
import QualitySection from '../components/QualitySection';
import AboutUs from './AboutUs';
import FollowUs from '../components/FollowUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <QualitySection></QualitySection>
           <FollowUs></FollowUs>
        </div>
    );
};

export default Home;