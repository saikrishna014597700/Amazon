"use strict";
var connection = new require("./kafka/connection");
var connectMongoDB = require("./utils/dbConnection");

//import topics files
const productService = require("./services/product");
const orderService = require("./services/order")

//MongoDB connection
connectMongoDB();

//Handle topic request
const handleTopicRequest = (topic_name, fname) => {
  var consumer = connection.getConsumer("amazonTopic");
  var producer = connection.getProducer();
  console.log("Kafka Server is running ");
  consumer.on("message", function (message) {
    console.log("Message received for " + "amazonTopic");
    var data = JSON.parse(message.value);
    fname.handle_request(data.data, (err, res) => {
      response(data, res, err, producer);
      return;
    });
  });
};

const response = (data, res, err, producer) => {
  var payloads = [
    {
      // topic: data.replyTo,
      topic: "amazon2Topic",
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
        err: err,
      }),
      partition: 0,
    },
  ];
  producer.send(payloads, function (err, data) {
    if (err) {
      console.log("Error when producer sending data", err);
    } else {
      console.log(data);
    }
  });
  return;
};

// Topics;
handleTopicRequest("product", productService);
handleTopicRequest("orders",orderService)
