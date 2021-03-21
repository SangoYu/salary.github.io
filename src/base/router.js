let Controller = require('./controller');
let Router = require('koa-router');

let router = Router();

router.post('/calculate', Controller.calculate);
router.post('/message', Controller.message);

router.get('/analytics', Controller.analytics);

router.get('/showmessage', Controller.showmessage);


router.get('/count', Controller.count);
router.get('/others', Controller.others);
router.get('/realtime', Controller.realtime);
router.get('/visits', Controller.visits);

router.get('/region', Controller.regionList);
router.get('/ip', Controller.ipAddress);


module.exports = router;