var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

const RETOOL_API_KEY = 'Bearer retool_01gh9pd7qre20ptp9b51zrpfg8'

  /**
   * {
   *  orgId: "1",
   *  pageUuid: "063ae5a6-5b07-11ed-94b5-f7ac74a32e3a",
   *  externalIdentifier: "maxantony",
   *  groupIds: [5,6]
   * }
   */
  router.post('/embedUrl', (req, res) => {
    const options = {
      method: "post",
      headers: {
        'Authorization': RETOOL_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        "orgId": "1",
        "pageUuid": req.body.pageUuid,
        "externalIdentifier": req.body.externalIdentifier,
        "groupIds": req.body.groups
      })
    }
    fetch("https://retool.shopco.partners/api/embed-url/external-user", options)
    .then(data => data.json())
    .then(json => res.send(json))
    .catch(e => console.log(e.message))
  })

module.exports = router;
