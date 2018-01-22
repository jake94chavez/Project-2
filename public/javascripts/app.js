$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/books').success(function (books) {
  books.forEach(function(book) {
    renderBook(book);
  });
});

  // event handler for the submit button
  $('#addNewBook').on('submit', (e) => {
    //prevent default action of event from being triggered
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/books',
      //data is the "body" that Req.body refers to on server file
      data: { 
        title: e.currentTarget["1"].value,
        author: e.currentTarget["2"].value,
        releaseDate: e.currentTarget["3"].value,
        genres: e.currentTarget["4"].value.split(','),
        haveRead: false,
        comment: ''
      },
      success: newBookSuccess,  //called from functions below
      error: newBookError
    });
  });
});

const newBookSuccess = (json)=>{  //renders json format
  $("input[type=text], textarea").val("");
  renderBook(json);
}

const newBookError = ()=> {
     console.log('Error, try again')
}

// generate just the html for an book row
function generateBookHtml(book) {
  var bookHtml =
  "        <!-- one book -->" +
  "        <div class='row book' data-book-id='" + book._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin book internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail book-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='book image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Book Name:</h4>" +
  "                        <span class='book-title'>" + book.title + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Author Name:</h4>" +
  "                        <span class='author-name'>" + book.author + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Release Date:</h4>" +
  "                        <span class='book-release-date'>" + book.releaseDate + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of book internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-info edit-book'>Edit Book</button>" +
  "                <button class='btn btn-danger delete-book'>Delete Book</button>" +
  "                <button class='btn btn-success put-book default-hidden'>Save Changes</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one book -->";
  return bookHtml;
 }

function renderBook(book) {
  var html = generateBookHtml(book);
  console.log('rendering book:', book);

  $('#books').append(html);
}