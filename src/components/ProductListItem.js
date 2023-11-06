import React from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 방법1: 스타일드 컴포넌트로 스타일 확장
const StyeldCol = styled(Col)`
  cursor: pointer;
`

// 방법2: GlobalStyled에 공통 스타일로 작성 후 className으로 속성 추가

function ProductListItem(props) {
  const { prod } = props;
  const { imagePath, title, price, id } = prod;

  const navigate = useNavigate();

  return (


    <Col md={4} className='cursor-pointer'>
      {/* Quiz: 
        1) 반복적인 상품 아이템을 src/components/ProductListItem 컴포넌트로 만들기
        2) productList 배열을 반복하며 ProductListItem 컴포넌트를 렌더링 하기
        3) 상품 정보를 props로 넘겨서 데이터 바인딩 하기
      */}
      <img src={imagePath} width="80%"
        // 상품 클릭 시 이동 경로 설정하기
        onClick={() => {
          // /detail/해당상품  id
          navigate(`/detail/${id}`)
        }} />
      <h4>{title}</h4>
      <p>{price}</p>
    </Col>
  );
}

export default ProductListItem;

