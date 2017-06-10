(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton   = null;
  var downloadimage = null;
  var count = 0;
  var count_filename = 0;
  var filestart = 'abc';
  var imagepng = '.png';

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
    downloadimage = document.getElementById('downloadimage');


    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4/3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);

    downloadimage.addEventListener('click', function(ev){
      downloadphoto();
      ev.preventDefault();
    }, false);

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);

	  // A: Creating filename - nameoffile will be used for uploading using jQuery
	  count++;
	  count_filename++;

	  var nameoffile = filestart.concat(count_filename);
	  nameoffile = nameoffile.concat(imagepng);

	  // A: Download image
	  ReImg.fromCanvas(canvas).downloadPng(nameoffile);
/*
 	  // A: Write the image to a file
	  // A: Send the file to the HTTP cloud server
*/
	  // OR
	  // See if buffer can be directly passed to the API - should be possible by using URL (getElementByID ??)
      //
	  // A: Get the attributes from JSON
	  // A: Set some global parameter which can be read by the video playback thread
	  // A: Look for potential problems in updating the video content

	  // A: Video changing code - This needs to be based on output of face-recognition code
	  if(1 == count)
	  {
	  	document.getElementById("youtubeVideo").src = 'http://www.youtube.com/embed/Fq2jCV_QsEA?autoplay=1';
	  }
	  else if(2 == count)
	  {
	  	document.getElementById("youtubeVideo").src = 'http://www.youtube.com/embed/RGGMx-t8lkc?autoplay=1';
	  }
	  else
	  {
		document.getElementById("youtubeVideo").src = 'http://www.youtube.com/embed/Ao86jyKEZEE?autoplay=1';
		count = 0;
	  }

    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);

  function changeVideo() {
  	document.getElementById("youtubeVideo").src = 'http://www.youtube.com/embed/jCya1yiFFP4';
	}

  function downloadphoto() {
	    var dt = canvas.toDataURL('image/jpeg');
	    document.href = dt;
	};

  downloadLnk.addEventListener('click', download, false);

})();