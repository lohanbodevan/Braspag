(function(){
  var req = require('request');
  var request = function(config, callback){
    req(config, function(err, res, body){
      if(err){
        return callback(err);
      }else{
        return callback(null, body);
      }
    })
  };
  var braspag = (function(){
    function braspag(obj){
      var config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      if(obj.env == 'consulta'){
        this.env = 'consulta';
      }else{
        this.env = 'sandbox';
      }
      if(typeof(obj.proxy) != 'undefined'){
        config.proxy = obj.proxy;
      }
      if(typeof(obj.merchantId) != 'undefined'){
        config.headers.MerchantId = obj.merchantId;
      }
      if(typeof(obj.merchantKey) != 'undefined'){
        config.headers.MerchantKey = obj.merchantKey;
      }
      this.config = config;
      return this;
    }

    braspag.prototype.options = function(options){
      this.config.body = JSON.stringify(options);
      this.params = options;
      return this;
    };

    braspag.prototype.create = function(callback){
      if(this.env == 'consulta'){
        this.config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales';
      }else{
        this.config.uri = 'https://apisandbox.braspag.com.br/v2/sales';
      }
      this.config['method'] = 'post';
      return request(this.config, callback);
    };

    braspag.prototype.consult = function(callback){
      this.config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales/'+this.params.paymentId;
      this.config['method'] = 'get';
      delete this.config.body;
      return request(this.config, callback);
    };

    braspag.prototype.capture = function(callback){
      if(this.env == 'consulta'){
        this.config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales/'+this.params.paymentId+'/capture';
      }else{
        this.config.uri = 'https://apisandbox.braspag.com.br/v2/sales/'+this.params.paymentId+'/capture';
      }
      this.config['method'] = 'put';
      delete this.config.body;
      return request(this.config, callback);
    };

    braspag.prototype.cancel = function(callback){
      if(this.env == 'consulta'){
        this.config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales/'+this.params.paymentId+'/void';
      }else{
        this.config.uri = 'https://apisandbox.braspag.com.br/v2/sales/'+this.params.paymentId+'/void';
      }
      this.config['method'] = 'put';
      delete this.config.body;
      return request(this.config, callback);
    };
    return braspag;
  })();
  module.exports = braspag;
}).call(this);
