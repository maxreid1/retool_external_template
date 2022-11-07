var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

  /**
   * {
   *  orgId: "1",
   *  pageUuid: "063ae5a6-5b07-11ed-94b5-f7ac74a32e3a",
   *  externalIdentifier: "maxantony",
   *  groupIds: [5,6]
   * }
   */
  router.post('/', (req, res) => {
    const options = {
      method: "POST",
      headers: {
        'Authorization': process.env.RETOOL_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        "orgId": "1",
        "pageUuid": req.body.pageUuid,
        "externalIdentifier": req.body.externalIdentifier,
        "groupIds": req.body.groups
      })
    }

    fetch("https://retool.shopco.partners/api/embed-url/external-user", options)
    .then((res) => res.json())
    .catch(e => console.log(e.message))

  })

module.exports = router;
