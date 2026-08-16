import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const PaymentPage = ({ LoggedIn }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;
    const cart = location.state?.cart || null;

    const [items, setItems] = useState(cart?.books || []);
    const [total, setTotal] = useState(cart?.total || 0);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Load cart if it wasn't passed through navigation
    useEffect(() => {
        const fetchCart = async () => {
            if (items.length > 0 || !LoggedIn) {
                return;
            }

            try {
                const token = localStorage.getItem("authToken");

                if (!token) {
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/cart/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setItems(response.data.books || []);
                setTotal(response.data.total || 0);

            } catch (err) {
                console.log(
                    "Fetch cart error:",
                    err.response?.data || err.message
                );
            }
        };

        fetchCart();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Load Razorpay Checkout
    // useEffect(() => {
    //     const loadRazorpay = () => {
    //         return new Promise((resolve) => {
    //             if (window.Razorpay) {
    //                 resolve(true);
    //                 return;
    //             }

    //             const script = document.createElement("script");
    //             script.src =
    //                 "https://checkout.razorpay.com/v1/checkout.js";

    //             script.onload = () => resolve(true);
    //             script.onerror = () => resolve(false);

    //             document.body.appendChild(script);
    //         });
    //     };

    //     loadRazorpay();
    // }, []);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePay = async (e) => {
    e.preventDefault();

    if (!LoggedIn) {
        setErrorMsg("Please sign in to continue.");
        return;
    }

    if (items.length === 0) {
        setErrorMsg("Your cart is empty.");
        return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setErrorMsg("Please sign in to continue.");
            setLoading(false);
            return;
        }

        const checkout = await axios.post(
            `${API_URL}/payment/checkout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const loaded = await loadRazorpay();
        if (!loaded) {
            setErrorMsg("Could not load Razorpay checkout.");
            setLoading(false);
            return;
        }

        const rzp = new window.Razorpay({
            key: checkout.data.key,
            amount: checkout.data.amount,
            currency: checkout.data.currency,
            order_id: checkout.data.orderId,
            handler: async (response) => {
                try {
                    await axios.post(
                        `${API_URL}/payment/verify`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    setSuccessMsg("Payment verified. Unlocking books shortly.");
                    setTimeout(() => {
                        navigate("/library");
                    }, 1000);
                } catch (err) {
                    setErrorMsg(err.response?.data?.message || "Payment verification failed.");
                } finally {
                    setLoading(false);
                }
            },
            modal: {
                ondismiss: () => setLoading(false),
            },
        });

        rzp.open();
    } catch (err) {
        setErrorMsg(err.response?.data?.message || "Checkout failed.");
        setLoading(false);
    }
};

    return (
        <div className="payment-page">
            <div className="payment-container">

                <h2 className="payment-title">
                    Complete Payment
                </h2>

                <div className="payment-grid">

                    {/* ORDER SUMMARY */}
                    <div className="payment-items">
                        <h3>Order Summary</h3>

                        {items.length === 0 ? (
                            <p className="muted">
                                Your cart is empty.
                            </p>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item.bookId}
                                    className="payment-item"
                                >
                                    <img
                                        src={item.coverImage}
                                        alt={item.title}
                                    />

                                    <div className="payment-item-info">
                                        <p className="payment-item-title">
                                            {item.title}
                                        </p>

                                        <p className="payment-item-author">
                                            {item.author}
                                        </p>
                                    </div>

                                    <div className="payment-item-price">
                                        ₹{item.price}
                                    </div>
                                </div>
                            ))
                        )}

                        <div className="payment-total">
                            <span>Total</span>
                            <strong>₹{total}</strong>
                        </div>
                    </div>

                    {/* PAYMENT FORM */}
                    <form className="payment-form" onSubmit={handlePay}>
                        <h3>Pay with Razorpay</h3>
                        <p className="payment-note">
                            Card details are collected securely in Razorpay checkout. This does not unlock books until the payment is confirmed.
                        </p>

                        {errorMsg && (
                            <div className="payment-error">{errorMsg}</div>
                        )}

                        {successMsg && (
                            <div className="payment-success">{successMsg}</div>
                        )}

                        <button
                            className="cart-payment-button"
                            type="submit"
                            disabled={loading || items.length === 0}
                        >
                            {loading ? "Processing..." : `Pay ₹${total}`}
                        </button>

                        <button
                            type="button"
                            className="payment-cancel"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;