'use strict';
const NASA_SEARCH_URL = `https://images-api.nasa.gov/search?`;

// STEP 1A - NASA input request from the user--------------
function watchNASASubmit() {
  // alert (`NASA Submit: watchNASASubmit`);
  $('.NASA-search').submit(event => {
    event.preventDefault();
  //query is listening for the form that was being submitted
  //const to listen for text input (getter)
  const query = $('#NASA-search-box').val();
  // clear out the input (setter)
  $('#NASA-search-box').val("");
  if (query == 0) {
    alert("You didn't tell us what to search!");
                }
  else {getNASADataFromApi(query, validateResults);
  console.log("get NASA Data from API " + getNASADataFromApi);
  //handle CSS luminaire
$(function luminaire() {
  $('.luminaire:nth-child(2n)').addClass('on');
  $('.NASA-search').on('click', function() {
    $(this).toggleClass('on');
  });
});
}
});
};

// STEP 2A - using the input from the user (query) make the API call to get the JSON response
//callback is like chaining two functions together
function getNASADataFromApi(searchTerm, callback) {
  const query = { 
    q: `${searchTerm}`,
  }
  //callback is telling it what to do after it's finished getting data from NASA
  $.getJSON(NASA_SEARCH_URL, query, callback);
    console.log('It is done!', query);
}  

function validateResults(receivedApiData) {
  //show the json array received from the API call
  // if there are no results it will show an error
  console.log("This is received API Data " + receivedApiData.collection);
  if (receivedApiData == 0) {
    console.log("error");
    alert("Sorry, your search did not yield results!");
                }
  // if there are results, call the displayNASASearchData
    else {
        displayNASASearchData(receivedApiData.collection.items);
                }
 };

// STEP 3A - using the JSON response, populate the images part of your HTML with the variable inside the JSON
function renderImagesResults(images) {
 console.log('result=' + 'images ' + images.length);
  let imagesHTML = "";
  for (let i =0; i<images.length; i++){
    const imageThumbURL = images[i].links[0].href; //pulls thumbnails
    const imageCollectionHref = images[i].href;
    const imageDescrip = images[i].data[0].description_508;
    const imageTitle = images[i].data[0].title;
    getCollectionJSON(imageCollectionHref).then(function (imageArray){
      const origImageURL = imageArray[0];
      // console.log("This is the original image " + origImageURL);
      imagesHTML += `<div id="display-images" class="row"><div class="col-3"><h3>Image Title: ${imageTitle}</h3>
    <img src="${imageThumbURL}" alt="${imageDescrip}">
    <p>${imageDescrip}
    <a href="${origImageURL}" + "' target='_blank'>View</a>
    </p></div>
    </div>`;
    $('#js-images-results').html(
      imagesHTML
        );
    });
    };
  }
  function renderVideosResults(videos) {
    console.log('videos ' + videos.length);
  let videosHTML = "";
  for (let i=0; i<videos.length; i++){
    const videoJSON = videos[i].href;
    const videoURL = getVideoURL(videoJSON);
    const largeVideoURL = getLgVideoURL(videoJSON);
    const videoDescrip = videos[i].data[0].description;
    let videoTitle = videos[i].data[0].title;
    //removing hyphens and dashes from Video Titles and replacing them with spaces
    videoTitle= videoTitle.replace(/[_-]/g, " ");
    console.log("video JSON " + videoJSON);
    console.log("video description " + videoDescrip);
    videosHTML += `<div id="display-videos" class="row"> <div class="col-3"> <h3>Video Title: 
  ${videoTitle}</h3><div class="display-box"><video src="${videoURL}" controls></video>
  <p class="dont-break-out">${videoDescrip}
  <a href="${largeVideoURL}" + "' target='_blank'>View</a></p></div></div></div>`
  };

 $('#js-videos-results').html(
  videosHTML
    );
}
function getCollectionJSON(imageCollectionHref) {
  return $.getJSON(imageCollectionHref);
}

function renderResultsCount(imagesCount, videosCount){
  let countHTML = "";
  countHTML += `<div id="display-results-count"> Images Found: ${imagesCount} | Videos Found: ${videosCount}</div><h2 class="display-results-heading">Here's All You Need to Know</h2>`;
  $('#js-count-results').html(
    countHTML
  )}

function getVideoURL(videoJSON) {
  // replace space with %20 in URL
  videoJSON = videoJSON.replace(/\s/g, '%20');
  // split URL at slashes to find video path
  const splitURL = videoJSON.split('/');
  // console.log('this is a split URL' + splitURL);
  const videoPath = splitURL[4];
  // replace collection.json with video path
  // stretch goal: choose video sizes based on screen resolution 
  const videoURL = videoJSON.replace('collection.json', `${videoPath}~small.mp4`);
  console.log('videoURL', videoURL);
  return videoURL;
}

function getLgVideoURL(videoJSON) {
  // replace space with %20 in URL
  videoJSON = videoJSON.replace(/\s/g, '%20');
  // split URL at slashes to find video path
  const splitURL = videoJSON.split('/');
  // console.log('this is a split URL' + splitURL);
  const videoPath = splitURL[4];
  // replace collection.json with video path
  // stretch goal: choose video sizes based on screen resolution 
  const lgVideoURL = videoJSON.replace('collection.json', `${videoPath}~orig.mp4`);
  return lgVideoURL;
}

function grabByType(item) {
  //the object passed to the filter callback is reference using this
  return (item.data[0].media_type == this.type);
}

// //STEP 4A -- take the data received and display it in the desired HTML format
function displayNASASearchData(searchData) {
  // debugger;
    console.log("This is Search Data: " + JSON.stringify(searchData)); 
    const imageResults = searchData.filter(grabByType,{type: "image"});
    const videoResults = searchData.filter(grabByType,{type: "video"});
  renderImagesResults(imageResults);
  renderVideosResults(videoResults);
  renderResultsCount(imageResults.length, videoResults.length);
}

 function init () {
  watchNASASubmit();
 }
 $(init);