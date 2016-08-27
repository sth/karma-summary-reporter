
function addPrefix(str, prefix) {
	return prefix + str;
}

function stripPrefix(prefix, str) {
	if (str.startsWith(prefix)) {
		return str.substr(prefix.length);
	}
	else {
		return str;
	}
}

