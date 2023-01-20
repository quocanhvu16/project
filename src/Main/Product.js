/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState, useLayoutEffect } from "react";
import classNames from 'classnames';
import { useSelector,useDispatch } from "react-redux";

function Product(props){
    const dispatch = useDispatch()
    const checkLogin = useSelector(state => state.checkLogIn)
    const showForm = useSelector(state => state.showForm)
    const product = props.product
    const [amount,setAmount]= useState(1)
    const [numberRating , setNumberRating] = useState(0)
    const [starPercent, setStarPercent] = useState(0)
    const [percentRating1, setPercenRating1] = useState(0)
    const [percentRating2, setPercenRating2] = useState(0)
    const [percentRating3, setPercenRating3] = useState(0)
    const [percentRating4, setPercenRating4] = useState(0)
    const [percentRating5, setPercenRating5] = useState(0)

    const decAmount=()=>{
        if(amount>1){
            setAmount(amount-1)
        }
    }
    const incAmount=()=>{
        setAmount(amount+1)
    }
    useLayoutEffect(()=>{
        let totalRating=0
        let rating1=0
        let rating2=0
        let rating3=0
        let rating4=0
        let rating5=0
        for(let index in product?.comment){
            totalRating += product?.comment[index]?.rating
            if(product?.comment[index]?.rating===1){
                rating1++
            }
            if(product?.comment[index]?.rating===2){
                rating2++
            }
            if(product?.comment[index]?.rating===3){
                rating3++
            }
            if(product?.comment[index]?.rating===4){
                rating4++
            }
            if(product?.comment[index]?.rating===5){
                rating5++
            }
        }
        let rating = Math.round((totalRating /(product?.comment?.length))*10)/10
        setNumberRating(rating)

        const percenRating1Temp = (Math.round((rating1 /(product?.comment?.length))*100)/100)*100
        setPercenRating1(percenRating1Temp)

        const percenRating2Temp = (Math.round((rating2 /(product?.comment?.length))*100)/100)*100
        setPercenRating2(percenRating2Temp)

        const percenRating3Temp = (Math.round((rating3 /(product?.comment?.length))*100)/100)*100
        setPercenRating3(percenRating3Temp)

        const percenRating4Temp = (Math.round((rating4 /(product?.comment?.length))*100)/100)*100
        setPercenRating4(percenRating4Temp)

        const percenRating5Temp = (Math.round((rating5 /(product?.comment?.length))*100)/100)*100
        setPercenRating5(percenRating5Temp)

        const starPercentage = Math.round((rating/5)*100);
        setStarPercent(starPercentage)

        if(document.querySelector(".rating .stars-inner") !== null){
            document.querySelector(".rating .stars-inner").style.width = `${starPercentage}%`
        }
        if(document.querySelector(".rating .number-rating .stars-inner") !== null){
            document.querySelector(".rating .number-rating .stars-inner").style.width = `${starPercentage}%`
        }
        document.getElementById("rating1").style.width = `${percenRating1Temp}%`
        document.getElementById("rating2").style.width = `${percenRating2Temp}%`
        document.getElementById("rating3").style.width = `${percenRating3Temp}%`
        document.getElementById("rating4").style.width = `${percenRating4Temp}%`
        document.getElementById("rating5").style.width = `${percenRating5Temp}%`

    },[product?.comment])

    const clickSignIn =()=>{
        dispatch({"type":"setShowForm"})
    }
    const clickSignUp =()=>{
        dispatch({"type":"setShowForm"})
    }

    return(
        <div>
            <div className="grid wide container-product">    
                <div className="row product">
                    <div className="col l-5 m-12 c-12 product-image">
                        <div className="row">
                            <div className="col1 col l-3 m-3 c-3">
                                <img src={`${product.image}`}  
                                     />
                                <img src={`${product.image}`}></img>
                                <img src={`${product.image}`}></img>
                            </div>
                            <div className="col2 col l-9 m-9 c-9">
                                <img src={`${product.image}`}></img>
                            </div>
                        </div>
                        <div className="row">
                            <button>
                                <i className="fa-solid fa-cart-shopping"></i>
                                <p>Thêm vào giỏ hàng</p>
                            </button>
                        </div>
                    </div>
                    <div className="col l-7 m-12 c-12 product-info">
                        <div className="row name">
                            <div>
                                <h1>{product.name}</h1>
                                <p>{product?.description}</p>
                            </div>
                        </div>
                        <div className="row info">
                            <div className="col l-7 m-7 c-7">
                                <p>Tác giả: <a>{product.author}</a></p>
                                <p>Nhà xuất bản <a>{product.publisher}</a></p>
                            </div>
                            <div className="col l-5 m-5 c-5">
                                <p>Hình thức: <a>{product.type}</a></p>
                                <p>Số lượng đã bán: <a>{product.sale}</a></p>
                            </div>
                        </div>
                        <div className="row rating">
                            <div className="stars-outer">
                                <div className="stars-inner"></div>
                            </div>
                            <span className="number-rating">{numberRating || "0"}</span>
                            <p>{product?.comment?.length === undefined ? "(0 đánh giá)" : `(${product.comment.length} đánh giá)` }  </p>
                        </div>
                        <div className="row cost">
                            <p>{product.cost}</p>
                        </div>
                        <div className="row amount">
                            <p>Số lượng :</p>
                            <div className="button-amount">
                                <button onClick={decAmount}> - </button>
                                <p>{amount}</p>
                                <button onClick={incAmount}> + </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid wide evaluate">
                <div className="row title">
                    <div className="col l-12">
                        <h1>Đánh giá sản phẩm</h1>
                    </div>
                </div>
                <div className="row content">
                    <div className="col l-6 rating">
                        <div className="row">
                            <div className="col l-4 number-rating">
                                <div>
                                    {numberRating || "0"}<span>/5</span>
                                </div>
                                <div className="stars-outer">
                                    <div className="stars-inner"></div>
                                </div>
                                <p>{product?.comment?.length === undefined ? "(0 đánh giá)" : `(${product.comment.length} đánh giá)` }  </p>
                            </div>
                            <div className="col l-8 rating-charts">
                                <div className="rating-chart">
                                    <span>5 sao</span>
                                    <div className="chart">
                                        <div className="chart-inner rating5" id="rating5"></div>
                                    </div>
                                    <span>{percentRating5 || '0'}%</span>
                                </div>
                                <div className="rating-chart">
                                    <span>4 sao</span>
                                    <div className="chart">
                                        <div className="chart-inner rating4" id="rating4"></div>
                                    </div>
                                    <span>{percentRating4 || '0'}%</span>
                                </div>
                                <div className="rating-chart">
                                    <span>3 sao</span>
                                    <div className="chart">
                                        <div className="chart-inner rating3" id="rating3"></div>
                                    </div>
                                    <span>{percentRating3 || '0'}%</span>
                                </div>
                                <div className="rating-chart">
                                    <span>2 sao</span>
                                    <div className="chart">
                                        <div className="chart-inner rating2" id="rating2"></div>
                                    </div>
                                    <span>{percentRating2 || '0'}%</span>
                                </div>
                                <div className="rating-chart">
                                    <span>1 sao</span>
                                    <div className="chart">
                                        <div className="chart-inner rating1" id="rating1"></div>
                                    </div>
                                    <span>{percentRating1 || '0'}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col l-6 comment">
                        {checkLogin===false && 
                            <p>Chỉ có thành viên mới có thể viết nhận xét.Vui lòng <span onClick={clickSignIn}>đăng nhập</span> hoặc <span onClick={clickSignUp}>đăng ký</span>.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;