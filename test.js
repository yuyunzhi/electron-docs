const qiniu = require('qiniu')
const QiniuManager = require('./src/utils/QiniuManager')
const path = require('path')
// generate mac
const accessKey = '8AuX_FnwAxGyeAj62jmTEiR2NvmA4P64n4_H1bI3'
const secretKey = 'yZKqubB5gT6RtK0CnUmvhTX1_DatNMrR8Je3oEyN'
const localFile = '/Users/yuyunzhi/Documents/5.md'
const key = '5.md'

const manager = new QiniuManager(accessKey, secretKey, 'electron-docs')

// 文件上传
// manager.uploadFile(key, '/Users/yuyunzhi/Documents/5.md').then((data) => {
//   console.log('上传成功', data)
// })

manager.deleteFile(key).then((res) => {
  console.log('删除结果', res)
})

// manager
//   .generateDownloadLink(key)
//   .then((data) => {
//     console.log(data)
//     return manager.generateDownloadLink('first.md')
//   })
//   .then((data) => {
//     console.log(data)
//   })
// const publicBucketDomain = 'http://pv8m1mqyk.bkt.clouddn.com'


manager.downloadFile(key, '/Users/yuyunzhi/Documents/5.md').then(() => {
  console.log('下载写入文件完毕')
})

// 下载
// const bucketManager = new qiniu.rs.BucketManager(mac, config);
// const publicBucketDomain = 'http://qfq3hdf02.hd-bkt.clouddn.com';
// const key='3.jpg';
// // 公开空间访问链接
// const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
// console.log('publicDownloadUrl',publicDownloadUrl);
