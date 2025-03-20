//pages/index.js

import React from 'react';
import SidebarII from './components/SidebarII';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

const Home = () => {
    return (
        <div>
            <nav>
                <h1>
                    Welcome to GFG
                    E-commerce Dashboard
                </h1>
            </nav>

            {/* SIDEBAR */}
            <SidebarII />
            {/* SIDEBAR */}

            {/* CONTENT */}
            <section id="content">
                {/* NAVBAR */}
                <Navbar />
                {/* NAVBAR */}

                {/* MAIN */}
                <MainContent />
                {/* MAIN */}
            </section>
            {/* CONTENT */}
        </div>
    );
};

export default Home;
