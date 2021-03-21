var expect = require("chai").expect;
var util = require('util');
var fs = require('fs');
var http = require('http');
var request = require('request');
var apiurl = "http://localhost:4000/";


describe('create', function () {
    it("create", function (done) {
        let url = apiurl + 'message';
        let postBody = {
            url: url,
            method: "post",
            body:{
                ip : '192.168.1.1',
                name  : '12345',
                contact : '12345',
                message : '12345'
            },
            json: true,
            forever: true,
            timeout: 6000,
            pool: {
                maxSockets: 10
            },
            time: true
        };


        request(postBody,function (err,res,body) {
            console.log(util.inspect(body,true,null,true));
            expect(res).to.not.be.undefined;
            expect(res).to.not.be.null;
            expect(res.statusCode).to.equal(200);
            done();
        });

    });

})



