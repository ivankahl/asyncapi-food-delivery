const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const orderHandler = require('../handlers/order');
module.exports = router;



/**
 * Receive messages from the Food Tracking API.
 */
router.use('/order', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'/order','publish','publish');
    await orderHandler.publish({message});
    next();
    
  } catch (e) {
    next(e);
  }
});
/**
 * Place a new order and subscribe to updates on the order&#39;s progress.
 */
router.useOutbound('/order', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'/order','placeOrder','subscribe');
    await orderHandler.subscribe({message});
    next();
    
  } catch (e) {
    next(e);
  }
});
