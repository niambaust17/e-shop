import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../redux/actions/productActions';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Loader from './layout/Loader';
import MetaData from './layout/MetaData'
import Product from './product/Product';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () =>
{
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        "Shoes",
        'Clothes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productCount, resPerPage } = useSelector(state => state.products);

    const { keyword } = useParams();

    useEffect(() =>
    {
        if (error)
        {
            return alert.error(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating))
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

    const setCurrentPageNo = (pageNumber) =>
    {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Buy Best Products'} />
                    <div className="container">
                        <h1 id="products_heading">Latest Products</h1>
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {
                                    keyword ? (<>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">
                                                <Range
                                                    marks={{ 1: `$1`, 1000: `$1000` }}
                                                    min={1}
                                                    max={1000}
                                                    defaultValue={[1, 1000]}
                                                    tipFormatter={value => `$${ value }`}
                                                    tipProps={{ placement: 'top', visible: true }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />
                                                <hr className="my-5" />
                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Categories
                                                    </h4>
                                                    <ul className="ps-0">
                                                        {categories.map(category => (<li style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>))}
                                                    </ul>
                                                </div>
                                                <hr className="my-3" />
                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Ratings
                                                    </h4>
                                                    <ul className="ps-0">
                                                        {[5, 4, 3, 2, 1].map(star => (<li style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner" style={{ width: `${ star * 20 }%` }}>

                                                                </div>
                                                            </div>
                                                        </li>))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {
                                                    products.map(product => <Product key={product._id} product={product} col={4} />)
                                                }
                                            </div>
                                        </div>
                                    </>) :
                                        (
                                            products.map(product => <Product key={product._id} product={product} col={3} />)
                                        )
                                }
                            </div>
                        </section>
                        {
                            resPerPage <= productCount && (
                                <div className="d-flex justify-content-center mt-5">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={productCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText={'Next'}
                                        prevPageText={'Prev'}
                                        firstPageText={'First'}
                                        lastPageText={'Last'}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>)
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Home
