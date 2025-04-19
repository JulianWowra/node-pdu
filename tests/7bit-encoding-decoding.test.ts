import { describe, expect, test } from 'vitest';
import { utils } from '../src/index';

const tests = [
	{
		name: 'should encode/decode lowercase letters',
		text: 'abcdefghijklmnopqrstuvwxyz',
		code: '61F1985C369FD169F59ADD76BFE171F99C5EB7DFF1793D'
	},
	{
		name: 'should encode/decode uppercase letters',
		text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		code: '41E19058341E9149E592D9743EA151E9945AB55EB1592D'
	},
	{
		name: 'should encode/decode digits',
		text: '0123456789',
		code: 'B0986C46ABD96EB81C'
	},
	{
		name: 'should encode/decode 1 symbol',
		text: 'a',
		code: '61'
	},
	{
		name: 'should encode/decode 2 symbols',
		text: 'ab',
		code: '6131'
	},
	{
		name: 'should encode/decode 3 symbols',
		text: 'abc',
		code: '61F118'
	},
	{
		name: 'should encode/decode 4 symbols',
		text: 'abcd',
		code: '61F1980C'
	},
	{
		name: 'should encode/decode 5 symbols',
		text: 'abcde',
		code: '61F1985C06'
	},
	{
		name: 'should encode/decode 6 symbols',
		text: 'abcdef',
		code: '61F1985C3603'
	},
	{
		name: 'should encode/decode 7 symbols',
		text: 'abcdefg',
		code: '61F1985C369F01'
	},
	{
		name: 'should encode/decode 8 symbols',
		text: 'abcdefgh',
		code: '61F1985C369FD1'
	},
	{
		name: 'should encode/decode 9 symbols',
		text: 'abcdefghi',
		code: '61F1985C369FD169'
	},
	{
		name: 'should ignore "@" during encoding (7-bit loss)',
		text: 'abcdefg@',
		code: '61F1985C369F01',
		codeLen: 8
	},
	{
		name: 'should correctly decode final "}" character (escape test)',
		text: '{test}',
		code: '1B14BD3CA76F52'
	},
	{
		name: 'should encode with 3-bit alignment',
		text: 'abc',
		code: '088BC7',
		alignBits: 3
	}
];

describe('7bit encoding', () => {
	test.each(tests)('$name', ({ text, alignBits, code, codeLen }) => {
		const { result, length } = utils.Helper.encode7Bit(text, alignBits);

		expect(result).toBe(code);

		if (codeLen) {
			expect(length).toBe(codeLen);
		}
	});
});

describe('7bit decoding', () => {
	test.each(tests)('$name', ({ code, codeLen, alignBits, text }) => {
		expect(utils.Helper.decode7Bit(code, codeLen, alignBits)).toBe(text);
	});
});
