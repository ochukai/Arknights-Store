exports.filterHtmlTag = function (msg) {
  if (msg == null) {
    return '';
  }

  msg = msg.replace(/<\/?[^>]*>/g, '');
  msg = msg.replace(/[|]*\n/, '');
  msg = msg.replace(/&npsp;/ig, '');
  msg = msg.replace(/\\n/ig, '<br/>');
  return msg;
}
