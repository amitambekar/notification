
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 


    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
	  getCapturePhoto();
    }

	function get_from_gallery() {
      // Take picture using device camera and retrieve image as base64-encoded string
      //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
	  getPhoto(pictureSource.PHOTOLIBRARY);
    }

	function getCapturePhoto() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: Camera.DestinationType.FILE_URI,
                                saveToPhotoAlbum: false,
                                allowEdit: true });
}
	
	function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                saveToPhotoAlbum: false,
                                sourceType: source,
                                allowEdit: true });
}
 
// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    FileIO.updateCameraImages(imageURI);
	
      //var largeImage = document.getElementById('smallImage');
      //largeImage.style.display = 'block';
    //largeImage.src = imageURI;
	//document.getElementById('showdata').value=imageURI;
	//var large_image = largeImage.src;
	
}
 
// Called if something bad happens.
function onFail(message) {
   alert('Failed because: ' + message);
}
    
	
	
	
	
	
function onGetDirectorySuccess(dir) { 
window.appRootDir = dir;
      ////alert("Created dir ="+window.appRootDir);
	  ////alert("name ="+window.appRootDir.name);
	  ////alert("to URL= "+window.appRootDir.toURL());
	// ////alert("filesystem ="+window.appRootDir.filesystem);
	 
} 

function onGetDirectoryFail(error) { 
    ////alert("Error creating directory "+error.code); 
} 
	
	// set some globals
var gImageURI = '';
var gFileSystem = {};
 
var FileIO = {
 
// sets the filesystem to the global var gFileSystem
 gotFS : function(fileSystem) {
 
	fileSystem.root.getDirectory("pregnancy app", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail);
    gFileSystem = fileSystem;
 },
 
// pickup the URI from the Camera edit and assign it to the global var gImageURI
// create a filesystem object called a 'file entry' based on the image URI
// pass that file entry over to gotImageURI()
updateCameraImages : function(imageURI) {
        gImageURI = imageURI;
        window.resolveLocalFileSystemURI(imageURI, FileIO.gotImageURI, FileIO.errorHandler);
		
    },
 
// pickup the file entry, rename it, and move the file to the app's root directory.
// on success run the movedImageSuccess() method
 gotImageURI : function(fileEntry) {
 
 var current_date = new Date();
 var newName = 'PREG'+current_date.getFullYear() +''+current_date.getMonth() +''+current_date.getDate()+''+current_date.getHours() +''+ current_date.getMinutes() +''+ current_date.getSeconds()+'.jpg';
       //var newName = "THE_END.jpg";
	   ////alert(fileEntry.fullPath);
	 //  document.getElementById("set_image_path").value = window.appRootDir.toURL() +'/'+newName;
	  // document.getElementById("demo_image").src = window.appRootDir.toURL() +'/'+newName;
	   ////alert(window.appRootDir);
       fileEntry.moveTo(window.appRootDir, newName, FileIO.movedImageSuccess, FileIO.errorHandler);
	   var image_path = window.appRootDir.toURL() +'/'+newName;
	  ////alert('Image Path='+image_path);
	   insertItem(image_path);
       //fileEntry.moveTo(root_path, newName, FileIO.movedImageSuccess, FileIO.errorHandler);
	  ////alert('out');
 },
 
// send the full URI of the moved image to the updateImageSrc() method which does some DOM manipulation
 movedImageSuccess : function(fileEntry) {
      updateImageSrc(fileEntry.fullPath);
	 //////alert('movedImageSuccess');
 },
 
// get a new file entry for the moved image when the user hits the delete button
// pass the file entry to removeFile()
 removeDeletedImage : function(imageURI){
      window.resolveLocalFileSystemURI(imageURI, FileIO.removeFile, FileIO.errorHandler);
 },
 
// delete the file
 removeFile : function(fileEntry){
      fileEntry.remove();
 },
 
// simple error handler
 errorHandler : function(e) {
       var msg = '';
       switch (e.code) {
       case FileError.QUOTA_EXCEEDED_ERR:
               msg = 'QUOTA_EXCEEDED_ERR';
               break;
        case FileError.NOT_FOUND_ERR:
               msg = 'NOT_FOUND_ERR';
               break;
        case FileError.SECURITY_ERR:
               msg = 'SECURITY_ERR';
               break;
        case FileError.INVALID_MODIFICATION_ERR:
               msg = 'INVALID_MODIFICATION_ERR';
               break;
        case FileError.INVALID_STATE_ERR:
               msg = 'INVALID_STATE_ERR';
               break;
        default:
               msg = e.code;
        break;
 };
      //alert('Error: ' + msg);
 }
}
