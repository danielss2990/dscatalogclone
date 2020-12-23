import React from 'react';
import { ReactComponent as MainImage } from 'core/assets/Images/main-image.svg';
import './styles.scss';
import { Link } from 'react-router-dom'
import Buttonicon from 'core/components/Buttonicon';

const Home = () => {
    return (
        <div className="home-container">
            <div className="row home-content card-base border-radius-20">
                <div className="col-6">
                    <h1 className="text-title" data-testid="main-title">Conheça o melhor <br />catálogo de produtos</h1>
                    <p className="text-subtitle">Ajudaremos você a encontrar os melhores <br /> produtos disponíveis no mercado.</p>
                    <Link to="/products">
                        <Buttonicon text="inicie agora a sua busca" />
                    </Link>
                </div>

                <div className="col-6">
                    <MainImage className="main-image" data-testid="main-image" />
                </div>
            </div>
        </div>
    );
}

export default Home;