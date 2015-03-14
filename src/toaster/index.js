
function Toaster (msg) {
	console.log(msg);
}

Toaster.error = function (msg) {
	console.error(msg);
};

Toaster.warning = function (msg) {
	console.warn(msg);
};

Toaster.info = function (msg) {
	console.info(msg);
};

Toaster.success = function (msg) {
	console.log(msg);
};


export default Toaster;
