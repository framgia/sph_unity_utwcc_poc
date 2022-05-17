const recordAction = () => {
  const $ = window.$;
  const Recorder = window.Recorder

  let speech = new SpeechSynthesisUtterance();
  
  let gumStream;
  let rec;
  let input;
  
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext;

  const startRecord = () => {
    speech.lang = "en";
    speech.text = "Recording in Progress";
    window.speechSynthesis.speak(speech);
    let constraints = { audio: true, video:false }
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      audioContext =  new AudioContext();
      audioContext.resume();
      gumStream = stream;
      input = audioContext.createMediaStreamSource(stream);
      rec = new Recorder(input,{numChannels:1})
      rec.record()
    }).catch(function(err) {
      console.error(err);
    });
  }

  const stopRecord = () => {
    speech.lang = "en";
    speech.text = "Recording stopped.";
    window.speechSynthesis.speak(speech);
    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(createDownloadLink);
  }

  const createDownloadLink = (blob) => {
    var fd = new FormData();
    fd.append("myaudio.wav", blob);
    $.ajax({
      type: "POST",
      url: 'http://localhost:3001/upload',
      contentType: false,
      processData: false,
      data: fd,
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  return { startRecord, stopRecord }
}

export default recordAction;