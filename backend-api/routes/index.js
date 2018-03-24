var express = require('express'); 
var router = express.Router(); 

var fs = require("fs");
var jsonfile = require('jsonfile');
var elasticsearch = require('elasticsearch'); 


//Connexion to ElasticSearch
var clientConnexion = new elasticsearch.Client({
    host: 'localhost:9200', 
    log: 'trace'
}); 

//Endpoint Company : prend en paramètre mot qui est le mot recherché
router.get('/company', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    var mot; 
    if (req.query.mot != undefined){
        mot = req.query.mot; 
    }
    else{
        mot = "Company"; 
    }

    clientConnexion.search({
        index: 'stocks', 
        type : 'stock', 
        body: { 
            query:{
                match_phrase_prefix:{
                    "Company":mot
                }
            }
        }
    }).then(function(res2){
        var jsonCompany = []
        res2.hits.hits.forEach(company => {
            console.log(company['_source']);
            jsonCompany.push(company["_source"]); 
        });
        res.json(jsonCompany);
    }, function(err){
        console.trace(err.message); 
    }); 
});

//Endpoint Comparaison : prend en paramètre per et on
router.get('/compare', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    var per; 
    var on
    if (req.query.per != undefined){
        per = req.query.per; 
    }
    else{
        per = "Sector"; 
    }
    if(req.query.on != undefined){
        on = req.query.on;
    }
    else{
        on = "Price"
    }

    clientConnexion.search({
        index: 'stocks', 
        type : 'stock', 
        body: { 
            aggs:{
                "comparaisonPer":{
                    terms:{
                        field: "description." + per + ".keyword",
                        size:30
                    },
                    aggs:{
                        "average":{
                            avg:{
                                field : on
                            }
                        }, 
                        "maximum":{
                            max:{
                                field: on
                            }
                        }, 
                        "minimum":{
                            min:{
                                field:on
                            }
                        }
                    }
                }
            }
        }
    }).then(function(res2){
        var jsonCompare = []
        res2.aggregations.comparaisonPer.buckets.forEach(bucket => {
            console.log(bucket);
            jsonCompare.push(bucket); 
        });
        res.json(jsonCompare);
    }, function(err){
        console.trace(err.message); 
    }); 
});


//Endpoint Comparaison : prend en paramètre per
router.get('/count', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    var per; 
    if (req.query.per != undefined){
        per = req.query.per; 
    }
    else{
        per = "Sector"; 
    }

    clientConnexion.search({
        index: 'stocks', 
        type : 'stock', 
        body: { 
            aggs:{
                "sumPer":{
                    terms:{
                        field: "description." + per + ".keyword",
                        size:30
                    }
                }
            }
        }
    }).then(function(res2){
        var jsonCount = []
        res2.aggregations.sumPer.buckets.forEach(bucket => {
            console.log(bucket);
            jsonCount.push(bucket); 
        });
        res.json(jsonCount);
    }, function(err){
        console.trace(err.message); 
    }); 
});


module.exports = router; 