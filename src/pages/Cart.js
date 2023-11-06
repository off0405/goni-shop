import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, removeItemFromCart, selectCartList } from '../features/cart/cartSlice';

function Cart(props) {
  const cartList = useSelector(selectCartList);
  const dispatch = useDispatch();

  const formatter = new Intl.NumberFormat('ko-KR');

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>

          {cartList.map((el, index) => {
            return (
              <tr key={cartList.id}>
                <td>{index + 1}</td>
                <td>{el.title}</td>
                <td>
                  <button onClick={() => { dispatch(decreaseCount(el.id)) }}>
                    -
                  </button>
                  {el.count}
                  <button onClick={() => { dispatch(increaseCount(el.id)) }}>
                    +
                  </button>
                </td>
                <td>{formatter.format(el.price * el.count)}원</td>
                <td>
                  {/* 표의 행마다 삭제 버튼 만들고 누르면 상품이 삭제되도록 만들기 */}
                  <button onClick={() => { dispatch(removeItemFromCart(el.id)) }}>삭제</button>
                </td>
              </tr>)
          })}


          <tr>
            <th>합계</th>
            <td></td>
            <td></td>
            <th>
              {formatter.format(cartList.reduce((prev, cart) => {
                return prev + (cart.price * cart.count);
              }, 0))}원
            </th>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Cart;