import React, { useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Space } from 'antd';
import { GlassMagnifier } from 'react-image-magnifiers'
import { fetchProduct } from "../../redux/PRODUCTS/productAction";


import {
    Row,
    Col,
    Image,
    Button,
    ListGroup,
    Card,
    Container,
    ButtonGroup,
    Spinner

} from "react-bootstrap";
import ProductCard from "../Map component/ProductCard";
import { addToCart } from "../../redux/CARTSTORE/cartAction";

function ProductVIewPage() {
    const [previewSource, sestPreviewSource] = useState('');
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedSizeWarning, setSelectedSizeWarning] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate()



    const { Text } = Typography;
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);
    const {userActive} = useSelector(state => state.user)
    const[showHereProducts,setShowHereProducts]=useState('')

    const { loading: addLoading} = useSelector(state => state.cart)


    // Add to bag handler
   function addToBagHandler() {



        if(!userActive){
            return navigate('/cart')
        }
        if (!selectedSize) {
            return setSelectedSizeWarning(true)

        }
        setSelectedSizeWarning(false)
        const product = id
        const size = selectedSize
        const price = showProducts.price
        const cartItems = { product, size, price }
        
       dispatch(addToCart(cartItems))

        console.log();

      




    }
    const showProducts = product.find((p) => p._id === id);


  useEffect(()=>{
    if(!product) return
    let subProducts=[]
subProducts=product.filter(value=>value.category===showProducts.category)

setShowHereProducts(subProducts)
// eslint-disable-next-line
  },[product])


    useEffect(() => {
        dispatch(fetchProduct());
        // showProducts && sestPreviewSource(showProducts?.ImageUrl[0].img);
    }, [dispatch, id]);

    

    return (
        <>

            <Container>
                {showProducts && (
                    <Row className="mt-5">
                        <Col md={5}>
                            <Row>
                                <Col md={2}>
                                    <Row>
                                        <Image
                                            className="short-image my-2"
                                          sm={2} md={12}
                                            as={Col}
                                            src={showProducts?.imageUrl[0].img}
                                            onMouseOver={(e) => {
                                                sestPreviewSource(e.target.src);
                                            }}
                                            alt="smallproductimge"
                                            fluid
                                        />






                                        <Image
                                         sm={2} md={12}
                                            className="short-image my-2"
                                            onMouseOver={(e) => {
                                                sestPreviewSource(e.target.src);
                                            }}
                                           
                                            as={Col}
                                            src={showProducts?.imageUrl[1].img}
                                            alt="smallproductimge"
                                        />
                                        <Image
                                         sm={2} md={12}
                                            className="short-image"
                                            onMouseOver={(e) => {
                                                sestPreviewSource(e.target.src);
                                            }}
                                           
                                            as={Col}
                                            src={showProducts?.imageUrl[2].img}
                                            alt="small product imge my-2"
                                            fluid
                                        />
                                        <Image
                                         sm={2} md={12}
                                            className="short-image my-2"
                                            onMouseOver={(e) => {
                                                sestPreviewSource(e.target.src);
                                            }}
                                            as={Col}
                                            src={showProducts?.imageUrl[3].img}
                                            alt="small product imge"
                                            fluid
                                        />
                                    </Row>
                                </Col>
                                <Col md={10}>
                                    <Card className="p-1" style={{ height: "inherit" }}>
                                        {/* <i className="fas fa-heart ml-auto "></i> */}{" "}
                                        {/* <Image
                                            style={{ height: "100%", width: "100%" }}
                                            src={previewSource}
                                            alt="small product imge"
                                            fluid
                                        /> */}


                                        <div style={{ height: "100%", width: "100%", objectFit: 'contain' }}>



                                            <GlassMagnifier
                                                imageSrc={previewSource?previewSource:showProducts?.imageUrl[0].img}
                                                imageAlt={'show product'}
                                                magnifierBorderSize={1}
                                                magnifierSize={'50%'}
                                                square={true}
                                            />

                                        </div>
                                    </Card>
                                    <Row className='m-3 d-flex'>

                                        

                                            {/* <Button disabled={showProducts.quantity === 0} variant='danger' className='mx-1' ><i className="fas fa-running  mx-2" ></i> Buy Now</Button> */}


                                            {addLoading ? <Spinner animation="grow" variant="warning" /> :
                                                <Button disabled={showProducts.quantity === 0} variant='warning' className='mx-1' onClick={addToBagHandler}> <i className="fas fa-shopping-bag mx-2" ></i>  Add To Bag</Button>}
                                       

                                    </Row>
                                </Col>
                            </Row>

                        </Col>
                        <Col md={7}>
                            <ListGroup>
                                <h3 as={Col}  >
                                    {showProducts.name}
                                </h3>
                                <h6 className="mb-2 text-muted">{showProducts.category} <small> {showProducts.subCat}</small> </h6>
                                <Col className='d-flex'>
                                    <Space direction="horizontal">
                                        <h2>₹ {showProducts.price}</h2>
                                        <Text delete className=' ms-1'><b>₹ 1299 </b> </Text>
                                        <Text type="success" className=' ms-1'><b>80% </b></Text>
                                    </Space>
                                </Col>
                                <ListGroup.Item>
                                    <h5>Product Description</h5>
                                    <p>{showProducts.description}</p>
                                </ListGroup.Item>

                                {showProducts.quantity > 0 ? <h4 className=' ms-1 my-3'><b>{`Only ${showProducts.quantity} left, Please hurry!`}</b></h4> : <Text type="danger" className=' ms-1'><b>sorry,No stocks left</b></Text>}
                            </ListGroup>
                            <ListGroup>

                                <ListGroup.Item  >
                                    <h4 >Select size </h4>

                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="outline-warning" value='small' onClick={(e) => { setSelectedSize(e.target.value) }}>small</Button>
                                        <Button variant="outline-danger" value='medium' onClick={(e) => { setSelectedSize(e.target.value) }}>medium</Button>
                                        <Button variant="outline-info" value='large' onClick={(e) => { setSelectedSize(e.target.value) }}>large</Button>
                                    </ButtonGroup>

                                    {selectedSize && <h6 className='m-3' style={{ color: 'pink' }}>selected {selectedSize}</h6>}
                                    {selectedSizeWarning && <h5 className='m-3' style={{ color: 'red' }}>Select a size</h5>}

                                </ListGroup.Item>
                            </ListGroup>

                        </Col>
                    </Row>


                )}

<section>
<Row className='my-4'>
  <Row><Col>  <h3>Similar Products for {showProducts?.category}</h3></Col></Row>
{showHereProducts&&showHereProducts.map((values,i)=>{
   return  <Col sm={12} md={6} lg={4} xl={3} key={i}>

    <ProductCard product={values} key={values._id}/>
    </Col>
            })}
</Row>
</section>

            </Container>
        </>
    );
}

export default ProductVIewPage;
