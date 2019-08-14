import request from "request";
import cheerio from "cheerio";
import q from "q";

module.exports = {
  query: (dealer, numberOfPages) => {
    //logic for building array of urls
    const list = [
      "https://www.dealerrater.com/dealer/Acura-of-Peoria-dealer-reviews-19816/?filter=ALL_REVIEWS#link",
      "https://www.dealerrater.com/dealer/Acura-of-Peoria-dealer-reviews-19816/page2/?filter=ALL_REVIEWS#link",
      "https://www.dealerrater.com/dealer/Acura-of-Peoria-dealer-reviews-19816/page3/?filter=ALL_REVIEWS#link"
    ];

    let reviews = list.map(url => {
      let deferred = q.defer();

      request(url, function(error, res, html) {
        if (!error) {
          let $ = cheerio.load(html);
          let reviewPage = {};
          reviewPage.dealerName = $("#dealerName").text();
          
          reviewPage.reviewList = []
          $(".review-entry").filter(function() {
            let data = $(this);
            for (var i = 0; i < data.length; i++) {
              let rawReview = $(this);
              let reviewDate = rawReview
                .find(".review-date")
                .find(".font-20")
                .text();
              reviewPage.reviewList.push({
                [i]: reviewDate
              })
            }
          });

          deferred.resolve(reviewPage);
        } else {
          deferred.reject("rejected");
        }
      });

      return deferred.promise;
    });
    return q.all(reviews);
  }
};
