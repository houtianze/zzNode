function matches(str, index, tofind) {
	for (var i = 0; i < tofind.length; i++) {
		if (str.charAt(index + i) !== tofind.charAt(i)) {
			return false;
		}
	}

	return true;
}

var findstr = function(str, tofind) {
	var indexes = [];
	if (tofind.length <= 0) {
		return indexes;
	}

	var firstChar = tofind.charAt(0);
	for(var i = 0; i < str.length; i++) {
		if (str.charAt(i) === firstChar) {
			if (matches(str, i, tofind)) {
				indexes.push(i);
			}
		}
	}

	return indexes;
}

function main() {
	var str = "what a nice day at the fat bay";
	var found = findstr(str, "at");
	console.log(found);
	var marker = "";
	var prev = 0;
	found.forEach(function(elem) {
		// http://stackoverflow.com/questions/1877475/repeat-character-n-times
		marker += Array(elem + 1 - prev).join(" ") + "^";
		prev = elem + 1;
	});
	console.log(str);
	console.log(marker);
}

main();