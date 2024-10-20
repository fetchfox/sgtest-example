import { fox } from 'fetchfox';

const f = await fox
  .config({
    fetcher: 'playwright',
    diskCache: '/tmp/fetchfox',
  });

console.log('Running scraper on sgtestpapersfree.com');

const out = await f
  .init('https://www.sgtestpapersfree.com/')
  .fetch()
  .action({
    action: 'click',
    query: 'Buttons that contains "Primary"',
    selector: 'a.btn',
  })
  .extract('exam PDF filenames from "View" buttons. limit: 20')
  .schema({ filename: 'pdf filename' })
  .run(null, (partial) => {
    const { item, index } = partial.delta;
    if (index == 4) {
      console.log('Scraper found item:', item);
      const filename = item.filename;
      const url = `https://www.sgtestpapersfree.com/pdfjs/web/viewer.html?file=../../pdfs/P1/${filename}`
      console.log('URL is:', url);
    }
  });
