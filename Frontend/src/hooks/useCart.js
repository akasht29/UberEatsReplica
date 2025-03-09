import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/actions/cartActions";

const useCart = () => {
  console.log("useCart");
  const dispatch = useDispatch();

  const cartList = useSelector((state) => state.cartList);
  const { loading, cart, error } = cartList;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return { loading, cart, error };
};

export default useCart;
