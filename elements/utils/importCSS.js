let cssPromise = {};

export default async function importCSS(file) {
  if (cssPromise[file]) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = file;

  cssPromise[file] = new Promise((resolve) => {
    link.addEventListener('load', () => {
      // console.log('загрузка завершена');

      resolve();
    });
  });
  document.head.append(link);
  // console.log('css загружен в head');
  return cssPromise[file];
}
