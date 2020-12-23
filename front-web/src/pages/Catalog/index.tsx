import React, { useEffect, useState } from 'react';
import './styles.scss';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/Pagination';


const Catalog = () => {

    /*
    useEffect(() =>{
        //limitações
        //muito verboso
        //não tem supirte nativo para ler o progresso de upload de arquivos
        //não tem suporte nativo para query strings
        fetch('http://localhost:3000/products')
        .then(response => response.json()).then(response => console.log(response));
    },[]);*/

    //quando o component iniciar, buscar a lista de produtos
    //quando a lista de produtos estiver disponível,
    //popular um estado no componente, e listar os produtos dinamicamente

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    console.log(productsResponse);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 12
        }
        //iniciar o loader
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                //finalizar o loader
                setIsLoading(false);
            });
    }, [activePage]);
    
    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    ))
                )}
            </div>
            {productsResponse && 
            (<Pagination totalPages={productsResponse.totalPages} 
            activePage={activePage} 
            onChange={page => setActivePage(page)} />)}
        </div>
    );
}

export default Catalog;