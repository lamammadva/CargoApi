import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  async getProductDetails(link: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let productDetails = {
      name: null,
      price: null,
      image: null,
      store: null,
    };
    try {
      await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });

      await page.waitForSelector('h1', { timeout: 60000 });
      productDetails.name = await page.$eval('h1.pr-new-br', (el) =>
        el.textContent.trim(),
      );

      const spanSelector = 'span.product-brand-name-without-link';
      const spanElement = await page.$(spanSelector);

      const linkSelector = 'a.product-brand-name-with-link';
      const linkElement = await page.$(linkSelector);




      if (linkElement) {
        await page.waitForSelector('a.product-brand-name-with-link', {
          timeout: 60000,
        });
  
  
        productDetails.store = await page.$eval(
          'a.product-brand-name-with-link',
          (el) => el.textContent.trim(),
        );

      }
      if (spanElement) {
        await page.waitForSelector('span.product-brand-name-without-link', {
          timeout: 60000,
        });
        productDetails.store = await page.$eval(
          'span.product-brand-name-without-link',
          (el) => el.textContent.trim(),
        );

      }
      await page.waitForSelector('span.prc-dsc', { timeout: 60000 });
      const priceMatch = await page.$eval('span.prc-dsc', (el) =>
        el.textContent.trim(),
      );
      console.log(priceMatch);
      productDetails.price = parseFloat(priceMatch.replace(/[^\d,]/g, '').replace(',','.'));

      await page.waitForSelector('div.product-image-container img', {
        timeout: 60000,
      });
      productDetails.image = await page.$eval(
        'div.product-image-container img',
        (el) => el.src,
      );
    } catch (error) {
      console.error('Error extracting product details:', error);
    } finally {
      await browser.close();
    }
    return productDetails;
  }
}




// await page.waitForSelector('#productTitle',{ timeout: 60000 });

// // Məhsulun adını çıxarın
// productDetails.name = await page.$eval('#productTitle', (el) =>
//   el.textContent.trim(),
// );

// const rows = await page.$$('#productDetails_techSpec_section_1 tbody tr');
// for (const row of rows) {
//   const title = await row
//     .$eval('th', (el) => el.textContent.trim())
//     .catch(() => '');
//   const value = await row
//     .$eval('td', (el) => el.textContent.trim())
//     .catch(() => '');

//   if (
//     (title.toLowerCase().includes('paket boyutları') ||
//       title.toLowerCase().includes('product dimensions') ||
//       title.toLowerCase().includes('ürün boyutları') ||
//       title.toLowerCase().includes('package dimensions')) &&
//     value
//   ) {
//     const dimensionParts = value
//       .split(';')[0]
//       .split('x')
//       .map((part) => part.trim());
//     if (dimensionParts.length === 3) {
//       productDetails.width = parseFloat(
//         dimensionParts[0].replace(/[^\d.]/g, ''),
//       );
//       productDetails.height = parseFloat(
//         dimensionParts[1].replace(/[^\d.]/g, ''),
//       );
//       productDetails.depth = parseFloat(
//         dimensionParts[2].replace(/[^\d.]/g, ''),
//       );
//     }

//     const weightMatch = value.match(/(\d+(\.\d+)?)\s*gram/);
//     if (weightMatch) {
//       productDetails.weight = parseInt(weightMatch[1], 10);
//       console.log(productDetails);
//     }
//   }
// }

// const tableExists = await page.$('table.a-bordered');
// if (!tableExists) {
//   console.error('Table not found on the page');
//   return productDetails;
// }
// await page.waitForSelector('table.a-bordered', { timeout: 60000 }); // Increase to 60 seconds

// // Extract table data for width, height, depth, and weight
// const tables = await page.$$('.a-bordered tbody tr ');
// for (const row of tables) {
//   const title = await row
//     .evaluate((el) =>
//       el
//         .querySelector('td:first-of-type')
//         .textContent.trim()
//         .toLowerCase()
//         .replace(/\s+/g, ' '),
//     )
//     .catch(() => '');
//   console.log(title);

//   const value = await row
//     .evaluate((el) =>
//       el
//         .querySelector('td:last-of-type')
//         .textContent.trim()
//         .replace(/\s+/g, ' '),
//     )
//     .catch(() => '');
//   console.log(value);

//   if (title.includes('genişlik')) {
//     const widthMatch = value.match(/(\d+(\.\d+)?)/); // Virgül ve nokta formatlarını da kontrol edin
//     if (widthMatch) {
//       productDetails.width = parseFloat(widthMatch[1]);
//     }
//   } else if (title.toLowerCase().includes('uzunluk')) {
//     productDetails.height =
//       parseFloat(value.replace(/[^\d.]/g, '')) || null;
//   } else if (title.includes('derinlik')) {
//     productDetails.depth =
//       parseFloat(value.replace(/[^\d.]/g, '')) || null;
//   } else if (title.includes('ağırlık')) {
//     const weightMatch = value.match(/(\d+(\.\d+)?)\s*gram/);

//     if (weightMatch) {
//       productDetails.weight = parseFloat(weightMatch[1]);
//     }
//   }
// }

//     const listItems = await page.$$('table.a-bordered li');
//     for (const item of listItems) {
//       const title = await item.$eval('font', (el) =>
//         el.textContent.trim().toLowerCase(),
//       );
//       const value = await item.$eval('font', (el) => el.textContent.trim());

//       // Genişlik, uzunluk, derinlik ve ağırlık için verileri çıkar
//       if (title.includes('genişlik')) {
//         const widthMatch = value.match(/(\d+(\.\d+)?)/);
//         if (widthMatch) {
//           productDetails.width = parseFloat(widthMatch[1]);
//           console.log('Width:', productDetails.width);
//         }
//       } else if (title.includes('uzunluk')) {
//         const heightMatch = value.match(/(\d+(\.\d+)?)/);
//         if (heightMatch) {
//           productDetails.height = parseFloat(heightMatch[1]);
//           console.log('Height:', productDetails.height);
//         }
//       } else if (title.includes('derinlik')) {
//         const depthMatch = value.match(/(\d+(\.\d+)?)/);
//         if (depthMatch) {
//           productDetails.depth = parseFloat(depthMatch[1]);
//           console.log('Depth:', productDetails.depth);
//         }
//       } else if (title.includes('ağırlık')) {
//         const weightMatch = value.match(/(\d+(\.\d+)?)/);
//         if (weightMatch) {
//           productDetails.weight = parseFloat(weightMatch[1]);
//           console.log('Weight:', productDetails.weight);
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error extracting product details:', error);
//   } finally {
//     await browser.close();
//   }
//   return productDetails;
// }

// kontact az
// await page.waitForSelector('h1.page-title span', { timeout: 60000 });
// productDetails.name = await page.$eval('h1.page-title span', (el) => el.textContent.trim());

// await page.waitForSelector('.har__row');
// const kontacts = await page.$$('.har__row');
// for (const row of kontacts) {
//   const title = await row.$eval('.har__title', (el) => el.textContent.trim()).catch(() => '');
//   console.log(title);

//   const value = await row.$eval('.har__znach', (el) => el.textContent.trim()).catch(() => '');
//   console.log(value);

//   // Process dimensions from Kontact
//   if (title.toLowerCase().includes('boyutlar') || title.toLowerCase().includes('ölçülər')) {
//      const setsOfDimensions = value.split('/');
//     console.log('Sets of Dimensions:', setsOfDimensions);

//     // For this example, we process only the first set (you can adjust this if you need multiple)
//     const dimensionParts = setsOfDimensions[0].split(/[×x]/).map((part) => part.trim());
//     console.log('Dimension Parts:', dimensionParts);

//     if (dimensionParts.length === 3) {
//       productDetails.width = parseFloat(dimensionParts[0].replace(/[^\d.]/g, ''));
//       console.log(productDetails.width);

//       productDetails.height = parseFloat(dimensionParts[1].replace(/[^\d.]/g, ''));
//       productDetails.depth = parseFloat(dimensionParts[2].replace(/[^\d.]/g, ''));
//     }
//     console.log(productDetails);

//   }
// }
