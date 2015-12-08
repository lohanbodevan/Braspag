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
      if (typeof(obj.timeout) != 'undefined'){
          config.timeout = obj.timeout;
      }
      this.config = config;
      return this;
    }

    braspag.prototype.create = function(options, callback){
      var config = this.config;
      config.body = JSON.stringify(options);
      if(this.env == 'consulta'){
        config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales';
      }else{
        config.uri = 'https://apisandbox.braspag.com.br/v2/sales';
      }
      config['method'] = 'post';
      return request(config, callback);
    };

    braspag.prototype.consult = function(paymentId, callback){
      this.config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales/'+paymentId;
      this.config['method'] = 'get';
      return request(this.config, callback);
    };

    braspag.prototype.capture = function(paymentId, callback){
      if(this.env == 'consulta'){
        this.config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales/'+paymentId+'/capture';
      }else{
        this.config.uri = 'https://apisandbox.braspag.com.br/v2/sales/'+paymentId+'/capture';
      }
      this.config['method'] = 'put';
      return request(this.config, callback);
    };

    braspag.prototype.cancel = function(paymentId, callback){
      if(this.env == 'consulta'){
        this.config.uri = 'https://apiquerysandbox.braspag.com.br/v2/sales/'+paymentId+'/void';
      }else{
        this.config.uri = 'https://apisandbox.braspag.com.br/v2/sales/'+paymentId+'/void';
      }
      this.config['method'] = 'put';
      return request(this.config, callback);
    };
    return braspag;
  })();
  module.exports = braspag;
}).call(this);
