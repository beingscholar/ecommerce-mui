/* LOCAL ENV */

/* const LOCAL_ENV = "http://0.0.0.0:5000";
export const CUSTOMER_URL = LOCAL_ENV + "/customers";
export const CART_API_URL = LOCAL_ENV + "/carts";
export const PRODUCT_API_URL = LOCAL_ENV + "/products";
export const ORDER_API_URL = LOCAL_ENV + "/orders"; 
export const INVENTORY_URL = LOCAL_ENV + "/inventory"; */


/* PROD ENV */
const PROD_ENV =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com";

export const CUSTOMER_URL = PROD_ENV + "/customers";
export const CART_API_URL = PROD_ENV + "/carts";
export const PRODUCT_API_URL = PROD_ENV + "/products";
export const ORDER_API_URL = PROD_ENV + "/orders";
export const INVENTORY_URL = PROD_ENV + "/inventory";
export const PAYMENT_API_URL = PROD_ENV + "/payments";
export const S3_BUCKET_URL =
  "https://react-customer-images.s3-ap-southeast-1.amazonaws.com";


export const STRIPE_API_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx'