require('dotenv').config();
var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

router.post('/embedUrl', (req, res) => {
  const options = {
    method: "post",
    headers: {
      'Authorization': `Bearer ${process.env.RETOOL_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      "orgId": "1",
      "pageUuid": req.body.pageUuid,
      "externalIdentifier": req.body.externalIdentifier,
      "groupIds": req.body.groups
    })
  }

  fetch(`https://${process.env.RETOOL_URL}/api/embed-url/external-user`, options)
  .then(data => data.json())
  .then(json => res.send(json))
  .catch(e => console.log(e.message))
})

module.exports = router;
