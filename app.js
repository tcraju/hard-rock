let inputtedInfo = document.getElementById('inputted-info');
let songList = document.getElementById('song-list');

function songSearch() {

    fetch('https://api.lyrics.ovh/suggest/' + inputtedInfo.value)

        .then(response => response.json())

        .then(json => {
            console.log(json);
            const fetchSongItem = () => {
                songList.innerHTML = '';

                for (var i = 0; i < 10; i++) {
                    songList.innerHTML += `<p class="author lead"><strong id= 'song-title-${i}'>${json.data[i].title}</strong> Album by <span>${json.data[i].album.title}</span> <button class="btn btn-success" onclick="lyricSearch(${i})">Get Lyrics</button></p>
                                            <p class="d-none" id='artist-name-${i}'>${json.data[i].artist.name}</p>`
                }
            }
            fetchSongItem();
        })
}


const lyricSearch = (i) => {

    let songTitle = document.getElementById(`song-title-${i}`);
    let artistName = document.getElementById(`artist-name-${i}`);

    fetch("https://api.lyrics.ovh/v1/" + artistName.innerText + '/' + songTitle.innerText)
        .then(response => response.json())
        .then(json => {
            document.getElementById('lyric-title').innerText = songTitle.innerText;
            document.querySelector('.lyric').innerText = json.lyrics;
        })
}
