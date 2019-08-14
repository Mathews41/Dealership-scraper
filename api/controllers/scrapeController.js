import { query } from "../services/scrapeService";

module.exports = {
  scrape: (req, res) => {
    console.log('req', req.body)
    query(123, 3).then(reviews => {
      console.log('reviews', reviews)
      res.json(reviews);
    });
  }
};
