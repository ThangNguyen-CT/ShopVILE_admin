import { createRouter, createWebHistory } from "vue-router";
const routes = [{
        path: "/users",
        name: "users",
        component: () =>
            import ("@/views/users.vue"),
    },
    {
        path: "/",
        name: "products",
        component: () =>
            import ("@/views/products.vue"),
    },
    {
        path: "/order",
        name: "order",
        component: () =>
            import ("@/views/orders.vue"),
    },
    {
        path: "/order-details",
        name: "order-details",
        component: () =>
            import ("@/views/order_details.vue"),
    },
    {
        path: "/addproduct",
        name: "addproduct",
        component: () =>
            import ("@/views/add_product.vue"),
    },
    {
        path: "/editproduct/:id",
        name: "editproduct",
        component: () =>
            import ("@/views/edit_product.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/login.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () =>
            import ("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});

export default router;