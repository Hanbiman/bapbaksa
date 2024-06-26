import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";

import { Autoplay, Pagination, A11y, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';


const Market = () => {

    const [randomIngre, setRandomIngre] = useState([]);
    const [randomCheepIngre, setRandomCheepIngre] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        IngreAxios();
        cheepIngreAxios();
        setTitle("마켓 홈");
    }, []);

    const IngreAxios = async () => {
        setIsLoading(true);
        await axios.get(process.env.REACT_APP_REST_SERVER_URL + "/product/random", {
            params: {
            }
        }).then((data) => {
            setRandomIngre(data.data);
        }).catch((error) => {
            return { type: "error", error }
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const cheepIngreAxios = async () => {
        setIsLoading(true);
        await axios.get(process.env.REACT_APP_REST_SERVER_URL + "/product/compareprice", {
            params: {
            }
        }).then((data) => {
            setRandomCheepIngre(data.data);
        }).catch((error) => {
            return { type: "error", error }
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const banners = [
        '/imgs/banner/recipe/openEvent.png',
        '/imgs/banner/recipe/bomEonabom.png',
        '/imgs/banner/recipe/lemonlimecheung.png',
        '/imgs/banner/recipe/test.png',
    ];

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className='market-grid'>
                <div className='cheep-container'>
                    <div className='cheep-recommend'>
                        <h2>이런 재료는 어떠세요?</h2>
                        <div className='line'></div>
                        <div className='cheep-recommend-swiper'>
                            <Swiper
                                slidesPerView={2}
                                autoplay={{
                                    delay: 2000,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                spaceBetween={30}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 40,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 50,
                                    },
                                }}
                                modules={[Autoplay]}
                                className="my-swiper"
                                initialSlide={1}
                            >
                                {randomIngre.length > 0 ? (
                                    randomIngre.map((ingre) => (
                                        <SwiperSlide key={ingre.PROD_CODE}>
                                            <div className='random-ingre-info'>
                                                <Link to={`/market/view/${ingre.PROD_CODE}_${ingre.PROD_SPCS_CODE}`}>
                                                    <img src={`/imgs/product/${ingre.PROD_IMG}`} alt={ingre.PROD_NAME}  draggable="false"/>
                                                    <div className='random-ingre-detail'>
                                                        <h3>{ingre.PROD_NAME}({ingre.PROD_SPCS_NAME})</h3> {/* ${} 대신 {} */}
                                                        <p>{ingre.PROD_AVRG_PRCE.toLocaleString()} 원</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide>
                                        <p>No Ingre found.</p>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className='cheep-container'>
                    <div className='swiper-container'>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, A11y, Navigation]}
                            className="my-swiper"
                        >
                            <div className='banner'>
                                <SwiperSlide>
                                    <img src='/imgs/banner/market/openEvent.png' draggable="false" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src='/imgs/banner/market/bomEonabom.png' draggable="false" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src='/imgs/banner/market/lemonlimecheung.png' draggable="false" />
                                </SwiperSlide>
                            </div>
                        </Swiper>
                    </div>
                </div>
                <div className='cheep-container'>
                    <h2>전월 대비 10%이상 저렴한 재료</h2>
                    <div className='line'></div>
                    <div className='cheep-recommend-swiper'>

                        <Swiper
                            slidesPerView={2}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            spaceBetween={30}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[Autoplay]}
                            className="my-swiper"
                        >
                            {randomCheepIngre.length > 0 ? (
                                randomCheepIngre.map((ingre) => (
                                    <SwiperSlide key={ingre.PROD_CODE}>
                                        <div className='random-ingre-info'>
                                            <Link to={`/market/view/${ingre.PROD_CODE}_${ingre.PROD_SPCS_CODE}`}>
                                                <div className='img-container'>
                                                    <img src={`/imgs/product/${ingre.PROD_IMG}`} alt={ingre.PROD_NAME} draggable="false" />
                                                </div>
                                                <div className='random-ingre-detail'>
                                                    <h3>{ingre.PROD_NAME}({ingre.PROD_SPCS_NAME})</h3> {/* ${} 대신 {} */}
                                                    <p>{ingre.PROD_AVRG_PRCE.toLocaleString()} 원</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide>
                                    <p>No Ingre found.</p>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Market;