import { Helper } from '../../utils/Helper';
import { PID } from '../../utils/PID';
import type { GetSubstr } from '../index';

/**
 * Parses Protocol Identifier (PID) from a PDU string.
 *
 * This function extracts Protocol Identifier information from the provided PDU string
 * and constructs a PID object to represent it.
 *
 * @param getPduSubstr A function to extract substrings from the PDU string
 * @returns An instance of PID containing parsed information
 */
export default function parsePID(getPduSubstr: GetSubstr) {
	const byte = Helper.getByteFromHex(getPduSubstr(2));
	const pid = new PID();

	pid.setPid(byte >> 6);
	pid.setIndicates(byte >> 5);
	pid.setType(byte);

	return pid;
}
