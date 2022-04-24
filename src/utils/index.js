export const isValidAvatar = (url) => {
  let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

  return url.match(regex);
};
