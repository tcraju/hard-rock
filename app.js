const inputtedInfo = document.getElementById('inputted-info');
const songList = document.getElementById('song-list');
/*fetching song info and making list of ten item */
function songSearch() {
    fetch('https://api.lyrics.ovh/suggest/' + inputtedInfo.value)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const fetchSongItem = () => {
                songList.innerHTML = '';

                for (var i = 0; i < 10; i++) {
                    songList.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                <div class="col-md-5">
                                                    <h3 class="lyrics-name" id= 'song-title-${i}'>${json.data[i].title}</h3>
                                                    <p class="author lead">Album by <span>${json.data[i].album.title}</span></p>
                                                </div>
                                                <div class="col-md-4">
                                                    <h3 class="">Artist</h3>
                                                    <p class="artist-name lead" id='artist-name-${i}'> ${json.data[i].artist.name}</p>
                                                </div>
                            
                                                <div class="col-md-3 text-md-right text-center">
                                                    <button class="btn btn-success"  onclick="lyricSearch(${i})">Get Lyrics</button>
                                                </div>
                                            </div>`
                }
            };
            fetchSongItem();
        });
};

/* Fetching Lyric Api*/
const lyricSearch = (i) => {
    let songTitle = document.getElementById(`song-title-${i}`);
    let artistName = document.getElementById(`artist-name-${i}`);
    fetch("https://api.lyrics.ovh/v1/" + artistName.innerText + '/' + songTitle.innerText)
        .then(response => response.json())
        .then(json => {
            document.getElementById('lyric-title').innerText = songTitle.innerText;
            if (json.lyrics == undefined) {
                document.querySelector('.lyric').innerText = "Lyric for this song is not available";
            } else {
                document.querySelector('.lyric').innerText = json.lyrics
            };
        });
};
