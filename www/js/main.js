
var pictureSource;
var destinationType;


//wait for phonegap to load
document.addEventListener("deviceready", onDeviceReady, false);

//Phonegap is ready
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}
//datepicker
 function handleDates(elm, options) {
        event.stopPropagation();
        var currentField = $(elm);
        var opts = options || {};
        var minVal = opts.min || 0;
        var maxVal = opts.max || 0;

        var myNewDate = Date.parse(currentField.val()) || new Date();
        if(typeof myNewDate === "number") {
            myNewDate = new Date (myNewDate);
        }

        window.plugins.datePicker.show({
            date : myNewDate,
            mode : 'date',
            minDate: Date.parse(minVal),
            maxDate: Date.parse(maxVal)
        }, function(returnDate) {
            if(returnDate !== "") {
                var newDate = new Date(returnDate);
                currentField.val(getFormattedDate(newDate));
            }
            currentField.blur();
        });
    }

//Capture Photo
function takePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess,onError,{
		quality:50,
		destinationType: destinationType.DATA_URL
	});
}

//Capture Photo from main page
function takeMainPic() {
	navigator.camera.getPicture(onPhotoDataMainSuccess,onError,{
		quality:50,
		destinationType: destinationType.DATA_URL
	});
}

//Get Photo from Library
function getPhoto(source) {
	navigator.camera.getPicture(onPhotoURISuccess,onError,{
		quality:50,
		destinationType: destinationType.FILE_URI,
		sourceType: source
	});
}

//If we capture a photo
function onPhotoDataSuccess(imageData) {
	//set Image Handler
	var dataImage = document.getElementById('dataImage');

	//unhide
	dataImage.style.display = 'block';

	//show photo
	dataImage.src = "data:image/jpeg;base64," + imageData;
}

//If we capture a photo from main page
function onPhotoDataMainSuccess(imageData) {
	//set Image Handler
	var dataImage = document.getElementById('imgMain');

	//unhide
	dataImage.style.display = 'block';

	//show photo
	dataImage.src = "data:image/jpeg;base64," + imageData;
}

//If we get an image
function onPhotoURISuccess(imageURI) {
	//set Image Handler
	var dataImage = document.getElementById('dataImage');

	//unhide
	dataImage.style.display = 'block';

	//show photo
	dataImage.src = imageURI;
}

//Handle errors
function onError(error){
	alert("Error: "+ error);
}

