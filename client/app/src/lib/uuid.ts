const UUID = (() => {
  const lut = Array.from({ length: 256 }, (_, i) => (i < 16 ? '0' : '') + i.toString(16));

  const generate = () => {
    // Asegurarse de que crypto.getRandomValues está disponible
    if (typeof crypto === 'undefined' || typeof crypto.getRandomValues !== 'function') {
      throw new Error('crypto.getRandomValues no está disponible en este entorno.');
    }

    const randomValues = new Uint32Array(4);
    crypto.getRandomValues(randomValues);
    const [d0, d1, d2, d3] = randomValues;

    return (
      `${lut[d0 & 0xff]}${lut[(d0 >> 8) & 0xff]}${lut[(d0 >> 16) & 0xff]}${lut[(d0 >> 24) & 0xff]}-` +
      `${lut[d1 & 0xff]}${lut[(d1 >> 8) & 0xff]}-${lut[((d1 >> 16) & 0x0f) | 0x40]}${lut[(d1 >> 24) & 0xff]}-` +
      `${lut[(d2 & 0x3f) | 0x80]}${lut[(d2 >> 8) & 0xff]}-${lut[(d2 >> 16) & 0xff]}${lut[(d2 >> 24) & 0xff]}` +
      `${lut[d3 & 0xff]}${lut[(d3 >> 8) & 0xff]}${lut[(d3 >> 16) & 0xff]}${lut[(d3 >> 24) & 0xff]}`
    );
  };

  return { generate };
})();

export default UUID;
