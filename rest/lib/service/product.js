const DB = require('../db/db');

const product = {
    getAllProduct: (req, res) => {
        console.log("getAllProduct");
        DB.query(`SELECT * FROM PRODUCT`, (error, result) => {
            if(error) {
                console.log(error);
                console.log("여긴 에러");
                res.json({
                    'PROD_NO': "000",
                });
            } else {
                console.log(result);
                console.log("여긴 성공");
                res.json(result);
            }
        });
    },
    getTwelveProduct: (req, res) => {
        console.log('getTwelveProduct');
        let moreList = req.query.moreList;
        console.log("+++++++++++++", moreList);

        DB.query(`SELECT * FROM PRODUCT LIMIT 12 OFFSET ?`,
            [parseInt(moreList)],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
    },
    postSelectedProduct: (req, res) => {
        console.log('postSelectedProduct');
        let prodNo = req.body.PROD_NO;

        DB.query(`SELECT * FROM PRODUCT WHERE PROD_NO = ?`, 
        [prodNo], 
        (error, result) => {
            if(error) {
                console.log(error);
                res.json(null);
            } else {
                console.log(result);
                res.json(result);
            }
        });
    },
    getSelectedProduct: (req, res) => {
        console.log("getSelectedProduct");
        let query = req.query;
        let prodNO = query[0].prod_no;
        if (prodNO >= 100 && prodNO < 200) {

            DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 100 AND PROD_CODE < 200`, 
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });

        } else if (prodNO >= 200 && prodNO < 400) {

            DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 200 AND PROD_CODE < 400`, 
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });

        } else if (prodNO >= 400 && prodNO < 500) {

             DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 400 AND PROD_CODE < 500`, 
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
            
        } else if (prodNO >= 500 && prodNO < 600) {

             DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 500 AND PROD_CODE < 600`, 
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
            
        } else if (prodNO >= 600 && prodNO < 700) {

            DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 600 AND PROD_CODE < 700`, 
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
            
        } else if (prodNO >= 700 && prodNO < 800) {

            DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 700 AND PROD_CODE < 800`, 
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
            
        } else if (prodNO >= 800 && prodNO < 900) {

            DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 800 AND PROD_CODE < 900`, 
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
            
        } else {
            res.json(null);
        }
    },
    getSearchedProduct: (req, res) => {
        let post = req.body;
        let prodName = post[0].prod_name;
        DB.query(`SELECT * FROM PRODUCT WHERE PROD_NAME LIKE '%?%`, 
        [prodName], 
        (error, result) => {
            if(error) {
                console.log(error);
                res.json(null);
            } else {
                res.json(result);
            }
        });
    },
    getChartData: (req , res) => {
        let code = req.body.code;
        console.log(code);

        DB.query(`SELECT PROD_YMD, PROD_AVRG_PRCE FROM PRODUCT WHERE PROD_CODE = ? ORDER BY PROD_YMD DESC`,
        [code], (error, data) => {
            if(error) {
                console.log(error);
                res.json(null);
            } else {
                console.log(data);
                res.json(data);
            }
        })
    }
}

module.exports = product;