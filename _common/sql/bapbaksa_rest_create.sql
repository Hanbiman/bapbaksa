-- REST
--CREATE DATABASE REST;
--USE REST;

DROP TABLE IF EXISTS REFRIGERATOR;
CREATE TABLE REFRIGERATOR(
    RF_NO		INT			NOT NULL,
    RF_NAME		VARCHAR(40)	NOT NULL,
    PRIMARY KEY(RF_NO)
);

DROP TABLE IF EXISTS PRODUCT;
CREATE TABLE PRODUCT(
    PROD_NO					INT			AUTO_INCREMENT,
    PROD_YMD				INT 		NOT NULL,
    PROD_CODE				INT			NOT NULL,
    PROD_NAME				VARCHAR(40)	NOT NULL,
    PROD_SPCS_CODE			INT			NOT NULL,
    PROD_SPCS_NAME			VARCHAR(40)	NOT NULL,
    PROD_AVRG_PRCE			INT			NOT NULL,
    PROD_GRAD_CODE			INT			NOT NULL,
    PROD_GRAD_NAME			VARCHAR(10)	NOT NULL,
    DSBN_STEP_ACTO_UNIT_NM	VARCHAR(10)	NOT NULL,
    DSBN_STEP_ACTO_WT		INT			NOT NULL,
    TDY_LWET_PRCE			VARCHAR(10)	NOT NULL,
    TDY_MAX_PRCE			VARCHAR(10)	NOT NULL,
    PRIMARY KEY(PROD_NO)
);

DROP TABLE IF EXISTS RECIPE_BASIC;
CREATE TABLE RECIPE_BASIC(
    RECP_CODE			INT				NOT NULL,
    RECP_NAME			VARCHAR(100)	NOT NULL,
    RECP_INTRO			VARCHAR(1000)	NOT NULL,
    RECP_REGION_CODE	INT				NOT NULL,
    RECP_REGION_NAME	VARCHAR(30)		NOT NULL,
    RECP_CATEGORY_CODE	INT				NOT NULL,
    RECP_CATEGORY_NAME	VARCHAR(80)		NOT NULL,
    RECP_TIME			VARCHAR(80),
    RECP_KCAL			VARCHAR(80)		DEFAULT '-',
    RECP_SERVIN			VARCHAR(60),
    RECP_DIFFICULT		VARCHAR(40),
    RECP_MAIN_IMG		VARCHAR(1200),
    PRIMARY KEY(RECP_CODE)
);

DROP TABLE IF EXISTS RECIPE_INGREDIENT;
CREATE TABLE RECIPE_INGREDIENT(
    RECP_CODE				INT 		NOT NULL,
    RECP_INGRD_ORDER_NO		INT 		NOT NULL,
    RECP_INGRD_NAME			VARCHAR(60)	NOT NULL,
    RECP_INGRD_CODE			INT			DEFAULT 0,
    RECP_INGRD_PORTIONS		VARCHAR(60)	NOT NULL,
    RECP_INGRD_TYPE			INT,
    RECP_INGRED_TYPE_NAME	VARCHAR(30)
);

DROP TABLE IF EXISTS RECIPE_PROGRESS;
CREATE TABLE RECIPE_PROGRESS(
    RECP_CODE				INT				NOT NULL,
    RECP_ORDER_NO			INT				NOT NULL,
    RECP_ORDER_DETAIL		VARCHAR(1000)	NOT NULL,
    RECP_ORDER_IMG			VARCHAR(1000),
    RECP_ORDER_TIP			VARCHAR(1000)
);

DROP TABLE IF EXISTS RECIPE_REGION;
CREATE TABLE RECIPE_REGION (
    RECP_REGION_CODE INT,
    RECP_REGION_NAME VARCHAR(30)
);

DROP TABLE IF EXISTS RECIPE_CATEGORY;
CREATE TABLE RECIPE_CATEGORY (
    RECP_CATEGORY_CODE INT,
    RECP_CATEGORY_NAME VARCHAR(80)
);