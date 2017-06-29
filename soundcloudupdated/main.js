/*
  Here is a guide for the steps you could take:
*/
// 1. First select and store the elements you'll be working with
const API_KEY = "?client_id=8538a1744a7fdaa59981232897501e04";
const MAIN = "https://api.soundcloud.com/users/";
var artist;
var artistId;
var data;
var songs = document.querySelector(".options");
var trackData;
var audio;
var songArray=[]
var musicPlayer = document.querySelector("audio");
var searchByKeystroke = document.querySelector("#artist")

// 2. Create your `onSubmit` event for getting the user's search term
document.getElementById("submit").addEventListener("click", getArtist);
searchByKeystroke.addEventListener("keyup", getArtist);
// 3. Create your `fetch` request that is called after a submission



function getUser() {
  axios.get(MAIN + artist + API_KEY).then(function(response) {
    data = response.data;
    console.log("data: ", data);
    getTracks(data);
    return data;
  });
}

function getArtist() {
  artist = document.getElementById("artist").value;
  getUser();
  return;
}
function getTracks(data) {
  artistId = data.id;
  console.log(artistId);
  axios.get(MAIN + artistId + "/tracks" + API_KEY).then(function(response) {
    trackData = response.data;
    console.log("data: ", response.data);
    album();
    return;
  });
}

function album() {

   while (songs.firstChild){
     songs.removeChild(songs.firstChild);
     document.querySelector("#nowPlaying").innerHTML =""
   }
  for (i = 0; i <= 30; i++) {
    let trackSong = trackData[i]
    let track = document.createElement("div");
    let albumCover = document.createElement("img");
    let songTitle = document.createElement("p");
    let bandName = document.createElement("p");
    
    albumCover.classList.add("cover");
    if (trackData[i].artwork_url == null){ albumCover.src = "images/speaker.png"}
        else{ albumCover.src = trackData[i].artwork_url}; 
    songTitle.textContent = trackData[i].title;
    songTitle.classList.add("Title");
    bandName.textContent = trackData[i].user.username;
    bandName.classList.add("band");
    
    songs.appendChild(track);
    track.addEventListener("click", function(e){
     musicPlayer.src = trackSong.stream_url + API_KEY;
     document.querySelector("#nowPlaying").innerHTML = trackSong.title;
     })
    track.appendChild(albumCover);
    track.appendChild(bandName);
    track.appendChild(songTitle);
    songArray.push(trackData[i].stream_url);
  }
}
 

// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play
