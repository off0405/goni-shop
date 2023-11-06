import React, { useEffect } from 'react';
// 리액트(JS)에서 이미지 파일 가져오기
import yonexImg from "../images/yonex.jpg";
import styled from 'styled-components';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addMoreProduct, getAllProducts, getMoreProductsAsync, selectProductList, selectStatus } from '../features/product/productSlice';
import ProductListItem from '../components/ProductListItem';
import { getMoreProducts } from '../api/productApi';
import { BounceLoader, FadeLoader, PacmanLoader } from "react-spinners";
import LatestView from '../components/LatestView';

const MainBackground = styled.div`
  height: 500px;
  background-image: url(${yonexImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledLoading = styled(FadeLoader)`
  margin: 0 auto;
  `

function Main(props) {
  const dispatch = useDispatch(); // 스토어에 보낼때
  const productList = useSelector(selectProductList); // 스토어에서 가져올때


  const status = useSelector(selectStatus); // api 요청 상태(로딩 상태 )를 담고 있어요

  // 처음 마운트 됐을 떄 서버에 상품 목록 데이터를 요청하고 
  // 그 결과를 Redux Store에 전역 상태로 저장
  useEffect(() => { // 메인 컴포넌트가 나왔을때 한번만 실행할게
    axios.get('https://my-json-server.typicode.com/off0405/db-shop/products')
      .then((response) => {
        dispatch(getAllProducts(response.data)); // 액션 생성 함수라서 괄호()쳐줘야 실행됨
      })
      .catch((err) => {
        console.error(err);
      })
    // 서버에 상품 목록 요청
  }, []);


  // 더보기 버튼 api
  const handleGetMoreProduct = async () => {
    const result = await getMoreProducts()
    dispatch(addMoreProduct(result));
  }

  const handleGetMoreProductAsync = () => {
    dispatch(getMoreProductsAsync(status));
  }



  return (
    <>
      {/* 메인 이미지 섹션 */}
      <section>
        <MainBackground />
        {/* <img src={yonexImg}/> 이미지 파일 가져와서 이미지 태그 안에 넣기 !*/}
      </section>

      {/* 상품 목록 레이아웃 섹션 */}
      <section>
        <Container>
          <Row>
            {/* 부트스트랩을 이용한 반응형 작업 */}
            {/* md ≥768px 이상에서 전체 12등분 중 4:4:4로 보여줌  */}
            {/* 참고: https://react-bootstrap.netlify.app/docs/layout/breakpoints */}
            {/* <Col md={4}>
              <img src='https://www.yonexmall.com/shop/data/goods/1645767865278s0.png' width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col>
            <Col md={4}>
              <img src='https://www.yonexmall.com/shop/data/goods/1645767865278s0.png' width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col>
            <Col md={4}>
              <img src='https://www.yonexmall.com/shop/data/goods/1645767865278s0.png' width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col> */}

            {/* ProductListItem 컴포넌트 만들어서 반복 렌더링으로 바꾸고 데이터 바인딩 */}
            {/* Quiz: 
              1) 반복적인 상품 아이템을 src/components/ProductListItem 컴포넌트로 만들기
              2) productList 배열을 반복하며 ProductListItem 컴포넌트를 렌더링 하기
              3) 상품 정보를 props로 넘겨서 데이터 바인딩 하기
            */}
            {productList.map((prod) => { return <ProductListItem key={prod.id} prod={prod} /> })}
            {/* 기존 배열의 요소를 이용해서 새로운 배열을 만드는데,,, 우리가 만드는 새로운 배열은
            [
                <ProductListItem key={prod.id} prod={prod} />,
                <ProductListItem key={prod.id} prod={prod} />,
                <ProductListItem key={prod.id} prod={prod} />,
            ]
            
            */}
          </Row>
        </Container>


        {/* 로딩 만들기 */}
        {status === 'loading' &&
          <div>
            <StyledLoading color="#36d7b7" />
          </div>}

        {/* 상품 더보기 기능 만들기 
          더보기 버튼 클릭 시 axios를 사용하여 데이터 요청
          받아온 결과를 전역 상태에 추가하기 위해 slice에 reducer 추가 및 export 
          스토어에 dispatch로 요청 보내기 */}
        {/* HTTP 요청 코드를 함수로 만들어서 api 폴더로 추출 */}
        <Button variant='secondary' className='mb-4' onClick={handleGetMoreProduct}>
          더보기
        </Button>

        {/* thunk 를 이용한 비동기 작업 처리하기  */}
        <Button variant='secondary' className='mb-4' onClick={handleGetMoreProductAsync}>
          더보기 {status}
        </Button>
      </section >

      {/* 최근 본 상품 컴포넌트 */}
      <LatestView />


    </>
  );
}

export default Main;


// 가짜(Fake) API 서버 만들기
// 실무와 비슷한 느낌으로 하기 위해 가짜(Fake) API 서버를 만들거임

// 1. json-server (혼자 CRUD 연습하기 좋음)
// 이 도구를 사용하면 json 파일 하나만 있으면 로컬에 연습용 서버를 쉽게 구성 할 수 있음
// (즉, 사용하려는 컴퓨터에서 매번 로컬 서버를 띄워야 함)

// json-server 사용법
// ./src/data.json 이라는 파일을 작성
// npx json-server ./src/data.json --port 4000
// 또는
// npm i -g json-server
// json-server --watch ./src/data.json --port 4000

// 더 자세한 사용법 참고
// https://github.com/typicode/json-server
// https://redux-advanced.vlpt.us/3/01.html

// 2. My JSON Server (Read만 가능)
// 이 서비스를 사용하면 GitHub와 연동하여 연습용 서버를 쉽게 구성 할 수 있음

// My JSON Server 사용법
// GitHub에 저장소 생성(<your-username>/<your-repo>)
// db.json파일 만들기
// 서버에 액세스하려면 https://my-json-server.typicode.com/<your-username>/<your-repo>를 방문
//  https://my-json-server.typicode.com/off0405/db-shop

// 사용 예
// https://my-json-server.typicode.com/geoblo/db-shop
// https://my-json-server.typicode.com/geoblo/db-shop/products
// https://my-json-server.typicode.com/geoblo/db-shop/products/1