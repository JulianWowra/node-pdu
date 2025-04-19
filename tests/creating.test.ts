import { describe, expect, test } from 'vitest';
import { Submit } from '../src/index';

describe('Test PDU creation', () => {
	test('should correctly create a single-part Submit PDU message', () => {
		const submit = new Submit('+1234567890', 'Hello, this is a simple Submit.');

		const pduParts = submit.getPartStrings();
		expect(pduParts).toHaveLength(1);

		expect(pduParts[0]).toBe('0001000A91214365870900001FC8329BFD6681E8E8F41C949E83C2A079BA0D679741D3BAB89DA6BB00');
	});

	test('should correctly create a multi-part Submit PDU message', () => {
		const submit = new Submit(
			'+1234567890',
			'Hello, this is a long text to reproduce the issue that Adam Smid has provided, I am trying to reproduce this with success. I hope you guys have a good day today, make every day count in your live!'
		);

		const pduParts = submit.getPartStrings();
		expect(pduParts).toHaveLength(2);

		// Expression because of random message reference number (only on multiple part messages - header)
		expect(pduParts[0]).toMatch(
			/^0041000A91214365870900008D060804[\dA-F]{6}01C8329BFD6681E8E8F41C949E83C220F6DB7D06D1CB783A88FE06C9CB70F99B5C1F9741747419949ECFEB65101D1DA68382E4701B346DA7C92074780E82CBDFF634B94C668192A0701B4497E7D3EE3388FE06C9CB70F99B5C1F974174747A0EBAA7E968D0BC3E1E97E77317280942BFE16550FE5D07$/i
		);
		expect(pduParts[1]).toMatch(
			/^0041000A912143658709000047060804[\dA-F]{6}02A0733D3F07A1C3F632280C3ABFDF6410399C07D1DFE4709E056A87D76550D95E96E741E4701E347ED7DD7450DA0DCABFEB72103B6D2F8700$/i
		);
	});
});
