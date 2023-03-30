import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import {getFirestore,collection,query,getDoc,getDocs,doc,setDoc} from "@firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function PlanScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const db = getFirestore()
    const [subscription, setSubscription] = useState(null)
    const [showPopup, setShowPopup] = useState(false);
    const [popupPrice, setPopupPrice] = useState(null);

    useEffect(() => {
        async function getSubscription() {
            const subscriptionRef = doc(db, "customers", user.uid, "subscriptions", "current");
            const docSnapshot = await getDoc(subscriptionRef);
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setSubscription({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    current_period_end: new Date(data.current_period_end.toDate()),
                    current_period_start: new Date(data.current_period_start.toDate()),
                });
            }
        }

        if (user.uid) {
            getSubscription();
        }
    }, [db, user?.uid]);

    useEffect(() => {
        async function getProducts() {
            const productQuery = query(collection(db, "products"));
            const querySnapshot = await getDocs(productQuery);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    price: doc.data().price,
                });
            });
            setProducts(products);
        }
        getProducts();
    }, []);

    async function loadCheckout(price) {
        setShowPopup(true);
        setPopupPrice(price);

        const subscriptionRef = doc(db, "customers", user.uid, "subscriptions", "current");
        const docSnapshot = await getDoc(subscriptionRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const currentDate = new Date();
            const thirtyDaysFromNow = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // add 30 days to the current date in milliseconds

            await setDoc(doc(db, "customers", user.uid, "subscriptions", `history/${data.current_period_end.toMillis()}`), {
                name: data.name,
                description: data.description,
                price: data.price,
                current_period_start: data.current_period_start,
                current_period_end: data.current_period_end,
            });

            await setDoc(subscriptionRef, {
                name: price.name,
                description: price.description,
                price: price.price,
                current_period_start: currentDate,
                current_period_end: thirtyDaysFromNow,
            });
        } else {
            const currentDate = new Date();
            const thirtyDaysFromNow = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // add 30 days to the current date in milliseconds

            await setDoc(subscriptionRef, {
                name: price.name,
                description: price.description,
                price: price.price,
                current_period_start: currentDate,
                current_period_end: thirtyDaysFromNow,
            });
        }

        setSubscription({
            name: price.name,
            description: price.description,
            price: price.price,
            current_period_start: new Date(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
    }

    return (
        <div className="planScreen">
            <br />
            {subscription && <p>
                Renewal Date: {new Date(subscription.current_period_end ).toLocaleDateString()}
            </p>}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = subscription && subscription.name?.toLowerCase().includes(productData.name?.toLowerCase());
                return (
                    <div className={`${isCurrentPackage && "planScreen_pan-disabled"} planScreen_pan`} key={productId}>
                        <div className="planScreen_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData)}>{isCurrentPackage ? 'Current Package' : 'Subscribe'}</button>
                    </div>
                );
            })}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={() => setShowPopup(false)}>
                            &times;
                        </span>
                        <p>{popupPrice && `You will be charged $${popupPrice.price}`}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlanScreen
