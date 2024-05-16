import { useEffect, useState } from "react";
import { getToken } from "../../storage/loginedToken";
import axios from 'axios';
import { Link } from "react-router-dom";

const PaymentHistory = () => {

    const [orderInfo, setOrderInfo] = useState([]);
    const [refundInfo, setRefundInfo] = useState();
    const [acceptInfo, setAcceptInfo] = useState();
    const [cancelInfo, setCancelInfo] = useState();
    const [temp, setTemp] = useState(false);


    useEffect(() => {
        axios_getPaymentHistory();
    }, [temp]);

    useEffect(() => {
        if (refundInfo && refundInfo.p_no && refundInfo.o_id) {
            axios_refund_order();
        }
    }, [refundInfo]);

    useEffect(() => {
        if (acceptInfo && acceptInfo.p_no && acceptInfo.o_id) {
            axios_accept_order();
        }
    }, [acceptInfo]);

    useEffect(() => {
        if (cancelInfo && cancelInfo.p_no &&cancelInfo.o_id) {
            axios_cancel_order();
        }
    }, [cancelInfo]);

    const refundProduct = (p_no, o_id) => {
        const refund = {
            'p_no': p_no,
            'o_id': o_id
        };
        setRefundInfo(refund);
    };

    const acceptPayment = (p_no ,o_id) => {
        const accept = {
            'o_id': o_id,
            'p_no': p_no
        };
        setAcceptInfo(accept);
    }

    const cancelPayment = (p_no, o_id) => {
        const cancel = {
            'o_id': o_id,
            'p_no' : p_no
        };
        setCancelInfo(cancel);
    }


    const axios_getPaymentHistory = async () => {
        let u_no = getToken('loginedUNo');
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getPaymentHistory", {
                'u_no': u_no,
            })
            console.log("💝💝", response.data.orders);

            setOrderInfo(response.data.orders);
        } catch (error) {
            console.log(error)
        }
    };

    const axios_refund_order = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/refundOrder", {
                'refundInfo': refundInfo
            })
            console.log("성공", response.data);
            setTemp((temp) => !temp);
            alert('주문 상태 바꾸기 성공');
        } catch (error) {
            console.log(error)
        }
    };

    const axios_accept_order = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/acceptOrder", {
                'acceptInfo': acceptInfo
            })
            console.log("성공", response.data);
            setTemp((temp) => !temp);
            alert('구매 확정 바꾸기 성공');
        } catch (error) {
            console.log(error)
        }
    };

    const axios_cancel_order = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/cancelOrder", {
                'cancelInfo': cancelInfo
            })
            console.log("성공", response.data);
            setTemp((temp) => !temp);
            alert('구매 취소 바꾸기 성공');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='content-wrap' id="payment_history_wrap">
            <h2 className='title'>결제 내역</h2>
            <div id="payment_total_wrap">
                <div className='content ingredient-cart-wrap'>
                    {Object.keys(orderInfo).map((order) => (
                        <div key={order}>
                            <div className="ingredient-payment-history">
                                <div>
                                    <p>주문 번호: {order}</p>
                                </div>
                                <div>
                                    <p>주문 시간: {orderInfo[order][Object.keys(orderInfo[order])[0]].o_reg_date}</p>
                                </div>
                            </div>
                            <div className="ingredient-cart-item">
                                {Object.keys(orderInfo[order]).map((prod, orderIdx) => {
                                    let item = orderInfo[order][prod];
                                    return (
                                        <div key={`${order}_${item.p_no}`} className="payment-history-check">
                                            <img className="ingredient-cart-img" src={`/imgs/product/${item.PROD_IMG}`} />
                                            <div>
                                                <span>이름: {item.PROD_NAME}</span>
                                            </div>
                                            <div>
                                                <span>수량: {item.o_count}개</span><br />
                                                <span>단위: {item.DSBN_STEP_ACTO_WT}{item.DSBN_STEP_ACTO_UNIT_NM}</span>
                                            </div>
                                            <div>
                                                <span>가격: {item.o_final_price.toLocaleString()}원</span>
                                            </div>
                                            <div className="ingredient-cart-btn">
                                                {item.o_s_no === 1 || item.o_s_no === 6 ? <button onClick={() => refundProduct(item.p_no, item.o_id)}>환불 요청</button> : null}
                                                <Link to={`/market/payment_detail/${item.o_id}`}>
                                                    상세 보기
                                                </Link>
                                                <p>주문 상태: {item.o_s_name}</p>
                                                {item.o_s_no === 0 ? <button onClick={() => cancelPayment(item.p_no, item.o_id)}>구매 취소</button> : ''}
                                                {item.o_s_no === 0 || item.o_s_no === 1 || item.o_s_no === 6 ? <button onClick={() => acceptPayment(item.p_no, item.o_id)}>구매 확정</button> : ''}
                                            </div>
                                        </div>
                                    );
                                })}
                            <div className="ingredient-cart-btn">
                            </div>
                            </div>
                            <p>총 가격: {Object.values(orderInfo[order]).reduce((total, item) => total + item.o_final_price, 0).toLocaleString()}원</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default PaymentHistory;