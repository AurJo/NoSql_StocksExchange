# NoSQL _ Stocks Exchanges

> Connection and request on ElasticSearch

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The goal of this directory is to connect to ElasticSearch and to make queries on the dataset Stocks Exchange. 


## Installation 

* Lauch the server of ElasticSearch on port 9200
* Go to your repository
* Install the dependencies 
* Run the project


``` sh
> cd /path/NoSql_StocksExchange/backend-api
> npm install
> npm start
```
It opens the api on port 9696 and adding connection to http://localhost:9200/ (ElasticSearch)



## Usage

All records from StocksExchange are already index to ElasticSearch. 


You have __3 Endpoints__ to request the API. There return a JSON list : 
* __/company?mot=x__ : get all companies from the dataset where the name of company match with the parameter 'mot'. 
* __/comparaison?per=x&on=y__ : get a comparison per a first parameter (sector or country) on a second parameter (price, ROI...). It returns the average, the minimum and the maximum of this second parameter.  
* __/count?per=x__ : get the sum of companies per the parameter (sector or country)

<p align=center>
    <img src="../img/api_json.png">
    <figcaption>In the right the result of /company?mot=Inc and in the left thr result og /count?per=Country</figcaption>
</p>


<br />
<br />

Powered by Aurelie Jolas