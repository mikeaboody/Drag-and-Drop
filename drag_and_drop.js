var all_files = [];


function updateList() {
	sortFilesByName();
	var $file_box = $(".file_box");
	$file_box.empty();
	$file_box.append("<hr width='90%'>");
	for (var i = 0; i < all_files.length; i++) {
		$file_box.append("<span class='filename'>" + all_files[i].name + "</span>");
		$file_box.append("<span class='size'>" + sizeString(all_files[i].size) + "</span>");
		$file_box.append("<hr width='90%'>");
	}
}

function sizeString(size) {
	var sizeString = "";
	var count = 1;
	while (size >= Math.pow(2, 10)) {
		if (count > 4) {
			break;
		}
		size = size / Math.pow(2,10);
		count++;
	}
	size = Math.floor(size);
	if (count == 1) {
		sizeString = size + "B";
	} else if (count == 2) {
		sizeString = size + "KB";
	} else if (count == 3) {
		sizeString = size + "MB";
	} else if (count == 4) {
		sizeString = size + "GB";
	} else {
		sizeString = size + "TB";
	}
	return sizeString;
}

function sortFilesByName() {
	var compare = function(file1, file2) {
		var file1_name = file1.name;
		var file2_name = file2.name;
		return file1_name.localeCompare(file2_name);
	}
	all_files.sort(compare);
}

function allowDrop(event) {
	event.preventDefault();
}


function doDrop(event) {
	event.preventDefault();
  	if (event.dataTransfer.files.length != 0) {
  		var newFiles = event.dataTransfer.files;
  		for (var i = 0; i < newFiles.length; i++) {
  			var file = event.dataTransfer.files.item(i);
 			all_files.push(file);
  		}
  		updateList();
  	}
}