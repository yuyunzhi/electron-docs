const qiniu = require('qiniu')

// generate mac
const accessKey = '8AuX_FnwAxGyeAj62jmTEiR2NvmA4P64n4_H1bI3';
const secretKey = 'yZKqubB5gT6RtK0CnUmvhTX1_DatNMrR8Je3oEyN';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// generate uploadToken
const options = {
  scope: 'electron-docs',
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken=putPolicy.uploadToken(mac);

// 初始化配置类
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

// 上传
// const localFile = "/Users/yuyunzhi/Documents/5.md";
// const formUploader = new qiniu.form_up.FormUploader(config);
// const putExtra = new qiniu.form_up.PutExtra();
// const key='5.md';
// 文件上传
// formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
//   respBody, respInfo) {
//   if (respErr) {
//     throw respErr;
//   }
//   console.log('statusCode', respInfo.statusCode);
  
//   if (respInfo.statusCode == 200) {
//     console.log('respBody', respBody);
//   } else {
//     console.log(respInfo.statusCode);
//     console.log(respBody);
//   }
// });



// 下载

const bucketManager = new qiniu.rs.BucketManager(mac, config);
const publicBucketDomain = 'http://qfq3hdf02.hd-bkt.clouddn.com';
const key='3.jpg';
// 公开空间访问链接
const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
console.log('publicDownloadUrl',publicDownloadUrl);