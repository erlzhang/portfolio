const OSS = require('ali-oss');

const NODE_TYPE = "Image";

module.exports = {
  sourceNodes: async({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType
  }) => {
    const { createNode } = actions;

    const store = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI5tCJzyVfBcd8JtpKqDSU',
      accessKeySecret: 'CCOG6NezNErX4SYfiMgu3zg48mPJpR',
      bucket: 'erlgallery'
    });

    const res = await store.list();

      res.objects.forEach(obj => {
        console.warn('obj', obj);
        const image = {
          name: obj.name,
          url: obj.url,
          lastModified: obj.lastModified
        };
        createNode({
          ...image,
          id: createNodeId(`${NODE_TYPE}-${obj.name}`),
          parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(image),
        contentDigest: createContentDigest(image),
      },
        })
      })
    return
  }
}
