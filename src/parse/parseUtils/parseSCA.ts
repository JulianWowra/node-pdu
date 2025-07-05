import { Helper } from '../../utils/Helper';
import { SCA } from '../../utils/SCA/SCA';
import { SCAType } from '../../utils/SCA/SCAType';
import type { GetSubstr } from '../index';

/**
 * Parses the Service Center Address (SCA) from a given substring extractor.
 * This function extracts and constructs an SCA object from the provided PDU string parts.
 *
 * @param getPduSubstr A function to extract substrings from the PDU string
 * @param isAddress Indicates whether the SCA represents an address (OA or DA)
 *
 * @returns An instance of SCA containing the parsed SCA information
 */
export default function parseSCA(getPduSubstr: GetSubstr, isAddress: boolean) {
	const size = Helper.getByteFromHex(getPduSubstr(2));
	const sca = new SCA(isAddress);
	let octets;

	if (!size) {
		return sca;
	}

	// if is OA or DA then the size in semi-octets
	let adjustedSize = size;
	if (isAddress) {
		octets = Math.ceil(adjustedSize / 2); // to full octets
		// else size in octets
	} else {
		adjustedSize--;
		octets = adjustedSize;
		adjustedSize *= 2; // to semi-octets for future usage
	}

	const typeValue = Helper.getByteFromHex(getPduSubstr(2));
	const type = new SCAType(typeValue);
	const hex = getPduSubstr(octets * 2);

	sca.type.setType(type.type);
	sca.type.setPlan(type.plan);

	if (sca.type.type === SCAType.TYPE_ALPHANUMERICAL) {
		const septets = Math.floor((adjustedSize * 4) / 7); // semi-octets to septets
		return sca.setPhone(Helper.decode7Bit(hex, septets), false, !isAddress);
	}

	// Detect padding char
	if (!isAddress && hex.charAt(adjustedSize - 2) === 'F') {
		adjustedSize--;
	}

	const phone = (hex.match(/.{1,2}/g) || [])
		.map((b) => SCA.mapFilterDecode(b).split('').reverse().join(''))
		.join('')
		.slice(0, adjustedSize);

	return sca.setPhone(phone, false, !isAddress);
}
