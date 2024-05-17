const express = require("express");
const { get_user, get_all_users, modify_user, get_all_orders, get_order } = require("../lib/service/adminService");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("params", req.query);
});

router.get("/get_user", (req, res) => {
    console.log("params", req.query);

    if (req.query.u_no) {
        get_user(req, res);
    } else {
        get_all_users(req, res);
    }
});

router.put("/user", (req, res) => {
    console.log("111param", req.body);
    modify_user(req, res);
});


router.get("/get_order", (req, res) => {
    console.log("params", req.query);

    if (req.query.o_id) {
        get_order(req, res);
    } else {
        get_all_orders(req, res);
    }
});

module.exports = router;
