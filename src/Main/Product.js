/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

function Product(props){
    const productId= props.productId
    const usedispatch = useDispatch()
    const [comment, setComment] = useState(0)
    const data = useSelector(state => state.setInfor)
    const idUser = useSelector(state => state.idUser)
    const cart = useSelector(state => state.cart)
    const idCart = useSelector(state => state.idCart)
    const [product, setProduct]= useState([])
    const [showToastComment,setShowToastComment] = useState(false)
    const [showToastCommentFailed,setShowToastCommentFailed] = useState(false)
    useLayoutEffect(()=> {
        async function fetchHomeList (){
            const requestUrl = `http://localhost:3000/book/${productId}`
            const response = await fetch(requestUrl)
            const responseJson = await response.json()
            setProduct(responseJson)
        }
        fetchHomeList()
    }, [comment])
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
    const [showToastCart,setShowToastCart] = useState(false)
    const [showToastCartFailed,setShowToastCartFailed] = useState(false)
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [rating , setRating] = useState(0)
    const [arrImage,setArrImage]=useState([])
    const [writeComment , setWriteComment] = useState(false)
    const [index,setIndex]=useState(0)
    const [preview,setPreview] = useState(false)
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

    const clickButton = () =>{
        setWriteComment(true)
    }
    const closeComment =() => {
        setWriteComment(false)
    }

    async function fetchPostComment (){
        const requestUrl = `http://localhost:3000/book/${productId}`
        const response = await fetch(requestUrl,{
          method:"put",
          body: JSON.stringify({
            ...product,
            comment:[...product.comment,
                {
                    "name": name,
                    "content": content,
                    "rating": Number(rating)
                }
            ]
          }),
          headers: {
            "Content-type":"application/json"
          }
        })
      }
    async function sendComment  ()  {
        const app = document.querySelector(".App")
        const loading = document.createElement('div')
        loading.classList.add("frostApp")
        loading.style.zIndex= 5
        loading.innerHTML=`<div class="loadingBx">
                            <div class="loading"></div>
                          </div>`
        app.appendChild(loading)
        if(rating === "" || name === "" || content ===""){
            app.removeChild(loading)
            setShowToastCommentFailed(true)
            setTimeout(()=>{
                setShowToastCommentFailed(false)
            },4000)
            console.log("ABC");
        }
        else{
            await fetchPostComment()
            setWriteComment(false)
            app.removeChild(loading)
            setShowToastComment(true)
            setTimeout(()=>{
                setShowToastComment(false)
            },4000)
            setComment(comment+1)
            setName("")
            setRating("")
            setContent("")
        }
    }

    async function handleCart () {
        if(checkLogin === true){
            dispatch({"type":"addCart"})
            const app = document.querySelector(".App")
            const loading = document.createElement('div')
            loading.classList.add("frostApp")
            loading.style.zIndex= 5
            loading.innerHTML=`<div class="loadingBx">
                                <div class="loading"></div>
                            </div>`
            app.appendChild(loading)
            if(amount > (product.total - product.sale)){
                app.removeChild(loading)
                setShowToastCartFailed(true)
                setTimeout(()=>{
                    setShowToastCartFailed(false)
                },4000)
            }
            else{
                async function a(){
                    const dataTemp =  {
                        ...product,
                        id: idCart,
                        idProduct: product.id,
                        image:product.image,
                        name : product.name,
                        amount:amount,
                        cost: product.cost,
                        total: amount*(Number(product.cost.replace('.','')))
                    }
                    const userTemp={
                        ...idUser,
                        "information":{
                            ...idUser.information,
                            "cart":[...idUser.information.cart,dataTemp]
                        }
                    }
                    dispatch({"type":"addProduct","payload":dataTemp})   
                    dispatch({'type':"getIdUser","payload":userTemp})
                }
                await a()
                await fetchChangeCart()
                app.removeChild(loading)
                setShowToastCart(true)
                setTimeout(()=>{
                    setShowToastCart(false)
                },4000)
            }
        }
        if(checkLogin=== false){
            dispatch({"type":'setShowForm'})
        }
    }
    async function fetchChangeCart (){
        const requestUrl = `http://localhost:3000/user/${idUser.id}`
        const response = await fetch(requestUrl,{
          method:"put",
          body: JSON.stringify({
            ...idUser,
            "information":{
                ...idUser.information,
                cart : [...cart,{
                    ...product,
                    id: idCart,
                    idProduct : product.id,
                    image:product.image,
                    name : product.name,
                    amount:amount,
                    cost: product.cost,
                    total: amount*(Number(product.cost.replace('.','')))
                }]
            }
          }),
          headers: {
            "Content-type":"application/json"
          }
        })
    }

    const clickPreview = ()=>{
        setPreview(true)
    }
    const closePreview =() =>{
        setPreview(false)
    }
    const clickClose=(e)=>{
        if(e.target.closest('.toast-close')){
          let a = document.querySelector('.toast')
          a.style.animation = 'slideInRight ease 1s forwards'
          setTimeout(()=>{
            setShowToastComment(false)
            setShowToastCart(false)
            setShowToastCommentFailed(false)
          },1000)
        }
    }
    const Next = () => {
        if(index===arrImage.length-1){
            setIndex(0)
        }
        else{
            setIndex(prev => prev +1)
        }
    }
    const Prev = () => {
        if(index===0){
            setIndex(prev => arrImage.length-1)
        }
        else{
            setIndex(prev => prev -1)
        }
    }
    useLayoutEffect(()=>{
        setArrImage(product.preview)
    },[product])

    
    return(
        <div className="main-product">
            {preview === true && 
                <div className="click-preview ">
                    <div className="grid wide" style={{marginTop:'20px'}}>
                        <div className="row" style={{backgroundColor:'#333',position:'relative'}}>
                            <div className="col l-8 l-o-2 m-8 m-o-2 c-8 c-o-2" style={{}}>
                                <h1 style={{textAlign:'center',fontFamily:'Arial',color:'tomato',fontSize:'25px',lineHeight:'1.17'}}>Preview {product.name}</h1>
                            </div>
                            <div style={{position:"absolute",color:"white",top:'40%',right:'2%',fontSize:'25px'}}>
                                <i className="fa-solid fa-circle-xmark" style={{cursor:'pointer'}}
                                    onClick={closePreview} 
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-12 m-12 c-12" style={{backgroundColor:"#000000",height:'650px',position:'relative'}}>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <i className="fa-solid fa-circle-chevron-left" 
                                        onClick={Prev}
                                        style={{color:"white",position:'absolute',top:'50%',left:'5%',fontSize:'50px',cursor:'pointer'}}></i>
                                    <img src={`${arrImage[index]}`} style={{height:'650px'}}/>
                                    <i className="fa-solid fa-circle-chevron-right" 
                                        onClick={Next}
                                        style={{color:"white",position:'absolute',top:'50%',right:'5%',fontSize:'50px',cursor:'pointer'}}></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-12 m-12 c-12" style={{backgroundColor:"#333",height:'50px'}}>
                                <div id="dem" style={{height:'50px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <h1 style={{color:'white',fontSize:'17px'}}>{index+1}/{arrImage.length}</h1>
                                </div>
                            </div>
                        </div>
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
                        <div className="stars">
                            <form id="form" name="rating" 
                                onChange={()=>{
                                    const ele = document.forms.form["star"];
                                    setRating(ele.value)
                                }}
                            >
                            <input className="star star-5" id="star-5" type="radio" name="star" value="5"/>
                            <label className="star star-5" htmlFor="star-5"></label>
                            <input className="star star-4" id="star-4" type="radio" name="star" value="4"/>
                            <label className="star star-4" htmlFor="star-4"></label>
                            <input className="star star-3" id="star-3" type="radio" name="star" value="3"/>
                            <label className="star star-3" htmlFor="star-3"></label>
                            <input className="star star-2" id="star-2" type="radio" name="star" value="2"/>
                            <label className="star star-2" htmlFor="star-2"></label>
                            <input className="star star-1" id="star-1" type="radio" name="star" value="1"/>
                            <label className="star star-1" htmlFor="star-1"></label>
                            </form>
                        </div>
                        <div className="box-name">
                            <input type="text" placeholder="Nhập tên sẽ hiển thị khi đánh giá" onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className="box-content">
                            <textarea placeholder="Nhập đánh giá của bạn về sản phẩm" onChange={(e)=>setContent(e.target.value)}/>
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
            {showToastCartFailed===true &&
                <div className='toast toast-failed' onClick={(e)=>clickClose(e)}>
                    <div className='toast-icon'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>FAILED</h3>
                    <p className='toast-msg'>Sản phẩm này đã hết hàng</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            {showToastCommentFailed===true &&
                <div className='toast toast-failed' onClick={(e)=>clickClose(e)}>
                    <div className='toast-icon'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>FAILED</h3>
                    <p className='toast-msg'>Xin hãy nhập đủ thông tin</p>
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
                            <div className="col1 col l-3 m-3 c-3" title="Xem trước" onClick={clickPreview}>
                                <img src={`${(product?.preview || [])[0]}`} onClick={()=>setIndex(0)} style={{width:'100%'}}/>
                                <img src={`${(product?.preview || [])[1]}`} onClick={()=>setIndex(1)} style={{width:'100%'}}/>
                                <img src={`${(product?.preview || [])[2]}`} onClick={()=>setIndex(2)} style={{width:'100%'}}/>
                            </div>
                            <div className="col2 col l-9 m-9 c-9" style={{position:'relative'}}>
                                <img src={`${product.image}`}></img>
                                {product.sale === product.total &&
                                        <div style={{backgroundColor:'red',height:'40px',display:"flex",justifyContent:'center',position:'absolute',top:'0'}}>
                                            <h1 style={{padding:'0 10px',color:'white'}}>HẾT HÀNG</h1>
                                        </div>
                                }
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
                        <h1 style={{paddingLeft:'12px',marginBottom:'20px'}}>Bình luận<span> ({product.comment?.length})</span></h1>                     
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