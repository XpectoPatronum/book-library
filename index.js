
$("#tr").click(function() {
    $('html,body').animate({
        scrollTop: $("#top-read").offset().top},
        'slow');
});
$("#nr").click(function() {
    $('html,body').animate({
        scrollTop: $("#new-release").offset().top},
        'slow');
});
$("#bs").click(function() {
    $('html,body').animate({
        scrollTop: $("#best-seller").offset().top},
        'slow');
});
$("#ta").click(function() {
    $('html,body').animate({
        scrollTop: $("#top-author").offset().top},
        'slow');
});
  var item, title, author, publisher, bookLink, bookImg;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var apiKey = "key=AIzaSyCyU_9ZFKH8whqoUyir-uf3hxPiqAHW2v8";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  var searchData;

  $("#search-bar-top").keypress(function(e)
  {
    if(e.which === 13)
    {
            $('#search').click();
  }
});
  //listener for search button
  $("#search").click(function()
  {
    outputList.innerHTML = ""; //empty html output
    // document.body.style.backgroundImage = "https://unsplash.com/photos/wseixWvrsD4";
     searchData = $("#search-bar-top").val();
     //handling empty search input field
     if(searchData === "" || searchData === null)
     {
       displayError();
     }
    else
    {
       // console.log(searchData);
       // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
       $.ajax({
          url: bookUrl + searchData,
          dataType: "json",
          success: function(response) {
            console.log(response)
            if (response.totalItems === 0)
            {
              alert("No Result!.. Please Try Something else")
              $(".book-list").css("visibility", "hidden");
            }
            else
            {
              $('html,body').animate({
                  scrollTop: $("#sr").offset().top},
                  'slow');
              // $("#title").animate({'margin-top': '5px'}, 1000); //search box animation
              $(".book-list").css("visibility", "visible");
              displayResults(response);
            }
          },
          error: function () {
            alert("Something went wrong.. <br>"+"Try again!");
          }
        });
      }
      $("#search-bar-top").val(""); //clearn search box
   });

   /*
   * function to display result in index.html
   * @param response
   */
   function displayResults(response) {
      for (var i = 0; i < response.items.length; i+=3) {
        item = response.items[i];
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        bookLink1 = item.volumeInfo.previewLink;
        bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;

        item2 = response.items[i+1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;
        bookLink2 = item2.volumeInfo.previewLink;
        bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;


        item3 = response.items[i+2];
        title3 = item3.volumeInfo.title;
        author3 = item3.volumeInfo.authors;
        bookLink3 = item3.volumeInfo.previewLink;
        bookImg3 = (item3.volumeInfo.imageLinks) ? item3.volumeInfo.imageLinks.thumbnail : placeHldr ;

        // item4 = response.items[i+3];
        // title4 = item4.volumeInfo.title;
        // author4 = item4.volumeInfo.authors;
        // publisher4 = item4.volumeInfo.publisher;
        // bookLink4 = item4.volumeInfo.previewLink;
        // bookIsbn4 = item4.volumeInfo.industryIdentifiers[1].identifier
        // bookImg4 = (item4.volumeInfo.imageLinks) ? item4.volumeInfo.imageLinks.thumbnail : placeHldr ;
        // in production code, item.text should have the HTML entities escaped.
        outputList.innerHTML += '<div class="top-reads">' +
                                formatOutput(bookImg1, title1, author1, bookLink1) +
                                formatOutput(bookImg2, title2, author2, bookLink2)+
                                formatOutput(bookImg3, title3, author3, bookLink3)
                                '</div>';

        console.log(outputList);
      }
   }

   /*
   * card element formatter using es6 backticks and templates (indivial card)
   * @param bookImg title author publisher bookLink
   * @return htmlCard
   */
   function formatOutput(bookImg, title, author, bookLink) {
     // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
     // var viewUrl = 'book.html?isbn='+bookIsbn; //constructing link for bookviewer
     // var htmlCard = `<div class="col-lg-6">
     //   <div class="card" style="">
     //     <div class="row no-gutters">
     //       <div class="col-md-4">
     //         <img src="${bookImg}" class="card-img" alt="...">
     //       </div>
     //       <div class="col-md-8">
     //         <div class="card-body">
     //           <h5 class="card-title">${title}</h5>
     //           <p class="card-text">Author: ${author}</p>
     //           <p class="card-text">Publisher: ${publisher}</p>
     //           <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
     //         </div>
     //       </div>
     //     </div>
     //   </div>
     // </div>`
     var htmlCard= `<div class="top-reads">
     <div class="book" style="background: linear-gradient(#71C9CE, #CBF1F5)">
         <a href="${bookLink}" target="_blank">
           <img class="thumbnail"
             src="${bookImg}"
             alt="bookcover"></a>
         <div class="book-info">
           <h3 class="book-title"><a href="${bookLink}" target="_blank">${title}</a></h3>
           <div class="book-authors">${author}</div>
         </div>
       </div>`
     return htmlCard;
   }

   //handling error for empty search box
   function displayError() {
     alert("Search term can not be empty!")
   }
