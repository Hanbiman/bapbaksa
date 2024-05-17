import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MyFridgeQuery } from '../../query/fridgeQuerys';
import { AllRecipeQuery } from '../../query/recipeQuerys';
import { getToken } from '../../storage/loginedToken';
import { setTitle } from '../../util/setTitle';

const RecipeView = () => {
    let url_params = useParams().no;

    const { data: myFridgeList, isLoading: myFridgeIsLoading, isError: myFridgeIsError } = MyFridgeQuery();
    const { data: recipeList, isLoading: recipeIsLoading, isError: recipeIsError } = AllRecipeQuery();

    const [recipe, setRecipe] = useState({});

    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        initIsLike(url_params);
    }, [url_params]);

    useEffect(() => {
        if(recipe?.RECP_NAME) {
            setTitle(recipe.RECP_NAME);
        }
    }, [recipe]);

    useEffect(() => {
        if (recipeList && url_params) {
            setRecipe(recipeList[url_params]);
        }
    }, [recipeList]);

    const initIsLike = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/mypage/check_like_recipe", {
            params: {
                u_no: getToken("loginedUNo"),
                rf_no: url_params
            }
        }).then((data) => {
            console.log("////", data.data);
            if (data.data?.length > 0) {
                setIsLike(true);
            }
        })
    }

    const likeBtnClickEvent = async () => {
        if (isLike) {
            deleteLikeRecipe();
        } else {
            addLikeRecipe();
        }
    }

    const addLikeRecipe = async () => {
        await axios.post(process.env.REACT_APP_SERVER_URL + "/mypage/add_like_recipe",
            {
                u_no: getToken("loginedUNo"),
                rf_no: url_params
            }
        ).then((data) => {
            setIsLike(prev => !prev);
        })
    }

    const deleteLikeRecipe = async () => {
        await axios.delete(process.env.REACT_APP_SERVER_URL + "/mypage/delete_like_recipe", {
            data: {
                u_no: getToken("loginedUNo"),
                rf_no: url_params
            }
        }).then((data) => {
            setIsLike(prev => !prev);
        })
    }

    return (
        <>
            {recipe ?
                <>
                    <h2 className='title'>{recipe.RECP_NAME}</h2>

                    <button type='button' className='like-btn' onClick={likeBtnClickEvent}>
                        {
                            isLike ?
                                <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                                :
                                <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                        }
                    </button>

                    <div className='content'>
                        <div className='recipe-view' data-recp-code={recipe.RECP_CODE}>
                            <div className='recipe-info'>
                                <h3 className='recipe-title'>기본정보</h3>

                                <div className='recipe-content'>
                                    <div>
                                        <img src={recipe.RECP_MAIN_IMG} alt={recipe.RECP_NAME} />
                                    </div>

                                    <div className='info'>
                                        <div>
                                            <div className='info-title'>종류</div>
                                            <div>{recipe.RECP_REGION_NAME} / {recipe.RECP_CATEGORY_NAME}</div>
                                        </div>

                                        <div className='sub'>
                                            <div>
                                                <div className='info-title'>양</div>
                                                <div>{recipe.RECP_SERVIN}</div>
                                            </div>
                                            <div>
                                                <div className='info-title'>열량</div>
                                                <div>{recipe.RECP_KCAL}</div>
                                            </div>
                                            <div>
                                                <div className='info-title'>소요시간</div>
                                                <div>{recipe.RECP_TIME}</div>
                                            </div>

                                            <div>
                                                <div className='info-title'>난이도</div>
                                                <div>{recipe.RECP_DIFFICULT}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='info-title'>소개</div>
                                            <div>{recipe.RECP_INTRO}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='recipe-ingre'>
                                <h3 className='recipe-title'>재료 목록</h3>

                                <div className='recipe-content'>
                                    {
                                        recipe.RECP_INGRD ?
                                            Object.keys(recipe.RECP_INGRD).map((el, idx) => {

                                                let ingreText = recipe.RECP_INGRD[el].RECP_INGRD_PORTIONS !== "" ? " : " + recipe.RECP_INGRD[el].RECP_INGRD_PORTIONS : "";
                                                let ingreClass = "";

                                                switch (recipe.RECP_INGRD[el].RECP_INGRED_TYPE_NAME) {
                                                    case "주재료":
                                                        ingreClass = "main-ingre";
                                                        break;
                                                    case "부재료":
                                                        ingreClass = "sub-ingre";
                                                        break;
                                                    case "양념":
                                                        ingreClass = "add-ingre";
                                                        break;
                                                    default:
                                                        break;
                                                }

                                                if (myFridgeList && Object.keys(myFridgeList).includes(parseInt(recipe.RECP_INGRD[el].RECP_INGRD_CODE))) {
                                                    ingreClass += " on"
                                                }

                                                return <Link to={"/market/list"} state={{ searchVal: recipe.RECP_INGRD[el].RECP_INGRD_NAME }} className={'ingre-link ' + ingreClass} key={idx}>
                                                    {recipe.RECP_INGRD[el].RECP_INGRD_NAME}{ingreText}
                                                    <span><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></span>
                                                </Link>
                                            })
                                            : null
                                    }
                                </div>
                            </div>

                            <div className='recipe-progress'>
                                <h3 className='recipe-title'>레시피 과정</h3>

                                <div className='recipe-content'>
                                    {
                                        recipe.RECP_PROGRESS ?
                                            Object.keys(recipe.RECP_PROGRESS).sort().map((el, idx) => {
                                                let progressImg = recipe.RECP_PROGRESS[el].RECP_ORDER_IMG.trim() ? recipe.RECP_PROGRESS[el].RECP_ORDER_IMG : "/imgs/recipe/recipe_default.png";
                                                let progressTip = recipe.RECP_PROGRESS[el].RECP_ORDER_TIP.trim() ?
                                                    <div className='tip'><FontAwesomeIcon icon="fa-regular fa-lightbulb" /> {recipe.RECP_PROGRESS[el].RECP_ORDER_TIP}</div> : null;

                                                return <div className='progress-item' data-idx={recipe.RECP_PROGRESS[el].RECP_ORDER_NO} key={idx}>
                                                    <img src={progressImg} alt={recipe.RECP_PROGRESS[el].RECP_CODE + "_" + recipe.RECP_PROGRESS[el].RECP_ORDER_NO} />

                                                    <div className='progress-detail'>
                                                        <div><span className='no'>{recipe.RECP_PROGRESS[el].RECP_ORDER_NO} .</span>{recipe.RECP_PROGRESS[el].RECP_ORDER_DETAIL}</div>
                                                        {progressTip}
                                                    </div>
                                                </div>
                                            })
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : null}
        </>
    );
};

export default RecipeView;