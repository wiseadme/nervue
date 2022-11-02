import rimraf from 'rimraf'

rimraf('packages/nervue/dist/packages', () => console.log('deleted packages'))
rimraf(`packages/nervue/dist/root.d.ts`, () => console.log('deleted .d.ts'))
rimraf('temp', () => console.log('deleted temp'))
