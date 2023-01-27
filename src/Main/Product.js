/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector,useDispatch } from "react-redux";


function Product(props){
    const productId= props.productId
    const usedispatch = useDispatch()
    const [comment, setComment] = useState(0)
    const [cart, setCart] = useState([])
    useLayoutEffect(()=> {
        async function fetchHomeList (){
            const requestUrl = `http://localhost:3000/book/${productId}`
            const response = await fetch(requestUrl)
            const responseJson = await response.json()
            setProduct(responseJson)
        }
        fetchHomeList()
    }, [comment])
    const [product, setProduct]= useState([])
    document.title= `${product.name}`
    const dispatch = useDispatch()
    const checkLogin = useSelector(state => state.checkLogIn)
    const showForm = useSelector(state => state.showForm)
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
            const ratingComment = product?.comment[index]?.rating
            totalRating += ratingComment
            if(ratingComment===1){
                rating1++
            }
            if(ratingComment===2){
                rating2++
            }
            if(ratingComment===3){
                rating3++
            }
            if(ratingComment===4){
                rating4++
            }
            if(ratingComment===5){
                rating5++
            }
        }
        let rating = Math.round((totalRating /(product?.comment?.length))*10)/10
        setNumberRating(rating)

        const percenRating1Temp = Math.round((Math.round((rating1 /(product?.comment?.length))*100)/100)*100)
        setPercenRating1(percenRating1Temp)

        const percenRating2Temp = Math.round((Math.round((rating2 /(product?.comment?.length))*100)/100)*100)
        setPercenRating2(percenRating2Temp)

        const percenRating3Temp = Math.round((Math.round((rating3 /(product?.comment?.length))*100)/100)*100)
        setPercenRating3(percenRating3Temp)

        const percenRating4Temp = Math.round((Math.round((rating4 /(product?.comment?.length))*100)/100)*100)
        setPercenRating4(percenRating4Temp)

        const percenRating5Temp = Math.round((Math.round((rating5 /(product?.comment?.length))*100)/100)*100)
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
    const [writeComment , setWriteComment] = useState(false)
    const clickButton = () =>{
        setWriteComment(true)
    }
    const closeComment =() => {
        setWriteComment(false)
    }
    const [showToastComment,setShowToastComment] = useState(false)
    const sendComment = () => {
        const app = document.querySelector(".App")
        const loading = document.createElement('div')
        loading.classList.add("frostApp")
        loading.style.zIndex= 5
        loading.innerHTML=`<div class="loadingBx">
                            <div class="loading"></div>
                          </div>`
        app.appendChild(loading)
        setTimeout(()=>{
            setWriteComment(false)
            app.removeChild(loading)
            setShowToastComment(true)
            setTimeout(()=>{
                setShowToastComment(false)
            },4000)
        },1500) 
        setComment(comment+1)
    }
    const handleCart = () => {
        if(checkLogin === true){
            const app = document.querySelector(".App")
            const loading = document.createElement('div')
            loading.classList.add("frostApp")
            loading.style.zIndex= 5
            loading.innerHTML=`<div class="loadingBx">
                                <div class="loading"></div>
                            </div>`
            app.appendChild(loading)
            setTimeout(()=>{
                app.removeChild(loading)
                setShowToastCart(true)
                setTimeout(()=>{
                    setShowToastCart(false)
                },4000)
            },1000) 
            const data =  {
                ...product,
                amount:amount,
                total: amount*(Number(product.cost.replace('.','')))
            }
            usedispatch({"type":"addProduct","payload":data})
        }
        if(checkLogin=== false){
            dispatch({"type":'setShowForm'})
        }
    }
    const [preview,setPreview] = useState({
        state: false,
        data : ""
    })
    const handleClickPreview = (e)=>{
        console.log(e);
        setPreview({
            ...preview,
            state:true,
            data : e
        })
    }
    const closePreview =() =>{
        setPreview({
            ...preview,
            state:false,
            data : ''
        })
    }
    const clickClose=(e)=>{
        if(e.target.closest('.toast-close')){
          let a = document.querySelector('.toast')
          a.style.animation = 'slideInRight ease 1s forwards'
          setTimeout(()=>{
            setShowToastComment(false)
          },1000)
        }
      }
    const [showToastCart,setShowToastCart] = useState(false)
    return(
        <div className="main-product">
            {preview.state === true && 
                <div className="click-preview">
                    <div>
                        <img className="content" src={`${preview.data}`} />
                    </div>
                    <div className="close-preview" onClick={closePreview}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            {writeComment === true &&
                <div className="write-comment">
                    <div className="box-comment">
                        <div className="box-top">
                            <h1>VIẾT ĐÁNH GIÁ SẢN PHẨM</h1>
                            <i className="fa-solid fa-xmark" onClick={closeComment}></i>
                        </div>
                        <div class="stars">
                            <form id="form" name="rating" onchange="showValue()">
                            <input class="star star-5" id="star-5" type="radio" name="star" value="5"/>
                            <label class="star star-5" for="star-5"></label>
                            <input class="star star-4" id="star-4" type="radio" name="star" value="4"/>
                            <label class="star star-4" for="star-4"></label>
                            <input class="star star-3" id="star-3" type="radio" name="star" value="3"/>
                            <label class="star star-3" for="star-3"></label>
                            <input class="star star-2" id="star-2" type="radio" name="star" value="2"/>
                            <label class="star star-2" for="star-2"></label>
                            <input class="star star-1" id="star-1" type="radio" name="star" value="1"/>
                            <label class="star star-1" for="star-1"></label>
                            </form>
                        </div>
                        <div className="box-name">
                            <input type="text" placeholder="Nhập tên sẽ hiển thị khi đánh giá"/>
                        </div>
                        <div className="box-content">
                            <textarea placeholder="Nhập đánh giá của bạn về sản phẩm"/>
                        </div>
                        <div className="box-button">
                            <button onClick={sendComment}><p>GỬI NHẬN XÉT</p></button>
                        </div>
                    </div>
                </div>
            }  
            {showToastComment===true &&
                <div className='toast toast-login' onClick={(e)=>clickClose(e)}>
                    <div className='toast-icon'>
                    <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>SUCCESS</h3>
                    <p className='toast-msg'>Viết đánh giá thành công</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            {showToastCart===true &&
                <div className='toast toast-login' onClick={(e)=>clickClose(e)}>
                    <div className='toast-icon'>
                    <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>SUCCESS</h3>
                    <p className='toast-msg'>Thêm vào giỏ hàng thành công</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            <div className="grid wide container-product">  
                <div className="row product">
                    <div className="col l-5 m-12 c-12 product-image">
                        <div className="row">
                            <div className="col1 col l-3 m-3 c-3">
                                <img src={`${product.image}`}
                                    onClick={(e)=>handleClickPreview(e.target.src)}  
                                     />
                                <img src={`${product.image}`} 
                                    onClick={(e)=>handleClickPreview(e.target.src)} 
                                    />
                                <img src={`${product.image}`} 
                                    onClick={(e)=>handleClickPreview(e.target.src)} 
                                />
                            </div>
                            <div className="col2 col l-9 m-9 c-9">
                                <img src={`${product.image}`}></img>
                            </div>
                        </div>
                        <div className="row">
                            <button onClick={()=>handleCart()}>
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
                            <p>{product.cost}đ</p>
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

                    <div className="col l-6 button-comment">
                        {checkLogin===false && 
                            <p>Chỉ có thành viên mới có thể viết nhận xét.Vui lòng <span onClick={clickSignIn}>đăng nhập</span> hoặc <span onClick={clickSignUp}>đăng ký</span>.</p>
                        }
                        {checkLogin===true &&
                            <div onClick={clickButton}>
                                <button>
                                    <div>
                                        <i className="fa-solid fa-pen"></i>
                                        <p>Viết đánh giá</p>
                                    </div>
                                </button>
                            </div> 

                        }
                    </div>
                </div>

                <div className="row title-comment">
                    <div className="col l-12">
                        <h1 style={{paddingLeft:'12px',marginBottom:'20px'}}>Đánh giá<span>({product.comment?.length})</span></h1>                     
                    </div>
                </div>
                <div className="container-comment">
                    {product.comment?.length ===0 && 
                        <h1 style={{paddingLeft:'12px', color:'red'}}>Chưa có đánh giá nào</h1>
                    }
                    {product.comment?.map((comment,index)=>{
                        return(
                            <div key={index}  >
                                <div className="row comment">
                                    <div className="col l-2 name">
                                        {comment.name}
                                    </div>
                                    <div className="col l-10 content">
                                        <div className="row">
                                            <div className="stars-outer">
                                                <div className="stars-inner" style={{width:`${comment.rating*20}%`}}></div>
                                            </div>
                                        </div>
                                        <div className="row" style={{marginTop:'15px'}}>
                                            <p>
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{height:'2px',width:'70%',backgroundColor:'rgb(204,204,204)',margin:'0 auto',marginBottom:'20px'}}>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Product;