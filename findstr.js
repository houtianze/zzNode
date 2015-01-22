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

var kmp_buildtable = function(word) {
	var ft = new Array(word.length);
	// word.length must > 0
	ft[0] = -1;
	var matchPos = 0;
	for (var i = 1; i < word.length; i++) {
		if (word[i] === word[matchPos]) {
			ft[i] = matchPos;
			matchPos++;
		} else {
			ft[i] = 0;
			matchPos = 0;
		}
	}

	console.log(ft);
	return ft;
}

var kmp_match = function(str, word, index) {
	for (var i = 0;
		str.charAt(index + i) === word.charAt(i) &&
		i < word.length; i++);

	return i;
}

var kmp_findstr = function(str, word, index) {
	if (index === undefined) { index = 0; }
	var ft = kmp_buildtable(word);
	var i = index;

	while (i < str.length) {
		var mismatch = kmp_match(str, word, i);
		if (mismatch === word.length) {
			return i;
		} else {
			i += mismatch - ft[mismatch];
		}
	}

	return -1;
}

function main() {
	var str = "paraparents pardise paraparentsss please paraparents";
	var word = "paraparents";
	var found = findstr(str, word);
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

	// now kmp
	var index = 0;
	while ((index = kmp_findstr(str, word, index)) != -1) {
		console.log(index);
		index += word.length;
	}
}

main();
