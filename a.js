const play = document.getElementById('play');
const music = document.querySelector('audio');
const img = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');

let isPlaying = false;
const songs = [
    {
        name: "mnt",
        title: "Path of Wind",
        artist: "Joe Hisaishi",
    },
    {
        name: "Herbal_Tea",
        title: "Herbal Tea",
        artist: "A Youtuber",
    },
    {
        name: "Tranquillity",
        title: "Tranquillity",
        artist: "Another Youtuber",
    },
];

//to play
const playMusic = ()=> {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("anime");
};
//to pause
const pauseMusic = ()=> {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove("anime");
};

play.addEventListener('click', ()=> {
    isPlaying ? pauseMusic() : playMusic();
});

const loadSong = (songs)=> {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "img/" + songs.name + ".png";
}

let songIndex = 0;
// loadSong(songs[2]);

const nextSong = ()=> {
    songIndex = (songIndex + 1) % songs.length; //if index exceeds no. of songs
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = ()=> {
    songIndex = (songIndex -1 + songs.length) % songs.length; //if index exceeds no. of songs
    loadSong(songs[songIndex]);
    playMusic();
}

//progress bar
music.addEventListener('timeupdate', (event)=> {
    const {currentTime, duration} = event.srcElement;
    let progress_time = (currentTime / duration) *100;
    progress.style.width = `${progress_time}%`;
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration%60);

    if(sec_duration < 10){
        sec_duration =`0${sec_duration}`
    }
    let tot_duration = `${min_duration}:${sec_duration}`;
    //to not show nan b/w song transition
    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }

    let min_currentDuration = Math.floor(currentTime/60);
    let sec_currentDuration = Math.floor(currentTime%60);

    
    if(sec_currentDuration < 10){
        sec_currentDuration =`0${sec_currentDuration}`
    }
    let tot_currentDuration = `${min_currentDuration}:${sec_currentDuration}`;

    //to not show nan b/w song transition
    if(currentTime){
        current_time.textContent = `${tot_currentDuration}`;
    }
});

//onclick music
progress_div.addEventListener('click', (event)=> {
    //console.log(event) //check srcElement and offsetX u'll know
    const {duration} = music;

    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    music.currentTime = move_progress;
});

//if music ends
music.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);