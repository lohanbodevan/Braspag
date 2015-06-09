# Braspag
Módulo de integração ao Braspag com Node.js

## Instalação

`npm install braspag`

## Exemplo completo de como usar

```javascript
// Callback genérico para mostrar o retorno da bp
var callback = function(err, res){
  if(err){console.log(err);}
  console.log(res);
}

// Inicializar a função com os dados de acesso e o ambiente a ser usado
var bp = require('braspag');

var braspag = new bp({
  env: "sandbox", // consulta(ambiente de produção) ou sandbox(ambiente de teste)
  proxy: "http://xyz:3190",
  merchantId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  merchantKey: "XXXXXXXXXDCYWUNFPTSGVRXIWOWDNXXXXXXXXXX"
});

// Criando uma venda simplificada
braspag.options({
  "MerchantOrderId":"2014111703",
  "Customer":{
    "Name":"Comprador Teste"
  },
  "Payment":{
    "Type":"CreditCard",
    "Amount":15700,
    "Provider":"Simulado",
    "Installments":1,
    "CreditCard":{
      "CardNumber":"1234123412341231",
      "Holder":"Teste Holder",
      "ExpirationDate":"12/2021",
      "SecurityCode":"123",
      "Brand":"Visa"
    }
  }
});

braspag.create(callback);

// Consultando uma venda
braspag.options({
  "paymentId":"ba714418-8a38-429d-befd-4c62de6f4f02"
});

braspag.consult(callback);

// Capturando uma venda
braspag.options({
  "paymentId":"ba714418-8a38-429d-befd-4c62de6f4f02"
});

braspag.capture(callback);

// Cancelando uma venda
braspag.options({
  "paymentId":"ba714418-8a38-429d-befd-4c62de6f4f02"
});

braspag.cancel(callback);
```
