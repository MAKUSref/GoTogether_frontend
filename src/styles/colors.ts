export const PRIMARY_COLOR_DARK = '#2d8eae';
export const PRIMARY_COLOR = '#54B4D3';
export const PRIMARY_COLOR_LIGHT = '#92cee2';
export const PRIMARY_COLOR_LIGHT_2 = '#cee9f2';

export const AVATARS_COLORS = [
  "#8d9ff2",
  "#358556",
  "#90469E",
  "#AA5095",
  "#AA507C",
  "#7C50AA",
  "#5A4174",
  "#334C9D",
  "#2E5F75",
  "#1377A5",
  "#1377A5",
  "#5C6F27",
  "#7B6F3F",
  "#565244",
  "#2C8044",
  "#2C8044",
  "#6B0A4B",
  "#8C2145",
  "#B11ECC",
  "#3F59C0"
];

const HASH_INIT = 271;

export const getColorFromUUID = (uuid: string) => {
  const x = uuid.split("-").reduce((a,b) => a ^ Number.parseInt(b, 16), HASH_INIT);
  return AVATARS_COLORS[(x**2) % AVATARS_COLORS.length];
}
