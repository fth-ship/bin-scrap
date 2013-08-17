var should = require('should'),
    bin = require('../lib');

describe('Bin', function () {
    var idx = null;
    var scrap = {
        name: 'hello.js',
        content: 'console.log(\'Hello World!\');'
    };

    describe('scrap hash', function () {
        it('normal', function (done) {
            var hash = bin.scrap.hash( new Date );
            should.exist(hash);
            done();
        });
    });

    describe('scrap create', function () {
        it('normal case', function (done) {
            

            bin.scrap.create( scrap, function (err, id) {
                should.not.exist(err);
                should.exist(id);
                idx = id;
                done();
            });
        });
    });

    describe('scrap read', function () {
        it('normal case', function (done) {
            bin.scrap.read( idx, function (err, value) {
                should.not.exist(err);
                value.should.eql(scrap);
                done();
            });
        });
    });

    describe('scrap list', function () {
        it('normal case', function (done) {
            var expect = {};
            expect[ idx ] = scrap;

            bin.scrap.list(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });
    });

    describe('scrap remove', function () {
        it('normal case', function (done) {
            bin.scrap.remove(idx, function (err, status) {
                should.not.exist(err);
                should.exist(status);
                done();
            });
        });
    });
});
