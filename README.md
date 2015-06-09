# braspag
Módulo de integração ao Braspag com Node.js

## Instalação

`npm install braspag`

## Como usar

### Pagamento com cartao de crédito

```javascript
    // Inicializar a função com os dados de acesso e o ambiente a ser usado
    var config, braspag;
    braspag = require('braspag');
    config = new braspag({
      env: "sandbox", // Consulta(ambiente de produção) ou sandbox(ambiente de teste)
      proxy: "http://xyz:3190", // Se sua empresa usa proxy na rede local...
      merchantId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      merchantKey: "0123456789012345678901234567890123456789"
    });

    //Configurando a moeda e a referência do pedido
    pag.options({
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
    pag.send(function(err, res){
      if(err){
        console.log(err);
      }
      console.log(res);
    });
```
