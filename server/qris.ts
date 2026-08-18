/**
 * EMVCo Standard Indonesian Dynamic QRIS Generator & Parser
 * Complies with Bank Indonesia (BI) & ASPI QRIS Specifications.
 */

/**
 * Calculates the CRC16-CCITT checksum for EMVCo QR code string.
 * Polynomial: 0x1021, Initial Value: 0xFFFF
 */
export function calculateCRC16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Helper to format EMVCo Tag-Length-Value
 */
export function formatTLV(tag: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return `${tag}${length}${value}`;
}

export interface DynamicQrisOptions {
  merchantName?: string;
  merchantCity?: string;
  merchantNmid?: string;
  postalCode?: string;
  amount: number;
  orderId?: string;
}

/**
 * Generates an official Indonesian Dynamic QRIS string with the exact transaction amount
 */
export function generateDynamicQRIS(options: DynamicQrisOptions): string {
  const {
    merchantName = 'BUYBITS ID OFFICIAL',
    merchantCity = 'JAKARTA',
    merchantNmid = 'ID1024889201992',
    postalCode = '12950',
    amount,
    orderId,
  } = options;

  // Format amount as integer without decimals for IDR
  const formattedAmount = Math.round(amount).toString();

  // Tag 26: Merchant Account Information (Indonesian QRIS Standard)
  // Sub-tag 00: Globally Unique Identifier ("ID.CO.QRIS.WWW")
  // Sub-tag 01: Merchant ID / NMID
  // Sub-tag 02: Merchant Criteria (e.g. "UME" - Usaha Mikro)
  const tag26Value =
    formatTLV('00', 'ID.CO.QRIS.WWW') +
    formatTLV('01', merchantNmid) +
    formatTLV('02', 'UME');

  // Tag 51: National Central Switch / Merchant Acquirer (GPN)
  const tag51Value =
    formatTLV('00', 'ID.GPN.WWW') +
    formatTLV('01', '936000102488920199') +
    formatTLV('02', '01');

  // Tag 62: Additional Data Field (Order ID / Reference Label)
  let tag62 = '';
  if (orderId) {
    const tag62Value = formatTLV('01', orderId.slice(0, 25)) + formatTLV('07', 'AIS');
    tag62 = formatTLV('62', tag62Value);
  }

  // Assemble EMVCo payload without CRC
  let payload = '';
  payload += formatTLV('00', '01'); // Payload Format Indicator
  payload += formatTLV('01', '12'); // Point of Initiation Method: 12 = Dynamic QR
  payload += formatTLV('26', tag26Value); // Merchant Info 1
  payload += formatTLV('51', tag51Value); // Merchant Info 2
  payload += formatTLV('52', '5734'); // Merchant Category Code (Computer Software / Digital Goods)
  payload += formatTLV('53', '360'); // Transaction Currency: 360 = IDR
  payload += formatTLV('54', formattedAmount); // Transaction Amount
  payload += formatTLV('58', 'ID'); // Country Code
  payload += formatTLV('59', merchantName.slice(0, 25)); // Merchant Name
  payload += formatTLV('60', merchantCity.slice(0, 15)); // Merchant City
  payload += formatTLV('61', postalCode.slice(0, 10)); // Postal Code
  if (tag62) {
    payload += tag62; // Additional Data
  }

  // Tag 63: CRC16 Checksum Tag (Tag 63, length 04)
  const payloadWithCrcTag = payload + '6304';
  const checksum = calculateCRC16(payloadWithCrcTag);

  return payloadWithCrcTag + checksum;
}

/**
 * Converts an existing static QRIS string into a dynamic QRIS string with custom amount
 */
export function convertStaticToDynamicQris(staticQris: string, amount: number, orderId?: string): string {
  if (!staticQris || staticQris.length < 20) {
    return generateDynamicQRIS({ amount, orderId });
  }

  // If already ends with checksum, strip the tag 63
  let cleanQris = staticQris.trim();
  const crcIndex = cleanQris.lastIndexOf('6304');
  if (crcIndex !== -1) {
    cleanQris = cleanQris.substring(0, crcIndex);
  }

  // Replace Point of Initiation Method: 010211 -> 010212 (Dynamic)
  if (cleanQris.includes('010211')) {
    cleanQris = cleanQris.replace('010211', '010212');
  } else if (!cleanQris.includes('010212')) {
    cleanQris = '000201010212' + cleanQris.replace(/^000201/, '');
  }

  // Remove existing Tag 54 if present
  const tag54Regex = /54\d{2}\d+/;
  cleanQris = cleanQris.replace(tag54Regex, '');

  // Add Tag 54 with amount before Tag 58
  const formattedAmount = Math.round(amount).toString();
  const tag54 = formatTLV('54', formattedAmount);

  const tag58Index = cleanQris.indexOf('5802ID');
  if (tag58Index !== -1) {
    cleanQris = cleanQris.slice(0, tag58Index) + tag54 + cleanQris.slice(tag58Index);
  } else {
    cleanQris += tag54;
  }

  // Append Tag 62 if orderId provided and not present
  if (orderId && !cleanQris.includes('62')) {
    cleanQris += formatTLV('62', formatTLV('01', orderId.slice(0, 25)));
  }

  const payloadWithCrcTag = cleanQris + '6304';
  const checksum = calculateCRC16(payloadWithCrcTag);
  return payloadWithCrcTag + checksum;
}
