const os = require('node-os-utils');
function hashCode(s) {
	//refuerzo hash duplicando la cadena
	s = s + s;
	for (var i = 0, h = 0; i < s.length; i++)
		h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
	return h;
}

function parseStringToDate(stringDate) {
	//2020-03-02T15:30:00
	let fecha = stringDate.split('T')[0].split('-');
	let hora = stringDate.split('T')[1].split(':');

	return new Date(fecha[0], fecha[1] - 1, fecha[2], hora[0], hora[1], hora[2]);
}

async function usageCPU_MEN() {
	let cpuAvg = await os.cpu.usage();
	let memRes = await os.mem.free();

	return cpuAvg > 70 && (memRes.freeMemMb / memRes.totalMemMb) * 100 > 70;
}

exports.usageCPU_MEN = usageCPU_MEN;

exports.hashCode = hashCode;

exports.parseStringToDate = parseStringToDate;
