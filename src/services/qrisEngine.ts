/**
 * Client-Side & Universal EMVCo Dynamic QRIS Engine
 * Generates official Indonesian Dynamic QRIS with CRC16-CCITT checksum
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

export function generateDynamicQRIS(options: DynamicQrisOptions): string {
  const {
    merchantName = 'BUYBITS OFFICIAL',
    merchantCity = 'JAKARTA',
    merchantNmid = 'ID1024889201992',
    postalCode = '12950',
    amount,
    orderId,
  } = options;

  const formattedAmount = Math.round(amount).toString();

  const tag26Value =
    formatTLV('00', 'ID.CO.QRIS.WWW') +
    formatTLV('01', merchantNmid) +
    formatTLV('02', 'UME');

  const tag51Value =
    formatTLV('00', 'ID.GPN.WWW') +
    formatTLV('01', '936000102488920199') +
    formatTLV('02', '01');

  let tag62 = '';
  if (orderId) {
    const tag62Value = formatTLV('01', orderId.slice(0, 25)) + formatTLV('07', 'AIS');
    tag62 = formatTLV('62', tag62Value);
  }

  let payload = '';
  payload += formatTLV('00', '01'); // Format Indicator
  payload += formatTLV('01', '12'); // 12 = Dynamic QR
  payload += formatTLV('26', tag26Value);
  payload += formatTLV('51', tag51Value);
  payload += formatTLV('52', '5734'); // Computer Software / Digital Goods
  payload += formatTLV('53', '360'); // 360 = IDR
  payload += formatTLV('54', formattedAmount); // Exact amount
  payload += formatTLV('58', 'ID');
  payload += formatTLV('59', merchantName.slice(0, 25));
  payload += formatTLV('60', merchantCity.slice(0, 15));
  payload += formatTLV('61', postalCode.slice(0, 10));
  if (tag62) {
    payload += tag62;
  }

  const payloadWithCrcTag = payload + '6304';
  const checksum = calculateCRC16(payloadWithCrcTag);

  return payloadWithCrcTag + checksum;
}
