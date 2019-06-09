import React from 'react';

export const tableContext = {
  expandKeys: [] // 这里就是默认值啥用没有
};

export const ExpandContext = React.createContext({
  expandKeys: tableContext.expandKeys,
  // 这里就是声明一下会有这个方法作为参数，别的啥用没有，真正的操作在 Provider 里面
  // 不要被 react 骗了
  toggleExpandKeys: () => { }
});
