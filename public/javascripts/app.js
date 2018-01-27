$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/books').success(function (books) {
  books.forEach(function(book) {
    if (book.haveRead != true) {
    renderBook(book);
    }
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
        comment: ''
      },
      success: newBookSuccess,  //called from functions below
      error: newBookError
    });
  });
});
  $('#books').on('click', '.delete-book', handleDeleteBookClick);

  $('#books').on('click', '.edit-book', handleEditBookClick);

  $('#books').on('click', '.put-book', handleSaveChangesClick);

  $('#books').on('click', '.move-book', handleBookMoveClick)
});

const newBookSuccess = (json)=>{  //renders json format
  $("input[type=text], textarea").val("");
  renderBook(json);
}

const newBookError = ()=> {
     console.log('Error, try again')
}

// accepts a book id (mongo id) and return the row in which that book exists
function getBookRowById(id) {
  return $('[data-book-id=' + id + ']');
}

function handleEditBookClick(e) {
  var bookId = $(this).parents('.book').data('book-id');
  var $bookRow = getBookRowById(bookId);

  console.log('attempt to edit id', bookId);

  // replace edit button with save button
  $(this).parent().find('.btn').hide();
  $(this).parent().find('.put-book').show();

  // replace current spans with inputs
  var bookName = $bookRow.find('span.book-title').text();
  $bookRow.find('span.book-title').html('<input class="edit-book-name" value="' + bookName + '"></input>');

  var authorName = $bookRow.find('span.author-name').text();
  $bookRow.find('span.author-name').html('<input class="edit-author-name" value="' + authorName + '"></input>');

  var releaseDate = $bookRow.find('span.book-release-date').text();
  $bookRow.find('span.book-release-date').html('<input class="edit-book-release-date" value="' + releaseDate + '"></input>');
}

function handleSaveChangesClick(e) {
  var bookId = $(this).parents('.book').data('book-id');
  var $bookRow = getBookRowById(bookId);

  var data = {
    name: $bookRow.find('.edit-book-name').val(),
    authorName: $bookRow.find('.edit-author-name').val(),
    releaseDate: $bookRow.find('.edit-book-release-date').val()
  };

  $.ajax({
    method: 'PUT',
    url: '/api/books/' + bookId,
    data: data,
    success: function(data) {
      console.log(data);
      $bookRow.replaceWith(generateBookHtml(data));
    }
  });
}



function handleDeleteBookClick(e) {
  var bookId = $(this).parents('.book').data('book-id');
  console.log('someone wants to delete book id=' + bookId );
  $.ajax({
    method: 'DELETE',
    url: ('/api/books/' + bookId),
    success: function() {
      console.log('Those who don\'t build must burn. It\'s as old as history and juvenile delinquents.');
      $('[data-book-id='+ bookId + ']').remove();
    }
  });
}

function handleBookMoveClick(e) {
  var bookId = $(this).parents('.book').data('book-id');
  var $bookRow = getBookRowById(bookId);
  console.log('moving book id=' + bookId);
  var data = {
    name: $(this).parents('.book').find('span.book-title')[0].innerHTML,
    authorName: $(this).parents('.book').find('span.author-name')[0].innerHTML,
    releaseDate: $(this).parents('.book').find('span.book-release-date')[0].innerHTML,
    haveRead: true
  };

  $.ajax({
    method: 'PUT',
    url: '/api/books/' + bookId,
    data: data,
    success: function() {
      console.log('book successfully moved')
      $('[data-book-id='+ bookId + ']').remove();
    }
  });

}


// generate just the html for an book row
function generateBookHtml(book) {
  var bookHtml =
  "        <!-- one book -->" +
  "        <div class='book' data-book-id='" + book._id + "'>" +
  "          <div class='col-sm-6'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin book internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail book-art'>" +
  "                     <img src='" + book.img + "'  alt='book image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Title:</h4>" +
  "                        <span class='book-title'>" + book.title + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Author:</h4>" +
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
  "                <button class='btn btn-success put-book' style='display:none'>Save Changes</button>" +
  "                <button class='btn btn-success move-book'>Move to Read</button>" +
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