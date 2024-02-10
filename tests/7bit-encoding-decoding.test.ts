import { describe, expect, test } from 'vitest';
import { utils } from '../src/index';

const tests = [
	{
		testName: 'Lowercase letters',
		text: 'abcdefghijklmnopqrstuvwxyz',
		code: '61F1985C369FD169F59ADD76BFE171F99C5EB7DFF1793D'
	},
	{
		name: 'Uppercase letters',
		text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		code: '41E19058341E9149E592D9743EA151E9945AB55EB1592D'
	},
	{
		name: 'Digits',
		text: '0123456789',
		code: 'B0986C46ABD96EB81C'
	},
	{
		name: '1 symbol',
		text: 'a',
		code: '61'
	},
	{
		name: '2 symbols',
		text: 'ab',
		code: '6131'
	},
	{
		name: '3 symbols',
		text: 'abc',
		code: '61F118'
	},
	{
		name: '4 symbols',
		text: 'abcd',
		code: '61F1980C'
	},
	{
		name: '5 symbols',
		text: 'abcde',
		code: '61F1985C06'
	},
	{
		name: '6 symbols',
		text: 'abcdef',
		code: '61F1985C3603'
	},
	{
		name: '7 symbols',
		text: 'abcdefg',
		code: '61F1985C369F01'
	},
	{
		name: '8 symbols',
		text: 'abcdefgh',
		code: '61F1985C369FD1'
	},
	{
		name: '9 symbols',
		text: 'abcdefghi',
		code: '61F1985C369FD169'
	},
	{
		name: '"@" loss',
		text: 'abcdefg@',
		code: '61F1985C369F01',
		codeLen: 8
	},
	{
		name: 'Final "}" decoding error',
		text: '{test}',
		code: '1B14BD3CA76F52'
	},
	{
		name: 'Text with alignment',
		text: 'abc',
		code: '088BC7',
		alignBits: 3
	}
];

describe('7bit encoding', () => {
	test.each(tests)('$testName', ({ text, alignBits, code: result, codeLen }) => {
		expect(utils.Helper.encode7Bit(text, alignBits)).toEqual({ result, length: codeLen ? codeLen : expect.any(Number) });
	});
});

describe('7bit decoding', () => {
	test.each(tests)('$testName', ({ code, codeLen, alignBits, text }) => {
		expect(utils.Helper.decode7Bit(code, codeLen, alignBits)).toBe(text);
	});
});
