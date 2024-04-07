// set document title
document.title = document.getElementById('docTitle').innerText;

playBtn = document.getElementById('playBtn');
stopBtn = document.getElementById('stopBtn');
nextBtn = document.getElementById('nextBtn');
prevBtn = document.getElementById('prevBtn');
shuffleBtn = document.getElementById('shuffleBtn');
repeatBtn = document.getElementById('repeatBtn');
repeatType = document.getElementById('repeatType');
audioPlayer = document.getElementById('audioPlayer');
audioController = document.getElementById('audioController');
divInProgr = document.getElementById('in-progr');
musicProgr = document.getElementById('music-progress');
musicProgrWidth = parseFloat(getComputedStyle(musicProgr).width);
dotPlay = document.getElementById('dotPlay');
txtCurrentTime = document.getElementById('txtCurrentTime')
txtDuration = document.getElementById('txtDuration')
songs = [
	'NhungLoiDoiGian-AndyLau_vg7w.mp3',
	'BenThuongHai-LuuDucHoaAndyLau-82745.mp3',
	'TinhNhatPhai-LuuDucHoa_385n2.mp3',
];

var shuffSongs = [];
var passSongs = [];
var isShuffle = false;
var currentSongId = 0;
var drag = false;
var repeatModes = {0: 'off', 1: 'One', 2: 'All'}
var currentRpMode = null

repeatBtn.addEventListener('click', (e) => {
	currentRpMode = (currentRpMode == 2) ? 0 : (currentRpMode + 1)
	if(currentRpMode !=0){
		fnRenderRepeatMode(currentRpMode)
	}else{
		repeatType.classList = '';
		e.target.classList.remove('activebtn');
	}
})

audioPlayer.addEventListener('ended', () => {
	if(currentRpMode == 1){
		audioPlayer.play()
	}else{
	fnNext(audioPlayer, songs);
	audioPlayer.play();
	}
});
audioPlayer.addEventListener('timeupdate', () => {
	txtCurrentTime.innerText = fnTimeRender(audioPlayer.currentTime);
	txtDuration.innerText = fnTimeRender(audioPlayer.duration);
	if (!drag) {
		pT = (audioPlayer.currentTime / audioPlayer.duration) * musicProgrWidth;
		divInProgr.style.width = pT + 'px';
		dotPlay.style.left = pT + 'px';
	}
});

musicProgr.addEventListener('click', (e) => {
	divInProgr.style.width = e.offsetX + 'px';
	dotPlay.style.left = e.offsetX + 'px';
	audioPlayer.currentTime = (e.offsetX / musicProgrWidth) * audioPlayer.duration;
});

musicProgr.addEventListener('mousedown', () => {
	drag = true;
});
musicProgr.addEventListener('mouseup', () => {
	drag = false;
});
musicProgr.addEventListener('mousemove', (e) => {
	if (!drag) return;
	divInProgr.style.width = e.offsetX + 'px';
	dotPlay.style.left = e.offsetX + 'px';
});

playBtn.addEventListener('click', (e) => {
	fnTogglePlayPause('play');
	fnPlay(audioPlayer);
});
stopBtn.addEventListener('click', (e) => {
	fnTogglePlayPause('stop');
	fnStop(audioPlayer);
});
nextBtn.addEventListener('click', () => {
	if(currentRpMode == 1){
		currentRpMode = 0
		fnRenderRepeatMode(currentRpMode)
	}
	fnNext(audioPlayer, songs);
	fnPlay(audioPlayer);
});
prevBtn.addEventListener('click', () => {
	if (currentRpMode == 1) {
		currentRpMode = 0;
		fnRenderRepeatMode(currentRpMode);
	}
	fnPrev(audioPlayer, songs);
	fnPlay(audioPlayer);
});
shuffleBtn.addEventListener('click', (e) => {
	isShuffle = !isShuffle;
	e.target.classList.toggle('activebtn');
});

var loadAudio = (el, s, start = 0) => {
	el.src = `mp3/${s[start]}`;
	currentSongId = start;
	audioController.innerHTML = getCurrentSongName(el);
};
var fnPlay = (el) => {
	el.play();
};
var fnStop = (el) => {
	el.pause();
};

var fnGetIndexSong = (el, s) => {
	let i = s.indexOf(getCurrentSongName(el));
	return i;
};

var getCurrentSongName = (el) => {
	let start = el.src.indexOf('mp3/');
	currentSongName = el.src.slice(start + 4);
	return currentSongName;
};

var fnNext = (el, s) => {
	if (!isShuffle) {
		if(currentSongId == s.length - 1){
			if(currentRpMode == 2){
				currentSongId = 0
			}else return
		}else currentSongId++
		loadAudio(el, s, currentSongId);
	} else {
		playRandomSong(el, s);
	}
	fnTogglePlayPause('play');
};

var fnPrev = (el, s) => {
	if (!isShuffle) {
		if (currentSongId == 0) {
			if (currentRpMode == 2) {
				currentSongId = s.length-1;
			} else return;
		} else currentSongId--;
		loadAudio(el, s, currentSongId);
	} else {
		playRandomSong(el, s);
	}
	fnTogglePlayPause('play');
};

var fnShuffleSongs = () => {
	if (songs.length > 0 && passSongs.indexOf(songs[currentSongId] < 0)) {
		passSongs.push(songs[currentSongId]);
		songs = songs.toSpliced(currentSongId, 1);
	}
	if (songs.length == 0 && passSongs.length > 0) {
		songs = [...passSongs];
		passSongs = [];
	}
};

var playRandomSong = el => {
	fnShuffleSongs();
	let songsLength = songs.length - 0.5;
	currentSongId = Math.round(Math.random() * songsLength - 0.5);
	loadAudio(el, songs, currentSongId);
};

// biến pa nhận vào chuỗi 'play' hoặc 'pause'
var fnTogglePlayPause = pa => {
	let tmp = pa == 'play' ? 'stop' : 'play';
	document.querySelector(`#${pa}Btn i`).classList.add('activebtn');
	document.querySelector(`#${tmp}Btn i`).classList.remove('activebtn');
};

var fnRenderRepeatMode = mode => {
	let repeatBtnI = document.querySelector(`#repeatBtn i`)
	if(mode == 0){
		repeatType.classList = '';
		repeatBtnI.classList.remove('activebtn')
	}
	else{
		repeatType.classList.add(`repeat${repeatModes[mode]}`);
		repeatBtnI.classList.add('activebtn');
	}
}

var fnTimeRender = t => {
	let m = Math.floor(t/60)
	let s = Math.floor(t%60)
	return `${fnAddZero(m)}:${fnAddZero(s)}`
}
var fnAddZero= n => {
	return n = (n < 10) ? `0${n}` : n
}

var boot = () => {
	loadAudio(audioPlayer, songs);
};

boot();
