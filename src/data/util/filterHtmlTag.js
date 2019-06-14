exports.filterHtmlTag = function (msg) {
  msg = msg.replace(/<\/?[^>]*>/g, '');
  msg = msg.replace(/[|]*\n/, '');
  msg = msg.replace(/&npsp;/ig, '');
  return msg;
}